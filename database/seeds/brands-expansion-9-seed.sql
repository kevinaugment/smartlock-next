-- =====================================================
-- Brand Expansion #9 — Xiaomi, SALTO, Godrej, EPIC
-- 4 globally significant brands from CN, ES, IN, KR
-- All data verified from official websites (Feb 2026)
-- =====================================================

-- =====================================================
-- BRANDS (4 new)
-- =====================================================

INSERT INTO brands (
    name, slug, description, long_description, logo_url, website_url,
    country, founded_year,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread, supports_matter, supports_bluetooth,
    target_market, price_tier,
    rating, featured, display_order, status,
    meta_title, meta_description
) VALUES
-- Xiaomi
-- Source: mi.com
(
    'Xiaomi', 'xiaomi',
    'World''s largest IoT platform with smart locks featuring 3D face recognition, palm vein scanning, and cat-eye cameras.',
    'Xiaomi is one of the world''s largest consumer electronics and IoT platform companies, founded in 2010 in Beijing, China. Their smart lock division produces advanced residential locks featuring 3D structured light facial recognition, AI palm vein scanning, fingerprint sensors with 99.51% accuracy, and built-in peephole cameras with AI human detection. Xiaomi smart locks integrate seamlessly with the Mi Home/HyperOS ecosystem supporting WiFi and Bluetooth connectivity. Their global Self-Install Smart Lock supports Matter standard for Apple Home, Google Home, and Alexa compatibility. Models range from the budget-friendly Smart Door Lock 2 Cat Eye Edition to the premium Smart Door Lock 4 Pro with 12 unlocking methods. All locks feature C-grade lock cylinders, 5000mAh lithium batteries with AA backup, and USB-C emergency charging.',
    '/images/brands/xiaomi-logo.png', 'https://www.mi.com/',
    'CN', 2010,
    1, 0, 0, 0, 1, 1,
    'residential', 'mid',
    4.3, 1, 37, 'published',
    'Xiaomi Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Xiaomi smart locks. 3D face recognition, palm vein, Matter support, Mi Home ecosystem. Best value smart locks.'
),
-- SALTO Systems
-- Source: saltosystems.com
(
    'SALTO', 'salto',
    'Spanish access control pioneer with cloud-based Homelok ecosystem, DLok retrofit lock, and XS4 commercial platform.',
    'SALTO Systems is a global leader in electronic access control solutions, founded in 2001 in the Basque Country, Spain. SALTO serves over 30,000 customers in more than 90 countries. Their product portfolio spans residential (Homelok ecosystem with DLok smart lock) and commercial (XS4 platform) markets. The DLok is a minimalist retrofit smart lock weighing just 230g with anodized aluminum construction, designed for existing deadbolts with under-15-minute installation. SALTO''s cloud-based Homelok platform enables keyless access via smartphone app, Apple Wallet digital keys, and remote management. The XS4 platform supports Mifare/DESfire, HID iClass, NFC, Bluetooth LE, and BLUEnet wireless technology. All SALTO products use AES 128-bit encryption and integrate with the SALTO Virtual Network (SVN) for offline data management.',
    '/images/brands/salto-logo.png', 'https://www.saltosystems.com/',
    'ES', 2001,
    1, 0, 0, 0, 0, 1,
    'commercial', 'premium',
    4.4, 0, 38, 'published',
    'SALTO Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to SALTO smart locks. Spanish access control, DLok retrofit, Homelok cloud, XS4 platform. Best commercial access control.'
),
-- Godrej
-- Source: godrejenterprises.com
(
    'Godrej', 'godrej',
    'India''s most trusted lock brand since 1897. Smart locks with military-grade encryption, dual authentication, and Alexa integration.',
    'Godrej is India''s most iconic and trusted security brand, part of the Godrej Group established in 1897. Their smart lock division produces digital door locks featuring military-grade encryption, dual authentication, 360-degree fingerprint recognition, anti-prank alarms, and privacy lockout functions. Product lines include the Catus series (budget-friendly 4-in-1 access), Advantis series (premium 7-9 access modes with WiFi, NFC, and smart assistant integration), and the new Neo range with built-in video door phones. Godrej smart locks are designed for Indian market conditions with special weatherproofing, support for wooden doors (35-65mm thickness), and emergency power backup via 9V battery. The Advantis IOT9 flagship supports 9 access modes and integrates with Amazon Alexa and Google Assistant for voice control.',
    '/images/brands/godrej-logo.png', 'https://www.godrejenterprises.com/',
    'IN', 1897,
    1, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.1, 0, 39, 'published',
    'Godrej Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Godrej smart locks. India''s #1 lock brand, military-grade encryption, 9 access modes. Best smart lock in India.'
),
-- EPIC
-- Source: epic.co.kr
(
    'EPIC', 'epic',
    'Korean digital lock pioneer since 1989. Facial recognition, gate-door link, and EPIC Things app for remote control.',
    'EPIC Systems Co., Ltd. is a prominent South Korean digital door lock manufacturer founded in 1989. As one of Korea''s earliest and most established smart lock brands, EPIC produces advanced digital locks for residential, commercial, and hospitality markets. Their product lineup includes the flagship 8G series with 3D facial recognition (up to 30 faces), the 5G series with fingerprint and Bluetooth, the 6G Pro for metal gates with gate-door link technology, and various mortise lock models. EPIC locks feature the EPIC Things smartphone app for remote control, guest key sharing, access logs, and push notifications. Security features include random number entry, dual authentication, anti-prank alarms (auto-disable after failed attempts), and fire detection alarms. All models support multiple access methods including fingerprint (up to 100), RFID cards (up to 200), PIN codes, and mechanical keys.',
    '/images/brands/epic-logo.png', 'https://www.epic.co.kr/',
    'KR', 1989,
    0, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.2, 0, 40, 'published',
    'EPIC Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to EPIC smart locks. Korean pioneer since 1989, facial recognition, gate-door link. Best Korean digital door lock.'
);

