# Prisma House — prisma-house.com

## Where this repo lives

**`~/Projects/prisma-house`** (since 2026-10-06). GitHub: `GianmarcoXraised/prisma-consulting-site`.
Railway project `prisma-consulting`, environment `production`; a push to `main` deploys live in about a minute.

It used to live in `~/Desktop/AI XRAISED/prisma-consulting`, a folder synced by iCloud. iCloud
created " 2" duplicates there (a crop folder renamed to `crm 2`, an image swapped with an older
copy, a second `.git/index`) and one of them ended up in a commit. Never work from a path under
`~/Desktop` or `~/Documents`: clone outside iCloud instead.

Before every commit, check that nothing with " 2" in its name is in the tree or the index:

```bash
find . -name "* 2*" -not -path "./node_modules/*"; git ls-files | grep " 2"
```

## Running it

Node is at `~/.local/node/bin` (it is not always on the PATH):

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm ci
npx tsc --noEmit -p .
npm run build
npm run portfolio   # rebuilds public/prisma-house-portfolio.pdf (needs Playwright's Chromium)
```

## How the Work section is organised

- `lib/categories.ts`: the six fixed categories, in this order: Website, Portal, CRM, CMS, SaaS, AI Agents. They are the
  tiles on the home page and at the top of `/work`.
- `lib/work.ts`: the examples shown inside each category's panel and at `/work/[slug]`. Titles are
  category labels, never a client's name; the live site appears only as "Live at <domain> →".
- `public/work/<slug>/`: real-scale crops, listed with their coordinates in `docs/work-crops.md`.
  `public/work/manifest.json` must be regenerated whenever a crop is added or replaced.
- CRM screens come only from a throwaway database with invented data; nothing is ever captured
  from a production system behind a login.

## Working rules

- Plan first, then one step at a time. Commit on a branch; push to `main` only when the owner says so.
- `docs/work-research.md` is ignored by git on purpose (internal notes): it exists only on this machine.
