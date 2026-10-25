import { NextResponse } from "next/server";
import { graphConfigured, sendGraphMail } from "@/lib/graph-mail";
import { contactNeedLabel, normalizeContactNeed } from "@/lib/contact-needs";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  need?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const need = normalizeContactNeed(payload.need);

  if (!need) {
    return NextResponse.json(
      { error: "Please tell us what you need." },
      { status: 400 },
    );
  }
  const needLabel = contactNeedLabel(need);

  if (!name || name.length > 200) {
    return NextResponse.json(
      { error: "Please provide your name." },
      { status: 400 },
    );
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please provide a message between 10 and 5,000 characters." },
      { status: 400 },
    );
  }

  const { CONTACT_TO_EMAIL } = process.env;

  if (!graphConfigured() || !CONTACT_TO_EMAIL) {
    console.error("Contact form: missing Microsoft Graph or CONTACT_TO_EMAIL environment variables.");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  try {
    await sendGraphMail({
      to: CONTACT_TO_EMAIL,
      replyTo: { address: email, name },
      subject: `New enquiry — ${needLabel} — from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <h2 style="font-family:sans-serif">New website enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px" cellpadding="6">
          <tr><td><strong>Need</strong></td><td>${escapeHtml(needLabel)}</td></tr>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Company</strong></td><td>${escapeHtml(company) || "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return NextResponse.json(
      { error: "We couldn't send your message just now. Please try again." },
      { status: 502 },
    );
  }
}
