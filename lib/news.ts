import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export type FAQ = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  date: string;
  category: string;
  service?: string;
  faqs: FAQ[];
  related: string[];
  readingTime: string;
  content: string;
};

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function getAllArticles(): Article[] {
  const files = fs
    .readdirSync(NEWS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title as string,
      metaTitle: (data.metaTitle as string) ?? (data.title as string),
      excerpt: data.excerpt as string,
      date: data.date as string,
      category: (data.category as string) ?? "Insights",
      service: data.service as string | undefined,
      faqs: (data.faqs as FAQ[]) ?? [],
      related: (data.related as string[]) ?? [],
      readingTime: estimateReadingTime(content),
      content,
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
