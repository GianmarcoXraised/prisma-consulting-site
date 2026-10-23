export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prisma-house.com";

export const SITE_NAME = "Prisma House";

// The one definition of the company: footer tagline, default meta/OG/Twitter description and
// the JSON-LD description all use this sentence, word for word. Do not add variants.
export const SITE_DESCRIPTION =
  "Prisma House is a London-based studio that builds custom CRMs, business systems and websites for growing companies, with the marketing strategy built in.";

export const SITE_TAGLINE = "We shape the strategy. Then we build it.";

// The site OG image (app/opengraph-image.tsx). A page that sets its own `openGraph` loses the
// inherited image, so pages pass this explicitly unless they have a better one.
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

export const CONTACT_EMAIL = "info@prisma-house.com";

export const FOUNDER_LINKEDIN =
  "https://www.linkedin.com/in/gianmarco-giordaniello-6563b725a/";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Case Studies" },
  { href: "/marketing-consulting", label: "Marketing Consulting" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News & Press" },
  { href: "/contact", label: "Contact" },
] as const;

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/your-link/intro-call";
