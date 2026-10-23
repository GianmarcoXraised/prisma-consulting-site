import Link from "next/link";

/** Articles / Press switch at the top of /news. Rendered only when there are press releases. */
export default function NewsTabs({ active }: { active: "articles" | "press" }) {
  const tabs = [
    { key: "articles", href: "/news", label: "Articles" },
    { key: "press", href: "/news/press", label: "Press" },
  ] as const;
  return (
    <nav aria-label="News sections" className="mb-12 flex gap-2">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "border-prism-violet text-bone"
                : "border-ink-line text-bone-dim hover:border-prism-violet hover:text-bone"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
