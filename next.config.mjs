/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 配置
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    unoptimized: true,
  },
  
  // 排除smartlockold目录
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // 排除不需要编译的文件
  webpack: (config, { isServer }) => {
    config.externals = config.externals || []
    config.externals.push({
      'gray-matter': 'gray-matter',
    })
    
    // 排除smartlockold目录
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/smartlockold/**', '**/node_modules/**'],
    }
    
    return config
  },
}

export default nextConfig
