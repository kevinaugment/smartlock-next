import { getRequestContext } from '@cloudflare/next-on-pages'

export function getDB() {
  try {
    const context = getRequestContext()
    
    if (!context || !context.env) {
      console.error('❌ getRequestContext() returned invalid context:', context)
      throw new Error('Request context not available - not running in Cloudflare Pages environment')
    }
    
    const db = (context.env as any).DB
    
    if (!db) {
      console.error('❌ D1 database binding not found in env:', Object.keys(context.env))
      throw new Error('D1 database binding "DB" not found - check Cloudflare Pages bindings configuration')
    }
    
    console.log('✅ D1 database connection acquired')
    return db
  } catch (error) {
    console.error('❌ Error getting D1 database:', error)
    throw error
  }
}
