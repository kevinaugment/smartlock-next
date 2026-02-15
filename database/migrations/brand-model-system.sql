-- =====================================================
-- Brand/Model Database System
-- Purpose: Drive SEO pages + calculator integration
-- Tables: brands, product_series, products,
--         product_tags, top_n_pages, product_articles
-- =====================================================

-- =====================================================
-- 1. Brands (扩展版)
-- =====================================================
DROP TABLE IF EXISTS calculator_brands;
DROP TABLE IF EXISTS product_articles;
DROP TABLE IF EXISTS product_tags;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_series;
DROP TABLE IF EXISTS top_n_pages;
DROP TABLE IF EXISTS brands;

CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    logo_url TEXT,
    website_url TEXT,
    country TEXT,
    founded_year INTEGER,

    -- Protocol support
    supports_wifi BOOLEAN DEFAULT 0,
    supports_zigbee BOOLEAN DEFAULT 0,
    supports_zwave BOOLEAN DEFAULT 0,
    supports_thread BOOLEAN DEFAULT 0,
    supports_matter BOOLEAN DEFAULT 0,
    supports_bluetooth BOOLEAN DEFAULT 0,

    -- Market positioning
    target_market TEXT DEFAULT 'residential',
    price_tier TEXT DEFAULT 'mid',

    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,

    -- Rating & display
    rating REAL DEFAULT 0,
    featured BOOLEAN DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_featured ON brands(featured);
CREATE INDEX idx_brands_order ON brands(display_order);
CREATE INDEX idx_brands_status ON brands(status);

-- =====================================================
-- 2. Product Series
-- =====================================================
CREATE TABLE IF NOT EXISTS product_series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    release_year INTEGER,
    price_range_min INTEGER,
    price_range_max INTEGER,
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE INDEX idx_series_brand ON product_series(brand_id);
CREATE INDEX idx_series_slug ON product_series(slug);
CREATE INDEX idx_series_active ON product_series(is_active);

-- =====================================================
-- 3. Products (核心表)
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    brand_id INTEGER NOT NULL,

    -- Basic info
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    model_number TEXT,
    description TEXT,
    image_url TEXT,
    price_usd INTEGER,
    buy_url TEXT,

    -- Connectivity
    protocol TEXT NOT NULL,
    secondary_protocol TEXT,
    supports_matter BOOLEAN DEFAULT 0,

    -- Battery specs (calculator: battery-life, power-consumption)
    battery_type TEXT,
    battery_count INTEGER,
    battery_life_months INTEGER,

    -- Physical specs
    weight_grams INTEGER,
    dimensions_json TEXT,

    -- Security (calculator: security-compliance)
    ansi_grade TEXT,
    ul_listed BOOLEAN DEFAULT 0,
    encryption_type TEXT,

    -- Features
    has_fingerprint BOOLEAN DEFAULT 0,
    has_keypad BOOLEAN DEFAULT 0,
    has_auto_lock BOOLEAN DEFAULT 0,
    has_auto_unlock BOOLEAN DEFAULT 0,
    has_voice_control BOOLEAN DEFAULT 0,
    has_remote_access BOOLEAN DEFAULT 0,
    has_guest_codes BOOLEAN DEFAULT 0,
    has_activity_log BOOLEAN DEFAULT 0,
    has_physical_key BOOLEAN DEFAULT 0,

    -- Installation specs (calculator: compatibility, installation-cost)
    door_thickness_min_mm INTEGER,
    door_thickness_max_mm INTEGER,
    bore_diameter_mm INTEGER,
    backset_mm TEXT,

    -- Power specs (calculator: power-consumption)
    standby_power_mw REAL,
    active_power_mw REAL,
    operations_per_day INTEGER DEFAULT 10,

    -- Credential capacity (calculator: credential-planner)
    max_pin_codes INTEGER,
    max_fingerprints INTEGER,
    max_cards INTEGER,
    max_app_users INTEGER,

    -- Signal specs (calculator: signal-strength, rf-coverage)
    rf_frequency TEXT,
    rf_range_meters INTEGER,
    antenna_type TEXT,

    -- Ecosystems
    ecosystems_json TEXT,

    -- Rating & SEO
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,

    -- Status
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (series_id) REFERENCES product_series(id) ON DELETE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_series ON products(series_id);
CREATE INDEX idx_products_protocol ON products(protocol);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_rating ON products(rating DESC);

-- =====================================================
-- 4. Product Tags (多维标签 → Top N 页面)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    tag_type TEXT NOT NULL,
    tag_value TEXT NOT NULL,

    UNIQUE(product_id, tag_type, tag_value),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_ptags_product ON product_tags(product_id);
CREATE INDEX idx_ptags_type_value ON product_tags(tag_type, tag_value);

-- =====================================================
-- 5. Top N Pages (SEO 落地页配置)
-- =====================================================
CREATE TABLE IF NOT EXISTS top_n_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    h1_title TEXT,
    intro_text TEXT,

    -- Query config
    filter_type TEXT NOT NULL,
    filter_value TEXT NOT NULL,
    sort_by TEXT DEFAULT 'rating',
    max_items INTEGER DEFAULT 10,

    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    faq_json TEXT,

    -- Status
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_topn_slug ON top_n_pages(slug);
CREATE INDEX idx_topn_status ON top_n_pages(status);
CREATE INDEX idx_topn_filter ON top_n_pages(filter_type, filter_value);

-- =====================================================
-- 6. Product Articles (产品-文章关联)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_articles (
    product_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    relation_type TEXT DEFAULT 'mentioned',
    display_order INTEGER DEFAULT 0,

    PRIMARY KEY (product_id, article_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX idx_pa_product ON product_articles(product_id);
CREATE INDEX idx_pa_article ON product_articles(article_id);
