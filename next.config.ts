import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project placeholders are local, trusted SVGs. Allow the optimizer to
    // serve them (sandboxed) until real screenshots replace them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
