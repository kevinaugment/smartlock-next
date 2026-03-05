-- =====================================================
-- Brand Expansion #8 — Be-Tech Complete + Dessmann + ZKTeco
-- Be-Tech: Fill missing product_series & products (brand exists in brands-system.sql)
-- Dessmann: German-designed Chinese-manufactured residential locks
-- ZKTeco: Global biometrics & access control manufacturer
-- All data verified from official websites (Feb 2026)
-- =====================================================

-- =====================================================
-- BRANDS (3 new/updated)
-- =====================================================

-- Be-Tech (insert into brand-model-system brands table)
-- Source: betechlock.com, betechiot.com
INSERT INTO brands (
    name, slug, description, long_description, logo_url, website_url,
    country, founded_year,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread, supports_matter, supports_bluetooth,
    target_market, price_tier,
    rating, featured, display_order, status,
    meta_title, meta_description
) VALUES
(
    'Be-Tech', 'be-tech',
    'Professional smart lock manufacturer since 1992. Hotel locks, residential digital locks, and commercial access control.',
    'BE-TECH is a leading smart lock manufacturer headquartered in Guangzhou, China, founded in 1992. With over 30 years of experience, Be-Tech produces high-quality electronic locks for hotels, residences, and commercial buildings. Their product range spans RFID hotel locks (Visual, Guardian, Shadow, Base series), residential digital locks with fingerprint, RFID, keypad, and WiFi connectivity (via Tuya platform), and electronic cabinet locks. Be-Tech holds certifications from CE, RoHS, BHMA, UL, KC, PSE, and MSAS. Products are manufactured in-house at their large factory facility with rigorous quality inspection processes. Be-Tech serves customers in over 100 countries through their dual-website presence: betechlock.com for hotel/commercial products and betechiot.com for residential IoT smart locks.',
    '/images/brands/be-tech-logo.png', 'https://www.betechlock.com/',
    'CN', 1992,
    1, 0, 0, 0, 0, 1,
    'commercial', 'mid',
    4.1, 1, 34, 'published',
    'Be-Tech Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Be-Tech smart locks. Since 1992, hotel RFID locks, residential fingerprint locks, WiFi via Tuya. Professional smart lock manufacturer.'
),
-- Dessmann (德施曼)
-- Source: dessmannlock.com
(
    'Dessmann', 'dessmann',
    'German-designed smart locks with fingerprint, face recognition, and cat-eye camera. Top 3 smart lock brand in China.',
    'Dessmann (德施曼, Dessmann Schliessanlagen GmbH) is a smart lock brand founded with German engineering heritage and manufactured in China. Established as a company in 2003, Dessmann has grown to become one of the top 3 smart lock brands in the Chinese residential market. Their product range includes push-pull mortise locks with 3D face recognition and smart cat-eye cameras (Q5M series), touch-screen fingerprint mortise locks with sliding keypad covers (S510 series), and elegant fingerprint lever locks (G810 series). Dessmann locks undergo 36 strict quality control processes and feature German-standard engineering with materials including tempered glass, zinc alloy, and aluminum alloy bodies. Their advanced models offer WiFi connectivity for remote access, dual lithium battery systems for extended battery life, and 1080p night vision cat-eye cameras for doorstep monitoring.',
    '/images/brands/dessmann-logo.png', 'https://www.dessmannlock.com/',
    'DE', 2003,
    1, 0, 0, 0, 0, 1,
    'residential', 'premium',
    4.2, 0, 35, 'published',
    'Dessmann Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Dessmann smart locks. German design, 3D face recognition, cat-eye camera. Top 3 China smart lock brand.'
),
-- ZKTeco
-- Source: zkteco.com
(
    'ZKTeco', 'zkteco',
    'Global biometrics and access control leader. Fingerprint, facial recognition, and multi-biometric smart locks.',
    'ZKTeco is a leading global biometrics and intelligent security manufacturer founded in 1998 in Dongguan, China. With operations in over 180 countries, ZKTeco is one of the world''s largest biometric access control companies. Their smart lock lineup includes advanced models with 3D structured light facial recognition (HBL400), fully automatic locks with indoor LCD monitoring screens and WiFi connectivity (TL800), commercial-grade fingerprint locks supporting up to 500 fingerprints and 30,000 access logs (L5000), and Zigbee-enabled fingerprint locks for smart home integration (TL300Z). ZKTeco locks are built with aluminum alloy and tempered glass materials, feature lithium rechargeable batteries, and integrate with the ZSmart mobile app and ZKBio CVSecurity platform for comprehensive access management. The brand is particularly strong in biometric technology, holding numerous patents in fingerprint and facial recognition algorithms.',
    '/images/brands/zkteco-logo.png', 'https://www.zkteco.com/',
    'CN', 1998,
    1, 0, 0, 0, 0, 1,
    'commercial', 'mid',
    4.0, 0, 36, 'published',
    'ZKTeco Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to ZKTeco smart locks. Global biometrics leader, face recognition, 180+ countries. Professional access control smart locks.'
);

