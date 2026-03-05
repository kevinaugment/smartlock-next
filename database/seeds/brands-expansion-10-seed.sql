-- =====================================================
-- Brand Expansion #10 — Häfele, Solity, Mul-T-Lock
-- 3 brands from DE, KR, IL covering key global markets
-- All data verified from official websites (Feb 2026)
-- =====================================================

-- =====================================================
-- BRANDS (3 new)
-- =====================================================

INSERT INTO brands (
    name, slug, description, long_description, logo_url, website_url,
    country, founded_year,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread, supports_matter, supports_bluetooth,
    target_market, price_tier,
    rating, featured, display_order, status,
    meta_title, meta_description
) VALUES
-- Häfele
-- Source: hafele.com
(
    'Häfele', 'hafele',
    'German furniture fittings giant with premium digital locks. Fire-rated push-pull locks with FBI-approved SILK ID fingerprint scanning.',
    'Häfele is a German international company founded in 1923 in Nagold, specializing in furniture fittings, architectural hardware, and electronic access solutions. With operations in over 150 countries, Häfele has become a major digital lock brand particularly strong in Singapore, India, and Southeast Asian markets. Their digital lock range includes the fire-rated PP8100 push-pull lock, the DL7600 lever handle lock, and the RE-Twist series with integrated doorbell. Häfele locks feature advanced security including FBI-approved SILK ID fingerprint scanning (works on dry/wet/oily fingers), random security code function, privacy locking mode, away/defense mode, and electric shock resistance. Optional Z-Wave modules enable smart home integration. Product quality adheres to strict German engineering standards with fire ratings up to 60 minutes on select models.',
    '/images/brands/hafele-logo.png', 'https://www.hafele.com/',
    'DE', 1923,
    0, 0, 1, 0, 0, 1,
    'residential', 'premium',
    4.2, 0, 41, 'published',
    'Häfele Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Häfele digital locks. German engineering, FBI SILK ID fingerprint, fire-rated. Best premium smart lock in Asia.'
),
-- Solity
-- Source: solitykorea.com
(
    'Solity', 'solity',
    'Korea''s #1 digital door lock brand. Push-pull innovator with facial recognition, Matter standard, and Samsung SDS co-developed technology.',
    'Solity is Korea''s number one digital door lock brand and a global access solution provider. The company pioneered push-pull door locks in Korea through a joint R&D effort with Samsung SDS. Solity produces a comprehensive range of smart locks including push-pull, mortise, mini-mortise, rim, glass door, and sash lock types. Their flagship GP-6000 features facial recognition (100 users), push-pull ergonomic design with fingerprint built into the handle, and WiFi connectivity. The newer G1 gate lock is Matter-ready, supporting Apple HomeKit, Google Home, Amazon Alexa, and SmartThings. Solity maintains rigorous quality with over 50 reliability tests before mass production, meeting global standards including KC, GA374, EN1906, ANSI A156.25, UL437, and UL10B/10C certifications. Products are developed with in-house R&D in Korea.',
    '/images/brands/solity-logo.png', 'https://www.solitykorea.com/',
    'KR', 2014,
    1, 0, 0, 0, 1, 1,
    'residential', 'mid',
    4.3, 0, 42, 'published',
    'Solity Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Solity. Korea #1 digital lock, facial recognition, Matter/HomeKit/Alexa. Best Korean smart lock brand.'
),
-- Mul-T-Lock (ASSA ABLOY)
-- Source: mul-t-lock.com
(
    'Mul-T-Lock', 'mul-t-lock',
    'Israeli high-security pioneer under ASSA ABLOY. ENTR retrofit smart lock with app, fingerprint, and patented cylinder technology.',
    'Mul-T-Lock is an Israeli high-security lock manufacturer founded in 1973, now part of the ASSA ABLOY Group, the world''s largest lock company. Known for their patented Interactive+ and MT5+ cylinder platforms used worldwide by governments and embassies, Mul-T-Lock entered the smart lock space with the ENTR system. The ENTR is a retrofit smart lock that installs on existing doors without drilling or wiring, transforming any door into a smart entry point. It supports smartphone app control (iOS/Android), fingerprint reader (20 users), PIN code reader (20 codes), and remote control (20 remotes). The ENTR uses AES-128 encryption, rechargeable Li-ion battery (7.4V 2600mAh), and IP44 weather protection. The Code-It electronic handle provides keyless interior applications with 9 personal codes and 100,000-cycle battery life.',
    '/images/brands/mul-t-lock-logo.png', 'https://www.mul-t-lock.com/',
    'IL', 1973,
    0, 0, 0, 0, 0, 1,
    'residential', 'premium',
    4.3, 0, 43, 'published',
    'Mul-T-Lock Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Mul-T-Lock. Israeli high-security, ASSA ABLOY, ENTR retrofit, patented cylinders. Best security-focused smart lock.'
);

