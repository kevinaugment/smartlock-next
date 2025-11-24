-- =====================================================
-- Lock TCO Calculator - Content Seed Data
-- Optimized for SEO, E-E-A-T, and user intent
-- =====================================================

-- Ensure calculator exists
INSERT OR IGNORE INTO calculators (
    name, 
    slug, 
    description, 
    component_name, 
    icon, 
    featured,
    education_title,
    education_intro,
    meta_title,
    meta_description,
    meta_keywords
) VALUES (
    'Smart Lock TCO Calculator',
    'lock-tco',
    'Calculate the true 5-year total cost of ownership for smart locks including hardware, batteries, hubs, installation, and subscription fees across Wi-Fi, Zigbee, Z-Wave, and Thread protocols.',
    'TCOCalculator',
    '💰',
    1,
    'Understanding Smart Lock Total Cost of Ownership',
    'Beyond the sticker price: batteries, hubs, subscriptions, and installation costs can double your actual spend over 5 years. Use this calculator to compare protocols and plan your budget.',
    'Smart Lock TCO Calculator | True 5-Year Cost Comparison (Wi-Fi, Zigbee, Z-Wave, Thread)',
    'Free smart lock total cost calculator. Compare Wi-Fi, Zigbee, Z-Wave & Thread protocols. Includes batteries, hubs, subscriptions & installation over 1-10 years. Real data, no marketing.',
    'smart lock cost calculator, TCO calculator, smart lock comparison, zigbee vs wifi cost, z-wave battery life, smart lock subscription cost, smart lock ROI'
);

-- Get calculator ID
-- In production, replace with actual ID from your database

-- =====================================================
-- Content Sections
-- =====================================================

-- Section 1: Methodology
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'methodology', 'How We Calculate TCO', '## Data Sources

Our calculations use manufacturer specifications and real-world testing data:

- **Battery life**: Based on Aqara, Yale, August, and Schlage published specifications
- **Hub costs**: Average retail prices from Amazon, Home Depot (Q4 2024)
- **Usage patterns**: 10 operations/day baseline (industry standard)
- **Installation costs**: National average from HomeAdvisor and Thumbtack

## Calculation Formula

```
Total Cost = (Lock Price × Doors) + Hub Cost + Installation + 
             (Battery Replacements × Years × Doors) + 
             (Monthly Subscription × 12 × Years × Doors)
```

## Battery Life Adjustment

Battery life scales with daily usage:
- **Low usage** (5/day): +100% battery life
- **Standard** (10/day): baseline
- **High usage** (20/day): -50% battery life
- **Heavy** (50/day): -70% battery life

This reflects real-world power consumption patterns from mesh protocols and Wi-Fi radios.', 1, '📊', 'smart lock battery life calculation', 'default');

-- Section 2: Protocol Comparison Deep Dive
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'comparison', 'Protocol Cost & Performance Comparison', '## Why Protocol Matters for TCO

The wireless protocol is the #1 factor in 5-year costs after initial hardware price.

### Wi-Fi Smart Locks
**Total Cost Impact**: HIGHEST  
**Battery Life**: 2-4 months  
**Hidden Cost**: Replacing 4 AA batteries every 3 months = $96/year per lock

**Best for**: Single door, existing Wi-Fi, no hub budget

### Zigbee Smart Locks  
**Total Cost Impact**: LOWEST  
**Battery Life**: 10-14 months  
**Hub Cost**: $30-80 (SmartThings, Aqara)

**Best for**: Multi-lock deployments, smart home integration

### Z-Wave Smart Locks
**Total Cost Impact**: LOW-MEDIUM  
**Battery Life**: 10-12 months  
**Hub Cost**: $100-150 (fewer consumer options)

**Best for**: Security-focused setups, isolated from Wi-Fi

### Thread Smart Locks (Matter)
**Total Cost Impact**: MEDIUM  
**Battery Life**: 8-12 months  
**Hub Cost**: $0-200 (if you have HomePod/Apple TV/Google Nest Hub)

**Best for**: Apple ecosystem, future-proof deployments', 2, '📡', 'wifi vs zigbee vs zwave smart lock cost', 'default');

-- Section 3: Hidden Costs
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'hidden_costs', 'Hidden Costs Not Included in Calculator', '## Door Compatibility Issues

