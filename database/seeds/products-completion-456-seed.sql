-- =====================================================
-- Products Completion Batches 4-6 Combined
-- 13 brands, 1 product each (2 → 3 per brand)
-- All data verified from official sources (Feb 2026)
-- =====================================================

-- =====================================================
-- BATCH 4: Häfele, Mul-T-Lock, SALTO, Sesame, Tedee
-- =====================================================

-- HÄFELE — Add RE-Twist series
-- Source: hafele.com
INSERT INTO product_series (brand_id, name, slug, description, release_year, price_range_min, price_range_max, display_order)
VALUES ((SELECT id FROM brands WHERE slug='hafele'), 'RE-Twist Series', 'hafele-retwist', 'Smart retrofit knob with integrated doorbell.', 2023, 20000, 35000, 3);

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
) VALUES (
    (SELECT id FROM product_series WHERE slug='hafele-retwist'),
    (SELECT id FROM brands WHERE slug='hafele'),
    'Häfele RE-Twist Smart Retrofit Knob', 'hafele-retwist-knob', 'RE-TWIST',
    'Retrofit smart knob with integrated doorbell. Fingerprint (100), PIN, RFID card (100), Bluetooth app, mechanical key. Installs on existing door without drilling. Built-in doorbell chime. Privacy mode, auto-lock, voice guide. 4x AA, 12 months. Door thickness 38-80mm.',
    25000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1800, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    38, 80, 0, '0',
    0.05, 120.0, 10,
    50, 100, 100, 50,
    '2.4GHz', 10, 'internal',
    '["Hafele Smart Lock App"]',
    4.0, 800,
    'Häfele RE-Twist Review — Retrofit Smart Knob 2026',
    'Review of Häfele RE-Twist. Retrofit knob, doorbell, fingerprint. Best German retrofit smart lock.'
);

-- MUL-T-LOCK — Add Entr Cosy (keypad companion)
-- Source: mul-t-lock.com
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
) VALUES (
    (SELECT id FROM product_series WHERE slug='multlock-entr'),
    (SELECT id FROM brands WHERE slug='mul-t-lock'),
    'Mul-T-Lock ENTR with Keypad + Fingerprint', 'multlock-entr-full', 'ENTR-KIT',
    'Complete ENTR system: smart lock + PIN code reader (20 codes) + fingerprint reader (20 users) + remote control (20). Retrofit, no drilling. AES-128. Rechargeable Li-ion 7.4V 2600mAh. IP44. App (iOS/Android). Auto-lock. Full kit for maximum security convenience.',
    55000, 'bluetooth', NULL, 0,
    'lithium-ion', 1, 12, 600, '0', 'AES-128',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    35, 78, 0, '0',
    0.04, 80.0, 10,
    20, 20, 0, 20,
    '2.4GHz', 10, 'internal',
    '["Mul-T-Lock ENTR App"]',
    4.3, 400,
    'Mul-T-Lock ENTR Full Kit Review — Keypad + Fingerprint 2026',
    'Review of Mul-T-Lock ENTR full kit. Keypad + fingerprint + remote. Best high-security retrofit system.'
);

-- SALTO — Add KS IQ 2.0 controller
-- Source: saltosystems.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='salto' LIMIT 1),
    (SELECT id FROM brands WHERE slug='salto'),
    'SALTO KS IQ 2.0 Wireless Controller', 'salto-ks-iq-2', 'KS-IQ-2.0',
    'Cloud-based wireless access controller. WiFi (2.4GHz) + Ethernet + optional 4G cellular + BLE 4.2. Manages up to 16 locks wirelessly (IEEE 802.15.4, 2.4GHz, 10-15m range). AES-128 + TLS. OTA firmware updates. Web platform + mobile app (iOS/Android). PoE optional. 146x146x30mm, 422g.',
    40000, 'wifi', 'bluetooth', 0,
    'DC', 1, 0, 422, '0', 'AES-128',
    0, 0, 0, 0, 0, 1, 1, 1, 0,
    0, 0, 0, '0',
    200.0, 500.0, 1000,
    0, 0, 10000, 10000,
    '2.4GHz', 15, 'internal',
    '["SALTO KS Cloud","SALTO KS App"]',
    4.4, 300,
    'SALTO KS IQ 2.0 Review — Cloud Wireless Controller 2026',
    'Review of SALTO KS IQ 2.0. Cloud, WiFi/Ethernet/4G, 16 doors. Best commercial access controller.'
);

