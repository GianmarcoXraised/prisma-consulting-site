# Work section — real-scale crops

Every image under `public/work/<slug>/` is a crop of a precise region of a real page, captured with
Playwright at viewport 1440 × 900, `deviceScaleFactor: 2`, `clip` on the region below — never a
whole page. Files are WebP ≤ 250 KB. `manifest.json` records the pixel size and the CSS size of
the captured region; the site never shows a crop wider than its CSS width (1 CSS px = 1 captured px).

Hero crops are 16:10, feature crops are 4:3. Coordinates are CSS px at 1440 (x, y, width, height).
Projects are named by category (slug = category), never by the client's name.

| File | Page | Clip | Min. text at source |
|---|---|---|---|
| video-platform/hero-interviews | xraised.com/videos (filters + first row of the grid) | 132, 454, 1176 × 735 | 10.5 px |
| video-platform/interviews | xraised.com/ ("This week on xraised") | 132, 1450, 1176 × 882 | 10.5 px |
| video-platform/interview | xraised.com/videos/… (one interview) | 170, 115, 1100 × 825 | 11 px |
| video-platform/services | xraised.com/services | 132, 176, 1176 × 882 | 10.5 px |
| video-platform/hero-tools | xraised.com/tools (kept, not shown) | 132, 18, 1176 × 735 | 11.5 px |
| book-store/hero-what-we-do | bookspert.com/ | 132, 765, 1176 × 735 | 12 px |
| book-store/languages | bookspert.com/ with cookie `bookspert_language=it` | 132, 0, 1176 × 882 | 12 px |
| book-store/books | bookspert.com/books | 132, 570, 1176 × 882 | 11 px |
| book-store/book | bookspert.com/authors/… ("The book" section; no standalone book page exists) | 132, 600, 1176 × 882 | 11 px |
| book-store/how-it-works | bookspert.com/ | 132, 1975, 1176 × 882 | 12 px |
| crm/hero-inbox | local CRM, /inbox with a conversation open | 244, 2, 1176 × 735 | 10 px |
| crm/pipeline | local CRM, /deals?view=board | 232, 88, 1050 × 787 | 10 px |
| crm/followups | local CRM, /followups | 240, 0, 1184 × 888 | 10 px |
| crm/pr-campaign | local CRM, /pr-campaigns/1 | 240, 0, 1184 × 888 | 10 px |
| crm/invoices | local CRM, /accounting/invoices | 240, 0, 1184 × 888 | 10 px |
| saas/hero-home | Visibility Intelligence home (hero with the sample report preview) | 132, 92, 1176 × 735 | 9 px (band labels inside the preview) |
| saas/pricing | /pricing (Base and Pro plans) | 140, 448, 1160 × 870 | 12 px |
| saas/services | /services (stage 01) | 132, 1399, 1176 × 882 | 12 px |
| saas/audit | /audit (the free-audit form, never submitted) | 132, 356, 1053 × 790 | 12 px |
| saas/insights | /insights (three illustrative cases) | 132, 130, 1176 × 882 | 12 px |

The CRM screens come from a throwaway local database (PGlite, outside this repo) seeded only with
invented people, companies, outlets, emails (`.example` domains) and amounts; no production data
is involved. The SaaS crops are public pages only: no login, no audit run, and the report preview
and case studies are the product's own illustrative examples with invented people.

On the home page the hero sits in the 60% column of a 1440px-wide row: 1176px crops are shown at
~828px (70%). On `/work/[slug]` the hero is shown at 100% and the feature crops at 70–79%.

## Still to capture (2026-10-06)

The `cms` and `ai-agents` examples (Xraised interview publishing system and its editorial agents)
have no crops yet: their screens need a local xraised-agent with fictional data (Postgres via
PGlite boots fine; the content calendar and client brand config live only in Azure Blob, the
social slides are HTML stored inside jobs, the distribution report has no web route). Until then
their panels and pages show text-only features; `ai-agents` reuses `crm/followups`. Image keys
reserved: `cms/hero-calendar`, `cms/interviews`, `cms/calendar`, `cms/editor`, `cms/social`,
`ai-agents/hero-article`, `ai-agents/article`, `ai-agents/distribution`, `ai-agents/slides`.

Update 2026-10-06: `cms` and `ai-agents` now use public outputs instead of team screens.
| cms/hero-interview | xraised.com/videos/… (player, category, title) | 140, 177, 1160 × 725 | 11 px |
| ai-agents/hero-article | fwnbc.marketminute.com (the distributed article: outlet header, title, opening paragraphs) | 112, 0, 1216 × 760 | 12.8 px |
| ai-agents/social | linkedin.com/company/xraised (a post with the generated slides; cookie banner rejected, login overlays removed; clip anchored to the post's measured top) | 90, post top − 4, 1120 × 840 | 12 px |
The other CMS/AI Agents features reuse `video-platform/*` and `crm/followups`. AP News and Barchart block automated capture (403).

Update 2026-10-07: `portal` crops, from a throwaway local copy of the client area (PGlite, no service keys) seeded with an invented client; names, outlets and titles checked read-only against production before capture.
| portal/hero-overview | local client area, /portal/services (top bar, subscription, services overview) | 132, 0, 1176 × 735 | 11 px |
| portal/services | /portal/services (the list with statuses) | 248, 474, 944 × 708 | 11 px |
| portal/approve | /portal/services/<id> (decision card + propose an edit) | 248, 855, 944 × 708 | 13 px |
| portal/downloads | /portal/services/<id> (delivered work: report downloads and links) | 250, 70, 940 × 705 | 11 px |
| portal/sign-in | /site/login-link (sign in with an emailed link) | 392, 95, 656 × 492 | 13 px |
