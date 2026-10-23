import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Reveal from "@/components/Reveal";
import { formatDate } from "@/lib/news";
import { getPressRelease } from "@/lib/press";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";

type Props = { params: { slug: string } };

/** The boilerplate is plain text; its links to this site become links on the page. */
function linkify(text: string) {
  const parts = text.split(/(https:\/\/prisma-house\.com[^\s,]*?)(?=[.,]?(?:\s|$))/);
  return parts.map((part, i) =>
    part.startsWith("https://prisma-house.com") ? (
      <a key={i} href={part} className="text-bone underline decoration-ink-line underline-offset-4 hover:decoration-prism-violet">
        {part.replace(/^https:\/\//, "")}
      </a>
    ) : (
      part
    ),
  );
}

// Rendered per request: a scheduled release (future `date`) is a 404 until its time comes.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  const release = getPressRelease(params.slug);
  if (!release) return {};
  return {
    title: release.title,
    description: release.summary,
    keywords: release.keywords.length ? release.keywords : undefined,
    alternates: { canonical: `/news/press/${release.slug}` },
    openGraph: {
      type: "article",
      title: `${release.title} | ${SITE_NAME}`,
      description: release.summary,
      url: `/news/press/${release.slug}`,
      publishedTime: release.date,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | ${SITE_NAME}`,
      description: release.summary,
      images: [OG_IMAGE.url],
    },
  };
}

export default function PressReleasePage({ params }: Props) {
  const release = getPressRelease(params.slug);
  if (!release) notFound();

  const url = `${SITE_URL}/news/press/${release.slug}`;
  const dateline = `${release.location}, ${formatDate(release.date)}`;
  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
  };

  const newsLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.summary,
    datePublished: release.date,
    dateModified: release.date,
    dateline,
    inLanguage: "en-GB",
    keywords: release.keywords.length ? release.keywords.join(", ") : undefined,
    image: [`${SITE_URL}/opengraph-image`],
    author: organization,
    publisher: organization,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: "Press", item: `${SITE_URL}/news/press` },
      { "@type": "ListItem", position: 4, name: release.title, item: url },
    ],
  };

  const faqLd =
    release.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: release.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const contact = release.mediaContact;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article className="relative overflow-hidden">
        <div
          className="prism-orb -left-40 top-20 h-[22rem] w-[22rem]"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #4ED9E1)" }}
        />
        <header className="relative mx-auto max-w-3xl px-6 pb-12 pt-44">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs text-bone-faint"
            >
              <Link href="/" className="transition-colors hover:text-bone">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/news" className="transition-colors hover:text-bone">
                News
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/news/press" className="transition-colors hover:text-bone">
                Press
              </Link>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {release.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-bone-dim">
              {release.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-line pt-6 text-xs text-bone-faint">
              <span className="rounded-full border border-ink-line px-3 py-1 font-semibold uppercase tracking-wider text-bone-dim">
                Press release
              </span>
              <span>{release.location}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={release.date}>{formatDate(release.date)}</time>
            </div>
          </Reveal>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-24">
          <p className="mb-6 font-semibold text-bone">{dateline} —</p>
          <div className="prose-prisma">
            <MDXRemote source={release.body} />
          </div>

          {release.faq.length > 0 && (
            <section className="mt-16" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="font-display text-2xl font-bold tracking-tight text-bone md:text-3xl"
              >
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-ink-line border-t border-ink-line">
                {release.faq.map((item) => (
                  <div key={item.q} className="py-6">
                    <h3 className="font-display text-lg font-semibold text-bone">
                      {item.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-bone-dim">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 border-t border-ink-line pt-10" aria-labelledby="about-heading">
            <h2 id="about-heading" className="eyebrow mb-4">
              About {SITE_NAME}
            </h2>
            <p className="leading-relaxed text-bone-dim">{linkify(release.boilerplate)}</p>
          </section>

          <section className="mt-10 rounded-2xl border border-ink-line bg-ink-card p-8" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="eyebrow mb-4">
              Media contact
            </h2>
            <ul className="space-y-1.5 text-sm text-bone-dim">
              {contact.name && <li className="font-semibold text-bone">{contact.name}</li>}
              {(contact.title || contact.organization) && (
                <li>{[contact.title, contact.organization].filter(Boolean).join(", ")}</li>
              )}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-bone"
                >
                  {contact.email}
                </a>
              </li>
              {contact.phone && <li>{contact.phone}</li>}
              {contact.website && (
                <li>
                  <a href={contact.website} className="transition-colors hover:text-bone">
                    {contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {contact.address && <li>{contact.address}</li>}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
