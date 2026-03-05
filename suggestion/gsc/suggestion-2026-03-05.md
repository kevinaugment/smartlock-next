# GSC Performance Audit — slockhub.com

- **Date**: 2026-03-05
- **Data Period**: 2026-02-11 → 2026-03-02 (20 days)
- **Search Type**: Web
- **Filter**: Past 3 months (site launched ~Feb 11)

---

## Site-Wide Summary

| Metric | Value |
|---|---|
| Total Clicks | 129 |
| Total Impressions | 12,625 |
| Overall CTR | 1.02% |
| Avg Position | ~9.0 |
| Tracked Pages | 585 |
| Tracked Queries | 311 |
| Primary Market | USA (46.5% clicks), Canada (18.6%) |

**Key Takeaway**: The site launched ~Feb 11 and has rapidly gained 12K+ impressions in 20 days with avg position ~9.0 (page 1 bottom). However, CTR is critically low at 1.02% — the #1 priority is improving titles and meta descriptions to convert impressions to clicks.

---

## Summary of Key Findings

1. **Critically low CTR (1.02%)** — The site gets strong impressions but titles/descriptions fail to attract clicks. Pages with 400-785 impressions are generating ZERO clicks.
2. **High-impression pages at position 5-9 earn no clicks** — 10+ pages have 100+ impressions, positions inside top 10, and 0 clicks. These are immediate CTR rescue targets.
3. **"Best" category pages underperform** — `/best/matter-smart-locks` (409 imp, 0.49% CTR), `/best/fingerprint-smart-locks` (192 imp, 0.52% CTR). Generic titles don't compel clicks.
4. **Compare pages dominate traffic** — The comparison engine is the site's strongest asset. All top-clicked pages are `/compare/` URLs.
5. **Article guides have massive visibility but zero engagement** — `/articles/guides/door-compatibility-guide` = 785 impressions, 0 clicks at position 8.46.

---

## Past Actions Review

This is the **first GSC audit cycle**. No prior suggestions exist. All recommendations below are new.

---

## New Recommendations

### 🔴 CRITICAL — CTR Rescue (High Impressions, Zero/Near-Zero Clicks)

These pages have strong visibility (positions 4-9) but earn no clicks. The problem is almost certainly weak titles and meta descriptions.

#### C1. `/articles/guides/door-compatibility-guide`
- **Current**: 785 impressions, 0 clicks, 0% CTR, position 8.46
- **Target**: 3-5% CTR (23-39 clicks at current impressions)
- **Action**:
  - Rewrite title tag to include a clear benefit: e.g. *"Will a Smart Lock Fit Your Door? Compatibility Guide (2026)"*
  - Rewrite meta description with a specific hook: *"Check if your door supports a smart lock — thickness, deadbolt type, and material requirements explained with our step-by-step checker."*
  - Add FAQ schema for "will a smart lock fit my door" and "what door thickness do I need for a smart lock"

#### C2. `/articles/security/smart-lock-security-complete-analysis`
- **Current**: 444 impressions, 0 clicks, 0% CTR, position 11.48
- **Target**: 2-3% CTR, position < 10
- **Action**:
  - Research what titles competitors use for "smart lock security" content
  - Rewrite title: e.g. *"Are Smart Locks Actually Secure? 2026 Security Analysis"*
  - Add compelling meta description with specific data points (e.g. "We tested 23 smart locks for...")
  - Strengthen content intro with unique data or expert perspectives to improve ranking

#### C3. `/compare/schlage-vs-weiser`
- **Current**: 398 impressions, 0 clicks, 0% CTR, position 7.62
- **Target**: 5-8% CTR (20-32 clicks)
- **Action**:
  - This page matches high-volume queries: "schlage vs weiser" (43 imp), "weiser vs schlage" (34 imp), "defiant vs schlage" (20 imp)
  - Rewrite title to include a verdict hint: *"Schlage vs Weiser (2026): Which Deadbolt Is Actually Better?"*
  - Add year and a clear differentiator to meta description
  - Consider adding a summary comparison table at the top for potential featured snippet

#### C4. `/calculators/signal-strength`
- **Current**: 220 impressions, 0 clicks, 0% CTR, position 7.76
- **Target**: 3-5% CTR
- **Action**:
  - Rewrite title for clarity: *"Smart Lock Signal Strength Calculator — Check Your BLE/WiFi/Z-Wave Range"*
  - Add meta description emphasizing the tool's interactivity
  - The queries driving this ("rssi calculator", "rf coverage calculator") suggest users want a tool — the title should make it clear this IS a working calculator