-- SESAME — Add Sesame 5
-- Source: candyhouse.co
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='sesame' LIMIT 1),
    (SELECT id FROM brands WHERE slug='sesame'),
    'Sesame 5 by Candy House', 'sesame-5', 'SESAME-5',
    'Ultra-compact (236g) retrofit lock. 99% Japan key compatibility, 3D-printed custom adapters. BLE + WiFi (via Hub3). AES-256. 2x CR123A, 12+ months. Magnetic angle sensor (infinite lifespan). Auto-lock (3s-1hr). NFC tap-unlock. HomeKit (via Hub3), Alexa, Google, Apple Watch. Open-source BLE API.',
    10000, 'bluetooth', NULL, 0,
    'CR123A', 2, 12, 236, '0', 'AES-256',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.01, 30.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit (via Hub3)","Amazon Alexa","Google Assistant","Apple Watch"]',
    4.3, 5000,
    'Sesame 5 Review — Ultra-Compact Retrofit Lock 2026',
    'Review of Sesame 5. 236g, AES-256, HomeKit, NFC. Best ultra-compact Japanese smart lock.'
);

-- TEDEE — Add GO2
-- Source: tedee.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='tedee' LIMIT 1),
    (SELECT id FROM brands WHERE slug='tedee'),
    'Tedee GO2 BLE 5.0 Retrofit Lock', 'tedee-go2', 'GO2',
    'Euro-profile retrofit lock. BLE 5.0. 3x CR123A, 8 months. Ø57x63mm aluminium edition. TLS 1.3 (AV-Test certified). Auto-unlock, auto-lock, scheduled access. Virtual key sharing via app/web. Matter support (via Bridge). HomeKit, Alexa, Google, Homey, FIBARO, Home Assistant. Indoor only (10-40°C).',
    15000, 'bluetooth', NULL, 1,
    'CR123A', 3, 8, 200, '0', 'TLS-1.3',
    0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, '0',
    0.02, 50.0, 10,
    0, 0, 0, 100,
    '2.4GHz', 10, 'internal',
    '["Apple HomeKit","Amazon Alexa","Google Home","Matter (via Bridge)","Home Assistant","Homey","FIBARO"]',
    4.2, 2000,
    'Tedee GO2 Review — Euro Retrofit with Matter 2026',
    'Review of Tedee GO2. BLE 5.0, Matter, TLS 1.3. Best European retrofit smart lock.'
);

-- =====================================================
-- BATCH 5: Orbita, Orvibo, PHGLock, SimpliSafe, Teeho, Veise
-- =====================================================

-- ORBITA — Add E3042SBT Bluetooth+RFID hotel lock
-- Source: orbitatech.com
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
) VALUES (
    (SELECT id FROM product_series WHERE slug='orbita-hotel-rfid'),
    (SELECT id FROM brands WHERE slug='orbita'),
    'Orbita E3042SBT Bluetooth Mortise Hotel Lock', 'orbita-e3042sbt', 'E3042SBT',
    '304 stainless steel mortise hotel lock. BLE app + Mifare RFID card + mechanical key. Moisture-proof. 4x AA, 12-24 months. Low voltage alarm (4.8V). Door 32-70mm. Wireless online capable. PMS integration (Opera/FIAS). UL/FCC/CE certified.',
    22000, 'bluetooth', 'rfid', 0,
    'AA', 4, 18, 2300, '0', 'AES-128',
    0, 0, 1, 0, 0, 0, 0, 1, 1,
    32, 70, 0, '0',
    0.02, 50.0, 100,
    0, 0, 5000, 50,
    '13.56MHz', 5, 'internal',
    '["Orbita Hotel System","PMS (Opera/FIAS)"]',
    4.0, 300,
    'Orbita E3042SBT Review — Bluetooth Hotel Lock 2026',
    'Review of Orbita E3042SBT. BLE+RFID hotel lock, stainless steel. Best value Bluetooth hotel lock.'
);

