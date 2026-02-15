-- =====================================================
-- Brand Expansion #6 — Complete Product Lineup from Official Websites
-- Fills ALL missing products identified by scanning brand websites
-- =====================================================

-- =====================================================
-- YALE — Missing Products (have 5, adding 5 more)
-- =====================================================

-- Yale Assure Lock 2 Touch (fingerprint)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Assure Lock 2 Touch', 'yale-assure-lock-2-touch', 'Biometric smart lock with fingerprint access.', 2024, 24999, 29999, 4);

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
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-2-touch'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock 2 Touch WiFi', 'yale-assure-lock-2-touch-wifi', 'YRD450-WF1',
    'Advanced biometric deadbolt with fingerprint sensor + keypad. Built-in WiFi, 25 fingerprints, 250 codes, DoorSense.',
    27999, 'wifi', 'bluetooth', 0,
    'CR2', 2, 12, 900, '2', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 250.0, 10,
    250, 25, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 1800,
    'Yale Assure Lock 2 Touch Review — Fingerprint WiFi Deadbolt 2026',
    'Review of Yale Assure Lock 2 Touch. Fingerprint biometric, WiFi, DoorSense. Best Yale fingerprint smart lock.'
);

-- Yale Assure Lock 2 Plus (Apple Home Key)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Assure Lock 2 Plus', 'yale-assure-lock-2-plus', 'Apple Home Key + Thread smart lock.', 2024, 27999, 29999, 5);

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
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-2-plus'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock 2 Plus', 'yale-assure-lock-2-plus', 'YRD420-PLUS',
    'Made for Apple users — tap-and-go with Apple Home Key via NFC. Thread + Matter support, DoorSense, keypad.',
    29999, 'thread', 'bluetooth', 1,
    'CR2', 2, 12, 900, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 200.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa"]',
    4.6, 1200,
    'Yale Assure Lock 2 Plus Review — Apple Home Key Smart Lock 2026',
    'Review of Yale Assure Lock 2 Plus. Apple Home Key NFC, Thread, Matter. Best Yale lock for Apple ecosystem.'
);

-- Nest x Yale Lock
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Nest x Yale Lock', 'nest-x-yale', 'Modern lock for Google Nest ecosystem.', 2019, 17999, 22999, 6);

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
    (SELECT id FROM product_series WHERE slug='nest-x-yale'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Nest x Yale Lock', 'nest-x-yale-lock', 'RB-YRD540-WV',
    'Keyless deadbolt designed for Google Nest. Touch keypad, no physical key. Works with Google Nest Hub and Nest Connect.',
    21999, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 900, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    0.10, 200.0, 10,
    250, 0, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Google Home","Google Nest"]',
    4.2, 5500,
    'Nest x Yale Lock Review — Google Home Smart Deadbolt 2026',
    'Review of Nest x Yale. Keyless, Google Nest integration, touchpad. Best smart lock for Google Home users.'
);

-- Yale Smart Lock with Matter
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Smart Lock with Matter', 'yale-matter-lock', 'Matter-enabled smart lock for Google Home.', 2024, 19999, 24999, 7);

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
    (SELECT id FROM product_series WHERE slug='yale-matter-lock'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Smart Lock with Matter', 'yale-smart-lock-matter', 'YRD-MATTER',
    'Built-in Matter/Thread for seamless Google Home integration. Keypad, auto-lock, DoorSense, no hub required.',
    22999, 'thread', 'bluetooth', 1,
    'CR2', 2, 12, 850, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.10, 180.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.3, 800,
    'Yale Smart Lock with Matter Review — Thread Smart Lock 2026',
    'Review of Yale Smart Lock with Matter. Thread, Google Home native, no hub. Best Matter-first smart lock.'
);

