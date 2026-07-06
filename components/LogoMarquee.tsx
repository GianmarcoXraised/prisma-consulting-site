const CLIENTS = [
  "Northwind & Co",
  "Halcyon Labs",
  "Fable Studio",
  "Meridian Bank",
  "Copperfield",
  "Atlas Ventures",
  "Loom & Weft",
  "Brightside",
];

export default function LogoMarquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div
      className="relative overflow-hidden py-4"
      aria-label="Selected clients"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-16">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-bone-faint transition-colors duration-300 hover:text-bone"
            aria-hidden={i >= CLIENTS.length}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
