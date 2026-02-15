-- =====================================================
-- Products Seed Data
-- Product Series + Products + Product Tags
-- 6 brands, ~25 products
-- =====================================================

-- =====================================================
-- YALE — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Assure Lock 2', 'yale-assure-lock-2', 'Yale flagship smart deadbolt with multiple protocol options and Apple Home Key support.', 2022, 17999, 27999, 1),
((SELECT id FROM brands WHERE slug='yale'), 'Assure Lock SL', 'yale-assure-lock-sl', 'Touchscreen smart lock with key-free design.', 2019, 19999, 24999, 2),
((SELECT id FROM brands WHERE slug='yale'), 'Approach Lock', 'yale-approach-lock', 'Yale retrofit lock with Wi-Fi module.', 2023, 12999, 17999, 3);

-- YALE — Products
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
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-2'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock 2 Wi-Fi', 'yale-assure-lock-2-wifi', 'YRD420-WF1',
    'Yale''s flagship Wi-Fi deadbolt with touchscreen keypad and Apple Home Key support. No hub required for remote access.',
    24999, 'wifi', 'bluetooth', 0,
    'CR2', 2, 12, 850, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 250.0, 10,
    25, 0, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 2840,
    'Yale Assure Lock 2 Wi-Fi Review — Specs, Pros & Cons 2026',
    'Detailed review of Yale Assure Lock 2 Wi-Fi (YRD420-WF1). Touchscreen keypad, Apple Home Key, 12-month battery life. Full specs and comparison.'
),
(
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-2'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock 2 Z-Wave', 'yale-assure-lock-2-zwave', 'YRD420-ZW2',
    'Z-Wave Plus variant for smart home hub integration. Best for SmartThings and Z-Wave ecosystems.',
    21999, 'zwave', 'bluetooth', 0,
    'CR2', 2, 12, 850, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.03, 13.0, 10,
    25, 0, 0, 250,
    '908MHz', 40, 'internal',
    '["Samsung SmartThings","Ring Alarm","Hubitat","Home Assistant"]',
    4.4, 1520,
    'Yale Assure Lock 2 Z-Wave Review — Specs & Smart Home Integration 2026',
    'Review of Yale Assure Lock 2 Z-Wave (YRD420-ZW2). Hub-based smart home integration, long battery life, S2 security.'
),
(
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-2'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock 2 Zigbee', 'yale-assure-lock-2-zigbee', 'YRD420-ZB2',
    'Zigbee variant optimized for mesh networking. Works with SmartThings and Zigbee hubs.',
    21999, 'zigbee', 'bluetooth', 0,
    'CR2', 2, 12, 850, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.02, 12.0, 10,
    25, 0, 0, 250,
    '2.4GHz', 20, 'internal',
    '["Samsung SmartThings","Amazon Echo (Zigbee)","Hubitat"]',
    4.3, 980,
    'Yale Assure Lock 2 Zigbee Review — Mesh Network Ready 2026',
    'Review of Yale Assure Lock 2 Zigbee (YRD420-ZB2). Mesh networking, low power consumption, SmartThings compatible.'
),
(
    (SELECT id FROM product_series WHERE slug='yale-approach-lock'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Approach Lock with Wi-Fi', 'yale-approach-lock-wifi', 'YRA2-WF1',
    'Retrofit smart lock that installs over your existing deadbolt. Built-in Wi-Fi with Apple Home Key.',
    14999, 'wifi', 'bluetooth', 0,
    'CR2', 4, 6, 340, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    0.20, 280.0, 10,
    0, 0, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.2, 650,
    'Yale Approach Lock Review — Retrofit Wi-Fi Smart Lock 2026',
    'Review of Yale Approach Lock with Wi-Fi. Retrofit design, Apple Home Key, easy installation. Ideal for renters.'
);

-- =====================================================
-- AUGUST — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='august'), 'Wi-Fi Smart Lock', 'august-wifi-smart-lock', 'August''s flagship retrofit smart lock with built-in Wi-Fi.', 2020, 19999, 22999, 1),
((SELECT id FROM brands WHERE slug='august'), 'Smart Lock Pro', 'august-smart-lock-pro', 'Professional-grade retrofit with Z-Wave Plus support.', 2017, 22999, 27999, 2);

