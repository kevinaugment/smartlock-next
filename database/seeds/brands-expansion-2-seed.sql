-- =====================================================
-- Brand Expansion #2 — 6 Additional Brands
-- Samsung, Philips, Alfred, SimpliSafe, Sesame, Brinks
-- =====================================================

-- =====================================================
-- BRANDS (6 new)
-- =====================================================

INSERT INTO brands (
    name, slug, description, long_description, logo_url, website_url,
    country, founded_year,
    supports_wifi, supports_zigbee, supports_zwave, supports_thread, supports_matter, supports_bluetooth,
    target_market, price_tier,
    rating, featured, display_order, status,
    meta_title, meta_description
) VALUES
(
    'Samsung', 'samsung',
    'Global electronics leader with premium fingerprint and NFC smart locks. Dominant in Asian markets.',
    'Samsung, the South Korean technology giant, has been a pioneer in digital door locks since the mid-2000s, particularly dominating the Asian smart lock market. Samsung''s SHP series locks are known for enterprise-grade fingerprint sensors, NFC card access, and push-pull ergonomic handles — a design philosophy that has become the standard in Korean and Southeast Asian residential buildings. Their locks feature advanced anti-hack relay attack protection, random security codes, and Bluetooth connectivity via the Samsung Smart Home app. In some regions, Samsung''s digital lock division has transitioned to the Zigbang brand while maintaining the same engineering standards. Samsung locks consistently rank among the most durable in independent stress tests.',
    '/images/brands/samsung-logo.png', 'https://www.samsung.com/',
    'KR', 1969,
    1, 0, 0, 0, 0, 1,
    'all', 'premium',
    4.5, 1, 15, 'published',
    'Samsung Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Samsung digital door locks. SHP series with fingerprint, NFC card, push-pull handles. Premium Asian market leader.'
),
(
    'Philips', 'philips',
    '3D facial recognition and video smart locks with Wi-Fi. Robust mortise lock lineup for global markets.',
    'Philips EasyKey brings the trusted Philips brand into smart home security with an impressive lineup of smart door locks featuring 3D facial recognition, video intercom, and built-in Wi-Fi. The DDL702 Alpha series leads with a structured light facial recognition module that can identify faces in under 0.3 seconds, even in complete darkness. Philips locks are primarily designed for Asian-standard mortise lock installations, featuring auto-locking motors that engage the deadbolt and latch simultaneously. With the Philips EasyKey App, users get remote monitoring, temporary PIN codes for visitors, real-time alerts, and video recording (on camera models). All models feature C-grade lock cylinders for high resistance against technical lock-picking.',
    '/images/brands/philips-logo.png', 'https://www.philips.com/',
    'NL', 1891,
    1, 0, 0, 0, 0, 1,
    'residential', 'premium',
    4.4, 1, 16, 'published',
    'Philips Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Philips EasyKey smart locks. 3D facial recognition, video intercom, Wi-Fi. DDL702 Alpha series review.'
),
(
    'Alfred', 'alfred',
    'Canadian smart locks with Z-Wave Plus and Wi-Fi bridge options. Multi-connectivity modular design.',
    'Alfred, a Canadian smart lock brand, has carved a distinct position with its modular connectivity approach — each lock starts with Bluetooth and can be upgraded with optional Z-Wave, Zigbee 3.0, or Wi-Fi bridge modules. The Alfred DB2-B touchscreen deadbolt features an illuminated 12-button keypad with visual PIN protection, while the premium ML2 mortise lock targets high-rise residential buildings with rechargeable Li-ion battery, 250 PIN codes, 250 RFID cards, and even optional wireless long-range power. Alfred locks meet residential high-rise fire and emergency egress codes, making them popular in Canadian and North American condo developments. Their Connect Wi-Fi Bridge enables Amazon Alexa and Google Assistant voice control.',
    '/images/brands/alfred-logo.png', 'https://www.alfredlocks.com/',
    'CA', 2014,
    1, 1, 1, 0, 0, 1,
    'residential', 'mid',
    4.1, 0, 17, 'published',
    'Alfred Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Alfred smart locks. Z-Wave, Zigbee, Wi-Fi modular connectivity. DB2-B deadbolt and ML2 mortise lock reviews.'
),
(
    'SimpliSafe', 'simplisafe',
    'Smart lock integrated with SimpliSafe home security system. Wi-Fi enabled with separate PIN pad.',
    'SimpliSafe, one of America''s most popular DIY home security systems, offers a smart lock designed to integrate seamlessly with their Gen 3 security platform. The SimpliSafe Smart Lock Series 2 retrofits over existing single-cylinder deadbolts and connects via Wi-Fi for remote locking/unlocking through the SimpliSafe app. It pairs with a separate wireless PIN Pad (powered by CR2450 batteries) for keyless entry. When armed in Away mode, locking the smart lock automatically arms the entire SimpliSafe security system — a level of integration that standalone smart locks cannot match. While it lacks fingerprint or Matter support, its strength lies in deep ecosystem integration with SimpliSafe cameras, sensors, and 24/7 professional monitoring.',
    '/images/brands/simplisafe-logo.png', 'https://simplisafe.com/',
    'US', 2006,
    1, 0, 0, 0, 0, 0,
    'residential', 'mid',
    4.0, 0, 18, 'published',
    'SimpliSafe Smart Lock — Complete Brand Guide & Review 2026',
    'Complete guide to SimpliSafe Smart Lock Series 2. WiFi, PIN pad, integrated with SimpliSafe security system. Review and specs.'
),
(
    'Sesame', 'sesame',
    'Ultra-compact retrofit smart lock from Japan. Matter support, open-source API, and unbeatable sub-$70 pricing.',
    'Sesame (by Candy House) is a Japanese smart lock brand that has redefined what an affordable retrofit smart lock can be. Weighing only 186 grams with dimensions smaller than a deck of cards, the Sesame 5 Pro installs in minutes with 3M adhesive tape over your existing thumbturn — no tools, no drilling, no modifications. Despite its tiny size and sub-$70 price, it offers Matter support (via Hub 3), an open-source Bluetooth API for developers, and a motor rated for 10+ years of use (200 cycles/day). Candy House also offers custom 3D-printed adapters for unusual thumbturn shapes, ensuring near-universal compatibility. The Sesame Touch Pro accessory adds fingerprint and NFC card authentication.',
    '/images/brands/sesame-logo.png', 'https://candyhouse.co/',
    'JP', 2014,
    0, 0, 0, 0, 1, 1,
    'residential', 'budget',
    4.2, 0, 19, 'published',
    'Sesame Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Sesame 5 Pro smart lock. Ultra-compact retrofit, Matter, open-source API. Best value at under $70.'
),
(
    'Brinks', 'brinks',
    'Trusted American security brand with solar-powered smart deadbolts and commercial-grade hardware.',
    'Brinks, the legendary American security company established in 1859, entered the smart lock market with the Array Smart Deadbolt — featuring an industry-first solar panel that harvests ambient light to extend the rechargeable lithium-polymer battery life to over a year. The Array connects via Wi-Fi for remote access and integrates with Amazon Alexa for voice control. Beyond smart locks, Brinks'' extensive heritage in physical security means their deadbolt mechanisms carry ANSI Grade 2 certification with anti-pick 5-pin cylinders. The PRO-GUARD line adds fingerprint authentication to their electronic deadbolts, combining traditional Brinks security engineering with modern biometric convenience.',
    '/images/brands/brinks-logo.png', 'https://www.brinkshome.com/',
    'US', 1859,
    1, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.0, 0, 20, 'published',
    'Brinks Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Brinks smart locks. Solar-powered Array deadbolt, fingerprint PRO-GUARD series. 160+ years of security heritage.'
);

