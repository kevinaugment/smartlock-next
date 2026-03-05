# GSC-Driven SEO Execution Plan

> **REQUIRED:** Follow this plan task-by-task, verifying each step before proceeding.

**Goal:** Execute the highest-impact CTR rescue and ranking improvement recommendations from the 2026-03-05 GSC audit, systematically optimizing titles, meta descriptions, content, and schema across the site's top-impression pages to convert the existing 12,600 impressions into meaningful click traffic.

**Architecture:** The site uses Next.js 14 App Router with MDX articles (frontmatter-driven metadata), database-driven compare/best/brand pages (PostgreSQL), and static calculators. SEO metadata flows through three distinct paths: (1) MDX frontmatter → `generateMetadata()` for articles, (2) DB `brands`/`products` tables → template-based `generateMetadata()` for compare pages, (3) DB `top_n_pages` table → `meta_title`/`meta_description` for best pages.

**Tech Stack:** Next.js 14, TypeScript, PostgreSQL, MDX, gray-matter

---

## Phase 1: Critical CTR Rescue (6 Tasks)

> The highest-ROI changes. These pages have 100+ impressions and 0 clicks — the problem is exclusively in titles and meta descriptions.

---

### Task 1: Optimize door-compatibility-guide Title & Description

**Impact:** 785 impressions → estimated +20-35 clicks/period

**Files:**
- Modify: `app/_articles/guides/door-compatibility-guide.mdx:1-32` (frontmatter)

**Step 1: Update frontmatter title and description**

```yaml
title: "Will a Smart Lock Fit Your Door? Complete Compatibility Guide (2026)"
description: "Check if your door supports a smart lock. Measure door thickness, backset, cross bore — with a step-by-step checker, regional standards (US/EU/Asia), and product recommendations by door type."
```

The current title "Smart Lock Door Compatibility Guide: Measurements, Standards, and Installation" is generic. The new title directly answers the user's question ("Will it fit?") and includes the year for freshness.

**Step 2: Add `updatedDate` to frontmatter**

Add `updatedDate: 2026-03-05` to signal freshness to Google.

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds without errors, page renders at `/articles/guides/door-compatibility-guide`

**Step 4: Commit**

```bash
git add app/_articles/guides/door-compatibility-guide.mdx
git commit -m "seo(articles): optimize door-compatibility-guide title/meta for CTR"
```

---

### Task 2: Optimize smart-lock-security-complete-analysis Title & Description

**Impact:** 444 impressions → estimated +10-15 clicks/period

**Files:**
- Modify: `app/_articles/security/smart-lock-security-complete-analysis.mdx:1-25` (frontmatter)

**Step 1: Update frontmatter title and description**

```yaml
title: "Are Smart Locks Actually Secure? Complete 2026 Security Analysis"
description: "We analyzed 200+ CVEs and tested protocol encryption (Z-Wave S2, Zigbee 3.0, Matter). See real-world vulnerability case studies, defense strategies, and a risk assessment framework for smart lock security."
```

The current title uses the generic "Complete Analysis" pattern. The new title poses the user's actual question as a hook.

**Step 2: Add `updatedDate: 2026-03-05`**

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds, page accessible at `/articles/security/smart-lock-security-complete-analysis`

**Step 4: Commit**

```bash
git add app/_articles/security/smart-lock-security-complete-analysis.mdx
git commit -m "seo(articles): optimize security-analysis title/meta for CTR"
```

---

### Task 3: Optimize schlage-vs-weiser Compare Page Metadata Template

**Impact:** 398 impressions → estimated +15-25 clicks/period

**Files:**
- Modify: `app/compare/[slug]/page.tsx:60-80` (generateMetadata function)

**Step 1: Improve the compare page metadata template**

The current template generates:
```
"Schlage vs Weiser: Smart Lock Comparison 2026 — SLockHub.com"
```

Change to a more compelling format with a verdict hook:

```typescript
const title = `${brand1.name} vs ${brand2.name} (2026): Which Smart Lock Is Better? — SLockHub.com`
const description = `Side-by-side comparison of ${brand1.name} and ${brand2.name} smart locks. Compare prices ($${priceRange1} vs $${priceRange2}), protocols, battery life, security features, and our verdict on which is the better buy.`
```

This requires pulling price range data inside `generateMetadata`. We need to also fetch products so we can include price data in the description.