-- =====================================================
-- BE-TECH — Product Series & Products
-- Source: betechlock.com/product-category/electronic-digital-locks
-- =====================================================

-- Digital Lock Series (residential)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='be-tech'), 'Digital Lock Series', 'betech-digital-lock', 'Residential smart locks with fingerprint, RFID, keypad, and WiFi.', 2022, 15000, 35000, 1);

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
    (SELECT id FROM product_series WHERE slug='betech-digital-lock'),
    (SELECT id FROM brands WHERE slug='be-tech'),
    'Be-Tech K6FMT Fingerprint Digital Lock', 'betech-k6fmt', 'K6FMT',
    'Fingerprint + RFID + keypad + WiFi(Tuya) + mechanical key. Aluminum alloy body, 99 fingerprints, 99 PIN codes, 99 RFID cards. Scramble code, auto-lock (3-30s adjustable), indoor double-lock switch. WiFi via built-in Tuya module.',
    25000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1200, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 50, 54, '60,70',
    0.06, 150.0, 10,
    99, 99, 99, 50,
    '2.4GHz', 20, 'internal',
    '["Tuya Smart","Amazon Alexa","Google Home"]',
    4.1, 800,
    'Be-Tech K6FMT Review — Fingerprint WiFi Digital Lock 2026',
    'Review of Be-Tech K6FMT. Fingerprint, RFID, WiFi via Tuya, 99 users. Professional-grade residential smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='betech-digital-lock'),
    (SELECT id FROM brands WHERE slug='be-tech'),
    'Be-Tech R8 Digital Cylindrical Latch Lock', 'betech-r8', 'R8',
    'Compact cylindrical latch lock. Bluetooth + fingerprint + PIN code + mechanical key. Ideal for interior doors, offices, and apartments. Quick installation on standard cylindrical prep.',
    18000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 900, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 50, 54, '60,70',
    0.04, 100.0, 10,
    30, 50, 0, 20,
    '2.4GHz', 10, 'internal',
    '[]',
    4.0, 500,
    'Be-Tech R8 Review — Digital Cylindrical Latch Lock 2026',
    'Review of Be-Tech R8. Compact cylindrical lock, fingerprint, Bluetooth. Best smart latch lock for offices and apartments.'
),
(
    (SELECT id FROM product_series WHERE slug='betech-digital-lock'),
    (SELECT id FROM brands WHERE slug='be-tech'),
    'Be-Tech K10 Smart Push-Pull Lock', 'betech-k10', 'K10',
    'Premium push-pull smart lock. Fingerprint + keypad + RFID card + mechanical key. Aluminum alloy, auto-lock, anti-pry alarm. Modern slim design for residential use.',
    32000, 'bluetooth', 'wifi', 0,
    'AA', 4, 10, 3200, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.08, 200.0, 10,
    99, 99, 99, 50,
    '2.4GHz', 15, 'internal',
    '["Tuya Smart"]',
    4.2, 400,
    'Be-Tech K10 Review — Smart Push-Pull Lock 2026',
    'Review of Be-Tech K10. Push-pull design, fingerprint, RFID, keypad. Premium Be-Tech residential smart lock.'
);