-- Yale Code Keypad Lock
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Code Keypad Lock', 'yale-code-keypad', 'Beginner-friendly affordable keypad lock.', 2024, 7999, 9999, 8);

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
    (SELECT id FROM product_series WHERE slug='yale-code-keypad'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Code Keypad Lock', 'yale-code-keypad-lock', 'YRD-CODE',
    'Beginner-friendly, affordable key-free entry with auto-lock. No app, no smart home — just a simple keypad deadbolt.',
    8999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 750, '2', 'AES-128',
    0, 1, 1, 0, 0, 0, 1, 0, 1,
    35, 57, 54, '60,70',
    0.03, 100.0, 10,
    25, 0, 0, 0,
    NULL, 0, NULL,
    '[]',
    4.0, 2000,
    'Yale Code Keypad Lock Review — Simplest Smart Lock 2026',
    'Review of Yale Code Keypad Lock. No app needed, just a keypad. Best beginner-friendly affordable smart lock.'
);

-- =====================================================
-- SCHLAGE — Missing Products (have 3, adding 2 more)
-- =====================================================

-- Schlage Arrive
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='schlage'), 'Arrive', 'schlage-arrive', 'Push-button keypad smart lock.', 2024, 19999, 24999, 4);

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
    (SELECT id FROM product_series WHERE slug='schlage-arrive'),
    (SELECT id FROM brands WHERE slug='schlage'),
    'Schlage Arrive Smart Lock', 'schlage-arrive-wifi', 'FE789WP',
    'Trusted security with modern push-button keypad. Built-in WiFi, ANSI Grade 1, Schlage Home app, 100 codes.',
    22999, 'wifi', 'bluetooth', 0,
    'CR2', 2, 12, 1100, '1', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 250.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Ring"]',
    4.4, 800,
    'Schlage Arrive Review — Push-Button WiFi Smart Lock 2026',
    'Review of Schlage Arrive. Push-button keypad, WiFi, ANSI Grade 1. Trusted Schlage security, modern design.'
);

-- Schlage Encode Lever
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='schlage'), 'Encode Lever', 'schlage-encode-lever', 'WiFi smart lever handle.', 2024, 22999, 27999, 5);

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
    (SELECT id FROM product_series WHERE slug='schlage-encode-lever'),
    (SELECT id FROM brands WHERE slug='schlage'),
    'Schlage Encode WiFi Lever', 'schlage-encode-lever-wifi', 'FE789WP-LEV',
    'Smart lever handle with built-in WiFi. No deadbolt needed — for interior or secondary doors. ANSI Grade 1.',
    25999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1200, '1', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 0, '60,70',
    0.12, 220.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Ring"]',
    4.3, 500,
    'Schlage Encode Lever Review — WiFi Smart Handle Lock 2026',
    'Review of Schlage Encode Lever. WiFi lever handle, no deadbolt, ANSI Grade 1. Best smart lever handle.'
);

-- =====================================================
-- KWIKSET — Missing Products (have 5, adding 2 more)
-- =====================================================

-- Kwikset Halo Select Plus (newest, Matter + Apple Home Key)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kwikset'), 'Halo Select Plus', 'kwikset-halo-select-plus', 'WiFi + Matter + Apple Home Keys smart lock.', 2025, 27999, 32999, 6);

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
    (SELECT id FROM product_series WHERE slug='kwikset-halo-select-plus'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Halo Select Plus', 'kwikset-halo-select-plus-wifi', '99590-004',
    'Premium WiFi + Matter deadbolt with Apple Home Keys. Touchscreen, SmartKey Security, SecureScreen, BHMA AAA.',
    29999, 'wifi', 'thread', 1,
    'CR2', 2, 12, 1100, 'AAA', 'AES-256',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 280.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 600,
    'Kwikset Halo Select Plus Review — Apple Home Key + Matter 2026',
    'Review of Kwikset Halo Select Plus. Apple Home Key, WiFi, Matter, BHMA AAA. Kwikset''s best smart lock.'
);

