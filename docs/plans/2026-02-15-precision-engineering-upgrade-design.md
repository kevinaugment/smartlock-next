# SLockHub.com — Precision Engineering Upgrade Design

> **For Claude:** REQUIRED: Execute this plan task-by-task following P0 → P1 → P2 → P3 priority order.

**Goal:** Transform SLockHub.com from a generic tool site to a Stripe-level B2B engineering platform with gradient mesh aesthetics, intelligent calculator discovery, and glassmorphism result panels.

**Architecture:** Keep Next.js 14 + TailwindCSS + Cloudflare D1. Upgrade CSS design system, add micro-animations with CSS-only solutions, and restructure calculator discovery UX.

**Tech Stack:** Next.js 14, TailwindCSS, CSS Variables, CSS Animations, next/dynamic

---

## Part 1: Visual Design System Upgrade (P0)

### Color System — Cyan-to-Indigo Gradient Signature

| Token | Current | New |
|-------|---------|-----|
| `--color-accent` | `#0891b2` (Cyan 600) | `#06b6d4` (Cyan 500) |
| `--gradient-brand` | N/A | `linear-gradient(135deg, #06b6d4, #6366f1)` |
| `--color-bg-dark` | `#0f172a` | `#080c18` (near black) |
| Surface texture | Flat `#f8fafc` | `#f8fafc` + noise overlay (opacity 0.03) |
| Card style | Solid border | Glassmorphism (backdrop-blur + semi-transparent border) |

### Typography

| Use | Current | New |
|-----|---------|-----|
| Headlines | DM Sans 800 | Instrument Sans 700 |
| Body | DM Sans | DM Sans (keep) |
| Data/Mono | JetBrains Mono | JetBrains Mono (keep) |

### Micro-Animation System

- Page enter: Cards staggered reveal with `animation-delay` increments
- Number changes: countUp rolling animation
- Button hover: Gradient light sweep
- Scroll-triggered: Fade-in with `IntersectionObserver`
- All animations use `transform` + `opacity` only (60fps guaranteed)

---

## Part 2: Homepage Hero Redesign (P1)

### Background

- Replace static SVG topology with **Animated Mesh Gradient**
- 3 blurred light orbs (`filter: blur(120px)`) drifting slowly (8s cycle)
- Colors: Cyan + Indigo + subtle Violet
- Near-black base (`#080c18`) + CSS noise texture overlay

### Layout — Left-Right Split

- **Left 60%**: Title + subtitle + CTA buttons
- **Right 40%**: Floating calculator preview card (glassmorphism panel showing TCO calculator live data snippet)

### Stats Integration

- 4 mini glassmorphism cards inside Hero (not bottom divider)
- Numbers with `countUp` animation on enter
- JetBrains Mono font for engineering data feel

### CTA Buttons

- Primary: Gradient background (Cyan → Indigo) + hover light sweep
- Secondary: Glassmorphism border + hover inner glow

### Mobile

- Split layout collapses to single column
- Calculator preview card hidden on mobile
- Stats cards become 2×2 grid

---

## Part 3: Calculator Discovery — Smart Finder (P2)

### Layer 1: Smart Finder Wizard (Top of /calculators)

3-step questionnaire panel auto-recommends Top 3 calculators:
- Step 1: Role (Property Manager / Hotel Operator / Security Installer / Other)
- Step 2: Need (Cost Planning / Technical Setup / Compliance / Comparison)
- Step 3: Scale (1-10 doors / 10-100 / 100+)
- Result: Top 3 recommended calculators with match reasons

### Layer 2: Real-time Search Bar

- Fuzzy match instant search — typing "cost" shows TCO, Installation Cost, Subscription Compare
- `⌘K` keyboard shortcut trigger
- Dropdown with category tags and popularity sorting

### Layer 3: Category Filter Pill Tabs

- 6 categories as horizontal scrollable pill tabs (YouTube-style)
- Click to filter grid instantly (CSS fade animation)
- Add "Popular" and "New" special tabs

---

## Part 4: Calculator Detail Page UI Upgrade (P1)

### Input Area — Guided Form

- Desktop: Keep left-right split, add visual progress grouping bar
- Mobile: Step-by-step wizard (2-3 fields per step), fixed "Next" button at bottom

### Result Panel — From Solid Block to Glassmorphism Dashboard

- Dark glassmorphism panel + top gradient stripe (Cyan→Indigo)
- Mini horizontal bar chart for cost breakdown visualization
- New "Insights" card (monthly cost, industry comparison)
- Numbers with `countUp` animation + spring transition
- Mobile: Sticky bottom drawer (expandable/collapsible), real-time total updates

---

## Part 5: Performance Optimization (P3)

| Issue | Fix |
|-------|-----|
| 32 calculators bundled together | `next/dynamic` lazy-load each calculator component |
| Calculator list page 20KB | Extract data to static JSON + `generateStaticParams` |
| Dual font loading | `font-display: swap` + subset to latin only |
| globals.css 1629 lines full load | Split into CSS Modules by page type |
| Lucide React full import | Verify tree-shaking + import only used icons |
| Gradient animation perf | Only `transform` + `opacity` animations |

---

## Part 6: Brand Identity Elements (P3)

### "Gradient Stripe" — Brand Signature

A consistent visual anchor across the site:
- Header: 2px gradient vertical bar left of logo
- Cards: Hover reveals 3px top gradient stripe
- Calculator results: Fixed top gradient stripe
- Footer: Top divider uses gradient instead of gray

### Trust Signals (B2B Critical)

- Header: "Trusted by 500+ Property Managers" (small text)
- Calculator results: "Based on ANSI/BHMA industry standards"
- Footer: Compliance badges and industry certification icons

---

## Implementation Priority

| Priority | Module | Estimated Days |
|----------|--------|---------------|
| **P0** | Visual system — gradients/fonts/tokens | 2 |
| **P1** | Hero redesign | 2 |
| **P1** | Calculator UI upgrade (TCO as template) | 3 |
| **P2** | Smart Finder wizard | 3 |
| **P2** | Search bar + tag filters | 2 |
| **P3** | Mobile wizard forms | 2 |
| **P3** | Performance optimization | 1 |
| **P3** | Brand elements finishing | 1 |

**Total: ~16 days**, suggested 3 sprints.
