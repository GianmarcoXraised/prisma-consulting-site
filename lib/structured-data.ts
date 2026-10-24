import { SERVICES, serviceHref } from "@/lib/services";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  COMPANY_LINKEDIN,
  FOUNDER_LINKEDIN,
} from "@/lib/site";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Sitewide JSON-LD, rendered once in the root layout: the company and the website. */
export const SITE_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      // Offices in London and Rome (cities only, no street address).
      address: [
        { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
      ],
      areaServed: ["GB", "US", "EU"],
      founder: {
        "@type": "Person",
        name: "Gianmarco Giordaniello",
        jobTitle: "Founder & CEO",
        sameAs: FOUNDER_LINKEDIN,
      },
      sameAs: [COMPANY_LINKEDIN],
      knowsAbout: [
        "custom CRM development",
        "business management systems",
        "website design",
        "AI agents",
        "marketing strategy",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Prisma House services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.tagline,
            url: `${SITE_URL}${serviceHref(service)}`,
            provider: { "@id": ORGANIZATION_ID },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};
