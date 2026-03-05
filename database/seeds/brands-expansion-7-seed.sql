-- =====================================================
-- Brand Expansion #7 — Fill remaining thin brands (1-2 product brands)
-- Based on official website scans and web research
-- =====================================================

-- =====================================================
-- ALFRED — (have 1 DB2-B, adding 2: DB1, ML2)
-- =====================================================

-- Alfred DB1 Smart Lock
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='alfred'), 'DB1', 'alfred-db1', 'Entry-level touchscreen smart deadbolt.', 2020, 12999, 17999, 2);

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
    (SELECT id FROM product_series WHERE slug='alfred-db1'),
    (SELECT id FROM brands WHERE slug='alfred'),
    'Alfred DB1 Smart Touchscreen Deadbolt', 'alfred-db1-bluetooth', 'DB1-C-BL',
    'Entry-level touchscreen motorized deadbolt. Bluetooth, up to 20 PIN codes, Z-Wave compatible (module sold separately).',
    14999, 'bluetooth', 'z-wave', 0,
    'AA', 4, 12, 1000, '2', 'AES-128',
    0, 1, 1, 0, 1, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.05, 120.0, 10,
    20, 0, 0, 20,
    '2.4GHz', 10, 'internal',
    '["Google Home","Amazon Alexa"]',
    3.8, 1500,
    'Alfred DB1 Review — Entry-Level Touchscreen Smart Deadbolt 2026',
    'Review of Alfred DB1. Bluetooth touchscreen deadbolt, Z-Wave optional, 20 PIN codes. Affordable Canadian design.'
);

-- Alfred ML2 Smart Mortise Lock
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='alfred'), 'ML2', 'alfred-ml2', 'Premium smart mortise lock with Z-Wave LR.', 2024, 64900, 64900, 3);

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
    (SELECT id FROM product_series WHERE slug='alfred-ml2'),
    (SELECT id FROM brands WHERE slug='alfred'),
    'Alfred ML2 Smart Mortise Lock', 'alfred-ml2-zwave', 'ML2-ZW800',
    'Premium mortise lock retrofit. Z-Wave 800 LR, RFID 250 cards, 250 PIN codes, rechargeable Li-ion, optional Wi-Charge wireless power.',
    64900, 'z-wave', 'bluetooth', 0,
    'lithium-ion', 1, 12, 1800, '1', 'AES-256',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 0, '0',
    0.10, 200.0, 50,
    250, 0, 250, 250,
    '908.42MHz', 60, 'internal',
    '["SmartThings","Ring Alarm","Alarm.com"]',
    4.2, 200,
    'Alfred ML2 Review — Premium Z-Wave Mortise Smart Lock 2026',
    'Review of Alfred ML2. Z-Wave 800 LR, RFID, 250 codes, mortise retrofit. Best smart mortise lock for multifamily.'
);

-- =====================================================
-- AUGUST — (have 2, actually August WiFi + Pro covers it)
-- August Smart Lock 3rd Gen (legacy but popular)
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='august'), 'Smart Lock 3rd Generation', 'august-smart-lock-3rd-gen', 'Third-gen retrofit with Bluetooth.', 2020, 12999, 14999, 3);

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
    (SELECT id FROM product_series WHERE slug='august-smart-lock-3rd-gen'),
    (SELECT id FROM brands WHERE slug='august'),
    'August Smart Lock 3rd Generation', 'august-smart-lock-3rd-gen', 'AUG-SL05',
    'Compact retrofit lock with Bluetooth + optional Connect bridge. DoorSense, auto-lock/unlock, easy retrofit in minutes.',
    14999, 'bluetooth', NULL, 0,
    'CR123A', 2, 6, 280, '0', 'AES-128',
    0, 0, 1, 1, 1, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.04, 8.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 5, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.1, 12000,
    'August Smart Lock 3rd Gen Review — Classic Retrofit 2026',
    'Review of August Smart Lock 3rd Gen. Compact retrofit, DoorSense, HomeKit. Still a great budget retrofit lock.'
);