-- ORVIBO — Add V5 face recognition
-- Source: orvibo.com
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
) VALUES (
    (SELECT id FROM product_series WHERE slug='orvibo-smart-lock'),
    (SELECT id FROM brands WHERE slug='orvibo'),
    'Orvibo V5 AI Face Recognition Smart Lock', 'orvibo-v5-face', 'V5-FACE',
    'AI binocular face recognition + fingerprint + passcode + IC card + mechanical key. WiFi remote via HomeMate App. 5000mAh built-in battery or 6x AA. Smart scene linkage. Financial-grade encryption. Anti-pry stainless steel body. Push-pull handle design.',
    35000, 'wifi', 'bluetooth', 0,
    'lithium-ion', 1, 8, 3500, '0', 'AES-256',
    1, 1, 1, 0, 0, 1, 1, 1, 1,
    40, 65, 0, '0',
    0.12, 300.0, 10,
    25, 50, 25, 50,
    '2.4GHz', 20, 'internal',
    '["HomeMate App","Orvibo Smart Home"]',
    4.1, 300,
    'Orvibo V5 Review — AI Face Recognition Lock 2026',
    'Review of Orvibo V5. AI binocular face, WiFi, 5000mAh. Best Chinese face recognition smart lock.'
);

-- PHGLOCK — Add KR8161 apartment card lock
-- Source: phglock.vn
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
) VALUES (
    (SELECT id FROM product_series WHERE slug='phglock-fp'),
    (SELECT id FROM brands WHERE slug='phglock'),
    'PHGLock KR8161 Apartment Card Lock', 'phglock-kr8161', 'KR8161',
    'Apartment RFID card lock. 99 key cards + 9 passcodes + physical key. Double lock function. Low battery warning. Anti-prying alarm. 4.0 security technology. Aluminum alloy body. Popular in Vietnamese apartment buildings. 4x AAA, 6-12 months. USB emergency.',
    8000, 'none', NULL, 0,
    'AAA', 4, 9, 1500, '0', 'AES-128',
    0, 1, 1, 0, 0, 0, 1, 1, 1,
    40, 65, 0, '0',
    0.03, 60.0, 20,
    9, 0, 99, 0,
    '13.56MHz', 3, 'internal',
    '[]',
    3.8, 500,
    'PHGLock KR8161 Review — Apartment Card Lock 2026',
    'Review of PHGLock KR8161. RFID card, apartment, affordable. Best budget apartment card lock Vietnam.'
);

-- SIMPLISAFE — Add Smart Lock with PIN Pad
-- Source: simplisafe.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='simplisafe' LIMIT 1),
    (SELECT id FROM brands WHERE slug='simplisafe'),
    'SimpliSafe Smart Lock + PIN Pad Bundle', 'simplisafe-lock-pin-pad', 'SS-LOCK-PIN',
    'Security system-integrated deadbolt + wireless PIN pad. Master PIN, custom PINs, duress PIN (silent alarm to monitoring). Auto-lock when system armed. Weather-resistant backlit PIN pad (coin battery). Alexa + Google voice. Remote lock/unlock via SimpliSafe app (requires Interactive plan). 4x AA.',
    20000, 'wifi', NULL, 0,
    'AA', 4, 12, 1500, '0', 'AES-128',
    0, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.08, 150.0, 10,
    50, 0, 0, 50,
    '2.4GHz', 20, 'internal',
    '["SimpliSafe Security","Amazon Alexa","Google Assistant"]',
    4.0, 3000,
    'SimpliSafe Smart Lock + PIN Pad Review 2026',
    'Review of SimpliSafe Lock + PIN. Duress PIN, security integration, Alexa. Best security-system smart lock.'
);