-- =====================================================
-- SAMSUNG — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='samsung'), 'SHP-DP Series', 'samsung-shp-dp', 'Premium push-pull fingerprint door locks.', 2019, 35000, 55000, 1),
((SELECT id FROM brands WHERE slug='samsung'), 'SHP-DR Series', 'samsung-shp-dr', 'Deadbolt and rim lock digital door locks.', 2020, 25000, 40000, 2);

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
    (SELECT id FROM product_series WHERE slug='samsung-shp-dp'),
    (SELECT id FROM brands WHERE slug='samsung'),
    'Samsung SHP-DP609', 'samsung-shp-dp609', 'SHP-DP609AS/EN',
    'Premium push-pull fingerprint door lock with Bluetooth. 8 AA batteries, ANSI Grade 2, anti-relay attack protection.',
    45000, 'bluetooth', 'wifi', 0,
    'AA', 8, 12, 3400, '2', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 0, '0',
    0.10, 200.0, 10,
    100, 100, 200, 50,
    '2.4GHz', 10, 'internal',
    '["Samsung SmartThings"]',
    4.5, 3200,
    'Samsung SHP-DP609 Review — Premium Push-Pull Digital Lock 2026',
    'Review of Samsung SHP-DP609. Push-pull handle, fingerprint, NFC card, Bluetooth. Premium Korean digital door lock.'
),
(
    (SELECT id FROM product_series WHERE slug='samsung-shp-dr'),
    (SELECT id FROM brands WHERE slug='samsung'),
    'Samsung SHP-DR708', 'samsung-shp-dr708', 'SHP-DR708AU/EN',
    'Compact deadbolt digital lock with fingerprint and PIN. Wi-Fi enabled for remote access.',
    32000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1800, '2', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 80, 54, '60,70',
    0.12, 220.0, 10,
    100, 100, 200, 50,
    '2.4GHz', 15, 'internal',
    '["Samsung SmartThings"]',
    4.3, 1800,
    'Samsung SHP-DR708 Review — WiFi Deadbolt Digital Lock 2026',
    'Review of Samsung SHP-DR708. Fingerprint + WiFi deadbolt, remote access, NFC cards. Samsung digital door lock.'
);

