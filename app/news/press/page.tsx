import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import NewsTabs from "@/components/NewsTabs";
import { formatDate } from "@/lib/news";
import { getAllPressReleases } from "@/lib/press";

const PRESS_TITLE = "Press Releases | Prisma House";
const PRESS_DESCRIPTION =
  "Official announcements from Prisma House, the London-based studio that builds custom CRMs, business systems and websites. Media contact included on every release.";

// Rendered per request so scheduled press releases appear at their time without a redeploy.
export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  // Until the first release is published the listing is empty: keep it out of search.
  const empty = getAllPressReleases().length === 0;
  return {
    title: "Press Releases",
    description: PRESS_DESCRIPTION,
    alternates: { canonical: "/news/press" },
    robots: empty ? { index: false, follow: true } : undefined,
    openGraph: {
      title: PRESS_TITLE,
      description: PRESS_DESCRIPTION,
      url: "/news/press",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: PRESS_TITLE,
      description: PRESS_DESCRIPTION,
      images: [OG_IMAGE.url],
    },
  };
}

export default function PressPage() {
  const releases = getAllPressReleases();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="prism-orb -right-32 top-20 h-[22rem] w-[22rem] animate-prism-drift"
          style={{ background: "linear-gradient(135deg, #FFB347, #E14ECA)" }}
        />
        <div className="relative mx-auto max-w-shell px-6 pb-20 pt-44 lg:px-10">
          <Reveal>
            <p className="eyebrow mb-6">News &amp; Press · Press releases</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-hero max-w-4xl">
              Press <span className="text-prism">releases.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Official announcements from Prisma House. For media enquiries,
              write to{" "}
              <a
                href="mailto:info@prisma-house.com"
                className="text-bone underline decoration-ink-line underline-offset-4 hover:decoration-prism-violet"
              >
                info@prisma-house.com
              </a>
              .
            </p>
          </Reveal>
        </div>
        <div className="beam absolute bottom-0 left-0 h-px w-full opacity-60" />
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-shell px-6 lg:px-10">
          {releases.length > 0 && <NewsTabs active="press" />}
          {releases.length === 0 ? (
            <p className="text-bone-dim">No press releases yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {releases.map((release, i) => (
                <Reveal key={release.slug} delay={i * 0.1}>
                  <Link
                    href={`/news/press/${release.slug}`}
                    className="group relative flex h-full flex-col rounded-2xl border border-ink-line bg-ink-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-prism-violet/50"
                  >
                    <span className="beam absolute inset-x-8 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    <div className="flex items-center gap-3 text-xs text-bone-faint">
                      <span className="rounded-full border border-ink-line px-3 py-1 font-semibold uppercase tracking-wider text-bone-dim">
                        Press release
                      </span>
                      <span>{release.location}</span>
                    </div>
                    <h2 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-bone transition-colors duration-300 group-hover:text-prism-violet">
                      {release.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">
                      {release.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-ink-line pt-5 text-xs text-bone-faint">
                      <span className="font-semibold text-bone-dim">
                        Read release →
                      </span>
                      <time dateTime={release.date}>
                        {formatDate(release.date)}
                      </time>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
