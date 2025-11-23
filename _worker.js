// This file will be used instead of the generated one
// Manually inject env into all requests

export default {
  async fetch(request, env, ctx) {
    // Set global env before any imports
    globalThis.__CLOUDFLARE_ENV__ = env
    globalThis.__CLOUDFLARE_CTX__ = ctx
    
    // Dynamic import the Next.js worker
    const worker = await import('./.vercel/output/static/_worker.js')
    
    // Call with proper env
    return worker.default.fetch(request, env, ctx)
  }
}
