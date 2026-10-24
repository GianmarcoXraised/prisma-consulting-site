// The "What do you need?" options on the contact form. The key is what the
// ?need= query parameter and the API accept; the label is what people see.
export const CONTACT_NEEDS = [
  { key: "full-system", label: "The whole connected system" },
  { key: "system", label: "Custom CRM or business system" },
  { key: "website", label: "Website or redesign" },
  { key: "automation", label: "AI automation" },
  { key: "leadgen", label: "Lead generation" },
  { key: "consult", label: "Marketing strategy" },
  { key: "media", label: "Media pitching" },
  { key: "unsure", label: "Not sure yet" },
] as const;

export type ContactNeedKey = (typeof CONTACT_NEEDS)[number]["key"];

// Older links still in circulation: ?need=build was "Website or redesign".
const ALIASES: Record<string, ContactNeedKey> = {
  build: "website",
};

export function isContactNeed(value: unknown): value is ContactNeedKey {
  return CONTACT_NEEDS.some((n) => n.key === value);
}

/** The option key for a ?need= value or a submitted field, aliases included; null if unknown. */
export function normalizeContactNeed(value: unknown): ContactNeedKey | null {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase();
  if (isContactNeed(v)) return v;
  return ALIASES[v] ?? null;
}

export function contactNeedLabel(key: string): string {
  return CONTACT_NEEDS.find((n) => n.key === key)?.label ?? key;
}
