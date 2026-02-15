-- =====================================================
-- Brand Expansion #4 — 6 New Brands + Extra Products for Existing Brands
-- Veise, Teeho, HARFO (Amazon budget)
-- Tedee (Polish premium), Kaadas (Asian premium), Latch (commercial)
-- + Aqara U200, Level Lock+, Nuki Smart Lock Pro, Lockly Flex Touch
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
    'Veise', 'veise',
    'Amazon #1 bestselling budget fingerprint deadbolt. IP65 weatherproof, 6 unlocking methods, USB-C emergency.',
    'Veise has rapidly become one of Amazon''s top-selling smart lock brands, earning the #1 bestseller badge in the deadbolt category. Their locks offer an impressive feature-to-price ratio: semiconductor fingerprint sensors with 0.2-second recognition, illuminated touchscreen keypads with anti-peep codes, IC card (key fob) access, eKey sharing, and mechanical key backup. Models range from Bluetooth-only (VE07, VE017) requiring a separate G1/G2 gateway for WiFi, to built-in WiFi models (VE012W, VE027). Constructed from aluminum and zinc alloy with IP54-IP65 weatherproofing, Veise locks operate in temperatures from -31°F to 158°F. ANSI Grade 3 certified, with USB-C emergency charging port.',
    '/images/brands/veise-logo.png', 'https://www.iveise.com/',
    'CN', 2019,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.2, 0, 28, 'published',
    'Veise Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Veise smart locks. Amazon #1 bestseller, fingerprint deadbolt, IP65, under $100. Best budget smart lock.'
),
(
    'Teeho', 'teeho',
    'Amazon bestselling keyless deadbolts with fingerprint. Aluminum body, IP54, one-time codes for guests.',
    'Teeho burst onto the smart lock scene as Amazon''s bestselling deadbolt brand, anchored by the TE002 — a fingerprint + keypad deadbolt that routinely sells for under $50. Built from aluminum with an IP54 weatherproofing rating, Teeho locks support 20 fingerprints and 20 user codes including one-time temporary codes for guests. The auto-lock timer is adjustable from 10-99 seconds, and the anti-peep password function adds security in shared environments. WiFi-enabled models (TE012W, TE217) bring remote control and Alexa compatibility, while the core TE002 keeps things simple with offline keypad + fingerprint at an unbeatable price. ANSI Grade 3 certified.',
    '/images/brands/teeho-logo.png', 'https://www.teeho.com/',
    'CN', 2020,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    4.1, 0, 29, 'published',
    'Teeho Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Teeho smart locks. Amazon bestselling deadbolt, fingerprint, under $50. Best ultra-budget smart lock.'
),
(
    'HARFO', 'harfo',
    'Budget lever handle smart locks with fingerprint, keypad, IC cards. Zinc construction, WiFi via gateway.',
    'HARFO produces affordable lever handle smart locks that pack fingerprint, touchscreen keypad, IC card, and mechanical key access into a zinc alloy body. Popular models like the D02H and HF-LM801BK support up to 50 fingerprints, 250 passcodes, and 1000 IC cards. Features include anti-peep password entry, adjustable auto-lock (5-900 seconds), privacy mode, passage mode, and a USB emergency power port. Remote WiFi control requires HARFO''s separately sold WiFi Gateway, which enables Alexa and Google Assistant voice control. Compatible with standard American doors (1 3/8" to 2 3/16" thick), HARFO locks offer solid budget performance.',
    '/images/brands/harfo-logo.png', 'https://www.harfolock.com/',
    'CN', 2018,
    1, 0, 0, 0, 0, 1,
    'residential', 'budget',
    3.9, 0, 30, 'published',
    'HARFO Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to HARFO smart locks. Budget lever handle, fingerprint, keypad, IC card. Best budget handle smart lock.'
),
(
    'Tedee', 'tedee',
    'Polish premium retrofit smart lock. Anodized aluminum, rechargeable Li-Po, European cylinder compatible.',
    'Tedee is a Polish smart lock company that has established itself as a premium alternative to Nuki in the European retrofit market. The Tedee PRO features an elegant anodized aluminum body (45mm diameter, 196g) with a coreless DC motor that''s whisper-quiet during operation. Powered by a built-in 3000 mAh rechargeable Li-Po battery lasting 6-10 months per overnight charge, Tedee locks attach to European euro profile cylinders. The Tedee Bridge accessory enables remote access, while the optional Tedee Keypad provides code entry without a phone. Available in black, white, silver, and gold finishes, Tedee combines Polish engineering precision with Scandinavian design sensibility.',
    '/images/brands/tedee-logo.png', 'https://www.tedee.com/',
    'PL', 2019,
    0, 0, 0, 0, 0, 1,
    'residential', 'premium',
    4.3, 0, 31, 'published',
    'Tedee Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Tedee smart locks. Polish retrofit, aluminum, rechargeable. Premium European smart lock alternative.'
),
(
    'Kaadas', 'kaadas',
    'Premium Asian smart lock brand with 3D face recognition, palm vein, and push-pull handles.',
    'Kaadas (凯迪仕) is a leading smart lock brand in Asia, known for pushing the boundaries of biometric access technology. Their product lineup features 3D structured light facial recognition, palm vein scanning, semiconductor fingerprint sensors, and touchscreen keypads — all housed in premium push-pull handle designs. Kaadas locks target the high-security Chinese residential market and have expanded internationally to Southeast Asia, Europe, and the US. Their flagship models include large IPS touchscreen displays, built-in WiFi with cloud connectivity, anti-pry alarms, and lithium-ion rechargeable batteries. Kaadas combines Chinese smart manufacturing expertise with luxury aesthetics.',
    '/images/brands/kaadas-logo.png', 'https://www.kaadas.com/',
    'CN', 2007,
    1, 0, 0, 0, 0, 1,
    'residential', 'premium',
    4.2, 0, 32, 'published',
    'Kaadas Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Kaadas smart locks. 3D face recognition, palm vein, push-pull. Premium Asian smart lock brand.'
),
(
    'Latch', 'latch',
    'Enterprise smart access for multifamily buildings. Full-door solution with camera, intercom, and SaaS.',
    'Latch revolutionized the commercial smart access market with its full-door, full-building approach to smart locks. Now a part of Dormakaba, Latch offers the Latch M (mortise) and Latch C (cylindrical) smart locks designed specifically for multifamily apartment buildings, offices, and commercial properties. Each lock integrates a camera, intercom, and reader into a single elegant device. Paired with the LatchOS SaaS platform, property managers can remotely manage access, issue temporary keys to guests and delivery personnel, monitor entry activity, and integrate with property management systems. Latch''s cloud-first architecture sets it apart from consumer smart locks.',
    '/images/brands/latch-logo.png', 'https://www.latch.com/',
    'US', 2014,
    1, 0, 0, 0, 0, 1,
    'commercial', 'premium',
    4.0, 0, 33, 'published',
    'Latch Smart Locks — Complete Brand Guide & Reviews 2026',
    'Complete guide to Latch smart access. Enterprise multifamily, camera intercom, LatchOS SaaS. Best commercial smart lock.'
);

