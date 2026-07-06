# Prisma Consulting

Marketing consultancy website for Prisma Consulting — UK-based, serving clients across the UK and USA.

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
| `SMTP_HOST` | SMTP server for the contact form |
| `SMTP_PORT` | SMTP port (465 uses implicit TLS, anything else uses STARTTLS) |
| `SMTP_USER` | SMTP username / from address |
| `SMTP_PASS` | SMTP password |
| `CONTACT_TO_EMAIL` | Where contact-form enquiries are delivered |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly event URL embedded on /contact |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata, sitemap and robots.txt |

Without SMTP variables set, the contact form API returns a friendly configuration error; the rest of the site works normally.

## Deploying on Railway

The project uses the standard Next.js build and start commands, and `npm start` respects Railway's `PORT` env var:

1. Create a new Railway service from this repo.
2. Railway auto-detects Node and runs `npm install && npm run build`, then `npm start`.
3. Add the environment variables above in the Railway dashboard (set `NEXT_PUBLIC_SITE_URL` to your production domain).

## Content

- **News articles** live in `content/news/*.mdx` with `title`, `excerpt`, `date`, `author`, `category` frontmatter. Drop in a new `.mdx` file and it appears automatically (list page, article page, sitemap).
- **Services** are defined in `lib/services.tsx`.
- The founder photo on /about is a styled placeholder — swap it for a real image when available.
