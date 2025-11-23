// Turso数据库连接配置 - 兼容Vercel Edge Runtime
import { createClient } from '@libsql/client'

// 创建Turso客户端
export function getTursoClient() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  })
  
  return client
}

// 便捷查询函数
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const client = getTursoClient()
  
  try {
    const result = await client.execute({
      sql,
      args: params || [],
    })
    
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
  const client = getTursoClient()
  
  try {
    const result = await client.execute({
      sql,
      args: params || [],
    })
    
    return result.rowsAffected
  } finally {
    // LibSQL客户端会自动管理连接
  }
}

// 批量执行
export async function batch(statements: Array<{ sql: string; params?: any[] }>) {
  const client = getTursoClient()
  
  try {
    const batch = statements.map(({ sql, params }) => ({
      sql,
      args: params || [],
    }))
    
    const results = await client.batch(batch, 'write')
    return results
  } finally {
    // LibSQL客户端会自动管理连接
  }
}

export default {
  query,
  queryOne,
  execute,
  batch,
  getTursoClient,
}