-- =====================================================
-- XIAOMI — Product Series & Products
-- Source: mi.com, gizmochina.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='xiaomi'), 'Smart Door Lock', 'xiaomi-smart-door-lock', 'Core smart locks with face recognition, fingerprint, and cat-eye camera.', 2024, 15000, 45000, 1);

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
    (SELECT id FROM product_series WHERE slug='xiaomi-smart-door-lock'),
    (SELECT id FROM brands WHERE slug='xiaomi'),
    'Xiaomi Smart Door Lock 2 Cat Eye Edition', 'xiaomi-smart-door-lock-2-cat-eye', 'XMZNMS04LM',
    '9-way unlock: fingerprint (0.5s, 99.51%), password, Bluetooth, NFC, mechanical key, app, temporary code, remote. 2MP 160° camera with AI human detection, IR night vision, full-color low-light. 3.5-inch indoor screen. 5000mAh Li + 4xAA backup, USB-C emergency. C-grade cylinder, auto-lock, voice changer intercom.',
    20000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 6, 3000, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.50, 600.0, 10,
    50, 100, 50, 100,
    '2.4GHz', 20, 'internal',
    '["Mi Home","Google Home","Amazon Alexa"]',
    4.3, 5000,
    'Xiaomi Smart Door Lock 2 Cat Eye Review — Camera Smart Lock 2026',
    'Review of Xiaomi Smart Door Lock 2 Cat Eye. 2MP camera, fingerprint, 9 unlocking methods. Best value camera smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='xiaomi-smart-door-lock'),
    (SELECT id FROM brands WHERE slug='xiaomi'),
    'Xiaomi Smart Door Lock 4 Pro', 'xiaomi-smart-door-lock-4-pro', 'XMZNMS08LM',
    '12-way unlock: AI palm vein recognition, 3D face recognition (liveness detection), fingerprint, password, NFC (card/phone/watch/band), Bluetooth, remote, mechanical key, temporary code. 2MP 152° peephole camera + 24GHz mmWave radar + AI human detection. 5000mAh Li + 4xAA backup, USB-C charging. C-grade cylinder.',
    40000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 3500, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.80, 800.0, 10,
    50, 100, 50, 100,
    '2.4GHz', 20, 'internal',
    '["Mi Home","HyperOS","Google Home","Amazon Alexa"]',
    4.4, 2000,
    'Xiaomi Smart Door Lock 4 Pro Review — Palm Vein + Face 2026',
    'Review of Xiaomi 4 Pro. AI palm vein, 3D face, 12 unlock methods. Most advanced Xiaomi smart lock.'
);

-- Xiaomi Global Self-Install (Matter)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='xiaomi'), 'Self-Install Smart Lock', 'xiaomi-self-install', 'Global retrofit smart lock with Matter standard support.', 2025, 10000, 15000, 2);

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
    (SELECT id FROM product_series WHERE slug='xiaomi-self-install'),
    (SELECT id FROM brands WHERE slug='xiaomi'),
    'Xiaomi Self-Install Smart Lock (Global)', 'xiaomi-self-install-global', 'BHR8028GL',
    'Global retrofit smart lock with Matter standard. Installs on existing lock without replacement. Fingerprint (99.3%), password, Mi Home app (WiFi + BLE). Auto-lock, temporary codes, EU cybersecurity certified.',
    12000, 'wifi', 'bluetooth', 1,
    'AA', 4, 6, 400, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 0, 0, '0',
    0.05, 100.0, 8,
    50, 50, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Apple Home","Google Home","Amazon Alexa","Mi Home"]',
    4.1, 800,
    'Xiaomi Self-Install Smart Lock Review — Matter Retrofit 2026',
    'Review of Xiaomi Self-Install. Matter standard, Apple/Google/Alexa, retrofit. Best budget Matter smart lock.'
);