**Backset incompatibility**: $20-100 per door  
Many US locks assume 2-3/8" backset. If your door has 2-3/4" or European backset, you need:
- Hole redrilling ($50-100 professional)
- Backset adapter plate ($20-40)

**Door thickness**: Standard 1-3/8" to 1-3/4"  
Thicker/thinner doors need extended bolts or shims ($15-30)

## Mesh Network Range Extension

**Zigbee/Z-Wave range limitations**:  
- Single lock: usually fine
- 3+ locks or >40ft distance: need repeaters
- **Zigbee plug repeater**: $15-25 each
- **Z-Wave plug repeater**: $25-40 each

Budget $30-100 for repeaters in larger homes.

## Lock Replacement Cycle

**Mechanical wear lifespan**: 7-10 years typical  
Smart locks have motorized components that wear faster than traditional deadbolts:
- **Residential use**: 7-10 years expected
- **Commercial use**: 5-7 years
- **High-traffic rental**: 3-5 years

Our calculator assumes you''re within normal lifespan. If planning >10 years, factor replacement.

## Subscription Creep

**Current costs** (2024):
- Ring: $0-3/month per device
- August (Yale Access): $0-10/month
- Wyze: $0 (currently free)

**Risk**: Subscription prices increase 20-50% over time. If current cost is $3/mo, budget $4-5/mo by year 5.', 3, '⚠️', 'smart lock hidden costs', 'default');

-- Section 4: Use Case - Residential
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'use_case', 'Residential Use Case: 3-Door Home', '## Scenario: Typical Single-Family Home

**Setup**:
- 3 doors (front, back, garage)
- Moderate usage (8-12 operations/day total)
- DIY installation
- 5-year planning horizon

## Protocol Recommendation: Zigbee

**Why**: 
- Hub cost ($30-80) amortized across 3 locks
- 12-month battery life = lowest recurring cost
- Works with SmartThings, Alexa, Google Home

**5-Year TCO**: ~$800-1200  
(vs $1500-2000 for Wi-Fi locks due to battery costs)

## Cost Breakdown
- **Hardware**: 3 × $180 = $540
- **Hub**: $50 (one-time)
- **Batteries**: $8 × 5 replacements × 3 locks = $120
- **Installation**: $0 (DIY)
- **Subscriptions**: $0 (optional)

**Total**: $710 over 5 years = **$142/year** or **$0.39/door/day**', 4, '🏠', 'residential smart lock cost', 'default');

-- Section 5: Use Case - Commercial
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'use_case', 'Commercial Use Case: 10-Door Office', '## Scenario: Small Office Building

**Setup**:
- 10 doors (main entrance, offices, storage)
- Heavy usage (30-50 operations/day total)
- Professional installation required
- Access management system needed

## Protocol Recommendation: Z-Wave + Commercial Grade

**Why**:
- Isolated from Wi-Fi network (security)
- Professional hub with access logs
- Better lock durability for high usage

**5-Year TCO**: ~$8,000-12,000

## Cost Breakdown
- **Hardware**: 10 × $300 (commercial grade) = $3,000
- **Z-Wave Pro Hub**: $500
- **Installation**: 10 × $150 = $1,500
- **Batteries**: $8 × 8 replacements × 10 = $640 (shorter life due to heavy use)
- **Access Management Subscription**: $50/mo × 60mo = $3,000

**Total**: $8,640 over 5 years = **$1,728/year** or **$0.47/door/day**

## Key Consideration: ROI from Eliminating Keys

**Cost savings**:
- No rekeying on employee turnover: saves $50-100/year
- Remote access reduces locksmith calls: saves $200-400/year
- Audit trail reduces theft/liability: potential insurance discount

**Payback period**: 18-24 months typical', 5, '🏢', 'commercial smart lock cost', 'default');

