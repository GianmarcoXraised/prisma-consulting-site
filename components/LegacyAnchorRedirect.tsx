"use client";

import { useEffect } from "react";

// Hash fragments never reach the server, so retired section anchors are forwarded here on the
// client. Old hash -> new place: "#section" on this page, or "/path#section" on another page.
export default function LegacyAnchorRedirect({
  redirects,
}: {
  redirects: Record<string, string>;
}) {
  useEffect(() => {
    const target = redirects[window.location.hash];
    if (!target) return;
    if (target.startsWith("#")) {
      window.history.replaceState(null, "", target);
      document.querySelector(target)?.scrollIntoView();
    } else {
      window.location.replace(target);
    }
  }, [redirects]);
  return null;
}
