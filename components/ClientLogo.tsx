// Monochrome client wordmarks, drawn as plain SVG so they inherit the text colour (currentColor).
// Placeholders in the clients' own spirit until the original vector logos are supplied; swap the
// paths here and nothing else changes.
const WORDMARK_FONT = "var(--font-display), 'Bricolage Grotesque', system-ui, sans-serif";

function XraisedMark({ x = 0 }: { x?: number }) {
  // Two chevrons meeting in the middle, like the "x" of the xraised mark.
  return (
    <g transform={`translate(${x} 0)`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4l9 10-9 10" />
      <path d="M23 4l-9 10 9 10" />
    </g>
  );
}

function BookMark({ x = 0 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 0)`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h7.5a3 3 0 0 1 3 3v15.5a2.5 2.5 0 0 0-2.5-2.5H4z" />
      <path d="M25 5.5h-7.5a3 3 0 0 0-3 3v15.5a2.5 2.5 0 0 1 2.5-2.5H25z" />
    </g>
  );
}

function SignalMark({ x = 0 }: { x?: number }) {
  // Visibility Intelligence "Signal": a V, an i stroke and its dot.
  return (
    <g transform={`translate(${x} 0) scale(0.39)`} fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 22 L26 54 L42 22" />
      <path d="M54 54 L54 30" />
      <circle cx="54" cy="17" r="5" fill="currentColor" stroke="none" />
    </g>
  );
}

export type ClientLogoName = "xraised" | "xraised-crm" | "bookspert" | "visibility-intelligence" | "leland-investments";

const LOGOS: Record<ClientLogoName, { label: string; width: number; render: () => JSX.Element }> = {
  xraised: {
    label: "Xraised",
    width: 118,
    render: () => (
      <>
        <XraisedMark />
        <text x="32" y="21" fontFamily={WORDMARK_FONT} fontWeight={800} fontSize="21" letterSpacing="-0.02em" fill="currentColor">
          xraised
        </text>
      </>
    ),
  },
  "xraised-crm": {
    label: "Xraised CRM",
    width: 172,
    render: () => (
      <>
        <XraisedMark />
        <text x="32" y="21" fontFamily={WORDMARK_FONT} fontWeight={800} fontSize="21" letterSpacing="-0.02em" fill="currentColor">
          xraised
        </text>
        <text x="112" y="21" fontFamily={WORDMARK_FONT} fontWeight={600} fontSize="13" letterSpacing="0.16em" fill="currentColor" opacity="0.7">
          CRM
        </text>
      </>
    ),
  },
  bookspert: {
    label: "Bookspert",
    width: 150,
    render: () => (
      <>
        <BookMark />
        <text x="33" y="21" fontFamily={WORDMARK_FONT} fontWeight={800} fontSize="21" letterSpacing="-0.02em" fill="currentColor">
          Bookspert
        </text>
      </>
    ),
  },
  "visibility-intelligence": {
    label: "Visibility Intelligence",
    width: 232,
    render: () => (
      <>
        <SignalMark />
        <text x="32" y="20" fontFamily={WORDMARK_FONT} fontWeight={700} fontSize="18" letterSpacing="-0.01em" fill="currentColor">
          Visibility Intelligence
        </text>
      </>
    ),
  },
  "leland-investments": {
    label: "Leland Investments",
    width: 200,
    render: () => (
      <text x="0" y="21" fontFamily={WORDMARK_FONT} fontWeight={700} fontSize="19" letterSpacing="0.02em" fill="currentColor">
        LELAND INVESTMENTS
      </text>
    ),
  },
};

export default function ClientLogo({ name, className = "" }: { name: string; className?: string }) {
  const logo = LOGOS[name as ClientLogoName];
  if (!logo) return null;
  return (
    <svg
      viewBox={`0 0 ${logo.width} 28`}
      height="28"
      width={logo.width}
      role="img"
      aria-label={`${logo.label} logo`}
      className={className}
      style={{ height: "1.75rem", width: "auto" }}
    >
      {logo.render()}
    </svg>
  );
}