-- Kwikset Aura Reach (Matter + Bluetooth)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kwikset'), 'Aura Reach', 'kwikset-aura-reach', 'Matter + Bluetooth affordable smart lock.', 2024, 14999, 17999, 7);

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
    (SELECT id FROM product_series WHERE slug='kwikset-aura-reach'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Aura Reach', 'kwikset-aura-reach-matter', '9400-BLE',
    'Affordable Matter + Bluetooth keypad deadbolt. SmartKey Security, button keypad, BHMA AAA. No WiFi needed with Thread.',
    16999, 'bluetooth', 'thread', 1,
    'AA', 4, 12, 900, 'AAA', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.06, 120.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.2, 400,
    'Kwikset Aura Reach Review — Affordable Matter Smart Lock 2026',
    'Review of Kwikset Aura Reach. Matter, Bluetooth, BHMA AAA, under $170. Most affordable Matter smart lock.'
);

-- =====================================================
-- LOCKLY — Missing Products (have 4, adding 5 more)
-- =====================================================

-- Lockly Vision Elite
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='lockly'), 'Vision Elite', 'lockly-vision-elite', 'Premium video smart lock with HD camera.', 2024, 39999, 44999, 3);

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
    (SELECT id FROM product_series WHERE slug='lockly-vision-elite'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Vision Elite Video Smart Lock', 'lockly-vision-elite', 'PGD798VE',
    'Premium video lock with HD camera, two-way intercom, fingerprint, PIN Genie rotating keypad. WiFi, local storage.',
    42999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 3, 1800, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    1.00, 800.0, 10,
    99, 99, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.3, 600,
    'Lockly Vision Elite Review — Premium Video Smart Lock 2026',
    'Review of Lockly Vision Elite. HD camera, intercom, PIN Genie, fingerprint. Best premium video smart lock.'
);

-- Lockly Secure Pro Latch
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='lockly'), 'Secure Pro Latch', 'lockly-secure-pro-latch', 'Smart latch lock with dual keypad.', 2024, 29999, 34999, 4);

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
    (SELECT id FROM product_series WHERE slug='lockly-secure-pro-latch'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Secure Pro Latch WiFi', 'lockly-secure-pro-latch-wifi', 'PGD728W-L',
    'Smart latch lock with dual Quick-Switch keypad. PIN Genie rotating keypad, fingerprint, WiFi. For doors without deadbolts.',
    32999, 'wifi', 'bluetooth', 0,
    'AA', 4, 9, 1200, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 0, '60,70',
    0.12, 250.0, 10,
    99, 99, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 800,
    'Lockly Secure Pro Latch Review — Smart Latch Lock 2026',
    'Review of Lockly Secure Pro Latch. Latch style, PIN Genie, fingerprint, WiFi. Best smart lever lock.'
);

-- Lockly Secure Pro Zeno
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
    (SELECT id FROM product_series WHERE slug='lockly-secure-pro-latch'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Secure Pro Zeno Fingerprint Deadbolt', 'lockly-secure-pro-zeno', 'PGD728Z',
    'Zeno series fingerprint deadbolt with 3D biometric sensor, PIN Genie, Bluetooth. Sleek modern design.',
    24999, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 1100, '2', 'AES-256',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.06, 120.0, 10,
    99, 99, 0, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.1, 500,
    'Lockly Secure Pro Zeno Review — Sleek Fingerprint Deadbolt 2026',
    'Review of Lockly Secure Pro Zeno. 3D fingerprint, PIN Genie, modern Zeno design. Best-looking Lockly.'
);

-- Lockly Access Touch Pro
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
    (SELECT id FROM product_series WHERE slug='lockly-flex-touch'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Access Touch Pro Fingerprint Deadbolt', 'lockly-access-touch-pro', 'PGD-ATP',
    'Compact fingerprint deadbolt with 3D biometric sensor. Bluetooth app control, PIN codes, physical key backup.',
    19999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 950, '2', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 57, 54, '60,70',
    0.04, 100.0, 10,
    99, 99, 0, 50,
    '2.4GHz', 10, 'internal',
    '[]',
    4.0, 700,
    'Lockly Access Touch Pro Review — Compact Fingerprint Deadbolt 2026',
    'Review of Lockly Access Touch Pro. Compact fingerprint, Bluetooth, budget. Best value Lockly fingerprint lock.'
);

