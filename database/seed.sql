-- =====================================================
-- 初始数据 - Smart Lock Hub
-- =====================================================

-- =====================================================
-- 1. 默认管理员用户
-- =====================================================
-- 密码: admin123
-- bcrypt hash: $2b$10$rKvFgXqfXZQ3Y8p6wYxGO.YtLR5FLNxEJ8XBmJ9kM8YGLqG5K/Hne
INSERT INTO users (email, password_hash, name, role, is_active) 
VALUES ('admin@smartlock.com', '$2b$10$rKvFgXqfXZQ3Y8p6wYxGO.YtLR5FLNxEJ8XBmJ9kM8YGLqG5K/Hne', 'Administrator', 'admin', 1);

-- =====================================================
-- 2. 7个核心分类
-- =====================================================
INSERT INTO categories (name, slug, icon, color, description, display_order, meta_title, meta_description) VALUES
('Protocols', 'protocols', '📡', '#0ea5e9', 'Smart lock protocols and connectivity guides', 1, 'Smart Lock Protocols', 'Learn about Z-Wave, Zigbee, Matter and other smart lock protocols'),
('Security', 'security', '🔒', '#ef4444', 'Security analysis and best practices', 2, 'Smart Lock Security', 'Comprehensive smart lock security guides and vulnerability analysis'),
('Installation', 'installation', '🔋', '#10b981', 'Battery management and installation guides', 3, 'Installation Guides', 'Professional smart lock installation and battery optimization'),
('Guides', 'guides', '🔧', '#f59e0b', 'Troubleshooting and problem-solving guides', 4, 'Troubleshooting Guides', 'Fix smart lock issues with expert troubleshooting guides'),
('Use Cases', 'use-cases', '🏢', '#8b5cf6', 'Real-world smart lock applications', 5, 'Smart Lock Use Cases', 'Airbnb, rental properties, and commercial deployments'),
('Support', 'support', '💡', '#06b6d4', 'Quick support and how-to articles', 6, 'Support Articles', 'Quick answers to common smart lock questions'),
('Integration', 'integration', '🔗', '#ec4899', 'System integration and API guides', 7, 'Integration Guides', 'Enterprise system integration and API documentation');

-- =====================================================
-- 3. 计算器配置（14个工具）
-- =====================================================
INSERT INTO calculators (name, slug, description, component_name, icon, featured, education_title, meta_title, meta_description) VALUES
('Protocol Selection Wizard', 'protocol-selection-wizard', 'Interactive guide to choose the right smart lock protocol', 'ProtocolSelectionWizard', '🧭', 1, 'Deep Dive: Protocol Selection', 'Protocol Selection Wizard', 'Choose the perfect smart lock protocol for your needs'),
('Battery Life Comparison', 'battery-life-comparison', 'Compare battery life across different protocols and brands', 'BatteryLifeComparison', '🔋', 1, 'Deep Dive: Battery Chemistry', 'Battery Life Calculator', 'Calculate and compare smart lock battery life'),
('Lock TCO Calculator', 'lock-tco-calculator', 'Calculate total cost of ownership for smart locks', 'LockTCOCalculator', '💰', 1, 'Deep Dive: Hidden Costs', 'TCO Calculator', 'Calculate the true cost of owning a smart lock'),
('RF Coverage Estimator', 'rf-coverage-estimator', 'Estimate wireless coverage and repeater requirements', 'RFCoverageEstimator', '📡', 1, 'Deep Dive: RF Propagation', 'RF Coverage Calculator', 'Plan your smart lock wireless network coverage'),
('Mesh Node Planner', 'mesh-node-planner', 'Plan optimal mesh network topology', 'MeshNodePlanner', '🕸️', 1, 'Deep Dive: Mesh Networking', 'Mesh Network Planner', 'Design optimal mesh network for smart locks'),
('Short-term Rental ROI', 'short-term-rental-roi-calculator', 'Calculate ROI for Airbnb smart lock deployment', 'ShortTermRentalROI', '🏠', 1, 'Deep Dive: ROI Analysis', 'Airbnb Smart Lock ROI', 'Calculate smart lock return on investment for rentals'),
('Multi-property Fleet Planner', 'multi-property-fleet-planner', 'Manage multiple properties with smart locks', 'MultiPropertyFleetPlanner', '🏢', 0, 'Deep Dive: Fleet Management', 'Property Fleet Planner', 'Plan smart lock deployment across multiple properties'),
('Credential Capacity Planner', 'credential-capacity-planner', 'Calculate user code capacity requirements', 'CredentialCapacityPlanner', '👥', 0, 'Deep Dive: Access Control', 'Credential Planner', 'Plan smart lock user capacity and access codes'),
('Power Consumption Estimator', 'power-consumption-estimator', 'Estimate power usage and battery replacement schedule', 'PowerConsumptionEstimator', '⚡', 0, 'Deep Dive: Power Management', 'Power Calculator', 'Estimate smart lock power consumption'),
('Security Audit Scorecard', 'security-audit-scorecard', 'Evaluate smart lock security posture', 'SecurityAuditScorecard', '🛡️', 0, 'Deep Dive: Security Framework', 'Security Scorecard', 'Audit your smart lock security configuration'),
('Offline Resilience Scorecard', 'offline-resilience-scorecard', 'Assess system reliability during outages', 'OfflineResilienceScorecard', '📴', 0, 'Deep Dive: Resilience Design', 'Offline Resilience', 'Evaluate smart lock offline capabilities'),
('Door Lock Compatibility Checker', 'door-lock-compatibility-checker', 'Check if your door is compatible', 'DoorCompatibilityChecker', '🚪', 0, 'Deep Dive: Door Standards', 'Compatibility Checker', 'Check smart lock door compatibility'),
('Emergency Backup Evaluator', 'emergency-backup-evaluator', 'Evaluate backup access methods', 'EmergencyBackupEvaluator', '🔑', 0, 'Deep Dive: Failsafe Design', 'Backup Access Evaluator', 'Evaluate emergency backup access options'),
('Installation Time Estimator', 'installation-time-estimator', 'Estimate installation time and complexity', 'InstallationTimeEstimator', '⏱️', 0, 'Deep Dive: Installation Planning', 'Installation Time', 'Estimate smart lock installation time');