-- =====================================================
-- SAMSUNG — (have 2, adding 2: SHP-DH538, SHS-P718)
-- =====================================================

-- Samsung SHP-DH538
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='samsung'), 'SHP-DH538', 'samsung-shp-dh538', 'Digital mortise lock with fingerprint + lever.', 2022, 29999, 34999, 3);

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
    (SELECT id FROM product_series WHERE slug='samsung-shp-dh538'),
    (SELECT id FROM brands WHERE slug='samsung'),
    'Samsung SHP-DH538 Digital Mortise Lock', 'samsung-shp-dh538', 'SHP-DH538',
    'Advanced digital mortise lock. Fingerprint, PIN, RFID card, emergency key. LED touchpad, intrusion alarm, fire detection sensor.',
    32999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 3200, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    40, 80, 0, '0',
    0.08, 150.0, 50,
    100, 100, 100, 0,
    NULL, 0, NULL,
    '[]',
    4.3, 3000,
    'Samsung SHP-DH538 Review — Digital Mortise Lock 2026',
    'Review of Samsung SHP-DH538. Fingerprint, PIN, RFID, fire detection. Best Korean smart mortise lock.'
);

-- Samsung SHS-P718 Push Pull
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='samsung'), 'SHS-P718', 'samsung-shs-p718', 'Push-pull smart lock with fingerprint.', 2019, 34999, 39999, 4);

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
    (SELECT id FROM product_series WHERE slug='samsung-shs-p718'),
    (SELECT id FROM brands WHERE slug='samsung'),
    'Samsung SHS-P718 Push Pull Smart Lock', 'samsung-shs-p718', 'SHS-P718',
    'Iconic push-pull design. Fingerprint, RF key tag, PIN code. Auto-lock, intrusion alarm, emergency battery port.',
    37999, 'bluetooth', NULL, 0,
    'AA', 8, 12, 3800, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 0, 1,
    40, 80, 0, '0',
    0.06, 180.0, 50,
    50, 100, 20, 0,
    NULL, 0, NULL,
    '[]',
    4.4, 6000,
    'Samsung SHS-P718 Review — Push-Pull Smart Lock 2026',
    'Review of Samsung SHS-P718. Iconic push-pull, fingerprint, Korean engineering. Most popular push-pull smart lock.'
);

-- =====================================================
-- NUKI — (have 3, adding 2: Ultra, Go)
-- =====================================================

-- Nuki Smart Lock Ultra
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='nuki'), 'Smart Lock Ultra', 'nuki-smart-lock-ultra', 'Smallest Nuki lock with brushless motor.', 2025, 24900, 29900, 4);

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
    (SELECT id FROM product_series WHERE slug='nuki-smart-lock-ultra'),
    (SELECT id FROM brands WHERE slug='nuki'),
    'Nuki Smart Lock Ultra', 'nuki-smart-lock-ultra', 'NUKI-ULTRA',
    'Smallest Nuki ever. Brushless motor unlocks under 1.5s. Built-in WiFi + Thread/Matter. Replaces cylinder (EU) or retrofit (US).',
    27900, 'wifi', 'thread', 1,
    'lithium-ion', 1, 5, 320, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.08, 50.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 500,
    'Nuki Smart Lock Ultra Review — Smallest European Retrofit 2026',
    'Review of Nuki Ultra. Brushless motor, WiFi+Thread+Matter, ultra-compact. Best high-end European retrofit.'
);

-- Nuki Smart Lock Go
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='nuki'), 'Smart Lock Go', 'nuki-smart-lock-go', 'Entry-level Nuki with Matter/Thread.', 2025, 14900, 17900, 5);

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
    (SELECT id FROM product_series WHERE slug='nuki-smart-lock-go'),
    (SELECT id FROM brands WHERE slug='nuki'),
    'Nuki Smart Lock Go', 'nuki-smart-lock-go', 'NUKI-GO',
    'Entry-level European retrofit. Bluetooth + Matter via Thread. Optional WiFi module for remote access. Fully retrofit.',
    16900, 'bluetooth', 'thread', 1,
    'AA', 4, 8, 350, '0', 'AES-256',
    0, 0, 1, 1, 1, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.04, 15.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 5, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.0, 300,
    'Nuki Smart Lock Go Review — Affordable European Retrofit 2026',
    'Review of Nuki Go. Budget-friendly, Matter/Thread, retrofit. Most affordable European smart lock with Matter.'
);

