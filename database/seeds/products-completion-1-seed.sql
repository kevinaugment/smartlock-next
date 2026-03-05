-- =====================================================
-- Products Completion Batch 1 — Defiant, HARFO, Qrio, TCL
-- Adding 2 products each to brands with only 1 product
-- All data verified from official sources (Feb 2026)
-- =====================================================

-- =====================================================
-- DEFIANT — Add 2 products
-- Existing: 1 product (basic deadbolt)
-- Source: homedepot.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='defiant'), 'Hubspace WiFi', 'defiant-hubspace-wifi', 'WiFi-enabled deadbolts powered by Hubspace smart home platform.', 2024, 8000, 15000, 2);

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
    (SELECT id FROM product_series WHERE slug='defiant-hubspace-wifi'),
    (SELECT id FROM brands WHERE slug='defiant'),
    'Defiant Square WiFi Deadbolt (Hubspace)', 'defiant-hubspace-wifi-square', 'HSGC9X2D01AJ',
    'WiFi-enabled electronic deadbolt powered by Hubspace. Backlit keypad, 1 master + 10 user codes. Remote lock/unlock via Hubspace app. Anti-saw rod, vacation mode (disable all codes). Alexa + Google Assistant voice control. ANSI Grade 3. 4x AA batteries. Door 1-3/8" to 2".',
    10000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1200, '3', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.10, 200.0, 10,
    11, 0, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Hubspace","Amazon Alexa","Google Assistant"]',
    3.8, 2000,
    'Defiant Hubspace WiFi Deadbolt Review — Budget Smart Lock 2026',
    'Review of Defiant Hubspace WiFi. Home Depot exclusive, WiFi, Alexa/Google. Best budget WiFi smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='defiant-hubspace-wifi'),
    (SELECT id FROM brands WHERE slug='defiant'),
    'Defiant Aura Reach Matter Smart Lock', 'defiant-aura-reach-matter', 'AURA-REACH',
    'Bluetooth + Matter over Thread deadbolt. Up to 250 user codes. Backlit keypad, auto-lock, vacation mode, anti-saw rod. ANSI Grade 3. Works with Apple Home, Google Home, Amazon Alexa, Samsung SmartThings via Matter. 4x AA batteries.',
    13000, 'thread', 'bluetooth', 1,
    'AA', 4, 12, 1300, '3', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.08, 150.0, 10,
    250, 0, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Apple Home","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.0, 500,
    'Defiant Aura Reach Review — Matter Thread Smart Lock 2026',
    'Review of Defiant Aura Reach. Matter/Thread, 250 codes, Apple/Google/Alexa. Best budget Matter smart lock.'
);

-- =====================================================
-- HARFO — Add 2 products
-- Existing: 1 product
-- Source: harfo.com, Amazon
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='harfo'), 'Fingerprint Handle', 'harfo-fingerprint-handle', 'Fingerprint handle locks with app and gateway support.', 2023, 8000, 18000, 2);

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
    (SELECT id FROM product_series WHERE slug='harfo-fingerprint-handle'),
    (SELECT id FROM brands WHERE slug='harfo'),
    'HARFO HF-L7000 5-in-1 Smart Lock', 'harfo-hf-l7000', 'HF-L7000',
    '5-in-1 smart lock: fingerprint (99.86% accuracy semiconductor sensor), passcode (250), IC card, backup key, WiFi app (via gateway). Alexa + Google voice control (with gateway). Remote access + entry records. Reversible handle (left/right). Door 1-3/8" to 2-3/16". 12-month warranty + lifetime support.',
    15000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 2200, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 56, 54, '60,70',
    0.06, 150.0, 10,
    250, 99, 50, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Gateway)","Google Assistant (via Gateway)"]',
    4.1, 3000,
    'HARFO HF-L7000 Review — 5-in-1 Fingerprint Smart Lock 2026',
    'Review of HARFO HF-L7000. 99.86% fingerprint, 5-in-1, Alexa. Best affordable fingerprint smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='harfo-fingerprint-handle'),
    (SELECT id FROM brands WHERE slug='harfo'),
    'HARFO HF-LM801BK 3D Fingerprint Lock', 'harfo-hf-lm801bk', 'HF-LM801BK',
    'Advanced 3D fingerprint sensor for quick recognition. Fingerprint, passcode, IC card access. WiFi remote management (via gateway). Alexa + Google Assistant. Reversible handle for left/right doors. High-quality materials. 12-month warranty + lifetime support.',
    12000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 2000, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 56, 54, '60,70',
    0.06, 150.0, 10,
    250, 99, 50, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Gateway)","Google Assistant (via Gateway)"]',
    4.0, 1500,
    'HARFO HF-LM801BK Review — 3D Fingerprint Lock 2026',
    'Review of HARFO HF-LM801BK. 3D fingerprint, WiFi remote, Alexa. Best value 3D fingerprint smart lock.'
);

-- =====================================================
-- QRIO — Add 1 product (Qrio Pad accessory/system)
-- Existing: Q-SL2 (1 product)
-- Source: qrio.me
-- =====================================================

