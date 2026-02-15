-- =====================================================
-- Brand Expansion #3 — 7 New Brands + Extra Products for Existing Brands
-- Hornbill, SMONET, Sifely, Defiant, Danalock, Weiser, TCL
-- + Schlage Encode Plus, Kwikset Halo Touch, Kwikset Halo Select
-- + Yale Assure Lock SL, August WiFi Smart Lock (4th Gen)
-- =====================================================

-- =====================================================
-- BRANDS (7 new)
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
    'Hornbill', 'hornbill',
    'Amazon bestselling budget smart locks with fingerprint, keypad, and WiFi gateway. Excellent value under $100.',
    'Hornbill has emerged as one of the top-selling budget smart lock brands on Amazon, offering a surprisingly feature-rich lineup at prices that undercut major brands by 50-70%. Their locks feature semiconductor fingerprint sensors capable of 0.2-second recognition, illuminated keypads, IC card access, and Bluetooth connectivity — with optional WiFi gateway for remote access and Alexa/Google Home integration. Available in deadbolt, lever, and mortise configurations, Hornbill locks come in multiple series (M-Series, A-Series, Y-Series, H-Series) to cover different door types. While they lack ANSI certification, their zinc alloy construction and 4xAA battery operation deliver reliable performance for budget-conscious homeowners.',
    '/images/brands/hornbill-logo.png', 'https://www.hornbilllock.com/',
    'CN', 2018,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.0, 0, 21, 'published',
    'Hornbill Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Hornbill smart locks. Budget Amazon bestseller, fingerprint, keypad, WiFi gateway. Best smart lock under $100.'
),
(
    'SMONET', 'smonet',
    'Handle-style smart locks with fingerprint, keypad, and IC cards. IP65 weatherproof, TTLock app compatible.',
    'SMONET specializes in handle-style smart locks that combine a lever handle with electronic access control — making them ideal for replacing traditional lever locksets without adding a separate deadbolt. The ZNS-H001 flagship features a zinc alloy body with IP65 weatherproofing, a semiconductor fingerprint sensor storing up to 250 prints, a touchscreen keypad with anti-peep function, and support for IC cards, mechanical keys, and smartphone Bluetooth. Remote access requires a separate G2 WiFi Gateway. SMONET locks are TTLock/Sciener app compatible and work with Alexa and Google Home, offering premium features at mid-range pricing.',
    '/images/brands/smonet-logo.png', 'https://www.smonet.com/',
    'CN', 2017,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    3.9, 0, 22, 'published',
    'SMONET Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to SMONET smart locks. Handle-style, fingerprint, IP65, TTLock app. Best lever handle smart lock for homes.'
),
(
    'Sifely', 'sifely',
    'Versatile smart locks with 6 unlocking methods. Popular for Airbnb hosts with easy code management.',
    'Sifely offers both lever and deadbolt smart locks with up to six ways to unlock: fingerprint, keypad, smartphone app, key fob (RFID), physical key, and auto-unlock. Their 3rd/4th generation 3D fingerprint sensors unlock doors in under 0.3 seconds. Sifely locks are particularly popular among short-term rental hosts thanks to easy guest code management through the Sifely app — including timed, recurring, and one-time codes. A separate WiFi Gateway (G2) enables remote access and integration with Alexa and Google Home. Operating on 4 AA batteries lasting up to a year, Sifely locks offer premium features at an accessible price point.',
    '/images/brands/sifely-logo.png', 'https://www.sifely.com/',
    'CN', 2019,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.0, 0, 23, 'published',
    'Sifely Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Sifely smart locks. 6 unlocking methods, fingerprint, Airbnb-friendly. Best smart lock for rental hosts.'
),
(
    'Defiant', 'defiant',
    'Home Depot exclusive smart locks powered by Hubspace. Affordable WiFi deadbolts with fingerprint.',
    'Defiant is Home Depot''s house brand for residential lock hardware, and their smart lock lineup — "Powered by Hubspace" — brings WiFi connectivity, fingerprint access, and app control to an extremely competitive price point. Defiant smart deadbolts connect to the Hubspace smart home platform, enabling remote lock/unlock, event log viewing, and voice control via Google Assistant and Amazon Alexa. Each WiFi model includes a smart plug that doubles as a WiFi gateway. Available exclusively at Home Depot, Defiant locks are ANSI Grade 3 certified and designed for easy DIY installation on standard US doors.',
    '/images/brands/defiant-logo.png', 'https://www.homedepot.com/',
    'US', 2015,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    3.8, 0, 24, 'published',
    'Defiant Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Defiant smart locks at Home Depot. Hubspace WiFi, fingerprint, under $120. Budget smart lock guide.'
),
(
    'Danalock', 'danalock',
    'Danish retrofit smart lock with Z-Wave, Zigbee, and Matter/Thread. Premium European engineering.',
    'Danalock is a Danish smart lock company that has built a reputation for premium European retrofit smart locks. The Danalock V3 attaches over your existing thumbturn — no drilling, no door modifications — and supports Z-Wave, Zigbee, and Bluetooth connectivity through swappable radio modules. Compatible with Apple HomeKit, Google Home, and Amazon Alexa, Danalock V3 handles European cylinder locks (DIN standard) and US deadbolts with adapter plates. Their latest developments include Matter/Thread support for the next generation. Danalock''s geofencing auto-lock/unlock, shared access, and auto-calibration make it one of the most polished retrofit solutions in Europe.',
    '/images/brands/danalock-logo.png', 'https://www.danalock.com/',
    'DK', 2013,
    0, 1, 1, 1, 1, 1,
    'residential', 'mid',
    4.1, 0, 25, 'published',
    'Danalock Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Danalock. Danish retrofit smart lock, Z-Wave, Zigbee, Matter. Best European retrofit smart lock.'
),
(
    'Weiser', 'weiser',
    'Canadian sister brand of Kwikset with SmartKey security. Halo line with WiFi and fingerprint.',
    'Weiser, owned by Spectrum Brands (parent company of Kwikset), is the leading smart lock brand in Canada. Their Halo line mirrors Kwikset''s technology — built-in WiFi, SmartKey re-key technology, and BHMA AAA residential certification — but is marketed and warrantied specifically for the Canadian market. The Weiser Halo Touch brings fingerprint biometrics to a WiFi deadbolt, while the Halo Touchscreen offers keypad entry with up to 250 user codes. Both integrate with the Weiser app, Amazon Alexa, and Google Assistant for remote access and voice control. Weiser also offers traditional electronic deadbolts under the Powerbolt and SmartCode lines.',
    '/images/brands/weiser-logo.png', 'https://www.weiserlock.com/',
    'CA', 1904,
    1, 0, 0, 0, 0, 1,
    'residential', 'mid',
    4.2, 0, 26, 'published',
    'Weiser Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Weiser smart locks. Canada''s top lock brand, WiFi Halo, SmartKey security. Best Canadian smart lock.'
),
(
    'TCL', 'tcl',
    'Electronics giant entering smart locks with palm vein recognition and 3D face ID technology.',
    'TCL, the global consumer electronics brand known for TVs and smartphones, has expanded into smart home security with an ambitious lineup of smart door locks. TCL locks differentiate with cutting-edge biometric technology including palm vein recognition and 3D structured light facial recognition — technologies borrowed from their mobile device division. Their smart locks feature large touchscreens, built-in WiFi, and integration with the TCL Home app ecosystem. Targeting the premium Asian and European markets, TCL locks combine the brand''s electronics expertise with increasingly competitive smart lock engineering.',
    '/images/brands/tcl-logo.png', 'https://www.tcl.com/',
    'CN', 1981,
    1, 0, 0, 0, 0, 1,
    'all', 'mid',
    3.9, 0, 27, 'published',
    'TCL Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to TCL smart locks. Palm vein recognition, 3D facial recognition. Electronics giant meets smart security.'
);

