import fs from "fs";
import path from "path";

export type WorkCategory = "Websites" | "Systems & products";

export type WorkImage = {
  /** "<project>/<name>" — resolves to public/work/<project>/<name>.webp (a real-scale crop, never a whole page). */
  key: string;
  alt: string;
  caption?: string;
};

export type FeatureGroup = { title: string; items: string[] };

/** One block of the "What's inside" section: a title, two lines, and a 4:3 crop of that screen. */
export type WorkFeature = {
  title: string;
  text: string;
  /** Image key ("<project>/<name>"), or null when no capture exists yet. */
  image: string | null;
  alt?: string;
};

export type WorkProject = {
  slug: string;
  name: string;
  /** Honest relationship label, e.g. "Built for Xraised" (sister brand), "Our own product". */
  clientLabel: string;
  category: WorkCategory;
  /** Unpublished projects are reachable at their URL for review but excluded from /work, the home strip, the sitemap and search indexes. */
  published: boolean;
  /** Public URL, or null when the project must not be linked yet. */
  liveUrl: string | null;
  /** Shown in place of a live link when liveUrl is null. */
  statusNote?: string;
  tagline: string;
  summary: string;
  /** One sentence on the problem solved — the case-study subtitle. */
  problem: string;
  /** Three or four components we built, shown as chips (home rows and case-study header). */
  components: string[];
  /** The "What's inside" blocks, in order. */
  features: WorkFeature[];
  brief: string[];
  built: string[];
  featureGroups: FeatureGroup[];
  stack: string[];
  integrations?: string[];
  /** Slug of the matching service in lib/services.tsx. */
  service: string;
  /** Key of the 16:10 hero crop, or null while the project has no capture (e.g. "launching soon"). */
  heroImage: string | null;
  heroAlt?: string;
  images: WorkImage[];
  /** A short, honest note on provenance (e.g. an existing codebase we tailored). */
  provenance?: string;
};

