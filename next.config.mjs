/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // instrumentation.ts (IndexNow submissions at server start) needs this flag on Next 14.
  experimental: { instrumentationHook: true },
  // HTML must never be held by a shared cache (Cloudflare, proxies): by default Next sends
  // "s-maxage=31536000" on prerendered pages, which would let any CDN keep an old home page for a
  // year after a deploy. Static files under /_next keep their own immutable headers.
  async headers() {
    return [
      {
        source: "/((?!_next/|.*\\.(?:pdf|svg|png|jpg|jpeg|webp|ico|woff2?|txt|xml)$).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" }],
      },
    ];
  },
  // Case studies were renamed from the client's name to their category (2026-10). Old links keep working.
  async redirects() {
    return [
      // One primary host: the apex. www answers a single 301 to the same path (the query string is
      // carried over by Next). Canonical, OG url, JSON-LD and the sitemap use SITE_URL (the apex).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.prisma-house.com" }],
        destination: "https://prisma-house.com/:path*",
        statusCode: 301,
      },
      { source: "/work/xraised", destination: "/work/video-platform", permanent: true },
      { source: "/work/xraised-crm", destination: "/work/crm", permanent: true },
      { source: "/work/bookspert", destination: "/work/book-store", permanent: true },
      { source: "/work/visibility-intelligence", destination: "/work/saas", permanent: true },
    ];
  },
};

export default nextConfig;