-- =====================================================
-- VEISE — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='veise'), 'VE Series', 'veise-ve-series', 'Fingerprint deadbolts with optional WiFi.', 2023, 4800, 18000, 1);

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
    (SELECT id FROM product_series WHERE slug='veise-ve-series'),
    (SELECT id FROM brands WHERE slug='veise'),
    'Veise VE07 Fingerprint Deadbolt', 'veise-ve07', 'VE07',
    'Amazon #1 bestseller. 0.2s fingerprint, keypad, IC card, eKey, physical key. Bluetooth + WiFi via gateway. IP54, USB-C backup.',
    9699, 'bluetooth', 'wifi', 0,
    'AA', 4, 10, 1050, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.06, 150.0, 10,
    250, 50, 1000, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.2, 14000,
    'Veise VE07 Review — Amazon #1 Bestseller Smart Deadbolt 2026',
    'Review of Veise VE07. Amazon''s #1 bestselling deadbolt, fingerprint, under $100. The ultimate budget smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='veise-ve-series'),
    (SELECT id FROM brands WHERE slug='veise'),
    'Veise VE012W WiFi Fingerprint Deadbolt', 'veise-ve012w', 'VE012W',
    'Built-in WiFi model — no gateway needed. Fingerprint, keypad, IC card, app. IP65, 8xAA for extended battery life.',
    7999, 'wifi', 'bluetooth', 0,
    'AA', 8, 12, 1200, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.10, 200.0, 10,
    250, 50, 1000, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.1, 3500,
    'Veise VE012W Review — Built-in WiFi Fingerprint Deadbolt 2026',
    'Review of Veise VE012W. Built-in WiFi, fingerprint, no gateway needed. Best budget WiFi smart deadbolt.'
);

