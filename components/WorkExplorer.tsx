"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryTile, { CategoryGrid } from "@/components/CategoryTile";
import type { Category, CategorySlug } from "@/lib/categories";
import type { ResolvedImage } from "@/lib/work";

export type ExplorerFeature = { title: string; text: string; alt?: string; image: ResolvedImage | null };
export type ExplorerExample = {
  slug: string;
  title: string;
  kind: string;
  tagline: string;
  problem: string;
  components: string[];
  siteUrl: string | null;
  privateNote?: string;
  hero: ResolvedImage | null;
  heroAlt: string;
  features: ExplorerFeature[];
  provenance?: string;
};

const domain = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
const isSlug = (s: string, cats: Category[]): s is CategorySlug => cats.some((c) => c.slug === s);

/**
 * The /work explorer: the six category tiles, and under them ONE open panel with that
 * category's example(s). The open panel is the URL hash (#cms), so a deep link opens it and
 * the browser's back button closes it.
 */
export default function WorkExplorer({ categories, examples }: { categories: Category[]; examples: Record<string, ExplorerExample> }) {
  const [open, setOpen] = useState<CategorySlug | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fromClick = useRef(false);

  const readHash = useCallback(() => {
    const h = window.location.hash.replace(/^#/, "");
    setOpen(isSlug(h, categories) ? h : null);
  }, [categories]);

  useEffect(() => {
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [readHash]);

  // After a click, bring the panel into view once it has rendered.
  useEffect(() => {
    if (open && fromClick.current && panelRef.current) {
      fromClick.current = false;
      const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [open]);

  const toggle = (slug: CategorySlug) => {
    const next = open === slug ? null : slug;
    fromClick.current = next !== null;
    setOpen(next);
    const url = next ? `#${next}` : window.location.pathname;
    window.history.pushState(null, "", url);
  };

  const category = open ? categories.find((c) => c.slug === open) ?? null : null;

  return (
    <div>
      <CategoryGrid>
        {categories.map((c) => (
          <CategoryTile key={c.slug} category={c} href={`/work#${c.slug}`} as="button" active={open === c.slug} onClick={() => toggle(c.slug)} />
        ))}
      </CategoryGrid>

      {category && (
        <div ref={panelRef} id={`panel-${category.slug}`} className="mt-10 rounded-[2rem] border border-ink-line bg-ink-card/60 p-5 md:mt-14 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-prism-violet">{category.code}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-bone md:text-4xl">{category.name}</h2>
              <p className="mt-3 max-w-2xl text-bone-dim">{category.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="What it includes">
                {category.chips.map((chip) => (
                  <li key={chip} className="rounded-full border border-ink-line px-3 py-1 text-xs font-semibold text-bone-dim">{chip}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => toggle(category.slug)}
              className="rounded-full border border-ink-line px-4 py-2 text-xs font-semibold text-bone-dim transition-colors hover:border-prism-violet hover:text-bone"
            >
              Close
            </button>
          </div>

          <div className="mt-10 space-y-16 md:mt-14 md:space-y-24">
            {category.examples.map((slug) => {
              const ex = examples[slug];
              if (!ex) return null;
              return <ExamplePanel key={slug} ex={ex} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ExamplePanel({ ex }: { ex: ExplorerExample }) {
  const withImage = ex.features.filter((f) => f.image).slice(0, 4);
  const textOnly = ex.features.filter((f) => !f.image).slice(0, 4);
  return (
    <article id={`example-${ex.slug}`} className="border-t border-ink-line pt-10 md:pt-14">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bone-faint">Example · {ex.kind}</p>
      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">{ex.title}</h3>
      <p className="mt-3 max-w-3xl leading-relaxed text-bone-dim">{ex.problem}</p>

      {ex.hero && (
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-ink-line bg-ink-card shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]" style={{ maxWidth: ex.hero.cssWidth }}>
          <Image src={ex.hero.src} alt={ex.heroAlt} width={ex.hero.width} height={ex.hero.height} sizes="(min-width: 1280px) 1176px, 100vw" className="h-auto w-full" loading="lazy" />
        </div>
      )}

      {withImage.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {withImage.map((f) => (
            <figure key={f.title} className="overflow-hidden rounded-[1.5rem] border border-ink-line bg-ink-card">
              <Image src={f.image!.src} alt={f.alt ?? f.title} width={f.image!.width} height={f.image!.height} sizes="(min-width: 768px) 40vw, 100vw" className="h-auto w-full" loading="lazy" />
              <figcaption className="p-5">
                <p className="font-display text-lg font-bold tracking-tight text-bone">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{f.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {textOnly.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {textOnly.map((f) => (
            <div key={f.title} className="rounded-[1.5rem] border border-ink-line bg-ink-card p-5">
              <p className="font-display text-lg font-bold tracking-tight text-bone">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">{f.text}</p>
            </div>
          ))}
        </div>
      )}
      {ex.provenance && <p className="mt-4 text-xs leading-relaxed text-bone-faint">{ex.provenance}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        {ex.siteUrl ? (
          <a href={ex.siteUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-prism-violet">
            Live at {domain(ex.siteUrl)}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        ) : (
          <p className="text-sm font-semibold text-bone-dim">{ex.privateNote ?? "Private system, demo on request"}</p>
        )}
        <Link href={`/work/${ex.slug}`} className="text-sm font-semibold text-bone-dim transition-colors hover:text-bone">
          Full case study →
        </Link>
        <Link href="/contact" className="inline-flex items-center rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-prism-violet hover:text-bone">
          Book a call
        </Link>
      </div>
    </article>
  );
}
