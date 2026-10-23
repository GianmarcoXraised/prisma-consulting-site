# Press releases

One file per release: `content/press/<slug>.mdx`. The slug becomes the URL `/news/press/<slug>`.
This README is not a release (only `.mdx` files are read). A release whose `date` is in the
future does not exist on the site yet: no page (404), no Press tab, no sitemap entry. It appears
by itself once its time has passed, because the press pages, /news and the sitemap render per
request; no redeploy is needed. With no published release, the Press tab is hidden.

```mdx
---
title: "Prisma House launches …"
summary: "One or two sentences: the news, for the listing, meta description and social cards."
date: "2026-11-03T14:00:00Z"            # publish time, ISO 8601 with offset (Z = UTC)
keywords: "custom CRM, business systems"   # optional, page meta + JSON-LD
mmReleaseId: 89207162                 # optional, the Marketersmedia release id: "Where to read it" block
location: "London, United Kingdom"   # optional, this is the default
faq:                                  # optional, also output as FAQPage JSON-LD
  - q: "Question?"
    a: "Answer."
boilerplate: "…"                      # optional, defaults to the company definition in lib/site.ts
mediaContact:                         # optional, defaults to info@prisma-house.com
  name: "…"
  title: "…"
  organization: "…"
  email: "info@prisma-house.com"
  phone: "…"
  website: "https://prisma-house.com"
  address: "…"
---

The body of the release in Markdown. The dateline (location and date) is added automatically
in front of the first paragraph.
```