-- =====================================================
-- TEEHO — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='teeho'), 'TE Series', 'teeho-te-series', 'Fingerprint keypad deadbolts from ultra-budget to WiFi.', 2022, 4600, 18999, 1);

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
    (SELECT id FROM product_series WHERE slug='teeho-te-series'),
    (SELECT id FROM brands WHERE slug='teeho'),
    'Teeho TE002 Fingerprint Keypad Deadbolt', 'teeho-te002', 'TE002',
    'Ultra-budget offline deadbolt. Fingerprint + keypad + physical key. IP54, aluminum body, one-time codes, anti-peep.',
    4999, 'bluetooth', NULL, 0,
    'AA', 4, 12, 860, '3', 'AES-128',
    1, 1, 1, 0, 0, 0, 1, 0, 1,
    35, 57, 54, '60,70',
    0.03, 100.0, 10,
    20, 20, 0, 0,
    NULL, 0, NULL,
    '[]',
    4.1, 24000,
    'Teeho TE002 Review — Best Smart Lock Under $50 2026',
    'Review of Teeho TE002. Fingerprint + keypad deadbolt under $50. Amazon''s ultimate ultra-budget smart lock.'
),
(
    (SELECT id FROM product_series WHERE slug='teeho-te-series'),
    (SELECT id FROM brands WHERE slug='teeho'),
    'Teeho TE217 WiFi Fingerprint Deadbolt', 'teeho-te217', 'TE217',
    'WiFi model with fingerprint, keypad, app. IP65, BHMA Grade B, built-in WiFi, Alexa compatible.',
    12999, 'wifi', 'bluetooth', 0,
    'AA', 4, 8, 1050, '2', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.10, 220.0, 10,
    100, 50, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.0, 2800,
    'Teeho TE217 Review — WiFi Fingerprint Deadbolt 2026',
    'Review of Teeho TE217. Built-in WiFi, fingerprint, IP65. Best mid-range Teeho smart lock.'
);

-- =====================================================
-- HARFO — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='harfo'), 'Handle Lock', 'harfo-handle-lock', 'Lever handle locks with fingerprint, keypad, IC cards.', 2022, 5000, 11000, 1);

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
    (SELECT id FROM product_series WHERE slug='harfo-handle-lock'),
    (SELECT id FROM brands WHERE slug='harfo'),
    'HARFO D02H Fingerprint Handle Lock', 'harfo-d02h', 'D02H',
    'Budget lever handle lock with fingerprint, keypad anti-peep, IC cards (1000), physical key. WiFi via gateway. USB backup.',
    6999, 'bluetooth', 'wifi', 0,
    'AA', 4, 10, 1400, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 55, 54, '60,70',
    0.06, 150.0, 10,
    250, 50, 1000, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa","Google Home"]',
    3.9, 4200,
    'HARFO D02H Review — Budget Fingerprint Handle Lock 2026',
    'Review of HARFO D02H. Budget lever handle, fingerprint, 1000 IC cards. Best budget smart handle lock.'
);

-- =====================================================
-- TEDEE — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='tedee'), 'Tedee PRO', 'tedee-pro', 'Premium retrofit with rechargeable Li-Po and coreless motor.', 2022, 39900, 43900, 1);

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
    (SELECT id FROM product_series WHERE slug='tedee-pro'),
    (SELECT id FROM brands WHERE slug='tedee'),
    'Tedee PRO Smart Lock', 'tedee-pro', 'TLV1.0',
    'Polish premium retrofit. Anodized aluminum, 196g, coreless DC motor (whisper-quiet). 3000mAh rechargeable Li-Po, 6-10 months/charge.',
    43900, 'bluetooth', NULL, 0,
    'lithium-polymer', 1, 8, 196, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.02, 8.0, 50,
    0, 0, 0, 200,
    '2.4GHz', 2, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa"]',
    4.3, 2200,
    'Tedee PRO Review — Polish Premium Retrofit Smart Lock 2026',
    'Review of Tedee PRO. Anodized aluminum, rechargeable, whisper-quiet. Best premium European retrofit smart lock.'
);

