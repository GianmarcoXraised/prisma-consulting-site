// The "What do you need?" options on the contact form. The key is what the
// ?need= query parameter and the API accept; the label is what people see.
export const CONTACT_NEEDS = [
  { key: "build", label: "Website or redesign" },
  { key: "system", label: "Custom system or CRM" },
  { key: "consult", label: "Marketing strategy" },
  { key: "media", label: "Media pitching" },
  { key: "unsure", label: "Not sure yet" },
] as const;

export type ContactNeedKey = (typeof CONTACT_NEEDS)[number]["key"];

export function isContactNeed(value: unknown): value is ContactNeedKey {
  return CONTACT_NEEDS.some((n) => n.key === value);
}

export function contactNeedLabel(key: string): string {
  return CONTACT_NEEDS.find((n) => n.key === key)?.label ?? key;
}
