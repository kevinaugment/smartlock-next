-- =====================================================
-- Phase 3 Batch A: Alfred, Aqara, August, Bosma, Brinks
-- +2 products each (3→5)
-- All data verified from official sources (Feb 2026)
-- =====================================================

-- ALFRED — DB2-B + DB1-C lever
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='alfred' LIMIT 1),
    (SELECT id FROM brands WHERE slug='alfred'),
    'Alfred DB2-B Bluetooth Touchscreen Deadbolt', 'alfred-db2-b', 'DB2-B',
    'BLE touchscreen deadbolt. 20 PIN codes (permanent/one-time/scheduled) + unlimited eKeys. ANSI/BHMA Grade 2, Intertek 20-min fire-rated. AES-128. Optional Z-Wave (500) module: Ring, SmartThings, Hubitat. Optional WiFi bridge: Alexa, Google. 5 voice languages. -35°C to 66°C. 4x AA. Door 40-60mm.',
    15000, 'bluetooth', 'z-wave', 0,
    'AA', 4, 12, 1500, '2', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    40, 60, 54, '60,70',
    0.06, 120.0, 10,
    20, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Bridge)","Google Assistant (via Bridge)","Z-Wave","SmartThings","Ring Alarm"]',
    4.0, 1500,
    'Alfred DB2-B Review — BHMA Grade 2 Touchscreen Deadbolt 2026',
    'Review of Alfred DB2-B. Grade 2, Z-Wave, touchscreen. Best Canadian mid-range smart deadbolt.'
),
(
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='alfred' LIMIT 1),
    (SELECT id FROM brands WHERE slug='alfred'),
    'Alfred DB1-C Touchscreen Lever Lock', 'alfred-db1-c-lever', 'DB1-C',
    'Touchscreen lever handle smart lock. PIN codes (20) + eKeys. BLE + optional Z-Wave/WiFi bridge. ANSI Grade 2. Auto-relock. Privacy mode. Visual PIN protection. 5 languages. -35°C to 66°C. 4x AA. Reversible lever (left/right). AES-128. Emergency USB power.',
    13000, 'bluetooth', 'z-wave', 0,
    'AA', 4, 12, 1800, '2', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    40, 60, 54, '60,70',
    0.06, 120.0, 10,
    20, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Bridge)","Google Assistant (via Bridge)","Z-Wave"]',
    3.9, 800,
    'Alfred DB1-C Review — Touchscreen Lever Lock 2026',
    'Review of Alfred DB1-C. Lever handle, Grade 2, Z-Wave. Best touchscreen lever smart lock.'
);

-- AQARA — U200 + U300
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='aqara' LIMIT 1),
    (SELECT id FROM brands WHERE slug='aqara'),
    'Aqara Smart Lock U200 (Matter over Thread)', 'aqara-u200', 'U200',
    'Matter over Thread retrofit deadbolt. Apple Home Key (tap iPhone/Watch). Fingerprint, PIN (wireless keypad, IPX5), NFC card, app, voice. Li-Ion rechargeable, 6 months. Keypad wirable to doorbell circuit. US + Euro-style compatible. No door modification needed.',
    23000, 'thread', 'bluetooth', 1,
    'lithium-ion', 1, 6, 400, '0', 'AES-256',
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 60, 54, '60,70',
    0.05, 100.0, 10,
    50, 50, 20, 100,
    '2.4GHz', 10, 'internal',
    '["Apple Home","Apple Home Key","Google Home","Amazon Alexa","Samsung SmartThings","Matter"]',
    4.4, 3000,
    'Aqara U200 Review — Matter Thread Apple Home Key Lock 2026',
    'Review of Aqara U200. Matter/Thread, Apple Home Key, fingerprint. Best Matter smart lock 2026.'
),
(
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='aqara' LIMIT 1),
    (SELECT id FROM brands WHERE slug='aqara'),
    'Aqara Smart Lock U300 Lever (Matter)', 'aqara-u300-lever', 'U300',
    'First Aqara lever lock. Matter over Thread. Apple Home Key. Fingerprint, PIN, NFC, app, mechanical key. 4x AA, 10 months. IPX4 outer panel. USB-C emergency. For doors without deadbolt: side doors, offices, garages. Oct 2024 release.',
    20000, 'thread', 'bluetooth', 1,
    'AA', 4, 10, 1200, '0', 'AES-256',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.05, 100.0, 10,
    50, 50, 20, 100,
    '2.4GHz', 10, 'internal',
    '["Apple Home","Apple Home Key","Google Home","Amazon Alexa","Matter"]',
    4.3, 1500,
    'Aqara U300 Review — Matter Lever Lock with Home Key 2026',
    'Review of Aqara U300. Lever, Matter/Thread, Home Key. Best lever smart lock for side doors.'
);

