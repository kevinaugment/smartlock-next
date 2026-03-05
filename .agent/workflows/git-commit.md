---
description: Standardized commit process with build and lint verification
---
1. Verify all code follows `.agent/skills/coding-standards/SKILL.md`.
// turbo
2. Run `npm run build` — must complete without errors.
// turbo
3. Run `npm run lint` — must return clean.
4. Stage changes with `git add` (review what is being staged).
5. Write commit message using Conventional Commits format:
   ```
   <type>: <description>
   ```
   Types: feat, fix, refactor, docs, test, chore, perf, ci
6. Commit and push to GitHub.