-- AUGUST — Products
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
    (SELECT id FROM product_series WHERE slug='august-wifi-smart-lock'),
    (SELECT id FROM brands WHERE slug='august'),
    'August Wi-Fi Smart Lock (4th Gen)', 'august-wifi-4th-gen', 'AUG-SL05-M01-S01',
    'Compact retrofit lock with built-in Wi-Fi. 45% smaller than previous generation. DoorSense technology included.',
    22999, 'wifi', 'bluetooth', 0,
    'CR123A', 2, 6, 295, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    33, 57, 54, '60,70',
    0.18, 270.0, 10,
    0, 0, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.3, 3200,
    'August Wi-Fi Smart Lock 4th Gen Review — Compact Retrofit Design 2026',
    'Review of August Wi-Fi Smart Lock 4th Gen. 45% smaller, DoorSense, auto-unlock. Best retrofit lock for renters.'
),
(
    (SELECT id FROM product_series WHERE slug='august-smart-lock-pro'),
    (SELECT id FROM brands WHERE slug='august'),
    'August Smart Lock Pro + Connect', 'august-smart-lock-pro', 'AUG-SL03-C02-G03',
    'Pro-grade retrofit with Z-Wave Plus. Includes Connect Wi-Fi Bridge for remote access.',
    24999, 'zwave', 'bluetooth', 0,
    'CR123A', 2, 4, 365, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    33, 57, 54, '60,70',
    0.05, 15.0, 10,
    0, 0, 0, 200,
    '908MHz', 35, 'internal',
    '["Samsung SmartThings","Wink","Home Assistant","Apple HomeKit"]',
    4.1, 1850,
    'August Smart Lock Pro Review — Z-Wave Plus with Connect Bridge 2026',
    'Review of August Smart Lock Pro with Connect Wi-Fi Bridge. Z-Wave Plus, DoorSense, professional-grade retrofit design.'
);

-- =====================================================
-- SCHLAGE — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='schlage'), 'Encode Plus', 'schlage-encode-plus', 'First smart lock with Apple Home Key. Wi-Fi with ANSI Grade 1.', 2022, 29999, 34999, 1),
((SELECT id FROM brands WHERE slug='schlage'), 'Encode', 'schlage-encode', 'Wi-Fi deadbolt with built-in alarm.', 2019, 22999, 27999, 2),
((SELECT id FROM brands WHERE slug='schlage'), 'Connect', 'schlage-connect', 'Z-Wave Plus deadbolt for smart home hubs.', 2017, 18999, 22999, 3);

-- SCHLAGE — Products
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
    (SELECT id FROM product_series WHERE slug='schlage-encode-plus'),
    (SELECT id FROM brands WHERE slug='schlage'),
    'Schlage Encode Plus Wi-Fi Deadbolt', 'schlage-encode-plus-wifi', 'BE499WB',
    'First-ever lock with Apple Home Key. ANSI Grade 1, built-in WiFi, built-in alarm sensor. The gold standard for iOS users.',
    29999, 'wifi', 'bluetooth', 0,
    'AA', 4, 24, 1200, '1', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 63, 54, '60,70',
    0.12, 220.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Apple Home Key","Amazon Alexa","Google Home"]',
    4.7, 4100,
    'Schlage Encode Plus Review — Apple Home Key & Grade 1 Security 2026',
    'In-depth review of Schlage Encode Plus. First Apple Home Key lock, ANSI Grade 1, 24-month battery life. The premium choice for iOS users.'
),
(
    (SELECT id FROM product_series WHERE slug='schlage-encode'),
    (SELECT id FROM brands WHERE slug='schlage'),
    'Schlage Encode Wi-Fi Deadbolt', 'schlage-encode-wifi', 'BE489WB',
    'Wi-Fi deadbolt with built-in alarm technology and ANSI Grade 1 security. No hub required.',
    24999, 'wifi', 'bluetooth', 0,
    'AA', 4, 24, 1150, '1', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 63, 54, '60,70',
    0.10, 200.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Ring"]',
    4.5, 3500,
    'Schlage Encode Wi-Fi Deadbolt Review — Grade 1 Without the Hub 2026',
    'Review of Schlage Encode Wi-Fi Deadbolt. ANSI Grade 1, built-in alarm, 24-month battery. Best hub-free option.'
),
(
    (SELECT id FROM product_series WHERE slug='schlage-connect'),
    (SELECT id FROM brands WHERE slug='schlage'),
    'Schlage Connect Z-Wave Plus', 'schlage-connect-zwave', 'BE468ZP',
    'Z-Wave Plus deadbolt with S2 security framework. ANSI Grade 1. Ideal for SmartThings and Z-Wave hubs.',
    19999, 'zwave', 'bluetooth', 0,
    'AA', 4, 24, 1100, '1', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 63, 54, '60,70',
    0.03, 13.0, 10,
    30, 0, 0, 50,
    '908MHz', 40, 'internal',
    '["Samsung SmartThings","Ring Alarm","Wink","Home Assistant"]',
    4.4, 2200,
    'Schlage Connect Z-Wave Plus Review — Grade 1 for Smart Home Hubs 2026',
    'Review of Schlage Connect Z-Wave Plus. ANSI Grade 1, S2 security, SmartThings compatible. Best Z-Wave deadbolt.'
);