-- =====================================================
-- KAADAS — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='kaadas'), 'K-Series', 'kaadas-k-series', 'Premium biometric push-pull smart locks.', 2023, 29999, 59999, 1);

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
    (SELECT id FROM product_series WHERE slug='kaadas-k-series'),
    (SELECT id FROM brands WHERE slug='kaadas'),
    'Kaadas K20 Pro 3D Face Recognition Lock', 'kaadas-k20-pro', 'K20-PRO',
    'Premium push-pull with 3D structured light facial recognition + fingerprint. WiFi, IPS touchscreen, anti-pry alarm.',
    49999, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 4, 3200, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 120, 0, '0',
    0.50, 600.0, 10,
    100, 200, 200, 100,
    '2.4GHz', 25, 'internal',
    '["Kaadas App"]',
    4.2, 800,
    'Kaadas K20 Pro Review — 3D Face Recognition Smart Lock 2026',
    'Review of Kaadas K20 Pro. 3D face recognition, push-pull, IPS touchscreen. Premium Asian smart lock.'
);

-- =====================================================
-- LATCH — Product Series & Products
-- =====================================================
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='latch'), 'Latch M', 'latch-m-series', 'Mortise smart access with camera and intercom.', 2021, 50000, 80000, 1);

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
    (SELECT id FROM product_series WHERE slug='latch-m-series'),
    (SELECT id FROM brands WHERE slug='latch'),
    'Latch M2 Smart Mortise Lock', 'latch-m2', 'LATCH-M2',
    'Commercial mortise lock with integrated camera, intercom, and NFC reader. LatchOS cloud platform, visitor management.',
    65000, 'wifi', 'bluetooth', 0,
    'hardwired', 0, 0, 2500, '1', 'AES-256',
    0, 1, 1, 0, 0, 1, 1, 1, 0,
    44, 57, 0, '0',
    500.0, 2000.0, 500,
    10000, 0, 10000, 10000,
    '2.4GHz', 30, 'internal',
    '["LatchOS","Building Management Systems"]',
    4.0, 500,
    'Latch M2 Review — Enterprise Smart Mortise Lock 2026',
    'Review of Latch M2. Commercial mortise, camera, intercom, LatchOS. Best enterprise smart access system.'
);

-- =====================================================
-- EXISTING BRANDS — Additional Products
-- =====================================================

-- Aqara U200 (Matter + Thread + Apple Home Key!)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='aqara'), 'U200', 'aqara-u200', 'Retrofit smart lock with Matter/Thread and Apple Home Key.', 2024, 22000, 27000, 3);

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
    (SELECT id FROM product_series WHERE slug='aqara-u200'),
    (SELECT id FROM brands WHERE slug='aqara'),
    'Aqara Smart Lock U200', 'aqara-u200', 'EL-D02D',
    'Retrofit lock with Matter/Thread + Apple Home Key + fingerprint. NFC cards, wireless keypad IPX5, rechargeable Li-Ion, gyroscope auto-lock.',
    27000, 'thread', 'bluetooth', 1,
    'lithium-ion', 1, 6, 300, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 0, 0, '0',
    0.05, 15.0, 8,
    50, 50, 50, 200,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.4, 3800,
    'Aqara U200 Review — Matter + Apple Home Key Retrofit Lock 2026',
    'Review of Aqara U200. Matter/Thread, Apple Home Key, fingerprint, retrofit. Best Matter smart lock for Apple users.'
);

-- Level Lock+ (invisible, Apple Home Key, BHMA AAA)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='level'), 'Lock+', 'level-lock-plus', 'Invisible design with Apple Home Key and NFC.', 2022, 32900, 34900, 2);

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
    'Level Lock+ with Apple Home Key', 'level-lock-plus-homekey', 'C-F14U',
    'Invisible smart lock with Apple Home Key NFC. Tap iPhone/Apple Watch to unlock. BHMA AAA, CR2 battery, fits standard deadbolts.',
    32900, 'bluetooth', 'thread', 1,
    'CR2', 1, 12, 200, 'AAA', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    44, 51, 54, '60,70',
    0.02, 8.0, 10,
    0, 0, 0, 50,
    '2.4GHz', 5, 'internal',
    '["Apple HomeKit","Apple Home Key","Google Home","Amazon Alexa"]',
    4.5, 6000,
    'Level Lock+ Review — Invisible Apple Home Key Smart Lock 2026',
    'Review of Level Lock+. Invisible design, Apple Home Key NFC, BHMA AAA. The smartest-looking smart lock.'
);