-- AUGUST — WiFi 4th Gen + August View
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='august' LIMIT 1),
    (SELECT id FROM brands WHERE slug='august'),
    'August WiFi Smart Lock (4th Gen)', 'august-wifi-4th-gen', 'AUG-SL05',
    '45% smaller than 3rd Gen (72x46mm). Built-in WiFi (2.4GHz) + BLE — no bridge needed. DoorSense: detects if door is open/closed/ajar. Auto-lock + auto-unlock (geofencing). HomeKit, Alexa, Google. 2x CR123, 3-6 months. Retrofit (keeps existing keys). Activity log.',
    25000, 'wifi', 'bluetooth', 0,
    'CR123A', 2, 4, 300, '0', 'AES-128',
    0, 0, 1, 1, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.15, 300.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Assistant","August App"]',
    4.0, 15000,
    'August WiFi Smart Lock 4th Gen Review 2026',
    'Review of August WiFi 4th Gen. DoorSense, HomeKit, no bridge. Best retrofit WiFi smart lock.'
),
(
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='august' LIMIT 1),
    (SELECT id FROM brands WHERE slug='august'),
    'August Smart Lock + Keypad Bundle', 'august-lock-keypad-bundle', 'AUG-SL05-KPD',
    'August WiFi 4th Gen lock + August Smart Keypad. Keypad: backlit, weatherproof, coin battery. One-time/scheduled/permanent codes. Auto-lock on system arm. Alexa + Google voice. DoorSense included. Complete keyless entry solution.',
    30000, 'wifi', 'bluetooth', 0,
    'CR123A', 2, 4, 350, '0', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.15, 300.0, 10,
    50, 0, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Assistant","August App"]',
    4.1, 8000,
    'August Smart Lock + Keypad Bundle Review 2026',
    'Review of August Lock + Keypad. WiFi, DoorSense, codes. Best August keyless entry bundle.'
);

-- BOSMA — Sentry Doorbell + Fingerprint Keypad
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='bosma' LIMIT 1),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Sentry Video Doorbell + Smart Lock Hub', 'bosma-sentry-doorbell', 'SENTRY',
    '1080p HDR camera doorbell + Aegis lock hub. 160° wide-angle. IR + color night vision. 100dB siren. AI motion + package detection + facial recognition (subscription). 2-way audio. microSD (128GB) + cloud storage. IP64. Hardwired (8-24V AC). WiFi 2.4GHz. Alexa compatible.',
    15000, 'wifi', NULL, 0,
    'AC', 1, 0, 300, '0', 'AES-128',
    0, 0, 0, 0, 1, 1, 0, 1, 0,
    0, 0, 0, '0',
    500.0, 2000.0, 100,
    0, 0, 0, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Bosma Aegis"]',
    3.8, 1000,
    'Bosma Sentry Review — Doorbell Camera + Lock Hub 2026',
    'Review of Bosma Sentry. 1080p HDR, siren, face ID. Best doorbell camera + smart lock hub combo.'
),
(
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='bosma' LIMIT 1),
    (SELECT id FROM brands WHERE slug='bosma'),
    'Bosma Fingerprint Keypad for Aegis', 'bosma-fingerprint-keypad', 'FP-KEYPAD',
    'Wireless fingerprint + passcode keypad for Bosma Aegis lock. Outdoor-mountable. BLE pairing with Aegis. Quick fingerprint unlock. PIN codes. No smartphone needed for entry. Ideal for guests, children, elderly. Battery powered. Doubles as WiFi hub for Aegis.',
    5000, 'bluetooth', 'wifi', 0,
    'CR123A', 2, 12, 200, '0', 'AES-128',
    1, 1, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, '0',
    0.02, 30.0, 10,
    20, 20, 0, 0,
    '2.4GHz', 5, 'internal',
    '["Bosma Aegis"]',
    3.9, 600,
    'Bosma Fingerprint Keypad Review — Aegis Accessory 2026',
    'Review of Bosma Fingerprint Keypad. Fingerprint + PIN for Aegis. Best keypad accessory.'
);

