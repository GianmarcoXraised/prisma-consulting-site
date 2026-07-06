import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, growth marketing, content and thought leadership, PR and visibility, and marketing audits — five disciplines, one direction, all held to commercial numbers.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Prisma House",
    description:
      "Five marketing consulting disciplines, one direction — brand strategy, growth, content, PR and audits.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
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
              Every service, aimed at{" "}
              <span className="text-prism">one number.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              We don&rsquo;t sell hours; we sell outcomes. Each engagement is
              scoped around the commercial result it must produce — and every
              deliverable below exists because it moves that number.
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell space-y-28 px-6 lg:px-10">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28"
            >
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
                    <h2 className="display-lg">{service.title}</h2>
                    <p className="mt-4 font-display text-lg font-semibold text-prism-violet">
                      {service.tagline}
                    </p>
                    <p className="mt-5 leading-relaxed text-bone-dim">
                      {service.description}
                    </p>
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
              {i < SERVICES.length - 1 && (
                <div className="mt-28 h-px w-full bg-ink-line" />
              )}
            </article>
          ))}
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
                Plenty of our best work started as &ldquo;we&rsquo;re not sure
                this is a marketing problem&rdquo;. Tell us what&rsquo;s keeping
                growth flat — we&rsquo;ll tell you honestly whether we can help.
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
