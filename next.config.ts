import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Use the standard Next.js output on Vercel so that:
   * - The framework handles routing and static assets (including /public/mgmt-panel.html)
   * - We avoid the legacy static export mode, which is not recommended on Vercel
   */
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  trailingSlash: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