-- =====================================================
-- IGLOOHOME — (have 3, adding 2: Mortise 2+, Keybox 3)
-- =====================================================

-- igloohome Mortise 2+
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='igloohome'), 'Mortise 2+', 'igloohome-mortise-2-plus', 'Smart mortise lock with fingerprint.', 2023, 39999, 44999, 4);

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
    (SELECT id FROM product_series WHERE slug='igloohome-mortise-2-plus'),
    (SELECT id FROM brands WHERE slug='igloohome'),
    'igloohome Mortise 2+ Smart Lock', 'igloohome-mortise-2-plus', 'IGM2P',
    'Smart mortise lock with fingerprint, PIN, RFID, Bluetooth, physical key. algoPIN offline PIN generation. Ideal for property managers.',
    42999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 3500, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 70, 0, '0',
    0.06, 180.0, 50,
    100, 100, 100, 200,
    '2.4GHz', 5, 'internal',
    '["Airbnb"]',
    4.2, 600,
    'igloohome Mortise 2+ Review — Smart Mortise Lock 2026',
    'Review of igloohome Mortise 2+. Fingerprint, algoPIN offline, RFID. Best smart mortise lock for rental hosts.'
);

-- igloohome Keybox 3
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='igloohome'), 'Keybox 3', 'igloohome-keybox-3', 'Smart lockbox for keys.', 2023, 11999, 14999, 5);

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
    (SELECT id FROM product_series WHERE slug='igloohome-keybox-3'),
    (SELECT id FROM brands WHERE slug='igloohome'),
    'igloohome Keybox 3 Smart Lockbox', 'igloohome-keybox-3', 'KB3',
    'Smart lockbox for keys, fobs, access cards. algoPIN offline codes, Bluetooth, IP66 rated, Airbnb integration. No WiFi needed.',
    12999, 'bluetooth', NULL, 0,
    'CR2', 1, 9, 680, '0', 'AES-128',
    0, 1, 0, 0, 0, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.02, 30.0, 20,
    100, 0, 0, 200,
    '2.4GHz', 5, 'internal',
    '["Airbnb"]',
    4.3, 2500,
    'igloohome Keybox 3 Review — Smart Lockbox 2026',
    'Review of igloohome Keybox 3. algoPIN offline, Airbnb sync, IP66. Best smart key lockbox for rental hosts.'
);

-- =====================================================
-- KAADAS — (have 1 K20 Pro, adding 2: K9, KA210)
-- =====================================================

-- Kaadas K9 Push Pull
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kaadas'), 'K9', 'kaadas-k9', 'Push-pull smart lock with fingerprint.', 2022, 24999, 29999, 2);

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
    (SELECT id FROM product_series WHERE slug='kaadas-k9'),
    (SELECT id FROM brands WHERE slug='kaadas'),
    'Kaadas K9 Push Pull Smart Lock', 'kaadas-k9-fingerprint', 'K9-5W',
    'Push-pull mortise lock. FPC fingerprint (100), PIN, RFID, emergency key. WiFi app control, auto-lock, tamper alarm.',
    27999, 'wifi', 'bluetooth', 0,
    'AA', 8, 12, 3600, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.08, 200.0, 30,
    50, 100, 50, 100,
    '2.4GHz', 20, 'internal',
    '[]',
    4.3, 1500,
    'Kaadas K9 Review — Push-Pull Fingerprint Smart Lock 2026',
    'Review of Kaadas K9. Push-pull, FPC fingerprint, WiFi. Premium Asian push-pull smart lock.'
);

