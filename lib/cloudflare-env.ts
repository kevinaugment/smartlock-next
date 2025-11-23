// Cloudflare环境访问 - 兼容多种运行时环境

export function getCloudflareEnv(): any {
  // 尝试多种方式获取Cloudflare环境
  try {
    // 方法1: getRequestContext (标准方式)
    const { getRequestContext } = require('@cloudflare/next-on-pages')
    const context = getRequestContext()
    if (context?.env) return context.env
  } catch {}
  
  // 方法2: 全局变量 (运行时注入)
  if (typeof globalThis !== 'undefined' && (globalThis as any).__env) {
    return (globalThis as any).__env
  }
  
  // 方法3: process.env (某些环境)
  if (typeof process !== 'undefined' && (process as any).env.__CLOUDFLARE_ENV) {
    return JSON.parse((process as any).env.__CLOUDFLARE_ENV)
  }
  
  throw new Error('Cloudflare environment not available')
}

export function getD1Database(): any {
  const env = getCloudflareEnv()
  const db = env.DB
  
  if (!db) {
    throw new Error('D1 database binding "DB" not found in Cloudflare environment')
  }
  
  return db
}
