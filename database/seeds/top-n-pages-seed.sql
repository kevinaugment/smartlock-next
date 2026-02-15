-- =====================================================
-- Top N Pages Seed Data — 20 SEO Landing Pages
-- =====================================================

INSERT INTO top_n_pages (
    slug, title, h1_title, intro_text,
    filter_type, filter_value, sort_by, max_items,
    meta_title, meta_description, faq_json,
    status, display_order
) VALUES

-- =====================================================
-- By Protocol (4 pages)
-- =====================================================
(
    'z-wave-smart-locks',
    'Best Z-Wave Smart Locks 2026',
    'Best Z-Wave Smart Locks 2026',
    'Z-Wave smart locks offer the most reliable mesh networking with dedicated 908 MHz frequency, avoiding Wi-Fi congestion. With S2 security framework and up to 232 devices per network, Z-Wave is the gold standard for serious smart home enthusiasts. Our picks are ranked by security rating, battery life, and smart home compatibility.',
    'protocol', 'zwave', 'rating', 10,
    'Best Z-Wave Smart Locks 2026 — Expert Picks & Comparison',
    'Compare the best Z-Wave smart locks of 2026. Expert-ranked by security, battery life, and hub compatibility. Schlage, Yale, Kwikset reviewed.',
    '[{"question":"Do Z-Wave smart locks need a hub?","answer":"Yes, Z-Wave locks require a compatible hub like SmartThings, Hubitat, or Ring Alarm to function. The hub acts as the Z-Wave controller and enables remote access and automation."},{"question":"How long do Z-Wave smart lock batteries last?","answer":"Z-Wave locks typically last 12-24 months on a single set of batteries, significantly longer than Wi-Fi locks. The low-power 908 MHz protocol is very efficient."},{"question":"Is Z-Wave more secure than Wi-Fi?","answer":"Z-Wave uses the S2 security framework with AES-128 encryption and operates on a dedicated frequency, making it harder to intercept than Wi-Fi signals."}]',
    'published', 1
),
(
    'zigbee-smart-locks',
    'Best Zigbee Smart Locks 2026',
    'Best Zigbee Smart Locks 2026',
    'Zigbee smart locks deliver excellent battery life with self-healing mesh networking. Operating on the 2.4 GHz band, Zigbee locks integrate seamlessly with Amazon Echo (built-in Zigbee hub), SmartThings, and other Zigbee coordinators. Ideal for multi-device smart homes where mesh reliability matters.',
    'protocol', 'zigbee', 'rating', 10,
    'Best Zigbee Smart Locks 2026 — Top Picks for Mesh Networks',
    'Top Zigbee smart locks of 2026. Best for mesh networking, long battery life, and Echo integration. Expert comparison and reviews.',
    '[{"question":"Can I use Zigbee locks with Alexa directly?","answer":"Yes, Amazon Echo (4th Gen and newer) has a built-in Zigbee hub, allowing direct pairing without an additional hub."},{"question":"What is the range of Zigbee smart locks?","answer":"Individual Zigbee devices have a range of about 10-20 meters, but the mesh network extends range by routing through other Zigbee devices."},{"question":"Do Zigbee locks work without internet?","answer":"Yes, Zigbee locks communicate locally through the hub. Basic lock/unlock functions work without internet. Remote access requires internet."}]',
    'published', 2
),
(
    'wifi-smart-locks',
    'Best Wi-Fi Smart Locks 2026',
    'Best Wi-Fi Smart Locks 2026',
    'Wi-Fi smart locks connect directly to your home network — no hub required. This means instant remote access, easy setup, and compatibility with virtually every smart home platform. The trade-off is shorter battery life (3-12 months), but for users who prioritize simplicity and remote access, Wi-Fi locks are unbeatable.',
    'protocol', 'wifi', 'rating', 10,
    'Best Wi-Fi Smart Locks 2026 — No Hub Required',
    'Best Wi-Fi smart locks of 2026. No hub needed, instant remote access. Compare Schlage Encode Plus, Yale Assure, Kwikset Halo.',
    '[{"question":"Why do Wi-Fi smart locks drain batteries faster?","answer":"Wi-Fi requires constant connection maintenance and operates at higher power levels than Zigbee or Z-Wave. Expect 3-12 months vs 12-24 months for other protocols."},{"question":"Do Wi-Fi locks work with 5GHz networks?","answer":"No, all current Wi-Fi smart locks use 2.4 GHz only. Make sure your router has a separate 2.4 GHz network or band steering disabled during setup."},{"question":"Are Wi-Fi smart locks less secure?","answer":"Not necessarily. Premium Wi-Fi locks use AES-128/256 encryption. The main risk is that Wi-Fi is a more common attack target than Zigbee/Z-Wave."}]',
    'published', 3
),
(
    'thread-smart-locks',
    'Best Thread Smart Locks 2026',
    'Best Thread Smart Locks 2026',
    'Thread is the newest smart lock protocol, designed from the ground up for the Matter smart home standard. Thread locks offer low power consumption, self-healing mesh networking, and IP-based communication. As the foundation of Matter, Thread-enabled locks are the most future-proof choice for new smart home setups.',
    'protocol', 'thread', 'rating', 10,
    'Best Thread Smart Locks 2026 — Matter-Ready Future-Proof Picks',
    'Best Thread/Matter smart locks of 2026. Future-proof your smart home. Level Lock+, Aqara, and more reviewed.',
    '[{"question":"What is the difference between Thread and Matter?","answer":"Thread is the wireless protocol (how devices communicate), while Matter is the application layer (how they are controlled). Think of Thread as the road and Matter as the traffic rules."},{"question":"Do I need a Thread Border Router?","answer":"Yes. Apple HomePod Mini, Apple TV 4K, and Google Nest Hub (2nd Gen) all include built-in Thread Border Routers."},{"question":"Can Thread locks work with existing Zigbee hubs?","answer":"No, Thread and Zigbee are separate protocols despite both using 2.4 GHz. You need a Thread Border Router, not a Zigbee hub."}]',
    'published', 4
),

