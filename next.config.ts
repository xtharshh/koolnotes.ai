import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // config options here
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;