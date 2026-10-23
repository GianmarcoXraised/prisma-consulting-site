import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { SERVICES } from "@/lib/services";
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE, OG_IMAGE } from "@/lib/site";
import { CATEGORIES } from "@/lib/categories";
import { CATEGORY_PRICE, fromPrice } from "@/lib/pricing";
import CategoryTile, { CategoryGrid } from "@/components/CategoryTile";

const HOME_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

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

const CRM_SIGNALS = [
  "Your process is genuinely unusual, and the software forces it into someone else's workflow.",
  "Per-seat licences are growing faster than the value the tool delivers.",
  "Your team works in spreadsheets around the CRM instead of inside it.",
];

export default function HomePage() {
  const consult = SERVICES.filter((s) => s.group === "consult");

  return (
    <>
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
              Custom CRM · Business systems · Websites
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
              Custom CRMs, business systems and websites, built around how
              your company actually works. You own every line of it.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonPrimary href="/contact?need=system">Book a call</ButtonPrimary>
              <ButtonGhost href="/work">See what we&rsquo;ve built</ButtonGhost>
            </div>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- 2. What we build ---------- */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">What we build</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-xl max-w-2xl">
                  Built, shipped, <span className="text-prism">in daily use.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <ButtonGhost href="/work">See the examples + portfolio PDF</ButtonGhost>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <CategoryGrid>
              {CATEGORIES.map((c) => (
                <CategoryTile
                  key={c.slug}
                  category={c}
                  href={`/work#${c.slug}`}
                  price={fromPrice(CATEGORY_PRICE[c.slug])}
                />
              ))}
            </CategoryGrid>
          </Reveal>
        </div>
      </section>

      {/* ---------- 3. Is a custom CRM right for you? ---------- */}
      <section className="border-t border-ink-line py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">Custom or off-the-shelf</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-3xl">
              Is a custom CRM <span className="text-prism">right for you?</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {CRM_SIGNALS.map((signal, i) => (
              <Reveal key={signal} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-ink-line bg-ink-card p-8">
                  <span className="font-display text-sm font-bold text-prism-violet">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-bone">
                    {signal}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone-dim">
              If a standard CRM fits your sales motion, use it. We&rsquo;ll
              tell you that before we quote anything.
            </p>
          </Reveal>
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
          <Reveal delay={0.2}>
            <p className="mt-14 border-t border-ink-line pt-8 text-lg text-bone-dim">
              <span className="font-display font-extrabold text-bone">
                You own it<span className="text-prism">.</span>
              </span>{" "}
              Code, data, hosting and documentation stay with you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- 5. Strategy built in ---------- */}
      <section className="border-t border-ink-line py-28 md:py-36">
        <div className="mx-auto grid max-w-shell gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Marketing &amp; growth</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-xl max-w-xl">
                Strategy <span className="text-prism">built in.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
                Every build starts from your positioning and your buyer
                journey, not from a template. If you need the strategy
                itself, we do that too.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-ink-line bg-ink-card p-8 md:p-10">
              <ul className="space-y-3.5">
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
              <div className="mt-8 border-t border-ink-line pt-6">
                <Link
                  href="/marketing-consulting"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
                >
                  Explore marketing &amp; growth
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
      </section>
    </>
  );
}
