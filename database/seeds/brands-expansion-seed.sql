-- =====================================================
-- Brand Expansion Seed Data — 8 New Brands
-- Ultraloq, Lockly, Eufy, SwitchBot, Wyze, Nuki, igloohome, Bosma
-- =====================================================

-- =====================================================
-- BRANDS (8 new)
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
    'Ultraloq', 'ultraloq',
    'ANSI Grade 1 smart locks with 6-in-1 keyless entry. Multiple CES Innovation Award winner.',
    'Ultraloq, made by U-Tec, has been a pioneer in multi-access smart locks for over 10 years with over 1 million locks sold. Their flagship U-Bolt Pro WiFi offers ANSI Grade 1 security with 6 ways to unlock: fingerprint, smartphone, auto-unlock, knock-to-open, keypad, and physical key. Ultraloq locks consistently earn top marks from PCMag, CNET, and Tom''s Guide. The Bolt Fingerprint series was the first to combine Matter protocol with fingerprint access. Their Latch 5 series brings smart lock technology to lever handle doors, expanding beyond deadbolts.',
    '/images/brands/ultraloq-logo.png', 'https://www.u-tec.com/',
    'US', 2014,
    1, 0, 1, 0, 1, 1,
    'residential', 'mid',
    4.5, 1, 7, 'published',
    'Ultraloq Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Comprehensive guide to Ultraloq smart locks. ANSI Grade 1, 6-in-1 keyless entry, fingerprint + Matter. Compare U-Bolt Pro, Bolt Fingerprint, and Latch models.'
),
(
    'Lockly', 'lockly',
    'Patented PIN Genie anti-peep keypad and advanced biometric smart locks with facial recognition.',
    'Lockly has carved a unique niche in the smart lock market with its patented PIN Genie technology — a rotating digital keypad that randomizes number positions with every use, making it impossible for onlookers to memorize your code. Beyond security innovation, Lockly has pushed into cutting-edge biometrics with the Visage Zeno series featuring 3D facial recognition, and the Vision Zeno series integrating a video doorbell directly into the lock. Lockly locks are trusted by both homeowners and Airbnb hosts for their robust security and remote management capabilities via the Lockly app.',
    '/images/brands/lockly-logo.png', 'https://lockly.com/',
    'US', 2019,
    1, 0, 0, 0, 0, 1,
    'all', 'mid',
    4.3, 1, 8, 'published',
    'Lockly Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'In-depth guide to Lockly smart locks. Patented PIN Genie anti-peep keypad, facial recognition, video doorbell locks. Compare Secure Pro, Vision, and Visage models.'
),
(
    'Eufy', 'eufy',
    'Palm vein recognition and video smart locks from Anker. BHMA Grade 1 security with local storage.',
    'Eufy, a subsidiary of Anker Innovations, has rapidly expanded from home security cameras into smart locks with their FamiLock lineup. Eufy stands out with palm vein recognition technology (PowerDuo) — a biometric method that reads the vein pattern beneath your palm for fast, hygienic, and highly secure access without touching the lock. Their Video Smart Lock series integrates 2K cameras with two-way audio directly into the deadbolt. Eufy emphasizes local storage and privacy-first design, processing biometric data on-device without cloud dependency. All flagship models carry BHMA Grade 1 certification.',
    '/images/brands/eufy-logo.png', 'https://www.eufy.com/',
    'CN', 2016,
    1, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.4, 1, 9, 'published',
    'Eufy Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Eufy FamiLock smart locks. Palm vein recognition, video doorbell locks, BHMA Grade 1. Compare S3 Max, E330, and C241 models.'
),
(
    'SwitchBot', 'switchbot',
    'Retrofit smart locks with rechargeable battery and Matter support via hub. Affordable smart home ecosystem.',
    'SwitchBot started as a smart home automation brand known for their ingenious Bot finger robot and has grown into a full ecosystem including smart locks. The SwitchBot Lock Ultra, unveiled at CES 2025, is a compact retrofit smart lock made from magnesium aluminum alloy that installs over your existing deadbolt in minutes — perfect for renters. It features a rechargeable lithium-ion battery lasting up to 9 months, triple power protection (main battery + backup CR123A + supercapacitor), and Matter support via SwitchBot Hub. With up to 16 ways to unlock including NFC, fingerprint (via keypad accessory), and facial recognition, SwitchBot offers exceptional value.',
    '/images/brands/switchbot-logo.png', 'https://www.switch-bot.com/',
    'CN', 2015,
    0, 0, 0, 0, 1, 1,
    'residential', 'budget',
    4.3, 1, 10, 'published',
    'SwitchBot Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to SwitchBot smart locks. Retrofit design, rechargeable battery, Matter support. Compare Lock Ultra and Lock Pro models.'
),
(
    'Wyze', 'wyze',
    'Ultra-affordable smart locks with fingerprint and Wi-Fi. Best value in the smart lock market.',
    'Wyze has built its reputation on delivering surprisingly capable smart home products at fraction-of-the-cost pricing, and their smart locks continue this tradition. The Wyze Lock Bolt v2 delivers fingerprint authentication, Wi-Fi remote access, and a full keypad for under $80 — dramatically undercutting competitors. Wyze locks are BHMA Grade 2 certified and powered by 8 AA batteries lasting up to 8 months. While they may lack premium features like Apple Home Key or Thread/Matter support, Wyze locks deliver the core smart lock experience — remote access, fingerprint unlock, guest codes, and activity logs — at an unbeatable price point.',
    '/images/brands/wyze-logo.png', 'https://www.wyze.com/',
    'US', 2017,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.0, 0, 11, 'published',
    'Wyze Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Wyze smart locks. Budget-friendly fingerprint + Wi-Fi locks under $80. BHMA Grade 2 security at the best value.'
),
(
    'Nuki', 'nuki',
    'European retrofit smart locks with native Matter/Thread support. Auto-unlock and rechargeable design.',
    'Nuki, headquartered in Graz, Austria, is the leading European smart lock brand. Their retrofit design mounts over existing Euro-profile cylinders, making installation tool-free and reversible — ideal for European renters. The Nuki Smart Lock Pro 4.0 was among the first locks to ship with native Matter over Thread support, enabling seamless integration across Apple Home, Google Home, and Amazon Alexa without proprietary hubs. Nuki''s standout feature is its precise auto-unlock via Bluetooth geofencing — the lock detects when you approach and unlocks automatically. The Pro model includes a rechargeable battery pack and built-in Wi-Fi for remote access.',
    '/images/brands/nuki-logo.png', 'https://nuki.io/',
    'AT', 2014,
    1, 0, 0, 1, 1, 1,
    'residential', 'mid',
    4.3, 1, 12, 'published',
    'Nuki Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Nuki smart locks. European retrofit design, native Matter/Thread, auto-unlock. Compare Smart Lock Pro 4.0 and Smart Lock 4.0.'
),
(
    'igloohome', 'igloohome',
    'Offline-first smart locks with algoPIN technology. Built for Airbnb hosts and property managers.',
    'igloohome, founded in Singapore, has pioneered offline-first smart lock technology with their proprietary algoPIN system. Unlike most smart locks that require Wi-Fi or Bluetooth for remote access, igloohome generates time-sensitive PIN codes algorithmically — meaning hosts can create and share access codes without any internet connection at the lock. This makes igloohome ideal for vacation rentals, construction sites, and remote properties with unreliable connectivity. Their locks are IP65 rated for weather resistance and integrate directly with Airbnb for automated guest check-in. The product range spans deadbolts, keyboxes, padlocks, and mortise locks.',
    '/images/brands/igloohome-logo.png', 'https://www.igloohome.co/',
    'SG', 2015,
    0, 0, 0, 0, 0, 1,
    'all', 'mid',
    4.1, 0, 13, 'published',
    'igloohome Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to igloohome smart locks. Offline algoPIN technology, Airbnb integration, IP65 weatherproof. Compare Deadbolt 2S, Deadbolt Go, and Keybox 3.'
),
(
    'Bosma', 'bosma',
    'Video smart locks with facial recognition and built-in camera. Affordable biometric security.',
    'Bosma is a US-based smart home brand that combines smart lock functionality with video surveillance in a single device. The Bosma Aegis features a built-in HD camera with facial recognition, allowing the lock to identify family members and unlock automatically while alerting you to strangers. Their locks offer traditional smart lock features — keypad, fingerprint, app control — plus the unique addition of video recording and two-way audio. Bosma targets budget-conscious homeowners who want both a smart lock and a video doorbell in one package, offering significant cost savings over buying separate devices.',
    '/images/brands/bosma-logo.png', 'https://www.bosma.co/',
    'US', 2018,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.0, 0, 14, 'published',
    'Bosma Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Bosma smart locks. Video doorbell + smart lock combo, facial recognition, HD camera. Compare Aegis and Sentry models.'
);

