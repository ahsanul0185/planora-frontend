import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000") + "/api/auth/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination: (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1") + "/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
