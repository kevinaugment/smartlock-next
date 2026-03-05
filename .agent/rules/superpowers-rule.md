---
trigger: always_on
---

# SLockHub Development Rules

## Prime Directives
- **Skill-First**: Before any task, load the relevant skill from `.agent/skills/`.
- **Structured Design**: Before writing code, use `/brainstorm` to clarify design requirements.
- **Atomic Planning**: All implementation plans must be broken into small atomic tasks via `/write-plan`.
- **Verify Before Commit**: Always run `npm run build` and `npm run lint` before committing.

## Available Workflows
- `/brainstorm`: Start a requirements brainstorm session.
- `/write-plan`: Create a detailed step-by-step implementation plan.
- `/execute-plan`: Execute and review a plan with checkpoints.
- `/git-commit`: Standardized commit process.
- `/seo-content-create`: Create new SEO-optimized content.
- `/deploy`: Build, verify, and deploy workflow.
- `/style-unify`: Audit and unify site-wide styles, eliminate AI aesthetics.
- `/gsc-audit`: Audit GSC data and output iterative SEO optimization suggestions.

## Technical Standards
- Language: TypeScript / Node.js
- Framework: Next.js 14 (App Router)
- Database: Turso / LibSQL
- Deployment: Vercel
- Commits: Conventional Commits (English)
- Coding standards: `.agent/skills/coding-standards/SKILL.md`