-- =====================================================
-- ULTRALOQ — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='ultraloq'), 'U-Bolt Pro', 'ultraloq-u-bolt-pro', 'Flagship WiFi deadbolt with 6-in-1 access and ANSI Grade 1.', 2021, 19999, 26999, 1),
((SELECT id FROM brands WHERE slug='ultraloq'), 'Bolt Fingerprint', 'ultraloq-bolt-fingerprint', 'Fingerprint deadbolt with Matter protocol support.', 2023, 16999, 22999, 2),
((SELECT id FROM brands WHERE slug='ultraloq'), 'Latch 5', 'ultraloq-latch-5', 'Smart lever lock for interior and exterior doors.', 2023, 14999, 19999, 3);

-- ULTRALOQ — Products
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
    (SELECT id FROM product_series WHERE slug='ultraloq-u-bolt-pro'),
    (SELECT id FROM brands WHERE slug='ultraloq'),
    'Ultraloq U-Bolt Pro WiFi', 'ultraloq-u-bolt-pro-wifi', 'UH02-BK',
    'Flagship 6-in-1 smart deadbolt with built-in WiFi. Fingerprint, keypad, smartphone, auto-unlock, knock-to-open, and physical key.',
    24999, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 1360, '1', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 90, 54, '60,70',
    0.14, 240.0, 10,
    50, 100, 0, 200,
    '2.4GHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Samsung SmartThings"]',
    4.5, 4200,
    'Ultraloq U-Bolt Pro WiFi Review — 6-in-1 ANSI Grade 1 Smart Lock 2026',
    'Review of Ultraloq U-Bolt Pro WiFi. 6-in-1 access, ANSI Grade 1, fingerprint + Wi-Fi. The most versatile smart deadbolt.'
),
(
    (SELECT id FROM product_series WHERE slug='ultraloq-bolt-fingerprint'),
    (SELECT id FROM brands WHERE slug='ultraloq'),
    'Ultraloq Bolt Fingerprint Matter', 'ultraloq-bolt-fingerprint-matter', 'UBF-MR-BK',
    'Fingerprint deadbolt with Matter protocol support and ANSI Grade 1. Future-proof smart home integration.',
    19999, 'wifi', 'bluetooth', 1,
    'AA', 4, 12, 1200, '1', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 90, 54, '60,70',
    0.10, 200.0, 10,
    50, 100, 0, 200,
    '2.4GHz', 30, 'internal',
    '["Apple Home","Amazon Alexa","Google Home","Samsung SmartThings"]',
    4.4, 1800,
    'Ultraloq Bolt Fingerprint Matter Review — Future-Proof Smart Lock 2026',
    'Review of Ultraloq Bolt Fingerprint with Matter. ANSI Grade 1, fingerprint, Matter protocol for universal smart home support.'
),
(
    (SELECT id FROM product_series WHERE slug='ultraloq-latch-5'),
    (SELECT id FROM brands WHERE slug='ultraloq'),
    'Ultraloq Latch 5 WiFi', 'ultraloq-latch-5-wifi', 'UL5-NB-BK',
    'Smart lever lock with fingerprint reader and built-in WiFi. ANSI Grade 2 for lever-style doors.',
    17999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1100, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 220.0, 10,
    50, 100, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 950,
    'Ultraloq Latch 5 WiFi Review — Smart Lever Lock 2026',
    'Review of Ultraloq Latch 5 WiFi. Smart lever handle, fingerprint, WiFi. Best smart lock for lever-style doors.'
);

