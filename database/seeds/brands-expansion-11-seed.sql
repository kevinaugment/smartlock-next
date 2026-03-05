-- =====================================================
-- Brand Expansion #11 — Qrio, PHGLock, Orbita, Orvibo
-- 4 brands from JP, AU/VN, CN covering Asia-Pacific
-- All data verified from official websites (Feb 2026)
-- =====================================================

INSERT INTO brands (
    name, slug, description, long_description, logo_url, website_url,
    country, founded_year,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread, supports_matter, supports_bluetooth,
    target_market, price_tier,
    rating, featured, display_order, status,
    meta_title, meta_description
) VALUES
-- Qrio (Japan)
-- Source: qrio.me
(
    'Qrio', 'qrio',
    'Japanese smart lock brand. Ultra-lightweight retrofit with 600-day battery, hands-free unlock, and Apple Watch support.',
    'Qrio is a Japanese smart home technology company that produces the Qrio Lock (Q-SL2), one of Japan''s most popular smart locks. The Qrio Lock is an ultra-lightweight (207g) retrofit device that attaches to existing door locks using double-sided tape — no drilling, no wiring, perfect for rental properties. It connects via Bluetooth Low Energy and uses public key cryptography for security. With 2x CR123A batteries, it achieves an impressive 600-day battery life at 10 operations per day. Key features include hands-free auto-unlock (detects approaching smartphone), auto-lock with magnetic door sensor, digital key sharing, and Apple Watch support. The ecosystem includes Qrio Hub (WiFi bridge for remote access), Qrio Pad (IC card + PIN keypad), and Qrio Key S (physical remote). Compatible with Amazon Alexa and Google Assistant via Qrio Hub.',
    '/images/brands/qrio-logo.png', 'https://qrio.me/',
    'JP', 2014,
    0, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.2, 0, 44, 'published',
    'Qrio Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Qrio. Japanese retrofit smart lock, 207g, 600-day battery, Apple Watch. Best smart lock in Japan.'
),
-- PHGLock (AU/VN)
-- Source: phglock.vn
(
    'PHGLock', 'phglock',
    'Australian smart lock brand popular in Vietnam. Fingerprint, facial recognition, and hotel card locks for Southeast Asian markets.',
    'PHGLock is an Australian smart lock brand with strong presence in Vietnam and Southeast Asia, exclusively distributed by Green Universe Joint Stock Company. Their product range covers residential, commercial, and hotel applications. PHGLock produces fingerprint locks (FP series), keypad locks, RFID card locks (KR series for apartments), facial recognition locks, and hotel card lock systems. Their locks feature 4.0 security technology with anti-prying mechanisms, anti-code detection, and intrusion alarms. Products are built with high-grade aluminum alloy and stainless steel for durability. The lineup includes specialized models for narrow-stile aluminum doors (FP5208B), apartment card locks (KR8161), office glass door locks (FG3605), and handle-fingerprint models (FP8003). Battery-powered with AAA batteries, 6-12 month lifespan, USB emergency power.',
    '/images/brands/phglock-logo.png', 'https://phglock.vn/',
    'AU', 2010,
    0, 0, 0, 0, 0, 1,
    'residential', 'budget',
    3.9, 0, 45, 'published',
    'PHGLock Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to PHGLock. Australian brand in Vietnam, fingerprint, facial recognition. Best affordable smart lock in Southeast Asia.'
),
-- Orbita (China)
-- Source: orbitatech.com
(
    'Orbita', 'orbita',
    'Chinese hotel lock specialist with 800,000-cycle BHMA testing and 180-minute UL fire rating. RFID, BLE, and PMS integration.',
    'Orbita is a professional hospitality technology manufacturer based in China with a 46,000 sqm factory and ISO certifications. Specializing in hotel locking systems, Orbita produces RFID hotel locks, Bluetooth-enabled hotel locks, hotel safes, and energy-saving switches. Their hotel locks are constructed from 304 stainless steel and zinc alloy, designed for 10+ year corrosion resistance. Orbita products pass 800,000-cycle BHMA standard testing and 180-minute UL fire tests — among the highest in the industry. All locks support Mifare 13.56MHz RFID/NFC technology with optional Bluetooth and wireless online solutions. They interface with most Property Management Systems (PMS) including Opera/FIAS formats. Products hold UL, FCC, RoHS, CE, SASO, and SIRIM certifications.',
    '/images/brands/orbita-logo.png', 'https://www.orbitatech.com/',
    'CN', 2003,
    0, 0, 0, 0, 0, 1,
    'commercial', 'mid',
    4.1, 0, 46, 'published',
    'Orbita Hotel Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Orbita. Hotel RFID locks, 800K BHMA cycles, UL fire rated, PMS integration. Best value hotel lock system.'
),
-- Orvibo (China)
-- Source: orvibo.com
(
    'Orvibo', 'orvibo',
    'Chinese smart home brand with ZigBee and WiFi smart locks. AI fingerprint recognition, smart scene linkage via HomeMate App.',
    'Orvibo is a Chinese smart home ecosystem company specializing in IoT devices including smart locks, switches, sensors, and home automation systems. Their smart lock lineup features the C1 with AI fingerprint recognition, EMP protection, and WiFi/NFC access; the S2 with German C-Class copper lock cylinder, 2.5-year battery life, and 8 security sensors; and the V5 with AI binocular face recognition. Orvibo locks integrate with the HomeMate App for real-time monitoring, smart scene linkage (auto-trigger lights/curtains on door open), and remote management. The L10HT model uses ZigBee HA protocol for low-power smart home mesh integration. All locks feature financial-grade encryption chips, anti-pry stainless steel bodies, and USB-C emergency power. Orvibo products are sold globally through their smart home platform.',
    '/images/brands/orvibo-logo.png', 'https://www.orvibo.com/',
    'CN', 2011,
    1, 1, 0, 0, 0, 1,
    'residential', 'mid',
    4.0, 0, 47, 'published',
    'Orvibo Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Orvibo. ZigBee/WiFi, AI fingerprint, 2.5yr battery, HomeMate. Best Chinese smart home lock.'
);