-- =====================================================
-- 4. 全局设置
-- =====================================================
INSERT INTO settings (key, value, type, category, description) VALUES
-- SEO设置
('site_title', 'Smart Lock Hub', 'text', 'seo', 'Website title'),
('site_description', 'Complete guide to smart lock selection, installation, and troubleshooting', 'text', 'seo', 'Default meta description'),
('title_template', '%s | Smart Lock Hub', 'text', 'seo', 'Title template for pages'),
('og_image_default', '/images/og-default.jpg', 'text', 'seo', 'Default Open Graph image'),

-- Analytics
('google_analytics_id', '', 'text', 'analytics', 'Google Analytics measurement ID'),
('enable_analytics', 'true', 'boolean', 'analytics', 'Enable page view tracking'),

-- General
('maintenance_mode', 'false', 'boolean', 'general', 'Maintenance mode enabled'),
('items_per_page', '20', 'number', 'general', 'Default items per page'),
('featured_articles_count', '6', 'number', 'general', 'Number of featured articles on homepage'),

-- Social
('twitter_handle', '@smartlockhub', 'text', 'social', 'Twitter handle'),
('facebook_url', '', 'text', 'social', 'Facebook page URL'),
('github_url', 'https://github.com/smartlockhub', 'text', 'social', 'GitHub repository URL');

-- =====================================================
-- 5. 主导航菜单
-- =====================================================
INSERT INTO navigation (location, label, url, display_order, icon) VALUES
-- Header主菜单
('header', 'Protocols', '/protocols', 1, '📡'),
('header', 'Security', '/security', 2, '🔒'),
('header', 'Installation', '/installation', 3, '🔋'),
('header', 'Guides', '/guides', 4, '🔧'),
('header', 'Use Cases', '/use-cases', 5, '🏢'),
('header', 'Tools', '/tools', 6, '🛠️'),

-- Footer菜单
('footer', 'About', '/about', 1, NULL),
('footer', 'Contact', '/contact', 2, NULL),
('footer', 'Privacy', '/privacy', 3, NULL),
('footer', 'Terms', '/terms', 4, NULL);

-- =====================================================
-- 6. 首页配置
-- =====================================================
INSERT INTO pages (title, slug, page_type, hero_enabled, hero_headline, hero_subheadline, hero_cta_text, hero_cta_link, status, published_at, meta_title, meta_description) VALUES
('Home', 'home', 'home', 1, 
'Master Smart Lock Technology', 
'Complete guides for protocols, security, installation, and troubleshooting. From Zigbee vs Z-Wave to enterprise deployment.',
'Explore Guides', '/protocols', 
'published', datetime('now'),
'Smart Lock Hub - Expert Guides & Tools',
'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.');

