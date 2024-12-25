import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // config options here
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Add other remote patterns as needed
    ],
  },
};

export default nextConfig;