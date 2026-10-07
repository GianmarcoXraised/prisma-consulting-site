import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkExplorer, { type ExplorerExample } from "@/components/WorkExplorer";
import { ButtonGhost } from "@/components/Button";
import { CATEGORIES } from "@/lib/categories";
import { getPublishedWork, getWork, resolveImage } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — What We Build: Websites, Portals, CRM, CMS, SaaS, AI Agents",
  description:
    "Six things we build, each with a real example: websites, client portals, a CRM and back office, a CMS, a SaaS with subscriptions and AI agents. Real screens, no invented results.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Prisma House",
    description: "What we build, with real examples.",
    url: "/work",
  },
};

export default function WorkPage() {
  const projects = getPublishedWork();
  const examples: Record<string, ExplorerExample> = {};
  for (const c of CATEGORIES) {
    for (const slug of c.examples) {
      const p = getWork(slug);
      if (!p || !p.published) continue;
      examples[slug] = {
        slug: p.slug,
        title: p.category,
        kind: p.kind,
        tagline: p.tagline,
        problem: p.problem,
        components: p.components,
        siteUrl: p.siteUrl,
        privateNote: p.privateNote,
        hero: resolveImage(p.heroImage),
        heroAlt: p.heroAlt ?? `${p.category} screenshot`,
        features: p.features.map((f) => ({ title: f.title, text: f.text, alt: f.alt, image: resolveImage(f.image) })),
        provenance: p.provenance,
      };
    }
  }

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
        <div className="relative mx-auto max-w-shell px-6 pb-16 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              What we <span className="text-prism">build.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Six kinds of thing, each with a real example underneath: pick one to see the
              screens. No invented numbers, no borrowed testimonials.
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

      <section className="pb-20 pt-4 md:pb-28">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <WorkExplorer categories={CATEGORIES} examples={examples} />
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
            <ButtonGhost href="/contact">Book a call</ButtonGhost>
          </Reveal>
        </div>
      </section>
    </>
  );
}
