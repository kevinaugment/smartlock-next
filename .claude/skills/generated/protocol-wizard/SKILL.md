---
name: protocol-wizard
description: "Skill for the Protocol-wizard area of smartlock-next. 5 symbols across 2 files."
---

# Protocol-wizard

5 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `app/`
- Understanding how ProtocolWizard, calculateRecommendation, getScoreClass work
- Modifying protocol-wizard-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `app/calculators/protocol-wizard/ProtocolWizard.tsx` | ProtocolWizard, calculateRecommendation, getScoreClass |
| `app/calculators/protocol-wizard/page-old-backup.tsx` | ProtocolWizard, calculateScores |

## Entry Points

Start here when exploring this area:

- **`ProtocolWizard`** (Function) — `app/calculators/protocol-wizard/ProtocolWizard.tsx:23`
- **`calculateRecommendation`** (Function) — `app/calculators/protocol-wizard/ProtocolWizard.tsx:33`
- **`getScoreClass`** (Function) — `app/calculators/protocol-wizard/ProtocolWizard.tsx:174`
- **`ProtocolWizard`** (Function) — `app/calculators/protocol-wizard/page-old-backup.tsx:22`
- **`calculateScores`** (Function) — `app/calculators/protocol-wizard/page-old-backup.tsx:32`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ProtocolWizard` | Function | `app/calculators/protocol-wizard/ProtocolWizard.tsx` | 23 |
| `calculateRecommendation` | Function | `app/calculators/protocol-wizard/ProtocolWizard.tsx` | 33 |
| `getScoreClass` | Function | `app/calculators/protocol-wizard/ProtocolWizard.tsx` | 174 |
| `ProtocolWizard` | Function | `app/calculators/protocol-wizard/page-old-backup.tsx` | 22 |
| `calculateScores` | Function | `app/calculators/protocol-wizard/page-old-backup.tsx` | 32 |

## How to Explore

1. `gitnexus_context({name: "ProtocolWizard"})` — see callers and callees
2. `gitnexus_query({query: "protocol-wizard"})` — find related execution flows
3. Read key files listed above for implementation details
