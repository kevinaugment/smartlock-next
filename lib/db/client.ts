/**
 * D1 数据库客户端
 * Cloudflare D1 (SQLite) 连接和查询工具
 */

export interface D1Database {
  prepare(query: string): D1PreparedStatement
  dump(): Promise<ArrayBuffer>
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
  exec(query: string): Promise<D1ExecResult>
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  run<T = unknown>(): Promise<D1Result<T>>
  all<T = unknown>(): Promise<D1Result<T>>
  raw<T = unknown>(): Promise<T[]>
}

export interface D1Result<T = unknown> {
  results?: T[]
  success: boolean
  meta: {
    duration: number
    size_after: number
    rows_read: number
    rows_written: number
  }
  error?: string
}

export interface D1ExecResult {
  count: number
  duration: number
}

/**
 * 获取D1数据库实例
 * 在Cloudflare Pages环境中自动注入
 */
export function getDB(): D1Database {
  // @ts-ignore - Cloudflare环境变量
  if (typeof process !== 'undefined' && process.env.DB) {
    // @ts-ignore
    return process.env.DB
  }
  
  throw new Error('D1 database not available. Make sure DB binding is configured.')
}

/**
 * 执行查询并返回结果
 */
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const db = getDB()
  const stmt = db.prepare(sql)
  
  if (params.length > 0) {
    stmt.bind(...params)
  }
  
  const result = await stmt.all<T>()
  return result.results || []
}

/**
 * 执行查询并返回第一行
 */
export async function queryOne<T = any>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const db = getDB()
  const stmt = db.prepare(sql)
  
  if (params.length > 0) {
    stmt.bind(...params)
  }
  
  return await stmt.first<T>()
}

/**
 * 执行INSERT/UPDATE/DELETE
 */
export async function execute(
  sql: string,
  params: any[] = []
): Promise<D1Result> {
  const db = getDB()
  const stmt = db.prepare(sql)
  
  if (params.length > 0) {
    stmt.bind(...params)
  }
  
  return await stmt.run()
}

/**
 * 批量执行多个语句（事务）
 */
export async function batch(queries: { sql: string; params?: any[] }[]): Promise<D1Result[]> {
  const db = getDB()
  const statements = queries.map(q => {
    const stmt = db.prepare(q.sql)
    return q.params ? stmt.bind(...q.params) : stmt
  })
  
  return await db.batch(statements)
}