export const WORK: WorkProject[] = [
  {
    slug: "xraised",
    name: "Xraised",
    clientLabel: "Built for Xraised",
    category: "Websites",
    published: true,
    liveUrl: "https://xraised.com",
    tagline: "A media platform, a client portal and a content factory — behind one website.",
    summary:
      "The public site, lead-generation assessment tools, Xraised Magazine pipeline, client portal and the automations that run the editorial operation.",
    problem:
      "A press and interview brand needed one website that sells its services, qualifies leads on its own and runs the editorial production behind it.",
    components: ["Assessment tools", "Interview library", "Magazine pipeline", "Client portal"],
    features: [
      {
        title: "An interview library that works like a channel",
        text: "Every episode has its own page with the video, the guest and an industry category. The home page surfaces the week's conversations automatically.",
        image: "xraised/interviews",
        alt: "The \"This week on xraised\" section of the home page: a featured interview and four more in a list",
      },
      {
        title: "Xraised Magazine",
        text: "A paid application that turns a founder's answers and photo into an eight-page issue, with AI-assisted research, automated layout and a human approval step.",
        image: "xraised/magazine",
        alt: "Three issues of Xraised Magazine on the magazine page",
      },
      {
        title: "Services, prices and checkout",
        text: "Curated and direct services on one page, each with its own detail page, a price list and Stripe checkout in GBP and USD.",
        image: "xraised/services",
        alt: "The services page: the curated services and the start of the direct services",
      },
      {
        title: "One page per interview",
        text: "Player, category, title and guest, followed by an article written from the conversation and the links the guest wants shared.",
        image: "xraised/interview",
        alt: "An interview page with the video player, category and title",
      },
    ],
    brief: [
      "Xraised is a sister brand in our group: an interview and press platform for founders and executives. The site had to do three jobs at once — sell a catalogue of editorial services, give clients a place to follow their work, and run the production behind it without a large team.",
      "The brief was to build all three as one platform rather than a brochure site with tools bolted on.",
    ],
    built: [
      "A server-rendered public site with an interview library, service pages, pricing and Stripe checkout, awards, blog, a press-coverage section and a podcast feed.",
      "Four free self-assessment tools that score visitors on the server, save the lead with its source, and hand the conversation to the team.",
      "Xraised Magazine: a paid application that turns a founder's answers and photo into an eight-page issue through AI-assisted research and writing, automated layout and a human approval step.",
      "A client portal for service tracking, approvals, downloads and purchases, plus the team's own dashboard, interview CMS and scheduled automations.",
    ],
    featureGroups: [
      {
        title: "Public website",
        items: [
          "Interview video library with industry categories, likes, comments and a watchlist",
          "Six service pages, a price list and Stripe checkout in GBP and USD",
          "Awards, blog, press-coverage section with outlet cover art and podcast RSS feed",
          "Application page with tracks, and a contact form protected by Turnstile, honeypot and rate limiting",
          "Multilingual interface (EN, JP, FR) and structured data for articles",
        ],
      },
      {
        title: "Lead-generation assessment tools",
        items: [
          "Interviewability Score, Online PR Presence Score, AI Visibility Check and Thought Leadership Score",
          "Eight questions each, scored on the server, with the specific gaps to close first",
          "Leads stored with UTM source, team notified by email, tool calls to action rotated onto blog posts",
        ],
      },
      {
        title: "Xraised Magazine",
        items: [
          "Paid application with photo, written answers and consent, paid via Stripe or on account",
          "AI research with cited sources, drafting with fact checks against those sources, automated photo cut-out and page rendering",
          "Editorial review and approval before an issue goes live, with web cover and PDF",
        ],
      },
      {
        title: "Client portal",
        items: [
          "Stage tracking, approve or request changes, comments and proposed edits",
          "Downloads: slides, ZIP packages, reel videos and distribution reports",
          "One-off purchases, subscriptions and a billing portal; partner ordering on account",
          "Magic-link sign-in and a per-client content calendar",
        ],
      },
      {
        title: "Team tools and automations",
        items: [
          "Interview CMS with montage, cover generator, Zoom import, SEO/AEO text and a rebuild queue",
          "Social package studio for carousels, captions, voice-over and reels; 9:16 interview reels with auto-highlight",
          "Hourly content pipeline from task to article to document to shared drive; newswire distribution; weekly self-writing blog",
          "Role-based users, moderation, newswire admin and diagnostics",
        ],
      },
    ],
    stack: ["Python", "FastAPI", "Jinja2", "PostgreSQL", "SQLAlchemy", "APScheduler", "Playwright", "ffmpeg", "Railway", "Cloudflare"],
    integrations: ["Stripe", "Calendly", "Asana", "Anthropic Claude", "ElevenLabs", "Buffer", "Resend", "Mailchimp", "Azure Blob Storage", "Google Drive", "Cloudflare Turnstile"],
    service: "web-design-development",
    heroImage: "xraised/hero-tools",
    heroAlt: "The free self-assessment tools on xraised.com: the heading and the first two assessment cards",
    images: [],
  },
  {
    slug: "xraised-crm",
    name: "Xraised CRM",
    clientLabel: "Built for Xraised",
    category: "Systems & products",
    published: true,
    liveUrl: null,
    statusNote: "Internal system — not publicly accessible",
    tagline: "One place for inbox, follow-ups, pipeline, PR campaigns and invoices.",
    summary:
      "A tailored CRM that replaced a patchwork of mailboxes, spreadsheets and off-the-shelf tools with a system shaped around how the team actually sells and delivers.",
    problem:
      "Sales and client email lived across shared mailboxes, a generic CRM and spreadsheets; nobody had one view of a client from first reply to paid invoice.",
    components: ["Shared inbox", "Follow-up engine", "Deal pipeline", "PR campaigns", "Invoices"],
    features: [
      {
        title: "A pipeline the team can read at a glance",
        text: "Deals move through named stages on a board or in a list. Each card carries the contact, the product and who owns it; a won deal becomes a production task.",
        image: "xraised-crm/pipeline",
        alt: "The deals board with the Proposed, Interested, Meeting proposed and Meeting booked columns",
      },
      {
        title: "Follow-ups that wait for a human",
        text: "The engine notices when the client has not written back, drafts the next nudge and queues it for approval. Nothing is sent on its own.",
        image: "xraised-crm/followups",
        alt: "The follow-ups page with two drafts to approve and the list of open follow-ups",
      },
      {
        title: "PR campaigns, pitch by pitch",
        text: "One campaign per client with the journalists to reach, the status of every pitch, the dates and the published link when a story lands.",
        image: "xraised-crm/pr-campaign",
        alt: "A PR campaign with its client, angle and eight journalist pitches at different stages",
      },
      {
        title: "Invoices and what is still owed",
        text: "Invoices from a deal or by hand, with status, totals for issued, received and outstanding, and a print-ready PDF.",
        image: "xraised-crm/invoices",
        alt: "The invoices list with totals and paid, unpaid and draft statuses",
      },
    ],
    brief: [
      "The Xraised team ran sales and client communication across shared mailboxes, cold-outreach tooling, a generic CRM and spreadsheets. Replies were missed, follow-ups depended on memory, and nobody had one view of a client from first email to paid invoice.",
      "The brief: a single internal system the whole team could live in, built around their real process rather than a vendor's — and owned outright, with no per-seat licence.",
    ],
    built: [
      "Built on an existing in-house CRM codebase and heavily tailored for Xraised: a shared inbox that keeps warm and cold conversations apart, a follow-up engine that only ever writes drafts for a human to approve, and a pipeline of deals that flows into production tasks.",
      "Contacts with import, duplicate detection and merge review; invoices with print-ready PDFs; Stripe payments reconciled against deals; journalist database and PR campaign tracking with an approval-gated outbox.",
      "Roles and mailbox ownership for a growing team, scheduled sync jobs, and nightly encrypted backups to cloud storage.",
    ],
    featureGroups: [
      {
        title: "Inbox and conversations",
        items: [
          "Shared inbox with sent, drafts, archived and spam views; flag, pin, bulk actions, search and attachments",
          "One conversation per thread across mailboxes; Cmd+K search; shared quick-text templates",
          "Bounce parsing into a \"not delivered\" list; large files sent as expiring download links",
          "Mailbox handover when someone leaves, and owner-only mailboxes",
        ],
      },
      {
        title: "Follow-ups, tasks and approvals",
        items: [
          "Follow-up engine that drafts the next nudge and waits for a human to approve and send",
          "Internal tasks with urgency and deadlines; optional mirror to Microsoft To Do",
          "An approval queue before work is sent to production",
        ],
      },
      {
        title: "Cold outreach",
        items: [
          "Separate cold section reading replies from outreach mailboxes",
          "CSV import of mailboxes with connection checks; tenant consent checklist",
          "Cold follow-up drafts with manual send; rules that apply to warm, cold or both",
          "Reply from any of a person's addresses stops the others",
        ],
      },
      {
        title: "Contacts, deals and pipeline",
        items: [
          "Contacts with CSV/XLSX import, preview, duplicate detection and per-import undo",
          "\"Contacts to review\" merge-or-keep workflow",
          "Deals as a list or a stage board with history and merges; two pipelines (Sales, Interview)",
          "\"Send to production\" creates the delivery task; booking webhooks create meetings, contacts and deals",
        ],
      },
      {
        title: "PR campaigns and journalists",
        items: [
          "Journalist database with import, hold/exclude flags and enrichment",
          "Campaigns tracking pitches and placements per client",
          "AI pitch drafts and an outbox with approval gate, dry-run mode, kill switch and suppression list",
        ],
      },
      {
        title: "Accounting and payments",
        items: [
          "Invoices from a lead or by hand, payment methods, status, print-to-PDF and per-brand logo",
          "Stripe webhook, product-to-catalogue mapping and renewals joined to the deal",
          "Commissions engine fed by spreadsheet imports",
        ],
      },
      {
        title: "Team, data and operations",
        items: [
          "Admin, member and importer roles; one-time invite links; session revocation",
          "Per-product knowledge base, AI reply drafts and a \"brain\" that learns from the team's edits",
          "Export centre, HubSpot import, nightly encrypted database backups with checks and alerts",
          "Scheduled sync jobs for inbox, cold replies and leads",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "TanStack Query", "Recharts", "Railway"],
    integrations: ["Microsoft 365", "Gmail", "Google Calendar", "IMAP/SMTP", "Stripe", "Calendly", "Asana", "HubSpot", "Snov.io", "Apollo", "OpenAI", "Azure Blob Storage"],
    service: "custom-systems-crm",
    heroImage: "xraised-crm/hero-inbox",
    heroAlt: "The shared inbox with the conversation list and an open email in the reading pane (fictional demo data)",
    provenance:
      "Built on an existing in-house CRM codebase and heavily tailored for Xraised. Every screen is shown with fictional demo data: the people, companies, outlets and amounts are invented.",
    images: [],
  },
  {
    slug: "bookspert",
    name: "Bookspert",
    clientLabel: "Built for Bookspert",
    category: "Websites",
    published: true,
    liveUrl: "https://bookspert.com",
    tagline: "A six-language publishing website with an author dashboard and a sales back office.",
    summary:
      "Marketing site, author accounts, billing and an admin area for a ghostwriting and publishing brand — one codebase, six languages.",
    problem:
      "A high-ticket publishing service had to be explained to leaders in six languages, capture consultations reliably and give authors and the sales team a place to work after the sale.",
    components: ["Six languages", "Books catalogue", "Author dashboard", "Sales back office"],
    features: [
      {
        title: "Six languages from one codebase",
        text: "The language comes from a cookie or the browser and can be switched in the header; every page, form and email exists in all six, with a currency switcher alongside.",
        image: "bookspert/languages",
        alt: "The Bookspert home page in Italian, with the language selector in the header set to Italiano",
      },
      {
        title: "A books catalogue with structured data",
        text: "Covers, subtitles, authors and Amazon links, each book marked up with Book schema so it can be found as a book, not just as a page.",
        image: "bookspert/books",
        alt: "The books page with three book covers and their descriptions",
      },
      {
        title: "A page for every author and book",
        text: "Author profiles merge the built-in data with the author's own public account; each book gets its cover, subtitle and buying link.",
        image: "bookspert/book",
        alt: "The book section of an author page: the cover, the title, the subtitle and the Amazon link",
      },
      {
        title: "How it works, in five steps",
        text: "The service is explained as a path from discovery call to launch, so a considered purchase feels concrete before the first conversation.",
        image: "bookspert/how-it-works",
        alt: "The five-step \"From idea to a published book\" section",
      },
    ],
    brief: [
      "Bookspert is the book-publishing brand in our group. It needed a site that could explain a considered, high-ticket service to leaders in several languages, capture consultations reliably, and give both authors and the sales team somewhere to work after the sale.",
    ],
    built: [
      "A Next.js site in English, Spanish, Italian, French, German and Portuguese with a currency switcher, service and comparison pages, books and author profiles, blog, FAQ and site search.",
      "An author dashboard for books, billing, invoices, payout methods and a public profile; an admin area for leads, users, books, blog, payment links and Stripe accounts per sales team.",
      "Lead capture that stores every enquiry and alerts the team by email, with structured data and AI-crawler-friendly robots and llms.txt for search.",
    ],
    featureGroups: [
      {
        title: "Public site",
        items: [
          "Six languages chosen from a cookie or the browser, with a currency switcher",
          "Services hub and four service detail pages; how-it-works; success stories",
          "Comparison hub with three side-by-side pages, sources and FAQ data",
          "Books catalogue with Amazon links and Book schema; author profiles merged from built-in data and public accounts",
          "Blog with generated cover graphics and related posts; multilingual FAQ with FAQ schema; site-wide search",
          "Free-consultation form, sitemap, robots that welcome AI crawlers and an llms.txt file",
        ],
      },
      {
        title: "Author dashboard",
        items: [
          "Books, payments and royalties, invoices with PDF download",
          "Billing with Stripe payments and invoices, pay-now links and receipts",
          "Payout methods (bank, PayPal or other) with a default",
          "Public profile editor with nine social links and a visibility toggle; account settings",
        ],
      },
      {
        title: "Admin",
        items: [
          "Overview stats and recent leads; lead statuses with CSV export",
          "Users and roles (author, editor, customer, admin); books; blog editor",
          "One Stripe account per sales team with encrypted keys and its own webhook",
          "One-off payment links; invoices to authors; saved cards and monthly or yearly subscriptions",
          "CSV and XLSX exports",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
    integrations: ["Stripe", "Resend", "Google Calendar"],
    service: "web-design-development",
    heroImage: "bookspert/hero-what-we-do",
    heroAlt: "The \"Everything between your expertise and a finished book\" section of bookspert.com with the first two service cards",
    images: [],
  },
  {
    slug: "visibility-intelligence",
    name: "Visibility Intelligence",
    clientLabel: "Our own product",
    category: "Systems & products",
    published: true,
    liveUrl: null,
    statusNote: "Launching soon",
    tagline: "A free AI audit of how a leader reads from the outside — and the work that closes the gaps.",
    summary:
      "Our own product: an audit engine that scores a founder's public presence, a report that explains the gaps, a marketplace of done-for-you services and subscription plans.",
    problem:
      "Accomplished leaders are under-described online, and nothing measured that honestly or connected each gap to the work that would close it.",
    components: ["Audit engine", "Report and PDF", "Services marketplace", "Plans on Stripe"],
    features: [
      {
        title: "A free audit with a structured report",
        text: "The engine researches the person with web search and returns a score out of 100, a band, a summary and prioritised findings across six dimensions.",
        image: null,
      },
      {
        title: "A report that explains the gaps",
        text: "Where the missing points sit, what closing each gap is worth and a recommended service for each finding, with progress tracked across audits.",
        image: null,
      },
      {
        title: "Services and plans",
        text: "A marketplace of done-for-you services with a request flow and an internal queue; Base and Pro plans on Stripe with entitlement gating.",
        image: null,
      },
    ],
    brief: [
      "Most accomplished leaders are under-described online: the record is real, but it is scattered, dated or inconsistent. We wanted a product that measures that honestly, explains it plainly, and connects each gap to the work that would close it.",
    ],
    built: [
      "A free audit: the visitor gives a name, email and the public links where they appear; the engine researches them with web search, then returns a structured report with a score out of 100, a band, a summary and prioritised findings across six dimensions.",
      "A report view with score card, where the missing points sit, what closing each gap is worth, and a recommended service for each finding — plus progress tracking across audits and a downloadable PDF.",
      "A services marketplace with request flow and an internal queue, Base and Pro plans on Stripe with entitlement gating, in-house authentication with email verification, and a scheduled refresh engine.",
    ],
    featureGroups: [
      {
        title: "Free AI visibility audit",
        items: [
          "Form for name, email, optional phone and the public links to read; rate-limited per IP and email",
          "Engine runs web searches and returns a strict structured report; one automatic retry on parse errors",
          "Score out of 100 with bands from Faint signal to Leading voice; three to seven findings with severity, points to gain and one of six dimensions",
        ],
      },
      {
        title: "Report and progress",
        items: [
          "Radial score card, summary, gaps / urgent / points-to-gain strip and comparison with the previous audit",
          "Charts for where the missing points sit and what closing each gap is worth",
          "Prioritised finding cards, each with a recommended service; \"what the engine looked at\" for entitled plans; PDF download",
          "Progress page: score over time, dimension comparison, still-open findings and a timeline",
        ],
      },
      {
        title: "Services marketplace",
        items: [
          "Public five-stage path and a private catalogue with deliverables and timelines",
          "\"Recommended for you\" on the dashboard; request modal with internal notification",
          "Admin queue with New, Seen and Done statuses",
        ],
      },
      {
        title: "Plans, billing and accounts",
        items: [
          "Base and Pro plans; Stripe Checkout with automatic tax, customer portal and webhook",
          "Entitlement gating with a grace period and a billing on/off switch",
          "Login, email verification with resend, password reset; illustrative case studies rendered with the real report UI",
          "Scheduled refresh engine (monthly or weekly by plan) with a daily cap and email on completion",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Railway"],
    integrations: ["Anthropic Claude with web search", "Stripe", "Resend"],
    service: "custom-systems-crm",
    heroImage: null,
    images: [],
  },
  {
    slug: "leland-investments",
    name: "Leland Investments",
    clientLabel: "Built for Leland Investments",
    category: "Websites",
    published: false,
    liveUrl: null,
    statusNote: "Awaiting client approval",
    tagline: "A calm, credible site for an investment firm — with an editor the firm controls.",
    summary:
      "A focused site for a private investment firm: positioning, investment criteria, a protected contact flow, and an admin editor so the firm can change its own copy and fact sheet.",
    problem:
      "A private investment firm needed a site that reads as considered and trustworthy to founders weighing a sale, and that the firm can keep current without a developer.",
    components: ["Public site", "Content editor", "Contact flow", "Fact sheet"],
    features: [
      { title: "A calm public site", text: "Home, investment criteria, contact and privacy pages, a branded 404 and a dynamic share image.", image: "leland/home-desktop" },
      { title: "An editor the firm controls", text: "Password-protected, with signed sessions and field-by-field validation for every piece of copy on the site.", image: "leland/criteria-desktop" },
      { title: "Contact and fact sheet", text: "A protected contact flow that emails the firm, and a fact-sheet module with PDF upload and a visibility switch.", image: "leland/contact-desktop" },
    ],
    brief: [
      "A private investment firm needed a site that reads as considered and trustworthy to founders weighing a sale — short, precise, and easy for the firm to keep current without a developer.",
    ],
    built: [
      "A Next.js site with home, investment criteria, contact and privacy pages, a branded 404 and a dynamic share image.",
      "A password-protected editor with signed sessions, rate limiting and field-by-field validation for the tagline, home copy, criteria rows and industry groups, contact details and footer disclaimer — stored in Postgres and merged over safe defaults so the site keeps working if the database is down.",
      "A contact flow with honeypot, rate limit and validation that emails the firm with reply-to set, and a fact-sheet module with PDF upload served with cache-safe URLs and a visibility switch.",
    ],
    featureGroups: [
      {
        title: "Public site",
        items: [
          "Home with hero, business ethos, three-point approach and closing call to action",
          "Investment criteria with characteristics and two industry-focus groups",
          "Contact page with form; privacy policy; branded 404; sitemap and robots; per-page social metadata and share image",
        ],
      },
      {
        title: "Content editor",
        items: [
          "Single-password login with signed seven-day sessions, five-attempt lockout and origin checks",
          "Edit tagline, home sections, criteria (add, remove, reorder), industry groups, contact email, privacy details and disclaimer",
          "Validated saves; content merged over defaults; admin hidden from search engines",
        ],
      },
      {
        title: "Contact and fact sheet",
        items: [
          "Honeypot, per-IP rate limit, validation and escaping; email via Resend with clear error handling",
          "Fact-sheet page with on/off switch; PDF upload (type and size checked) stored in Postgres and served with ETag and cache-busting links",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Railway"],
    integrations: ["Resend"],
    service: "web-design-development",
    heroImage: "leland/home-desktop",
    heroAlt: "Leland Investments home page",
    images: [],
  },
];

export const WORK_CATEGORIES: WorkCategory[] = ["Websites", "Systems & products"];

export function getPublishedWork(): WorkProject[] {
  return WORK.filter((p) => p.published);
}

export function getWork(slug: string): WorkProject | undefined {
  return WORK.find((p) => p.slug === slug);
}

export function getWorkByService(serviceSlug: string): WorkProject[] {
  return getPublishedWork().filter((p) => p.service === serviceSlug);
}

/* ---------- Crop manifest (public/work/manifest.json, written by the capture script) ---------- */

type ManifestEntry = {
  project: string;
  file: string;
  width: number;
  height: number;
  /** CSS pixels of the captured region (the file is 2× that: deviceScaleFactor 2). */
  cssWidth?: number;
  cssHeight?: number;
};
export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
  /** The width at which the crop is shown at its real capture scale (1 CSS px = 1 captured px). */
  cssWidth: number;
  cssHeight: number;
};

let manifestCache: ManifestEntry[] | null = null;
function manifest(): ManifestEntry[] {
  if (manifestCache) return manifestCache;
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "public", "work", "manifest.json"), "utf8");
    manifestCache = JSON.parse(raw) as ManifestEntry[];
  } catch {
    manifestCache = [];
  }
  return manifestCache;
}

export function resolveImage(key: string | null | undefined): ResolvedImage | null {
  if (!key) return null;
  const [project, name] = key.split("/");
  const hit = manifest().find((m) => m.project === project && m.file === `${project}/${name}.webp`);
  if (!hit) return null;
  return {
    src: `/work/${hit.file}`,
    width: hit.width,
    height: hit.height,
    cssWidth: hit.cssWidth ?? Math.round(hit.width / 2),
    cssHeight: hit.cssHeight ?? Math.round(hit.height / 2),
  };
}
