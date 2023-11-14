/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    domains: ["secure.gravatar.com", "2.gravatar.com", "klabban-demo.local", "klabban.local", "purple-gazelle-147770.hostingersite.com", "res.cloudinary.com"]
  }
}

module.exports = nextConfig
