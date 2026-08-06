/**
 * 数据库模型定义
 */

import { query, queryOne, execute } from '@/lib/db'

// ============================================
// 用户模型
// ============================================
export interface User {
  id: number
  email: string
  password_hash: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login_at?: string
  is_active: boolean
}

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    return await queryOne<User>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
  },

  async findById(id: number): Promise<User | null> {
    return await queryOne<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    )
  },

  async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await execute(
      `INSERT INTO users (email, password_hash, name, role, avatar_url, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user.email, user.password_hash, user.name, user.role, user.avatar_url, user.is_active]
    )
    return result
  },
}

// ============================================
// 分类模型
// ============================================
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  parent_id?: number
  display_order: number
  created_at: string
  updated_at: string
}

export const CategoryModel = {
  async getAll(): Promise<Category[]> {
    return await query<Category>(
      'SELECT * FROM categories ORDER BY display_order ASC'
    )
  },

  async getBySlug(slug: string): Promise<Category | null> {
    return await queryOne<Category>(
      'SELECT * FROM categories WHERE slug = ?',
      [slug]
    )
  },
}

// ============================================
// 文章模型
// ============================================
export interface Article {
  id: number
  title: string
  slug: string
  description?: string
  content: string
  category_id: number
  author_id: number
  featured: boolean
  reading_time?: number
  view_count: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
}

export const ArticleModel = {
  async getAll(limit = 50, offset = 0): Promise<Article[]> {
    return await query<Article>(
      'SELECT * FROM articles WHERE status = ? ORDER BY published_at DESC LIMIT ? OFFSET ?',
      ['published', limit, offset]
    )
  },

  async getBySlug(slug: string): Promise<Article | null> {
    return await queryOne<Article>(
      'SELECT * FROM articles WHERE slug = ? AND status = ?',
      [slug, 'published']
    )
  },

  async getByCategory(categoryId: number, limit = 20): Promise<Article[]> {
    return await query<Article>(
      'SELECT * FROM articles WHERE category_id = ? AND status = ? ORDER BY published_at DESC LIMIT ?',
      [categoryId, 'published', limit]
    )
  },

  async getFeatured(limit = 5): Promise<Article[]> {
    return await query<Article>(
      'SELECT * FROM articles WHERE featured = ? AND status = ? ORDER BY published_at DESC LIMIT ?',
      [true, 'published', limit]
    )
  },

  async incrementViewCount(id: number): Promise<void> {
    await execute(
      'UPDATE articles SET view_count = view_count + 1 WHERE id = ?',
      [id]
    )
  },
}

// ============================================
// 计算器模型
// ============================================
export interface Calculator {
  id: number
  name: string
  slug: string
  description?: string
  url: string
  icon?: string
  category_id?: number
  featured: boolean
  usage_count: number
  meta_title?: string
  meta_description?: string
  education_title?: string
  created_at: string
  updated_at: string
}

export const CalculatorModel = {
  async getAll(): Promise<Calculator[]> {
    return await query<Calculator>(
      'SELECT * FROM calculators ORDER BY name ASC'
    )
  },

  async getBySlug(slug: string): Promise<Calculator | null> {
    return await queryOne<Calculator>(
      'SELECT * FROM calculators WHERE slug = ?',
      [slug]
    )
  },

  async getFeatured(): Promise<Calculator[]> {
    return await query<Calculator>(
      'SELECT * FROM calculators WHERE featured = ? ORDER BY usage_count DESC',
      [true]
    )
  },

  async incrementUsage(id: number): Promise<void> {
    await execute(
      'UPDATE calculators SET usage_count = usage_count + 1 WHERE id = ?',
      [id]
    )
  },

}

// ============================================
// 页面模型
// ============================================
export interface Page {
  id: number
  title: string
  slug: string
  page_type: 'home' | 'about' | 'contact' | 'custom'
  content?: string
  hero_enabled: boolean
  hero_headline?: string
  hero_subheadline?: string
  hero_image_url?: string
  hero_cta_text?: string
  hero_cta_link?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  og_image_url?: string
  no_index: boolean
  status: 'draft' | 'published'
  published_at?: string
  created_at: string
  updated_at: string
}

export const PageModel = {
  async getBySlug(slug: string): Promise<Page | null> {
    return await queryOne<Page>(
      'SELECT * FROM pages WHERE slug = ? AND status = ?',
      [slug, 'published']
    )
  },

  async getHome(): Promise<Page | null> {
    return await queryOne<Page>(
      'SELECT * FROM pages WHERE page_type = ? AND status = ?',
      ['home', 'published']
    )
  },
}

// ============================================
// 设置模型
// ============================================
export interface Setting {
  id: number
  key: string
  value: string
  type: 'text' | 'json' | 'boolean' | 'number'
  category: 'general' | 'seo' | 'social' | 'analytics'
  description?: string
  updated_at: string
}

export const SettingModel = {
  async get(key: string): Promise<string | null> {
    const setting = await queryOne<Setting>(
      'SELECT value FROM settings WHERE key = ?',
      [key]
    )
    return setting?.value || null
  },

  async getAll(): Promise<Setting[]> {
    return await query<Setting>('SELECT * FROM settings ORDER BY category, key')
  },

  async set(key: string, value: string): Promise<void> {
    await execute(
      `INSERT INTO settings (key, value, updated_at) 
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')`,
      [key, value, value]
    )
  },
}

// ============================================
// 工具评分模型
// ============================================
export interface ToolRating {
  id: number
  tool_slug: string
  is_helpful: number  // 1 = helpful, 0 = not helpful
  ip_hash: string
  created_at: string
}

export interface RatingAggregate {
  total: number
  helpful: number
}

export const ToolRatingModel = {
  async submit(slug: string, isHelpful: boolean, ipHash: string): Promise<void> {
    await execute(
      `INSERT INTO tool_ratings (tool_slug, is_helpful, ip_hash, created_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(tool_slug, ip_hash) DO UPDATE SET is_helpful = ?, created_at = datetime('now')`,
      [slug, isHelpful ? 1 : 0, ipHash, isHelpful ? 1 : 0]
    )
  },

  async getAggregate(slug: string): Promise<RatingAggregate> {
    const result = await queryOne<{ total: number; helpful: number }>(
      `SELECT COUNT(*) as total, SUM(is_helpful) as helpful
       FROM tool_ratings WHERE tool_slug = ?`,
      [slug]
    )
    return { total: result?.total || 0, helpful: result?.helpful || 0 }
  },

  async hasVoted(slug: string, ipHash: string): Promise<boolean> {
    const result = await queryOne<{ cnt: number }>(
      'SELECT COUNT(*) as cnt FROM tool_ratings WHERE tool_slug = ? AND ip_hash = ?',
      [slug, ipHash]
    )
    return (result?.cnt || 0) > 0
  },
}
