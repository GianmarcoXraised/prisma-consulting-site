/**
 * The five fixed categories of what we build. They are the home page's "What we build" grid,
 * the top of /work, and the first page of each portfolio section. The examples (case studies
 * in lib/work.ts) hang off a category through `examples`.
 */
export type CategorySlug = "website" | "crm" | "cms" | "saas" | "ai-agents";

export type Category = {
  slug: CategorySlug;
  /** The big mark shown in the tile, e.g. "CMS". */
  code: string;
  /** The extended name under the mark. */
  name: string;
  /** One sentence. */
  blurb: string;
  chips: [string, string, string];
  /** Tonal dark gradient for the tile, same family as the home hero's prism colours. */
  gradient: string;
  /** Slugs of the case studies (lib/work.ts) shown in this category's panel, in order. */
  examples: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "website",
    code: "Website",
    name: "Sites that sell",
    blurb: "Marketing sites and stores, designed and built in-house.",
    chips: ["Design", "Copy", "Online checkout"],
    gradient: "linear-gradient(135deg, #1a1430 0%, #2a1a4a 55%, #141419 100%)",
    examples: ["book-store", "video-platform"],
  },
  {
    slug: "crm",
    code: "CRM",
    name: "Your back office, in one place",
    blurb: "Inbox, pipeline, follow-ups and invoices built around how your team works.",
    chips: ["Pipeline", "Invoicing", "Email"],
    gradient: "linear-gradient(135deg, #0f1f2e 0%, #12304a 55%, #141419 100%)",
    examples: ["crm"],
  },
  {
    slug: "cms",
    code: "CMS",
    name: "Your content, in your hands",
    blurb: "A back office where your team updates pages, products and posts without calling a developer.",
    chips: ["Content editor", "Scheduling", "Multi-channel"],
    gradient: "linear-gradient(135deg, #2a1424 0%, #4a1a3a 55%, #141419 100%)",
    examples: ["cms"],
  },
  {
    slug: "saas",
    code: "SaaS",
    name: "From idea to paying users",
    blurb: "Products with accounts, subscriptions and a client area.",
    chips: ["Subscriptions", "Client area", "AI engine"],
    gradient: "linear-gradient(135deg, #2a1e10 0%, #4a3414 55%, #141419 100%)",
    examples: ["saas"],
  },
  {
    slug: "ai-agents",
    code: "AI Agents",
    name: "Systems that do the work",
    blurb: "Agents that take on repetitive work, from drafting to follow-ups, inside your own tools.",
    chips: ["Drafting", "Automation", "Follow-ups"],
    gradient: "linear-gradient(135deg, #0f2a2a 0%, #124a48 55%, #141419 100%)",
    examples: ["ai-agents"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryOfExample(workSlug: string): Category | undefined {
  return CATEGORIES.find((c) => c.examples.includes(workSlug));
}
