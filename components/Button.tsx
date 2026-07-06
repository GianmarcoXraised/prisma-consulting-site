import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonPrimary({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-bone px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] ${className}`}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-bone">
        {children}
      </span>
      <svg
        className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bone"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 8h11M9 3.5L13.5 8 9 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-prism-violet via-prism-magenta to-prism-amber transition-transform duration-300 group-hover:translate-y-0" />
    </Link>
  );
}

export function ButtonGhost({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-ink-line px-7 py-3.5 text-sm font-semibold text-bone transition-all duration-300 hover:border-prism-violet hover:text-prism-violet ${className}`}
    >
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 8h11M9 3.5L13.5 8 9 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
