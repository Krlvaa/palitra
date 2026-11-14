/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholders are first-party SVGs. Keep the CSP strict — no scripts, no
    // external origins — and swap `dangerouslyAllowSVG` off once real photos
    // are connected.
    // `unoptimized` avoids ~1s optimizer cold-start per image for vector files.
    // Remove it once real photos are connected.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  experimental: {
    // Inline critical CSS so the first paint is not blocked by the stylesheet
    // on slow mobile connections.
    optimizeCss: true,
  },
  // Render metadata in <head> instead of streaming it into <body>: SEO audit
  // tools and some crawlers only read <head> and miss the description otherwise.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