-- Kaadas KA210 Z-Wave (US-specific)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kaadas'), 'KA210', 'kaadas-ka210', 'Z-Wave touchpad deadbolt for US market.', 2023, 16999, 19999, 3);

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
    (SELECT id FROM product_series WHERE slug='kaadas-ka210'),
    (SELECT id FROM brands WHERE slug='kaadas'),
    'Kaadas KA210 Z-Wave Touchpad Deadbolt', 'kaadas-ka210-zwave', 'KA210-ZW',
    'Z-Wave certified deadbolt for US market. Touchpad, auto-lock, one-time PIN codes, UL certified, 20-min fire rated. Works with Alarm.com.',
    18999, 'z-wave', 'bluetooth', 0,
    'AA', 4, 12, 1100, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.06, 120.0, 10,
    100, 0, 0, 100,
    '908.42MHz', 30, 'internal',
    '["Alarm.com","SmartThings","Ring Alarm"]',
    4.1, 600,
    'Kaadas KA210 Review — Z-Wave Touchpad Deadbolt 2026',
    'Review of Kaadas KA210. Z-Wave, UL certified, fire rated. Best Kaadas lock for US smart home ecosystem.'
);

-- =====================================================
-- SWITCHBOT — (have 2, adding 1: SwitchBot Lock original)
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
    (SELECT id FROM product_series WHERE slug='switchbot-lock-pro'),
    (SELECT id FROM brands WHERE slug='switchbot'),
    'SwitchBot Lock', 'switchbot-lock-original', 'W1601700',
    'Affordable retrofit smart lock. Bluetooth, adhesive install in minutes, auto-lock/unlock, SwitchBot ecosystem integration.',
    9999, 'bluetooth', NULL, 0,
    'CR123A', 2, 6, 253, '0', 'AES-128',
    0, 0, 1, 1, 1, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.03, 8.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 5, 'internal',
    '["Google Home","Amazon Alexa","IFTTT","SmartThings"]',
    4.0, 5000,
    'SwitchBot Lock Review — Most Affordable Retrofit Smart Lock 2026',
    'Review of SwitchBot Lock. $100 retrofit, adhesive install, Bluetooth. Best ultra-budget retrofit smart lock.'
);

-- =====================================================
-- DANALOCK — (have 1 V3 Z-Wave, adding 1: V3 Bluetooth)
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
    (SELECT id FROM product_series WHERE slug='danalock-v3'),
    (SELECT id FROM brands WHERE slug='danalock'),
    'Danalock V3 Bluetooth Smart Lock', 'danalock-v3-bluetooth', 'V3-BT',
    'European retrofit smart lock with Bluetooth. Universal cylinder adapter, compact design, app control, eKeys, AES-256 encryption.',
    14999, 'bluetooth', NULL, 0,
    'CR123A', 4, 8, 260, '0', 'AES-256',
    0, 0, 1, 1, 1, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.04, 15.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 2, 'internal',
    '["Apple HomeKit"]',
    3.8, 1500,
    'Danalock V3 Bluetooth Review — European Retrofit Smart Lock 2026',
    'Review of Danalock V3 Bluetooth. European retrofit, HomeKit, AES-256. Compact European smart lock.'
);

-- =====================================================
-- WEISER — (have 1 Halo Touch, adding 2: Premis, Aura)
-- =====================================================

-- Weiser Premis (Apple HomeKit)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='weiser'), 'Premis', 'weiser-premis', 'Apple HomeKit touchscreen deadbolt.', 2019, 22999, 27999, 2);

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
    (SELECT id FROM product_series WHERE slug='weiser-premis'),
    (SELECT id FROM brands WHERE slug='weiser'),
    'Weiser Premis Apple HomeKit Deadbolt', 'weiser-premis-homekit', '9GED25000',
    'Apple HomeKit native touchscreen deadbolt. Bluetooth, Siri voice control, 30 user codes, SmartKey Security.',
    25999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1100, 'AAA', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.06, 120.0, 10,
    30, 0, 0, 50,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit"]',
    4.1, 1200,
    'Weiser Premis Review — Apple HomeKit Smart Lock 2026',
    'Review of Weiser Premis. Apple HomeKit native, Siri, SmartKey. Best Canadian HomeKit smart lock.'
);