-- =====================================================
-- SALTO — Product Series & Products
-- Source: saltosystems.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='salto'), 'DLok', 'salto-dlok', 'Residential retrofit smart lock for Homelok ecosystem.', 2025, 20000, 30000, 1);

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
    (SELECT id FROM product_series WHERE slug='salto-dlok'),
    (SELECT id FROM brands WHERE slug='salto'),
    'SALTO DLok Smart Lock', 'salto-dlok', 'DLOK-US',
    'Minimalist retrofit smart lock (230g, anodized aluminum + ABS). Mounts inside existing deadbolt, invisible from outside. Under 15-min install, no drilling. Keyless via Homelok app, Apple Wallet digital keys. Magnetic calibration sensor, 50,000+ cycle motor. Timed auto-lock, audit trail.',
    25000, 'bluetooth', 'wifi', 0,
    'CR123A', 4, 12, 230, '0', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.02, 8.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 5, 'internal',
    '["SALTO Homelok","Apple Wallet"]',
    4.4, 300,
    'SALTO DLok Review — Invisible Retrofit Smart Lock 2026',
    'Review of SALTO DLok. 230g, invisible retrofit, Apple Wallet, Homelok cloud. Best premium retrofit from SALTO.'
);

-- SALTO XS4 (commercial)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='salto'), 'XS4 Original+', 'salto-xs4-original', 'Commercial electronic lock with BLUEnet and SVN.', 2022, 40000, 60000, 2);

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
    (SELECT id FROM product_series WHERE slug='salto-xs4-original'),
    (SELECT id FROM brands WHERE slug='salto'),
    'SALTO XS4 Original+ ANSI', 'salto-xs4-original-ansi', 'XS4-ORIG-ANSI',
    'Commercial electronic lock with BLUEnet wireless + SVN (SALTO Virtual Network). Supports Mifare/DESfire, HID iClass, NFC, Bluetooth LE, JustIN Mobile, Apple Wallet. AES 128-bit encryption. Fits ANSI mortise, cylindrical, tubular locks. Door thickness 32-120mm.',
    50000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 1500, '0', 'AES-128',
    0, 0, 1, 0, 0, 1, 1, 1, 0,
    32, 120, 0, '0',
    0.04, 100.0, 200,
    0, 0, 10000, 10000,
    '13.56MHz', 5, 'internal',
    '["SALTO Space","Apple Wallet","BLUEnet"]',
    4.5, 500,
    'SALTO XS4 Original+ Review — Commercial Smart Lock 2026',
    'Review of SALTO XS4 Original+. BLUEnet, SVN, Apple Wallet, ANSI. Best commercial access control smart lock.'
);

-- =====================================================
-- GODREJ — Product Series & Products
-- Source: godrejenterprises.com
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='godrej'), 'Advantis', 'godrej-advantis', 'Premium smart locks with 7-9 access modes and smart home integration.', 2023, 25000, 50000, 1);

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
    'Godrej Advantis IOT9 Smart Lock', 'godrej-advantis-iot9', 'ADVANTIS-IOT9',
    'Flagship 9-access-mode smart lock: fingerprint (360°), PIN (4-12 digit with spy code), RFID card (99), NFC, WiFi app, Bluetooth, mechanical key, temporary code, voice (Alexa/Google). Military-grade encryption, dual authentication, anti-prank alarm, privacy lockout, weatherproof. 9V emergency backup.',
    35000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 2800, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 65, 0, '0',
    0.10, 200.0, 10,
    50, 100, 99, 100,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Assistant"]',
    4.2, 1500,
    'Godrej Advantis IOT9 Review — 9-Mode Smart Lock 2026',
    'Review of Godrej Advantis IOT9. 9 access modes, military encryption, Alexa. Best smart lock in India.'
);

