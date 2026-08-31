import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // Erro de tipo derruba o build de produção. Nunca ligar isto.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