-- =====================================================
-- HORNBILL — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='hornbill'), 'Y-Series', 'hornbill-y-series', 'Fingerprint deadbolt smart locks with WiFi gateway.', 2023, 4999, 8999, 1);

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
    (SELECT id FROM product_series WHERE slug='hornbill-y-series'),
    (SELECT id FROM brands WHERE slug='hornbill'),
    'Hornbill Y4 Smart Deadbolt', 'hornbill-y4', 'Y4-BWFHS-H',
    'Budget fingerprint deadbolt with WiFi gateway. 0.2s fingerprint recognition, illuminated keypad, IC card, Alexa/Google compatible.',
    7999, 'bluetooth', 'wifi', 0,
    'AA', 4, 8, 1100, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.08, 180.0, 10,
    200, 100, 100, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.1, 5800,
    'Hornbill Y4 Review — Best Budget Smart Lock Under $80 2026',
    'Review of Hornbill Y4. Fingerprint, keypad, WiFi, under $80. The Amazon bestselling budget smart deadbolt.'
);

-- =====================================================
-- SMONET — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='smonet'), 'ZNS-H Series', 'smonet-zns-h', 'Handle-style smart locks with fingerprint and IP65.', 2022, 10000, 17500, 1);

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
    (SELECT id FROM product_series WHERE slug='smonet-zns-h'),
    (SELECT id FROM brands WHERE slug='smonet'),
    'SMONET ZNS-H001 Smart Handle Lock', 'smonet-zns-h001', 'ZNS-H001',
    'IP65 weatherproof handle lock with fingerprint (250), touchscreen keypad anti-peep, IC cards, Bluetooth. WiFi via G2 gateway.',
    15499, 'bluetooth', 'wifi', 0,
    'AA', 4, 8, 1300, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    33, 45, 54, '60,70',
    0.08, 200.0, 10,
    300, 250, 1000, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 3200,
    'SMONET ZNS-H001 Review — IP65 Handle Smart Lock 2026',
    'Review of SMONET ZNS-H001. Handle-style, fingerprint, IP65 waterproof, 250 fingerprints. Best lever handle smart lock.'
);