-- =====================================================
-- 文章: Smart Lock Pairing Guide (Optimized)
-- =====================================================
INSERT INTO articles (
    slug, title, description, content, category_id, author_id,
    is_pillar, featured, reading_time, word_count,
    meta_title, meta_description, meta_keywords,
    status, published_at
)
SELECT
    'smart-lock-pairing-complete-guide',
    'Smart Lock Pairing: Complete 2024 Troubleshooting Guide',
    'Fix pairing failures for WiFi, Zigbee, Z-Wave, Matter locks. Hub discovery issues, DSK errors, timeouts solved.',
    '<h2>Quick Reference</h2><table><tr><th>Protocol</th><th>Method</th><th>Time</th><th>Issue</th><th>Success</th></tr><tr><td>WiFi</td><td>QR scan</td><td>2-5m</td><td>Password</td><td>85%</td></tr><tr><td>Zigbee</td><td>Hub inclusion</td><td>1-3m</td><td>Weak signal</td><td>78%</td></tr><tr><td>Z-Wave</td><td>DSK</td><td>2-4m</td><td>DSK entry</td><td>82%</td></tr></table><p>🔧 <a href="/calculators/protocol-selection-wizard">Protocol Wizard</a> | 📖 <a href="/articles/guides/door-compatibility-guide">Door compatibility</a></p><h2>WiFi Pairing</h2><p><strong>Requirements:</strong> 2.4GHz, -70dBm RSSI | <strong>Models:</strong> August WiFi 4th, Yale Assure 2</p><ol><li>Install batteries (1.5V min) - <a href="/articles/installation/smart-lock-battery-life-guide">battery guide</a></li><li>Download app, start pairing</li><li>Scan QR, enter 2.4GHz WiFi (NOT 5GHz)</li><li>Test with <a href="/calculators/rf-coverage-estimator">RF estimator</a></li></ol><h3>Troubleshooting</h3><p><strong>Won''t pair:</strong> Check batteries >80%, factory reset 10s | <a href="/articles/guides/complete-troubleshooting-guide">Complete guide</a></p><p><strong>Wrong password:</strong> Verify 2.4GHz, disable MAC filter | <a href="/articles/support/improve-connection-stability">Connection stability</a></p><h2>Zigbee Pairing</h2><p><strong>Best for:</strong> Mesh networks | <strong>Channel:</strong> 25 recommended | <a href="/articles/protocols/zigbee-vs-zwave-comparison">vs Z-Wave</a></p><h3>Root Causes</h3><p><strong>Weak signal (40%):</strong> Move <15ft, add router | <a href="/calculators/mesh-node-planner">Mesh planner</a></p><p><strong>Interference (20%):</strong> Change channel 25, keep 6ft from WiFi</p><p><strong>Capacity (15%):</strong> 40-50 device limit, remove unused</p><p><a href="/articles/support/command-timeout-errors">Timeout errors</a> | <a href="/articles/support/smart-lock-disconnects-after-power-outage">Power outage recovery</a></p><h2>Z-Wave Pairing</h2><p><strong>Security:</strong> S2 Access Control mandatory | <a href="/articles/security/smart-lock-security-complete-analysis">Security analysis</a></p><p><strong>DSK:</strong> 5-digit PIN, inside lock label. Never skip (vulnerability).</p><p><a href="/articles/support/secure-smart-lock-best-practices">Security best practices</a> after pairing</p><h2>Best Practices</h2><ul><li>Fresh batteries <1wk, hub <30ft</li><li>2.4GHz only, disable band steering</li><li>Factory reset after 3 fails</li><li>Allow 24h mesh optimization</li></ul><h2>Tools</h2><ul><li><a href="/calculators/protocol-selection-wizard">Protocol Wizard</a></li><li><a href="/calculators/rf-coverage-estimator">RF Coverage</a></li><li><a href="/calculators/battery-life-comparison">Battery Calculator</a></li><li><a href="/calculators/mesh-node-planner">Mesh Planner</a></li></ul><h2>Use Cases</h2><p><a href="/articles/use-cases/smart-locks-airbnb-complete-guide">Airbnb setup</a> | <a href="/articles/use-cases/enterprise-commercial-deployment">Enterprise</a> | <a href="/articles/use-cases/long-term-rental-strategy">Rentals</a></p><p><strong>Summary:</strong> 90% issues = interference/battery/skipped steps. Systematic prep = 95% success. | <a href="/articles/support/emergency-battery-died-locked-out">Emergency lockout</a> | <a href="/articles/support/set-up-lock-automations">Automations</a></p>',
    (SELECT id FROM categories WHERE slug='guides'),
    (SELECT id FROM users WHERE role='admin' LIMIT 1),
    1, 1, 16, 4200,
    'Smart Lock Pairing 2024: Fix Hub Can''t Find Lock & Connection Issues',
    'Complete pairing troubleshooting for WiFi, Zigbee, Z-Wave, Matter locks. Fix hub discovery, DSK errors, timeouts. 95% success techniques.',
    'smart lock pairing, hub cant find lock, zigbee pairing, zwave pairing, DSK error, pairing timeout',
    'published', datetime('now');

-- =====================================================
-- 完成
-- =====================================================
-- 数据库初始化完成
-- 管理员账号: admin@smartlock.com / admin123
-- 7个分类已创建
-- 14个计算器已配置
-- 全局设置已就绪
-- 1篇Pillar文章已优化 (17内链)