-- =====================================================
-- LOCKLY — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='lockly'), 'Secure Pro', 'lockly-secure-pro', 'Deadbolt with patented PIN Genie rotating keypad and WiFi.', 2021, 22999, 29999, 1),
((SELECT id FROM brands WHERE slug='lockly'), 'Vision Zeno', 'lockly-vision-zeno', 'Video smart lock with integrated camera and intercom.', 2024, 29999, 34999, 2),
((SELECT id FROM brands WHERE slug='lockly'), 'Visage Zeno', 'lockly-visage-zeno', '3D facial recognition deadbolt with PIN Genie.', 2024, 34999, 39999, 3);

-- LOCKLY — Products
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
    (SELECT id FROM product_series WHERE slug='lockly-secure-pro'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Secure Pro Deadbolt WiFi', 'lockly-secure-pro-wifi', 'PGD728W',
    'PIN Genie rotating keypad deadbolt with built-in WiFi. Fingerprint sensor with 3D capacitive technology.',
    27999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1350, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 250.0, 10,
    72, 99, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.3, 2100,
    'Lockly Secure Pro WiFi Review — PIN Genie Anti-Peep Technology 2026',
    'Review of Lockly Secure Pro Deadbolt WiFi. Patented PIN Genie keypad, fingerprint, WiFi. Peek-proof security.'
),
(
    (SELECT id FROM product_series WHERE slug='lockly-vision-zeno'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Vision Zeno Video Smart Lock', 'lockly-vision-zeno', 'PGD798',
    'Video smart lock with integrated HD camera, two-way intercom, and PIN Genie keypad. See who is at your door.',
    32999, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 1500, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.25, 350.0, 10,
    72, 99, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 850,
    'Lockly Vision Zeno Review — Video Smart Lock with Intercom 2026',
    'Review of Lockly Vision Zeno. Video doorbell + smart lock combo, PIN Genie, fingerprint, two-way audio.'
),
(
    (SELECT id FROM product_series WHERE slug='lockly-visage-zeno'),
    (SELECT id FROM brands WHERE slug='lockly'),
    'Lockly Visage Zeno Facial Recognition', 'lockly-visage-zeno', 'PGD898',
    '3D facial recognition deadbolt. Unlocks in 0.3 seconds by recognizing your face. PIN Genie + fingerprint backup.',
    37999, 'wifi', 'bluetooth', 0,
    'AA', 4, 4, 1600, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.30, 400.0, 10,
    72, 99, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.4, 520,
    'Lockly Visage Zeno Review — 3D Facial Recognition Smart Lock 2026',
    'Review of Lockly Visage Zeno. 3D facial recognition, unlocks in 0.3s. The most advanced biometric smart lock.'
);

-- =====================================================
-- EUFY — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='eufy'), 'FamiLock S Series', 'eufy-familock-s', 'Premium palm vein recognition and video smart locks.', 2024, 24999, 34999, 1),
((SELECT id FROM brands WHERE slug='eufy'), 'FamiLock E Series', 'eufy-familock-e', 'Mid-range video smart locks with fingerprint.', 2023, 17999, 24999, 2),
((SELECT id FROM brands WHERE slug='eufy'), 'FamiLock C Series', 'eufy-familock-c', 'Affordable keypad smart locks for everyday use.', 2023, 9999, 14999, 3);

