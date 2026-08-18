import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` emits a plain `out/` folder of HTML/CSS/JS.
  // This deploys anywhere — Vercel, Netlify, GitHub Pages, S3, any static host.
  //
  // If you later add server features (API routes, server actions, ISR),
  // delete the two lines below and Next.js will build as a normal server app.
  output: "export",
  images: { unoptimized: true },

  // Emits `/about/index.html` instead of `/about.html` — friendlier on
  // static hosts that don't rewrite extensionless URLs.
  trailingSlash: true,
};

export default nextConfig;
