"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 47, suffix: "%", label: "Average uplift in qualified pipeline within six months" },
  { value: 120, suffix: "+", label: "Ambitious brands advised to date" },
  { value: 9.2, suffix: "x", label: "Best-recorded return on marketing investment for a client" },
  { value: 14, suffix: "", label: "Industries served, from fintech to fashion" },
] as const;

function Counter({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <span className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-6xl">
      {isFloat ? display.toFixed(1) : Math.round(display)}
      <span className="text-prism">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="border-t border-ink-line pt-6">
          <Counter value={stat.value} suffix={stat.suffix} start={inView} />
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