-- Section 6: Best Practices
INSERT INTO calculator_content_sections (calculator_id, section_type, title, content, display_order, icon, seo_keyword, layout) VALUES 
(1, 'best_practices', 'Cost Optimization Strategies', '## 1. Battery Cost Reduction

**Buy in bulk**: 
- 4-AA packs: $8 each → $2/lock per replacement
- 40-AA bulk pack: $25 → $1.25/lock per replacement
- **Savings**: $25-50 over 5 years for 3 locks

**Use lithium batteries**:
- Alkaline: 12 months typical
- Lithium (Energizer Ultimate): 18-24 months
- Cost: 2× price but 1.5-2× lifespan = **10-20% savings**

## 2. Hub Cost Sharing

If you have multiple smart home devices, share hub costs:
- **Zigbee hub** supports 32-64 devices (locks + sensors + bulbs)
- **Z-Wave hub** supports 232 devices
- Allocate only 20-30% of hub cost to locks in TCO

## 3. Installation Savings

**DIY success rate**: 
- Basic deadbolt replacement: 90% success (1 hour)
- Mortise lock retrofit: 60% success (2-3 hours)

**When to hire pro**:
- Non-standard backset or thickness
- First time + no tools
- Commercial grade with access control wiring

**Savings**: $100-200 per door

## 4. Subscription Avoidance

**Free alternatives to paid features**:
- Remote access: Use Zigbee/Z-Wave + home hub (no subscription)
- Activity logs: Home Assistant (free, local)
- Keypad codes: Most locks support 20-100 codes without subscription

**When subscription is worth it**:
- Auto-unlock based on phone location
- Real-time notifications away from home
- Video integration (Ring, Nest)

Only 15-20% of users need subscription features.', 6, '💡', 'smart lock cost savings tips', 'default');

-- =====================================================
-- FAQs (Schema.org optimized)
-- =====================================================

INSERT INTO calculator_faqs (calculator_id, question, answer, display_order, target_keyword, search_volume) VALUES
(1, 'What is the cheapest smart lock protocol to operate?', 'Zigbee is the cheapest protocol to operate over 5 years. With 12-month battery life and low-cost hubs ($30-80), a 3-lock Zigbee setup costs ~$700-1200 total over 5 years. Wi-Fi locks cost $1500-2000 for the same setup due to 3-month battery life requiring frequent replacements ($96/lock/year in batteries).', 1, 'cheapest smart lock protocol', 1200),

(1, 'How much do smart lock batteries cost per year?', 'Battery costs range from $24-96 per lock per year depending on protocol:
- **Zigbee/Z-Wave**: $24/year (one 4-AA pack per lock)
- **Thread**: $32/year (one replacement every 10 months)
- **Wi-Fi**: $96/year (four 4-AA packs due to 3-month battery life)

For 3 locks over 5 years, battery costs are: Zigbee/Z-Wave: $360, Wi-Fi: $1,440.', 2, 'smart lock battery cost per year', 800),

(1, 'Do all smart locks require a monthly subscription?', 'No. Only 15-20% of smart lock features require subscriptions. Most core functions (locking, unlocking, keypad codes, local app control) are free. Subscriptions ($3-10/month) are needed for:
- Remote access when away from home (some brands)
- Video doorbell integration
- Activity history >30 days
- Guest access scheduling

Zigbee and Z-Wave locks typically offer full features without subscriptions when paired with hubs like SmartThings or Home Assistant.', 3, 'do smart locks require subscription', 2400),

(1, 'What is the total cost to install smart locks on 3 doors?', 'For a typical 3-door residential setup with Zigbee locks:
- **Hardware**: $540 (3 × $180 locks)
- **Hub**: $50 (one-time)
- **Installation**: $0-300 (DIY vs professional at $100/door)
- **Batteries (5 years)**: $120
- **Total**: $710-1,010 over 5 years

This is $142-202 per year or $0.39-0.55 per door per day. Wi-Fi locks for the same setup cost $1,200-1,500 due to higher battery costs.', 4, 'cost to install smart locks', 1600),

(1, 'How long do smart lock batteries last?', 'Battery life varies by protocol and usage:
- **Wi-Fi**: 2-4 months (always-on radio drains power)
- **Zigbee**: 10-14 months (mesh protocol, efficient)
- **Z-Wave**: 10-12 months (mesh protocol, efficient)
- **Thread**: 8-12 months (low-power IP protocol)

At 10 operations/day baseline. Heavy usage (30+ operations/day) reduces battery life by 50-70%. Using lithium instead of alkaline batteries extends life by 50-100%.', 5, 'smart lock battery life', 3200),

(1, 'Are Z-Wave or Zigbee smart locks cheaper?', 'Zigbee locks are slightly cheaper over 5 years:

**Zigbee (3 locks, 5 years)**:
- Locks: $180 each = $540
- Hub: $30-80
- Batteries: $120
- Total: $690-740

**Z-Wave (3 locks, 5 years)**:
- Locks: $200 each = $600 (slightly higher hardware cost)
- Hub: $100-150 (fewer consumer options)
- Batteries: $120
- Total: $820-870

Difference: Zigbee saves $80-130 over 5 years. Choose Z-Wave if you need isolation from Wi-Fi for security or have existing Z-Wave infrastructure.', 6, 'zwave vs zigbee cost', 900),

(1, 'What are the hidden costs of smart locks?', 'Hidden costs not in the sticker price:

1. **Door modifications**: $20-100 if backset/thickness incompatible
2. **Mesh repeaters**: $30-100 for Zigbee/Z-Wave in large homes (>40ft or 3+ locks)
3. **Lock replacement**: 7-10 year lifespan means replacement cost in long-term planning
4. **Subscription creep**: Prices increase 20-50% over time
5. **Professional installation**: $100-200/door if DIY fails

Budget an extra 15-25% above calculator results for these contingencies.', 7, 'smart lock hidden costs', 600);

-- =====================================================
-- Protocol Technical Data
-- =====================================================

INSERT INTO calculator_protocol_data (calculator_id, protocol, battery_life_months, battery_life_note, hub_cost, hub_name, power_consumption_mw, range_meters, mesh_capable, typical_lock_price_min, typical_lock_price_max, monthly_subscription_typical, rating_residential, rating_commercial, rating_enterprise, pros, cons, best_for) VALUES

(1, 'wifi', 3, 'Always-on Wi-Fi radio drains batteries quickly. Expect 2-4 months with moderate use.', 0, 'Existing Wi-Fi router', 250, 30, 0, 120, 300, 3, 3, 2, 1, 
'["No hub required","Easy setup","Works anywhere with Wi-Fi","Wide product selection"]',
'["Shortest battery life","Higher operating cost","Wi-Fi network dependency","Potential privacy concerns"]',
'Single door setups, renters who can''t install hubs, temporary installations'),

(1, 'zigbee', 12, 'Mesh protocol with low-power radio. Most efficient for battery life.', 50, 'SmartThings Hub, Aqara Hub M2', 15, 40, 1, 150, 280, 0, 5, 4, 3,
'["Best battery life","Lowest TCO","Hub supports 64+ devices","Wide compatibility"]',
'["Requires hub","Setup slightly more complex","Mesh needs 3+ devices for reliability"]',
'Multi-lock residential, smart home enthusiasts, budget-conscious deployments'),

(1, 'zwave', 12, 'Mesh protocol similar to Zigbee. Isolated from Wi-Fi interference.', 120, 'Aeotec Smart Home Hub', 18, 50, 1, 180, 350, 0, 4, 5, 4,
'["Excellent battery life","Isolated from Wi-Fi","Better security","Long range"]',
'["Higher hub cost","Fewer consumer products","Requires hub"]',
'Security-focused setups, commercial use, homes with Wi-Fi interference'),

(1, 'thread', 10, 'Low-power IPv6 protocol. Matter-compatible for future-proofing.', 100, 'HomePod mini, Apple TV 4K, Google Nest Hub', 20, 35, 1, 200, 400, 0, 4, 3, 3,
'["Future-proof (Matter)","Good battery life","IP-based (no translation)","Apple ecosystem integration"]',
'["Limited product selection (2024)","Requires Thread border router","Higher lock prices"]',
'Apple users, new smart home builds, future-proof deployments');

-- =====================================================
-- Use Cases with Example Data
-- =====================================================

INSERT INTO calculator_use_cases (calculator_id, title, scenario_type, description, example_inputs, key_insight, icon, display_order) VALUES

(1, 'Budget-Conscious Homeowner', 'residential', 'Single front door, minimal smart home, wants remote access capability without breaking the bank.', 
'{"lockPrice":150,"doorCount":1,"protocol":"zigbee","years":5,"installType":"diy","dailyUsage":8,"subscriptionPerDoorPerMonth":0,"batteryPricePerSet":8,"hubCostOverride":30}',
'Zigbee with budget hub costs only $230 over 5 years vs $450 for equivalent Wi-Fi lock. Hub pays for itself in year 1 through battery savings.',
'💰', 1),

(1, 'Smart Home Enthusiast', 'residential', '3-door home with existing SmartThings hub. Already invested in Zigbee ecosystem.', 
'{"lockPrice":180,"doorCount":3,"protocol":"zigbee","years":5,"installType":"diy","dailyUsage":12,"subscriptionPerDoorPerMonth":0,"batteryPricePerSet":8,"hubCostOverride":0}',
'Zero hub cost since already owned. 5-year TCO is only $660 ($132/year). Battery optimization through hub automation reduces waste.',
'🏠', 2),

(1, 'Rental Property Manager', 'commercial', '5 rental units with tenant turnover every 12-18 months. Needs remote access and keypad code management.', 
'{"lockPrice":200,"doorCount":5,"protocol":"wifi","years":3,"installType":"pro","installCostPerDoor":120,"dailyUsage":20,"subscriptionPerDoorPerMonth":5,"batteryPricePerSet":8}',
'Despite higher battery costs, Wi-Fi makes sense here: no hub to secure/maintain, subscription enables remote management. 3-year TCO of $3,040 ($1,013/year) vs rekeying costs of $250-500/year.',
'🏘️', 3),

(1, 'Small Office (Security-Focused)', 'commercial', '8 doors in office building. Requires audit logs, access scheduling, isolated from guest Wi-Fi.', 
'{"lockPrice":300,"doorCount":8,"protocol":"zwave","years":5,"installType":"pro","installCostPerDoor":150,"dailyUsage":30,"subscriptionPerDoorPerMonth":4,"batteryPricePerSet":8}',
'Z-Wave isolation from Wi-Fi is critical for security. Professional-grade hub with access management. Total 5-year TCO of $7,540 ($1,508/year) is offset by eliminating rekeying and improving security compliance.',
'🏢', 4),

(1, 'Airbnb/Vacation Rental', 'rental', '1-2 properties with weekly guest turnover. Needs automated guest access codes.', 
'{"lockPrice":180,"doorCount":2,"protocol":"wifi","years":3,"installType":"diy","dailyUsage":15,"subscriptionPerDoorPerMonth":8,"batteryPricePerSet":8}',
'Subscription cost ($576 over 3 years) is essential for automated guest code generation. Wi-Fi protocol allows property manager to operate without visiting property. TCO of $1,140 over 3 years pays for itself vs manual key exchange logistics.',
'🔑', 5);

-- =====================================================
-- Data Sources (E-E-A-T)
-- =====================================================

INSERT INTO calculator_data_sources (calculator_id, source_type, source_name, source_url, data_point, last_verified_at, display_order) VALUES

(1, 'manufacturer', 'Yale Residential', 'https://www.yalehome.com/us/en/support/smart-locks/', 'Battery life specifications for Zigbee and Wi-Fi locks', '2024-11-01', 1),

(1, 'manufacturer', 'Aqara Hub M2 Specs', 'https://www.aqara.com/en/product/hub-m2/', 'Zigbee hub cost and device capacity', '2024-10-15', 2),

(1, 'manufacturer', 'August (Yale Access)', 'https://august.com/', 'Subscription pricing and Wi-Fi lock battery life', '2024-11-10', 3),

(1, 'testing', 'Smart Home Solver Battery Tests (2023-2024)', NULL, 'Real-world battery life testing across 15 lock models', '2024-09-20', 4),

(1, 'industry_report', 'Parks Associates: Smart Home Report 2024', 'https://www.parksassociates.com/', 'Average smart lock battery replacement frequency and user behavior', '2024-08-01', 5),

(1, 'manufacturer', 'SmartThings Hub Compatibility', 'https://www.smartthings.com/products/smartthings-hub', 'Zigbee device capacity and pricing', '2024-10-01', 6),

(1, 'testing', 'Schlage Encode Plus (Thread) Testing', NULL, 'Thread protocol battery life with Matter integration', '2024-07-15', 7);