-- Nuki Smart Lock Pro (4th Gen, Matter + Thread)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='nuki'), 'Smart Lock 4.0 Pro', 'nuki-smart-lock-4-pro', 'Latest generation with Matter/Thread and built-in WiFi.', 2023, 24900, 27900, 2);

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
    (SELECT id FROM product_series WHERE slug='nuki-smart-lock-4-pro'),
    (SELECT id FROM brands WHERE slug='nuki'),
    'Nuki Smart Lock 4.0 Pro', 'nuki-smart-lock-4-pro', 'NUKI-4-PRO',
    'Latest generation with Matter/Thread + built-in WiFi. No bridge needed. Rechargeable via USB-C, European cylinder compatible.',
    27900, 'wifi', 'thread', 1,
    'lithium-ion', 1, 4, 330, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.05, 15.0, 50,
    200, 0, 0, 200,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Google Home","Amazon Alexa","Samsung SmartThings"]',
    4.5, 4500,
    'Nuki Smart Lock 4.0 Pro Review — Matter/Thread + WiFi 2026',
    'Review of Nuki 4.0 Pro. Matter/Thread, built-in WiFi, no bridge, USB-C rechargeable. Best European smart lock 2025.'
);

-- Lockly Flex Touch (new compact fingerprint)
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES
((SELECT id FROM brands WHERE slug='lockly'), 'Flex Touch', 'lockly-flex-touch', 'Compact fingerprint smart lock with WiFi.', 2024, 19999, 24999, 2);

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
    'Lockly Flex Touch WiFi', 'lockly-flex-touch-wifi', 'PGD798W',
    'Compact fingerprint deadbolt with WiFi. Lockly''s PIN Genie rotating keypad, 99 fingerprints, offline access codes.',
    22999, 'wifi', 'bluetooth', 0,
    'AA', 4, 9, 1000, '2', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 57, 54, '60,70',
    0.12, 250.0, 10,
    99, 99, 0, 100,
    '2.4GHz', 25, 'internal',
    '["Amazon Alexa","Google Home"]',
    4.3, 1200,
    'Lockly Flex Touch Review — Compact Fingerprint WiFi Lock 2026',
    'Review of Lockly Flex Touch. Compact fingerprint, PIN Genie keypad, WiFi. Best compact fingerprint smart lock.'
);

-- =====================================================
-- PRODUCT TAGS — Batch 4
-- =====================================================

-- Protocol tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'veise-ve07', 'teeho-te002', 'harfo-d02h', 'tedee-pro',
    'level-lock-plus-homekey'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'veise-ve012w', 'teeho-te217', 'kaadas-k20-pro', 'latch-m2',
    'nuki-smart-lock-4-pro', 'lockly-flex-touch-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'thread' FROM products WHERE slug IN (
    'aqara-u200', 'level-lock-plus-homekey', 'nuki-smart-lock-4-pro'
);

-- Matter tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug IN (
    'aqara-u200', 'level-lock-plus-homekey', 'nuki-smart-lock-4-pro'
);

-- Apple Home Key tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'apple-home-key' FROM products WHERE slug IN (
    'aqara-u200', 'level-lock-plus-homekey'
);

-- Fingerprint tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'veise-ve07', 'veise-ve012w', 'teeho-te002', 'teeho-te217',
    'harfo-d02h', 'kaadas-k20-pro', 'aqara-u200', 'lockly-flex-touch-wifi'
);

-- Keypad tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'veise-ve07', 'veise-ve012w', 'teeho-te002', 'teeho-te217',
    'harfo-d02h', 'kaadas-k20-pro', 'latch-m2'
);

-- Face recognition tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug = 'kaadas-k20-pro';

-- Retrofit tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'tedee-pro', 'aqara-u200', 'level-lock-plus-homekey', 'nuki-smart-lock-4-pro'
);

-- Commercial tag
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug = 'latch-m2';

-- Price tier tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'veise-ve07', 'veise-ve012w', 'teeho-te002', 'teeho-te217', 'harfo-d02h'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'lockly-flex-touch-wifi', 'aqara-u200', 'nuki-smart-lock-4-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'tedee-pro', 'kaadas-k20-pro', 'latch-m2', 'level-lock-plus-homekey'
);

-- Scenario tags
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'veise-ve07', 'teeho-te002', 'harfo-d02h'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'tedee-pro', 'aqara-u200', 'level-lock-plus-homekey', 'nuki-smart-lock-4-pro'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apple-ecosystem' FROM products WHERE slug IN (
    'aqara-u200', 'level-lock-plus-homekey'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'veise-ve012w', 'teeho-te217', 'lockly-flex-touch-wifi'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'kaadas-k20-pro', 'latch-m2'
);