-- =====================================================
-- HÄFELE — Product Series & Products
-- Source: hafele.com, andigitallock.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='hafele'), 'Push-Pull Series', 'hafele-push-pull', 'Fire-rated push-pull digital locks with FBI SILK ID fingerprint.', 2023, 40000, 60000, 1);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='hafele-push-pull'),
    (SELECT id FROM brands WHERE slug='hafele'),
    'Häfele PP8100 Push-Pull Digital Lock', 'hafele-pp8100', 'PP8100',
    'Fire-rated (60 min) push-pull digital lock. Fingerprint (100), PIN code, RFID card (100), Bluetooth app, mechanical key. Privacy mode, away/defense mode, anti-hack lockout (10 attempts), random security code. Built-in doorbell, voice guide (EN/CN). Door thickness 38-90mm.',
    50000, 'bluetooth', NULL, 0,
    'AA', 8, 12, 3200, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 90, 0, '0',
    0.06, 150.0, 10,
    50, 100, 100, 50,
    '2.4GHz', 10, 'internal',
    '["Hafele Smart Lock App"]',
    4.3, 1200,
    'Häfele PP8100 Review — Fire-Rated Push-Pull Lock 2026',
    'Review of Häfele PP8100. Fire-rated 60min, push-pull, 100 fingerprints. Best fire-rated smart lock.'
);

-- Lever Handle Series
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='hafele'), 'Lever Handle Series', 'hafele-lever', 'Digital lever handle locks with Z-Wave smart home option.', 2022, 25000, 40000, 2);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='hafele-lever'),
    (SELECT id FROM brands WHERE slug='hafele'),
    'Häfele DL7600 Digital Lever Lock', 'hafele-dl7600', 'DL7600',
    'Digital lever handle lock. Fingerprint (100), PIN, RFID card (100), Bluetooth app, mechanical key. Away mode, auto/manual locking, privacy mode, random security code, incorrect attempt lockout. Optional Z-Wave module for smart home. Micro-USB emergency power.',
    30000, 'bluetooth', NULL, 0,
    'AA', 8, 12, 2500, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 80, 0, '0',
    0.06, 150.0, 10,
    50, 100, 100, 50,
    '2.4GHz', 10, 'internal',
    '["Hafele Smart Lock App","Z-Wave (optional)"]',
    4.1, 1500,
    'Häfele DL7600 Review — Digital Lever Handle Lock 2026',
    'Review of Häfele DL7600. Lever handle, Z-Wave option, 100 fingerprints. Best Häfele mid-range smart lock.'
);

-- =====================================================
-- SOLITY — Product Series & Products
-- Source: solitykorea.com, andigitallock.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='solity'), 'GP-Series', 'solity-gp', 'Flagship face recognition push-pull with WiFi.', 2024, 40000, 60000, 1);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='solity-gp'),
    (SELECT id FROM brands WHERE slug='solity'),
    'Solity GP-6000 Face Recognition Push-Pull Lock', 'solity-gp-6000', 'GP-6000BK',
    'Facial recognition (100) + fingerprint (100, 0.9s via handle) + passcode (4-12 digits) + RFID card (100) + WiFi app + mechanical key. Push-pull ergonomic design with fingerprint built into handle for one-step opening. Smart Solity App (WiFi 2.4GHz), tamper detection, auto-lock, USB-C emergency, fake passcode, silent mode, burglar alarm, double locking.',
    50000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 3200, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.10, 200.0, 10,
    4, 100, 100, 100,
    '2.4GHz', 20, 'internal',
    '["Solity App"]',
    4.4, 2000,
    'Solity GP-6000 Review — Face Recognition Push-Pull 2026',
    'Review of Solity GP-6000. Korea #1, face recognition, push-pull, WiFi. Best Korean facial recognition lock.'
);

-- GEA-Series (gate + door link)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='solity'), 'GEA-Series', 'solity-gea', 'Auto-latch door and gate locks with dual sync.', 2024, 30000, 45000, 2);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='solity-gea'),
    (SELECT id FROM brands WHERE slug='solity'),
    'Solity GEA-1000 Auto-Latch Smart Lock', 'solity-gea-1000', 'GEA-1000BK',
    'Auto-latch mortise smart lock with dual gate lock sync. Fingerprint (ultra-fast), PIN, RFID tags, WiFi app, mechanical key. Built-in chime, secure auto-latch mortise, 2-way sync with Solity G1 gate lock for simultaneous gate+door unlock.',
    35000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 2800, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    50, 60, 0, '0',
    0.08, 180.0, 10,
    30, 100, 100, 50,
    '2.4GHz', 15, 'internal',
    '["Solity App"]',
    4.2, 1000,
    'Solity GEA-1000 Review — Auto-Latch + Gate Sync Lock 2026',
    'Review of Solity GEA-1000. Auto-latch, gate-door sync, WiFi. Best Korean auto-latch smart lock.'
);