-- Weiser Aura (Bluetooth keypad)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='weiser'), 'Aura', 'weiser-aura', 'Bluetooth keypad deadbolt.', 2021, 14999, 17999, 3);

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
    (SELECT id FROM product_series WHERE slug='weiser-aura'),
    (SELECT id FROM brands WHERE slug='weiser'),
    'Weiser Aura Bluetooth Keypad Deadbolt', 'weiser-aura-bluetooth', '9GED14700',
    'Bluetooth keypad deadbolt. SmartKey Security, 250 user codes, app via Kwikset/Weiser app, SecureScreen anti-smudge.',
    16999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 900, 'AAA', 'AES-128',
    0, 1, 1, 0, 1, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.04, 100.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 10, 'internal',
    '["Google Home","Amazon Alexa"]',
    4.0, 800,
    'Weiser Aura Review — Bluetooth Keypad Deadbolt 2026',
    'Review of Weiser Aura. Bluetooth, 250 codes, SmartKey. Affordable Canadian smart deadbolt.'
);

-- =====================================================
-- LATCH — (have 1 M2, adding 1: C2)
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='latch'), 'C2', 'latch-c2', 'Commercial smart lock with camera.', 2023, 0, 0, 2);

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
    (SELECT id FROM product_series WHERE slug='latch-c2'),
    (SELECT id FROM brands WHERE slug='latch'),
    'Latch C2 Smart Deadbolt with Camera', 'latch-c2', 'LATCH-C2',
    'Commercial-grade smart deadbolt with built-in camera and intercom. WiFi, NFC credentials, doorbell, visitor log. For multifamily.',
    0, 'wifi', 'bluetooth', 0,
    'hardwired', 0, 0, 1500, '1', 'AES-256',
    0, 1, 1, 0, 0, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    1.00, 500.0, 500,
    9999, 0, 9999, 9999,
    '2.4GHz', 30, 'internal',
    '["Latch OS"]',
    4.0, 200,
    'Latch C2 Review — Commercial Smart Lock with Camera 2026',
    'Review of Latch C2. Built-in camera, intercom, NFC, hardwired. Best commercial multifamily smart lock.'
);

-- =====================================================
-- SIFELY — (have 1, adding 1: Sifely Smart Lock)
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='sifely'), 'Sifely Keyless Entry', 'sifely-keyless-entry', 'Budget fingerprint deadbolt.', 2022, 7999, 10999, 2);

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
    (SELECT id FROM product_series WHERE slug='sifely-keyless-entry'),
    (SELECT id FROM brands WHERE slug='sifely'),
    'Sifely Keyless Entry Smart Lock', 'sifely-keyless-entry', 'SIFELY-KE',
    'Budget fingerprint + keypad deadbolt. App control via Bluetooth, auto-lock, anti-peep PIN, 100 fingerprints.',
    8999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 950, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.04, 100.0, 10,
    50, 100, 0, 50,
    '2.4GHz', 5, 'internal',
    '["TTLock"]',
    3.8, 3000,
    'Sifely Keyless Entry Review — Budget Fingerprint Deadbolt 2026',
    'Review of Sifely Keyless Entry. Fingerprint, Bluetooth, under $90. Best ultra-budget fingerprint smart lock.'
);

-- =====================================================
-- HORNBILL — (have 1 Y4, adding 1: Y3)
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='hornbill'), 'Y3', 'hornbill-y3', 'Budget keypad smart deadbolt.', 2022, 5999, 7999, 2);

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
    (SELECT id FROM product_series WHERE slug='hornbill-y3'),
    (SELECT id FROM brands WHERE slug='hornbill'),
    'Hornbill Y3 WiFi Keypad Smart Deadbolt', 'hornbill-y3-wifi', 'Y3-WIFI',
    'Budget WiFi keypad deadbolt. App control, eKey sharing, auto-lock, Alexa/Google compatible. Under $80.',
    6999, 'wifi', 'bluetooth', 0,
    'AA', 4, 10, 900, '0', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.08, 150.0, 10,
    50, 0, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 4000,
    'Hornbill Y3 Review — Budget WiFi Keypad Deadbolt 2026',
    'Review of Hornbill Y3. WiFi, keypad, under $70, Alexa. Best ultra-budget WiFi smart deadbolt.'
);

