-- Product Ratings - 真实用户评分系统
-- 匿名评分，localStorage fingerprint 去重

CREATE TABLE IF NOT EXISTS product_ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    fingerprint TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(product_id, fingerprint),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 按产品聚合查询优化
CREATE INDEX IF NOT EXISTS idx_product_ratings_product ON product_ratings(product_id);

-- 按指纹查询优化（用户查看自己的评分）
CREATE INDEX IF NOT EXISTS idx_product_ratings_fingerprint ON product_ratings(fingerprint);
