/** @type {import('next').NextConfig} */
const nextConfig = {
  // debug: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trade/BTC_USDT',
        permanent: true,
      },
      {
        source: '/trade',
        destination: '/trade/BTC_USDT',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  
}
module.exports = nextConfig;

