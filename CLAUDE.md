<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **smartlock-next** (4186 symbols, 4801 relationships, 43 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/smartlock-next/context` | Codebase overview, check index freshness |
| `gitnexus://repo/smartlock-next/clusters` | All functional areas |
| `gitnexus://repo/smartlock-next/processes` | All execution flows |
| `gitnexus://repo/smartlock-next/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |
| Work in the Db area (34 symbols) | `.claude/skills/generated/db/SKILL.md` |
| Work in the Lock-tco area (17 symbols) | `.claude/skills/generated/lock-tco/SKILL.md` |
| Work in the [slug] area (16 symbols) | `.claude/skills/generated/slug/SKILL.md` |
| Work in the Articles area (13 symbols) | `.claude/skills/generated/articles/SKILL.md` |
| Work in the Components area (8 symbols) | `.claude/skills/generated/components/SKILL.md` |
| Work in the Services area (7 symbols) | `.claude/skills/generated/services/SKILL.md` |
| Work in the Signal-strength area (7 symbols) | `.claude/skills/generated/signal-strength/SKILL.md` |
| Work in the Compatibility area (7 symbols) | `.claude/skills/generated/compatibility/SKILL.md` |
| Work in the Ratings area (6 symbols) | `.claude/skills/generated/ratings/SKILL.md` |
| Work in the Pin-strength area (6 symbols) | `.claude/skills/generated/pin-strength/SKILL.md` |
| Work in the Str-roi area (6 symbols) | `.claude/skills/generated/str-roi/SKILL.md` |
| Work in the Installation-cost area (6 symbols) | `.claude/skills/generated/installation-cost/SKILL.md` |
| Work in the Brands area (5 symbols) | `.claude/skills/generated/brands/SKILL.md` |
| Work in the Protocol-wizard area (5 symbols) | `.claude/skills/generated/protocol-wizard/SKILL.md` |
| Work in the Cluster_1 area (4 symbols) | `.claude/skills/generated/cluster-1/SKILL.md` |
| Work in the App area (4 symbols) | `.claude/skills/generated/app/SKILL.md` |
| Work in the [product] area (4 symbols) | `.claude/skills/generated/product/SKILL.md` |
| Work in the Mesh-planner area (4 symbols) | `.claude/skills/generated/mesh-planner/SKILL.md` |
| Work in the Credential-planner area (4 symbols) | `.claude/skills/generated/credential-planner/SKILL.md` |
| Work in the Battery-life area (4 symbols) | `.claude/skills/generated/battery-life/SKILL.md` |

<!-- gitnexus:end -->
