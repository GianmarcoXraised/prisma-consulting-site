export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prisma-house.com";

export const SITE_NAME = "Prisma House";

export const SITE_DESCRIPTION =
  "Prisma House is a marketing consultancy helping ambitious brands turn strategy into measurable growth.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/your-link/intro-call";
