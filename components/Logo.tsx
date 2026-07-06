import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Prisma Consulting — home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:rotate-[8deg]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="prism-g" x1="0" y1="28" x2="28" y2="0">
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="40%" stopColor="#E14ECA" />
            <stop offset="75%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#4ED9E1" />
          </linearGradient>
        </defs>
        <path
          d="M14 2L26 24H2L14 2Z"
          stroke="url(#prism-g)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 9L20.5 21H7.5L14 9Z"
          fill="url(#prism-g)"
          opacity="0.45"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-bone">
        Prisma<span className="text-bone-dim font-medium"> Consulting</span>
      </span>
    </Link>
  );
}
