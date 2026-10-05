import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Commitments from "@/components/Commitments";
import PressMarquee from "@/components/PressMarquee";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { SERVICES, SERVICE_GROUPS } from "@/lib/services";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getPublishedWork, resolveImage } from "@/lib/work";

export const metadata: Metadata = {
  title: "Prisma House — We shape the strategy. Then we build it.",
  description:
    "Marketing consultancy and web & systems studio: brand strategy, growth and media pitching, plus web design, website redesign and custom CRM and business systems — one partner accountable for both.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prisma House — We shape the strategy. Then we build it.",
    description:
      "Positioning, growth and media on one side. The websites and custom systems that make them run on the other.",
    url: "/",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  email: "info@prisma-house.com",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "950 Great West Rd, Suite 2, Floor 1, Profile West",
    addressLocality: "Brentford",
    postalCode: "TW8 9ES",
    addressCountry: "GB",
  },
  sameAs: ["https://www.linkedin.com/in/gianmarco-giordaniello-6563b725a/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prisma House services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.tagline,
        url: `${SITE_URL}/services#${service.slug}`,
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    })),
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const PRISM_BORDER =
  "linear-gradient(135deg, #7C5CFF, #E14ECA 40%, #FFB347 75%, #4ED9E1)";

const STEPS = [
  {
    step: "01",
    title: "Diagnose",
    copy: "We take the whole operation apart — brand, funnel, website and the tools behind it — and find where growth actually comes from and what is quietly holding it back. No assumptions survive week one.",
  },
  {
    step: "02",
    title: "Focus",
    copy: "Then we cut. We choose the few moves that change the trajectory, and scope precisely what needs building to make them work — a page, a site, a system — with owners, budgets and kill criteria.",
  },
  {
    step: "03",
    title: "Build & compound",
    copy: "Campaigns, content, the site or the system go live, built by the same team that set the direction. Reporting is tied to pipeline and revenue, and every quarter starts further ahead than the last.",
  },
];

export default function HomePage() {
  const build = SERVICES.filter((s) => s.group === "build");
  const consult = SERVICES.filter((s) => s.group === "consult");
  const featured = getPublishedWork().filter((p) =>
    ["xraised", "xraised-crm", "bookspert"].includes(p.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />

      {/* ---------- 1. Hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-24 h-[26rem] w-[26rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #E14ECA)" }}
        />
        <div
          className="prism-orb -right-40 top-1/2 h-[30rem] w-[30rem] animate-prism-drift"
          style={{
            background: "linear-gradient(225deg, #4ED9E1, #7C5CFF)",
            animationDelay: "-7s",
          }}
        />
        <div className="relative mx-auto flex min-h-screen max-w-shell flex-col justify-center px-6 pb-24 pt-40 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-8">
              Marketing consultancy · Web &amp; systems studio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-5xl">
              We shape the strategy. Then we{" "}
              <span className="text-prism">build it.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl">
              Positioning, growth and media on one side. The websites and
              custom systems that make them run on the other. One partner,
              accountable for both.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonPrimary href="/contact">Book a call</ButtonPrimary>
              <ButtonGhost href="/work">See our work</ButtonGhost>
            </div>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- 2. Two paths ---------- */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">What we do</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl max-w-3xl">
              Two ways in. <span className="text-prism">One direction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-bone-dim">
              Most clients start on one side and expand into the other.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Build — emphasised with the prism gradient border the site already uses */}
            <Reveal>
              <div
                className="h-full rounded-2xl p-[1.5px]"
                style={{ background: PRISM_BORDER }}
              >
                <div className="flex h-full flex-col rounded-2xl bg-ink-card p-8 md:p-10">
                  <p className="eyebrow !text-prism-violet">
                    {SERVICE_GROUPS.build.eyebrow} ·{" "}
                    {SERVICE_GROUPS.build.title}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">
                    Websites and systems that do the selling.
                  </h3>
                  <p className="mt-4 leading-relaxed text-bone-dim">
                    Your website is your hardest-working salesperson, and your
                    internal systems decide how much of that work actually gets
                    done. We design and build both from the strategy up — then
                    look after them.
                  </p>
                  <ul className="mt-8 space-y-6 border-t border-ink-line pt-8">
                    {build.map((s) => (
                      <li key={s.slug} className="flex gap-4">
                        <span className="mt-0.5 shrink-0 text-prism-violet">
                          {s.icon}
                        </span>
                        <div>
                          <p className="font-display text-lg font-bold tracking-tight text-bone">
                            {s.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-bone-dim">
                            {s.tagline}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href="/work"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
                    >
                      See what we&rsquo;ve built
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Consult */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-ink-line bg-ink-card p-8 md:p-10">
                <p className="eyebrow !text-prism-violet">
                  {SERVICE_GROUPS.consult.eyebrow} ·{" "}
                  {SERVICE_GROUPS.consult.title}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">
                  Strategy a finance director can defend.
                </h3>
                <p className="mt-4 leading-relaxed text-bone-dim">
                  We find where your growth actually comes from, decide what to
                  say, and put your budget behind the few moves that matter.
                  Every recommendation is held to a commercial number, not a
                  vanity metric.
                </p>
                <ul className="mt-8 space-y-3.5 border-t border-ink-line pt-8">
                  {consult.map((s) => (
                    <li key={s.slug} className="flex gap-3.5">
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
                      <span className="font-display font-bold tracking-tight text-bone">
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
                  >
                    Explore consulting
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 3. Selected work ---------- */}
      <section className="border-t border-ink-line py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Selected work</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-xl max-w-2xl">
                  Built, shipped, <span className="text-prism">in daily use.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <ButtonGhost href="/work">All work + portfolio PDF</ButtonGhost>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => {
              const img = resolveImage(p.heroImage, "desktop");
              return (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-ink-line bg-ink-card transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-line bg-ink">
                      {img ? (
                        <Image
                          src={img.src}
                          alt=""
                          width={img.width}
                          height={img.height}
                          sizes="(min-width: 768px) 26rem, 100vw"
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-prism-violet/20 via-ink-card to-prism-cyan/10" />
                      )}
                    </div>
                    <div className="p-7">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">
                        {p.clientLabel} · {p.category}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                        {p.tagline}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- 4. How we work ---------- */}
      <section className="border-t border-ink-line py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">How we work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-3xl">
              Diagnose. Focus.{" "}
              <span className="text-prism">Build &amp; compound.</span>
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {STEPS.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.12}>
                <div className="group border-t border-ink-line pt-8 transition-colors duration-300 hover:border-prism-violet">
                  <span className="font-display text-sm font-bold text-prism-violet">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 5. Proof, not promises ---------- */}
      <section className="relative overflow-hidden border-y border-ink-line bg-ink-soft py-28 md:py-36">
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

      {/* ---------- 6. Outlets we pitch to ---------- */}
      <section className="border-b border-ink-line py-20 md:py-24">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-center">
              TV, Radio, Press &amp; Podcast Pitching
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg mb-10 text-center">Outlets we pitch to</h2>
          </Reveal>
        </div>
        <PressMarquee />
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-bone-faint">
              Editorial coverage is earned at the journalist&rsquo;s or
              producer&rsquo;s discretion. We develop the story, pitch it and
              prepare you — we never guarantee a placement.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