-- =====================================================
-- SIFELY — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='sifely'), 'Sifely Smart Lock', 'sifely-smart-lock', 'Lever handle and deadbolt smart locks with 6 access methods.', 2022, 5000, 15000, 1);

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
    (SELECT id FROM product_series WHERE slug='sifely-smart-lock'),
    (SELECT id FROM brands WHERE slug='sifely'),
    'Sifely X Smart Lock', 'sifely-x', 'SIFELY-X',
    '6-in-1 lever handle lock: fingerprint (0.3s, 4th gen), keypad, app, key fob, physical key, auto-unlock. WiFi via G2 gateway.',
    12999, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 1200, '0', 'AES-128',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    33, 55, 54, '60,70',
    0.06, 150.0, 10,
    200, 150, 100, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.0, 2100,
    'Sifely X Review — 6-in-1 Smart Lock for Airbnb 2026',
    'Review of Sifely X. 6 unlocking methods, fingerprint, keypad, Airbnb guest codes. Best smart lock for rental hosts.'
);

-- =====================================================
-- DEFIANT — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='defiant'), 'Hubspace', 'defiant-hubspace', 'WiFi smart deadbolts powered by Hubspace platform.', 2023, 7999, 11999, 1);

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
    (SELECT id FROM product_series WHERE slug='defiant-hubspace'),
    (SELECT id FROM brands WHERE slug='defiant'),
    'Defiant Square Fingerprint WiFi Deadbolt', 'defiant-square-fingerprint-wifi', 'DEF-SQ-FP-WIFI',
    'WiFi deadbolt with fingerprint + keypad powered by Hubspace. Includes smart plug gateway. Google Assistant + Alexa.',
    11900, 'wifi', 'bluetooth', 0,
    'AA', 4, 10, 1100, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 250.0, 10,
    50, 20, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Google Home","Amazon Alexa","Hubspace"]',
    3.8, 1800,
    'Defiant Hubspace WiFi Deadbolt Review — Home Depot Exclusive 2026',
    'Review of Defiant WiFi fingerprint deadbolt. Hubspace platform, $119, Home Depot exclusive. Budget smart lock.'
);

