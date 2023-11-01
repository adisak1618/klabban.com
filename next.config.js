/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    domains: ["secure.gravatar.com", "2.gravatar.com", "klabban-demo.local", "purple-gazelle-147770.hostingersite.com"]
  }
}

module.exports = nextConfig
