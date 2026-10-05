import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import { ButtonGhost } from "@/components/Button";
import { getPublishedWork, resolveImage } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Websites, Systems & Products We Built",
  description:
    "Selected work by Prisma House: websites, a tailored CRM and our own AI visibility product. Real features and real screens, no invented results.",
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
    name: p.name,
    clientLabel: p.clientLabel,
    category: p.category,
    tagline: p.tagline,
    statusNote: p.liveUrl ? undefined : p.statusNote,
    image: resolveImage(p.heroImage, "desktop"),
  }));

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Prisma House — selected work",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/work/${p.slug}`,
      name: p.name,
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
