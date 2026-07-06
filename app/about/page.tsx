import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ButtonPrimary } from "@/components/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Prisma Consulting is a marketing consultancy founded by Gianmarco Giordaniello. Our story, our mission, and the values we refuse to compromise on.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Prisma Consulting",
    description:
      "The story, mission and values behind Prisma Consulting — a marketing consultancy for ambitious brands.",
    url: "/about",
  },
};

const VALUES = [
  {
    title: "Truth before tactics",
    copy: "We'd rather lose a pitch than flatter a bad strategy. Every engagement starts with an honest diagnosis, even when it's uncomfortable — especially when it's uncomfortable.",
  },
  {
    title: "Fewer things, done properly",
    copy: "Marketing plans fail from excess, not absence. We put weight behind the handful of moves that change a trajectory, and we say no to everything else.",
  },
  {
    title: "Numbers you can defend",
    copy: "Every recommendation must survive a finance director's scrutiny. If we can't connect the work to pipeline or revenue, we don't put it in the plan.",
  },
  {
    title: "Craft is the strategy",
    copy: "A brilliant plan executed carelessly is a mediocre plan. We sweat headlines, decks and details, because your audience only ever sees the execution.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -left-32 top-24 h-[24rem] w-[24rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #4ED9E1, #7C5CFF)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">About us</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-5xl">
              We started Prisma because marketing had stopped{" "}
              <span className="text-prism">meaning anything.</span>
            </h1>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Story ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-shell gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <Reveal>
            <h2 className="display-lg lg:sticky lg:top-32">Our story</h2>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-bone-dim">
            <Reveal>
              <p>
                Prisma Consulting was founded on a simple
                observation: the marketing industry had become extraordinarily
                good at producing activity, and extraordinarily bad at
                producing outcomes. Dashboards multiplied. Channels multiplied.
                Agencies multiplied. Results didn&rsquo;t.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                We chose the name deliberately. A prism doesn&rsquo;t create
                light — it takes what&rsquo;s already there and reveals what
                it&rsquo;s made of. That&rsquo;s our job. Every brand we work
                with already has something true and valuable at its core. Our
                work is to refract that single beam of ambition into its full
                spectrum: positioning, story, content, visibility, demand.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Today we advise ambitious companies of every stripe —
                from venture-backed challengers to established firms
                re-finding their edge. We stay deliberately small, take on a
                limited number of clients at a time, and work directly with
                founders and leadership teams. No account-manager relay race,
                no juniors learning on your budget.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="relative overflow-hidden border-y border-ink-line bg-ink-soft py-24 md:py-32">
        <div
          className="prism-orb -right-24 top-0 h-80 w-80"
          style={{ background: "linear-gradient(45deg, #7C5CFF, #E14ECA)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Our mission</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display-xl mx-auto max-w-4xl">
              To make marketing a source of{" "}
              <span className="text-prism">competitive advantage</span> again —
              measured in revenue, defended in boardrooms, felt in markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">What we stand for</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-2xl">
              Four values. <span className="text-prism">Zero exceptions.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-ink-line bg-ink-card p-9 transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50">
                  <span className="font-display text-sm font-bold text-prism-violet">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                    {value.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <section className="border-t border-ink-line py-24 md:py-32">
        <div className="mx-auto grid max-w-shell items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <Reveal>
            <div className="mx-auto w-full max-w-md">
              <div
                className="rounded-3xl p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(135deg, #7C5CFF, #E14ECA 40%, #FFB347 75%, #4ED9E1)",
                }}
              >
                <div className="overflow-hidden rounded-3xl bg-ink">
                  <Image
                    src="/founder/gianmarco_founder_dark.jpg"
                    alt="Gianmarco Giordaniello, Founder & CEO of Prisma Consulting"
                    width={800}
                    height={800}
                    sizes="(max-width: 1024px) 90vw, 28rem"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between px-1">
                <div>
                  <p className="font-display text-lg font-bold text-bone">
                    Gianmarco Giordaniello
                  </p>
                  <p className="text-sm text-bone-dim">Founder &amp; CEO</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/gianmarco-giordaniello-6563b725a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Gianmarco Giordaniello on LinkedIn (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-bone-dim transition-all duration-300 hover:border-prism-violet hover:text-prism-violet"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-4">The founder</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg">
                &ldquo;I built the consultancy I kept wishing existed on the
                other side of the table.&rdquo;
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-5 leading-relaxed text-bone-dim">
                <p>
                  Gianmarco Giordaniello founded Prisma after a decade spent on
                  both sides of the marketing divide — building brands in-house
                  and advising them from the outside. He watched too many
                  capable companies pour money into marketing that looked
                  impressive and moved nothing, and decided the fix
                  wasn&rsquo;t another agency. It was a different kind of
                  counsel.
                </p>
                <p>
                  As CEO, he leads Prisma&rsquo;s team of senior strategists
                  and stays personally close to every engagement — from the
                  first diagnostic to the board presentation. Nothing carries
                  the Prisma name without being shaped, and challenged, at the
                  top.
                </p>
                <p>
                  His standard for the work is simple: find the one true thing
                  a brand can say better than anyone, then cut everything that
                  dilutes it. If a recommendation can&rsquo;t survive a
                  board&rsquo;s scrutiny, it doesn&rsquo;t leave the building.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8">
                <ButtonPrimary href="/contact">
                  Talk to our team
                </ButtonPrimary>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
