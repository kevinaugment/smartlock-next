-- =====================================================
-- Brand Expansion #5 — Additional Products for Thin Brands
-- Filling out existing brands: Eufy, SwitchBot, Wyze, Ultraloq,
-- Samsung, igloohome, Bosma, Brinks, SimpliSafe, Philips
-- =====================================================

-- =====================================================
-- EUFY — Additional Product
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='eufy'), 'Video Smart Lock S330', 'eufy-video-s330', '3-in-1: smart lock + 2K camera + video doorbell.', 2024, 29999, 34999, 2);

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
    (SELECT id FROM product_series WHERE slug='eufy-video-s330'),
    (SELECT id FROM brands WHERE slug='eufy'),
    'Eufy Video Smart Lock S330', 'eufy-video-s330', 'T8530',
    '3-in-1: smart lock + 2K camera (160°) + video doorbell. 10,000mAh rechargeable, 0.3s fingerprint, local storage via Chime, IP65.',
    34999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 1800, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 55, 54, '60,70',
    1.00, 800.0, 10,
    100, 50, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 3500,
    'Eufy Video Smart Lock S330 Review — Camera + Lock 2-in-1 2026',
    'Review of Eufy Video S330. 2K camera + smart lock + doorbell. Best video smart lock with local storage.'
);

-- =====================================================
-- SWITCHBOT — Additional Product (Lock Pro)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='switchbot'), 'Lock Pro', 'switchbot-lock-pro', 'Premium retrofit with Matter support via Hub.', 2024, 11999, 19999, 2);

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
    (SELECT id FROM product_series WHERE slug='switchbot-lock-pro'),
    (SELECT id FROM brands WHERE slug='switchbot'),
    'SwitchBot Lock Pro', 'switchbot-lock-pro', 'W3500000',
    'Premium retrofit. Aluminum-magnesium alloy, BLE, Matter via Hub Mini. Fits deadbolts, rim cylinders, mortise. 6-9 month battery.',
    11999, 'bluetooth', NULL, 1,
    'AA', 4, 9, 435, '0', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.03, 10.0, 50,
    100, 0, 0, 200,
    '2.4GHz', 120, 'internal',
    '["Apple Home","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.4, 5000,
    'SwitchBot Lock Pro Review — Premium Retrofit Smart Lock 2026',
    'Review of SwitchBot Lock Pro. Matter via Hub, aluminum alloy, 9-month battery. Best versatile retrofit smart lock.'
);

-- =====================================================
-- WYZE — Additional Product (Lock Bolt)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='wyze'), 'Lock Bolt', 'wyze-lock-bolt', 'Budget fingerprint + keypad deadbolt.', 2022, 5700, 7999, 2);

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
    (SELECT id FROM product_series WHERE slug='wyze-lock-bolt'),
    (SELECT id FROM brands WHERE slug='wyze'),
    'Wyze Lock Bolt', 'wyze-lock-bolt', 'WLCKB1',
    'Ultra-affordable fingerprint + keypad deadbolt. Bluetooth 5.0 (16ft), 50 fingerprints, anti-peep codes, IPX5, USB-C emergency.',
    6999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 900, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 0,
    35, 57, 54, '60,70',
    0.03, 100.0, 10,
    50, 50, 0, 10,
    '2.4GHz', 5, 'internal',
    '[]',
    4.0, 8000,
    'Wyze Lock Bolt Review — Best Smart Lock Under $70 2026',
    'Review of Wyze Lock Bolt. Fingerprint + keypad, $70, IPX5. The ultra-affordable smart deadbolt.'
),
(
    (SELECT id FROM product_series WHERE slug='wyze-lock-bolt'),
    (SELECT id FROM brands WHERE slug='wyze'),
    'Wyze Lock Bolt v2', 'wyze-lock-bolt-v2', 'WLCKB2',
    'Updated with built-in WiFi for remote access. AI self-learning fingerprint, 50 prints, Alexa + Google, IPX5.',
    7999, 'wifi', 'bluetooth', 0,
    'AA', 4, 8, 950, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    0.08, 180.0, 10,
    50, 50, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.1, 2000,
    'Wyze Lock Bolt v2 Review — WiFi Fingerprint Deadbolt 2026',
    'Review of Wyze Lock Bolt v2. Built-in WiFi, AI fingerprint, under $80. Best budget WiFi fingerprint lock.'
);

