/**
 * 数据库客户端 (支持 Turso/LibSQL 和 Cloudflare D1)
 */
import { createClient, type Client, type ResultSet } from '@libsql/client'

// ===========================================
// D1 类型定义 (用于兼容)
// ===========================================
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

// ===========================================
// 客户端实例
// ===========================================

let libsqlClient: Client | null = null

function getLibSQLClient(): Client {
  if (!libsqlClient) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    if (!url || !authToken) {
      throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set')
    }

    libsqlClient = createClient({
      url,
      authToken,
    })
  }
  return libsqlClient
}

function isRetryableDatabaseError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const message = `${error.name} ${error.message} ${(error as { cause?: unknown }).cause instanceof Error ? (error as { cause: Error }).cause.message : ''}`
  return /fetch failed|socket|UND_ERR_SOCKET|ECONNRESET|ETIMEDOUT|ENOTFOUND/i.test(message)
}

async function withDatabaseRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: unknown

  const maxAttempts = 6

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (!isRetryableDatabaseError(error) || attempt === maxAttempts - 1) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
    }
  }

  throw lastError
}

/**
 * 获取D1数据库实例 (Cloudflare Pages环境中)
 */
export function getD1(): D1Database | null {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env.DB) {
    // @ts-ignore
    return process.env.DB
  }
  return null
}

/**
 * 判断是否使用 Turso
 */
const USE_TURSO = !!(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN)

// ===========================================
// 统一查询接口
// ===========================================

/**
 * 执行查询并返回结果列表
 */
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  if (USE_TURSO) {
    const client = getLibSQLClient()
    const result = await withDatabaseRetry(() => client.execute({ sql, args: params }))
    return result.rows as unknown as T[]
  }

  // Fallback to D1
  const db = getD1()
  if (!db) throw new Error('Database not configured (No Turso or D1 found)')

  const stmt = db.prepare(sql).bind(...params)
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
  if (USE_TURSO) {
    const client = getLibSQLClient()
    const result = await withDatabaseRetry(() => client.execute({ sql, args: params }))
    if (result.rows.length === 0) return null
    return result.rows[0] as unknown as T
  }

  // Fallback to D1
  const db = getD1()
  if (!db) throw new Error('Database not configured')

  const stmt = db.prepare(sql).bind(...params)
  return await stmt.first<T>()
}

/**
 * 执行 INSERT/UPDATE/DELETE
 */
export async function execute(
  sql: string,
  params: any[] = []
): Promise<D1Result> {
  if (USE_TURSO) {
    const client = getLibSQLClient()
    const result = await withDatabaseRetry(() => client.execute({ sql, args: params }))

    return {
      success: true,
      results: [],
      meta: {
        duration: 0,
        size_after: 0,
        rows_read: 0,
        rows_written: result.rowsAffected,
      }
    }
  }

  // Fallback to D1
  const db = getD1()
  if (!db) throw new Error('Database not configured')

  const stmt = db.prepare(sql).bind(...params)
  return await stmt.run()
}

/**
 * 批量执行多个语句 (事务)
 */
export async function batch(queries: { sql: string; params?: any[] }[]): Promise<any[]> {
  if (USE_TURSO) {
    const client = getLibSQLClient()
    // LibSQL transaction
    const transaction = await client.transaction('write')
    const results = []

    try {
      for (const q of queries) {
        // execute method on transaction might differ slightly depending on version, 
        // but generally client.execute works or transaction.execute
        await transaction.execute({ sql: q.sql, args: q.params || [] })
      }
      await transaction.commit()
      return new Array(queries.length).fill({ success: true })
    } catch (e) {
      transaction.close() // Rollback is automatic on close without commit usually, or implicit
      throw e
    }
  }

  // Fallback to D1
  const db = getD1()
  if (!db) throw new Error('Database not configured')

  const statements = queries.map(q => {
    const stmt = db.prepare(q.sql)
    return q.params ? stmt.bind(...q.params) : stmt
  })

  return await db.batch(statements)
}