-- =====================================================
-- PHILIPS — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='philips'), 'DDL702 Alpha', 'philips-ddl702', '3D facial recognition smart lock with video and WiFi.', 2023, 40000, 60000, 1),
((SELECT id FROM brands WHERE slug='philips'), 'DDL303', 'philips-ddl303', 'Entry-level keypad smart lock with fingerprint.', 2022, 15000, 25000, 2);

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
    (SELECT id FROM product_series WHERE slug='philips-ddl702'),
    (SELECT id FROM brands WHERE slug='philips'),
    'Philips DDL702-1HWS Alpha', 'philips-ddl702-1hws', 'DDL702-1HWS',
    '3D facial recognition smart lock with video intercom and WiFi. 5000mAh Li-ion battery. Auto-lock mortise mechanism.',
    55000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 2, 2800, '2', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 120, 0, '0',
    0.50, 600.0, 10,
    100, 100, 200, 100,
    '2.4GHz', 25, 'internal',
    '["Philips EasyKey"]',
    4.4, 900,
    'Philips DDL702 Alpha Review — 3D Facial Recognition Smart Lock 2026',
    'Review of Philips DDL702. 3D facial recognition, video intercom, WiFi. Premium smart mortise lock with camera.'
),
(
    (SELECT id FROM product_series WHERE slug='philips-ddl303'),
    (SELECT id FROM brands WHERE slug='philips'),
    'Philips DDL303-8HWS', 'philips-ddl303-8hws', 'DDL303-8HWS',
    'Entry-level smart lock with fingerprint and keypad. 8 AA batteries for extended life. Wi-Fi connectivity.',
    19999, 'wifi', 'bluetooth', 0,
    'AA', 8, 6, 1600, '2', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 120, 0, '0',
    0.15, 250.0, 10,
    50, 100, 100, 50,
    '2.4GHz', 20, 'internal',
    '["Philips EasyKey"]',
    4.2, 1200,
    'Philips DDL303 Review — Affordable Fingerprint Smart Lock 2026',
    'Review of Philips DDL303. Fingerprint + keypad + WiFi. Affordable Philips smart lock for mortise doors.'
);

