---
name: pin-strength
description: "Skill for the Pin-strength area of smartlock-next. 6 symbols across 1 files."
---

# Pin-strength

6 symbols | 1 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how PinStrengthChecker work
- Modifying pin-strength-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/pin-strength/page.tsx` | isDatePattern, hasSequentialDigits, hasRepeatedDigits, isKeyboardPattern, analyzePin (+1) |

## Entry Points

Start here when exploring this area:

- **`PinStrengthChecker`** (Function) — `app/calculators/pin-strength/page.tsx:185`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `PinStrengthChecker` | Function | `app/calculators/pin-strength/page.tsx` | 185 |
| `isDatePattern` | Function | `app/calculators/pin-strength/page.tsx` | 18 |
| `hasSequentialDigits` | Function | `app/calculators/pin-strength/page.tsx` | 41 |
| `hasRepeatedDigits` | Function | `app/calculators/pin-strength/page.tsx` | 56 |
| `isKeyboardPattern` | Function | `app/calculators/pin-strength/page.tsx` | 67 |
| `analyzePin` | Function | `app/calculators/pin-strength/page.tsx` | 83 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `PinStrengthChecker → IsDatePattern` | intra_community | 3 |
| `PinStrengthChecker → HasSequentialDigits` | intra_community | 3 |
| `PinStrengthChecker → HasRepeatedDigits` | intra_community | 3 |
| `PinStrengthChecker → IsKeyboardPattern` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "PinStrengthChecker"})` — see callers and callees
2. `gitnexus_query({query: "pin-strength"})` — find related execution flows
3. Read key files listed above for implementation details
