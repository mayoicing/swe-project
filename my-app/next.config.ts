import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thefilmsmith.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imdb.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/nightjarprod/content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", //Fixed object structure
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", //ALLOW-FROM is deprecated, replaced with SAMEORIGIN
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.youtube.com;", //Fixed quotes
          },
        ],
      },
    ];
  },
};

export default nextConfig;