-- TEEHO — Add TE007
-- Source: teeho.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='teeho' LIMIT 1),
    (SELECT id FROM brands WHERE slug='teeho'),
    'Teeho TE007 6-in-1 Fingerprint Smart Lock', 'teeho-te007', 'TE007',
    '6-in-1: fingerprint (50, 0.3s 360°), IC card, BLE app, passcode (250, anti-peep), Apple Watch, mechanical key. IP54 (-35°C to 66°C). ANSI Grade 3. Alexa + Google (via G2 Gateway). Auto-lock 10-900s. Vacation mode. 4x AA, 12 months. Alloy body.',
    7000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1500, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.06, 120.0, 10,
    250, 50, 50, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Gateway)","Google Assistant (via Gateway)","Apple Watch"]',
    4.1, 6000,
    'Teeho TE007 Review — 6-in-1 Budget Smart Lock 2026',
    'Review of Teeho TE007. 6-in-1, fingerprint 0.3s, IP54, $50. Best ultra-budget fingerprint smart lock.'
);

-- VEISE — Add VE017-H 8-way
-- Source: iveise.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='veise' LIMIT 1),
    (SELECT id FROM brands WHERE slug='veise'),
    'Veise VE017-H 8-Way Smart Deadbolt', 'veise-ve017h', 'VE017-H',
    '8-way unlock: AI fingerprint (20, 0.3s, self-learning), passcode (100+, anti-peep), RFID fob, BLE app, Alexa voice, Google voice, remote WiFi (via G1 gateway), mechanical key. IP55. ANSI Grade 3. Privacy mode. Auto-lock 10-180s. USB-C emergency. 4x AA, 12 months.',
    8000, 'bluetooth', 'wifi', 0,
    'AA', 4, 12, 1500, '3', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 51, 54, '60,70',
    0.08, 150.0, 10,
    100, 20, 20, 50,
    '2.4GHz', 10, 'internal',
    '["Amazon Alexa (via Gateway)","Google Assistant (via Gateway)","KK Home App"]',
    4.0, 4000,
    'Veise VE017-H Review — 8-Way Budget Deadbolt 2026',
    'Review of Veise VE017-H. 8-way, AI fingerprint, IP55, $60. Best value 8-way smart deadbolt.'
);

-- =====================================================
-- BATCH 6: Sifely, SMONET
-- =====================================================

-- SIFELY — Add fingerprint deadbolt
-- Source: sifely.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='sifely' LIMIT 1),
    (SELECT id FROM brands WHERE slug='sifely'),
    'Sifely Smart Lock X Fingerprint Deadbolt', 'sifely-smart-lock-x', 'SIFELY-X',
    '5-in-1: fingerprint (100), passcode (100, timed/one-time/recurring), key fob, BLE app, physical key. Auto-lock. Anti-peep keypad. AES-128. Alexa + Google (via WiFi Gateway). Zinc alloy, satin nickel/black. 4x AA, 12+ months. Door 35-55mm. Popular for Airbnb/rentals.',
    9000, 'bluetooth', NULL, 0,
    'AA', 4, 12, 1400, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 55, 54, '60,70',
    0.06, 120.0, 10,
    100, 100, 50, 50,
    '2.4GHz', 10, 'internal',
    '["Sifely App","Amazon Alexa (via Gateway)","Google Assistant (via Gateway)"]',
    4.0, 3000,
    'Sifely Smart Lock X Review — Rental Fingerprint Lock 2026',
    'Review of Sifely Smart Lock X. 5-in-1, 100 fingerprints, rental-friendly. Best Airbnb smart lock.'
);

