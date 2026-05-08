// Turso数据库连接配置 - 兼容Vercel Edge Runtime
type TursoClient = {
  execute(input: { sql: string; args: any[] }): Promise<{ rows: unknown[]; rowsAffected: number }>
  batch(
    statements: Array<{ sql: string; args: any[] }>,
    mode: 'write'
  ): Promise<unknown[]>
}

type D1Result<T = unknown> = {
  results?: T[]
  success: boolean
  meta?: {
    changes?: number
    rows_written?: number
  }
}

type D1PreparedStatement = {
  bind(...values: any[]): D1PreparedStatement
  first<T = unknown>(): Promise<T | null>
  run<T = unknown>(): Promise<D1Result<T>>
  all<T = unknown>(): Promise<D1Result<T>>
}

type D1Database = {
  prepare(query: string): D1PreparedStatement
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
}

let tursoClient: TursoClient | null = null
const d1DatabaseOverrideKey = Symbol.for('smartlock-next.db.d1Override')

async function loadCreateClient() {
  const libsql = await import('@libsql/client')
  return libsql.createClient
}

async function getD1Database(): Promise<D1Database | null> {
  const globalWithOverride = globalThis as typeof globalThis & {
    [d1DatabaseOverrideKey]?: D1Database | null
  }
  if (globalWithOverride[d1DatabaseOverrideKey]) return globalWithOverride[d1DatabaseOverrideKey]

  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const context = getCloudflareContext()
    const env = context.env as Record<string, unknown>
    return (env.DB as D1Database | undefined) ?? null
  } catch {
    return null
  }
}

// 创建Turso客户端
export async function getTursoClient() {
  if (tursoClient) return tursoClient

  const createClient = await loadCreateClient()
  tursoClient = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  })
  
  return tursoClient
}

function isRetryableDatabaseError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const cause = (error as { cause?: unknown }).cause
  const causeMessage = cause instanceof Error ? cause.message : ''
  const message = `${error.name} ${error.message} ${causeMessage}`
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

// 便捷查询函数
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const d1 = await getD1Database()
  if (d1) {
    const statement = d1.prepare(sql).bind(...(params || []))
    const result = await statement.all<T>()
    return result.results || []
  }

  const client = await getTursoClient()
  
  try {
    const result = await withDatabaseRetry(() => client.execute({
      sql,
      args: params || [],
    }))
    
    return result.rows as T[]
  } finally {
    // LibSQL客户端会自动管理连接
  }
}

// 获取单行数据
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params)
  return results[0] || null
}

// 执行命令（INSERT, UPDATE, DELETE）
export async function execute(sql: string, params?: any[]): Promise<number> {
  const d1 = await getD1Database()
  if (d1) {
    const statement = d1.prepare(sql).bind(...(params || []))
    const result = await statement.run()
    return result.meta?.changes ?? result.meta?.rows_written ?? 0
  }

  const client = await getTursoClient()
  
  try {
    const result = await withDatabaseRetry(() => client.execute({
      sql,
      args: params || [],
    }))
    
    return result.rowsAffected
  } finally {
    // LibSQL客户端会自动管理连接
  }
}

// 批量执行
export async function batch(statements: Array<{ sql: string; params?: any[] }>) {
  const d1 = await getD1Database()
  if (d1) {
    const prepared = statements.map(({ sql, params }) => d1.prepare(sql).bind(...(params || [])))
    return await d1.batch(prepared)
  }

  const client = await getTursoClient()
  
  try {
    const batch = statements.map(({ sql, params }) => ({
      sql,
      args: params || [],
    }))
    
    const results = await withDatabaseRetry(() => client.batch(batch, 'write'))
    return results
  } finally {
    // LibSQL客户端会自动管理连接
  }
}

const db = {
  query,
  queryOne,
  execute,
  batch,
  getTursoClient,
}

export default db