-- =====================================================
-- DANALOCK — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='danalock'), 'Danalock V3', 'danalock-v3', 'Retrofit smart lock with Z-Wave/Zigbee/Bluetooth modules.', 2018, 14999, 22000, 1);

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
    'Danalock V3 Universal Bluetooth + Z-Wave', 'danalock-v3-zwave', 'V3-BTZE',
    'Danish retrofit smart lock with Bluetooth + Z-Wave. Geofencing auto-lock, shared access, European cylinder + US deadbolt adapters.',
    18999, 'bluetooth', 'zwave', 0,
    'CR123A', 4, 12, 230, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.03, 10.0, 50,
    20, 0, 0, 200,
    '908.42MHz', 30, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Home","SmartThings"]',
    4.1, 1600,
    'Danalock V3 Review — Best European Retrofit Smart Lock 2026',
    'Review of Danalock V3. Danish design, Z-Wave + Bluetooth, geofencing, HomeKit. Best retrofit smart lock for Europe.'
);

-- =====================================================
-- WEISER — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='weiser'), 'Halo', 'weiser-halo', 'WiFi smart deadbolts with SmartKey security for Canadian market.', 2021, 19999, 29999, 1);

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
    (SELECT id FROM product_series WHERE slug='weiser-halo'),
    (SELECT id FROM brands WHERE slug='weiser'),
    'Weiser Halo Touch WiFi Fingerprint Deadbolt', 'weiser-halo-touch', '9GED25000',
    'WiFi fingerprint deadbolt for Canadian market. SmartKey re-key, BHMA AAA rated, 100 fingerprints, remote access.',
    24999, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 1200, 'AAA', 'AES-128',
    1, 0, 1, 0, 1, 1, 0, 1, 1,
    35, 57, 54, '60,70',
    0.15, 300.0, 10,
    0, 100, 0, 50,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 1100,
    'Weiser Halo Touch Review — Best Canadian WiFi Smart Lock 2026',
    'Review of Weiser Halo Touch. WiFi fingerprint deadbolt, SmartKey, BHMA AAA. Canada''s preferred smart lock.'
);

-- =====================================================
-- TCL — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='tcl'), 'TCL Smart Lock', 'tcl-smart-lock', 'Smart locks with palm vein and facial recognition.', 2024, 20000, 45000, 1);

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
    (SELECT id FROM product_series WHERE slug='tcl-smart-lock'),
    (SELECT id FROM brands WHERE slug='tcl'),
    'TCL P100 3D Face Recognition Lock', 'tcl-p100', 'TCL-P100',
    '3D structured light facial recognition + palm vein + fingerprint. WiFi, large touchscreen, auto-lock mortise.',
    39999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 3, 3000, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 120, 0, '0',
    0.60, 700.0, 10,
    100, 200, 200, 100,
    '2.4GHz', 25, 'internal',
    '["TCL Home"]',
    3.9, 400,
    'TCL P100 Review — Palm Vein + Face ID Smart Lock 2026',
    'Review of TCL P100. Palm vein recognition, 3D face ID, WiFi. Electronics giant enters premium smart locks.'
);

-- =====================================================
-- EXISTING BRANDS — Additional Products
-- =====================================================

