-- 工具评分表
CREATE TABLE IF NOT EXISTS tool_ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_slug TEXT NOT NULL,
  is_helpful INTEGER NOT NULL DEFAULT 1,
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(tool_slug, ip_hash)
);

CREATE INDEX IF NOT EXISTS idx_tool_ratings_slug ON tool_ratings(tool_slug);
