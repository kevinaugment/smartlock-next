---
name: str-roi
description: "Skill for the Str-roi area of smartlock-next. 6 symbols across 2 files."
---

# Str-roi

6 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how STRCalculator, calculate, getROIClass work
- Modifying str-roi-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/str-roi/STRCalculator.tsx` | STRCalculator, calculate, getROIClass, getROILabel |
| `app/calculators/str-roi/page-old-backup.tsx` | STRROICalculator, calculate |

## Entry Points

Start here when exploring this area:

- **`STRCalculator`** (Function) — `app/calculators/str-roi/STRCalculator.tsx:28`
- **`calculate`** (Function) — `app/calculators/str-roi/STRCalculator.tsx:45`
- **`getROIClass`** (Function) — `app/calculators/str-roi/STRCalculator.tsx:107`
- **`getROILabel`** (Function) — `app/calculators/str-roi/STRCalculator.tsx:114`
- **`STRROICalculator`** (Function) — `app/calculators/str-roi/page-old-backup.tsx:5`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `STRCalculator` | Function | `app/calculators/str-roi/STRCalculator.tsx` | 28 |
| `calculate` | Function | `app/calculators/str-roi/STRCalculator.tsx` | 45 |
| `getROIClass` | Function | `app/calculators/str-roi/STRCalculator.tsx` | 107 |
| `getROILabel` | Function | `app/calculators/str-roi/STRCalculator.tsx` | 114 |
| `STRROICalculator` | Function | `app/calculators/str-roi/page-old-backup.tsx` | 5 |
| `calculate` | Function | `app/calculators/str-roi/page-old-backup.tsx` | 14 |

## How to Explore

1. `gitnexus_context({name: "STRCalculator"})` — see callers and callees
2. `gitnexus_query({query: "str-roi"})` — find related execution flows
3. Read key files listed above for implementation details
