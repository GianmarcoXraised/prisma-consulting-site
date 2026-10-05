import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/news";
import { getPublishedWork } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages take the build date as lastmod so every deploy refreshes them.
  const built = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: built, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news`, lastModified: built, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: built, changeFrequency: "yearly", priority: 0.9 },
  ];

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const work: MetadataRoute.Sitemap = getPublishedWork().map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: built,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...work, ...articles];
}
