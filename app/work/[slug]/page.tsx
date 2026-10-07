import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { WORK, getWork, resolveImage, type WorkFeature } from "@/lib/work";
import { SERVICES } from "@/lib/services";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = { params: { slug: string } };

// Unpublished projects (published: false) exist only in development, where they
// render with a preview banner for review. In production they are not generated
// and any request for them is a 404.
const IS_PROD = process.env.NODE_ENV === "production";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.filter((p) => !IS_PROD || p.published).map((p) => ({ slug: p.slug }));
}

function getVisibleWork(slug: string) {
  const p = getWork(slug);
  if (!p || (IS_PROD && !p.published)) return undefined;
  return p;
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getVisibleWork(params.slug);
  if (!p) return {};
  const hero = resolveImage(p.heroImage);
  return {
    title: `${p.category} — Case Study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    robots: p.published ? undefined : { index: false, follow: false },
    openGraph: {
      title: `${p.category} | Work | ${SITE_NAME}`,
      description: p.summary,
      url: `/work/${p.slug}`,
      images: hero ? [{ url: hero.src, width: hero.width, height: hero.height }] : undefined,
    },
  };
}

/** One "What's inside" block: title, two lines and the 4:3 crop, alternating left/right. */
function FeatureBlock({ feature, index }: { feature: WorkFeature; index: number }) {
  const img = resolveImage(feature.image);
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="grid items-center gap-8 md:grid-cols-5 md:gap-6">
      {img && (
        <div className={`md:col-span-3 ${reverse ? "md:order-2" : ""}`}>
          <Reveal>
            <div
              className="overflow-hidden rounded-[2rem] border border-ink-line bg-ink-card shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
              style={{ maxWidth: img.cssWidth, marginInline: reverse ? "0 auto" : "auto 0" }}
            >
              <Image
                src={img.src}
                alt={feature.alt ?? feature.title}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      )}
      <div className={`${img ? "md:col-span-2" : "md:col-span-5 max-w-2xl"} ${reverse ? "md:order-1 md:pr-6 lg:pr-10" : "md:pl-6 lg:pl-10"}`}>
        <Reveal delay={0.1}>
          <p className="font-display text-sm font-bold text-prism-violet">{number}</p>
          <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-bone md:text-3xl">{feature.title}</h3>
          <p className="mt-4 leading-relaxed text-bone-dim">{feature.text}</p>
        </Reveal>
      </div>
    </article>
  );
}

export default function CaseStudyPage({ params }: Props) {
  const p = getVisibleWork(params.slug);
  if (!p) notFound();

  const url = `${SITE_URL}/work/${p.slug}`;
  const service = SERVICES.find((s) => s.slug === p.service);
  const hero = resolveImage(p.heroImage);

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.category,
    headline: p.tagline,
    description: p.summary,
    url,
    inLanguage: "en-GB",
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    genre: p.kind,
    keywords: p.stack.join(", "),
    image: hero ? `${SITE_URL}${hero.src}` : undefined,
    ...(p.siteUrl ? { sameAs: p.siteUrl } : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: p.category, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {!p.published && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-prism-amber/40 bg-prism-amber/10 px-6 py-2 text-center text-xs font-semibold text-prism-amber backdrop-blur">
          Preview — not yet published. Hidden from the Work page, sitemap and search engines.
        </div>
      )}

      {/* ---------- Hero: title, the problem, components, full-width crop ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-24 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #4ED9E1)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-12 pt-44 lg:px-10">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-bone-faint">
              <Link href="/" className="transition-colors hover:text-bone">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/work" className="transition-colors hover:text-bone">Work</Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone-dim">{p.category}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-prism-violet">{p.kind}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-5xl">{p.category}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bone-dim md:text-xl">{p.problem}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Components">
              {p.components.map((c) => (
                <li key={c} className="rounded-full border border-ink-line px-3 py-1 text-xs font-semibold text-bone-dim">{c}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            {p.siteUrl ? (
              <a
                href={p.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-prism-violet"
              >
                Live at {p.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            ) : (
              <p className="mt-8 text-sm font-semibold text-bone-dim">{p.privateNote ?? "Private system, demo on request"}</p>
            )}
          </Reveal>
        </div>
      </section>

      {hero ? (
        <section className="mx-auto max-w-[1440px] px-5 pt-4">
          <Reveal>
            <div className="mx-auto overflow-hidden rounded-[2rem] border border-ink-line bg-ink-card shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]" style={{ maxWidth: hero.cssWidth }}>
              <Image
                src={hero.src}
                alt={p.heroAlt ?? `${p.category} screenshot`}
                width={hero.width}
                height={hero.height}
                sizes="(min-width: 1200px) 1176px, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </Reveal>
          {p.provenance && (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-bone-faint">{p.provenance}</p>
            </Reveal>
          )}
        </section>
      ) : null}

      {/* ---------- What's inside ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">What&apos;s inside</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl max-w-3xl">
              The parts that <span className="text-prism">do the work.</span>
            </h2>
          </Reveal>
        </div>
        {p.features.some((f) => resolveImage(f.image)) ? (
          <div className="mx-auto mt-16 max-w-[1440px] space-y-20 px-5 md:mt-20 md:space-y-28">
            {p.features.map((f, i) => (
              <FeatureBlock key={f.title} feature={f} index={i} />
            ))}
          </div>
        ) : (
          // No crops yet for this example: a plain grid of cards, aligned with the heading.
          <div className="mx-auto mt-14 grid max-w-shell gap-4 px-6 md:grid-cols-2 lg:px-10">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-[1.5rem] border border-ink-line bg-ink-card p-7">
                  <p className="font-display text-sm font-bold text-prism-violet">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-bone">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-bone-dim">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Built with + CTA ---------- */}
      <section className="border-t border-ink-line bg-ink-soft py-20">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Built with</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display text-lg font-semibold leading-relaxed text-bone md:text-xl">
              {p.stack.join(" · ")}
            </p>
          </Reveal>
          {p.integrations && p.integrations.length > 0 && (
            <Reveal delay={0.1}>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">Integrations: {p.integrations.join(", ")}.</p>
            </Reveal>
          )}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-ink-line pt-14">
            <div>
              <Reveal>
                <h2 className="display-lg max-w-xl">
                  {service ? `Need ${service.title.toLowerCase().replace("&", "and")} like this?` : "Need something like this?"}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-lg text-bone-dim">
                  {service ? service.tagline : "Tell us what you are trying to build."}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <ButtonPrimary href="/contact">Book a call</ButtonPrimary>
                {service && <ButtonGhost href={`/services#${service.slug}`}>See the service</ButtonGhost>}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