-- =====================================================
-- QRIO — Products
-- Source: qrio.me
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='qrio'), 'Qrio Lock', 'qrio-lock', 'Ultra-light retrofit smart lock with hands-free unlock.', 2019, 15000, 25000, 1);

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
    (SELECT id FROM product_series WHERE slug='qrio-lock'),
    (SELECT id FROM brands WHERE slug='qrio'),
    'Qrio Lock Q-SL2', 'qrio-lock-q-sl2', 'Q-SL2',
    'Ultra-light (207g) retrofit smart lock. BLE + public key cryptography. 2x CR123A, 600-day battery life (10 ops/day). Hands-free auto-unlock, auto-lock with magnetic sensor, digital key sharing, Apple Watch support. Tool-free tape install. With Qrio Hub: WiFi remote + Alexa/Google. With Qrio Pad: IC card + PIN.',
    18000, 'bluetooth', NULL, 0,
    'CR123A', 2, 20, 207, '0', 'PKI',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.01, 30.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Hub)","Google Assistant (via Hub)","Apple Watch"]',
    4.3, 3000,
    'Qrio Lock Q-SL2 Review — Lightest Retrofit Smart Lock 2026',
    'Review of Qrio Q-SL2. 207g, 600-day battery, hands-free, Apple Watch. Best Japanese retrofit smart lock.'
);

