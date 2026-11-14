import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholders are first-party SVGs. Keep the CSP strict — no scripts, no
    // external origins — and swap `dangerouslyAllowSVG` off once real photos
    // are connected.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
