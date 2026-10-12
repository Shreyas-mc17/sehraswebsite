import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: 'export',
  // /services/wedding-design/ -> /services/wedding-design/index.html (works on any static host)
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
