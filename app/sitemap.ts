import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/news";
import { getAllPressReleases } from "@/lib/press";
import { getPublishedWork } from "@/lib/work";
import { SITE_URL } from "@/lib/site";

// Rendered per request so scheduled press releases appear at their time without a redeploy.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages take the build date as lastmod so every deploy refreshes them.
  const built = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: built, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/marketing-consulting`, lastModified: built, changeFrequency: "monthly", priority: 0.8 },
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

  // The press listing goes in only once there is a release to list.
  const releases = getAllPressReleases();
  const press: MetadataRoute.Sitemap = releases.length
    ? [
        { url: `${SITE_URL}/news/press`, lastModified: new Date(releases[0].date), changeFrequency: "monthly", priority: 0.7 },
        ...releases.map((release) => ({
          url: `${SITE_URL}/news/press/${release.slug}`,
          lastModified: new Date(release.date),
          changeFrequency: "yearly" as const,
          priority: 0.6,
        })),
      ]
    : [];

  return [...staticPages, ...work, ...articles, ...press];
}