-- =====================================================
-- ULTRALOQ — Additional Product (U-Bolt Pro Z-Wave)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='ultraloq'), 'U-Bolt Pro Z-Wave', 'ultraloq-ubolt-pro-zwave', 'Multi-protocol deadbolt with Z-Wave Plus.', 2022, 19999, 22999, 2);

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
    (SELECT id FROM product_series WHERE slug='ultraloq-ubolt-pro-zwave'),
    (SELECT id FROM brands WHERE slug='ultraloq'),
    'Ultraloq U-Bolt Pro Z-Wave', 'ultraloq-ubolt-pro-zwave', 'UBP-ZW',
    '6-in-1: fingerprint, keypad, smartphone, auto-unlock, shake-to-open, physical key. Z-Wave Plus for smart home hubs.',
    21999, 'zwave', 'bluetooth', 0,
    'CR123A', 2, 12, 1050, '2', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.08, 120.0, 10,
    50, 50, 0, 200,
    '908.42MHz', 30, 'internal',
    '["Samsung SmartThings","Hubitat","Home Assistant"]',
    4.4, 3200,
    'Ultraloq U-Bolt Pro Z-Wave Review — Smart Home Power Lock 2026',
    'Review of Ultraloq U-Bolt Pro Z-Wave. 6-in-1 access, Z-Wave Plus, SmartThings. Best Z-Wave smart lock.'
);

-- =====================================================
-- SAMSUNG — Additional Product (SHP-DP609)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='samsung'), 'SHP-DP609', 'samsung-shp-dp609', 'Premium push-pull with fingerprint and WiFi.', 2020, 35000, 45000, 2);

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
    (SELECT id FROM product_series WHERE slug='samsung-shp-dp609'),
    (SELECT id FROM brands WHERE slug='samsung'),
    'Samsung SHP-DP609 Push-Pull Lock', 'samsung-shp-dp609', 'SHP-DP609',
    'Premium push-pull with fingerprint, keypad, RFID, and Bluetooth. Auto-lock, anti-pry alarm, fire detection sensor.',
    39999, 'bluetooth', 'wifi', 0,
    'AA', 8, 12, 3500, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.15, 250.0, 10,
    100, 100, 100, 50,
    '2.4GHz', 15, 'internal',
    '["Samsung SmartThings"]',
    4.3, 2800,
    'Samsung SHP-DP609 Review — Premium Push-Pull Smart Lock 2026',
    'Review of Samsung SHP-DP609. Push-pull design, fingerprint, fire sensor. Best Samsung premium smart lock.'
);

-- =====================================================
-- IGLOOHOME — Additional Product (Rim Lock)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='igloohome'), 'Rim Lock', 'igloohome-rim-lock', 'Surface mount smart lock for property managers.', 2022, 24999, 29999, 2);

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
    (SELECT id FROM product_series WHERE slug='igloohome-rim-lock'),
    (SELECT id FROM brands WHERE slug='igloohome'),
    'igloohome Rim Lock RL2', 'igloohome-rim-lock-rl2', 'RL2',
    'Surface-mount smart lock — no modifications to door. Offline PIN codes via algoPIN, Bluetooth, keypad. Ideal for property managers.',
    27999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1100, '0', 'AES-128',
    0, 1, 1, 0, 0, 0, 1, 1, 1,
    30, 80, 0, '0',
    0.04, 80.0, 10,
    1000, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["igloohome"]',
    4.0, 800,
    'igloohome Rim Lock RL2 Review — Surface Mount Smart Lock 2026',
    'Review of igloohome Rim Lock RL2. Surface mount, offline PIN codes, property managers. Best no-drill smart lock.'
);

-- =====================================================
-- BOSMA — Additional Product (Aegis Lock)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='bosma'), 'Aegis Lock', 'bosma-aegis-lock', 'WiFi video smart lock with built-in camera.', 2023, 24999, 29999, 2);

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
    (SELECT id FROM product_series WHERE slug='bosma-aegis-lock'),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Aegis Smart Video Lock', 'bosma-aegis', 'AEGIS-V1',
    'Smart lock with built-in 1080p camera. Fingerprint, keypad, Bluetooth, WiFi. Auto-lock with door sensor.',
    27999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 3, 1500, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.80, 600.0, 10,
    50, 50, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 600,
    'Bosma Aegis Review — Video Smart Lock with Camera 2026',
    'Review of Bosma Aegis. 1080p camera + smart lock, fingerprint, WiFi. Best video doorlock under $300.'
);

-- =====================================================
-- BRINKS — Additional Product (Electronic Deadbolt)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='brinks'), 'Array Smart Deadbolt', 'brinks-array', 'WiFi touchscreen deadbolt with Alexa built-in.', 2022, 14999, 19999, 2);

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
    (SELECT id FROM product_series WHERE slug='brinks-array'),
    (SELECT id FROM brands WHERE slug='brinks'),
    'Brinks Array Smart Deadbolt', 'brinks-array-wifi', 'BR-ARR-MB',
    'WiFi touchscreen deadbolt with built-in Alexa. ANSI Grade 2, auto-lock, 50 user codes, remote locking.',
    17999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1200, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 220.0, 10,
    50, 0, 0, 50,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa (built-in)","Google Home"]',
    3.8, 1500,
    'Brinks Array Review — WiFi Deadbolt with Alexa Built-in 2026',
    'Review of Brinks Array. WiFi deadbolt, Alexa built-in, ANSI Grade 2. Budget mainstream smart lock.'
);