**Step 2: Update generateMetadata to fetch products for richer description**

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data = await getComparisonData(slug)
    if (!data) return { title: 'Smart Lock Comparison — SLockHub.com' }

    const { brand1, brand2, products1, products2 } = data
    const price1 = getPriceRange(products1)
    const price2 = getPriceRange(products2)
    const title = `${brand1.name} vs ${brand2.name} (2026): Which Smart Lock Is Better? — SLockHub.com`
    const description = `Side-by-side comparison of ${brand1.name} and ${brand2.name} smart locks. Compare prices (${price1} vs ${price2}), protocols, battery life, security features, and our expert verdict.`

    return {
        title,
        description,
        alternates: { canonical: `/compare/${slug}` },
        openGraph: {
            title,
            description,
            siteName: 'SLockHub.com',
            type: 'website',
        },
    }
}
```

Note: `getPriceRange` is already defined in the same file — it just needs to be called inside `generateMetadata`.

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds. All ~585 compare pages regenerate with new title format.

**Step 4: Commit**

```bash
git add app/compare/\[slug\]/page.tsx
git commit -m "seo(compare): improve metadata template with verdict hook and price data"
```

---

### Task 4: Optimize signal-strength Calculator Title & Description

**Impact:** 220 impressions → estimated +8-12 clicks/period

**Files:**
- Modify: `app/calculators/signal-strength/page.tsx` (metadata export)

**Step 1: Find and update the metadata**

Locate the `metadata` or `generateMetadata` export. Update:

```typescript
export const metadata: Metadata = {
    title: 'Smart Lock Signal Strength Calculator — Check BLE, WiFi & Z-Wave Range | SLockHub',
    description: 'Free interactive calculator to estimate smart lock wireless range. Enter your wall materials, distance, and protocol (BLE, WiFi, Z-Wave, Zigbee) to check if your lock signal will reach reliably.',
    // ... keep existing alternates/openGraph
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, calculator page at `/calculators/signal-strength` has updated meta tags.

**Step 3: Commit**

```bash
git add app/calculators/signal-strength/page.tsx
git commit -m "seo(calculators): optimize signal-strength meta for CTR"
```

---

### Task 5: Optimize Samsung SHP-DP609 Brand Page (DB Update)

**Impact:** 179 impressions at position 4.69 → estimated +9-14 clicks/period

**Files:**
- Database: Update `brands` or `products` table `meta_title` and `meta_description` for the Samsung SHP-DP609 product

**Step 1: Find the product detail page and its metadata generation**

The page is at `/brands/samsung/samsung-shp-dp609`. Check:

```
app/brands/[slug]/[productSlug]/page.tsx
```

Examine how product metadata is generated. Update the DB `meta_title` and `meta_description` for this product:

```sql
UPDATE products SET
  meta_title = 'Samsung SHP-DP609 Review: Full Specs, Pros & Cons (2026) — SLockHub',
  meta_description = 'In-depth Samsung SHP-DP609 smart lock review. Push-pull design, fingerprint access, RFID card support, and real-world performance data. See how it compares to Samsung DR708 and competitors.'
WHERE slug = 'samsung-shp-dp609';
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, product page at `/brands/samsung/samsung-shp-dp609` shows updated metadata.

**Step 3: Commit**

```bash
git commit -m "seo(brands): optimize Samsung DP609 product meta for CTR"
```

---

### Task 6: Optimize Nuki Smart Lock Pro 4 Brand Page (DB Update)

**Impact:** 175 impressions at position 4.94 → estimated +9-14 clicks/period

**Files:**
- Database: Update `products` table `meta_title` and `meta_description` for Nuki Pro 4

**Step 1: Update DB metadata**

```sql
UPDATE products SET
  meta_title = 'Nuki Smart Lock Pro 4.0: Full Review, Setup Guide & Compatibility (2026) — SLockHub',
  meta_description = 'Complete Nuki Smart Lock Pro 4.0 review. European cylinder compatible, Matter/Thread support, auto-unlock via GPS, and battery life tests. Compare with Nuki 4.0 and Tedee Pro.'
WHERE slug = 'nuki-smart-lock-pro-4';
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, product page at `/brands/nuki/nuki-smart-lock-pro-4` shows updated metadata.

**Step 3: Commit**

```bash
git commit -m "seo(brands): optimize Nuki Pro 4 product meta for CTR"
```

---

## Phase 2: High-Priority Best Pages (3 Tasks)

> These "Best X" pages have 130-409 impressions but CTR below 0.5%. The metadata is stored in the `top_n_pages` DB table.

---

### Task 7: Optimize best/matter-smart-locks (DB Update)

**Impact:** 409 impressions → estimated +8-15 clicks/period

**Step 1: Update DB metadata**

```sql
UPDATE top_n_pages SET
  meta_title = '7 Best Matter-Compatible Smart Locks (2026): Tested & Certified — SLockHub',
  meta_description = 'We tested every Matter-certified smart lock available in 2026. See which models passed our protocol compliance, battery life, and ease-of-setup tests. Updated March 2026.'
WHERE slug = 'matter-smart-locks';
```

**Step 2: Verify** — `npm run build` succeeds

**Step 3: Commit**

```bash
git commit -m "seo(best): optimize matter-smart-locks page meta"
```

---

### Task 8: Optimize best/smart-locks-with-longest-battery-life (DB Update)

**Impact:** 205 impressions → estimated +5-10 clicks/period

**Step 1: Update DB metadata**

```sql
UPDATE top_n_pages SET
  meta_title = 'Smart Locks with the Longest Battery Life (2026): Up to 12+ Months Tested — SLockHub',
  meta_description = 'Ranked by real-world battery duration. See which smart locks actually last 6-12+ months on a single battery set. Z-Wave, Zigbee, and WiFi models compared with power draw data.'
WHERE slug = 'smart-locks-with-longest-battery-life';
```

**Step 2: Verify** — `npm run build` succeeds

**Step 3: Commit**

```bash
git commit -m "seo(best): optimize battery-life page meta"
```

---

### Task 9: Optimize best/fingerprint-smart-locks (DB Update)

**Impact:** 192 impressions → estimated +5-10 clicks/period

**Step 1: Update DB metadata**

```sql
UPDATE top_n_pages SET
  meta_title = 'Best Fingerprint Smart Locks (2026): Fastest & Most Reliable Picks — SLockHub',
  meta_description = 'Expert-ranked fingerprint smart locks for 2026. Compared by scan speed, false rejection rate, capacity, and weatherproofing. Indoor and outdoor models tested.'
WHERE slug = 'fingerprint-smart-locks';
```

**Step 2: Verify** — `npm run build` succeeds

**Step 3: Commit**

```bash
git commit -m "seo(best): optimize fingerprint-smart-locks page meta"
```

---

## Phase 3: Duplicate Content Consolidation (1 Task)

---

### Task 10: Consolidate duplicate long-term-rental pages

**Impact:** Remove cannibalization risk, consolidate link equity

**Files:**
- Delete: `app/_articles/use-cases/long-term-rental-property-strategy.mdx`
- Modify: `next.config.mjs` (add redirect)
- Audit: `app/_articles/use-cases/long-term-rental-strategy.mdx` (ensure it's the best version)

**Step 1: Compare both files**

Diff both MDX files to determine which has better content. Keep the better one. The existing internal links in `door-compatibility-guide.mdx` reference `long-term-rental-strategy`, so that is likely the canonical slug.

**Step 2: Add 301 redirect in next.config.mjs**

```javascript
async redirects() {
    return [
        {
            source: '/articles/use-cases/long-term-rental-property-strategy',
            destination: '/articles/use-cases/long-term-rental-strategy',
            permanent: true,
        },
    ]
},
```

**Step 3: Delete the duplicate file**

```bash
rm app/_articles/use-cases/long-term-rental-property-strategy.mdx
```

**Step 4: Verify**

Run: `npm run build`
Expected: Build succeeds. Verify redirect works on dev server:
```bash
curl -I http://localhost:3000/articles/use-cases/long-term-rental-property-strategy
```
Expected: `HTTP/1.1 308 Permanent Redirect` with `Location: /articles/use-cases/long-term-rental-strategy`

**Step 5: Commit**

```bash
git add -A
git commit -m "seo: consolidate duplicate long-term-rental pages with 301 redirect"
```

---

## Phase 4: High-Impact Compare Page Title Fix (2 Tasks)

---

### Task 11: Optimize schlage-vs-kwikset content depth

**Impact:** 158 impressions, position 10.11 — push to page 1

**Files:**
- Modify: `app/compare/[slug]/page.tsx` — already improved in Task 3

Since the compare page template was already improved in Task 3, this page will benefit from that template change automatically. No additional file changes needed. The position improvement will come from the improved meta tags.

**Verification:** After Task 3 is deployed, monitor GSC for position change on `schlage vs kwikset` queries over the next 2-4 weeks.

---

### Task 12: Optimize best/smart-locks-2026 (DB Update)

**Impact:** 130 impressions → estimated +5-10 clicks/period

**Step 1: Update DB metadata**

```sql
UPDATE top_n_pages SET
  meta_title = 'Best Smart Locks of 2026: Expert Picks After Hands-On Testing — SLockHub',
  meta_description = '2026 smart lock buyer''s guide. Our team tested 15+ models across Yale, Schlage, Kwikset, August, and more. See which smart locks earned our top recommendation this year.'
WHERE slug = 'smart-locks-2026';
```

**Step 2: Verify** — `npm run build` succeeds

**Step 3: Commit**

```bash
git commit -m "seo(best): optimize smart-locks-2026 page meta"
```

---

## Verification Plan

### Build Verification (Automated)

After ALL tasks complete, run a full build to ensure nothing is broken:

```bash
cd /Users/luokun/Documents/GitHub/smartlock-next
npm run build
```

Expected: Build succeeds with 0 errors. All pages generate correctly.

### Lint Verification (Automated)

```bash
npm run lint
```

Expected: No new lint errors introduced.

### Manual Verification

1. **Start dev server**: `npm run dev`
2. **Check 3 sample pages** in browser to verify metadata renders correctly:
   - `/articles/guides/door-compatibility-guide` — check `<title>` tag in page source
   - `/compare/schlage-vs-weiser` — check new title format with verdict hook
   - `/best/matter-smart-locks` — check updated meta from DB
3. **Check redirect**: Navigate to `/articles/use-cases/long-term-rental-property-strategy` — should 301 to the canonical URL
4. **View page source** on each page to confirm `<meta name="description">` content matches the plan

### Post-Deploy Monitoring

After deploying to Vercel:
- Wait 7-14 days for Google to re-crawl
- Run a follow-up GSC audit using the `/gsc-audit` workflow
- Compare CTR and click metrics against the baselines documented in `suggestion/gsc/suggestion-2026-03-05.md`
