---
name: components
description: "Skill for the Components area of smartlock-next. 8 symbols across 3 files."
---

# Components

8 symbols | 3 files | Cohesion: 100%

## When to Use

- Working with code in `components/`
- Understanding how AnalyticsScripts, check, onStorage work
- Modifying components-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `components/AnalyticsScripts.tsx` | AnalyticsScripts, check, onStorage, onConsent |
| `components/ToolRating.tsx` | ToolRating, handleVote |
| `components/TableOfContents.tsx` | TableOfContents, handleClick |

## Entry Points

Start here when exploring this area:

- **`AnalyticsScripts`** (Function) — `components/AnalyticsScripts.tsx:11`
- **`check`** (Function) — `components/AnalyticsScripts.tsx:16`
- **`onStorage`** (Function) — `components/AnalyticsScripts.tsx:22`
- **`onConsent`** (Function) — `components/AnalyticsScripts.tsx:28`
- **`ToolRating`** (Function) — `components/ToolRating.tsx:8`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `AnalyticsScripts` | Function | `components/AnalyticsScripts.tsx` | 11 |
| `check` | Function | `components/AnalyticsScripts.tsx` | 16 |
| `onStorage` | Function | `components/AnalyticsScripts.tsx` | 22 |
| `onConsent` | Function | `components/AnalyticsScripts.tsx` | 28 |
| `ToolRating` | Function | `components/ToolRating.tsx` | 8 |
| `handleVote` | Function | `components/ToolRating.tsx` | 35 |
| `TableOfContents` | Function | `components/TableOfContents.tsx` | 10 |
| `handleClick` | Function | `components/TableOfContents.tsx` | 37 |

## How to Explore

1. `gitnexus_context({name: "AnalyticsScripts"})` — see callers and callees
2. `gitnexus_query({query: "components"})` — find related execution flows
3. Read key files listed above for implementation details
