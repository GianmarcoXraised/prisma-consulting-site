import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Commitments from "@/components/Commitments";
import ServiceList from "@/components/ServiceList";
import { SERVICES, SERVICE_GROUPS } from "@/lib/services";
import { OG_IMAGE } from "@/lib/site";

const CONSULTING_TITLE = "Marketing Consulting: Brand Strategy, Growth & Media Pitching | Prisma House";
const CONSULTING_DESCRIPTION =
  "Brand strategy and positioning, growth marketing, content and thought leadership, TV, radio, press and podcast pitching, and marketing audits: strategy held to a commercial number, not a vanity metric.";

export const metadata: Metadata = {
  title: { absolute: CONSULTING_TITLE },
  description: CONSULTING_DESCRIPTION,
  keywords: [
    "marketing consulting",
    "brand strategy",
    "brand positioning",
    "growth marketing",
    "thought leadership",
    "TV and radio pitching",
    "podcast guest booking",
    "marketing audit",
  ],
  alternates: { canonical: "/marketing-consulting" },
  openGraph: {
    title: CONSULTING_TITLE,
    description: CONSULTING_DESCRIPTION,
    url: "/marketing-consulting",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: CONSULTING_TITLE,
    description: CONSULTING_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const CONSULT = SERVICES.filter((s) => s.group === "consult");

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONSULT.flatMap((s) => s.questions ?? []).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function MarketingConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-16 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #E14ECA)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">
              Marketing Consulting · {SERVICE_GROUPS.consult.title}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              Strategy a finance director{" "}
              <span className="text-prism">can defend.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              We find where your growth actually comes from, decide what to
              say, and put your budget behind the few moves that matter.
              Every recommendation is held to a commercial number, not a
              vanity metric.
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- The consulting services ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <ServiceList services={CONSULT} />
        </div>
      </section>

      {/* ---------- Proof, not promises ---------- */}
      <section className="relative overflow-hidden border-t border-ink-line bg-ink-soft py-28 md:py-36">
        <div
          className="prism-orb -right-24 bottom-0 h-96 w-96"
          style={{ background: "linear-gradient(45deg, #FFB347, #E14ECA)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Proof, not promises</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-3xl">
              We measure ourselves in{" "}
              <span className="text-prism">revenue</span>, not impressions.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Commitments />
          </Reveal>
        </div>
      </section>
    </>
  );
}
