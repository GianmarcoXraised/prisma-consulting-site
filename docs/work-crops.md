# Work section — real-scale crops

Every image under `public/work/<slug>/` is a crop of a precise region of a real page, captured with
Playwright at viewport 1440 × 900, `deviceScaleFactor: 2`, `clip` on the region below — never a
whole page. Files are WebP ≤ 250 KB. `manifest.json` records the pixel size and the CSS size of
the captured region; the site never shows a crop wider than its CSS width (1 CSS px = 1 captured px).

Hero crops are 16:10, feature crops are 4:3. Coordinates are CSS px at 1440 (x, y, width, height).

| File | Page | Clip | Min. text at source |
|---|---|---|---|
| xraised/hero-tools | xraised.com/tools | 132, 18, 1176 × 735 | 11.5 px |
| xraised/interviews | xraised.com/ ("This week on xraised") | 132, 1450, 1176 × 882 | 10.5 px |
| xraised/interview | xraised.com/videos/… (one interview) | 170, 115, 1100 × 825 | 11 px |
| xraised/magazine | xraised.com/magazine | 132, 468, 1176 × 882 | 11.5 px |
| xraised/services | xraised.com/services | 132, 176, 1176 × 882 | 10.5 px |
| bookspert/hero-what-we-do | bookspert.com/ | 132, 765, 1176 × 735 | 12 px |
| bookspert/languages | bookspert.com/ with cookie `bookspert_language=it` | 132, 0, 1176 × 882 | 12 px |
| bookspert/books | bookspert.com/books | 132, 570, 1176 × 882 | 11 px |
| bookspert/book | bookspert.com/authors/… ("The book" section; no standalone book page exists) | 132, 600, 1176 × 882 | 11 px |
| bookspert/how-it-works | bookspert.com/ | 132, 1975, 1176 × 882 | 12 px |
| xraised-crm/hero-inbox | local CRM, /inbox with a conversation open | 244, 2, 1176 × 735 | 10 px |
| xraised-crm/pipeline | local CRM, /deals?view=board | 232, 88, 1050 × 787 | 10 px |
| xraised-crm/followups | local CRM, /followups | 240, 0, 1184 × 888 | 10 px |
| xraised-crm/pr-campaign | local CRM, /pr-campaigns/1 | 240, 0, 1184 × 888 | 10 px |
| xraised-crm/invoices | local CRM, /accounting/invoices | 240, 0, 1184 × 888 | 10 px |

The CRM screens come from a throwaway local database (PGlite, outside this repo) seeded only with
invented people, companies, outlets, emails (`.example` domains) and amounts; no production data
is involved. Visibility Intelligence has no capture yet ("launching soon").

On the home page the hero sits in the 60% column of a 1440px-wide row: 1176px crops are shown at
~828px (70%). On `/work/[slug]` the hero is shown at 100% and the feature crops at 70–79%.
