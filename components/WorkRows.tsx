import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClientLogo from "@/components/ClientLogo";
import type { ResolvedImage } from "@/lib/work";

export type WorkRowItem = {
  slug: string;
  name: string;
  clientLabel: string;
  category: string;
  tagline: string;
  components: string[];
  statusNote?: string;
  hero: ResolvedImage | null;
  heroAlt: string;
};

/**
 * Full-width, alternating rows. The image sits in a 60% column and is never shown wider than
 * its capture width (1 CSS px = 1 captured px), so a crop stays at real scale instead of being
 * stretched; on a 1440px viewport the 60% column is ~826px, i.e. ≥70% of a 1176px crop.
 */
export function WorkRow({ item, index, eager = false }: { item: WorkRowItem; index: number; eager?: boolean }) {
  const reverse = index % 2 === 1;
  const frame = (
    <div className={`md:col-span-3 ${reverse ? "md:order-2" : ""}`}>
      <Reveal>
        <div
          className="overflow-hidden rounded-[2rem] border border-ink-line bg-ink-card shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
          style={item.hero ? { maxWidth: item.hero.cssWidth, marginInline: reverse ? "0 auto" : "auto 0" } : undefined}
        >
          {item.hero ? (
            <Image
              src={item.hero.src}
              alt={item.heroAlt}
              width={item.hero.width}
              height={item.hero.height}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="h-auto w-full"
              priority={eager}
              loading={eager ? "eager" : "lazy"}
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-prism-violet/15 via-ink-card to-prism-cyan/10">
              <span className="rounded-full border border-prism-amber/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-prism-amber">
                {item.statusNote ?? "Coming soon"}
              </span>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );

  const text = (
    <div className={`md:col-span-2 ${reverse ? "md:order-1 md:pr-6 lg:pr-10" : "md:pl-6 lg:pl-10"}`}>
      <Reveal delay={0.1}>
        <ClientLogo name={item.slug} className="text-bone" />
        <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-wider text-bone-faint">
          {item.clientLabel} · {item.category}
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight text-bone md:text-3xl">
          {item.tagline}
        </h3>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Components">
          {item.components.map((c) => (
            <li key={c} className="rounded-full border border-ink-line px-3 py-1 text-xs font-semibold text-bone-dim">
              {c}
            </li>
          ))}
        </ul>
        <Link
          href={`/work/${item.slug}`}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-prism-violet"
        >
          See the build
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
    </div>
  );

  return (
    <article className="grid items-center gap-8 md:grid-cols-5 md:gap-6">
      {frame}
      {text}
    </article>
  );
}

export default function WorkRows({ items }: { items: WorkRowItem[] }) {
  return (
    <div className="mx-auto max-w-[1440px] space-y-20 px-5 md:space-y-28">
      {items.map((item, i) => (
        <WorkRow key={item.slug} item={item} index={i} eager={i === 0} />
      ))}
    </div>
  );
}
