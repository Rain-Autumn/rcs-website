import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // Playwright uses this exact loopback origin; production policy is unchanged.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
