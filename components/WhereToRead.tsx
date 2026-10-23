import { getDistribution } from "@/lib/press-distribution";

/**
 * "Where to read it": the news sites a published release was distributed to (server component;
 * the newswire key never leaves the server). Nothing at all is rendered without links.
 */
export default async function WhereToRead({ mmReleaseId }: { mmReleaseId?: number }) {
  const d = await getDistribution(mmReleaseId);
  if (!d || d.outlets.length === 0) return null;
  return (
    <section className="mt-16 border-t border-ink-line pt-10" aria-labelledby="where-heading">
      <h2
        id="where-heading"
        className="font-display text-2xl font-bold tracking-tight text-bone md:text-3xl"
      >
        Where to read it
      </h2>
      <p className="mt-4 leading-relaxed text-bone-dim">
        This release was distributed to {d.total.toLocaleString("en-GB")} news sites, including:
      </p>
      <ul className="mt-5 space-y-2.5">
        {d.outlets.map((o) => (
          <li key={o.url}>
            <a
              href={o.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-bone underline decoration-ink-line underline-offset-4 transition-colors hover:decoration-prism-violet"
            >
              {o.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