#### C5. `/brands/samsung/samsung-shp-dp609`
- **Current**: 179 impressions, 0 clicks, 0% CTR, position 4.69
- **Target**: 5-8% CTR (9-14 clicks)
- **Action**:
  - At position 4.69, this is a top-5 result — CTR should be much higher
  - Queries: "dp609" (8 imp), "samsung shp-dp609" (9 imp), "samsung dp609" (23.5 pos)
  - Rewrite title with model clarity: *"Samsung SHP-DP609 Review: Specs, Features & Pros/Cons (2026)"*
  - Ensure the page has rich product schema (Product, Review, AggregateRating)

#### C6. `/brands/nuki/nuki-smart-lock-pro-4`
- **Current**: 175 impressions, 0 clicks, 0% CTR, position 4.94
- **Target**: 5-8% CTR
- **Action**:
  - At position 4.94, this should get decent clicks
  - Rewrite title to be more descriptive: *"Nuki Smart Lock Pro 4.0: Full Review, Setup & Real-World Tests"*
  - Add structured data (Product schema) to improve SERP appearance

---

### 🟠 HIGH — Quick-Win Ranking Improvements (Position 4-10)

These queries are on the cusp of strong CTR positions. Small ranking improvements + title optimization can yield significant traffic.

#### H1. `/best/matter-smart-locks`
- **Current**: 409 impressions, 2 clicks, 0.49% CTR, position 10.72
- **Target**: 3-5% CTR, position < 8
- **Action**:
  - Title should be more specific: *"7 Best Matter-Compatible Smart Locks (2026) — Tested & Compared"*
  - Add unique value: include a Matter certification verification table
  - Strengthen internal links from `/protocols/matter` and protocol-related articles
  - This matches high-value queries: "best matter compatible smart locks" (13 imp, pos 7.85), "matter compatible smart locks" (3 imp, pos 52)

#### H2. `/best/smart-locks-with-longest-battery-life`
- **Current**: 205 impressions, 1 click, 0.49% CTR, position 10.66
- **Target**: 3-5% CTR, position < 8
- **Action**:
  - Title: *"Smart Locks with the Longest Battery Life (2026): Up to 12 Months Tested"*
  - Include specific battery life numbers in meta description to attract click
  - Add comparison table with actual tested battery durations
  - Target queries: "longest battery life smart lock" (5 imp, pos 9), "smart lock battery life" (4 imp, pos 67.75)

#### H3. `/best/fingerprint-smart-locks`
- **Current**: 192 impressions, 1 click, 0.52% CTR, position 12.3
- **Target**: 2-4% CTR, position < 10
- **Action**:
  - Title: *"Best Fingerprint Smart Locks (2026): Fastest & Most Accurate Picks"*
  - Position 12.3 = page 2 — needs content enrichment to break into page 1
  - Add speed comparison data (scan time ms), false rejection rates
  - Target queries: "best fingerprint smart lock" (3 imp, pos 33), "best fingerprint deadbolt" (2 imp, pos 11)

#### H4. `/compare/schlage-vs-kwikset`
- **Current**: 158 impressions, 1 click, 0.63% CTR, position 10.11
- **Target**: 3-5% CTR, position < 8
- **Action**:
  - This is one of the highest-volume comparison queries in the smart lock space
  - Title: *"Schlage vs Kwikset (2026): The Complete Smart Lock Comparison"*
  - Add FAQ schema targeting "is schlage or kwikset better"
  - Improve content depth — this page needs to be the definitive resource

#### H5. `/compare/yale-vs-schlage`
- **Current**: 144 impressions, 1 click, 0.69% CTR, position 11.03
- **Target**: 3-5% CTR, position < 9
- **Action**:
  - Title: *"Yale vs Schlage Smart Locks (2026): Head-to-Head Comparison"*
  - At position 11, this is barely page 2 — small improvements can push to page 1
  - Matches queries: "yale vs schlage" (2 imp, pos 47), "schlage vs yale smart lock" (1 imp, pos 49)

#### H6. `/articles/protocols/connect-lock-to-homekit`
- **Current**: 138 impressions, 1 click, 0.72% CTR, position 11.51
- **Target**: 3-5% CTR, position < 9
- **Action**:
  - Queries suggest strong HomeKit interest: "homekit smart lock" (9 imp, pos 39), "homekit locks" (4 imp, pos 49)
  - Title: *"How to Connect Any Smart Lock to Apple HomeKit (2026 Guide)"*
  - Add specific lock model compatibility list
  - Cross-link to `/best/homekit-smart-locks`

---

### 🟡 MEDIUM — Content Expansion Opportunities

#### M1. "Smart Lock Installation" Content Cluster
- **Query signals**: "smart lock installation" (8 imp, pos 73.88), "smart lock installation cost" (5 imp, pos 51), "how to install a smart lock" (1 imp, pos 38)
- **Current page**: `/articles/installation/install-smart-lock-step-by-step` — 23 imp, 0 clicks, pos 62.65
- **Action**:
  - The installation content exists but ranks terribly (pos 60+)
  - Significantly enrich the content with photos, video embeds, step-by-step images
  - Target featured snippet format for "how to install a smart lock"
  - Create strong internal link path from product/brand pages to installation content

