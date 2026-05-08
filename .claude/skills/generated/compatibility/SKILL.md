---
name: compatibility
description: "Skill for the Compatibility area of smartlock-next. 7 symbols across 2 files."
---

# Compatibility

7 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how CompatibilityChecker, checkCompatibility, getScoreClass work
- Modifying compatibility-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/compatibility/CompatibilityChecker.tsx` | CompatibilityChecker, checkCompatibility, getScoreClass, getScoreLabel |
| `app/calculators/compatibility/page-old-backup.tsx` | CompatibilityChecker, checkCompatibility, getCompatibilityLevel |

## Entry Points

Start here when exploring this area:

- **`CompatibilityChecker`** (Function) — `app/calculators/compatibility/CompatibilityChecker.tsx:30`
- **`checkCompatibility`** (Function) — `app/calculators/compatibility/CompatibilityChecker.tsx:50`
- **`getScoreClass`** (Function) — `app/calculators/compatibility/CompatibilityChecker.tsx:228`
- **`getScoreLabel`** (Function) — `app/calculators/compatibility/CompatibilityChecker.tsx:235`
- **`CompatibilityChecker`** (Function) — `app/calculators/compatibility/page-old-backup.tsx:5`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `CompatibilityChecker` | Function | `app/calculators/compatibility/CompatibilityChecker.tsx` | 30 |
| `checkCompatibility` | Function | `app/calculators/compatibility/CompatibilityChecker.tsx` | 50 |
| `getScoreClass` | Function | `app/calculators/compatibility/CompatibilityChecker.tsx` | 228 |
| `getScoreLabel` | Function | `app/calculators/compatibility/CompatibilityChecker.tsx` | 235 |
| `CompatibilityChecker` | Function | `app/calculators/compatibility/page-old-backup.tsx` | 5 |
| `checkCompatibility` | Function | `app/calculators/compatibility/page-old-backup.tsx` | 13 |
| `getCompatibilityLevel` | Function | `app/calculators/compatibility/page-old-backup.tsx` | 80 |

## How to Explore

1. `gitnexus_context({name: "CompatibilityChecker"})` — see callers and callees
2. `gitnexus_query({query: "compatibility"})` — find related execution flows
3. Read key files listed above for implementation details
