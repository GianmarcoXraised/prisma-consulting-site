import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ButtonPrimary } from "@/components/Button";
import { contactNeedFor, type Service } from "@/lib/services";
import { SERVICE_PRICE, fromPrice } from "@/lib/pricing";
import { getWork, getWorkByService } from "@/lib/work";

/**
 * The services in full, one block each (icon, number, title, tagline, optional "From £X",
 * description, FAQs, examples, "Discuss this service", "What you get"), alternating sides.
 * Used by /services (the build services) and /marketing-consulting (the consulting ones).
 */
export default function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-28">
      {services.map((service, i) => {
        const price = fromPrice(SERVICE_PRICE[service.slug]);
        const examples = [
          ...getWorkByService(service.slug),
          ...(service.practice ?? []).map((slug) => getWork(slug)).filter(
            (w): w is NonNullable<typeof w> => Boolean(w && w.published),
          ),
        ].filter((w, j, all) => all.findIndex((x) => x.slug === w.slug) === j);
        return (
          <article key={service.slug} id={service.slug} className="scroll-mt-28">
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
                  <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display-lg">{service.title}</h2>
                  <p className="mt-4 font-display text-lg font-semibold text-prism-violet">
                    {service.tagline}
                  </p>
                  {price && <p className="mt-2 text-sm font-semibold text-bone">{price}</p>}
                  <p className="mt-5 leading-relaxed text-bone-dim">{service.description}</p>

                  {service.questions && (
                    <div className="mt-8 space-y-6 border-t border-ink-line pt-8">
                      {service.questions.map((item) => (
                        <div key={item.q}>
                          <h3 className="font-display text-lg font-semibold text-bone">{item.q}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-bone-dim">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {examples.length > 0 && (
                    <div className="mt-8 border-t border-ink-line pt-6">
                      <p className="eyebrow mb-3">See it in practice</p>
                      <ul className="flex flex-wrap gap-2">
                        {examples.map((w) => (
                          <li key={w.slug}>
                            <Link
                              href={`/work/${w.slug}`}
                              className="inline-flex items-center gap-1.5 rounded-full border border-ink-line px-4 py-1.5 text-sm font-semibold text-bone-dim transition-all duration-300 hover:border-prism-violet hover:text-bone"
                            >
                              {w.category} <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-8">
                    <ButtonPrimary href={`/contact?need=${contactNeedFor(service)}`}>
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
                        <span className="text-sm leading-relaxed text-bone-dim">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            {i < services.length - 1 && <div className="mt-28 h-px w-full bg-ink-line" />}
          </article>
        );
      })}
    </div>
  );
}
