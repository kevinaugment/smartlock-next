<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **smartlock-next** (5000 symbols, 6049 relationships, 80 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

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

## Repository Workflow

- Maintain this project as one developer, one mainline, one local working directory.
- Default to working directly on `main`; do not create feature branches, Codex branches, or extra git worktrees unless the user explicitly asks for them.
- Default final pushes must go to `origin/main`, not to a temporary branch.
- Before starting new work, run `git status --short --branch` and resolve or report any dirty state instead of piling new edits onto unknown local changes.
- Before finishing, leave the working tree clean after commit and push. Do not leave large uncommitted diffs, generated artifacts, or abandoned worktrees behind.
- Do not use additional local clones or worktrees to work around conflicts. If `main` cannot be updated cleanly, stop and report the conflict clearly.

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

<!-- gitnexus:end -->