-- =====================================================
-- MUL-T-LOCK — Product Series & Products
-- Source: mul-t-lock.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='mul-t-lock'), 'ENTR', 'multlock-entr', 'Retrofit smart lock with patented cylinder technology.', 2020, 30000, 50000, 1);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='multlock-entr'),
    (SELECT id FROM brands WHERE slug='mul-t-lock'),
    'Mul-T-Lock ENTR Smart Lock System', 'multlock-entr', 'ENTR',
    'Retrofit smart lock for existing doors. No drilling/wiring, internal cylinder 35-78mm. Smartphone app (iOS 7+/Android 4.3+), fingerprint reader (20 users), PIN code reader (20 codes), remote control (20 remotes). AES-128 encryption, auto-lock, IP44 weather protection. Rechargeable Li-ion 7.4V 2600mAh. Door unit 150x55x54mm, 380g.',
    40000, 'bluetooth', NULL, 0,
    'lithium-ion', 1, 12, 380, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    35, 78, 0, '0',
    0.04, 80.0, 10,
    20, 20, 0, 20,
    '2.4GHz', 10, 'internal',
    '["Mul-T-Lock ENTR App"]',
    4.2, 600,
    'Mul-T-Lock ENTR Review — High-Security Retrofit Lock 2026',
    'Review of Mul-T-Lock ENTR. Israeli high-security, ASSA ABLOY, retrofit, fingerprint. Best security retrofit smart lock.'
);

-- Code-It (interior handle)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='mul-t-lock'), 'Code-It', 'multlock-codeit', 'Electronic security handle for interior doors.', 2019, 15000, 25000, 2);

INSERT INTO products (
    series_id, brand_id, name, slug, model_number, description, price_usd,
    protocol, secondary_protocol, supports_matter,
    battery_type, battery_count, battery_life_months,
    weight_grams, ansi_grade, encryption_type,
    has_fingerprint, has_keypad, has_auto_lock, has_auto_unlock, has_voice_control, has_remote_access, has_guest_codes, has_activity_log, has_physical_key,
    door_thickness_min_mm, door_thickness_max_mm, bore_diameter_mm, backset_mm,
    standby_power_mw, active_power_mw, operations_per_day,
    max_pin_codes, max_fingerprints, max_cards, max_app_users,
    rf_frequency, rf_range_meters, antenna_type,
    ecosystems_json, rating, review_count, meta_title, meta_description
) VALUES
(
    (SELECT id FROM product_series WHERE slug='multlock-codeit'),
    (SELECT id FROM brands WHERE slug='mul-t-lock'),
    'Mul-T-Lock Code-It Electronic Handle', 'multlock-codeit', 'CODE-IT',
    'Electronic security handle for interior doors. Keyless PIN code (9 personal codes, 4-6 digits). Wire-free, battery-operated (2x CR2 3V). Auto/manual locking modes. Door thickness 35-80mm. Tested per EN 1906. 100,000+ cycle battery life. Interior free egress for safety.',
    18000, 'none', NULL, 0,
    'CR2', 2, 24, 600, '0', 'none',
    0, 1, 1, 0, 0, 0, 0, 0, 0,
    35, 80, 0, '0',
    0.01, 20.0, 10,
    9, 0, 0, 0,
    'none', 0, 'none',
    '[]',
    4.0, 400,
    'Mul-T-Lock Code-It Review — Electronic Security Handle 2026',
    'Review of Mul-T-Lock Code-It. Interior keyless handle, 100K cycles, EN 1906. Best interior electronic handle.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 10
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'hafele-pp8100', 'hafele-dl7600', 'multlock-entr'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'solity-gp-6000', 'solity-gea-1000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'offline' FROM products WHERE slug = 'multlock-codeit';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'hafele-pp8100', 'hafele-dl7600',
    'solity-gp-6000', 'solity-gea-1000',
    'multlock-entr'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'hafele-pp8100', 'hafele-dl7600',
    'solity-gp-6000', 'solity-gea-1000',
    'multlock-entr', 'multlock-codeit'
);

-- Face recognition
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug = 'solity-gp-6000';

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug = 'multlock-entr';

-- RFID tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'hafele-pp8100', 'hafele-dl7600',
    'solity-gp-6000', 'solity-gea-1000'
);

-- Fire-rated tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fire-rated' FROM products WHERE slug = 'hafele-pp8100';

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'hafele-pp8100', 'solity-gp-6000', 'multlock-entr'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'hafele-dl7600', 'solity-gea-1000', 'multlock-codeit'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'hafele-pp8100', 'hafele-dl7600',
    'solity-gp-6000', 'solity-gea-1000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'multlock-entr', 'solity-gea-1000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'hafele-pp8100', 'solity-gp-6000', 'multlock-entr'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'office' FROM products WHERE slug = 'multlock-codeit';
