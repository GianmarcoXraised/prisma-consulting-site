import { NextResponse } from "next/server";
import { computeManifest } from "@/lib/indexnow";

// The page fingerprints of this build (lib/indexnow.ts): the next deployment reads them here to
// know which URLs changed. Not a page for people or search engines.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(computeManifest(), {
    headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" },
  });
}
