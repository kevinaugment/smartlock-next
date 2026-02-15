-- =====================================================
-- Brands Seed Data — 6 Core Brands
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
    'Yale', 'yale',
    'One of the world''s most trusted lock brands, offering smart locks with wide protocol support and HomeKit compatibility.',
    'Yale, a division of ASSA ABLOY, has been a leader in lock manufacturing for over 180 years. Their smart lock lineup spans from budget-friendly Zigbee models to premium Wi-Fi-enabled deadbolts. Yale smart locks are known for their reliable build quality, broad protocol support (Zigbee, Z-Wave, Wi-Fi, Thread), and deep integration with Apple HomeKit and other smart home ecosystems. The Assure Lock 2 series represents their flagship offering with Matter/Thread future-proofing.',
    '/images/brands/yale-logo.png', 'https://www.yalehome.com/',
    'US', 1840,
    1, 1, 1, 1, 1, 1,
    'residential', 'mid',
    4.5, 1, 1, 'published',
    'Yale Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Comprehensive guide to Yale smart locks. Compare Assure Lock 2, Nest × Yale, and more. Protocol support, pricing, and expert recommendations.'
),
(
    'August', 'august',
    'Pioneer of retrofit smart locks that work with your existing deadbolt. Easy installation, app-centric experience.',
    'August, now part of ASSA ABLOY, revolutionized the smart lock market with their retrofit design that installs over your existing deadbolt in minutes. This means renters can upgrade without replacing hardware. August locks are app-centric, offering auto-unlock via geofencing, DoorSense technology, and guest access management. While they excel in convenience, their reliance on Wi-Fi (via bridge or built-in) means shorter battery life compared to Zigbee/Z-Wave alternatives. The August Wi-Fi Smart Lock (4th Gen) remains one of the most popular choices for renters and tech enthusiasts.',
    '/images/brands/august-logo.png', 'https://august.com/',
    'US', 2013,
    1, 1, 0, 0, 0, 1,
    'residential', 'mid',
    4.3, 1, 2, 'published',
    'August Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to August smart locks. Retrofit design, Wi-Fi connectivity, auto-unlock features. Compare models and find the best fit.'
),
(
    'Schlage', 'schlage',
    'Commercial-grade smart locks with ANSI Grade 1 security. Trusted by security professionals worldwide.',
    'Schlage has been a cornerstone of American lock manufacturing since 1920. Their smart locks stand out with ANSI/BHMA Grade 1 certification — the highest security rating available for residential locks. The Schlage Encode Plus was the first lock to support Apple Home Key, allowing iPhone and Apple Watch tap-to-unlock. Schlage locks are known for their tank-like build quality, long battery life (up to 24 months), and resistance to forced entry. They serve both residential and commercial markets, making them the top choice for security-conscious users and property managers.',
    '/images/brands/schlage-logo.png', 'https://www.schlage.com/',
    'US', 1920,
    1, 1, 1, 0, 0, 1,
    'all', 'premium',
    4.6, 1, 3, 'published',
    'Schlage Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'In-depth guide to Schlage smart locks. ANSI Grade 1 security, Apple Home Key support. Compare Encode Plus, Connect, and commercial models.'
),
(
    'Kwikset', 'kwikset',
    'Budget-friendly smart locks with patented SmartKey re-key technology. Best value in the market.',
    'Kwikset, a Spectrum Brands company, offers the most affordable entry into smart locks without sacrificing essential features. Their patented SmartKey Security technology allows you to re-key the lock yourself in seconds — no locksmith needed. The Halo series provides Wi-Fi connectivity with no hub required, while the SmartCode series offers Z-Wave and Zigbee options for smart home integration. Kwikset locks typically carry ANSI Grade 2 certification and are ideal for budget-conscious homeowners who want smart features without the premium price tag.',
    '/images/brands/kwikset-logo.png', 'https://www.kwikset.com/',
    'US', 1946,
    1, 1, 1, 0, 0, 1,
    'residential', 'budget',
    4.2, 1, 4, 'published',
    'Kwikset Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Kwikset smart locks. SmartKey re-key technology, budget-friendly pricing. Compare Halo, Premis, and SmartCode models.'
),
(
    'Aqara', 'aqara',
    'Smart home ecosystem leader with affordable Zigbee/Thread locks and Apple HomeKit integration.',
    'Aqara, a Lumi United Technology subsidiary, has rapidly grown from a Xiaomi ecosystem brand to a global smart home leader. Their smart locks stand out with compact industrial design, fingerprint readers, and deep Apple HomeKit integration via their affordable Zigbee hubs. The U100 was one of the first smart locks to support Apple Home Key via NFC. Aqara is aggressively adopting Thread and Matter protocols, positioning their products for future-proof smart home ecosystems. Their locks offer excellent value with premium features at mid-range pricing.',
    '/images/brands/aqara-logo.png', 'https://www.aqara.com/',
    'CN', 2009,
    0, 1, 0, 1, 1, 1,
    'residential', 'mid',
    4.4, 1, 5, 'published',
    'Aqara Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Comprehensive guide to Aqara smart locks. Thread/Matter support, Apple Home Key, fingerprint authentication. Compare U100, A100, D100 models.'
),
(
    'Level', 'level',
    'Invisible smart lock design that looks like a traditional lock. Premium build with Thread/Matter support.',
    'Level has redefined smart lock aesthetics by creating locks that are virtually invisible — they look and feel like traditional locks while packing full smart functionality inside. The Level Lock+ was among the first to support Thread and Matter protocols, making it one of the most future-proof options available. Level locks are designed in San Francisco and engineered for minimalists who want smart home convenience without the sci-fi appearance. Their compact form factor fits inside the door, maintaining the original lock''s exterior appearance. Premium pricing reflects the engineering achievement.',
    '/images/brands/level-logo.png', 'https://level.co/',
    'US', 2018,
    0, 0, 0, 1, 1, 1,
    'residential', 'premium',
    4.4, 1, 6, 'published',
    'Level Smart Locks — Complete Brand Guide & Product Reviews 2026',
    'Complete guide to Level smart locks. Invisible design, Thread/Matter support. Compare Level Lock+, Bolt, and Touch models.'
);
