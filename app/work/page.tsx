import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import { ButtonGhost } from "@/components/Button";
import { getPublishedWork, resolveImage } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Websites, Systems & Products We Built",
  description:
    "Selected work by Prisma House: a video interview platform, a CRM and back office, a publishing site with a book store and a SaaS with subscriptions. Real features and real screens, no invented results.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Prisma House",
    description: "Websites, systems and products we have designed and built.",
    url: "/work",
  },
};

export default function WorkPage() {
  const projects = getPublishedWork();
  const items = projects.map((p) => ({
    slug: p.slug,
    category: p.category,
    kind: p.kind,
    tagline: p.tagline,
    image: resolveImage(p.heroImage),
  }));

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prisma House — selected work",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/work/${p.slug}`,
      name: p.category,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -right-32 top-10 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #4ED9E1, #7C5CFF)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              Things we have <span className="text-prism">actually built.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Websites, internal systems and a product of our own. Every case study
              below lists real features taken from the code and shows real screens
              — no invented numbers, no borrowed testimonials.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <a
              href="/prisma-house-portfolio.pdf"
              download="Prisma-House-Selected-Work.pdf"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-bone transition-all duration-300 hover:border-prism-violet hover:text-prism-violet"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12.5h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download our portfolio (PDF)
            </a>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <WorkGrid items={items} />
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-soft py-20">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-8 px-6 lg:px-10">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl">Have something similar in mind?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-bone-dim">
                Tell us what you are trying to run, sell or replace. We will tell you
                honestly whether it is a website, a system, or both.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ButtonGhost href="/contact">Start the conversation</ButtonGhost>
          </Reveal>
        </div>
      </section>
    </>
  );
}
