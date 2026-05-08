---
description: Build, verify, and deploy workflow
---
// turbo
1. Run `npm run test:db-facade` — verify the D1/Turso facade stays compatible.
2. Run `npm run build` — verify no build errors.
// turbo
3. Run `CF_KV_NAMESPACE_ID=<id> npm run upload` — verify the Worker bundle and Cloudflare bindings.
4. Review changed files with `git diff` — confirm all changes are intentional.
5. Commit using Conventional Commits format and push to `main`.
6. Cloudflare Workers deploys on push to `main`.
7. After deployment, verify the live site at https://www.slockhub.com:
   - Check deployed pages load correctly
   - Verify no console errors in browser
   - Confirm SEO metadata renders in page source
8. All code must follow `.agent/skills/coding-standards/SKILL.md`.
