/**
 * Email through Microsoft Graph (no SMTP, no password): the contact form's only way to send.
 *
 * App registration "Prisma House website contact form" in the prisma-house.com tenant, client
 * credentials (client id + secret). The app has NO tenant-wide Mail.Send consent in Entra: Exchange
 * Online "RBAC for Applications" grants it Mail.Send on one mailbox only (CONTACT_SENDER_MAILBOX,
 * gianmarco@prisma-house.com) — ops script in ~/Projects/prisma-house-ops.
 *
 * Env: MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, CONTACT_SENDER_MAILBOX (the mailbox that
 * sends), CONTACT_FROM_EMAIL (the address shown as From: an alias of that mailbox, info@).
 */

type Token = { value: string; expiresAt: number };
let cached: Token | null = null;

export function graphConfigured(): boolean {
  const e = process.env;
  return Boolean(e.MS_TENANT_ID && e.MS_CLIENT_ID && e.MS_CLIENT_SECRET && e.CONTACT_SENDER_MAILBOX);
}

async function token(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.value;
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;
  const res = await fetch(`https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID as string,
      client_secret: MS_CLIENT_SECRET as string,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(`Graph token: HTTP ${res.status} ${data.error ?? ""}`.trim());
  }
  cached = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cached.value;
}

export type GraphMail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: { address: string; name?: string };
  fromName?: string;
};

/** Sends one email from CONTACT_SENDER_MAILBOX, shown as CONTACT_FROM_EMAIL. Throws on failure. */
export async function sendGraphMail(mail: GraphMail): Promise<void> {
  const sender = process.env.CONTACT_SENDER_MAILBOX as string;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || sender;
  const message = {
    subject: mail.subject,
    body: { contentType: "HTML", content: mail.html },
    from: { emailAddress: { address: fromAddress, name: mail.fromName ?? "Prisma House Website" } },
    toRecipients: [{ emailAddress: { address: mail.to } }],
    replyTo: mail.replyTo ? [{ emailAddress: mail.replyTo }] : [],
  };
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message, saveToSentItems: true }),
    cache: "no-store",
  });
  if (res.status !== 202) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Graph sendMail: HTTP ${res.status} ${detail.slice(0, 300)}`);
  }
}
