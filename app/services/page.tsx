import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { SERVICES, SERVICE_GROUPS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Marketing Consultancy, Web Design & CRM Services",
  description:
    "Marketing consultancy services plus the build side: website design and redesign, custom CRM development and bespoke business management systems, UK-based.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Marketing Consultancy, Web Design & CRM Services | Prisma House",
    description:
      "Brand strategy, growth, content, PR and audits — plus the websites and custom systems that run them. Seven disciplines, one direction.",
    url: "/services",
  },
};

const serviceQuestions = SERVICES.flatMap((s) => s.questions ?? []);

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: serviceQuestions.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

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
              Prisma House is one consultancy with two connected halves. The
              first works out where your growth comes from — brand, demand,
              content, visibility, the honest audit. The second builds the
              digital infrastructure that runs it: the website that sells and
              the systems that keep the business moving. Every service is
              scoped around the commercial result it must produce, and the
              people who set the direction are the people who ship it.
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell space-y-28 px-6 lg:px-10">
          {SERVICES.map((service, i) => {
            const startsGroup =
              i === 0 || SERVICES[i - 1].group !== service.group;
            const group = SERVICE_GROUPS[service.group];
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28"
              >
                {startsGroup && (
                  <Reveal>
                    <div className="mb-20 flex flex-wrap items-end justify-between gap-6 border-b border-ink-line pb-8">
                      <div>
                        <p className="eyebrow mb-3 !text-prism-violet">
                          {group.eyebrow}
                        </p>
                        <h2 className="display-lg">{group.title}</h2>
                      </div>
                      <p className="max-w-md text-bone-dim">{group.blurb}</p>
                    </div>
                  </Reveal>
                )}

                <div
                  className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-20 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <div>
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-line bg-ink-card text-prism-violet">
                        {service.icon}
                      </div>
                      <p className="eyebrow mb-3">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="display-lg">{service.title}</h3>
                      <p className="mt-4 font-display text-lg font-semibold text-prism-violet">
                        {service.tagline}
                      </p>
                      <p className="mt-5 leading-relaxed text-bone-dim">
                        {service.description}
                      </p>

                      {service.questions && (
                        <div className="mt-8 space-y-6 border-t border-ink-line pt-8">
                          {service.questions.map((item) => (
                            <div key={item.q}>
                              <h4 className="font-display text-lg font-semibold text-bone">
                                {item.q}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                                {item.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-8">
                        <ButtonPrimary href="/contact">
                          Discuss this service
                        </ButtonPrimary>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="rounded-2xl border border-ink-line bg-ink-card p-8 md:p-10">
                      <p className="eyebrow mb-6">What you get</p>
                      <ul className="space-y-4">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex gap-3.5">
                            <svg
                              className="mt-1 h-4 w-4 shrink-0 text-prism-violet"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.5 8.5l3.5 3.5 7.5-8"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-sm leading-relaxed text-bone-dim">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
                {i < SERVICES.length - 1 &&
                  SERVICES[i + 1].group === service.group && (
                    <div className="mt-28 h-px w-full bg-ink-line" />
                  )}
              </article>
            );
          })}
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
