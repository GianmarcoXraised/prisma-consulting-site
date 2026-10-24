import type { ReactNode } from "react";

export type ServiceGroup = "consult" | "build";

export type ServiceQuestion = { q: string; a: string };

export type Service = {
  slug: string;
  group: ServiceGroup;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  questions?: ServiceQuestion[];
  /** Work slugs shown under "See it in practice" besides those tagged with this service in lib/work.ts. */
  practice?: string[];
  icon: ReactNode;
};

export const SERVICE_GROUPS: Record<
  ServiceGroup,
  { eyebrow: string; title: string; blurb: string }
> = {
  consult: {
    eyebrow: "Consult",
    title: "Marketing & growth",
    blurb:
      "The thinking. Where your growth actually comes from, what to say, and where the money should go.",
  },
  build: {
    eyebrow: "Build",
    title: "Digital infrastructure",
    blurb:
      "The shipping. The websites and systems that run the strategy — designed, built and looked after by the same team that set the direction.",
  },
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
    slug: "connected-growth-system",
    group: "build",
    title: "Connected Growth System",
    tagline: "Everything your growth runs on, designed as one system.",
    description:
      "For companies that want more than a new website or a new CRM. We map how you attract, convert and serve clients, then design and build the whole chain — website, lead generation, CRM, client portal and the AI automations that connect them — as one system you own. You can build it in stages; every stage is designed to plug into the next.",
    deliverables: [
      "Strategy and system map: how leads, clients and data should flow",
      "Website and lead-capture tools built to feed the CRM",
      "CRM, portal and back office around your real process",
      "AI agents and automations connecting every step, with human approval where it matters",
      "One view of the business, from first visit to paid invoice",
      "Staged roadmap, hosting and ongoing evolution",
    ],
    icon: (
      <svg {...iconProps}>
        <circle cx="5" cy="6" r="2.2" />
        <circle cx="19" cy="6" r="2.2" />
        <circle cx="5" cy="18" r="2.2" />
        <circle cx="19" cy="18" r="2.2" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M7 7.2l3 3M17 7.2l-3 3M7 16.8l3-3M17 16.8l-3-3" />
      </svg>
    ),
  },
  {
    slug: "custom-systems-crm",
    group: "build",
    title: "Custom Systems & CRM",
    tagline:
      "Software built around how your business actually works — not the other way round.",
    description:
      "Growing companies run on spreadsheets, workarounds and off-the-shelf software they've bent out of shape. We build bespoke internal tools, CRMs, client portals and management systems shaped around your real processes: clients, jobs, quotes, approvals and reporting in one place. Less admin, cleaner data, and a system that grows with you instead of charging you per seat to stand still.",
    deliverables: [
      "Process mapping: how work actually flows today, and how it should",
      "Custom build of CRMs, client portals, dashboards and management systems",
      "Integration with the tools you keep — email, accounting, calendars, marketing",
      "Team onboarding and documentation, so the system is used, not ignored",
      "Ongoing evolution as your business changes, on a plan you control",
    ],
    questions: [
      {
        q: "When should a business build a custom CRM instead of using HubSpot or Salesforce?",
        a: "When your process is genuinely unusual, when per-seat licences are outgrowing the value, or when the team lives in spreadsheets around the tool rather than in it. If a standard CRM fits your sales motion, use it — we will say so.",
      },
      {
        q: "What is a bespoke business management system?",
        a: "Custom software that runs your operation the way you run it — clients, projects, quotes, approvals and reporting in one place — instead of a patchwork of disconnected tools. In Italy it would be called a gestionale; the idea is the same anywhere.",
      },
      {
        q: "Who owns the system once it is built?",
        a: "You do. Code, data and hosting sit under your control, with documentation and a care plan so it keeps evolving whether or not we are still involved.",
      },
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M17.5 14v7M14 17.5h7" />
      </svg>
    ),
  },
  {
    slug: "web-design-development",
    group: "build",
    title: "Web Design & Development",
    tagline:
      "Your website is your hardest-working salesperson. Most companies treat it as a brochure.",
    description:
      "A website should do the job of your best salesperson: qualify, persuade and convert while you sleep. We design and build premium websites from scratch, and redesign sites that look dated or quietly underperform — always starting from the strategy, never from a template. The result is fast, distinctive, built to rank, and built to be looked after.",
    deliverables: [
      "Strategy-led design rooted in your positioning and buyer journey",
      "Fast, modern build on a stack your team can actually manage",
      "SEO- and AEO-ready structure, metadata and performance from day one",
      "Content migration, launch and analytics set up properly",
      "Hosting and ongoing care plans, so the site keeps improving after launch",
    ],
    questions: [
      {
        q: "How do I know if my website needs a redesign?",
        a: "If it looks dated next to competitors, loads slowly on mobile, or brings in enquiries that don't match the clients you want, it is already costing you more than a redesign would. The clearest signal is a site your own team is reluctant to send people to.",
      },
      {
        q: "Do you redesign existing websites or only build new ones?",
        a: "Both. Where the platform is sound we redesign on top of it; where it is slow, insecure or impossible to extend, we rebuild from scratch. We tell you which honestly before any design work starts.",
      },
      {
        q: "How long does a website project take?",
        a: "A focused redesign typically takes six to ten weeks; a full strategy-led build for a larger company, three to five months. Content and decision speed on your side move the timeline more than anything we do.",
      },
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M7 6.5h.01M10 6.5h.01" />
        <path d="M7 13h5M7 16h9" />
      </svg>
    ),
  },
  {
    slug: "ai-automation-agents",
    group: "build",
    title: "AI Automation & Agents",
    tagline: "AI that takes over the repetitive chains of work, not just single tasks.",
    description:
      "We find the chain of repetitive tasks that caps how much your team can deliver — writing up, distributing, posting, following up, reporting — and build AI agents that run it end to end inside your own tools. Anything with client impact waits for a human to approve it.",
    deliverables: [
      "Workflow audit: which chains to automate first",
      "AI agents built into your CRM, website and tools",
      "Human approval steps where judgement matters",
      "Integrations with email, calendars, social channels and distribution platforms",
      "Monitoring and evolution as the work changes",
    ],
    practice: ["ai-agents"],
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="7" width="14" height="11" rx="3" />
        <path d="M12 7V4M9 3.5h6" />
        <circle cx="9.5" cy="12.5" r="1" />
        <circle cx="14.5" cy="12.5" r="1" />
        <path d="M2.5 11.5v3M21.5 11.5v3" />
      </svg>
    ),
  },
  {
    slug: "lead-generation-systems",
    group: "build",
    title: "Lead Generation Systems",
    tagline: "A pipeline that fills itself, built on infrastructure you own.",
    description:
      "We build the machinery behind a predictable pipeline: lead-capture tools and assessments on your website, outbound email and LinkedIn campaigns on properly authenticated sending domains, and follow-ups that land in your CRM automatically. You own the data, the domains and the system.",
    deliverables: [
      "Lead magnets and interactive assessments on your site",
      "Outbound email infrastructure: domains, authentication, warm-up",
      "LinkedIn and email sequences connected to the CRM",
      "Automatic follow-ups with human approval",
      "Pipeline reporting tied to meetings booked and revenue",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M3 4h18l-7 8.5V19l-4 1.5v-8L3 4z" />
      </svg>
    ),
  },
  {
    slug: "strategy-scoping-sprint",
    group: "build",
    title: "Strategy & Scoping Sprint",
    tagline: "Two weeks, fixed price.",
    description:
      "We map how your business works, define what to build and why, and hand you a scoped plan with a clear budget. The fastest way to know whether you need a website, a system, or both.",
    deliverables: [
      "Process and funnel mapping",
      "Positioning check against your buyers",
      "Scoped build plan with priorities and budget",
      "Honest recommendation, including when off-the-shelf is the better call",
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <path d="M7.5 14.5l2.5 2.5 6-6" />
      </svg>
    ),
  },
  {
    slug: "brand-strategy",
    group: "consult",
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
    group: "consult",
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
    group: "consult",
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
    slug: "media-pitching",
    group: "consult",
    title: "TV, Radio, Press & Podcast Pitching",
    tagline:
      "Be the expert voice buyers hear and read — not another ad they scroll past.",
    description:
      "Editorial coverage is earned, not bought. We pitch you as an expert guest and source to the TV programmes, radio shows, newspapers, magazines and podcasts your buyers already trust — then prepare you to make the most of every interview. No paid placements, no advertorials: just the right story, put in front of the right producer or journalist, and a client who is ready when they say yes.",
    deliverables: [
      "Story angle development: the opinions, data and timely hooks that make you worth booking",
      "Media and producer research: the programmes, titles and shows your buyers actually follow",
      "Targeted pitching to journalists, editors and producers — one relevant contact at a time",
      "Interview and on-air preparation, from key messages to camera and microphone practice",
      "Coverage tracking and follow-up, so every appearance is captured and reused",
    ],
    questions: [
      {
        q: "Can you guarantee coverage in a specific outlet?",
        a: "No — and be wary of anyone who says they can. Editorial coverage is decided by journalists and producers on merit and timing. What we control is the quality of the story, the relevance of the pitch and how well prepared you are when an opportunity comes.",
      },
      {
        q: "What is the difference between editorial pitching and paid media?",
        a: "Paid media — advertising, sponsored content, advertorials — buys the space and is labelled as such. Editorial pitching earns a place as a guest or source because a producer or journalist judges you worth their audience's time. The second carries a trust the first never can.",
      },
      {
        q: "What makes someone worth booking as an expert guest?",
        a: "A clear point of view on something the audience cares about right now, evidence to back it, and the ability to say it plainly in under a minute. Job titles matter less than having something genuinely useful to say.",
      },
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0014 0" />
        <path d="M12 18v3M8 21h8" />
      </svg>
    ),
  },
  {
    slug: "marketing-audits",
    group: "consult",
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

/** Where a service is described: the build services on /services, the consulting ones on /marketing-consulting. */
export function serviceHref(service: Pick<Service, "slug" | "group">): string {
  return service.group === "consult"
    ? `/marketing-consulting#${service.slug}`
    : `/services#${service.slug}`;
}

// What the "Discuss this service" button preselects on the contact form (?need=).
const SERVICE_NEED: Record<string, string> = {
  "custom-systems-crm": "system",
  "web-design-development": "website",
  "strategy-scoping-sprint": "unsure",
  "connected-growth-system": "full-system",
  "ai-automation-agents": "automation",
  "lead-generation-systems": "leadgen",
  "media-pitching": "media",
};

export function contactNeedFor(service: Pick<Service, "slug" | "group">): string {
  return SERVICE_NEED[service.slug] ?? service.group;
}

