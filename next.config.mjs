/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
      { source: "/work/xraised", destination: "/work/video-platform", permanent: true },
      { source: "/work/xraised-crm", destination: "/work/crm", permanent: true },
      { source: "/work/bookspert", destination: "/work/book-store", permanent: true },
      { source: "/work/visibility-intelligence", destination: "/work/saas", permanent: true },
    ];
  },
};

export default nextConfig;
