import type { ReactNode } from "react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: ReactNode;
};

const iconProps = {
  className: "h-7 w-7",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const SERVICES: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Positioning",
    tagline: "Own a position your competitors can't copy.",
    description:
      "Most brands don't have a positioning problem — they have a courage problem. We help you choose what to stand for, say it in language your market actually uses, and build a brand architecture that scales with you. The result is a strategy your whole company can repeat in one sentence, and a market position that compounds instead of eroding.",
    deliverables: [
      "Market, audience and competitor research",
      "Positioning statement and messaging hierarchy",
      "Brand narrative, voice and tone guidelines",
      "Value proposition mapped to each audience segment",
      "Internal launch playbook so the whole team tells one story",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l9 18H3l9-18z" />
        <path d="M12 9v6" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    slug: "growth-marketing",
    title: "Growth Marketing",
    tagline: "Full-funnel programmes engineered for pipeline, not applause.",
    description:
      "We design and run growth engines across paid, organic and lifecycle channels — then hold them to commercial numbers, not vanity metrics. Every experiment has a hypothesis, a budget and a kill criterion. You'll always know what's working, what isn't, and where the next pound or dollar should go.",
    deliverables: [
      "Full-funnel audit and growth model with revenue targets",
      "Channel strategy across paid, organic, email and partnerships",
      "Experiment roadmap with clear hypotheses and kill criteria",
      "Conversion rate optimisation for landing pages and funnels",
      "Monthly performance reviews tied to pipeline and revenue",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
  {
    slug: "content-thought-leadership",
    title: "Content & Thought Leadership",
    tagline: "Turn your expertise into the reason clients choose you.",
    description:
      "Your best thinking is currently trapped in meetings, decks and your founders' heads. We extract it and turn it into a content engine — editorial strategy, executive ghostwriting and flagship reports that make your firm the obvious answer in your category. Not more content. Content with a point of view.",
    deliverables: [
      "Editorial strategy and 90-day content calendar",
      "Executive ghostwriting for LinkedIn and industry press",
      "Flagship long-form assets: reports, guides and keynotes",
      "SEO-led article programme mapped to buying intent",
      "Distribution and repurposing system for every asset",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    slug: "pr-visibility",
    title: "PR & Visibility",
    tagline: "Be seen in the rooms where your buyers make decisions.",
    description:
      "Coverage for its own sake is decoration. We build visibility programmes that put your brand in front of the audiences that shape your revenue — trade press, podcasts, awards, speaking slots and analyst briefings. Earned attention, aimed carefully, sustained over time.",
    deliverables: [
      "Media strategy and priority outlet map for UK and US markets",
      "Press office: story development, pitching and journalist relations",
      "Podcast, speaking and awards pipeline for your executives",
      "Crisis communications playbook and media training",
      "Quarterly share-of-voice reporting against named competitors",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M3 11l18-7-7 18-2.5-7.5L3 11z" />
      </svg>
    ),
  },
  {
    slug: "marketing-audits",
    title: "Marketing Audits & Advisory",
    tagline: "An honest, board-ready answer to 'is our marketing working?'",
    description:
      "In three weeks we take your entire marketing operation apart — strategy, channels, team, tech stack and spend — and put it back together as a prioritised plan. No 200-page decks. A sharp diagnosis, the five moves that matter most, and ongoing advisory to make sure they actually happen.",
    deliverables: [
      "Three-week diagnostic across strategy, spend, team and tools",
      "Benchmarking against category leaders and direct competitors",
      "Prioritised 12-month roadmap with budget recommendations",
      "Board-ready report and live findings presentation",
      "Optional monthly advisory retainer to drive execution",
    ],
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
  },
];
