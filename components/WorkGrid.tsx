"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { WorkCategory } from "@/lib/work";

export type WorkCard = {
  slug: string;
  name: string;
  clientLabel: string;
  category: WorkCategory;
  tagline: string;
  statusNote?: string;
  image: { src: string; width: number; height: number } | null;
};

const FILTERS: ("All" | WorkCategory)[] = ["All", "Websites", "Systems & products"];

export default function WorkGrid({ items }: { items: WorkCard[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter work by type">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === f
                ? "border-bone bg-bone text-ink"
                : "border-ink-line text-bone-dim hover:border-prism-violet hover:text-bone"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group overflow-hidden rounded-2xl border border-ink-line bg-ink-card transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-line bg-ink">
              {item.image ? (
                <Image
                  src={item.image.src}
                  alt=""
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-prism-violet/20 via-ink-card to-prism-cyan/10" />
              )}
            </div>
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">
                <span>{item.clientLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{item.category}</span>
                {item.statusNote && (
                  <span className="rounded-full border border-prism-amber/30 px-2 py-0.5 normal-case tracking-normal text-prism-amber/90">
                    {item.statusNote}
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">
                {item.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-bone-dim">{item.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