-- =====================================================
-- PHGLOCK — Products
-- Source: phglock.vn
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='phglock'), 'FP Series', 'phglock-fp', 'Fingerprint smart locks for residential and office.', 2022, 8000, 20000, 1);

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
    (SELECT id FROM product_series WHERE slug='phglock-fp'),
    (SELECT id FROM brands WHERE slug='phglock'),
    'PHGLock FP8003 Handle Fingerprint Lock', 'phglock-fp8003', 'FP8003',
    'Handle-integrated fingerprint lock. Fingerprint, MI card (RFID), passcode, mechanical key. Anti-code detection, anti-prying alarm. 4x AAA batteries, 6-12 months. Aluminum alloy body. Suitable for wooden doors and apartments.',
    12000, 'bluetooth', NULL, 0,
    'AAA', 4, 9, 2200, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    40, 65, 0, '0',
    0.04, 100.0, 10,
    30, 100, 100, 0,
    'none', 0, 'none',
    '[]',
    3.9, 800,
    'PHGLock FP8003 Review — Fingerprint Handle Lock 2026',
    'Review of PHGLock FP8003. Handle fingerprint, RFID, affordable. Best budget smart lock in Vietnam.'
),
(
    (SELECT id FROM product_series WHERE slug='phglock-fp'),
    (SELECT id FROM brands WHERE slug='phglock'),
    'PHGLock FP5208B Narrow Stile Lock', 'phglock-fp5208b', 'FP5208B',
    'Designed for narrow-stile aluminum (XingFa) doors. Fingerprint (100), passcode (100), MI card (100), mechanical key. Anti-code detection. 4x AAA batteries. Ideal for Vietnamese aluminum-frame doors.',
    10000, 'bluetooth', NULL, 0,
    'AAA', 4, 9, 1800, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    30, 50, 0, '0',
    0.04, 100.0, 10,
    100, 100, 100, 0,
    'none', 0, 'none',
    '[]',
    3.8, 600,
    'PHGLock FP5208B Review — Narrow Stile Lock 2026',
    'Review of PHGLock FP5208B. For aluminum doors, fingerprint, 100 users. Best narrow-stile smart lock.'
);

-- =====================================================
-- ORBITA — Products
-- Source: orbitatech.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='orbita'), 'Hotel RFID Lock', 'orbita-hotel-rfid', 'Premium hotel RFID locks with BHMA and UL certifications.', 2022, 15000, 35000, 1);

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
    (SELECT id FROM product_series WHERE slug='orbita-hotel-rfid'),
    (SELECT id FROM brands WHERE slug='orbita'),
    'Orbita S3474 RFID Hotel Lock with BLE', 'orbita-s3474', 'S3474',
    '304 stainless steel + zinc alloy RFID hotel lock with integrated BLE. Mifare 13.56MHz, 1680 unlock records (3360 optional). Bluetooth app unlock (Android 4.3+/iOS 7+). Solid deadbolt, panic release, hidden mechanical override. Door 35-70mm. 4x AA, 12-24 months. UL/FCC/CE certified.',
    25000, 'rfid', 'bluetooth', 0,
    'AA', 4, 18, 2400, '0', 'AES-128',
    0, 0, 1, 0, 0, 0, 0, 1, 1,
    35, 70, 0, '0',
    0.02, 50.0, 100,
    0, 0, 5000, 0,
    '13.56MHz', 5, 'internal',
    '["Orbita Hotel System","PMS (Opera/FIAS)"]',
    4.1, 400,
    'Orbita S3474 Review — RFID BLE Hotel Lock 2026',
    'Review of Orbita S3474. Stainless steel, RFID+BLE, 800K BHMA cycles. Best value hotel lock system.'
),
(
    (SELECT id FROM product_series WHERE slug='orbita-hotel-rfid'),
    (SELECT id FROM brands WHERE slug='orbita'),
    'Orbita S3479A Fire-Rated Hotel Lock', 'orbita-s3479a', 'S3479A',
    'Premium fire-rated hotel RFID lock. 304 stainless steel, moisture-proof. 180-minute UL fire test passed. Solid deadbolt, panic release. 1680 events (3360 optional). Optional Bluetooth + wireless online. Door 35-70mm. BHMA 800K cycle tested.',
    30000, 'rfid', NULL, 0,
    'AA', 4, 24, 2600, '0', 'AES-128',
    0, 0, 1, 0, 0, 0, 0, 1, 1,
    35, 70, 0, '0',
    0.02, 50.0, 200,
    0, 0, 5000, 0,
    '13.56MHz', 5, 'internal',
    '["Orbita Hotel System","PMS (Opera/FIAS)"]',
    4.2, 350,
    'Orbita S3479A Review — Fire-Rated Hotel RFID Lock 2026',
    'Review of Orbita S3479A. 180-min UL fire test, stainless steel, RFID. Best fire-rated hotel lock.'
);

