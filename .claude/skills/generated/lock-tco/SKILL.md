---
name: lock-tco
description: "Skill for the Lock-tco area of smartlock-next. 17 symbols across 3 files."
---

# Lock-tco

17 symbols | 3 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how TCOCalculator, calculateTCO, CalculatorClient work
- Modifying lock-tco-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/lock-tco/page.tsx` | getDefaultHubCost, getBatteryLifeMonths, getRegionMultiplier, getMaintenanceCost, getWarrantyReplacementCost (+3) |
| `app/calculators/lock-tco/CalculatorClient.tsx` | getDefaultHubCost, getBatteryLife, adjustForUsage, CalculatorClient, calculateTCO |
| `app/calculators/lock-tco/page-old-backup.tsx` | getDefaultHubCost, adjustForUsage, TCOCalculator, calculateTCO |

## Entry Points

Start here when exploring this area:

- **`TCOCalculator`** (Function) — `app/calculators/lock-tco/page.tsx:90`
- **`calculateTCO`** (Function) — `app/calculators/lock-tco/page.tsx:110`
- **`CalculatorClient`** (Function) — `app/calculators/lock-tco/CalculatorClient.tsx:60`
- **`calculateTCO`** (Function) — `app/calculators/lock-tco/CalculatorClient.tsx:74`
- **`TCOCalculator`** (Function) — `app/calculators/lock-tco/page-old-backup.tsx:48`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `TCOCalculator` | Function | `app/calculators/lock-tco/page.tsx` | 90 |
| `calculateTCO` | Function | `app/calculators/lock-tco/page.tsx` | 110 |
| `CalculatorClient` | Function | `app/calculators/lock-tco/CalculatorClient.tsx` | 60 |
| `calculateTCO` | Function | `app/calculators/lock-tco/CalculatorClient.tsx` | 74 |
| `TCOCalculator` | Function | `app/calculators/lock-tco/page-old-backup.tsx` | 48 |
| `calculateTCO` | Function | `app/calculators/lock-tco/page-old-backup.tsx` | 62 |
| `getDefaultHubCost` | Function | `app/calculators/lock-tco/page.tsx` | 50 |
| `getBatteryLifeMonths` | Function | `app/calculators/lock-tco/page.tsx` | 57 |
| `getRegionMultiplier` | Function | `app/calculators/lock-tco/page.tsx` | 64 |
| `getMaintenanceCost` | Function | `app/calculators/lock-tco/page.tsx` | 71 |
| `getWarrantyReplacementCost` | Function | `app/calculators/lock-tco/page.tsx` | 77 |
| `adjustForUsage` | Function | `app/calculators/lock-tco/page.tsx` | 84 |
| `getDefaultHubCost` | Function | `app/calculators/lock-tco/CalculatorClient.tsx` | 44 |
| `getBatteryLife` | Function | `app/calculators/lock-tco/CalculatorClient.tsx` | 49 |
| `adjustForUsage` | Function | `app/calculators/lock-tco/CalculatorClient.tsx` | 54 |
| `getDefaultHubCost` | Function | `app/calculators/lock-tco/page-old-backup.tsx` | 35 |
| `adjustForUsage` | Function | `app/calculators/lock-tco/page-old-backup.tsx` | 42 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `TCOCalculator → GetRegionMultiplier` | intra_community | 3 |
| `TCOCalculator → GetDefaultHubCost` | intra_community | 3 |
| `TCOCalculator → GetBatteryLifeMonths` | intra_community | 3 |
| `TCOCalculator → AdjustForUsage` | intra_community | 3 |
| `TCOCalculator → GetDefaultHubCost` | intra_community | 3 |
| `TCOCalculator → AdjustForUsage` | intra_community | 3 |
| `CalculatorClient → GetDefaultHubCost` | intra_community | 3 |
| `CalculatorClient → GetBatteryLife` | intra_community | 3 |
| `CalculatorClient → AdjustForUsage` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "TCOCalculator"})` — see callers and callees
2. `gitnexus_query({query: "lock-tco"})` — find related execution flows
3. Read key files listed above for implementation details
