import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Prisma took a brand nobody could describe in one sentence and gave it a story our whole company now tells the same way. Pipeline followed within a quarter.",
    name: "Sarah Whitmore",
    role: "CEO, Halcyon Labs",
  },
  {
    quote:
      "We'd burned through two agencies before them. Prisma were the first to tell us what to stop doing — and that discipline alone paid for the engagement.",
    name: "Marcus Chen",
    role: "VP Marketing, Meridian Bank",
  },
  {
    quote:
      "They work like an extension of the leadership team, not a supplier. Sharp thinking, honest feedback, and numbers we could take straight to the board.",
    name: "Elena Rodriguez",
    role: "Founder, Brightside",
  },
] as const;

export default function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.12}>
          <figure className="group relative flex h-full flex-col justify-between rounded-2xl border border-ink-line bg-ink-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50">
            <div
              className="absolute inset-x-8 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100 beam"
              aria-hidden="true"
            />
            <blockquote className="text-base leading-relaxed text-bone-dim">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-prism-violet to-prism-magenta font-display text-sm font-bold text-bone"
                aria-hidden="true"
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-bone">{t.name}</p>
                <p className="text-xs text-bone-faint">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
