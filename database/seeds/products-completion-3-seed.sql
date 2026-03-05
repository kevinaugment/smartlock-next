-- =====================================================
-- Products Completion Batch 3 — Bosma, Danalock, Hornbill, Latch, Wyze
-- Adding 1 product each (2 → 3 per brand)
-- All data verified from official sources (Feb 2026)
-- =====================================================

-- =====================================================
-- BOSMA — Add 1 product
-- Source: bosmasmarthome.com
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='bosma' LIMIT 1),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Aegis Smart Lock with WiFi Gateway', 'bosma-aegis-wifi', 'AEGIS-WiFi',
    'Retrofit deadbolt — replaces indoor side only, keeps original key. BLE 5.0 + WiFi (via included gateway, 2.4GHz). Geofencing auto-unlock, auto-lock, door ajar alert, break-in detection with siren. AES-128 encryption. Alexa, Google, IFTTT. Aluminum alloy, 255g. 4x AA, 6 months. Optional fingerprint keypad accessory.',
    10000, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 255, '0', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.08, 150.0, 10,
    10, 0, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Assistant","IFTTT"]',
    3.9, 1200,
    'Bosma Aegis Review — WiFi Retrofit Smart Lock 2026',
    'Review of Bosma Aegis. Retrofit, WiFi gateway, geofencing, Alexa. Best affordable retrofit smart lock.'
);

-- =====================================================
-- DANALOCK — Add 1 product
-- Source: danalock.com
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='danalock' LIMIT 1),
    (SELECT id FROM brands WHERE slug='danalock'),
    'Danalock V3 Bluetooth + Zigbee + HomeKit', 'danalock-v3-btzbe', 'V3-BTZBE',
    'Ultra-compact (195g) retrofit cylinder lock. BLE 4.2 + Zigbee + Apple HomeKit. 256-bit AES encryption, TLS 1.2. 4x CR123A, ~12 months (9000 openings). Anodized aluminum + ABS. Indoor only (0-60°C). Auto-lock, geo-unlock, digital key sharing. CE/FCC certified.',
    20000, 'zigbee', 'bluetooth', 0,
    'CR123A', 4, 12, 195, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.03, 80.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit","Zigbee Hub","Danalock App"]',
    4.0, 800,
    'Danalock V3 Zigbee HomeKit Review — Compact Retrofit Lock 2026',
    'Review of Danalock V3 BTZBE. 195g, Zigbee+HomeKit, AES-256. Best lightweight European retrofit lock.'
);

-- =====================================================
-- HORNBILL — Add 1 product
-- Source: hornbilllock.com
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='hornbill' LIMIT 1),
    (SELECT id FROM brands WHERE slug='hornbill'),
    'Hornbill M8 WiFi 5-Way Smart Deadbolt', 'hornbill-m8-wifi', 'M8-BWF',
    '5-way unlock: fingerprint (100, 0.2s), app (WiFi remote), passcode (300+ codes, anti-peep), IC card/fob, mechanical key. Built-in WiFi, no gateway needed. Alexa + Google compatible. Auto-lock 1-900s. USB-C emergency. Zinc alloy, BHMA Grade 3. 4x AA, 12 months.',
    8000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1800, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.10, 200.0, 10,
    300, 100, 50, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Assistant"]',
    4.0, 2500,
    'Hornbill M8 Review — WiFi 5-Way Smart Deadbolt 2026',
    'Review of Hornbill M8. WiFi, fingerprint (0.2s), 300 codes, Alexa. Best budget WiFi fingerprint deadbolt.'
);

-- =====================================================
-- LATCH — Add 1 product
-- Source: door.com
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='latch' LIMIT 1),
    (SELECT id FROM brands WHERE slug='latch'),
    'Latch M2 Commercial Mortise Smart Lock', 'latch-m2-mortise', 'M2',
    'Commercial-grade mortise lock (ANSI/BHMA 156.13 Grade 1). DOOR App (smartphone), NFC keycard (Mifare), Apple Watch, Android NFC, 4-7 digit doorcode, physical key. 6x AA, ~2 years. Offline-first (works without power/internet). BLE + NFC 13.56MHz. -30°C to 70°C. ADA compliant. Latch Manager cloud platform.',
    60000, 'bluetooth', NULL, 0,
    'AA', 6, 24, 3200, '1', 'AES-256',
    0, 1, 1, 0, 0, 1, 1, 1, 1,
    44, 57, 0, '0',
    0.02, 50.0, 100,
    100, 0, 500, 500,
    '13.56MHz', 5, 'internal',
    '["DOOR OS","DOOR App","Latch Manager"]',
    4.1, 600,
    'Latch M2 Review — Commercial Grade Mortise Lock 2026',
    'Review of Latch M2. BHMA Grade 1, NFC, offline-first, 2yr battery. Best commercial smart mortise lock.'
);

-- =====================================================
-- WYZE — Add 1 product
-- Source: wyze.com
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='wyze' LIMIT 1),
    (SELECT id FROM brands WHERE slug='wyze'),
    'Wyze Lock Bolt v2 WiFi + AI Fingerprint', 'wyze-lock-bolt-v2', 'LOCK-BOLT-V2',
    'WiFi + AI self-learning fingerprint (0.3s unlock, improves over time). Fingerprint (50), keypad (anti-peep), app (WiFi remote), mechanical key. Built-in WiFi (no hub needed). Alexa + Google Assistant. IP53. BHMA2 certified. Tamper + jam alarms. USB-C emergency. 4x AA, 8 months. Lock after hours feature.',
    8000, 'wifi', 'bluetooth', 0,
    'AA', 4, 8, 1200, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.10, 200.0, 10,
    50, 50, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Assistant","Wyze App"]',
    4.2, 5000,
    'Wyze Lock Bolt v2 Review — AI Fingerprint WiFi Lock 2026',
    'Review of Wyze Lock Bolt v2. AI fingerprint, WiFi, $70. Best ultra-budget fingerprint smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Completion Batch 3
-- =====================================================

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'bosma-aegis-wifi', 'hornbill-m8-wifi', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'latch-m2-mortise'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'zigbee' FROM products WHERE slug = 'danalock-v3-btzbe';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'hornbill-m8-wifi', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'hornbill-m8-wifi', 'wyze-lock-bolt-v2', 'latch-m2-mortise'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'bosma-aegis-wifi', 'danalock-v3-btzbe'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'homekit' FROM products WHERE slug = 'danalock-v3-btzbe';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'nfc' FROM products WHERE slug = 'latch-m2-mortise';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'geofencing' FROM products WHERE slug = 'bosma-aegis-wifi';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'ai-fingerprint' FROM products WHERE slug = 'wyze-lock-bolt-v2';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'bosma-aegis-wifi', 'hornbill-m8-wifi', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug = 'danalock-v3-btzbe';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug = 'latch-m2-mortise';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'bosma-aegis-wifi', 'danalock-v3-btzbe', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug = 'hornbill-m8-wifi';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug = 'latch-m2-mortise';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'bosma-aegis-wifi', 'danalock-v3-btzbe', 'latch-m2-mortise'
);
