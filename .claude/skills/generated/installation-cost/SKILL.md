---
name: installation-cost
description: "Skill for the Installation-cost area of smartlock-next. 6 symbols across 2 files."
---

# Installation-cost

6 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how InstallationCostCalculator, calculateCost, toggleFeature work
- Modifying installation-cost-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/installation-cost/page-old-backup.tsx` | InstallationCostCalculator, calculateCost, toggleFeature |
| `app/calculators/installation-cost/CostCalculator.tsx` | getBulkDiscount, CostCalculator, calculateCost |

## Entry Points

Start here when exploring this area:

- **`InstallationCostCalculator`** (Function) — `app/calculators/installation-cost/page-old-backup.tsx:5`
- **`calculateCost`** (Function) — `app/calculators/installation-cost/page-old-backup.tsx:20`
- **`toggleFeature`** (Function) — `app/calculators/installation-cost/page-old-backup.tsx:50`
- **`CostCalculator`** (Function) — `app/calculators/installation-cost/CostCalculator.tsx:86`
- **`calculateCost`** (Function) — `app/calculators/installation-cost/CostCalculator.tsx:100`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `InstallationCostCalculator` | Function | `app/calculators/installation-cost/page-old-backup.tsx` | 5 |
| `calculateCost` | Function | `app/calculators/installation-cost/page-old-backup.tsx` | 20 |
| `toggleFeature` | Function | `app/calculators/installation-cost/page-old-backup.tsx` | 50 |
| `CostCalculator` | Function | `app/calculators/installation-cost/CostCalculator.tsx` | 86 |
| `calculateCost` | Function | `app/calculators/installation-cost/CostCalculator.tsx` | 100 |
| `getBulkDiscount` | Function | `app/calculators/installation-cost/CostCalculator.tsx` | 63 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `CostCalculator → GetBulkDiscount` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "InstallationCostCalculator"})` — see callers and callees
2. `gitnexus_query({query: "installation-cost"})` — find related execution flows
3. Read key files listed above for implementation details