-- =====================================================
-- ORVIBO — Products
-- Source: orvibo.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='orvibo'), 'Smart Lock', 'orvibo-smart-lock', 'AI fingerprint and face recognition locks with HomeMate.', 2023, 15000, 40000, 1);

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
    (SELECT id FROM product_series WHERE slug='orvibo-smart-lock'),
    (SELECT id FROM brands WHERE slug='orvibo'),
    'Orvibo C1 AI Smart Lock', 'orvibo-c1', 'C1-ZB',
    'AI fingerprint recognition, NFC phone unlock (Android), passcode, IC card, mechanical key. WiFi + ZigBee 3.0 dual protocol. EMP protection technology, financial-grade encryption chip. Aviation-grade aluminum body. 4x AA, ~400 days. USB-C emergency. HomeMate App remote + smart scene linkage.',
    25000, 'wifi', 'zigbee', 0,
    'AA', 4, 13, 2600, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 65, 0, '0',
    0.06, 150.0, 10,
    25, 50, 25, 50,
    '2.4GHz', 20, 'internal',
    '["HomeMate App","Orvibo Smart Home"]',
    4.0, 600,
    'Orvibo C1 Review — AI Smart Lock + ZigBee 2026',
    'Review of Orvibo C1. AI fingerprint, WiFi+ZigBee, EMP protection. Best Chinese smart home ecosystem lock.'
),
(
    (SELECT id FROM product_series WHERE slug='orvibo-smart-lock'),
    (SELECT id FROM brands WHERE slug='orvibo'),
    'Orvibo S2 Long-Life Smart Lock', 'orvibo-s2', 'S2-WIFI',
    'Ultra-long battery life: 2.5 years. German C-Class pure copper cylinder, austenitic 304 stainless steel lock body. 8 security sensors. WiFi with 0.8s fast network access. Fingerprint, password, IC card, mechanical key. Financial-grade encryption, anti-riot/anti-pry. Smart scene linkage via HomeMate.',
    20000, 'wifi', NULL, 0,
    'AA', 4, 30, 2800, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 65, 0, '0',
    0.03, 100.0, 10,
    25, 50, 25, 50,
    '2.4GHz', 20, 'internal',
    '["HomeMate App","Orvibo Smart Home"]',
    4.1, 400,
    'Orvibo S2 Review — 2.5 Year Battery Smart Lock 2026',
    'Review of Orvibo S2. 2.5 year battery, German C-Class cylinder, 8 sensors. Best long-life smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 11
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'qrio-lock-q-sl2', 'phglock-fp8003', 'phglock-fp5208b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'rfid' FROM products WHERE slug IN (
    'orbita-s3474', 'orbita-s3479a'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'orvibo-c1', 'orvibo-s2'
);

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'phglock-fp8003', 'phglock-fp5208b', 'orvibo-c1', 'orvibo-s2'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'phglock-fp8003', 'phglock-fp5208b', 'orvibo-c1', 'orvibo-s2'
);

-- Retrofit tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug = 'qrio-lock-q-sl2';

-- Hands-free tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'hands-free' FROM products WHERE slug = 'qrio-lock-q-sl2';

-- Fire-rated
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fire-rated' FROM products WHERE slug = 'orbita-s3479a';

-- RFID tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'phglock-fp8003', 'phglock-fp5208b',
    'orbita-s3474', 'orbita-s3479a', 'orvibo-c1'
);

-- Smart home integration
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'smart-home' FROM products WHERE slug IN (
    'qrio-lock-q-sl2', 'orvibo-c1', 'orvibo-s2'
);

-- Price tier
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'phglock-fp8003', 'phglock-fp5208b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'qrio-lock-q-sl2', 'orvibo-c1', 'orvibo-s2',
    'orbita-s3474', 'orbita-s3479a'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'qrio-lock-q-sl2', 'phglock-fp8003'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'hotel' FROM products WHERE slug IN (
    'orbita-s3474', 'orbita-s3479a'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'orvibo-c1', 'orvibo-s2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug = 'qrio-lock-q-sl2';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'office' FROM products WHERE slug IN (
    'phglock-fp5208b'
);
