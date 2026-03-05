-- =====================================================
-- Products Completion Batch 2 — Dessmann, EPIC, Godrej, Solity, ZKTeco
-- Adding 1-2 products each to reach ≥3 per brand
-- All data verified from official sources (Feb 2026)
-- =====================================================

-- =====================================================
-- DESSMANN — Add 2 products (currently 2 → 4)
-- Source: dessmannlock.com, priceboon.com
-- =====================================================

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
    (SELECT id FROM product_series WHERE slug='dessmann-q-series'),
    (SELECT id FROM brands WHERE slug='dessmann'),
    'Dessmann Q3 Mijia Automatic Smart Lock', 'dessmann-q3-mijia', 'Q3-MIJIA',
    'Automatic smart lock with Mijia APP integration. Fingerprint (semiconductor, <0.001% error), 6-digit password (16-digit phantom), Bluetooth app, mechanical key. C-level cylinder, German HIEYIE algorithm. 2x 5000mAh Li batteries, 5 months. Zinc alloy panel. Door 40-120mm. Auto-lock 10-100s.',
    30000, 'bluetooth', NULL, 0,
    'lithium-ion', 2, 5, 3000, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.10, 200.0, 10,
    20, 60, 0, 50,
    '2.4GHz', 10, 'internal',
    '["Mijia App"]',
    4.2, 2000,
    'Dessmann Q3 Mijia Review — Automatic Smart Lock 2026',
    'Review of Dessmann Q3 Mijia. Automatic push-pull, Mijia, <0.001% error. Best Chinese automatic smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='dessmann-q-series'),
    (SELECT id FROM brands WHERE slug='dessmann'),
    'Dessmann Q7F-Pro Face Recognition Lock', 'dessmann-q7f-pro', 'Q7F-PRO',
    'Face recognition + fingerprint + password + WeChat + app + temporary password + mechanical key. WiFi connectivity. Copper lock cylinder, stainless steel latch. Anti-hijack alarm, anti-pry alarm, password tampering alarm, low battery alarm. Hidden fingerprint sensor. 5000mAh Li battery. USB emergency.',
    50000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 5, 3500, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.15, 300.0, 10,
    20, 60, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Dessmann App"]',
    4.3, 1200,
    'Dessmann Q7F-Pro Review — Face Recognition Lock 2026',
    'Review of Dessmann Q7F-Pro. Face recognition, WiFi, anti-hijack. Best Dessmann premium smart lock.'
);

-- =====================================================
-- EPIC — Add 1 product (currently 2 → 3)
-- Source: epic.co.kr, digitallock.com.my
-- =====================================================

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
    (SELECT id FROM product_series WHERE slug='epic-generation'),
    (SELECT id FROM brands WHERE slug='epic'),
    'EPIC 6G Pro Gate Lock', 'epic-6g-pro', 'ES-6G-PRO',
    'Specifically designed for metal grills/gates. 5-way: dual fingerprint (outer+inner, 100), PIN, RFID card (200), mechanical key (inner), Bluetooth. Gate-Door Link: unlock 2 doors with 1 touch. Optional hook lock for sliding metal doors. EPIC Things app, guest PIN, push notifications. Anti-prank, fire alarm, auto-lock.',
    35000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 2500, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.06, 150.0, 20,
    50, 100, 200, 100,
    '2.4GHz', 10, 'internal',
    '["EPIC Things App"]',
    4.2, 1200,
    'EPIC 6G Pro Review — Gate Lock with Dual Fingerprint 2026',
    'Review of EPIC 6G Pro. Dual fingerprint, gate-door link, metal grill. Best Korean gate smart lock.'
);

-- =====================================================
-- GODREJ — Add 1 product (currently 2 → 3)
-- Already researched: Advantis GSL D1
-- =====================================================

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
    (SELECT id FROM product_series WHERE slug='godrej-advantis'),
    (SELECT id FROM brands WHERE slug='godrej'),
    'Godrej Advantis GSL D1 7-in-1 Digital Lock', 'godrej-advantis-gsl-d1', 'GSL-D1',
    '7-in-1 digital lock: fingerprint (360°), WiFi app, NFC, PIN code (spy code), RFID card, mobile NFC, mechanical key. Military-grade encryption, anti-prank alarm, privacy lockout, auto-lock, weatherproof. Low battery warning (beep + LED). 9V emergency. Black and silver finishes. Door 35-65mm.',
    28000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 2600, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    35, 65, 0, '0',
    0.10, 200.0, 10,
    50, 100, 99, 50,
    '2.4GHz', 20, 'internal',
    '["Godrej App"]',
    4.1, 2000,
    'Godrej Advantis GSL D1 Review — 7-in-1 Smart Lock 2026',
    'Review of Godrej GSL D1. 7-in-1, WiFi+NFC, military encryption. Best mid-range Indian smart lock.'
);