-- =====================================================
-- SMONET — (have 1, adding 1)
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='smonet'), 'Fingerprint Handle Lock', 'smonet-fingerprint-handle', 'Smart handle lock with fingerprint.', 2022, 8999, 11999, 2);

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
    (SELECT id FROM product_series WHERE slug='smonet-fingerprint-handle'),
    (SELECT id FROM brands WHERE slug='smonet'),
    'SMONET WiFi Fingerprint Handle Lock', 'smonet-fingerprint-handle-wifi', 'ZNS-H002',
    'Budget WiFi handle lock. Fingerprint, PIN, IC card, physical key, app, voice control. Reversible handle.',
    10999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1500, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.08, 150.0, 10,
    100, 100, 100, 100,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 2500,
    'SMONET Handle Lock Review — Budget WiFi Fingerprint Handle 2026',
    'Review of SMONET handle lock. Fingerprint, WiFi, under $110. Best budget WiFi handle smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 7
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'alfred-db1-bluetooth', 'august-smart-lock-3rd-gen',
    'switchbot-lock-original', 'danalock-v3-bluetooth',
    'weiser-premis-homekit', 'weiser-aura-bluetooth',
    'sifely-keyless-entry', 'nuki-smart-lock-go',
    'samsung-shp-dh538', 'samsung-shs-p718'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'nuki-smart-lock-ultra', 'latch-c2',
    'kaadas-k9-fingerprint', 'hornbill-y3-wifi',
    'smonet-fingerprint-handle-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'z-wave' FROM products WHERE slug IN (
    'alfred-ml2-zwave', 'kaadas-ka210-zwave'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'thread' FROM products WHERE slug IN (
    'nuki-smart-lock-ultra', 'nuki-smart-lock-go'
);

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug IN (
    'nuki-smart-lock-ultra', 'nuki-smart-lock-go'
);

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'samsung-shp-dh538', 'samsung-shs-p718',
    'igloohome-mortise-2-plus', 'kaadas-k9-fingerprint',
    'sifely-keyless-entry', 'smonet-fingerprint-handle-wifi'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'alfred-db1-bluetooth', 'alfred-ml2-zwave',
    'samsung-shp-dh538', 'samsung-shs-p718',
    'kaadas-k9-fingerprint', 'kaadas-ka210-zwave',
    'weiser-premis-homekit', 'weiser-aura-bluetooth',
    'sifely-keyless-entry', 'hornbill-y3-wifi',
    'smonet-fingerprint-handle-wifi', 'latch-c2'
);

-- Camera tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug = 'latch-c2';

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'august-smart-lock-3rd-gen', 'switchbot-lock-original',
    'danalock-v3-bluetooth', 'nuki-smart-lock-ultra',
    'nuki-smart-lock-go'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'hornbill-y3-wifi', 'sifely-keyless-entry',
    'switchbot-lock-original', 'smonet-fingerprint-handle-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'alfred-db1-bluetooth', 'august-smart-lock-3rd-gen',
    'danalock-v3-bluetooth', 'weiser-aura-bluetooth',
    'nuki-smart-lock-go', 'kaadas-ka210-zwave',
    'weiser-premis-homekit', 'igloohome-keybox-3'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'alfred-ml2-zwave', 'nuki-smart-lock-ultra',
    'samsung-shp-dh538', 'samsung-shs-p718',
    'igloohome-mortise-2-plus', 'kaadas-k9-fingerprint',
    'latch-c2'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'august-smart-lock-3rd-gen', 'switchbot-lock-original',
    'danalock-v3-bluetooth', 'nuki-smart-lock-go'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'alfred-ml2-zwave', 'igloohome-keybox-3',
    'igloohome-mortise-2-plus', 'latch-c2',
    'kaadas-ka210-zwave'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug IN (
    'alfred-ml2-zwave', 'latch-c2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'nuki-smart-lock-ultra', 'weiser-premis-homekit',
    'kaadas-ka210-zwave'
);