-- =====================================================
-- By Scenario (6 pages)
-- =====================================================
(
    'smart-locks-for-apartments',
    'Best Smart Locks for Apartments 2026',
    'Best Smart Locks for Apartments 2026',
    'Living in an apartment means you need a smart lock that installs without permanent modifications. Retrofit designs from August and Level fit over your existing deadbolt, while other brands offer easy swap-out installations. Our apartment picks prioritize renter-friendly installation, compact design, and reliable connectivity.',
    'scenario', 'apartment', 'rating', 10,
    'Best Smart Locks for Apartments 2026 — Renter-Friendly Picks',
    'Best smart locks for apartments and renters in 2026. Retrofit designs, no permanent modifications. August, Level, Yale reviewed.',
    '[{"question":"Can I install a smart lock in a rental apartment?","answer":"Yes. Retrofit locks like August and Level install over your existing deadbolt without any modifications. Keep the original hardware to reinstall when you move out."},{"question":"Do I need landlord permission for a smart lock?","answer":"For retrofit locks that don''t modify the door, typically no. For full replacement locks, check your lease agreement or ask your landlord."},{"question":"What is the best smart lock for renters?","answer":"The August Wi-Fi Smart Lock (4th Gen) is the top pick for renters — it installs in minutes over your existing deadbolt and removes cleanly."}]',
    'published', 5
),
(
    'smart-locks-for-airbnb',
    'Best Smart Locks for Airbnb 2026',
    'Best Smart Locks for Airbnb & Vacation Rentals 2026',
    'Airbnb hosts need smart locks with remote guest code management, auto-lock, and reliable connectivity. The ideal Airbnb lock lets you create temporary PIN codes for each guest, automatically locks after check-out, and sends activity notifications. Our picks are ranked by remote management features, reliability, and guest experience.',
    'scenario', 'airbnb', 'rating', 10,
    'Best Smart Locks for Airbnb 2026 — Remote Guest Management',
    'Best smart locks for Airbnb hosts in 2026. Remote guest codes, auto-lock, activity logs. Schlage, Yale, Kwikset compared.',
    '[{"question":"How do I give Airbnb guests access to a smart lock?","answer":"Create a temporary PIN code for each guest''s stay dates. Most smart locks let you set time-limited codes that automatically expire at checkout."},{"question":"What happens if the smart lock battery dies during a guest stay?","answer":"Most smart locks provide low battery warnings weeks in advance. Keep a physical key backup in a lockbox as a failsafe."},{"question":"Can smart locks integrate with Airbnb directly?","answer":"Some locks (via platforms like RemoteLock or August) offer direct Airbnb integration that auto-generates guest codes from bookings."}]',
    'published', 6
),
(
    'smart-locks-for-rental-properties',
    'Best Smart Locks for Rental Properties 2026',
    'Best Smart Locks for Rental Properties 2026',
    'Property managers need durable, low-maintenance smart locks that handle high-frequency use across multiple units. The best rental property locks offer master code systems, easy re-keying, long battery life, and a robust build. ANSI Grade 1 or 2 certification is essential for rental durability.',
    'scenario', 'rental', 'rating', 10,
    'Best Smart Locks for Rental Properties 2026 — Property Manager Picks',
    'Best smart locks for rental properties in 2026. Master codes, re-key technology, ANSI Grade 1 durability. Expert picks for landlords.',
    '[{"question":"How often do smart lock batteries need replacing in rentals?","answer":"Every 12-24 months for most models. Choose locks with low-battery alerts so tenants or managers can replace them proactively."},{"question":"Can I use the same master code across multiple rental units?","answer":"Yes, most keypad locks support a master code that works across all units, with unique tenant codes per door."}]',
    'published', 7
),
(
    'smart-locks-for-commercial',
    'Best Smart Locks for Commercial Use 2026',
    'Best Commercial Smart Locks 2026',
    'Commercial applications demand ANSI/BHMA Grade 1 certified locks with high-traffic durability, access audit trails, and enterprise-grade security. These locks are built to handle hundreds of daily operations while maintaining strict access control. Fire code compliance and ADA accessibility are additional considerations.',
    'scenario', 'commercial', 'rating', 10,
    'Best Commercial Smart Locks 2026 — Grade 1 Enterprise Picks',
    'Best commercial smart locks of 2026. ANSI Grade 1, audit trails, high-traffic durability. Schlage commercial lineup reviewed.',
    '[{"question":"What ANSI Grade do I need for commercial doors?","answer":"ANSI/BHMA Grade 1 is required for most commercial applications. Grade 2 may be acceptable for interior office doors."},{"question":"Do commercial smart locks meet fire code?","answer":"UL-listed commercial smart locks meet fire code requirements. Always verify local fire marshal requirements before installation."}]',
    'published', 8
),
(
    'smart-locks-for-families',
    'Best Smart Locks for Families 2026',
    'Best Smart Locks for Families 2026',
    'Family-friendly smart locks need multiple access methods so everyone — from tech-savvy teens to grandparents — can get in easily. The best family locks offer keypad codes, auto-lock for forgetful kids, activity logging to know when everyone gets home, and physical key backup for peace of mind.',
    'scenario', 'family', 'rating', 10,
    'Best Smart Locks for Families 2026 — Kid-Friendly & Secure',
    'Best family-friendly smart locks of 2026. Multiple PIN codes, activity logs, auto-lock. Keep track of when kids get home safely.',
    '[{"question":"Can each family member have their own code?","answer":"Yes, most smart locks support 25-250 unique PIN codes. You can assign a code to each family member and track their entry times."},{"question":"Are smart locks safe for families with young children?","answer":"Yes. Auto-lock ensures the door is always secured. Activity logs let parents monitor who enters and exits."}]',
    'published', 9
),
(
    'smart-locks-for-home-security',
    'Best Smart Locks for Home Security 2026',
    'Best Smart Locks for Home Security 2026',
    'For maximum home security, choose smart locks with ANSI Grade 1 certification, anti-tamper alarms, and strong encryption. These locks resist forced entry, kick-ins, and lock picking. Combined with video doorbells and alarm systems, a Grade 1 smart lock is the cornerstone of a comprehensive home security setup.',
    'scenario', 'home-security', 'rating', 10,
    'Best Smart Locks for Home Security 2026 — Maximum Protection',
    'Most secure smart locks of 2026. ANSI Grade 1, anti-tamper, AES encryption. Schlage, Yale Grade 1 options compared.',
    '[{"question":"What is the most secure smart lock?","answer":"The Schlage Encode Plus with ANSI Grade 1 certification, AES-128 encryption, and built-in alarm sensor is currently the most secure residential smart lock."},{"question":"Can smart locks be hacked?","answer":"While no lock is unhackable, modern smart locks with S2 (Z-Wave) or AES-128 encryption are extremely difficult to breach. Physical security (Grade 1 rating) is usually more important."}]',
    'published', 10
),

