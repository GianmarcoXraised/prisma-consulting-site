// How we hold ourselves to account — principles, not performance claims.
const COMMITMENTS = [
  {
    label: "One number",
    copy: "Every engagement is scoped to a commercial result — pipeline, revenue, margin — agreed before the work starts.",
  },
  {
    label: "Kill criteria",
    copy: "Every experiment has a hypothesis, a budget and a point at which we stop. Nothing runs on habit.",
  },
  {
    label: "Board-ready",
    copy: "Reporting a finance director can interrogate: what was spent, what it produced, and what we would do next.",
  },
  {
    label: "No vanity",
    copy: "Impressions, followers and traffic are inputs. We report on what they turned into.",
  },
] as const;

export default function Commitments() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {COMMITMENTS.map((item) => (
        <div key={item.label} className="border-t border-ink-line pt-6">
          <p className="font-display text-3xl font-extrabold tracking-tight text-bone md:text-4xl">
            {item.label}
            <span className="text-prism">.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">
            {item.copy}
          </p>
        </div>
      ))}
    </div>
  );
}
