import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Reveal from "@/components/Reveal";
import { ButtonGhost } from "@/components/Button";
import { getAllArticles, getArticle, formatDate } from "@/lib/news";
import { SERVICES } from "@/lib/services";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.date,
      modifiedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.excerpt,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const url = `${SITE_URL}/news/${article.slug}`;
  const service = article.service
    ? SERVICES.find((s) => s.slug === article.service)
    : undefined;
  const related = article.related
    .map((slug) => getAllArticles().find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    inLanguage: "en-GB",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${SITE_URL}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  const faqLd =
    article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
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
          {/* Breadcrumb */}
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
              <span className="text-bone-dim">{article.category}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-line pt-6 text-xs text-bone-faint">
              <span className="rounded-full border border-ink-line px-3 py-1 font-semibold uppercase tracking-wider text-bone-dim">
                {article.category}
              </span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </Reveal>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-24">
          <div className="prose-prisma">
            <MDXRemote source={article.content} />
          </div>

          {/* FAQ */}
          {article.faqs.length > 0 && (
            <section className="mt-16" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="font-display text-2xl font-bold tracking-tight text-bone md:text-3xl"
              >
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-ink-line border-t border-ink-line">
                {article.faqs.map((faq) => (
                  <div key={faq.q} className="py-6">
                    <h3 className="font-display text-lg font-semibold text-bone">
                      {faq.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-bone-dim">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Service CTA */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-ink-line bg-ink-card p-8">
            <div>
              <p className="font-display text-xl font-bold text-bone">
                {service
                  ? `Want this handled properly? See our ${service.title.toLowerCase()} service.`
                  : "Prefer to talk it through?"}
              </p>
              <p className="mt-2 text-sm text-bone-dim">
                We help ambitious brands turn strategy into measurable growth.
              </p>
            </div>
            <ButtonGhost href={service ? `/services#${service.slug}` : "/contact"}>
              {service ? "View the service" : "Book a call"}
            </ButtonGhost>
          </div>

          {/* Related reading */}
          {related.length > 0 && (
            <section className="mt-20" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="eyebrow mb-6"
              >
                Related reading
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group rounded-2xl border border-ink-line bg-ink-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-prism-violet/50"
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">
                      {item.category}
                    </p>
                    <p className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