-- =====================================================
-- By Feature (5 pages)
-- =====================================================
(
    'fingerprint-smart-locks',
    'Best Fingerprint Smart Locks 2026',
    'Best Fingerprint Smart Locks 2026',
    'Fingerprint smart locks provide the fastest and most convenient access — just touch and enter in under a second. Modern capacitive sensors store 50-100 fingerprints and work reliably even with wet or slightly dirty fingers. Ideal for families and users who hate fumbling with codes or phones.',
    'feature', 'fingerprint', 'rating', 10,
    'Best Fingerprint Smart Locks 2026 — Biometric Access Picks',
    'Best fingerprint smart locks of 2026. Fast biometric access, 50-100+ fingerprint storage. Aqara, Kwikset, Ultraloq compared.',
    '[{"question":"How accurate are fingerprint smart locks?","answer":"Modern capacitive sensors have 99.7%+ accuracy. False rejection rate is under 1%, and false acceptance rate is under 0.002%."},{"question":"Do fingerprint locks work in cold weather?","answer":"Performance may decrease in extreme cold. Look for locks with semiconductor sensors that work better than optical sensors in varying conditions."}]',
    'published', 11
),
(
    'keypad-smart-locks',
    'Best Keypad Smart Locks 2026',
    'Best Keypad Smart Locks 2026',
    'Keypad smart locks are the most popular category, offering PIN code entry without needing a phone or key. Touchscreen and button keypads each have advantages — touchscreens offer a sleek look while button keypads work with gloves. Most keypad locks support 25-250 unique codes with scheduling options.',
    'feature', 'keypad', 'rating', 10,
    'Best Keypad Smart Locks 2026 — PIN Code Entry Picks',
    'Best keypad smart locks of 2026. Touchscreen and button options, 25-250 code capacity. Schlage, Yale, Kwikset reviewed.',
    '[{"question":"Touchscreen vs button keypad — which is better?","answer":"Touchscreen looks modern and doesn''t show wear patterns, but doesn''t work with gloves. Button keypads are more tactile and work in all conditions."},{"question":"How many PIN codes can a smart lock store?","answer":"Typically 25-250 codes depending on the model. Premium locks like Kwikset Halo support up to 250 codes."}]',
    'published', 12
),
(
    'auto-unlock-smart-locks',
    'Best Auto-Unlock Smart Locks 2026',
    'Best Auto-Unlock Smart Locks 2026',
    'Auto-unlock uses your phone''s location (geofencing) or Bluetooth proximity to automatically unlock the door as you approach. No fumbling for keys, codes, or apps — just walk up and the door opens. This hands-free convenience is essential for users carrying groceries, kids, or equipment.',
    'feature', 'auto-unlock', 'rating', 10,
    'Best Auto-Unlock Smart Locks 2026 — Hands-Free Entry',
    'Best auto-unlock smart locks of 2026. Geofencing, proximity unlock, hands-free entry. August, Yale, Level compared.',
    '[{"question":"How does auto-unlock work?","answer":"Your phone uses GPS geofencing to detect when you leave and return home. When you approach within Bluetooth range (~10m), the lock unlocks automatically."},{"question":"Is auto-unlock secure?","answer":"Yes, it requires your authenticated phone within close Bluetooth range. You can set sensitivity and disable it if preferred."}]',
    'published', 13
),
(
    'homekit-smart-locks',
    'Best HomeKit Smart Locks 2026',
    'Best Apple HomeKit Smart Locks 2026',
    'Apple HomeKit smart locks integrate deeply with your iPhone, iPad, Apple Watch, and HomePod. The best HomeKit locks support Apple Home Key for tap-to-unlock on iPhone and Apple Watch — just hold your device near the lock like a hotel room key. HomeKit locks also enable powerful automations through the Home app and Siri.',
    'feature', 'homekit', 'rating', 10,
    'Best Apple HomeKit Smart Locks 2026 — Home Key & Siri',
    'Best HomeKit smart locks of 2026. Apple Home Key, Siri integration, secure automations. Schlage, Level, Aqara reviewed.',
    '[{"question":"Which smart locks support Apple Home Key?","answer":"Schlage Encode Plus, Level Lock+, and Aqara U100 currently support Apple Home Key for tap-to-unlock."},{"question":"Do I need a HomePod for HomeKit locks?","answer":"For basic local control, no. For remote access and automations when away from home, you need an Apple TV, HomePod, or iPad as a home hub."}]',
    'published', 14
),
(
    'matter-smart-locks',
    'Best Matter Smart Locks 2026',
    'Best Matter-Compatible Smart Locks 2026',
    'Matter is the universal smart home standard backed by Apple, Google, Amazon, and Samsung. Matter-compatible locks work across ALL ecosystems without vendor lock-in. While the standard is still maturing, early Matter locks from Level and Aqara show the future of truly interoperable smart home security.',
    'feature', 'matter', 'rating', 10,
    'Best Matter Smart Locks 2026 — Universal Smart Home Standard',
    'Best Matter-compatible smart locks of 2026. Cross-platform, future-proof, no vendor lock in. Level Lock+, Aqara reviewed.',
    '[{"question":"What is Matter for smart locks?","answer":"Matter is a universal smart home standard. A Matter lock works with Apple HomeKit, Google Home, Amazon Alexa, and Samsung SmartThings simultaneously."},{"question":"Should I wait for Matter locks?","answer":"If you are building a new smart home, choosing a Matter-ready lock is wise. If upgrading an existing setup, today''s Z-Wave and Zigbee locks are still excellent choices."}]',
    'published', 15
),

