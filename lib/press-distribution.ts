import { unstable_cache } from "next/cache";

/**
 * "Where to read it" on a press release page: the news sites the release was distributed to,
 * read from the Marketersmedia Partner API report of that release.
 *
 * SERVER ONLY. The key is MM_PARTNER_API_KEY (Railway variable); it is never sent to the browser
 * (this module is only imported by a server component). A good answer is cached for 6 hours. No
 * key, an API error, a release with no outlet link yet → null, and the page shows nothing.
 */

const API_BASE = process.env.MM_PARTNER_API_BASE ?? "https://partner.marketersmedia.com/api";
const REVALIDATE_SECONDS = 6 * 60 * 60;
const MAX_SHOWN = 8;
const MAX_CHECKED = 24;
const CHECK_TIMEOUT_MS = 8000;
/** After a miss (no links yet, API down), how long before asking Marketersmedia again. */
const MISS_RETRY_MS = 15 * 60 * 1000;

export type DistributionOutlet = { name: string; url: string };
export type Distribution = { total: number; outlets: DistributionOutlet[] };

type Syndication = { endpoint?: string; url?: string; potentialAudience?: string | number };

// The order he asked for (2026-10-23): these first, then network-affiliated TV sites, then the rest.
const PRIORITY: RegExp[] = [
  /\bAP\s?News\b|\bAPNews\b|Associated Press/i,
  /Yahoo\s?Finance/i,
  /MarketWatch/i,
  /Barchart/i,
  /Benzinga/i,
  /StreetInsider/i,
  /Digital\s?Journal/i,
];
const NETWORK = /NBC|FOX|CBS|ABC/;
const CALL_SIGN = /^[KW][A-Z]{2,3}(?:$|[\s/])/;

function audience(s: Syndication): number {
  return Number(String(s.potentialAudience ?? "0").replace(/[^0-9.]/g, "")) || 0;
}

function rank(s: Syndication): number {
  const name = s.endpoint ?? "";
  const i = PRIORITY.findIndex((re) => re.test(name));
  if (i >= 0) return i;
  if (NETWORK.test(name)) return PRIORITY.length;
  if (CALL_SIGN.test(name)) return PRIORITY.length + 1;
  return PRIORITY.length + 2;
}

/** Candidates in his order; inside a tier, the biggest audience first. One link per outlet name. */
export function orderOutlets(syndication: Syndication[]): DistributionOutlet[] {
  const seen = new Set<string>();
  return syndication
    .filter((s) => s.endpoint && s.url && /^https:\/\//.test(s.url))
    .sort((a, b) => rank(a) - rank(b) || audience(b) - audience(a))
    .filter((s) => {
      const key = (s.endpoint as string).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((s) => ({ name: s.endpoint as string, url: s.url as string }));
}

/** Some outlet hosts answer 500 on and off: a link is shown only if it answers twice in a row. */
async function resolves(url: string): Promise<boolean> {
  return (await answers(url)) && (await answers(url));
}

async function answers(url: string): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: ctrl.signal,
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PrismaHouseLinkCheck/1.0; +https://prisma-house.com)" },
    });
    res.body?.cancel().catch(() => {});
    return res.status < 400;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function load(mmId: number): Promise<Distribution> {
  const key = process.env.MM_PARTNER_API_KEY?.trim();
  if (!key) throw new Error("no key");
  const res = await fetch(`${API_BASE}/press-releases/${mmId}`, {
    headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = (await res.json()) as {
    success?: boolean;
    data?: { status?: string; distributionReport?: { currentPickup?: number; syndication?: Syndication[] } };
  };
  const report = body.data?.distributionReport;
  const syndication = report?.syndication ?? [];
  if (body.success !== true || body.data?.status !== "published" || syndication.length === 0) {
    throw new Error("no outlet links yet");
  }
  const candidates = orderOutlets(syndication).slice(0, MAX_CHECKED);
  const outlets: DistributionOutlet[] = [];
  // Checked six at a time, in order, until eight links answer.
  for (let i = 0; i < candidates.length && outlets.length < MAX_SHOWN; i += 6) {
    const batch = candidates.slice(i, i + 6);
    const ok = await Promise.all(batch.map((o) => resolves(o.url)));
    batch.forEach((o, j) => {
      if (ok[j] && outlets.length < MAX_SHOWN) outlets.push(o);
    });
  }
  if (outlets.length === 0) throw new Error("no link resolves");
  const total = Math.max(Number(report?.currentPickup) || 0, syndication.length);
  return { total, outlets };
}

// Only a good answer is cached (a throw is not): until links exist the page keeps asking, at
// most once every 15 minutes per release (the miss memo below).
const cached = unstable_cache(load, ["mm-distribution-v1"], { revalidate: REVALIDATE_SECONDS });
const misses = new Map<number, number>();

export async function getDistribution(mmId: number | undefined): Promise<Distribution | null> {
  if (!mmId) return null;
  const missedAt = misses.get(mmId);
  if (missedAt && Date.now() - missedAt < MISS_RETRY_MS) return null;
  try {
    const d = await cached(mmId);
    misses.delete(mmId);
    return d;
  } catch {
    misses.set(mmId, Date.now());
    return null;
  }
}