#### M2. "Best Smart Lock 2026" Page
- **Current**: `/best/smart-locks-2026` — 130 imp, 0 clicks, pos 10.58
- **Query**: "best smart lock 2026" (4 imp, pos 23.75), "best smart locks 2026" (1 imp, pos 6)
- **Action**:
  - This is a money keyword — the page exists but CTR is 0%
  - Title: *"Best Smart Locks of 2026: Expert Picks After Hands-On Testing"*
  - Add "Last updated: March 2026" freshness signal
  - Ensure comprehensive coverage of top brands
  - Cross-link heavily from all brand and compare pages

#### M3. Z-Wave Smart Lock Category
- **Query signals**: "z wave locks" (8 imp, pos 63), "z wave lock" (3 imp, pos 68), "best z wave lock" (3 imp, pos 39)
- **Current**: `/best/z-wave-smart-locks` — 118 imp, 0 clicks, pos 22.86
- **Action**:
  - Position 22.86 means this is page 3 — needs significant content improvement
  - Add Z-Wave protocol version details (S2 security, LR support)
  - Include hub compatibility matrix (SmartThings, Hubitat, Home Assistant)
  - Cross-link from `/protocols/z-wave` and related articles

#### M4. HomeKit Smart Locks Category
- **Query signals**: "homekit smart lock" (9 imp, pos 39), "homekit locks" (4 imp, pos 49), "homekit lock" (3 imp, pos 52)
- **Current**: `/best/homekit-smart-locks` — 54 imp, 0 clicks, pos 27.44
- **Action**:
  - Position 27 = page 3 — needs major content improvement
  - Include Apple Home Key vs standard HomeKit distinction
  - Add "Works with HomeKit" badge verification for each recommendation
  - Cross-link from `/articles/protocols/connect-lock-to-homekit`

---

### 🟢 LOW — Monitoring & Future Opportunities

#### L1. Airbnb / Rental Property Cluster
- Queries: "best smart lock for airbnb" (3 imp, pos 82), "best smart locks for airbnb" (1 imp, pos 67)
- Page: `/best/smart-locks-for-airbnb` — 35 imp, 0 clicks, pos 22.03
- **Action**: This category has potential but currently ranks too low. Monitor and consider a dedicated content push if impressions grow.

#### L2. Calculator Pages Need SEO Refinement
- `/calculators/compatibility` — 164 imp, 0 clicks, pos 8.35
- `/calculators/installation-cost` — 134 imp, 0 clicks, pos 11.82
- **Action**: These tool pages get impressions but no clicks. Add Schema (WebApplication) and ensure titles clearly describe the tool's purpose.

#### L3. Device Distribution Monitoring
- Mobile: 63 clicks, 4,865 imp (1.29% CTR)
- Desktop: 61 clicks, 7,197 imp (0.85% CTR)
- Tablet: 5 clicks, 563 imp (0.89% CTR)
- **Action**: Desktop has more impressions but lower CTR than mobile. Ensure SERP appearance (titles/descriptions) looks good on desktop where the site has more visibility.

---

## Cannibalization Check

No significant cannibalization detected. Query variants (e.g. "schlage vs weiser" / "weiser vs schlage") correctly resolve to the same comparison page. The site's URL structure (`/compare/brand-a-vs-brand-b`) naturally prevents cannibalization for comparison queries.

**Minor watch item**: Both `/articles/use-cases/long-term-rental-strategy` and `/articles/use-cases/long-term-rental-property-strategy` appear in the data with similar impressions (28 vs 26). Verify these are not duplicate pages — if so, consolidate with a 301 redirect.

---

## Pages Already Optimized

None — this is the first audit cycle.

---

## Priority Execution Order

| Priority | Action | Est. Impact |
|---|---|---|
| 1 | C1: Rewrite door-compatibility-guide title/meta | +20-35 clicks/period |
| 2 | C3: Rewrite schlage-vs-weiser title/meta | +15-25 clicks/period |
| 3 | C5+C6: Fix Samsung DP609 + Nuki Pro 4 product pages | +15-25 clicks/period |
| 4 | C2: Fix security-complete-analysis title/meta | +10-15 clicks/period |
| 5 | H1+H2+H3: Optimize "Best" category pages | +15-30 clicks/period |
| 6 | C4: Fix signal-strength calculator meta | +8-12 clicks/period |
| 7 | H4+H5: Optimize high-traffic compare pages | +10-20 clicks/period |
| 8 | M2: Boost "Best Smart Locks 2026" page | +5-15 clicks/period |

**Total estimated impact**: +100-180 additional clicks per 20-day period if all Critical + High items are executed.
