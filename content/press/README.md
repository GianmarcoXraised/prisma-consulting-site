# Press releases

One file per release: `content/press/<slug>.mdx`. The slug becomes the URL `/news/press/<slug>`.
This README is not a release (only `.mdx` files are read). With no `.mdx` file here, the Press tab
on /news is hidden and no press page is in the sitemap.

```mdx
---
title: "Prisma House launches …"
summary: "One or two sentences: the news, for the listing, meta description and social cards."
date: "2026-11-03"
location: "London, United Kingdom"   # optional, this is the default
faq:                                  # optional, also output as FAQPage JSON-LD
  - q: "Question?"
    a: "Answer."
boilerplate: "…"                      # optional, defaults to the company definition in lib/site.ts
mediaContact:                         # optional, defaults to info@prisma-house.com
  name: "…"
  email: "info@prisma-house.com"
  phone: "…"
---

The body of the release in Markdown. The dateline (location and date) is added automatically
in front of the first paragraph.
```
