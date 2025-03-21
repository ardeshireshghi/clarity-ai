/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'www.google.com',
      'www.okta.com'
    ],
    unoptimized: process.env.NETLIFY === 'true'
  },
  // Optimize chunk loading
  optimizeFonts: true,
  swcMinify: true,
  // Enable React strict mode
  reactStrictMode: true,
};

module.exports = nextConfig;