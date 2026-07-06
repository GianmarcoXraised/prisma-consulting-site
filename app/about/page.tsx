import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ButtonPrimary } from "@/components/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Prisma Consulting is a London-based marketing consultancy founded by Gianmarco. Our story, our mission, and the values we refuse to compromise on.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Prisma Consulting",
    description:
      "The story, mission and values behind Prisma Consulting — a London-based marketing consultancy for UK and US brands.",
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
                Prisma Consulting was founded in London with a simple
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
                Today we advise ambitious companies across the UK and the USA —
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
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-ink-line">
              {/* Placeholder portrait — replace with a real photo of Gianmarco */}
              <div className="absolute inset-0 bg-gradient-to-br from-prism-violet/30 via-ink-card to-prism-cyan/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-extrabold text-bone/10">
                  G
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6 pt-16">
                <p className="font-display text-lg font-bold text-bone">
                  Gianmarco
                </p>
                <p className="text-sm text-bone-dim">Founder &amp; Principal</p>
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
                  Gianmarco founded Prisma after a decade spent on both sides
                  of the marketing divide — building brands in-house and
                  advising them from the outside. He watched too many capable
                  companies pour money into marketing that looked impressive
                  and moved nothing, and decided the fix wasn&rsquo;t another
                  agency. It was a different kind of counsel.
                </p>
                <p>
                  He works hands-on with every client Prisma takes on, from the
                  first diagnostic to the board presentation. His approach is
                  equal parts strategist and editor: find the one true thing a
                  brand can say better than anyone, then cut everything that
                  dilutes it.
                </p>
                <p>
                  When he isn&rsquo;t working, you&rsquo;ll find him reading
                  old advertising annuals, arguing that most marketing problems
                  were solved in 1963, and looking for the espresso London
                  still can&rsquo;t quite get right.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8">
                <ButtonPrimary href="/contact">
                  Talk to Gianmarco
                </ButtonPrimary>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
