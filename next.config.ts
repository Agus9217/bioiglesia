import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 70, 75, 80, 90],
  },
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