-- =====================================================
-- ALFRED — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='alfred'), 'DB2-B', 'alfred-db2-b', 'Touchscreen deadbolt with Z-Wave and WiFi bridge options.', 2020, 18000, 28000, 1);

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
    (SELECT id FROM product_series WHERE slug='alfred-db2-b'),
    (SELECT id FROM brands WHERE slug='alfred'),
    'Alfred DB2-B Touchscreen Deadbolt', 'alfred-db2-b', 'DB2-B-BL',
    'Illuminated touchscreen deadbolt with visual PIN protection. Bluetooth standard, optional Z-Wave Plus and WiFi Bridge modules.',
    22000, 'bluetooth', 'zwave', 0,
    'AA', 4, 12, 1200, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    40, 60, 54, '60,70',
    0.08, 180.0, 10,
    20, 0, 0, 100,
    '908.42MHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Samsung SmartThings","Ring Alarm"]',
    4.1, 1400,
    'Alfred DB2-B Review — Modular Touchscreen Smart Deadbolt 2026',
    'Review of Alfred DB2-B. Touchscreen keypad, Z-Wave/WiFi modular, visual PIN protection. Best Canadian smart lock.'
);

-- =====================================================
-- SIMPLISAFE — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='simplisafe'), 'Smart Lock Series 2', 'simplisafe-smart-lock-2', 'Retrofit deadbolt integrated with SimpliSafe security system.', 2024, 9999, 12999, 1);

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
    (SELECT id FROM product_series WHERE slug='simplisafe-smart-lock-2'),
    (SELECT id FROM brands WHERE slug='simplisafe'),
    'SimpliSafe Smart Lock Series 2', 'simplisafe-smart-lock-series-2', 'SS3-LK-BB',
    'Retrofit smart deadbolt designed for SimpliSafe Gen 3 security system. WiFi for remote control. Separate wireless PIN Pad included.',
    10799, 'wifi', NULL, 0,
    'AA', 4, 12, 900, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    0.10, 200.0, 10,
    100, 0, 0, 50,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home","SimpliSafe"]',
    4.0, 2600,
    'SimpliSafe Smart Lock Series 2 Review — Security System Integration 2026',
    'Review of SimpliSafe Smart Lock Series 2. WiFi, PIN pad, auto-arms security system. Best for SimpliSafe users.'
);

-- =====================================================
-- SESAME — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='sesame'), 'Sesame 5', 'sesame-5', 'Ultra-compact retrofit smart lock with Matter.', 2024, 4999, 7999, 1);

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
    'Sesame 5 Pro', 'sesame-5-pro', 'SESAME5-PRO',
    'Ultra-compact 186g retrofit smart lock. 3M tape installation, CR123A batteries last 12+ months. Matter via Hub 3. Open-source Bluetooth API.',
    6999, 'bluetooth', NULL, 1,
    'CR123A', 2, 12, 186, '0', 'AES-128',
    0, 0, 1, 0, 1, 1, 0, 1, 0,
    0, 0, 0, '0',
    0.01, 5.0, 200,
    0, 0, 0, 100,
    '2.4GHz', 5, 'internal',
    '["Apple Home","Amazon Alexa","Google Home"]',
    4.2, 4500,
    'Sesame 5 Pro Review — Smallest & Cheapest Smart Lock 2026',
    'Review of Sesame 5 Pro. 186g, under $70, Matter, open-source API. The smallest and most affordable smart retrofit lock.'
);

