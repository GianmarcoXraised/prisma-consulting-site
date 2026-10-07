import fs from "fs";
import path from "path";

/** The kind of thing it is — a small uppercase label next to the category. */
export type WorkKind = "Website" | "System" | "SaaS" | "AI agents";

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
  /** Used only in the slug and, through siteUrl, in "Live at <domain> →". Never shown as a title. */
  name: string;
  /** The visible title everywhere: home row, /work card, case study, PDF, metadata. */
  category: string;
  kind: WorkKind;
  /** Unpublished projects are reachable at their URL for review but excluded from /work, the home strip, the sitemap and search indexes. */
  published: boolean;
  /** The live site, or null for a private system (then privateNote is shown instead). */
  siteUrl: string | null;
  privateNote?: string;
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
  /** Key of the 16:10 hero crop, or null while the project has no capture. */
  heroImage: string | null;
  heroAlt?: string;
  images: WorkImage[];
  /** A short, honest note on provenance (e.g. an existing codebase we tailored). */
  provenance?: string;
};

export const WORK: WorkProject[] = [
  {
    slug: "video-platform",
    name: "Xraised",
    category: "Content website with lead generation",
    kind: "Website",
    published: true,
    siteUrl: "https://xraised.com",
    tagline: "A content library, lead-generation tools and online checkout behind one website.",
    summary:
      "A content website with lead-generation tools, online checkout, a client portal and the automations that keep it running.",
    problem:
      "A service brand needed one website that sells its offer, qualifies leads on its own and keeps a large content library in order.",
    components: ["Lead-generation tools", "Content library", "Online checkout", "Client portal"],
    features: [
      {
        title: "A content library that updates itself",
        text: "Every piece has its own page with the media, the people and a category. The home page surfaces the latest ones automatically.",
        image: "video-platform/interviews",
        alt: "The \"This week on xraised\" section of the home page: a featured interview and four more in a list",
      },
      {
        title: "Services, prices and checkout",
        text: "Every service on one page, each with its own detail page, a price list and card checkout in more than one currency.",
        image: "video-platform/services",
        alt: "The services page: the curated services and the start of the direct services",
      },
      {
        title: "One page per item, built for search",
        text: "Media, category and title, followed by a written piece that search engines and AI assistants can read.",
        image: "video-platform/interview",
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
    heroImage: "video-platform/hero-interviews",
    heroAlt: "The interview archive on xraised.com: category filters and the first row of interview cards",
    images: [],
  },
  {
    slug: "crm",
    name: "Xraised CRM",
    category: "CRM & back office",
    kind: "System",
    published: true,
    siteUrl: null,
    privateNote: "Private system, demo on request",
    tagline: "One place for inbox, follow-ups, pipeline, campaigns and invoices.",
    summary:
      "A tailored CRM that replaced a patchwork of mailboxes, spreadsheets and off-the-shelf tools with a system shaped around how the team actually sells and delivers.",
    problem:
      "Sales and client email lived across shared mailboxes, a generic CRM and spreadsheets; nobody had one view of a client from first reply to paid invoice.",
    components: ["Shared inbox", "Follow-up engine", "Deal pipeline", "Campaigns", "Invoices"],
    features: [
      {
        title: "A pipeline the team can read at a glance",
        text: "Deals move through named stages on a board or in a list. Each card carries the contact, the product and who owns it; a won deal becomes a delivery task.",
        image: "crm/pipeline",
        alt: "The deals board with the Proposed, Interested, Meeting proposed and Meeting booked columns",
      },
      {
        title: "Follow-ups that wait for a human",
        text: "The engine notices when the client has not written back, drafts the next nudge and queues it for approval. Nothing is sent on its own.",
        image: "crm/followups",
        alt: "The follow-ups page with two drafts to approve and the list of open follow-ups",
      },
      {
        title: "Outreach campaigns, contact by contact",
        text: "One campaign per client with the people to reach, the status of every message, the dates and the outcome when one lands.",
        image: "crm/pr-campaign",
        alt: "A PR campaign with its client, angle and eight journalist pitches at different stages",
      },
      {
        title: "Invoices and what is still owed",
        text: "Invoices from a deal or by hand, with status, totals for issued, received and outstanding, and a print-ready PDF.",
        image: "crm/invoices",
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
    heroImage: "crm/hero-inbox",
    heroAlt: "The shared inbox with the conversation list and an open email in the reading pane (fictional demo data)",
    provenance:
      "Built on an existing in-house CRM codebase and heavily tailored for Xraised. Every screen is shown with fictional demo data: the people, companies, outlets and amounts are invented.",
    images: [],
  },
  {
    slug: "book-store",
    name: "Bookspert",
    category: "Multilingual site with a product catalogue",
    kind: "Website",
    published: true,
    siteUrl: "https://bookspert.com",
    tagline: "A six-language website with a catalogue, a customer dashboard and a sales back office.",
    summary:
      "A six-language marketing site with a product catalogue, customer accounts, billing and an admin area, from one codebase.",
    problem:
      "A considered, high-ticket service had to be explained in six languages, turn visitors into booked consultations and give customers and the sales team a place to work after the sale.",
    components: ["Six languages", "Product catalogue", "Customer dashboard", "Sales back office"],
    features: [
      {
        title: "Six languages from one codebase",
        text: "The language comes from a cookie or the browser and can be switched in the header; every page, form and email exists in all six, with a currency switcher alongside.",
        image: "book-store/languages",
        alt: "The Bookspert home page in Italian, with the language selector in the header set to Italiano",
      },
      {
        title: "A catalogue search engines understand",
        text: "Every product has its cover, description and buying link, with structured data so it is found as a product, not just as a page.",
        image: "book-store/books",
        alt: "The books page with three book covers and their descriptions",
      },
      {
        title: "A page for every person and product",
        text: "Profiles merge built-in data with what each person edits from their own account; every product gets its own section and buying link.",
        image: "book-store/book",
        alt: "The book section of an author page: the cover, the title, the subtitle and the Amazon link",
      },
      {
        title: "A complex service, explained as a path",
        text: "The offer is laid out in steps from the first call to delivery, so a considered purchase feels concrete before the first conversation.",
        image: "book-store/how-it-works",
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
    heroImage: "book-store/hero-what-we-do",
    heroAlt: "The \"Everything between your expertise and a finished book\" section of bookspert.com with the first two service cards",
    images: [],
  },
  {
    slug: "saas",
    name: "Visibility Intelligence",
    category: "Subscription product with an AI engine",
    kind: "SaaS",
    published: true,
    siteUrl: "https://visibility-intel-production.up.railway.app",
    tagline: "A free AI-powered report, paid plans and a client area.",
    summary:
      "A subscription product: an AI engine that produces a report, paid plans, a client area and a marketplace of add-on services.",
    problem:
      "An idea for a paid online service had to become a product people can try for free, understand at a glance and subscribe to.",
    components: ["AI engine", "Report PDF", "Subscriptions with Stripe", "Client area", "Services marketplace"],
    features: [
      {
        title: "Subscription plans with online billing",
        text: "Two plans with card checkout, automatic tax and a self-service billing portal; the plan decides what each customer can access.",
        image: "saas/pricing",
        alt: "The pricing page with the Base and Pro plans side by side",
      },
      {
        title: "Add-on services, sold inside the product",
        text: "Each result is matched to a paid service with its deliverables and timeline, requested in one click.",
        image: "saas/services",
        alt: "The services page: stage one, Website & Digital Presence, with what it includes",
      },
      {
        title: "A free trial that starts with one form",
        text: "A short form is all it takes. The engine does the research and returns a structured report in minutes.",
        image: "saas/audit",
        alt: "The free audit form with the two steps: who we are reading and where to look",
      },
      {
        title: "Examples that show the result",
        text: "Sample cases rendered with the real product components, so a visitor sees what they will get before signing up.",
        image: "saas/insights",
        alt: "The Insights page with three illustrative example cases",
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
    heroImage: "saas/hero-home",
    heroAlt: "The Visibility Intelligence home page with the sample report preview: a score gauge and a finding",
    provenance: "The report preview and the case studies are the product's own illustrative examples with invented people and companies.",
    images: [],
  },
  {
    slug: "portal",
    name: "Client portals",
    category: "Client portal",
    kind: "System",
    published: true,
    siteUrl: null,
    privateNote: "Private system, demo on request",
    tagline: "A private area where clients follow their work, approve it, download files and pay.",
    summary:
      "A client portal: sign-in by email link, progress tracking, approvals with comments, downloads and built-in payments.",
    problem:
      "Clients kept asking by email where their work stood, what needed approving and where the files were; the answers lived in the team's inboxes.",
    components: ["Client login", "Progress tracking", "Approvals", "Downloads", "Payments"],
    features: [
      {
        title: "Every client sees where their work stands",
        text: "Each piece of work moves through named stages. The client follows it from their own page, without writing an email to ask.",
        image: "portal/services",
        alt: "The client's list of services with a status on every row and approve buttons where a decision is waiting (fictional demo data)",
      },
      {
        title: "Approve or ask for changes in one click",
        text: "Drafts are reviewed inside the portal, with comments and proposed edits kept next to the work they refer to.",
        image: "portal/approve",
        alt: "The decision card with Approve and Request changes, and the box to propose an edit (fictional demo data)",
      },
      {
        title: "Files and receipts in one place",
        text: "Deliverables, reports and invoices are downloaded from the portal instead of being hunted down in old emails.",
        image: "portal/downloads",
        alt: "A delivered piece of work with its report to download as PDF or spreadsheet and the links to open (fictional demo data)",
      },
      {
        title: "No passwords, payments built in",
        text: "Clients enter with a link sent to their email and can buy, subscribe and manage their billing on their own.",
        image: "portal/sign-in",
        alt: "The sign-in page that emails a one-time link instead of asking for a password",
      },
    ],
    brief: [
      "The same pattern, built three times: a private area where the customer of a business can see, approve, download and pay without waiting for someone to answer an email.",
    ],
    built: [
      "Sign-in by email link, per-client pages with stage tracking, approvals with comments and proposed edits, downloads, one-off purchases, subscriptions and a billing portal.",
    ],
    featureGroups: [],
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Railway"],
    integrations: ["Stripe", "Resend"],
    service: "custom-systems-crm",
    heroImage: "portal/hero-overview",
    heroAlt: "A client area: the subscription with its next renewal and payment status, and the services with what is waiting for the client (fictional demo data)",
    provenance: "Screens from a local copy with fictional demo data: the client, the company, the outlets and the titles are invented.",
    images: [],
  },
  {
    slug: "cms",
    name: "Xraised interview publishing",
    category: "Content management system",
    kind: "System",
    published: true,
    siteUrl: null,
    privateNote: "Private system, demo on request",
    tagline: "One system from raw material to a published page, a schedule and social posts.",
    summary:
      "A content management system: an editor, a publishing schedule, an approval flow and output to the site, the feeds and social channels.",
    problem:
      "Hundreds of pieces of content a year had to become pages, listings and posts on a schedule, with a small team and no copy-paste between tools.",
    components: ["Content editor", "Publishing schedule", "Approval flow", "Multi-channel output"],
    features: [
      {
        title: "A page for every item, generated",
        text: "The CMS holds the media, the people, the cover and the text; publishing builds the public page, the category listings and the feeds.",
        image: "video-platform/hero-interviews",
        alt: "The interview archive on xraised.com: category filters and the first row of interview cards",
      },
      {
        title: "A schedule that keeps the site fresh",
        text: "A rolling plan decides what goes out and when; the home page and the feeds update on their own.",
        image: "video-platform/interviews",
        alt: "The \"This week on xraised\" section of the home page, filled by the publishing schedule",
      },
    ],
    brief: [
      "Xraised publishes interviews at a pace no editorial team could sustain by hand. The system had to turn one recording into everything downstream: the page, the article, the calendar entry and the social posts, with a human approving at the right points.",
    ],
    built: [
      "An interview CMS with cover generation, video configuration and a rebuild queue; a per-client content calendar with AI-proposed topics; an editor with approval states; and a social studio for carousels, captions and reels.",
    ],
    featureGroups: [],
    stack: ["Python", "FastAPI", "Jinja2", "PostgreSQL", "SQLAlchemy", "Playwright", "ffmpeg", "Railway"],
    integrations: ["Asana", "Anthropic Claude", "Azure Blob Storage", "Buffer"],
    service: "custom-systems-crm",
    heroImage: "cms/hero-interview",
    heroAlt: "A published interview page on xraised.com: category, title, guest and the generated article",
    provenance: "Every page here is generated and scheduled by the CMS, not written by hand.",
    images: [],
  },
  {
    slug: "ai-agents",
    name: "Xraised editorial agents",
    category: "AI agents in daily operations",
    kind: "AI agents",
    published: true,
    siteUrl: null,
    privateNote: "Private system, demo on request",
    tagline: "Agents that write, distribute, prepare the posts and chase the reply.",
    summary:
      "AI agents that take over a chain of repetitive tasks: writing, distribution, social posts and follow-ups, each with a human approval step.",
    problem:
      "Every new piece of work triggered the same chain of tasks: write it up, send it out, prepare the posts, chase the reply. Done by hand, that chain set the ceiling on how much could ship.",
    components: ["Writing agent", "Distribution", "Social posts", "Follow-ups"],
    features: [
      {
        title: "Social posts, generated and published",
        text: "Slides, captions and short videos come out of the same source and go out on their channel on schedule.",
        image: "ai-agents/social",
        alt: "A post on the Xraised LinkedIn page with the generated social slides",
      },
      {
        title: "Follow-ups that wait for a human",
        text: "In the CRM, an agent notices when the client has not written back, drafts the next nudge and queues it for approval. Nothing is sent on its own.",
        image: "crm/followups",
        alt: "The follow-ups page with drafts to approve (fictional demo data)",
      },
      {
        title: "One input, everything else derived",
        text: "A single source, here a recorded conversation, is the only input; the write-up, the distribution and the posts are derived from it.",
        image: "video-platform/interview",
        alt: "An interview page on xraised.com with the player, category and title",
      },
    ],
    brief: [
      "The publishing system removed the copy-paste; the agents removed the waiting. Every step that used to need a person to start it now starts on its own and stops where a person must decide.",
    ],
    built: [
      "Scheduled agents for article generation, newswire and outlet distribution, social slide and reel generation, and the follow-up engine of the CRM, each with a human approval step and a record of every run.",
    ],
    featureGroups: [],
    stack: ["Python", "FastAPI", "PostgreSQL", "APScheduler", "Playwright", "ffmpeg", "Next.js", "Railway"],
    integrations: ["Anthropic Claude", "ElevenLabs", "Newswire API", "Buffer", "Microsoft 365"],
    service: "custom-systems-crm",
    heroImage: "ai-agents/hero-article",
    heroAlt: "A generated article as published on a local TV news site (Fort Wayne's NBC MarketMinute) through the automatic distribution: outlet header, title and opening paragraphs",
    provenance: "One input in; write-up, distribution, social posts and follow-ups out. No one touches it in between.",
    images: [],
  },
  {
    slug: "leland-investments",
    name: "Leland Investments",
    category: "Investment firm website",
    kind: "Website",
    published: false,
    siteUrl: null,
    privateNote: "Awaiting client approval",
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