-- =====================================================
-- SIMPLISAFE — Additional Product (Smart Lock Pro)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='simplisafe'), 'Smart Lock Pro', 'simplisafe-smart-lock-pro', 'WiFi smart lock for SimpliSafe security system.', 2023, 19999, 24999, 2);

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
    (SELECT id FROM product_series WHERE slug='simplisafe-smart-lock-pro'),
    (SELECT id FROM brands WHERE slug='simplisafe'),
    'SimpliSafe Smart Lock Pro', 'simplisafe-smart-lock-pro', 'SS-SLP',
    'WiFi deadbolt designed for SimpliSafe security system. Auto-lock/unlock with SimpliSafe sensors, PIN keypad, ANSI Grade 2.',
    22999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1100, '2', 'AES-256',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 250.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 25, 'internal',
    '["SimpliSafe","Amazon Alexa","Google Home"]',
    4.1, 2500,
    'SimpliSafe Smart Lock Pro Review — Security System Lock 2026',
    'Review of SimpliSafe Smart Lock Pro. WiFi, auto-lock with sensors, ANSI Grade 2. Best lock for SimpliSafe users.'
);

-- =====================================================
-- PHILIPS — Additional Product (Palm Recognition Lock)
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='philips'), 'Alpha VP', 'philips-alpha-vp', 'Premium push-pull with palm vein + face recognition.', 2024, 45000, 69999, 2);

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
    (SELECT id FROM product_series WHERE slug='philips-alpha-vp'),
    (SELECT id FROM brands WHERE slug='philips'),
    'Philips Alpha VP Palm Vein Lock', 'philips-alpha-vp', 'ALPHA-VP',
    'Premium push-pull with palm vein + 3D face recognition + fingerprint. WiFi, 5-inch IPS touchscreen, anti-pry, fire detection.',
    59999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 3800, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.60, 700.0, 10,
    100, 200, 200, 100,
    '2.4GHz', 25, 'internal',
    '["Philips Smart Home"]',
    4.1, 500,
    'Philips Alpha VP Review — Palm Vein + Face Recognition Lock 2026',
    'Review of Philips Alpha VP. Palm vein, 3D face, 5-inch touchscreen. Premium Asian biometric smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 5
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'eufy-video-s330', 'wyze-lock-bolt-v2', 'samsung-shp-dp609',
    'bosma-aegis', 'brinks-array-wifi', 'simplisafe-smart-lock-pro', 'philips-alpha-vp'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'switchbot-lock-pro', 'wyze-lock-bolt', 'igloohome-rim-lock-rl2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'zwave' FROM products WHERE slug = 'ultraloq-ubolt-pro-zwave';

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'switchbot-lock-pro';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'eufy-video-s330', 'wyze-lock-bolt', 'wyze-lock-bolt-v2',
    'ultraloq-ubolt-pro-zwave', 'samsung-shp-dp609',
    'bosma-aegis', 'philips-alpha-vp'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'eufy-video-s330', 'wyze-lock-bolt', 'wyze-lock-bolt-v2',
    'ultraloq-ubolt-pro-zwave', 'samsung-shp-dp609',
    'igloohome-rim-lock-rl2', 'brinks-array-wifi',
    'simplisafe-smart-lock-pro', 'philips-alpha-vp'
);

-- Camera tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug IN (
    'eufy-video-s330', 'bosma-aegis'
);

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug = 'switchbot-lock-pro';

-- Face recognition tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug = 'philips-alpha-vp';

-- Palm vein tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'palm-vein' FROM products WHERE slug = 'philips-alpha-vp';

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'wyze-lock-bolt', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'switchbot-lock-pro', 'ultraloq-ubolt-pro-zwave',
    'igloohome-rim-lock-rl2', 'brinks-array-wifi',
    'simplisafe-smart-lock-pro', 'bosma-aegis'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'eufy-video-s330', 'samsung-shp-dp609', 'philips-alpha-vp'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'igloohome-rim-lock-rl2', 'wyze-lock-bolt', 'ultraloq-ubolt-pro-zwave'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug = 'switchbot-lock-pro';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'brinks-array-wifi', 'simplisafe-smart-lock-pro', 'wyze-lock-bolt-v2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'eufy-video-s330', 'samsung-shp-dp609', 'simplisafe-smart-lock-pro',
    'bosma-aegis', 'philips-alpha-vp'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'switchbot-lock-pro', 'ultraloq-ubolt-pro-zwave'
);