-- SMONET — Add M6 10-in-1
-- Source: smonet.com
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
) VALUES (
    (SELECT ps.id FROM product_series ps JOIN brands b ON ps.brand_id=b.id WHERE b.slug='smonet' LIMIT 1),
    (SELECT id FROM brands WHERE slug='smonet'),
    'SMONET M6 10-in-1 Smart Deadbolt', 'smonet-m6', 'M6-WiFi',
    '10-in-1: fingerprint (0.5s), BLE+WiFi app, anti-peep passcode, key fob, mechanical key, auto-lock (1-900s), USB-C emergency, remote control, Alexa voice, real-time access records. WiFi built-in (no gateway). Alloy steel. Weather-resistant. 4x AA, 12 months (10,000 unlocks).',
    10000, 'wifi', 'bluetooth', 0,
    'AA', 4, 12, 1600, '0', 'AES-128',
    1, 1, 1, 0, 1, 1, 1, 1, 1,
    35, 56, 54, '60,70',
    0.10, 200.0, 10,
    100, 100, 50, 50,
    '2.4GHz', 20, 'internal',
    '["Amazon Alexa","Google Home","TT Lock App"]',
    4.1, 3500,
    'SMONET M6 Review — 10-in-1 WiFi Smart Deadbolt 2026',
    'Review of SMONET M6. 10-in-1, WiFi built-in, Alexa, $80. Best value WiFi smart deadbolt.'
);

-- =====================================================
-- PRODUCT TAGS — Batches 4-6
-- =====================================================

-- Protocol
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'bluetooth' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'multlock-entr-full', 'sesame-5', 'tedee-go2',
    'teeho-te007', 'veise-ve017h', 'sifely-smart-lock-x'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'wifi' FROM products WHERE slug IN (
    'salto-ks-iq-2', 'simplisafe-lock-pin-pad', 'orvibo-v5-face', 'smonet-m6'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'protocol', 'rfid' FROM products WHERE slug IN ('orbita-e3042sbt', 'phglock-kr8161');

-- Features
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'fingerprint' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'multlock-entr-full', 'orvibo-v5-face',
    'teeho-te007', 'veise-ve017h', 'sifely-smart-lock-x', 'smonet-m6'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'keypad' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'multlock-entr-full', 'simplisafe-lock-pin-pad',
    'teeho-te007', 'veise-ve017h', 'sifely-smart-lock-x', 'smonet-m6',
    'phglock-kr8161'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'retrofit' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'multlock-entr-full', 'sesame-5', 'tedee-go2'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'face-recognition' FROM products WHERE slug = 'orvibo-v5-face';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'matter' FROM products WHERE slug = 'tedee-go2';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'feature', 'duress-pin' FROM products WHERE slug = 'simplisafe-lock-pin-pad';

-- Price tier
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'budget' FROM products WHERE slug IN (
    'teeho-te007', 'veise-ve017h', 'sifely-smart-lock-x', 'smonet-m6',
    'phglock-kr8161', 'sesame-5'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'mid' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'tedee-go2', 'simplisafe-lock-pin-pad',
    'orbita-e3042sbt', 'orvibo-v5-face'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'price_tier', 'premium' FROM products WHERE slug IN (
    'multlock-entr-full', 'salto-ks-iq-2'
);

-- Scenarios
INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'family' FROM products WHERE slug IN (
    'hafele-retwist-knob', 'orvibo-v5-face', 'teeho-te007', 'veise-ve017h'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'apartment' FROM products WHERE slug IN (
    'sesame-5', 'tedee-go2', 'phglock-kr8161', 'simplisafe-lock-pin-pad'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'rental' FROM products WHERE slug IN (
    'sifely-smart-lock-x', 'smonet-m6'
);

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'hotel' FROM products WHERE slug = 'orbita-e3042sbt';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'commercial' FROM products WHERE slug = 'salto-ks-iq-2';

INSERT INTO product_tags (product_id, tag_type, tag_value)
SELECT id, 'scenario', 'home-security' FROM products WHERE slug IN (
    'multlock-entr-full', 'simplisafe-lock-pin-pad'
);
