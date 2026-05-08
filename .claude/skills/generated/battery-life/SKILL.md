---
name: battery-life
description: "Skill for the Battery-life area of smartlock-next. 4 symbols across 2 files."
---

# Battery-life

4 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how BatteryLifeCalculator, calculateBatteryLife, BatteryCalculator work
- Modifying battery-life-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/battery-life/page-old-backup.tsx` | BatteryLifeCalculator, calculateBatteryLife |
| `app/calculators/battery-life/BatteryCalculator.tsx` | BatteryCalculator, calculateBatteryLife |

## Entry Points

Start here when exploring this area:

- **`BatteryLifeCalculator`** (Function) — `app/calculators/battery-life/page-old-backup.tsx:5`
- **`calculateBatteryLife`** (Function) — `app/calculators/battery-life/page-old-backup.tsx:13`
- **`BatteryCalculator`** (Function) — `app/calculators/battery-life/BatteryCalculator.tsx:59`
- **`calculateBatteryLife`** (Function) — `app/calculators/battery-life/BatteryCalculator.tsx:78`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `BatteryLifeCalculator` | Function | `app/calculators/battery-life/page-old-backup.tsx` | 5 |
| `calculateBatteryLife` | Function | `app/calculators/battery-life/page-old-backup.tsx` | 13 |
| `BatteryCalculator` | Function | `app/calculators/battery-life/BatteryCalculator.tsx` | 59 |
| `calculateBatteryLife` | Function | `app/calculators/battery-life/BatteryCalculator.tsx` | 78 |

## How to Explore

1. `gitnexus_context({name: "BatteryLifeCalculator"})` — see callers and callees
2. `gitnexus_query({query: "battery-life"})` — find related execution flows
3. Read key files listed above for implementation details