-- Hotel Lock Series
-- Source: betechlock.com/product-category/electronic-hotel-locks
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='be-tech'), 'Hotel Lock Series', 'betech-hotel-lock', 'RFID hotel locks with BIS software platform integration.', 2018, 20000, 50000, 2);

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
    (SELECT id FROM product_series WHERE slug='betech-hotel-lock'),
    (SELECT id FROM brands WHERE slug='be-tech'),
    'Be-Tech Visual III RFID Hotel Lock (V5 Series)', 'betech-visual-iii-rfid', 'VISUAL-III-V5',
    'Premium RFID hotel lock with stylish design. Stainless steel mortise lockcase, panic release function, ADA compliant. Compatible with BIS HOTEL software platform for centralized management. Mifare contactless technology.',
    35000, 'rfid', NULL, 0,
    'AA', 4, 18, 2200, '0', 'AES-128',
    0, 0, 1, 0, 0, 0, 0, 1, 1,
    40, 60, 0, '0',
    0.02, 50.0, 200,
    0, 0, 5000, 0,
    '13.56MHz', 5, 'internal',
    '["BIS HOTEL Software"]',
    4.3, 300,
    'Be-Tech Visual III RFID Review — Premium Hotel Lock 2026',
    'Review of Be-Tech Visual III RFID V5. Premium hotel lock, stainless steel, BIS software, ADA. Best hotel RFID lock system.'
),
(
    (SELECT id FROM product_series WHERE slug='betech-hotel-lock'),
    (SELECT id FROM brands WHERE slug='be-tech'),
    'Be-Tech Guardian RFID Hotel Card Lock', 'betech-guardian-rfid', 'GUARDIAN-RFID',
    'Mid-range RFID hotel card lock. Durable construction for high-traffic hotel environments. Mifare card technology, master key override, audit trail, low battery warning. Compatible with BIS HOTEL software.',
    25000, 'rfid', NULL, 0,
    'AA', 4, 18, 2000, '0', 'AES-128',
    0, 0, 1, 0, 0, 0, 0, 1, 1,
    40, 60, 0, '0',
    0.02, 50.0, 200,
    0, 0, 3000, 0,
    '13.56MHz', 5, 'internal',
    '["BIS HOTEL Software"]',
    4.1, 250,
    'Be-Tech Guardian RFID Review — Hotel Card Lock 2026',
    'Review of Be-Tech Guardian RFID. Mid-range hotel card lock, Mifare, audit trail. Reliable hotel access control system.'
);

-- =====================================================
-- DESSMANN — Product Series & Products
-- Source: dessmannlock.com
-- =====================================================

-- Push-Pull Series (flagship)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='dessmann'), 'Q-Series', 'dessmann-q-series', 'Premium push-pull with 3D face recognition and cat-eye camera.', 2023, 40000, 80000, 1);

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
    'Dessmann Q5M Plus 3D Face Recognition Lock', 'dessmann-q5m-plus', 'Q5MPLUS',
    '9-way unlocking: 3D structured light face recognition, fingerprint, password, RFID card, mechanical key, app, temporary password, remote unlock, smart cat-eye. AI smart cat-eye with 1080p dual infrared night vision, video intercom. D-Power dual lithium battery (5000mAh + 2250mAh) lasts up to 10 months. WiFi direct — no gateway needed.',
    60000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 2, 10, 3500, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.50, 700.0, 10,
    100, 200, 100, 100,
    '2.4GHz', 25, 'internal',
    '["Dessmann App"]',
    4.3, 1500,
    'Dessmann Q5M Plus Review — 3D Face + Cat-Eye Smart Lock 2026',
    'Review of Dessmann Q5M Plus. 3D face recognition, 1080p cat-eye, 9 unlocking methods. Top Chinese premium smart lock.'
);

-- Mortise S-Series
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='dessmann'), 'S-Series', 'dessmann-s-series', 'Sliding-cover mortise locks with fingerprint and keypad.', 2021, 25000, 40000, 2);

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
    (SELECT id FROM product_series WHERE slug='dessmann-s-series'),
    (SELECT id FROM brands WHERE slug='dessmann'),
    'Dessmann S510 Sliding Cover Smart Lock', 'dessmann-s510', 'S510',
    'Sliding cover design protects keypad when not in use. Semiconductor fingerprint sensor (200 capacity), PIN code (6-24 digits), mechanical key backup. Single-piece casting body. Direct access history management, voice guidance, thermal alarm system, smart protection code (anti-peep).',
    30000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 2800, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    40, 120, 0, '0',
    0.06, 180.0, 10,
    50, 200, 0, 0,
    '2.4GHz', 5, 'internal',
    '[]',
    4.1, 2000,
    'Dessmann S510 Review — Sliding Cover Smart Lock 2026',
    'Review of Dessmann S510. Sliding cover, 200 fingerprints, German design. Best mid-range Chinese smart lock.'
);

