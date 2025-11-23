// Cloudflare Workers/Pages类型定义
interface Env {
  DB: D1Database
}

// 这些类型由Cloudflare Workers运行时提供
declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement
  }

  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement
    first<T = any>(colName?: string): Promise<T | null>
    run(): Promise<D1Result>
    all<T = any>(): Promise<D1Result<T>>
  }

  interface D1Result<T = any> {
    results?: T[]
    success: boolean
    error?: string
    meta?: any
  }
}

export type PagesFunction<Env = unknown> = (context: {
  request: Request
  env: Env
  params: Record<string, string>
  waitUntil: (promise: Promise<any>) => void
  next: () => Promise<Response>
  data: Record<string, any>
}) => Response | Promise<Response>

export { Env }
