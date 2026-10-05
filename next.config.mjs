/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
