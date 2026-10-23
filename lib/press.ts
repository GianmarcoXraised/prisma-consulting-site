import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SITE_DESCRIPTION, CONTACT_EMAIL } from "@/lib/site";
import type { FAQ } from "@/lib/news";

// Press releases live in content/press/<slug>.mdx, the same way articles live in content/news.
// See content/press/README.md for the frontmatter fields.
const PRESS_DIR = path.join(process.cwd(), "content", "press");

export const DEFAULT_LOCATION = "London, United Kingdom";

export type MediaContact = { name?: string; email: string; phone?: string };

export type PressRelease = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  location: string;
  faq: FAQ[];
  boilerplate: string;
  mediaContact: MediaContact;
  body: string;
};

export function getAllPressReleases(): PressRelease[] {
  if (!fs.existsSync(PRESS_DIR)) return [];
  const files = fs.readdirSync(PRESS_DIR).filter((file) => file.endsWith(".mdx"));

  const releases = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PRESS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title as string,
      summary: data.summary as string,
      date: data.date as string,
      location: (data.location as string) ?? DEFAULT_LOCATION,
      faq: (data.faq as FAQ[]) ?? [],
      boilerplate: (data.boilerplate as string) ?? SITE_DESCRIPTION,
      mediaContact: (data.mediaContact as MediaContact) ?? { email: CONTACT_EMAIL },
      body: content,
    };
  });

  return releases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPressRelease(slug: string): PressRelease | undefined {
  return getAllPressReleases().find((release) => release.slug === slug);
}
