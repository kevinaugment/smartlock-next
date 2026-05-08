CREATE TABLE IF NOT EXISTS report_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_type TEXT NOT NULL,
    report_title TEXT NOT NULL,
    email TEXT NOT NULL,
    use_case TEXT NOT NULL,
    door_count INTEGER NOT NULL,
    source_path TEXT NOT NULL,
    utm_json TEXT,
    context_json TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_report_leads_report_type ON report_leads(report_type);
CREATE INDEX IF NOT EXISTS idx_report_leads_email ON report_leads(email);
CREATE INDEX IF NOT EXISTS idx_report_leads_source_path ON report_leads(source_path);
CREATE INDEX IF NOT EXISTS idx_report_leads_created_at ON report_leads(created_at);