-- =====================================================
-- By Price Tier (3 pages)
-- =====================================================
(
    'budget-smart-locks',
    'Best Budget Smart Locks Under $180 in 2026',
    'Best Budget Smart Locks Under $180 in 2026',
    'You don''t need to spend $300 for a great smart lock. Budget options under $180 offer keypad entry, smart home integration, and reliable security. Kwikset''s SmartCode series and entry-level Yale models deliver solid performance at accessible prices. Our picks balance features, build quality, and value.',
    'price_tier', 'budget', 'price_usd', 10,
    'Best Budget Smart Locks Under $180 — 2026 Value Picks',
    'Best budget smart locks under $180 in 2026. Kwikset SmartCode, ANSI Grade 2, keypad entry. Top value picks for every budget.',
    '[{"question":"Are cheap smart locks secure?","answer":"Budget locks with ANSI Grade 2 certification provide good residential security. They resist most physical attacks. The main trade-off is fewer smart features, not less security."},{"question":"What features do budget smart locks lack?","answer":"Budget locks typically lack Wi-Fi (requiring a hub), fingerprint readers, and Apple HomeKit support. They usually offer keypad + Bluetooth basics."}]',
    'published', 16
),
(
    'mid-range-smart-locks',
    'Best Mid-Range Smart Locks $180-$280 in 2026',
    'Best Mid-Range Smart Locks $180-$280 in 2026',
    'The $180-$280 sweet spot offers the best balance of features and value. Mid-range locks include Wi-Fi connectivity, Apple HomeKit support, fingerprint readers, and long battery life. This is where most buyers find their ideal lock. Our picks represent the best overall value in smart locks.',
    'price_tier', 'mid', 'rating', 10,
    'Best Mid-Range Smart Locks $180-$280 — 2026 Sweet Spot',
    'Best mid-range smart locks between $180-$280 in 2026. Wi-Fi, HomeKit, fingerprint options. Yale, August, Aqara compared.',
    '[{"question":"Is a mid-range smart lock worth it over budget?","answer":"Yes. Mid-range locks add Wi-Fi (no hub needed), better app experiences, and often HomeKit support. The convenience upgrade is substantial."},{"question":"What is the best mid-range smart lock?","answer":"The Yale Assure Lock 2 Wi-Fi offers the best combination of features, build quality, and ecosystem support in the mid-range category."}]',
    'published', 17
),
(
    'premium-smart-locks',
    'Best Premium Smart Locks Over $280 in 2026',
    'Best Premium Smart Locks Over $280 in 2026',
    'Premium smart locks represent the pinnacle of smart home security. ANSI Grade 1 certification, Apple Home Key, Thread/Matter future-proofing, and invisible designs define this category. If security and design are your top priorities, these locks deliver uncompromising quality.',
    'price_tier', 'premium', 'rating', 10,
    'Best Premium Smart Locks Over $280 — 2026 Flagship Picks',
    'Best premium smart locks over $280 in 2026. ANSI Grade 1, Apple Home Key, Thread/Matter. Schlage Encode Plus, Level Lock+ reviewed.',
    '[{"question":"Is a $300+ smart lock worth the investment?","answer":"For ANSI Grade 1 security, Apple Home Key, or Thread/Matter future-proofing, yes. These features are exclusive to premium locks."},{"question":"What sets premium locks apart from mid-range?","answer":"Grade 1 (vs Grade 2) security, Apple Home Key, Thread/Matter protocol, premium build materials, and 24+ month battery life."}]',
    'published', 18
),

