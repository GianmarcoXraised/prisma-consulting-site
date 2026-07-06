import type { CSSProperties } from "react";

type PressBrand = {
  name: string;
  display: string;
  className?: string;
  style?: CSSProperties;
};

const SERIF = 'Georgia, "Times New Roman", serif';

/**
 * Wordmark-style text logos — no image assets. Each entry approximates the
 * publication's masthead with type alone (case, weight, tracking, serif/sans),
 * kept to a uniform size band so the marquee reads evenly.
 */
const PRESS: PressBrand[] = [
  {
    name: "Forbes",
    display: "Forbes",
    className: "text-2xl font-bold",
    style: { fontFamily: SERIF },
  },
  {
    name: "Business Insider",
    display: "BUSINESS INSIDER",
    className: "text-lg font-extrabold tracking-tighter",
    style: { transform: "scaleX(0.92)" },
  },
  {
    name: "Yahoo Finance",
    display: "Yahoo Finance",
    className: "text-xl font-extrabold",
  },
  {
    name: "MarketWatch",
    display: "MarketWatch",
    className: "text-xl font-bold tracking-tight",
  },
  {
    name: "AP News",
    display: "AP News",
    className: "text-xl font-black",
  },
  {
    name: "NBC",
    display: "NBC",
    className: "text-xl font-semibold tracking-[0.28em]",
  },
  {
    name: "Fox News",
    display: "FOX NEWS",
    className: "text-xl font-black tracking-tight",
  },
  {
    name: "Nikkei",
    display: "NIKKEI",
    className: "text-xl font-bold tracking-[0.14em]",
    style: { fontFamily: SERIF },
  },
  {
    name: "Benzinga",
    display: "Benzinga",
    className: "text-xl font-bold",
  },
  {
    name: "Street Insider",
    display: "Street Insider",
    className: "text-xl font-semibold",
  },
  {
    name: "Bloomberg",
    display: "Bloomberg",
    className: "text-xl font-extrabold tracking-tight",
  },
  {
    name: "Reuters",
    display: "REUTERS",
    className: "text-lg font-medium tracking-[0.22em]",
  },
  {
    name: "USA Today",
    display: "USA TODAY",
    className: "text-xl font-black italic tracking-tight",
  },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20"
      aria-hidden={hidden}
    >
      {PRESS.map((brand) => (
        <span
          key={brand.name}
          title={brand.name}
          className={`inline-block whitespace-nowrap leading-none text-bone-dim opacity-60 grayscale transition-all duration-300 hover:text-bone hover:opacity-100 ${brand.className ?? ""}`}
          style={brand.style}
        >
          {brand.display}
        </span>
      ))}
    </div>
  );
}

export default function PressMarquee() {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
