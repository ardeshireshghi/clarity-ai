/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Optimize chunk loading
  optimizeFonts: true,
  swcMinify: true,
};

module.exports = nextConfig;