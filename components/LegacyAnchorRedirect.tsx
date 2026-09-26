"use client";

import { useEffect } from "react";

// Hash fragments never reach the server, so retired section anchors are
// forwarded here on the client. Old link -> current section id.
const LEGACY_ANCHORS: Record<string, string> = {
  "#pr-visibility": "#media-pitching",
};

export default function LegacyAnchorRedirect() {
  useEffect(() => {
    const target = LEGACY_ANCHORS[window.location.hash];
    if (!target) return;
    window.history.replaceState(null, "", target);
    document.querySelector(target)?.scrollIntoView();
  }, []);
  return null;
}