-- EUFY — Products
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
    (SELECT id FROM product_series WHERE slug='eufy-familock-s'),
    (SELECT id FROM brands WHERE slug='eufy'),
    'Eufy FamiLock S3 Max', 'eufy-familock-s3-max', 'T8530',
    'Palm vein recognition + fingerprint + video. BHMA Grade 1. Built-in 2K camera with two-way audio and local storage.',
    29999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 1800, '1', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 63, 54, '60,70',
    0.35, 450.0, 10,
    50, 100, 0, 200,
    '2.4GHz', 30, 'internal',
    '["Amazon Alexa","Google Home","Apple HomeKit"]',
    4.5, 1900,
    'Eufy FamiLock S3 Max Review — Palm Vein + Video Smart Lock 2026',
    'Review of Eufy FamiLock S3 Max. Palm vein recognition, 2K camera, BHMA Grade 1. The most feature-packed smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='eufy-familock-e'),
    (SELECT id FROM brands WHERE slug='eufy'),
    'Eufy Video Smart Lock E330', 'eufy-video-lock-e330', 'T8520',
    'Video smart lock with 2K camera, fingerprint reader, and two-way audio. Local video storage on built-in 16GB eMMC.',
    22999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 1650, '1', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 63, 54, '60,70',
    0.30, 380.0, 10,
    50, 50, 0, 200,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.4, 2400,
    'Eufy Video Smart Lock E330 Review — 2K Camera + Fingerprint 2026',
    'Review of Eufy Video Smart Lock E330. 2K camera, fingerprint, local storage. Best video smart lock value.'
),
(
    (SELECT id FROM product_series WHERE slug='eufy-familock-c'),
    (SELECT id FROM brands WHERE slug='eufy'),
    'Eufy Smart Lock C241', 'eufy-smart-lock-c241', 'T8510',
    'Affordable keypad smart lock with fingerprint reader. Wi-Fi built-in, BHMA Grade 2. Great for budget-conscious buyers.',
    12999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1050, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 200.0, 10,
    50, 50, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 1600,
    'Eufy Smart Lock C241 Review — Budget Fingerprint + WiFi Lock 2026',
    'Review of Eufy Smart Lock C241. Fingerprint, Wi-Fi, BHMA Grade 2 for under $130. Best budget fingerprint lock.'
);