-- =====================================================
-- KWIKSET — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kwikset'), 'Halo', 'kwikset-halo', 'Wi-Fi smart lock with SmartKey Security re-key technology.', 2019, 17999, 22999, 1),
((SELECT id FROM brands WHERE slug='kwikset'), 'Halo Touch', 'kwikset-halo-touch', 'Fingerprint-enabled Wi-Fi smart lock.', 2020, 19999, 24999, 2),
((SELECT id FROM brands WHERE slug='kwikset'), 'SmartCode', 'kwikset-smartcode', 'Z-Wave smart lock for hub-based systems.', 2016, 12999, 17999, 3);

-- KWIKSET — Products
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
    (SELECT id FROM product_series WHERE slug='kwikset-halo'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Halo Wi-Fi Smart Lock', 'kwikset-halo-wifi', '99390-003',
    'Wi-Fi enabled deadbolt with SmartKey Security. No hub, no bridge. Simple app setup.',
    19999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 900, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.14, 230.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.1, 1800,
    'Kwikset Halo Wi-Fi Review — Budget Smart Lock with SmartKey 2026',
    'Review of Kwikset Halo Wi-Fi. SmartKey re-key technology, no hub required, budget-friendly pricing. Best value Wi-Fi lock.'
),
(
    (SELECT id FROM product_series WHERE slug='kwikset-halo-touch'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Halo Touch Fingerprint', 'kwikset-halo-touch-fingerprint', '99590-001',
    'Fingerprint-enabled Wi-Fi smart lock. Stores up to 100 fingerprints. SmartKey Security included.',
    22999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 950, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.16, 240.0, 10,
    50, 100, 0, 250,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.3, 1200,
    'Kwikset Halo Touch Fingerprint Review — Biometric + Wi-Fi 2026',
    'Review of Kwikset Halo Touch Fingerprint lock. 100 fingerprint storage, Wi-Fi, SmartKey. Best budget fingerprint lock.'
),
(
    (SELECT id FROM product_series WHERE slug='kwikset-smartcode'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset SmartCode 270 Z-Wave', 'kwikset-smartcode-270-zwave', '99140-023',
    'Z-Wave Plus deadbolt with SmartKey Security. Budget-friendly option for smart home hubs.',
    14999, 'zwave', NULL, 0,
    'AA', 4, 12, 800, '2', 'AES-128',
    0, 1, 1, 0, 1, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.03, 13.0, 10,
    30, 0, 0, 0,
    '908MHz', 40, 'internal',
    '["Samsung SmartThings","Ring Alarm","Wink"]',
    4.0, 900,
    'Kwikset SmartCode 270 Z-Wave Review — Budget Hub Lock 2026',
    'Review of Kwikset SmartCode 270 Z-Wave. Most affordable Z-Wave deadbolt with SmartKey re-key.'
);

-- =====================================================
-- AQARA — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='aqara'), 'U100', 'aqara-u100', 'Fingerprint smart lock with Apple Home Key via NFC.', 2022, 17999, 22999, 1),
((SELECT id FROM brands WHERE slug='aqara'), 'Smart Lock N100', 'aqara-n100', 'Zigbee smart lock with Xiaomi ecosystem support.', 2020, 14999, 18999, 2);

-- AQARA — Products
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
    (SELECT id FROM product_series WHERE slug='aqara-u100'),
    (SELECT id FROM brands WHERE slug='aqara'),
    'Aqara U100 Smart Lock', 'aqara-u100', 'ZNMS02LM',
    'Fingerprint smart lock with Apple Home Key via NFC. Compact design, Thread-ready via Aqara Hub M2.',
    19999, 'zigbee', 'bluetooth', 1,
    'CR123A', 4, 18, 680, '2', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.02, 12.0, 10,
    50, 50, 10, 100,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa"]',
    4.5, 1600,
    'Aqara U100 Smart Lock Review — Apple Home Key & Fingerprint 2026',
    'Review of Aqara U100 Smart Lock. Apple Home Key via NFC, fingerprint reader, 18-month battery. Best value HomeKit lock.'
),
(
    (SELECT id FROM product_series WHERE slug='aqara-n100'),
    (SELECT id FROM brands WHERE slug='aqara'),
    'Aqara Smart Lock N100 Zigbee', 'aqara-n100-zigbee', 'ZNMS11LM',
    'Zigbee smart lock with embedded fingerprint sensor and NFC card support. Integrates with Aqara/Xiaomi ecosystem.',
    15999, 'zigbee', 'bluetooth', 0,
    'AA', 8, 18, 750, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.02, 11.0, 10,
    50, 50, 50, 100,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Xiaomi Mi Home","Aqara Home"]',
    4.2, 800,
    'Aqara N100 Zigbee Smart Lock Review — Xiaomi Ecosystem Lock 2026',
    'Review of Aqara Smart Lock N100. Zigbee, fingerprint, NFC card, 18-month battery. Best for Aqara/Xiaomi homes.'
);

