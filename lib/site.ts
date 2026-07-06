export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismaconsulting.co.uk";

export const SITE_NAME = "Prisma Consulting";

export const SITE_DESCRIPTION =
  "Prisma Consulting is a UK-based marketing consultancy helping ambitious brands in the UK and USA turn strategy into measurable growth.";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/your-link/intro-call";