-- =====================================================
-- BRINKS — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='brinks'), 'Array', 'brinks-array', 'Solar-powered WiFi smart deadbolt.', 2018, 15000, 25000, 1),
((SELECT id FROM brands WHERE slug='brinks'), 'PRO-GUARD', 'brinks-pro-guard', 'Fingerprint electronic deadbolt.', 2023, 10000, 15000, 2);

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
    'Brinks Array Smart Deadbolt', 'brinks-array-deadbolt', 'BRINKS-ARRAY',
    'Solar-powered WiFi smart deadbolt with rechargeable Li-polymer battery. Solar panel extends battery to 12+ months.',
    17999, 'wifi', 'bluetooth', 0,
    'lithium-polymer', 2, 12, 1300, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.08, 200.0, 10,
    50, 0, 0, 50,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa"]',
    4.0, 1100,
    'Brinks Array Review — Solar-Powered Smart Deadbolt 2026',
    'Review of Brinks Array Smart Deadbolt. Solar panel + rechargeable battery, WiFi. Never worry about dead batteries.'
),
(
    (SELECT id FROM product_series WHERE slug='brinks-pro-guard'),
    (SELECT id FROM brands WHERE slug='brinks'),
    'Brinks PRO-GUARD Fingerprint Deadbolt', 'brinks-pro-guard-fingerprint', 'BRNK-4392',
    'ANSI Grade 3 electronic deadbolt with fingerprint sensor and illuminated keypad. Anti-pick cylinder.',
    12999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1100, '3', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 0, 1,
    35, 57, 54, '60,70',
    0.05, 150.0, 10,
    50, 50, 0, 0,
    '2.4GHz', 10, 'internal',
    '[]',
    3.9, 650,
    'Brinks PRO-GUARD Fingerprint Deadbolt Review — Security Heritage 2026',
    'Review of Brinks PRO-GUARD. Fingerprint + keypad, anti-pick cylinder. Trusted Brinks security in a smart deadbolt.'
);

-- =====================================================
-- PRODUCT TAGS — New batch 2 products
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'samsung-shp-dr708', 'philips-ddl702-1hws', 'philips-ddl303-8hws',
    'simplisafe-smart-lock-series-2', 'brinks-array-deadbolt'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'samsung-shp-dp609', 'alfred-db2-b', 'sesame-5-pro', 'brinks-pro-guard-fingerprint'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'zwave' FROM products WHERE slug = 'alfred-db2-b';

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'sesame-5-pro';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE has_fingerprint = 1 AND slug IN (
    'samsung-shp-dp609', 'samsung-shp-dr708',
    'philips-ddl702-1hws', 'philips-ddl303-8hws',
    'brinks-pro-guard-fingerprint'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE has_keypad = 1 AND slug IN (
    'samsung-shp-dp609', 'samsung-shp-dr708',
    'philips-ddl702-1hws', 'philips-ddl303-8hws',
    'alfred-db2-b', 'simplisafe-smart-lock-series-2',
    'brinks-array-deadbolt', 'brinks-pro-guard-fingerprint'
);

-- Auto-unlock tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'auto-unlock' FROM products WHERE has_auto_unlock = 0 AND slug = 'sesame-5-pro';

-- Physical key tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'physical-key' FROM products WHERE has_physical_key = 1 AND slug IN (
    'samsung-shp-dp609', 'samsung-shp-dr708',
    'philips-ddl702-1hws', 'philips-ddl303-8hws',
    'alfred-db2-b', 'brinks-array-deadbolt', 'brinks-pro-guard-fingerprint'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'sesame-5-pro', 'simplisafe-smart-lock-series-2', 'brinks-pro-guard-fingerprint'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'alfred-db2-b', 'brinks-array-deadbolt', 'philips-ddl303-8hws', 'samsung-shp-dr708'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'samsung-shp-dp609', 'philips-ddl702-1hws'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'sesame-5-pro', 'simplisafe-smart-lock-series-2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'samsung-shp-dp609', 'philips-ddl702-1hws', 'simplisafe-smart-lock-series-2', 'brinks-array-deadbolt'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'alfred-db2-b', 'brinks-array-deadbolt'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'samsung-shp-dp609', 'samsung-shp-dr708',
    'philips-ddl702-1hws', 'philips-ddl303-8hws'
);