-- =====================================================
-- SWITCHBOT — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='switchbot'), 'Lock Ultra', 'switchbot-lock-ultra', 'Premium retrofit lock with rechargeable battery and Matter support.', 2025, 15999, 24999, 1),
((SELECT id FROM brands WHERE slug='switchbot'), 'Lock Pro', 'switchbot-lock-pro', 'Retrofit smart lock with 3-in-1 installation flexibility.', 2023, 11999, 16999, 2);

-- SWITCHBOT — Products
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
    (SELECT id FROM product_series WHERE slug='switchbot-lock-ultra'),
    (SELECT id FROM brands WHERE slug='switchbot'),
    'SwitchBot Lock Ultra', 'switchbot-lock-ultra', 'W5600000',
    'Premium retrofit smart lock with magnesium alloy body. Rechargeable Li-ion battery, triple power protection, 16 ways to unlock. Matter via Hub.',
    15999, 'bluetooth', NULL, 1,
    'lithium-ion', 1, 9, 367, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 0, 1, 0,
    35, 57, 54, '60,70',
    0.05, 15.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 15, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Home","Samsung SmartThings"]',
    4.4, 1200,
    'SwitchBot Lock Ultra Review — Premium Retrofit Smart Lock 2026',
    'Review of SwitchBot Lock Ultra. Magnesium alloy, rechargeable battery, Matter support. Best premium retrofit lock.'
),
(
    (SELECT id FROM product_series WHERE slug='switchbot-lock-pro'),
    (SELECT id FROM brands WHERE slug='switchbot'),
    'SwitchBot Lock Pro', 'switchbot-lock-pro', 'W1601700',
    'Versatile retrofit lock with 3 installation adapters fitting 99% of deadbolts. Removable rechargeable battery.',
    11999, 'bluetooth', NULL, 1,
    'lithium-ion', 1, 9, 450, '2', 'AES-128',
    0, 0, 1, 1, 1, 1, 0, 1, 0,
    35, 57, 54, '60,70',
    0.05, 14.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 15, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Home","Samsung SmartThings"]',
    4.2, 2800,
    'SwitchBot Lock Pro Review — Versatile Retrofit Smart Lock 2026',
    'Review of SwitchBot Lock Pro. 3 adapters for universal fit, rechargeable battery, Matter via Hub. Best value retrofit lock.'
);

-- =====================================================
-- WYZE — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='wyze'), 'Lock Bolt', 'wyze-lock-bolt', 'Budget fingerprint + WiFi deadbolt.', 2025, 6999, 8999, 1);