-- =====================================================
-- General (2 pages)
-- =====================================================
(
    'smart-locks-2026',
    'Best Smart Locks 2026 — Complete Buyer''s Guide',
    'Best Smart Locks 2026 — Complete Buyer''s Guide',
    'Our definitive guide to the best smart locks in 2026 covers every major brand, protocol, and price point. Whether you need a budget keypad lock or a premium Apple Home Key deadbolt, we''ve tested and ranked the top options. This guide is updated monthly with the latest pricing and feature changes.',
    'scenario', 'home-security', 'rating', 10,
    'Best Smart Locks 2026 — Complete Buyer''s Guide & Rankings',
    'The ultimate smart lock buyer''s guide for 2026. Every protocol, price point, and feature compared. Expert rankings and detailed reviews.',
    '[{"question":"What is the best overall smart lock in 2026?","answer":"The Schlage Encode Plus is our top overall pick for its ANSI Grade 1 security, Apple Home Key support, 24-month battery life, and excellent app experience."},{"question":"Are smart locks safe?","answer":"Yes. Modern smart locks with ANSI Grade 1 or 2 certification are as secure or more secure than traditional deadbolts, with the added benefit of access logging and remote monitoring."},{"question":"How long do smart lock batteries last?","answer":"6-24 months depending on protocol and usage. Z-Wave and Zigbee locks last the longest (12-24 months), while Wi-Fi locks average 6-12 months."}]',
    'published', 19
),
(
    'smart-locks-with-longest-battery-life',
    'Smart Locks with the Longest Battery Life 2026',
    'Smart Locks with the Longest Battery Life 2026',
    'Battery life is a critical factor in smart lock satisfaction. Nobody wants a dead lock. We''ve ranked smart locks by verified battery life, from 24-month champions to 6-month Wi-Fi models. Our data comes from manufacturer specs cross-referenced with real-world user reports.',
    'scenario', 'home-security', 'battery_life_months', 10,
    'Longest Battery Life Smart Locks 2026 — 24-Month Champions',
    'Smart locks ranked by battery life in 2026. Which locks last 24 months? Z-Wave vs Wi-Fi battery comparison. Real-world tested.',
    '[{"question":"Which smart lock has the longest battery life?","answer":"Schlage Encode and Connect series lead with 24+ months. Z-Wave and Zigbee locks consistently outperform Wi-Fi locks in battery longevity."},{"question":"How can I extend my smart lock battery life?","answer":"Use lithium batteries, reduce daily operations, enable night mode, and choose Zigbee/Z-Wave over Wi-Fi. Avoid outdoor exposure."}]',
    'published', 20
);