-- Lockly Secure Pro HT (High Traffic)
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
    (SELECT id FROM product_series WHERE slug='lockly-secure-pro-latch'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Secure Pro HT High Traffic Deadbolt', 'lockly-secure-pro-ht', 'PGD728HT',
    'High-traffic edition for Airbnb/rental. Industrial-grade motor, 300+ daily operations, WiFi, PIN Genie, fingerprint.',
    34999, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 1200, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 280.0, 300,
    99, 99, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 400,
    'Lockly Secure Pro HT Review — High Traffic Rental Lock 2026',
    'Review of Lockly Secure Pro HT. 300+ daily ops, PIN Genie, WiFi. Best smart lock for Airbnb hosts.'
);

-- =====================================================
-- LEVEL — Missing Product (have 3, adding 1)
-- =====================================================

-- Level Lock Pro (newest)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='level'), 'Lock Pro', 'level-lock-pro', 'Latest invisible lock with Matter.', 2024, 34900, 34900, 3);

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
    (SELECT id FROM product_series WHERE slug='level-lock-pro'),
    (SELECT id FROM brands WHERE slug='level'),
    'Level Lock Pro', 'level-lock-pro', 'B1',
    'Latest invisible smart lock. Apple Home Key, Matter/Thread native, BHMA AAA. CR2 battery, fits inside deadbolt.',
    34900, 'thread', 'bluetooth', 1,
    'CR2', 1, 12, 200, 'AAA', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    44, 51, 54, '60,70',
    0.02, 8.0, 10,
    0, 0, 0, 50,
    '2.4GHz', 5, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.6, 800,
    'Level Lock Pro Review — Ultimate Invisible Smart Lock 2026',
    'Review of Level Lock Pro. Apple Home Key, Matter/Thread, BHMA AAA, invisible. The smartest smart lock.'
);

-- =====================================================
-- TEDEE — Missing Product (have 1, adding 1)
-- =====================================================

-- Tedee GO (budget European retrofit)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='tedee'), 'Tedee GO', 'tedee-go', 'Affordable European retrofit smart lock.', 2023, 19900, 22900, 2);

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
    (SELECT id FROM product_series WHERE slug='tedee-go'),
    (SELECT id FROM brands WHERE slug='tedee'),
    'Tedee GO Smart Lock', 'tedee-go', 'TGV1.0',
    'Affordable retrofit for European doors. Plastic body, 3x CR123A batteries, 7 months. Bluetooth, app control.',
    19900, 'bluetooth', NULL, 0,
    'CR123A', 3, 7, 210, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.03, 10.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 2, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.0, 3500,
    'Tedee GO Review — Affordable European Retrofit Smart Lock 2026',
    'Review of Tedee GO. Budget European retrofit, Bluetooth, 7-month battery. Best affordable European smart lock.'
);

-- =====================================================
-- WYZE — Missing Product (have 1, adding 1)
-- =====================================================

-- Wyze Lock Bolt (original)
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
    'Wyze Lock Bolt', 'wyze-lock-bolt-original', 'WLCKB1',
    'Ultra-affordable fingerprint + keypad deadbolt. Bluetooth 5.0 only (no WiFi), 50 fingerprints, anti-peep codes, IPX5.',
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
    'Review of Wyze Lock Bolt. Fingerprint + keypad, $70, Bluetooth only. Ultimate budget smart deadbolt.'
);

-- =====================================================
-- SESAME — Missing Product (have 1, adding 1)
-- =====================================================