-- WYZE — Products
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
    'Wyze Lock Bolt v2', 'wyze-lock-bolt-v2', 'WLCKB2',
    'Budget-friendly smart deadbolt with fingerprint reader, Wi-Fi, and keypad. BHMA Grade 2. Under $80.',
    7998, 'wifi', 'bluetooth', 0,
    'AA', 8, 8, 950, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.14, 230.0, 10,
    50, 50, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.0, 3500,
    'Wyze Lock Bolt v2 Review — Best Budget Smart Lock 2026',
    'Review of Wyze Lock Bolt v2. Fingerprint + WiFi + keypad for under $80. BHMA Grade 2. Best budget smart lock.'
);

-- =====================================================
-- NUKI — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='nuki'), 'Smart Lock Pro 4.0', 'nuki-smart-lock-pro-4', 'Premium retrofit with native Matter/Thread and WiFi.', 2024, 24999, 29999, 1),
((SELECT id FROM brands WHERE slug='nuki'), 'Smart Lock 4.0', 'nuki-smart-lock-4', 'Standard retrofit with Matter/Thread via Bluetooth.', 2024, 16999, 19999, 2);

-- NUKI — Products
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
    (SELECT id FROM product_series WHERE slug='nuki-smart-lock-pro-4'),
    (SELECT id FROM brands WHERE slug='nuki'),
    'Nuki Smart Lock Pro 4.0', 'nuki-smart-lock-pro-4', 'NUKI-SLP4',
    'Premium European retrofit with native Matter over Thread, built-in WiFi, and rechargeable battery. Auto-unlock via geofencing.',
    27999, 'thread', 'wifi', 1,
    'lithium-ion', 1, 6, 440, '2', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    35, 57, 0, '0',
    0.04, 15.0, 10,
    200, 0, 0, 200,
    '2.4GHz', 30, 'internal',
    '["Apple Home","Amazon Alexa","Google Home","Samsung SmartThings"]',
    4.4, 1600,
    'Nuki Smart Lock Pro 4.0 Review — European Matter/Thread Leader 2026',
    'Review of Nuki Smart Lock Pro 4.0. Native Matter/Thread, WiFi, rechargeable. The best European smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='nuki-smart-lock-4'),
    (SELECT id FROM brands WHERE slug='nuki'),
    'Nuki Smart Lock 4.0', 'nuki-smart-lock-4', 'NUKI-SL4',
    'Standard European retrofit with Matter/Thread support, AA batteries, and Bluetooth auto-unlock.',
    17999, 'thread', 'bluetooth', 1,
    'AA', 4, 8, 380, '2', 'AES-256',
    0, 0, 1, 1, 1, 0, 1, 1, 0,
    35, 57, 0, '0',
    0.03, 13.0, 10,
    200, 0, 0, 200,
    '2.4GHz', 15, 'internal',
    '["Apple Home","Amazon Alexa","Google Home"]',
    4.2, 2200,
    'Nuki Smart Lock 4.0 Review — Affordable Matter/Thread Retrofit 2026',
    'Review of Nuki Smart Lock 4.0. Matter/Thread, AA batteries, auto-unlock. Best affordable European smart lock.'
);

-- =====================================================
-- IGLOOHOME — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='igloohome'), 'Deadbolt 2S', 'igloohome-deadbolt-2s', 'Offline deadbolt with algoPIN and IP65 rating.', 2022, 14999, 17999, 1),
((SELECT id FROM brands WHERE slug='igloohome'), 'Deadbolt Go', 'igloohome-deadbolt-go', 'Fingerprint deadbolt with offline access.', 2023, 12999, 14999, 2),
((SELECT id FROM brands WHERE slug='igloohome'), 'Keybox 3', 'igloohome-keybox-3', 'Smart keybox for Airbnb and property management.', 2022, 14999, 19999, 3);

