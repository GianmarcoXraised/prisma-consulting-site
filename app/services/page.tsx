import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGE } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { ButtonGhost } from "@/components/Button";
import ServiceList from "@/components/ServiceList";
import { SERVICES } from "@/lib/services";
import LegacyAnchorRedirect from "@/components/LegacyAnchorRedirect";

const SERVICES_TITLE =
  "Custom CRM Development, Business Systems & Websites | Prisma House";
const SERVICES_DESCRIPTION =
  "Custom CRM development, bespoke business systems, client portals and website redesign, scoped from the strategy and built by the people who scope them, plus a two-week, fixed-price Strategy & Scoping Sprint.";

export const metadata: Metadata = {
  title: { absolute: SERVICES_TITLE },
  description: SERVICES_DESCRIPTION,
  keywords: [
    "custom CRM development",
    "bespoke business systems",
    "website redesign",
    "bespoke business management system",
    "client portal development",
    "web design and development",
    "strategy and scoping sprint",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    url: "/services",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const BUILD = SERVICES.filter((s) => s.group === "build");

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BUILD.flatMap((s) => s.questions ?? []).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// The consulting services moved to /marketing-consulting (2026-10-23): old anchors follow them.
const MOVED_ANCHORS: Record<string, string> = {
  "#consult": "/marketing-consulting",
  "#marketing": "/marketing-consulting",
  "#pr-visibility": "/marketing-consulting#media-pitching",
  ...Object.fromEntries(
    SERVICES.filter((s) => s.group === "consult").map((s) => [
      `#${s.slug}`,
      `/marketing-consulting#${s.slug}`,
    ]),
  ),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <LegacyAnchorRedirect redirects={MOVED_ANCHORS} />

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -right-32 top-10 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #E14ECA, #FFB347)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Services</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              We shape the strategy.{" "}
              <span className="text-prism">Then we build it.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              We build the custom CRMs, business systems and websites growing
              companies run on, and we start every build from the strategy.
              The people who scope the work are the people who ship it.
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <ServiceList services={BUILD} />
          <Reveal>
            <p className="mt-28 border-t border-ink-line pt-10 text-lg text-bone-dim">
              Looking for marketing strategy, growth or media pitching?{" "}
              <Link
                href="/marketing-consulting"
                className="font-semibold text-prism-violet transition-colors hover:text-bone"
              >
                See Marketing Consulting <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Bottom CTA strip ---------- */}
      <section className="border-t border-ink-line bg-ink-soft py-20">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-8 px-6 lg:px-10">
          <div>
            <Reveal>
              <h2 className="display-lg max-w-xl">
                Need something that doesn&rsquo;t fit a box?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-bone-dim">
                The best briefs often start as &ldquo;we&rsquo;re not sure
                this is a marketing problem&rdquo;. Tell us what&rsquo;s keeping
                growth flat — we&rsquo;ll tell you honestly whether we can help,
                and whether the answer is a strategy, a website, a system, or
                all three.
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
