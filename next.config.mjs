import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// Setup Cloudflare bindings for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 配置
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    unoptimized: true,
  },
  
  // 排除不需要编译的文件
  webpack: (config) => {
    config.externals = config.externals || []
    config.externals.push({
      'gray-matter': 'gray-matter',
    })
    return config
  },
}

export default nextConfig
