/**
 * "From" prices. Leave a value as null and nothing is shown; set a number (in pounds, e.g. 4000)
 * and "From £4,000" appears under the matching service on /services and on the matching home tiles.
 */
export const PRICES = {
  /** Custom Systems & CRM, and the CRM and Portal tiles on the home page. */
  system: null as number | null,
  /** Web Design & Development, and the Website tile on the home page. */
  website: null as number | null,
  /** Strategy & Scoping Sprint. */
  sprint: null as number | null,
};

export type PriceKey = keyof typeof PRICES;

/** Which price belongs to which service (lib/services.tsx slug). */
export const SERVICE_PRICE: Record<string, PriceKey> = {
  "custom-systems-crm": "system",
  "web-design-development": "website",
  "strategy-scoping-sprint": "sprint",
};

/** Which price belongs to which category tile on the home page (lib/categories.ts slug). */
export const CATEGORY_PRICE: Record<string, PriceKey> = {
  crm: "system",
  portal: "system",
  website: "website",
};

/** "From £4,000", or null when no price is set. */
export function fromPrice(key: PriceKey | undefined): string | null {
  const value = key ? PRICES[key] : null;
  if (value == null) return null;
  return `From £${value.toLocaleString("en-GB")}`;
}