-- IGLOOHOME — Products
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
    (SELECT id FROM product_series WHERE slug='igloohome-deadbolt-2s'),
    (SELECT id FROM brands WHERE slug='igloohome'),
    'igloohome Smart Deadbolt 2S', 'igloohome-deadbolt-2s', 'IGD2S-MG',
    'Offline-capable deadbolt with algoPIN technology for remote PIN generation without WiFi. IP65 weatherproof.',
    15999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1100, '2', 'AES-128',
    0, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 60, 54, '60,70',
    0.02, 10.0, 10,
    500, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Airbnb"]',
    4.1, 1100,
    'igloohome Deadbolt 2S Review — Offline algoPIN Smart Lock 2026',
    'Review of igloohome Deadbolt 2S. Offline PIN generation, IP65 weatherproof, Airbnb integration. Best for vacation rentals.'
),
(
    (SELECT id FROM product_series WHERE slug='igloohome-deadbolt-go'),
    (SELECT id FROM brands WHERE slug='igloohome'),
    'igloohome Deadbolt Go', 'igloohome-deadbolt-go', 'IGD-GO',
    'Compact fingerprint deadbolt with offline algoPIN access. Auto-lock timer and activity logging via app.',
    13499, 'bluetooth', NULL, 0,
    'AA', 4, 12, 950, '2', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 1, 1,
    35, 60, 54, '60,70',
    0.02, 10.0, 10,
    500, 100, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Airbnb"]',
    4.0, 650,
    'igloohome Deadbolt Go Review — Fingerprint + Offline Access 2026',
    'Review of igloohome Deadbolt Go. Fingerprint + algoPIN, compact design, Airbnb integration. Best offline fingerprint lock.'
);

-- =====================================================
-- BOSMA — Product Series
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='bosma'), 'Aegis', 'bosma-aegis', 'Video smart lock with facial recognition and HD camera.', 2022, 16999, 22999, 1),
((SELECT id FROM brands WHERE slug='bosma'), 'Sentry', 'bosma-sentry', 'Affordable video smart lock with doorbell camera.', 2023, 12999, 16999, 2);

-- BOSMA — Products
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
    (SELECT id FROM product_series WHERE slug='bosma-aegis'),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Aegis Video Smart Lock', 'bosma-aegis', 'BA-01',
    'Video smart lock with 1080p camera, facial recognition, and two-way audio. Auto-unlock when it recognizes your face.',
    19999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 3, 1400, '2', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.30, 400.0, 10,
    50, 50, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.0, 800,
    'Bosma Aegis Review — Video Smart Lock with Facial Recognition 2026',
    'Review of Bosma Aegis. Video camera, facial recognition, auto-unlock. Smart lock + doorbell camera in one.'
),
(
    (SELECT id FROM product_series WHERE slug='bosma-sentry'),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Sentry Video Doorbell Lock', 'bosma-sentry', 'BS-02',
    'Affordable video smart lock with 720p camera, fingerprint reader, and doorbell function. WiFi connectivity.',
    14999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 3, 1250, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.25, 350.0, 10,
    50, 50, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 450,
    'Bosma Sentry Review — Affordable Video Smart Lock 2026',
    'Review of Bosma Sentry. 720p camera + fingerprint + doorbell. Most affordable video smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — New products
-- =====================================================

-- Protocol tags (new products)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi' AND slug LIKE 'ultraloq-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi' AND slug LIKE 'lockly-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi' AND slug LIKE 'eufy-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi' AND slug LIKE 'wyze-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'wifi' AND slug LIKE 'bosma-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'bluetooth' AND slug LIKE 'switchbot-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'bluetooth' AND slug LIKE 'igloohome-%';
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', protocol FROM products WHERE protocol = 'thread' AND slug LIKE 'nuki-%';

-- Matter tags (new products)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE supports_matter = 1 AND slug IN (
    'ultraloq-bolt-fingerprint-matter', 'switchbot-lock-ultra', 'switchbot-lock-pro',
    'nuki-smart-lock-pro-4', 'nuki-smart-lock-4'
);

-- Fingerprint tags (new products)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE has_fingerprint = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter', 'ultraloq-latch-5-wifi',
    'lockly-secure-pro-wifi', 'lockly-vision-zeno', 'lockly-visage-zeno',
    'eufy-familock-s3-max', 'eufy-video-lock-e330', 'eufy-smart-lock-c241',
    'wyze-lock-bolt-v2', 'igloohome-deadbolt-go', 'bosma-aegis', 'bosma-sentry'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE has_keypad = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter', 'ultraloq-latch-5-wifi',
    'lockly-secure-pro-wifi', 'lockly-vision-zeno', 'lockly-visage-zeno',
    'eufy-familock-s3-max', 'eufy-video-lock-e330', 'eufy-smart-lock-c241',
    'wyze-lock-bolt-v2', 'igloohome-deadbolt-2s', 'igloohome-deadbolt-go',
    'bosma-aegis', 'bosma-sentry'
);

