import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import PressMarquee from "@/components/PressMarquee";
import { ButtonPrimary, ButtonGhost } from "@/components/Button";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Prisma House — Marketing that refracts into results",
  description:
    "A marketing consultancy for ambitious brands. Brand strategy, growth marketing, thought leadership, PR and audits — held to commercial numbers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prisma House — Marketing that refracts into results",
    description:
      "A marketing consultancy for ambitious brands. Strategy, story and pipeline — held to commercial numbers.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
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
            <p className="eyebrow mb-8">Independent marketing consultancy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-5xl">
              One brand. Every angle.{" "}
              <span className="text-prism">All signal.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim md:text-xl">
              Prisma is the marketing consultancy for brands that are done with
              busywork. We take the white light of your ambition and refract it
              into strategy, story and pipeline — every channel pointing the
              same way, every pound accountable.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonPrimary href="/contact">Book a call</ButtonPrimary>
              <ButtonGhost href="/services">Explore services</ButtonGhost>
            </div>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      {/* ---------- Press features ---------- */}
      <section className="border-b border-ink-line py-16">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <h2 className="eyebrow mb-8 text-center">We secure coverage in</h2>
          </Reveal>
        </div>
        <PressMarquee />
      </section>

      {/* ---------- Services preview ---------- */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">What we do</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-xl max-w-2xl">
                  Five disciplines.{" "}
                  <span className="text-prism">One direction.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <ButtonGhost href="/services">All services</ButtonGhost>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="group relative bg-ink p-9 transition-colors duration-300 hover:bg-ink-card"
              >
                <div className="text-bone-dim transition-colors duration-300 group-hover:text-prism-violet">
                  {service.icon}
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-bone">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {service.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-bone-faint transition-all duration-300 group-hover:gap-3 group-hover:text-bone">
                  Learn more
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8h11M9 3.5L13.5 8 9 12.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="beam absolute inset-x-0 top-0 h-0.5 scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
            {/* Filler CTA cell to complete the grid */}
            <div className="relative flex flex-col justify-center bg-ink p-9">
              <p className="font-display text-xl font-bold tracking-tight text-bone">
                Not sure where to start?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                Most engagements begin with a conversation, not a contract.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-prism-violet transition-colors hover:text-bone"
                >
                  Talk it through with us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Results / stats ---------- */}
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
            <Stats />
          </Reveal>
        </div>
      </section>

      {/* ---------- What to expect ---------- */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">What to expect</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-3xl">
              Your first 90 days,{" "}
              <span className="text-prism">mapped out.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                phase: "First 30 days",
                title: "Diagnosis",
                copy: "We take your marketing apart — strategy, spend, channels, message — and find where growth actually comes from. You get an honest picture of what's working, what isn't, and why, presented to your leadership team.",
              },
              {
                phase: "Days 30–60",
                title: "Focus & plan",
                copy: "Together we choose the few moves that change your trajectory, and cut the rest. Out comes a prioritised roadmap with owners, budgets and targets — sharp enough to defend in front of any board.",
              },
              {
                phase: "Days 60–90",
                title: "Execution & compounding",
                copy: "The plan goes live. We work alongside your team to ship the first campaigns, set the measurement rhythm, and build the systems that keep getting stronger long after we've gone.",
              },
            ].map((step, i) => (
              <Reveal key={step.phase} delay={i * 0.12}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-ink-line bg-ink-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50">
                  <span
                    className="beam absolute inset-x-8 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <p className="eyebrow !text-prism-violet">{step.phase}</p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How we work ---------- */}
      <section className="border-t border-ink-line py-28 md:py-36">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-4">How we work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-xl mb-16 max-w-3xl">
              Diagnose. Focus. <span className="text-prism">Compound.</span>
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Diagnose",
                copy: "We start by finding the truth: where your growth actually comes from, what's genuinely broken, and what's merely noisy. No assumptions survive week one.",
              },
              {
                step: "02",
                title: "Focus",
                copy: "Then we cut. Most marketing plans fail from excess, not absence. We put your budget and energy behind the few moves that change the trajectory.",
              },
              {
                step: "03",
                title: "Compound",
                copy: "Finally we build systems — brand, content, channels — that get stronger with repetition, so every quarter starts further ahead than the last.",
              },
            ].map((item, i) => (
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
    </>
  );
}
