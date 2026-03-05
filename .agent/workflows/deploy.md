---
description: Build, verify, and deploy workflow
---
// turbo
1. Run `npm run build` — verify no build errors.
// turbo
2. Run `npm run lint` — verify no lint errors.
3. Review changed files with `git diff` — confirm all changes are intentional.
4. Commit using Conventional Commits format and push to `main`.
5. Vercel auto-deploys on push to `main`.
6. After deployment, verify the live site at https://www.slockhub.com:
   - Check deployed pages load correctly
   - Verify no console errors in browser
   - Confirm SEO metadata renders in page source
7. All code must follow `.agent/skills/coding-standards/SKILL.md`.
