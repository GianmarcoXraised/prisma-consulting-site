import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Reveal from "@/components/Reveal";
import { ButtonGhost } from "@/components/Button";
import { getAllArticles, getArticle, formatDate } from "@/lib/news";
import { SITE_URL } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "Prisma Consulting" },
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="relative overflow-hidden">
        <div
          className="prism-orb -left-40 top-20 h-[22rem] w-[22rem]"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #4ED9E1)" }}
        />
        <header className="relative mx-auto max-w-3xl px-6 pb-14 pt-44">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-bone-faint">
              <Link
                href="/news"
                className="transition-colors hover:text-bone"
              >
                ← All articles
              </Link>
              <span aria-hidden="true">·</span>
              <span className="rounded-full border border-ink-line px-3 py-1 font-semibold uppercase tracking-wider text-bone-dim">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-4 border-t border-ink-line pt-6 text-sm text-bone-dim">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-prism-violet to-prism-magenta font-display text-xs font-bold text-bone"
                aria-hidden="true"
              >
                {article.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-bone">{article.author}</p>
                <time dateTime={article.date} className="text-xs">
                  {formatDate(article.date)}
                </time>
              </div>
            </div>
          </Reveal>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-24">
          <div className="prose-prisma">
            <MDXRemote source={article.content} />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-ink-line bg-ink-card p-8">
            <div>
              <p className="font-display text-xl font-bold text-bone">
                Enjoyed this? There&rsquo;s more where it came from.
              </p>
              <p className="mt-2 text-sm text-bone-dim">
                Or skip the reading and talk to us about your brand directly.
              </p>
            </div>
            <ButtonGhost href="/contact">Book a call</ButtonGhost>
          </div>
        </div>
      </article>
    </>
  );
}