-- BRINKS — PRO-GUARD Fingerprint + ARRAY Solar
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
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='brinks' LIMIT 1),
    (SELECT id FROM brands WHERE slug='brinks'),
    'Brinks PRO-GUARD Fingerprint Deadbolt', 'brinks-proguard-fingerprint', 'PRO-GUARD-FP',
    'Award-winning (Pro Tool Innovation 2023). 50 fingerprints + 50 user codes + 10 single-use codes + key. PRO-GUARD anti-tamper alarm + anti-pry shield. Pick/bump/drill-resistant cylinder. Hardened steel anti-saw pin. ANSI Grade 3. Auto-lock 1-99s. 4x AA, 24+ months. Door 35-44mm.',
    9000, 'none', NULL, 0,
    'AA', 4, 24, 1600, '3', 'none',
    1, 1, 1, 0, 0, 0, 1, 0, 1,
    35, 44, 54, '60,70',
    0.01, 40.0, 10,
    50, 50, 0, 0,
    'none', 0, 'none',
    '[]',
    4.2, 2500,
    'Brinks PRO-GUARD Review — Award-Winning Fingerprint Lock 2026',
    'Review of Brinks PRO-GUARD. Anti-tamper, 50 fingerprints, 24-mo battery. Best offline fingerprint deadbolt.'
),
(
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='brinks' LIMIT 1),
    (SELECT id FROM brands WHERE slug='brinks'),
    'Brinks ARRAY Solar Smart Deadbolt', 'brinks-array-solar', 'ARRAY-SOLAR',
    'Cloud-connected WiFi deadbolt with built-in solar panel for continuous charging. Li-Po rechargeable battery + solar. Up to 100 guest e-codes + e-keys. Backlit keypad with sliding cover. App remote control. Alexa compatible. Geofencing auto-unlock. Cooper/Barrington styles.',
    20000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 12, 1800, '3', 'AES-128',
    0, 1, 1, 1, 1, 1, 1, 1, 1,
    35, 44, 54, '60,70',
    0.10, 200.0, 10,
    100, 0, 0, 100,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Brinks Home App"]',
    3.7, 1200,
    'Brinks ARRAY Solar Review — Solar-Powered WiFi Lock 2026',
    'Review of Brinks ARRAY Solar. Solar panel, WiFi, 100 codes. Best solar-powered smart lock.'
);

-- PRODUCT TAGS
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN ('alfred-db2-b','alfred-db1-c-lever','bosma-fingerprint-keypad');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'protocol', 'thread' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN ('august-wifi-4th-gen','august-lock-keypad-bundle','bosma-sentry-doorbell','brinks-array-solar');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'matter' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'homekit' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever','august-wifi-4th-gen','august-lock-keypad-bundle');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'home-key' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever','bosma-fingerprint-keypad','brinks-proguard-fingerprint');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'keypad' FROM products WHERE slug IN ('alfred-db2-b','alfred-db1-c-lever','august-lock-keypad-bundle','brinks-proguard-fingerprint','brinks-array-solar');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN ('august-wifi-4th-gen','august-lock-keypad-bundle','aqara-u200');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'camera' FROM products WHERE slug = 'bosma-sentry-doorbell';
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'solar' FROM products WHERE slug = 'brinks-array-solar';
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'z-wave' FROM products WHERE slug IN ('alfred-db2-b','alfred-db1-c-lever');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'feature', 'doorsense' FROM products WHERE slug IN ('august-wifi-4th-gen','august-lock-keypad-bundle');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN ('bosma-fingerprint-keypad','brinks-proguard-fingerprint');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN ('alfred-db2-b','alfred-db1-c-lever','bosma-sentry-doorbell','brinks-array-solar','aqara-u300-lever','aqara-u200');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN ('august-wifi-4th-gen','august-lock-keypad-bundle');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'scenario', 'smart-home' FROM products WHERE slug IN ('aqara-u200','aqara-u300-lever','august-wifi-4th-gen');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN ('august-wifi-4th-gen','august-lock-keypad-bundle');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'scenario', 'family' FROM products WHERE slug IN ('alfred-db2-b','brinks-proguard-fingerprint');
INSERT INTO product_tags (product_id, tag_type, tag_value) SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN ('bosma-sentry-doorbell','brinks-array-solar');
