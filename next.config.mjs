/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization (Vercel built-in)
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Security & caching headers (migrated from Cloudflare _headers)
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },

  // Exclude smartlockold directory
  webpack: (config, { isServer }) => {
    config.externals = config.externals || []
    config.externals.push({
      'gray-matter': 'gray-matter',
    })

    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/smartlockold/**', '**/node_modules/**'],
    }

    return config
  },
}

export default nextConfig
