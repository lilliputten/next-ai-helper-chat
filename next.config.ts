import { NextConfig } from 'next';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@tailwindcss/oxide'],
  },
  images: {
    remotePatterns: [],
  },
} satisfies NextConfig;

export default nextConfig;

