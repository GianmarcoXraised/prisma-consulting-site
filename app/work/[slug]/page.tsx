import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { WORK, getWork, resolveImage } from "@/lib/work";
import { SERVICES } from "@/lib/services";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = { params: { slug: string } };

// Unpublished projects still build so they can be reviewed at their URL; they are
// simply not listed, not in the sitemap, and marked noindex.
export function generateStaticParams() {
  return WORK.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getWork(params.slug);
  if (!p) return {};
  const hero = resolveImage(p.heroImage, "desktop");
  return {
    title: `${p.name} — ${p.category === "Websites" ? "Website" : "System"} Case Study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    robots: p.published ? undefined : { index: false, follow: false },
    openGraph: {
      title: `${p.name} | Work | ${SITE_NAME}`,
      description: p.summary,
      url: `/work/${p.slug}`,
      images: hero ? [{ url: hero.src, width: hero.width, height: hero.height }] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const p = getWork(params.slug);
  if (!p) notFound();

  const url = `${SITE_URL}/work/${p.slug}`;
  const service = SERVICES.find((s) => s.slug === p.service);
  const hero = resolveImage(p.heroImage, "desktop");
  const gallery = p.images
    .map((img) => ({ ...img, desktop: resolveImage(img.key, "desktop"), mobile: resolveImage(img.key, "mobile") }))
    .filter((img) => img.desktop || img.mobile);
  const related = WORK.filter((w) => w.published && w.slug !== p.slug).slice(0, 2);

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    headline: p.tagline,
    description: p.summary,
    url,
    inLanguage: "en-GB",
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    genre: p.category,
    keywords: p.stack.join(", "),
    image: hero ? `${SITE_URL}${hero.src}` : undefined,
    ...(p.liveUrl ? { sameAs: p.liveUrl } : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: p.name, item: url },
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

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-24 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #4ED9E1)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-16 pt-44 lg:px-10">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-bone-faint">
              <Link href="/" className="transition-colors hover:text-bone">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/work" className="transition-colors hover:text-bone">Work</Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone-dim">{p.name}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mb-5 flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">
              <span className="rounded-full border border-ink-line px-3 py-1 text-bone-dim">{p.clientLabel}</span>
              <span className="rounded-full border border-ink-line px-3 py-1 text-bone-dim">{p.category}</span>
              {!p.liveUrl && p.statusNote && (
                <span className="rounded-full border border-prism-amber/30 px-3 py-1 text-prism-amber/90">{p.statusNote}</span>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">{p.name}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl font-display text-xl font-semibold text-prism-violet md:text-2xl">{p.tagline}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-bone transition-all duration-300 hover:border-prism-violet hover:text-prism-violet"
                >
                  Visit the live site
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </a>
              ) : null}
              {service && <ButtonGhost href={`/services#${service.slug}`}>See the service: {service.title}</ButtonGhost>}
            </div>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Hero image ---------- */}
      {hero && (
        <section className="mx-auto max-w-shell px-6 pt-16 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-card">
              <Image
                src={hero.src}
                alt={p.images.find((i) => i.key === p.heroImage)?.alt ?? `${p.name} screenshot`}
                width={hero.width}
                height={Math.min(hero.height, Math.round(hero.width * 0.62))}
                sizes="(min-width: 1280px) 80rem, 100vw"
                className="h-auto w-full object-cover object-top"
                style={{ maxHeight: "40rem" }}
                priority
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------- Brief & what we built ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-shell gap-16 px-6 lg:grid-cols-[1fr_1.3fr] lg:px-10">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">The brief</p>
            </Reveal>
            <div className="space-y-5 leading-relaxed text-bone-dim">
              {p.brief.map((para) => (
                <Reveal key={para.slice(0, 32)}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl border border-ink-line bg-ink-card p-6">
                <p className="eyebrow mb-4">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full border border-ink-line px-3 py-1 text-xs font-semibold text-bone-dim">{t}</span>
                  ))}
                </div>
                {p.integrations && p.integrations.length > 0 && (
                  <>
                    <p className="eyebrow mb-4 mt-8">Integrations</p>
                    <p className="text-sm leading-relaxed text-bone-dim">{p.integrations.join(" · ")}</p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow mb-4">What we built</p>
            </Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-bone-dim">
              {p.built.map((para) => (
                <Reveal key={para.slice(0, 32)}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>
            {p.provenance && (
              <Reveal delay={0.1}>
                <p className="mt-8 border-l-2 border-prism-amber/60 pl-5 text-sm text-bone-faint">{p.provenance}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="border-y border-ink-line bg-ink-soft py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Features, by area</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-14 max-w-3xl">
              What it <span className="text-prism">actually does.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {p.featureGroups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-2xl border border-ink-line bg-ink-card p-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-bone">{g.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-bone-dim">
                        <svg className="mt-1 h-4 w-4 shrink-0 text-prism-violet" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {gallery.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-shell px-6 lg:px-10">
            <Reveal>
              <p className="eyebrow mb-4">Screens</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-xl mb-14 max-w-3xl">
                Desktop and <span className="text-prism">mobile.</span>
              </h2>
            </Reveal>
            <div className="space-y-10">
              {gallery.map((img, i) => (
                <Reveal key={img.key} delay={0.05}>
                  <figure className={`grid gap-6 ${img.mobile ? "lg:grid-cols-[1fr_minmax(14rem,22rem)]" : ""}`}>
                    {img.desktop && (
                      <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-card">
                        <Image
                          src={img.desktop.src}
                          alt={img.alt}
                          width={img.desktop.width}
                          height={img.desktop.height}
                          sizes="(min-width: 1024px) 56rem, 100vw"
                          className="h-auto w-full"
                          loading={i < 2 ? "eager" : "lazy"}
                        />
                      </div>
                    )}
                    {img.mobile && (
                      <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-ink-line bg-ink-card">
                        <Image
                          src={img.mobile.src}
                          alt={`${img.alt} — mobile`}
                          width={img.mobile.width}
                          height={img.mobile.height}
                          sizes="22rem"
                          className="h-auto w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <figcaption className="text-xs text-bone-faint lg:col-span-full">{img.caption ?? img.alt}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- CTA ---------- */}
      <section className="border-t border-ink-line bg-ink-soft py-20">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-8 px-6 lg:px-10">
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
              {service && <ButtonPrimary href={`/services#${service.slug}`}>View the service</ButtonPrimary>}
              <ButtonGhost href="/contact">Book a call</ButtonGhost>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- More work ---------- */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-shell px-6 lg:px-10">
            <h2 className="eyebrow mb-6">More work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((w) => (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group rounded-2xl border border-ink-line bg-ink-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-prism-violet/50"
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">{w.clientLabel} · {w.category}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">{w.name}</p>
                  <p className="mt-2 text-sm text-bone-dim">{w.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
