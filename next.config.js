/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"]
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        '.js': ['swc-loader'],
      },
    },
  },
}

module.exports = nextConfig