-- Schlage Encode Plus (Apple Home Key!)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='schlage'), 'Encode Plus', 'schlage-encode-plus', 'WiFi + Thread smart deadbolt with Apple Home Key.', 2022, 25999, 32999, 3);

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
    'Schlage Encode Plus WiFi + Thread Deadbolt', 'schlage-encode-plus-wifi', 'BE499WB',
    'The only ANSI Grade 1 smart deadbolt with Apple Home Key. WiFi + Thread, tap-to-unlock with iPhone/Apple Watch. 4 AA batteries.',
    29999, 'wifi', 'thread', 0,
    'AA', 4, 12, 1300, '1', 'AES-256',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 280.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Apple Home Key","Amazon Alexa","Google Home"]',
    4.7, 8200,
    'Schlage Encode Plus Review — Apple Home Key Smart Deadbolt 2026',
    'Review of Schlage Encode Plus. Apple Home Key, WiFi + Thread, ANSI Grade 1. Best smart lock for Apple users.'
);

-- Kwikset Halo Touch (Fingerprint WiFi)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kwikset'), 'Halo Touch', 'kwikset-halo-touch', 'WiFi fingerprint deadbolt with SmartKey re-key.', 2021, 22999, 26999, 3);

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
    (SELECT id FROM product_series WHERE slug='kwikset-halo-touch'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Halo Touch Fingerprint WiFi Deadbolt', 'kwikset-halo-touch-wifi', '99590-004',
    'WiFi fingerprint smart deadbolt. BHMA AAA rated, SmartKey re-key, 100 fingerprints, remote app control.',
    24999, 'wifi', 'bluetooth', 0,
    'AA', 4, 6, 1200, 'AAA', 'AES-128',
    1, 0, 1, 0, 1, 1, 0, 1, 1,
    35, 57, 54, '60,70',
    0.15, 300.0, 10,
    0, 100, 0, 50,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.3, 3500,
    'Kwikset Halo Touch Review — WiFi Fingerprint Deadbolt 2026',
    'Review of Kwikset Halo Touch. WiFi fingerprint deadbolt, BHMA AAA, SmartKey. Best fingerprint smart lock.'
);

-- Kwikset Halo Select (NEW 2025, Matter + Thread!)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kwikset'), 'Halo Select', 'kwikset-halo-select', 'WiFi + Matter/Thread flagship with door ajar sensor.', 2025, 27999, 29999, 4);

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
    (SELECT id FROM product_series WHERE slug='kwikset-halo-select'),
    (SELECT id FROM brands WHERE slug='kwikset'),
    'Kwikset Halo Select WiFi + Matter Deadbolt', 'kwikset-halo-select-wifi', 'HALO-SELECT-2025',
    'Kwikset''s 2025 flagship. WiFi + Matter/Thread, door ajar sensor, geofencing auto-unlock, UV-resistant touchscreen. 250 user codes.',
    27999, 'wifi', 'thread', 1,
    'AA', 4, 12, 1250, 'AAA', 'AES-256',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.15, 280.0, 10,
    250, 0, 0, 100,
    '2.4GHz', 30, 'internal',
    '["Apple Home","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 800,
    'Kwikset Halo Select Review — Matter + WiFi Flagship 2026',
    'Review of Kwikset Halo Select. Matter/Thread + WiFi, door ajar sensor, geofencing. Kwikset''s best smart lock for 2025.'
);

-- Yale Assure Lock SL (slim touchscreen, no key)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='yale'), 'Assure Lock SL', 'yale-assure-lock-sl', 'Slim touchscreen deadbolt with no physical key.', 2018, 17999, 22999, 3);

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
    (SELECT id FROM product_series WHERE slug='yale-assure-lock-sl'),
    (SELECT id FROM brands WHERE slug='yale'),
    'Yale Assure Lock SL WiFi Touchscreen', 'yale-assure-lock-sl-wifi', 'YRD256-WF1',
    'Sleek key-free touchscreen deadbolt. No physical key cylinder — cleaner exterior. WiFi built-in, 250 PIN codes.',
    21999, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 900, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 0,
    35, 57, 54, '60,70',
    0.12, 220.0, 10,
    250, 0, 0, 250,
    '2.4GHz', 30, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.4, 4200,
    'Yale Assure Lock SL Review — Slim Touchscreen Deadbolt 2026',
    'Review of Yale Assure Lock SL. Key-free touchscreen, WiFi, 250 codes. The sleekest Yale smart deadbolt.'
);

