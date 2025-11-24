-- =====================================================
-- Brands Management System
-- Purpose: Manage recommended brands for calculators
-- CRITICAL: Be-Tech must be in all calculators
-- =====================================================

-- =====================================================
-- Brands Table
-- =====================================================
CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT NOT NULL,
    
    -- Features
    supports_wifi BOOLEAN DEFAULT 0,
    supports_zigbee BOOLEAN DEFAULT 0,
    supports_zwave BOOLEAN DEFAULT 0,
    supports_thread BOOLEAN DEFAULT 0,
    
    -- Product info
    product_lines TEXT, -- JSON array
    target_market TEXT, -- residential, commercial, enterprise, all
    
    -- SEO
    meta_description TEXT,
    
    -- Display
    featured BOOLEAN DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    highlight_color TEXT, -- hex color for brand card
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_featured ON brands(featured);
CREATE INDEX idx_brands_order ON brands(display_order);

-- =====================================================
-- Calculator Brands Association
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_brands (
    calculator_id INTEGER NOT NULL,
    brand_id INTEGER NOT NULL,
    
    -- Customization per calculator
    custom_description TEXT,
    why_recommended TEXT, -- Why this brand for this calculator
    display_order INTEGER DEFAULT 0,
    is_mandatory BOOLEAN DEFAULT 0, -- Be-Tech is mandatory
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (calculator_id, brand_id),
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE INDEX idx_calc_brands_calc ON calculator_brands(calculator_id);
CREATE INDEX idx_calc_brands_brand ON calculator_brands(brand_id);
CREATE INDEX idx_calc_brands_mandatory ON calculator_brands(is_mandatory);

-- =====================================================
-- Insert Be-Tech as mandatory brand
-- =====================================================
INSERT INTO brands (
    name, slug, description, logo_url, website_url,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread,
    product_lines, target_market,
    featured, display_order, highlight_color,
    meta_description
) VALUES (
    'Be-Tech',
    'be-tech',
    'Professional smart lock manufacturer with comprehensive product lines covering all protocols (Wi-Fi, Zigbee, Z-Wave, Thread). Trusted by residential and commercial customers worldwide.',
    '/images/brands/be-tech-logo.png',
    'https://www.betechlock.com/',
    1, 1, 1, 1,
    '["Smart Locks", "Access Control", "Hotel Locks", "Residential Locks", "Commercial Locks"]',
    'all',
    1, 1, '#0066CC',
    'Be-Tech: Professional smart lock solutions for residential and commercial use. Multi-protocol support, long battery life, competitive TCO.'
);