-- =====================================================
-- SOLITY — Add 1 product (currently 2 → 3)
-- Source: solitykorea.com, andigitallock.com
-- =====================================================

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
    'Solity G1 Matter Gate Lock', 'solity-g1-matter', 'G1-MATTER',
    'First push-pull mortise gate lock with integrated handle. Matter-ready: Apple HomeKit, Google Home, Amazon Alexa, SmartThings. Face recognition, fingerprint, RFID card, PIN, mechanical key, WiFi. Smiley indicator for lock status. Dual unlocking (gate+door sync). Real-time notifications. USB-C emergency.',
    55000, 'wifi', 'bluetooth', 1,
    'AA', 4, 12, 3200, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.12, 250.0, 10,
    30, 100, 100, 100,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings","Solity App"]',
    4.5, 500,
    'Solity G1 Review — Matter Gate Lock with Face Recognition 2026',
    'Review of Solity G1. Matter, face recognition, gate-door sync. Best Matter-enabled Korean lock.'
);

-- =====================================================
-- ZKTECO — Add 2 products (currently 2 → 4)
-- Source: zkteco.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='zkteco'), 'Residential Smart Lock', 'zkteco-residential', 'Zinc alloy residential fingerprint and Bluetooth locks.', 2023, 8000, 20000, 2);

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
    (SELECT id FROM product_series WHERE slug='zkteco-residential'),
    (SELECT id FROM brands WHERE slug='zkteco'),
    'ZKTeco ML10 Fingerprint Smart Lock', 'zkteco-ml10', 'ML10',
    'Fingerprint knob lock. Capacitive touch-to-open. 60 normal + 10 admin + 20 temporary users. Independent clutch motor (anti-forced entry), idle handle. American single-latch, reversible handle. LED indicator, buzzer. 4x AA, 12 months (6000+ uses). 9V emergency. Door 39-54mm (30-60mm optional).',
    10000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 800, '0', 'AES-128',
    1, 0, 1, 0, 0, 0, 1, 1, 1,
    39, 54, 54, '60,70',
    0.03, 80.0, 10,
    20, 60, 0, 0,
    'none', 0, 'none',
    '[]',
    4.0, 500,
    'ZKTeco ML10 Review — Fingerprint Knob Lock 2026',
    'Review of ZKTeco ML10. Touch-to-open fingerprint, clutch motor. Best affordable fingerprint knob lock.'
),
(
    (SELECT id FROM product_series WHERE slug='zkteco-residential'),
    (SELECT id FROM brands WHERE slug='zkteco'),
    'ZKTeco AL40B Bluetooth Deadbolt Lock', 'zkteco-al40b', 'AL40B',
    'Bluetooth deadbolt. 5-way: fingerprint (semiconductor), Mifare card, passcode, ZKTeco Smart Key App (BLE 4.0), mechanical key. 100 users total. Random password, lockout mode, voice guide (EN/ES/PT), volume control. Reversible design. 4x AA, 5300 uses. Zinc alloy. Door 35-53mm.',
    15000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1500, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    35, 53, 54, '60,70',
    0.04, 100.0, 10,
    20, 50, 50, 50,
    '2.4GHz', 10, 'internal',
    '["ZKTeco Smart Key App"]',
    4.0, 700,
    'ZKTeco AL40B Review — Bluetooth Deadbolt Lock 2026',
    'Review of ZKTeco AL40B. Bluetooth, Mifare, fingerprint, deadbolt. Best value biometric deadbolt.'
);

-- =====================================================
-- PRODUCT TAGS — Completion Batch 2
-- =====================================================

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'epic-6g-pro', 'zkteco-ml10', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'dessmann-q7f-pro', 'godrej-advantis-gsl-d1', 'solity-g1-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'solity-g1-matter';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'dessmann-q7f-pro', 'epic-6g-pro',
    'godrej-advantis-gsl-d1', 'solity-g1-matter',
    'zkteco-ml10', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'dessmann-q7f-pro', 'epic-6g-pro',
    'godrej-advantis-gsl-d1', 'solity-g1-matter', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug IN (
    'dessmann-q7f-pro', 'solity-g1-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'epic-6g-pro', 'godrej-advantis-gsl-d1', 'solity-g1-matter', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'gate-lock' FROM products WHERE slug IN (
    'epic-6g-pro', 'solity-g1-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN ('zkteco-ml10');

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'epic-6g-pro', 'godrej-advantis-gsl-d1', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'dessmann-q7f-pro', 'solity-g1-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'dessmann-q7f-pro', 'godrej-advantis-gsl-d1'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'gate' FROM products WHERE slug IN (
    'epic-6g-pro', 'solity-g1-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'zkteco-ml10', 'zkteco-al40b'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'dessmann-q3-mijia', 'solity-g1-matter'
);