-- August WiFi Smart Lock (4th Gen)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='august'), 'WiFi Smart Lock 4th Gen', 'august-wifi-4th-gen', 'Compact retrofit with built-in WiFi. No bridge needed.', 2020, 22999, 24999, 3);

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
    (SELECT id FROM product_series WHERE slug='august-wifi-4th-gen'),
    (SELECT id FROM brands WHERE slug='august'),
    'August WiFi Smart Lock (4th Gen)', 'august-wifi-4th-gen', 'AUG-SL05-M01-S01',
    '45% smaller than previous gen. Built-in WiFi — no bridge needed. Retrofit over existing deadbolt. DoorSense sensor.',
    22999, 'wifi', 'bluetooth', 0,
    'CR123A', 2, 6, 250, '0', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.25, 350.0, 10,
    0, 0, 0, 200,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.3, 15000,
    'August WiFi Smart Lock 4th Gen Review — Compact Retrofit 2026',
    'Review of August WiFi Smart Lock 4th Gen. 45% smaller, built-in WiFi, no bridge. Best compact retrofit deadbolt.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 3 products
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'hornbill-y4', 'smonet-zns-h001', 'sifely-x', 'danalock-v3-zwave'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'defiant-square-fingerprint-wifi', 'weiser-halo-touch', 'tcl-p100',
    'schlage-encode-plus-wifi', 'kwikset-halo-touch-wifi', 'kwikset-halo-select-wifi',
    'yale-assure-lock-sl-wifi', 'august-wifi-4th-gen'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'thread' FROM products WHERE slug IN (
    'schlage-encode-plus-wifi', 'kwikset-halo-select-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'zwave' FROM products WHERE slug = 'danalock-v3-zwave';

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'kwikset-halo-select-wifi';

-- Apple Home Key tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'apple-home-key' FROM products WHERE slug = 'schlage-encode-plus-wifi';

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'hornbill-y4', 'smonet-zns-h001', 'sifely-x',
    'defiant-square-fingerprint-wifi', 'weiser-halo-touch', 'tcl-p100',
    'kwikset-halo-touch-wifi'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'hornbill-y4', 'smonet-zns-h001', 'sifely-x',
    'defiant-square-fingerprint-wifi', 'tcl-p100',
    'schlage-encode-plus-wifi', 'kwikset-halo-select-wifi',
    'yale-assure-lock-sl-wifi'
);

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'danalock-v3-zwave', 'august-wifi-4th-gen'
);

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'hornbill-y4', 'defiant-square-fingerprint-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'smonet-zns-h001', 'sifely-x', 'danalock-v3-zwave', 'weiser-halo-touch',
    'yale-assure-lock-sl-wifi', 'august-wifi-4th-gen', 'kwikset-halo-touch-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'tcl-p100', 'schlage-encode-plus-wifi', 'kwikset-halo-select-wifi'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'sifely-x', 'hornbill-y4', 'yale-assure-lock-sl-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'danalock-v3-zwave', 'august-wifi-4th-gen'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apple-ecosystem' FROM products WHERE slug IN (
    'schlage-encode-plus-wifi', 'august-wifi-4th-gen'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'kwikset-halo-touch-wifi', 'kwikset-halo-select-wifi',
    'weiser-halo-touch', 'defiant-square-fingerprint-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'schlage-encode-plus-wifi', 'kwikset-halo-select-wifi',
    'tcl-p100', 'smonet-zns-h001'
);
