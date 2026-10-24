import crypto from "crypto";
import fs from "fs";
import path from "path";
import sitemap from "@/app/sitemap";
import { getAllArticles } from "@/lib/news";
import { getAllPressReleases } from "@/lib/press";
import { SITE_URL } from "@/lib/site";

/**
 * IndexNow (Bing and the other engines that share it): tell them which URLs changed instead of
 * waiting for a crawl.
 *
 * The key is public by design: IndexNow checks that https://prisma-house.com/<key>.txt contains
 * it. Two moments push URLs (see instrumentation.ts):
 *  - a deploy: every page has a fingerprint (its visible text, or its source file for the pages
 *    rendered per request); the new server compares its fingerprints with the ones the live site
 *    still serves at /indexnow/manifest, waits until it is the live one, and submits only what
 *    changed, appeared or disappeared;
 *  - a scheduled press release going live: checked every 10 minutes, its page, /news/press and
 *    /news are submitted once its publish time has passed.
 */

export const INDEXNOW_KEY = "01446132ab110962f96ff4c2a1041741";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = new URL(SITE_URL).host;

export type Manifest = { buildId: string; urls: Record<string, string> };

const sha = (s: string) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);

/** The words a visitor reads, without scripts, styles or build-specific markup. */
function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prerendered(urlPath: string): string | null {
  const rel = urlPath === "/" ? "index" : urlPath.replace(/^\//, "");
  const file = path.join(process.cwd(), ".next", "server", "app", `${rel}.html`);
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

function sourceFingerprint(urlPath: string): string {
  const press = urlPath.match(/^\/news\/press\/([^/]+)$/);
  if (press) {
    try {
      return sha(fs.readFileSync(path.join(process.cwd(), "content", "press", `${press[1]}.mdx`), "utf8"));
    } catch {
      return "missing";
    }
  }
  if (urlPath === "/news/press") {
    return sha(JSON.stringify(getAllPressReleases().map((r) => [r.slug, r.title, r.date])));
  }
  if (urlPath === "/news") {
    return sha(
      JSON.stringify([
        getAllArticles().map((a) => [a.slug, a.title, a.date]),
        getAllPressReleases().length > 0,
      ]),
    );
  }
  return "static";
}

/** Every URL in the sitemap with its fingerprint, as served by this build right now. */
export function computeManifest(): Manifest {
  let buildId = "dev";
  try {
    buildId = fs.readFileSync(path.join(process.cwd(), ".next", "BUILD_ID"), "utf8").trim();
  } catch {}
  const urls: Record<string, string> = {};
  for (const entry of sitemap()) {
    const urlPath = new URL(entry.url).pathname.replace(/\/$/, "") || "/";
    const html = prerendered(urlPath);
    urls[entry.url] = html ? sha(visibleText(html)) : sourceFingerprint(urlPath);
  }
  return { buildId, urls };
}

/** URLs that are new, changed or gone between two manifests. */
export function changedUrls(previous: Manifest | null, current: Manifest): string[] {
  if (!previous) return Object.keys(current.urls);
  const out = new Set<string>();
  for (const [url, hash] of Object.entries(current.urls)) {
    if (previous.urls[url] !== hash) out.add(url);
  }
  for (const url of Object.keys(previous.urls)) {
    if (!(url in current.urls)) out.add(url);
  }
  return Array.from(out);
}

export async function submit(urls: string[], reason: string): Promise<boolean> {
  const list = Array.from(new Set(urls)).filter((u) => u.startsWith(SITE_URL)).slice(0, 10000);
  if (list.length === 0) return true;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: list,
      }),
      cache: "no-store",
    });
    console.log(`[indexnow] ${reason}: ${list.length} URL(s) → HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`[indexnow] ${reason}: submission failed`, err);
    return false;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** What the live site serves: its manifest, null if it has none yet (404), "down" otherwise. */
async function liveManifest(): Promise<Manifest | null | "down"> {
  try {
    const res = await fetch(`${SITE_URL}/indexnow/manifest`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) return "down";
    return (await res.json()) as Manifest;
  } catch {
    return "down";
  }
}

/**
 * At boot: compare with what the live site serves (the previous deployment, while this one starts),
 * then wait until this build is the one answering and submit the difference. A restart of the same
 * build finds identical fingerprints and submits nothing; an unreachable site submits nothing.
 */
export async function submitDeployChanges(): Promise<void> {
  const current = computeManifest();
  const previous = await liveManifest();
  if (previous === "down") {
    console.log("[indexnow] deploy: live site not reachable, nothing submitted");
    return;
  }
  if (previous && previous.buildId === current.buildId) return; // a restart, not a deploy
  const urls = changedUrls(previous, current);
  if (urls.length === 0) {
    console.log("[indexnow] deploy: no page changed");
    return;
  }
  // Submit only once the engines would fetch the new pages (up to 15 minutes).
  for (let i = 0; i < 60; i++) {
    await sleep(15_000);
    const live = await liveManifest();
    if (live && live !== "down" && live.buildId === current.buildId) {
      await submit(urls, previous ? "deploy (changed pages)" : "deploy (first submission)");
      return;
    }
  }
  console.log("[indexnow] deploy: this build never became the live one, nothing submitted");
}

/** Every 10 minutes: press releases whose publish time has passed since the last look. */
export function watchScheduledReleases(): void {
  let since = Date.now();
  setInterval(() => {
    const now = Date.now();
    const due = getAllPressReleases(new Date(now)).filter((r) => {
      const t = new Date(r.date).getTime();
      return t > since && t <= now;
    });
    since = now;
    if (due.length === 0) return;
    const urls = due.map((r) => `${SITE_URL}/news/press/${r.slug}`);
    // A minute later, so the page is certainly being served.
    setTimeout(() => {
      void submit([...urls, `${SITE_URL}/news/press`, `${SITE_URL}/news`], "press release live");
    }, 60_000);
  }, 10 * 60 * 1000);
}