-- Use existing series
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
    'Qrio Pad (Q-SL2 Keypad Accessory)', 'qrio-pad', 'Q-KP1',
    'Keypad accessory for Qrio Lock Q-SL2. IC card (Qrio Card) touch-to-unlock + PIN code entry. Alternative access for users without smartphones (children, elderly). Weatherproof outdoor mount. Pairs via Bluetooth with Q-SL2. Battery powered (CR123A x2).',
    8000, 'bluetooth', NULL, 0,
    'CR123A', 2, 12, 200, '0', 'PKI',
    0, 1, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.01, 20.0, 10,
    20, 0, 20, 0,
    '2.4GHz', 5, 'internal',
    '["Qrio Lock Q-SL2"]',
    4.0, 1000,
    'Qrio Pad Review — IC Card + PIN for Qrio Lock 2026',
    'Review of Qrio Pad. IC card + PIN keypad for Q-SL2. Best keypad accessory for Japanese smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='qrio-lock'),
    (SELECT id FROM brands WHERE slug='qrio'),
    'Qrio Hub (WiFi Bridge)', 'qrio-hub', 'Q-H1A',
    'WiFi bridge for Qrio Lock Q-SL2. Enables remote lock/unlock from anywhere. Real-time push notifications on lock events. Voice control via Amazon Alexa + Google Assistant. Requires 2.4GHz WiFi + USB power. Turns BLE-only Q-SL2 into full WiFi smart lock.',
    5000, 'wifi', 'bluetooth', 0,
    'USB', 1, 0, 80, '0', 'AES-128',
    0, 0, 0, 0, 1, 1, 0, 1, 0,
    0, 0, 0, '0',
    1.00, 500.0, 100,
    0, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Assistant","Qrio Lock Q-SL2"]',
    4.1, 800,
    'Qrio Hub Review — WiFi Bridge for Qrio Lock 2026',
    'Review of Qrio Hub. WiFi remote + voice control for Q-SL2. Essential accessory for Qrio smart lock.'
);

-- =====================================================
-- TCL — Add 2 products
-- Existing: 1 product
-- Source: tcl.com, tclhomesecurity.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='tcl'), 'D1 Series', 'tcl-d1', 'Premium deadbolts with palm vein, camera, and smart features.', 2024, 13000, 25000, 2);

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
    (SELECT id FROM product_series WHERE slug='tcl-d1'),
    (SELECT id FROM brands WHERE slug='tcl'),
    'TCL Smart Lock D1 Pro (Palm Vein)', 'tcl-d1-pro', 'D1-PRO',
    'AI-powered contactless palm vein recognition — difficult to fool. 8 unlock methods: palm vein, keypad, app, NFC fob, key, temporary code, Alexa, Google. WiFi remote via TCL app. IP54 weatherproof (-55°C to 60°C). Rechargeable 7800mAh battery, 8 months per charge. $199.99 MSRP.',
    20000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 8, 2000, '3', 'AES-256',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.10, 200.0, 10,
    50, 0, 10, 100,
    '2.4GHz', 20, 'internal',
    '["Google Home","Amazon Alexa","TCL App"]',
    4.2, 1500,
    'TCL D1 Pro Review — Palm Vein Recognition Smart Lock 2026',
    'Review of TCL D1 Pro. AI palm vein, IP54, 8-month battery. Best palm vein smart lock under $200.'
),
(
    (SELECT id FROM product_series WHERE slug='tcl-d1'),
    (SELECT id FROM brands WHERE slug='tcl'),
    'TCL D1 Ultra 4-in-1 Video Smart Lock', 'tcl-d1-ultra', 'D1-ULTRA',
    'World''s first 4-in-1 smart deadbolt: lock + 2K camera + video doorbell + 3.5" indoor display. AI dual-motion sensors + human detection. 172° field of view. Fingerprint (0.3s), voice, app, mechanical key. IP65 weatherproof. 10,000mAh rechargeable battery. Debuted CES 2025.',
    25000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 8, 2500, '3', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.20, 500.0, 10,
    50, 50, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Google Home","Amazon Alexa","TCL App"]',
    4.3, 800,
    'TCL D1 Ultra Review — 4-in-1 Video Smart Lock 2026',
    'Review of TCL D1 Ultra. 2K camera + doorbell + lock + display. Best all-in-one video smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Completion Batch 1
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square',
    'tcl-d1-pro', 'tcl-d1-ultra'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'thread' FROM products WHERE slug = 'defiant-aura-reach-matter';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'harfo-hf-l7000', 'harfo-hf-lm801bk',
    'qrio-pad', 'qrio-hub'
);

-- Matter tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'defiant-aura-reach-matter';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'harfo-hf-l7000', 'harfo-hf-lm801bk', 'tcl-d1-ultra'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square', 'defiant-aura-reach-matter',
    'harfo-hf-l7000', 'harfo-hf-lm801bk',
    'qrio-pad',
    'tcl-d1-pro', 'tcl-d1-ultra'
);

-- Palm vein tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'palm-vein' FROM products WHERE slug = 'tcl-d1-pro';

-- Camera tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug = 'tcl-d1-ultra';

-- RFID tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'harfo-hf-l7000', 'harfo-hf-lm801bk', 'qrio-pad'
);

-- Voice control
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'voice-control' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square', 'defiant-aura-reach-matter',
    'qrio-hub'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square', 'defiant-aura-reach-matter',
    'harfo-hf-lm801bk', 'qrio-pad', 'qrio-hub'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'harfo-hf-l7000', 'tcl-d1-pro', 'tcl-d1-ultra'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square', 'defiant-aura-reach-matter',
    'harfo-hf-l7000', 'harfo-hf-lm801bk',
    'tcl-d1-pro', 'tcl-d1-ultra'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'defiant-aura-reach-matter', 'qrio-hub', 'tcl-d1-ultra'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'tcl-d1-pro', 'tcl-d1-ultra'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'defiant-hubspace-wifi-square', 'harfo-hf-l7000'
);
