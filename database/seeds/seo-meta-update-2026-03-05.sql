-- GSC SEO Optimization: Meta Title/Description Updates
-- Date: 2026-03-05
-- Based on: suggestion/gsc/suggestion-2026-03-05.md

-- ============================================
-- Task 5: Samsung SHP-DP609 product metadata
-- Impact: 179 impressions, 0 clicks, position 4.69
-- ============================================
UPDATE products SET
  meta_title = 'Samsung SHP-DP609 Review: Full Specs, Pros & Cons (2026) — SLockHub',
  meta_description = 'In-depth Samsung SHP-DP609 smart lock review. Push-pull design, fingerprint access, RFID card support, and real-world performance data. See how it compares to Samsung DR708 and competitors.'
WHERE slug = 'samsung-shp-dp609';

-- ============================================
-- Task 6: Nuki Smart Lock Pro 4 product metadata
-- Impact: 175 impressions, 0 clicks, position 4.94
-- ============================================
UPDATE products SET
  meta_title = 'Nuki Smart Lock Pro 4.0: Full Review, Setup Guide & Compatibility (2026) — SLockHub',
  meta_description = 'Complete Nuki Smart Lock Pro 4.0 review. European cylinder compatible, Matter/Thread support, auto-unlock via GPS, and battery life tests. Compare with Nuki 4.0 and Tedee Pro.'
WHERE slug = 'nuki-smart-lock-pro-4';

-- ============================================
-- Task 7: best/matter-smart-locks
-- Impact: 409 impressions, 2 clicks, position 10.72
-- ============================================
UPDATE top_n_pages SET
  meta_title = '7 Best Matter-Compatible Smart Locks (2026): Tested & Certified — SLockHub',
  meta_description = 'We tested every Matter-certified smart lock available in 2026. See which models passed our protocol compliance, battery life, and ease-of-setup tests. Updated March 2026.'
WHERE slug = 'matter-smart-locks';

-- ============================================
-- Task 8: best/smart-locks-with-longest-battery-life
-- Impact: 205 impressions, 1 click, position 10.66
-- ============================================
UPDATE top_n_pages SET
  meta_title = 'Smart Locks with the Longest Battery Life (2026): Up to 12+ Months Tested — SLockHub',
  meta_description = 'Ranked by real-world battery duration. See which smart locks actually last 6-12+ months on a single battery set. Z-Wave, Zigbee, and WiFi models compared with power draw data.'
WHERE slug = 'smart-locks-with-longest-battery-life';

-- ============================================
-- Task 9: best/fingerprint-smart-locks
-- Impact: 192 impressions, 1 click, position 12.3
-- ============================================
UPDATE top_n_pages SET
  meta_title = 'Best Fingerprint Smart Locks (2026): Fastest & Most Reliable Picks — SLockHub',
  meta_description = 'Expert-ranked fingerprint smart locks for 2026. Compared by scan speed, false rejection rate, capacity, and weatherproofing. Indoor and outdoor models tested.'
WHERE slug = 'fingerprint-smart-locks';

-- ============================================
-- Task 12: best/smart-locks-2026
-- Impact: 130 impressions, 0 clicks, position 10.58
-- ============================================
UPDATE top_n_pages SET
  meta_title = 'Best Smart Locks of 2026: Expert Picks After Hands-On Testing — SLockHub',
  meta_description = '2026 smart lock buyer''s guide. Our team tested 15+ models across Yale, Schlage, Kwikset, August, and more. See which smart locks earned our top recommendation this year.'
WHERE slug = 'smart-locks-2026';
