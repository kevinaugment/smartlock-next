import '@cloudflare/next-on-pages'

declare module '@cloudflare/next-on-pages' {
  interface CloudflareEnv {
    DB: D1Database
  }
}
