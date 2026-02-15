---
name: calculator-detail-page
description: Use when creating, modifying, or extending a smart lock calculator detail page under app/calculators/[slug]/. Covers page anatomy, component selection, SEO metadata, Schema.org, shared components, styling conventions, and mandatory sections.
---

# Calculator Detail Page Development

## Overview

Reference guide for building calculator detail pages in the SmartLockHub (slockhub.com) codebase. Each calculator lives under `app/calculators/[slug]/` and follows a strict page anatomy with mandatory shared components.

## When to Use

- Creating a new calculator page
- Adding fields or sections to an existing calculator
- Debugging layout or component issues on calculator pages
- Adding SEO metadata or Schema.org structured data to calculators

## Architecture Patterns

### Pattern A: Inline (Simple Calculators)

All logic lives in a single `page.tsx` with `'use client'` directive.

```
app/calculators/[slug]/
  page.tsx          ← 'use client', contains state + UI + calculation
```

**Use when:** Calculator is < 300 lines, no SEO metadata needed, simple inputs.
**Examples:** `installation-time`, `emergency-backup`, `fleet-planner`

### Pattern B: Component-Based (Complex Calculators) ✅ PREFERRED

Server-rendered `page.tsx` (NO `'use client'`) handles metadata + SEO content. Client component handles interactivity.

```
app/calculators/[slug]/
  page.tsx              ← Server Component (metadata, Schema.org, static content)
  [Name]Calculator.tsx  ← 'use client' (state, inputs, calculation, results)
```

**Use when:** Calculator needs SEO metadata, > 300 lines, rich static content.
**Examples:** `battery-life`, `compatibility`, `lock-tco`, `signal-strength`

## Page Anatomy (Mandatory Sections)

Every calculator page MUST include these sections **in this order**:

```
1. Breadcrumb Navigation
2. Page Header (icon + h1 + subtitle)
3. Key Insight Callout (optional, recommended)
4. Calculator (inputs + results panel)
5. <ToolRating toolSlug="[slug]" />          ← MANDATORY
6. Be-Tech Brand Recommendation              ← MANDATORY
7. Educational Content (tables, guides, methodology)
8. <RelatedResources calculatorSlug="[slug]" /> ← MANDATORY
9. Related Tools (manual link grid)
10. Data Sources / Standards
```

> **CRITICAL:** The parent `layout.tsx` already renders `<CalculatorRelatedContent />` for ALL calculator pages. Do NOT duplicate this.

## Quick Reference: Shared Components

| Component | Import | Props | Purpose |
|-----------|--------|-------|---------|
| `ToolRating` | `@/components/ToolRating` | `toolSlug: string` | User feedback widget |
| `RelatedResources` | `@/components/calculators/RelatedResources` | `calculatorSlug: string` | Auto-fetches related articles from API |
| `BeTechCalculatorRecommendation` | `@/components/calculators/BeTechRecommendation` | `description?: string, badge?: string` | Brand recommendation card |
| `CalculatorRelatedContent` | _(auto via layout)_ | _(none)_ | Auto-renders in layout, do NOT use directly |

## Implementation

### Server Page (Pattern B)

```tsx
import { Metadata } from 'next'
import Link from 'next/link'
import MyCalculator from './MyCalculator'
import { SomeIcon, BookOpen, AlertTriangle } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

// 1. SEO Metadata
export const metadata: Metadata = {
  title: '[Calculator Name] | [Descriptor] ([Year])',
  description: '[120-160 chars, keyword-rich]',
  keywords: '[comma-separated keywords]',
}

export default function MyCalculatorPage() {
  // 2. Schema.org (breadcrumb + softwareApplication + optional howTo)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: '[Name]', item: 'https://www.slockhub.com/calculators/[slug]' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '[Calculator Name]',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: '[Description]',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div className="page-bg">
        <div className="container-main section">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link href="/calculators">Calculators</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">[Name]</span>
          </nav>

          {/* Header */}
          <div className="page-header">
            <div className="page-header__icon"><SomeIcon className="w-14 h-14" /></div>
            <h1 className="page-header__title">[Calculator Title]</h1>
            <p className="page-header__subtitle">[Subtitle]</p>
          </div>

          {/* Key Insight (optional) */}
          <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="callout callout-info">
              <h2 className="callout-title">[Key Insight Title]</h2>
              <p>[Key insight text]</p>
            </div>
          </div>

          {/* Calculator Component */}
          <MyCalculator />

          {/* ToolRating - MANDATORY */}
          <ToolRating toolSlug="[slug]" />

          {/* Be-Tech Recommendation - MANDATORY */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: '5rem', height: '5rem', padding: 'var(--space-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-sm)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Recommended: Be-Tech</h3>
                    <span className="badge badge-accent">[Contextual Badge]</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)' }}>
                    [Calculator-specific recommendation text]
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content (tables, methodology, etc.) */}

          {/* RelatedResources - MANDATORY */}
          <RelatedResources calculatorSlug="[calculator-content-slug]" />

          {/* Related Tools Grid */}
          <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="section-title">More Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/[related-slug]" className="link-card">
                <h3 className="link-card__title">[Tool Name]</h3>
                <p className="link-card__desc">[Short description]</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-4xl mx-auto" style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
            <div className="info-box">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <BookOpen className="w-6 h-6" style={{ color: 'var(--color-accent)' }} /> Technical Data Sources
                </h3>
                <span className="badge badge-success">Verified Feb 2026</span>
              </div>
              {/* Source cards */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

### Client Calculator Component (Pattern B)

```tsx
'use client'