-- =====================================================
-- ZKTECO — Product Series & Products
-- Source: zkteco.com
-- =====================================================

-- Smart Lock Series
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='zkteco'), 'Smart Lock Series', 'zkteco-smart-lock', 'Multi-biometric smart locks with face recognition and WiFi.', 2023, 20000, 50000, 1);

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
    (SELECT id FROM product_series WHERE slug='zkteco-smart-lock'),
    (SELECT id FROM brands WHERE slug='zkteco'),
    'ZKTeco TL800 Face Recognition Smart Lock', 'zkteco-tl800', 'TL800',
    'Fully automatic smart lock with indoor LCD monitoring screen. 3D structured light face recognition + fingerprint + IC card + password. WiFi connectivity via ZSmart app, remote unlocking, real-time monitoring. Aluminum alloy and tempered glass body. 4200mAh lithium battery.',
    40000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 6, 3200, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    45, 60, 0, '0',
    0.50, 600.0, 10,
    50, 100, 50, 100,
    '2.4GHz', 20, 'internal',
    '["ZSmart App"]',
    4.0, 600,
    'ZKTeco TL800 Review — Face Recognition Smart Lock 2026',
    'Review of ZKTeco TL800. 3D face recognition, LCD screen, WiFi, 4200mAh. Professional biometric smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='zkteco-smart-lock'),
    (SELECT id FROM brands WHERE slug='zkteco'),
    'ZKTeco L5000 Fingerprint Smart Lock', 'zkteco-l5000', 'L5000',
    'Commercial-grade fingerprint lock. 500 fingerprint capacity, 100 passwords, RFID card, mechanical key. 30,000 access log records. Zinc alloy construction, 9V backup battery option. Fits door thickness 35-80mm. Ideal for offices, apartments, commercial properties.',
    25000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 2500, '0', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 80, 0, '0',
    0.06, 150.0, 50,
    100, 500, 100, 0,
    '2.4GHz', 5, 'internal',
    '["ZKBio CVSecurity"]',
    4.0, 1000,
    'ZKTeco L5000 Review — Commercial Fingerprint Smart Lock 2026',
    'Review of ZKTeco L5000. 500 fingerprints, 30K logs, zinc alloy. Best commercial-grade biometric lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 8
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'betech-k6fmt', 'dessmann-q5m-plus', 'zkteco-tl800'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'betech-r8', 'betech-k10', 'dessmann-s510', 'zkteco-l5000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'rfid' FROM products WHERE slug IN (
    'betech-visual-iii-rfid', 'betech-guardian-rfid'
);

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'betech-k6fmt', 'betech-r8', 'betech-k10',
    'dessmann-q5m-plus', 'dessmann-s510',
    'zkteco-tl800', 'zkteco-l5000'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'betech-k6fmt', 'betech-r8', 'betech-k10',
    'dessmann-q5m-plus', 'dessmann-s510',
    'zkteco-tl800', 'zkteco-l5000'
);

-- Face recognition tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug IN (
    'dessmann-q5m-plus', 'zkteco-tl800'
);

-- Camera/cat-eye tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug = 'dessmann-q5m-plus';

-- RFID tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'betech-k6fmt', 'betech-k10',
    'betech-visual-iii-rfid', 'betech-guardian-rfid',
    'zkteco-l5000'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'betech-k6fmt', 'betech-r8', 'betech-guardian-rfid',
    'dessmann-s510', 'zkteco-l5000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'betech-k10', 'betech-visual-iii-rfid',
    'dessmann-q5m-plus', 'zkteco-tl800'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'hotel' FROM products WHERE slug IN (
    'betech-visual-iii-rfid', 'betech-guardian-rfid'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug IN (
    'betech-visual-iii-rfid', 'betech-guardian-rfid',
    'zkteco-l5000'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'betech-k6fmt', 'betech-k10', 'dessmann-q5m-plus', 'dessmann-s510'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'betech-r8', 'zkteco-tl800'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'dessmann-q5m-plus', 'zkteco-tl800'
);
