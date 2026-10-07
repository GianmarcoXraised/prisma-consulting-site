import Link from "next/link";
import type { Category } from "@/lib/categories";

/**
 * A typographic tile: no screenshot, just the category mark in the display font on a tonal
 * dark gradient, the extended name under it. All six tiles share one size (aspect 4:3).
 * `href` is where the tile leads; `active` marks the tile whose panel is open on /work.
 */
export default function CategoryTile({
  category,
  href,
  active = false,
  onClick,
  as = "link",
}: {
  category: Category;
  href: string;
  active?: boolean;
  onClick?: () => void;
  as?: "link" | "button";
}) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: "linear-gradient(135deg, #7C5CFF, #4ED9E1)" }}
      />
      <span className="relative block font-display font-extrabold leading-none tracking-[-0.04em] text-bone text-[clamp(1.9rem,4.5vw+1rem,6rem)]">
        {category.code}
      </span>
      <span className="relative mt-3 block text-xs font-semibold text-bone-dim md:mt-4 md:text-base">{category.name}</span>
    </>
  );
  const className = `group relative flex aspect-square md:aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-[2rem] border p-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(124,92,255,0.45)] md:p-8 ${
    active ? "border-prism-violet/70 shadow-[0_30px_70px_-30px_rgba(124,92,255,0.5)]" : "border-ink-line hover:border-prism-violet/50"
  }`;
  const style = { background: category.gradient };

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} aria-expanded={active} className={className} style={style}>
        {inner}
      </button>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {inner}
    </Link>
  );
}

/** The 6-tile grid: 3 + 3 on desktop, two columns on phones. */
export function CategoryGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{children}</div>;
}
