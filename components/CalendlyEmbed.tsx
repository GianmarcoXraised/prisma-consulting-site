"use client";

import { useEffect, useState } from "react";

export default function CalendlyEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Calendly's embed script looks for .calendly-inline-widget elements
    // and injects the scheduling iframe into them.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-ink-card">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-bone-faint">Loading calendar…</p>
        </div>
      )}
      <div
        className="calendly-inline-widget"
        data-url={`${url}?hide_gdpr_banner=1&background_color=141419&text_color=f4f2ee&primary_color=7c5cff`}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