-- =====================================================
-- LEVEL — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='level'), 'Level Lock+', 'level-lock-plus', 'Invisible smart lock with Thread/Matter. Tap-to-unlock with Apple Home Key.', 2022, 29999, 32999, 1),
((SELECT id FROM brands WHERE slug='level'), 'Level Bolt', 'level-bolt', 'Invisible deadbolt replacement that fits inside the door.', 2020, 19999, 22999, 2);

-- LEVEL — Products
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
    (SELECT id FROM product_series WHERE slug='level-lock-plus'),
    (SELECT id FROM brands WHERE slug='level'),
    'Level Lock+ (Thread/Matter)', 'level-lock-plus-thread', 'A200C',
    'Invisible smart deadbolt with Thread and Matter support. Apple Home Key compatible. Looks like a traditional lock.',
    32999, 'thread', 'bluetooth', 1,
    'CR2', 1, 12, 250, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.03, 14.0, 10,
    0, 0, 0, 50,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 2100,
    'Level Lock+ Thread/Matter Review — Invisible Smart Lock 2026',
    'Review of Level Lock+ with Thread/Matter. Invisible design, Apple Home Key. The most beautiful smart lock you''ll never see.'
),
(
    (SELECT id FROM product_series WHERE slug='level-bolt'),
    (SELECT id FROM brands WHERE slug='level'),
    'Level Bolt Invisible Smart Lock', 'level-bolt-invisible', 'C-L12U',
    'Completely invisible smart deadbolt that replaces your existing bolt. Bluetooth only, Apple HomeKit compatible.',
    19999, 'bluetooth', NULL, 0,
    'CR2', 1, 12, 200, '2', 'AES-128',
    0, 0, 1, 1, 1, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.04, 14.0, 10,
    0, 0, 0, 50,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit"]',
    4.3, 1300,
    'Level Bolt Review — Completely Invisible Smart Lock 2026',
    'Review of Level Bolt invisible smart lock. Fits inside the door, Bluetooth + HomeKit. The most discreet smart lock available.'
);

-- =====================================================
-- PRODUCT TAGS — Multi-dimensional tagging
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'zwave';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'zigbee';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'thread';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'bluetooth';

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE supports_matter = 1;

-- Feature tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE has_fingerprint = 1;

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE has_keypad = 1;

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'auto-unlock' FROM products WHERE has_auto_unlock = 1;

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'physical-key' FROM products WHERE has_physical_key = 1;

-- HomeKit tags (from ecosystems_json)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'homekit' FROM products WHERE ecosystems_json LIKE '%HomeKit%';

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'budget' FROM products p WHERE p.price_usd < 18000;

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'mid' FROM products p WHERE p.price_usd >= 18000 AND p.price_usd < 28000;

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'premium' FROM products p WHERE p.price_usd >= 28000;

-- Scenario tags (manually curated per product use case)
-- Apartment-friendly (retrofit, renter-friendly)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products
WHERE slug IN ('august-wifi-4th-gen', 'august-smart-lock-pro', 'yale-approach-lock-wifi', 'level-bolt-invisible', 'level-lock-plus-thread');

-- Airbnb / Short-term rental (remote access + guest codes)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'airbnb' FROM products
WHERE has_remote_access = 1 AND has_guest_codes = 1 AND has_keypad = 1;

-- Commercial (ANSI Grade 1 or high credential count)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE ansi_grade = '1';

-- Rental properties (guest codes + keypad + durable)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products
WHERE has_guest_codes = 1 AND has_keypad = 1;

-- Family-friendly (multiple access methods)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products
WHERE has_keypad = 1 AND has_auto_lock = 1;

-- Home security focused (Grade 1 or Grade 2 with good rating)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products
WHERE ansi_grade IN ('1', '2') AND rating >= 4.0;
