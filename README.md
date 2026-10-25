# Prisma House

Website for Prisma House, a London-based studio that builds custom CRMs, business systems and websites for growing companies, with the marketing strategy built in.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Blog content is local MDX in `content/news`.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in real values
npm run dev
```

The site runs at http://localhost:3000.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET` | Microsoft Graph app registration that sends the contact form (client credentials) |
| `CONTACT_SENDER_MAILBOX` | The Microsoft 365 mailbox the app may send from (gianmarco@prisma-house.com; Exchange RBAC limits the app to it) |
| `CONTACT_FROM_EMAIL` | The From address shown (info@prisma-house.com, an alias of that mailbox) |
| `CONTACT_TO_EMAIL` | Where contact-form enquiries are delivered |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly event URL embedded on /contact |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata, sitemap and robots.txt |

Without the Graph variables set, the contact form API returns a friendly configuration error; the rest of the site works normally. Reply-To on each enquiry is the visitor's address.

## Deploying on Railway

The project uses the standard Next.js build and start commands, and `npm start` respects Railway's `PORT` env var:

1. Create a new Railway service from this repo.
2. Railway auto-detects Node and runs `npm install && npm run build`, then `npm start`.
3. Add the environment variables above in the Railway dashboard (set `NEXT_PUBLIC_SITE_URL` to your production domain).

## Work section and portfolio PDF

- Case studies live in `lib/work.ts`; screenshots in `public/work/<project>/` with a `manifest.json` of sizes. A project with `published: false` renders only in `next dev` (with a preview banner) and returns 404 in production.
- `public/prisma-house-portfolio.pdf` is generated from the same data: run `npx playwright install chromium` once, then `npm run portfolio` whenever projects or screenshots change. Published projects only.

## Content

- **News articles** live in `content/news/*.mdx` with `title`, `excerpt`, `date`, `author`, `category` frontmatter. Drop in a new `.mdx` file and it appears automatically (list page, article page, sitemap).
- **Services** are defined in `lib/services.tsx`.
- The founder photo lives at `public/founder/gianmarco_founder_dark.jpg`.
