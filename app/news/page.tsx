import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAllArticles, formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Essays and analysis on marketing, branding and growth from the Prisma House team — written for leaders who make the decisions, not just the slides.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Insights | Prisma House",
    description:
      "Essays and analysis on marketing, branding and growth from the Prisma House team.",
    url: "/news",
  },
};

export default function NewsPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -right-32 top-20 h-[22rem] w-[22rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #FFB347, #E14ECA)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">News &amp; insights</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              Thinking, in <span className="text-prism">public.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              What we&rsquo;re seeing across the brands we advise — written for
              the people who make the decisions, not just the slides.
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.1}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-ink-line bg-ink-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50"
                >
                  <span className="beam absolute inset-x-8 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-center gap-3 text-xs text-bone-faint">
                    <span className="rounded-full border border-ink-line px-3 py-1 font-semibold uppercase tracking-wider text-bone-dim">
                      {article.category}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink-line pt-5 text-xs text-bone-faint">
                    <span>{article.author}</span>
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
