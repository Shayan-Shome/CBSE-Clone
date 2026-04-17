import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cbseresults.nic.in',
      },
    ],
  },
};

export default nextConfig;
