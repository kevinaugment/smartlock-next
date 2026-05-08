---
name: signal-strength
description: "Skill for the Signal-strength area of smartlock-next. 7 symbols across 2 files."
---

# Signal-strength

7 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how SignalCalculator, calculateSignal, getSignalQuality work
- Modifying signal-strength-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/signal-strength/SignalCalculator.tsx` | SignalCalculator, calculateSignal, getSignalQuality, getRecommendation |
| `app/calculators/signal-strength/page-old-backup.tsx` | SignalStrengthCalculator, calculateSignal, getSignalQuality |

## Entry Points

Start here when exploring this area:

- **`SignalCalculator`** (Function) — `app/calculators/signal-strength/SignalCalculator.tsx:94`
- **`calculateSignal`** (Function) — `app/calculators/signal-strength/SignalCalculator.tsx:108`
- **`getSignalQuality`** (Function) — `app/calculators/signal-strength/SignalCalculator.tsx:181`
- **`getRecommendation`** (Function) — `app/calculators/signal-strength/SignalCalculator.tsx:191`
- **`SignalStrengthCalculator`** (Function) — `app/calculators/signal-strength/page-old-backup.tsx:5`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `SignalCalculator` | Function | `app/calculators/signal-strength/SignalCalculator.tsx` | 94 |
| `calculateSignal` | Function | `app/calculators/signal-strength/SignalCalculator.tsx` | 108 |
| `getSignalQuality` | Function | `app/calculators/signal-strength/SignalCalculator.tsx` | 181 |
| `getRecommendation` | Function | `app/calculators/signal-strength/SignalCalculator.tsx` | 191 |
| `SignalStrengthCalculator` | Function | `app/calculators/signal-strength/page-old-backup.tsx` | 5 |
| `calculateSignal` | Function | `app/calculators/signal-strength/page-old-backup.tsx` | 12 |
| `getSignalQuality` | Function | `app/calculators/signal-strength/page-old-backup.tsx` | 50 |

## How to Explore

1. `gitnexus_context({name: "SignalCalculator"})` — see callers and callees
2. `gitnexus_query({query: "signal-strength"})` — find related execution flows
3. Read key files listed above for implementation details
