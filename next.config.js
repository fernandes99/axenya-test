/** @type {import('next').NextConfig} */

const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
})

const routesCustom = require('./routes-custom');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts', 'xml.tsx', '(?<!ignore.)styles.ts'],
  images: {
    domains: ['www.datocms-assets.com'],
  },
  async redirects() {
    return [
      {
        source: '/contato',
        destination: '/#form',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    const rewrites = {
      beforeFiles: [
        ...routesCustom
      ]
    }

    return rewrites;
  }
}
module.exports = nextConfig