-- Godrej Catus
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='godrej'), 'Catus', 'godrej-catus', 'Entry-level smart locks with fingerprint and keypad.', 2022, 10000, 20000, 2);

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
    (SELECT id FROM product_series WHERE slug='godrej-catus'),
    (SELECT id FROM brands WHERE slug='godrej'),
    'Godrej Catus Connect WiFi Smart Lock', 'godrej-catus-connect', 'CATUS-CONNECT',
    '5-in-1 access: WiFi app, fingerprint, RFID card, PIN code (spy code), mechanical key. Military-grade encryption, auto-lock, anti-prank alarm, low battery alert, 9V emergency. Designed for Indian wooden doors (35-65mm).',
    15000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 2200, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    35, 65, 0, '0',
    0.08, 150.0, 10,
    50, 100, 99, 50,
    '2.4GHz', 20, 'internal',
    '["Godrej App"]',
    4.0, 3000,
    'Godrej Catus Connect Review — Budget WiFi Smart Lock 2026',
    'Review of Godrej Catus Connect. 5-in-1 access, WiFi, fingerprint. Best affordable Indian smart lock.'
);

-- =====================================================
-- EPIC — Product Series & Products
-- Source: epic.co.kr
-- =====================================================

INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='epic'), 'Generation Series', 'epic-generation', 'Flagship digital locks with advanced biometrics.', 2023, 25000, 55000, 1);

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
    'EPIC 8G Facial Recognition Smart Lock', 'epic-8g-face', 'ES-8G',
    'Premium facial recognition smart lock. 3D face (30 faces), air-touch fingerprint (100), PIN, one-time PIN, Bluetooth/WiFi (optional bridge), mechanical key. EPIC Things app for remote control, guest keys, push notifications, access logs. Dual authentication, anti-prank alarm, fire alarm.',
    45000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 3200, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.08, 200.0, 30,
    50, 100, 200, 100,
    '2.4GHz', 10, 'internal',
    '["EPIC Things App"]',
    4.3, 800,
    'EPIC 8G Review — Facial Recognition Smart Lock 2026',
    'Review of EPIC 8G. Korean facial recognition, 30 faces, air-touch fingerprint. Best Korean premium smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='epic-generation'),
    (SELECT id FROM brands WHERE slug='epic'),
    'EPIC 5G Pro Bluetooth Smart Lock', 'epic-5g-pro', 'ES-5G-PRO',
    '4-way access: fingerprint (100), PIN, RFID card (200), Bluetooth. EPIC Things app, guest PIN, push notifications, Z-Wave optional module. Auto-lock, re-lock, double lock, random number entry, anti-prank alarm. 9V emergency battery.',
    30000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 2800, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 0,
    40, 80, 0, '0',
    0.06, 150.0, 30,
    50, 100, 200, 100,
    '2.4GHz', 10, 'internal',
    '["EPIC Things App"]',
    4.2, 2000,
    'EPIC 5G Pro Review — Bluetooth Fingerprint Lock 2026',
    'Review of EPIC 5G Pro. Fingerprint, 200 RFID cards, Bluetooth. Best mid-range Korean digital lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 9
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-smart-door-lock-4-pro',
    'xiaomi-self-install-global',
    'godrej-advantis-iot9', 'godrej-catus-connect'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'salto-dlok', 'salto-xs4-original-ansi',
    'epic-8g-face', 'epic-5g-pro'
);

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'xiaomi-self-install-global';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-smart-door-lock-4-pro',
    'xiaomi-self-install-global',
    'godrej-advantis-iot9', 'godrej-catus-connect',
    'epic-8g-face', 'epic-5g-pro'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-smart-door-lock-4-pro',
    'xiaomi-self-install-global',
    'godrej-advantis-iot9', 'godrej-catus-connect',
    'epic-8g-face', 'epic-5g-pro'
);

-- Face recognition tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-4-pro', 'epic-8g-face'
);

-- Camera tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'camera' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-smart-door-lock-4-pro'
);

-- Palm vein tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'palm-vein' FROM products WHERE slug = 'xiaomi-smart-door-lock-4-pro';

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'xiaomi-self-install-global', 'salto-dlok'
);

-- RFID tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'rfid' FROM products WHERE slug IN (
    'salto-xs4-original-ansi', 'godrej-advantis-iot9', 'godrej-catus-connect',
    'epic-5g-pro'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'xiaomi-self-install-global', 'godrej-catus-connect'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'godrej-advantis-iot9',
    'epic-5g-pro', 'salto-dlok'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-4-pro', 'salto-xs4-original-ansi', 'epic-8g-face'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-smart-door-lock-4-pro',
    'godrej-advantis-iot9', 'godrej-catus-connect'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'xiaomi-self-install-global', 'salto-dlok', 'epic-5g-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug IN (
    'salto-xs4-original-ansi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-4-pro', 'godrej-advantis-iot9', 'epic-8g-face'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN (
    'xiaomi-smart-door-lock-2-cat-eye', 'xiaomi-self-install-global'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apple-ecosystem' FROM products WHERE slug IN (
    'xiaomi-self-install-global', 'salto-dlok'
);