import { useState } from 'react'

interface CalculatorInputs {
  // Define typed input fields
}

interface CalculatorResult {
  // Define typed result fields
}

export default function MyCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    // Default values
  })

  const calculate = (): CalculatorResult => {
    // Pure calculation logic
    return { /* results */ }
  }

  const result = calculate()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Input Section - 2 cols */}
      <div className="lg:col-span-2 space-y-6">
        <div className="content-card">
          <h2 className="section-title">Parameters</h2>
          <div className="space-y-6">
            {/* Input controls */}
          </div>
        </div>
      </div>

      {/* Results Section - 1 col, sticky */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-[color]-600 to-[color]-700 rounded-lg shadow-lg p-8 text-white sticky top-4">
          <h2 className="text-xl font-bold mb-6">[Result Title]</h2>
          {/* Result display */}
        </div>
      </div>
    </div>
  )
}
```

## CSS Class Conventions

| Element | Class / Style |
|---------|--------------|
| Page wrapper | `className="page-bg"` |
| Main container | `className="container-main section"` |
| Content cards | `className="content-card"` |
| Section titles | `className="section-title"` |
| Data tables | `className="data-table"` |
| Info boxes | `className="info-box"` |
| Callouts | `className="callout callout-info"` / `callout-warning` / `callout-danger` |
| Link cards | `className="link-card"` + `link-card__title` + `link-card__desc` |
| Badges | `className="badge badge-accent"` / `badge-success` |
| Form inputs | `className="form-input"` |
| Check items | `className="check-item"` + `check-item__icon` |
| Labels | `style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}` |
| Range sliders | `className="w-full h-2 rounded-lg appearance-none cursor-pointer"` with `style={{ background: "var(--color-border)" }}` |
| Help text | `style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}` |

## Input Control Types

- **Slider (range):** For numeric values with clear min/max (price, count, years)
- **Select dropdown:** For categorical choices (protocol, material, grade)
- **Radio buttons (styled):** For binary/ternary choices (DIY vs Pro)
- **Checkbox:** For boolean flags (features, options)

## Color Tokens (Use CSS Variables)

```
--color-text-primary     --color-accent
--color-text-secondary   --color-accent-subtle
--color-text-muted       --color-success / --color-success-subtle
--color-text-inverse     --color-warning / --color-warning-subtle
--color-border           --color-danger / --color-danger-subtle
--color-surface-alt
```

## Results Panel

- **Sticky positioning:** `sticky top-4`
- **Gradient background:** `bg-gradient-to-br from-[color]-600 to-[color]-700`
- **Hero metric:** Large number (text-5xl or text-6xl) + description
- **Line items:** `flex justify-between` with `border-b border-white/20`
- **Summary box:** `bg-white/10 rounded-lg p-4`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing `ToolRating` | Required on EVERY calculator page |
| Missing Be-Tech recommendation | MANDATORY per project rule |
| Using `'use client'` on server page | Only client component needs this directive |
| Duplicating `CalculatorRelatedContent` | Already in parent `layout.tsx` |
| Using `Response.json()` directly | Use project utility functions |
| camelCase URL paths | Use kebab-case: `/calculators/battery-life` |
| Missing Schema.org | Add breadcrumb + SoftwareApplication schemas |
| Hardcoded colors | Use CSS custom properties `var(--color-*)` |
| No `max-w-7xl mx-auto` wrapper | Content sections need this constraint |
