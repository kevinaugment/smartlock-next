-- =====================================================
-- Smart Lock Hub - 完整数据库Schema
-- Next.js + Cloudflare D1 (SQLite)
-- =====================================================

-- =====================================================
-- 1. 用户表
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor', -- admin, editor, viewer
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME,
    is_active BOOLEAN DEFAULT 1
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- 2. 分类表
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT, -- emoji
    color TEXT, -- hex颜色 #0ea5e9
    parent_id INTEGER,
    display_order INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_order ON categories(display_order);

-- =====================================================
-- 3. 文章表
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- Markdown格式
    category_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    
    -- 特性
    is_pillar BOOLEAN DEFAULT 0,
    featured BOOLEAN DEFAULT 0,
    reading_time INTEGER, -- 分钟
    word_count INTEGER,
    view_count INTEGER DEFAULT 0,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_url TEXT,
    
    -- 发布
    status TEXT DEFAULT 'draft', -- draft, published, archived
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published ON articles(published_at);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_articles_pillar ON articles(is_pillar);

-- =====================================================
-- 4. 标签表
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- =====================================================
-- 5. 文章标签关联表
-- =====================================================
CREATE TABLE IF NOT EXISTS article_tags (
    article_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- =====================================================
-- 6. 文章关联表（相关文章）
-- =====================================================
CREATE TABLE IF NOT EXISTS article_relations (
    article_id INTEGER NOT NULL,
    related_article_id INTEGER NOT NULL,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY (article_id, related_article_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (related_article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- =====================================================
-- 7. 计算器表
-- =====================================================
CREATE TABLE IF NOT EXISTS calculators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    component_name TEXT NOT NULL, -- React组件名
    icon TEXT, -- emoji
    category_id INTEGER,
    featured BOOLEAN DEFAULT 0,
    usage_count INTEGER DEFAULT 0,
    
    -- 教育内容配置
    education_title TEXT, -- "Deep Dive"等
    education_intro TEXT, -- 简介文本
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_calculators_slug ON calculators(slug);
CREATE INDEX idx_calculators_featured ON calculators(featured);
CREATE INDEX idx_calculators_usage ON calculators(usage_count);

-- =====================================================
-- 8. 计算器关联文章表
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_articles (
    calculator_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    custom_title TEXT, -- 自定义显示标题
    custom_description TEXT,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY (calculator_id, article_id),
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- =====================================================
-- 9. 计算器相关工具表
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_tools (
    calculator_id INTEGER NOT NULL,
    related_calculator_id INTEGER NOT NULL,
    custom_name TEXT,
    custom_description TEXT,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY (calculator_id, related_calculator_id),
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
    FOREIGN KEY (related_calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);

-- =====================================================
-- 10. 页面表
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    page_type TEXT NOT NULL, -- home, about, contact, custom
    content TEXT, -- JSON格式的页面配置
    
    -- Hero区域
    hero_enabled BOOLEAN DEFAULT 0,
    hero_headline TEXT,
    hero_subheadline TEXT,
    hero_cta_text TEXT,
    hero_cta_link TEXT,
    hero_image_url TEXT,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_url TEXT,
    no_index BOOLEAN DEFAULT 0,
    
    -- 发布
    status TEXT DEFAULT 'draft',
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_type ON pages(page_type);
CREATE INDEX idx_pages_status ON pages(status);

-- =====================================================
-- 11. 导航菜单表
-- =====================================================
CREATE TABLE IF NOT EXISTS navigation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL, -- header, footer, sidebar
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    parent_id INTEGER,
    display_order INTEGER DEFAULT 0,
    icon TEXT, -- emoji或icon名
    is_external BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES navigation(id)
);

CREATE INDEX idx_navigation_location ON navigation(location);
CREATE INDEX idx_navigation_parent ON navigation(parent_id);
CREATE INDEX idx_navigation_order ON navigation(display_order);

-- =====================================================
-- 12. 全局设置表
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT, -- JSON或纯文本
    type TEXT DEFAULT 'text', -- text, json, boolean, number
    category TEXT DEFAULT 'general', -- general, seo, social, analytics
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_settings_category ON settings(category);

-- =====================================================
-- 13. 访问统计表
-- =====================================================
CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    page_path TEXT NOT NULL,
    page_type TEXT, -- article, calculator, page
    entity_id INTEGER, -- article_id或calculator_id
    view_count INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    avg_time_on_page INTEGER DEFAULT 0, -- 秒
    bounce_rate REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, page_path)
);

CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_analytics_path ON analytics(page_path);
CREATE INDEX idx_analytics_type ON analytics(page_type, entity_id);

-- =====================================================
-- 14. 审计日志表
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL, -- create, update, delete, login, logout
    entity_type TEXT NOT NULL, -- article, calculator, page, category, user
    entity_id INTEGER,
    changes TEXT, -- JSON格式的变更记录
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
CREATE INDEX idx_audit_action ON audit_logs(action);
