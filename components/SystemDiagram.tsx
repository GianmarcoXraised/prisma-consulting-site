import Reveal from "@/components/Reveal";

/**
 * "One system, not five suppliers": the five connected layers as a typographic diagram.
 * 01–04 are blocks joined by one line (left to right on desktop, top to bottom on phones);
 * 05 Automate is a band under all four, tied to each of them, because the AI runs across them.
 * No screenshots: text, numbers and the site's prism gradient only.
 */

const LAYERS = [
  {
    n: "01",
    title: "Strategy",
    copy: "Positioning, offer and buyer journey: what the system has to sell, and to whom.",
  },
  {
    n: "02",
    title: "Attract",
    copy: "The website, content and lead-capture tools that turn visitors into enquiries.",
  },
  {
    n: "03",
    title: "Convert",
    copy: "Outbound campaigns, follow-ups and a pipeline that never lets a lead go cold.",
  },
  {
    n: "04",
    title: "Run",
    copy: "CRM, client portal, invoices and back office, in one place.",
  },
];

const AUTOMATE = {
  n: "05",
  title: "Automate",
  copy: "AI agents across every layer: drafting follow-ups, publishing content, routing leads, preparing reports. A human approves anything that reaches a client.",
};

const PRISM = "linear-gradient(135deg, #7C5CFF, #E14ECA 40%, #FFB347 75%, #4ED9E1)";

function Badge({ n, prism = false }: { n: string; prism?: boolean }) {
  return (
    <span
      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-[1.5px]"
      style={{ background: prism ? PRISM : "#2a2a33" }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-bone">
        {n}
      </span>
    </span>
  );
}

export default function SystemDiagram() {
  return (
    <div className="relative">
      {/* the line that joins the layers: vertical on phones, horizontal on desktop (it shows in the gaps) */}
      <span
        aria-hidden="true"
        className="absolute bottom-16 left-12 top-12 w-px md:hidden"
        style={{ background: "linear-gradient(180deg, #7C5CFF, #E14ECA 50%, #4ED9E1)" }}
      />
      <span
        aria-hidden="true"
        className="absolute left-12 right-12 top-12 hidden h-px md:block"
        style={{ background: "linear-gradient(90deg, #7C5CFF, #E14ECA 50%, #FFB347 75%, #4ED9E1)" }}
      />

      <ol className="relative grid gap-6 md:grid-cols-4">
        {LAYERS.map((layer, i) => (
          <li key={layer.n}>
            <Reveal delay={i * 0.08} className="h-full">
              <div className="relative z-10 h-full rounded-2xl border border-ink-line bg-ink-card p-6">
                <div className="flex items-center gap-4">
                  <Badge n={layer.n} />
                  <h3 className="font-display text-xl font-bold tracking-tight text-bone">{layer.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">{layer.copy}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* each layer tied to the AI band below it (desktop) */}
      <div aria-hidden="true" className="hidden h-6 grid-cols-4 gap-6 md:grid">
        {LAYERS.map((layer) => (
          <span key={layer.n} className="mx-auto h-full w-px border-l border-dashed border-prism-violet/60" />
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="relative z-10 mt-6 rounded-2xl p-[1.5px] md:mt-0" style={{ background: PRISM }}>
          <div className="flex flex-col gap-5 rounded-2xl bg-ink-card p-6 md:flex-row md:items-center md:gap-8 md:p-8">
            <div className="flex items-center gap-4 md:w-56 md:shrink-0">
              <Badge n={AUTOMATE.n} prism />
              <h3 className="font-display text-xl font-bold tracking-tight text-bone">
                {AUTOMATE.title}
              </h3>
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-bone-dim md:text-base">{AUTOMATE.copy}</p>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bone-faint">
                <span>Runs across</span>
                {LAYERS.map((layer) => (
                  <span key={layer.n} className="rounded-full border border-ink-line px-3 py-1 text-bone-dim">
                    {layer.title}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
