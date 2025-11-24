-- =====================================================
-- Calculator Content Management System Extension
-- Purpose: Enable database-driven calculator content
-- for SEO optimization and admin control
-- =====================================================

-- =====================================================
-- 1. Calculator Content Sections
-- Stores structured educational content blocks
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_content_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculator_id INTEGER NOT NULL,
    section_type TEXT NOT NULL, -- methodology, use_case, hidden_costs, best_practices, comparison
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- Markdown or JSON
    display_order INTEGER DEFAULT 0,
    icon TEXT, -- emoji
    
    -- SEO
    seo_keyword TEXT, -- target keyword for this section
    
    -- Display
    layout TEXT DEFAULT 'default', -- default, grid, table, list
    is_collapsible BOOLEAN DEFAULT 0,
    expanded_by_default BOOLEAN DEFAULT 1,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);

CREATE INDEX idx_calc_sections_calc ON calculator_content_sections(calculator_id);
CREATE INDEX idx_calc_sections_type ON calculator_content_sections(section_type);
CREATE INDEX idx_calc_sections_order ON calculator_content_sections(display_order);

-- =====================================================
-- 2. Calculator FAQs
-- Structured FAQ data for Schema.org FAQPage
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculator_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL, -- Markdown
    display_order INTEGER DEFAULT 0,
    
    -- SEO
    target_keyword TEXT,
    search_volume INTEGER DEFAULT 0, -- monthly search volume
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);

CREATE INDEX idx_calc_faqs_calc ON calculator_faqs(calculator_id);
CREATE INDEX idx_calc_faqs_order ON calculator_faqs(display_order);

-- =====================================================
-- 3. Calculator Protocol Data
-- Technical specifications for protocol comparisons
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_protocol_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculator_id INTEGER NOT NULL,
    protocol TEXT NOT NULL, -- wifi, zigbee, zwave, thread
    
    -- Technical specs
    battery_life_months INTEGER,
    battery_life_note TEXT,
    hub_cost REAL,
    hub_name TEXT,
    power_consumption_mw REAL, -- milliwatts
    range_meters INTEGER,
    mesh_capable BOOLEAN DEFAULT 0,
    
    -- Cost factors
    typical_lock_price_min REAL,
    typical_lock_price_max REAL,
    monthly_subscription_typical REAL,
    
    -- Use case ratings (1-5)
    rating_residential INTEGER,
    rating_commercial INTEGER,
    rating_enterprise INTEGER,
    
    -- Notes
    pros TEXT, -- JSON array
    cons TEXT, -- JSON array
    best_for TEXT, -- Description
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
    UNIQUE(calculator_id, protocol)
);

CREATE INDEX idx_calc_protocol_calc ON calculator_protocol_data(calculator_id);
CREATE INDEX idx_calc_protocol_name ON calculator_protocol_data(protocol);

-- =====================================================
-- 4. Calculator Use Cases
-- Real-world scenarios with example calculations
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_use_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculator_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    scenario_type TEXT NOT NULL, -- residential, commercial, enterprise, rental
    description TEXT NOT NULL,
    
    -- Example inputs (JSON)
    example_inputs TEXT NOT NULL, -- Stores calculator input values
    
    -- Key insights
    key_insight TEXT, -- Main takeaway
    icon TEXT, -- emoji
    
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);

CREATE INDEX idx_calc_use_cases_calc ON calculator_use_cases(calculator_id);
CREATE INDEX idx_calc_use_cases_type ON calculator_use_cases(scenario_type);
CREATE INDEX idx_calc_use_cases_order ON calculator_use_cases(display_order);

-- =====================================================
-- 5. Calculator Data Sources
-- E-E-A-T: Document data sources and methodology
-- =====================================================
CREATE TABLE IF NOT EXISTS calculator_data_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    calculator_id INTEGER NOT NULL,
    source_type TEXT NOT NULL, -- manufacturer, industry_report, testing, user_data
    source_name TEXT NOT NULL,
    source_url TEXT,
    data_point TEXT NOT NULL, -- What data this source provides
    last_verified_at DATETIME,
    notes TEXT,
    
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);

CREATE INDEX idx_calc_sources_calc ON calculator_data_sources(calculator_id);
CREATE INDEX idx_calc_sources_type ON calculator_data_sources(source_type);