-- Sesame 5 (original, not Pro)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='sesame'), 'Sesame 5', 'sesame-5', 'Ultra-compact retrofit smart lock.', 2023, 8999, 10999, 2);

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
    (SELECT id FROM product_series WHERE slug='sesame-5'),
    (SELECT id FROM brands WHERE slug='sesame'),
    'Sesame 5 Smart Lock', 'sesame-5', 'SS5',
    'Ultra-compact retrofit at an unbeatable price. Bluetooth, 500-day battery, fits most deadbolts. WiFi via WiFi Module 2.',
    8999, 'bluetooth', NULL, 0,
    'CR123A', 2, 16, 115, '0', 'AES-128',
    0, 0, 1, 1, 0, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.02, 6.0, 50,
    50, 0, 0, 100,
    '2.4GHz', 5, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","IFTTT"]',
    4.2, 2000,
    'Sesame 5 Review — Ultra-Compact $90 Retrofit Lock 2026',
    'Review of Sesame 5. Ultra-compact, 500-day battery, $90. Most affordable retrofit smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 6
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'yale-assure-lock-2-touch-wifi', 'schlage-arrive-wifi', 'schlage-encode-lever-wifi',
    'kwikset-halo-select-plus-wifi', 'lockly-vision-elite',
    'lockly-secure-pro-latch-wifi', 'lockly-secure-pro-ht'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'thread' FROM products WHERE slug IN (
    'yale-assure-lock-2-plus', 'yale-smart-lock-matter',
    'kwikset-halo-select-plus-wifi', 'kwikset-aura-reach-matter',
    'level-lock-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'nest-x-yale-lock', 'yale-code-keypad-lock',
    'lockly-secure-pro-zeno', 'lockly-access-touch-pro',
    'tedee-go', 'wyze-lock-bolt-original', 'sesame-5'
);

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug IN (
    'yale-assure-lock-2-plus', 'yale-smart-lock-matter',
    'kwikset-halo-select-plus-wifi', 'kwikset-aura-reach-matter',
    'level-lock-pro'
);

-- Apple Home Key tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'apple-home-key' FROM products WHERE slug IN (
    'yale-assure-lock-2-plus', 'kwikset-halo-select-plus-wifi', 'level-lock-pro'
);

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'yale-assure-lock-2-touch-wifi', 'lockly-vision-elite',
    'lockly-secure-pro-latch-wifi', 'lockly-secure-pro-zeno',
    'lockly-access-touch-pro', 'lockly-secure-pro-ht',
    'wyze-lock-bolt-original'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'yale-assure-lock-2-touch-wifi', 'yale-assure-lock-2-plus',
    'nest-x-yale-lock', 'yale-smart-lock-matter', 'yale-code-keypad-lock',
    'schlage-arrive-wifi', 'schlage-encode-lever-wifi',
    'kwikset-halo-select-plus-wifi', 'kwikset-aura-reach-matter',
    'lockly-vision-elite', 'lockly-secure-pro-latch-wifi',
    'lockly-secure-pro-zeno', 'lockly-access-touch-pro',
    'lockly-secure-pro-ht', 'wyze-lock-bolt-original'
);

-- Camera tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug = 'lockly-vision-elite';

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'level-lock-pro', 'tedee-go', 'sesame-5'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'yale-code-keypad-lock', 'wyze-lock-bolt-original', 'sesame-5'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'nest-x-yale-lock', 'yale-smart-lock-matter',
    'schlage-arrive-wifi', 'schlage-encode-lever-wifi',
    'kwikset-aura-reach-matter', 'lockly-secure-pro-zeno',
    'lockly-access-touch-pro', 'tedee-go'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'yale-assure-lock-2-touch-wifi', 'yale-assure-lock-2-plus',
    'kwikset-halo-select-plus-wifi', 'lockly-vision-elite',
    'lockly-secure-pro-latch-wifi', 'lockly-secure-pro-ht',
    'level-lock-pro'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apple-ecosystem' FROM products WHERE slug IN (
    'yale-assure-lock-2-plus', 'kwikset-halo-select-plus-wifi', 'level-lock-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'lockly-secure-pro-ht', 'yale-code-keypad-lock'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'yale-assure-lock-2-touch-wifi', 'schlage-arrive-wifi',
    'kwikset-aura-reach-matter'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'tedee-go', 'sesame-5', 'level-lock-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'yale-smart-lock-matter', 'nest-x-yale-lock'
);