-- Auto-unlock tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'auto-unlock' FROM products WHERE has_auto_unlock = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter',
    'switchbot-lock-ultra', 'switchbot-lock-pro',
    'nuki-smart-lock-pro-4', 'nuki-smart-lock-4',
    'bosma-aegis'
);

-- Physical key tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'physical-key' FROM products WHERE has_physical_key = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter', 'ultraloq-latch-5-wifi',
    'lockly-secure-pro-wifi', 'lockly-vision-zeno', 'lockly-visage-zeno',
    'eufy-familock-s3-max', 'eufy-video-lock-e330', 'eufy-smart-lock-c241',
    'wyze-lock-bolt-v2', 'igloohome-deadbolt-2s', 'igloohome-deadbolt-go',
    'bosma-aegis', 'bosma-sentry'
);

-- Price tier tags (new products)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'budget' FROM products p WHERE p.price_usd < 18000 AND p.slug IN (
    'ultraloq-latch-5-wifi', 'eufy-smart-lock-c241', 'switchbot-lock-ultra', 'switchbot-lock-pro',
    'wyze-lock-bolt-v2', 'nuki-smart-lock-4', 'igloohome-deadbolt-2s', 'igloohome-deadbolt-go',
    'bosma-sentry'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'mid' FROM products p WHERE p.price_usd >= 18000 AND p.price_usd < 28000 AND p.slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter',
    'lockly-secure-pro-wifi', 'eufy-video-lock-e330',
    'nuki-smart-lock-pro-4', 'bosma-aegis'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT p.id, 'price_tier', 'premium' FROM products p WHERE p.price_usd >= 28000 AND p.slug IN (
    'eufy-familock-s3-max', 'lockly-vision-zeno', 'lockly-visage-zeno'
);

-- Scenario tags (new products)
-- Apartment-friendly (retrofit)
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products
WHERE slug IN ('switchbot-lock-ultra', 'switchbot-lock-pro', 'nuki-smart-lock-pro-4', 'nuki-smart-lock-4');

-- Airbnb / Short-term rental
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'airbnb' FROM products
WHERE slug IN (
    'igloohome-deadbolt-2s', 'igloohome-deadbolt-go',
    'lockly-secure-pro-wifi', 'ultraloq-u-bolt-pro-wifi'
);

-- Rental properties
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products
WHERE has_guest_codes = 1 AND has_keypad = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter',
    'lockly-secure-pro-wifi', 'lockly-vision-zeno',
    'eufy-familock-s3-max', 'eufy-video-lock-e330', 'eufy-smart-lock-c241',
    'wyze-lock-bolt-v2', 'igloohome-deadbolt-2s', 'igloohome-deadbolt-go',
    'bosma-aegis', 'bosma-sentry'
);

-- Family-friendly
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products
WHERE has_keypad = 1 AND has_auto_lock = 1 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter', 'ultraloq-latch-5-wifi',
    'eufy-familock-s3-max', 'eufy-video-lock-e330', 'eufy-smart-lock-c241',
    'wyze-lock-bolt-v2', 'bosma-aegis', 'bosma-sentry'
);

-- Home security focused
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products
WHERE rating >= 4.0 AND slug IN (
    'ultraloq-u-bolt-pro-wifi', 'ultraloq-bolt-fingerprint-matter',
    'lockly-secure-pro-wifi', 'lockly-visage-zeno',
    'eufy-familock-s3-max', 'eufy-video-lock-e330',
    'nuki-smart-lock-pro-4'
);
