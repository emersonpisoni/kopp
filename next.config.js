/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public'
})

export default withPWA({
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false
    }
    return config
  },
  sassOptions: {
    additionalData: `@import "styles/index.scss";`
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'classic.exame.com'
      },
      {
        protocol: 'http',
        hostname: '10.2.4.231'
      }
    ]
  },
  output: 'export',
  basePath: '/kopp'
})
