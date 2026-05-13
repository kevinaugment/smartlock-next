# SLockHub SEO Upgrade Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade SLockHub from a broad smart-lock content site into a trustworthy data-and-tools SEO hub with consistent facts, transparent calculators, stronger E-E-A-T, and long-tail traffic templates.

**Architecture:** Use shared data registries for facts that appear across pages, keep calculator formulas in testable `lib/calculators/*` modules, and let pages render evidence, methodology, and decision paths from those shared sources. Roll out in small batches so each batch has measurable SEO or trust impact and can be verified independently.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, MDX content, local `tsx` tests, GitNexus impact checks.

---

## Batch 1: Trust Foundation

**Files:**
- Create: `lib/calculators/battery-life-model.ts`
- Create: `lib/calculators/catalog.ts`
- Create: `tests/battery-life-model.test.ts`
- Create: `tests/calculator-catalog.test.ts`
- Modify: `app/calculators/battery-life/BatteryCalculator.tsx`
- Modify: `app/calculators/battery-life/page.tsx`
- Modify: `app/calculators/page.tsx`
- Modify: `app/about/page.tsx`

- [x] **Step 1: Protect battery-life accuracy with a failing test**

```bash
./node_modules/.bin/tsx tests/battery-life-model.test.ts
```

Expected before implementation: fails because `lib/calculators/battery-life-model` does not exist.

- [x] **Step 2: Move battery-life math into a shared model**

Implement `calculateSmartLockBatteryLife()` so default Zigbee with 4 AA alkaline cells and 10 operations/day lands inside the stated 10-18 month planning range, while Wi-Fi with keep-alive lands near the stated 2-4 month range.

- [x] **Step 3: Make the UI consume the shared model**

Replace inline calculator math in `BatteryCalculator.tsx` with `calculateSmartLockBatteryLife()`. Keep the existing UI structure, but display usable energy rather than raw theoretical energy.

- [x] **Step 4: Make methodology text use the same source**

Import `getBatteryLifeMethodology()` in `app/calculators/battery-life/page.tsx` so the formula, range cap, and explanation match the tool.

- [x] **Step 5: Use one source for battery ranges and display values**

Render protocol runtime tables and result-card months from `protocolData` and `calculateSmartLockBatteryLife()` so the visible page, calculator output, and tests cannot drift into separate claims.

- [x] **Step 6: Centralize calculator count**

Create `calculatorCount` in `lib/calculators/catalog.ts` from `calculatorRouteSlugs.length`. Use it on About and Calculators pages so the site no longer hard-codes different tool counts.

- [x] **Step 7: Verify Batch 1 tests**

```bash
./node_modules/.bin/tsx tests/battery-life-model.test.ts
./node_modules/.bin/tsx tests/calculator-catalog.test.ts
./node_modules/.bin/tsx tests/seo-content-consistency.test.ts
```

Expected: all pass.

## Batch 2: Evidence and E-E-A-T Layer

**Files:**
- Create: `lib/seo/evidence.ts`
- Create: `components/seo/EvidencePanel.tsx`
- Modify: top 5 calculators by traffic opportunity
- Modify: `app/_articles/security/smart-lock-security-complete-analysis.mdx`
- Test: `tests/evidence-panels.test.ts`

- [ ] **Step 1: Define an evidence schema**

Create a small typed registry with `lastVerified`, `modelLimit`, `sourceNotes`, and `reviewCadence`.

- [ ] **Step 2: Render a standard evidence panel**

Add a reusable component that displays formula notes, data-source classes, and freshness dates. Avoid fake claims; label sources as datasheet-derived, vendor-stated, or field-observed.

- [ ] **Step 3: Add evidence panels to priority calculators**

Start with battery life, signal strength, installation cost, lock TCO, and compatibility. Each page must disclose formula assumptions and practical limits.

- [ ] **Step 4: Turn the security article into a citable asset**

Add a CVE methodology section, test scope, reviewed attack surfaces, and a change log. Do not invent a full CVE table until there is a maintained source file.

- [ ] **Step 5: Verify evidence coverage**

Add a test that priority calculators include `EvidencePanel` and a last-verified date.

## Batch 3: Intent-Matched Long-Tail Templates

**Files:**
- Modify: `lib/seo/best-page-seo.ts`
- Modify: `lib/seo/comparison-page-seo.ts`
- Modify: `app/best/[slug]/page.tsx`
- Modify: `app/compare/[slug]/page.tsx`
- Test: `tests/seo-template-profiles.test.ts`

- [ ] **Step 1: Add intent blocks for commercial investigation**

Each best/comparison page should show `Best for`, `Avoid if`, `Decision factor`, and `Evidence needed` blocks above the product list.

- [ ] **Step 2: Expand protocol and use-case best-page profiles**

Prioritize `best-z-wave-smart-locks`, `best-smart-locks-for-airbnb`, `matter-smart-locks`, `smart-locks-with-longest-battery-life`, and `renter-friendly-smart-locks`.

- [ ] **Step 3: Add calculator pathways**

Every best/comparison page should link to the relevant tool: battery, compatibility, signal, TCO, guest code, or protocol wizard.

- [ ] **Step 4: Verify SEO templates**

Run `./node_modules/.bin/tsx tests/seo-template-profiles.test.ts` and confirm all profiles have specific title, description, methodology, and intent signals.

## Batch 4: Brand and Product Fact Consistency

**Files:**
- Create: `lib/brands/fact-policy.ts`
- Modify: `app/brands/[slug]/page.tsx`
- Modify: `app/brands/[slug]/[product]/page.tsx`
- Modify: seed data only when source-backed
- Test: new brand fact consistency test

- [ ] **Step 1: Add brand fact status labels**

Use labels such as `Vendor stated`, `Catalog field`, `Unknown`, and `Needs verification` for battery, protocol, ANSI grade, Matter support, and warranty.

- [ ] **Step 2: Add last-verified and caveat blocks**

Each brand page should show a small evidence block near the product matrix.

- [ ] **Step 3: Normalize protocol claims**

Prevent pages from calling Z-Wave locks Wi-Fi locks, or Matter support Thread support, unless the product data explicitly states it.

- [ ] **Step 4: Verify brand pages**

Add tests that no brand/product page renders unsupported protocol claims from missing data.

## Batch 5: Measurement and Iteration

**Files:**
- Create: `docs/reports/seo-upgrade-kpi-baseline-2026-05-13.md`
- Modify: internal docs only unless code is needed

- [ ] **Step 1: Establish KPI baseline**

Record GSC clicks, impressions, CTR, average position, indexed pages, and top tool-page queries from the May 2026 export.

- [ ] **Step 2: Define batch-level targets**

Batch 1 target: calculator trust and consistency defects fixed. Batch 2 target: evidence panels on five priority pages. Batch 3 target: more long-tail pages with clear commercial intent. Batch 4 target: fewer factual contradictions on brand/product pages.

- [ ] **Step 3: Recheck after crawl window**

Compare GSC after 28 days and 90 days. Track calculator entrances, article-to-tool clicks, branded vs non-branded impressions, and best/comparison page CTR.

## Verification Gate for Every Batch

- [ ] Run targeted tests for edited modules.
- [ ] Run `./node_modules/.bin/tsx tests/seo-content-consistency.test.ts` when touching SEO/content structure.
- [ ] Run `npm run build` before release if the batch changes runtime page code.
- [ ] Run `gitnexus detect-changes --repo smartlock-next` before committing.
- [ ] Keep commits small and batch-scoped.
