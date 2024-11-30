import mdx from "@next/mdx";

const withMDX = mdx();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.bsky.app" }],
  },
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
