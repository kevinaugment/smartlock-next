# Git Workflow

## Commit Message Format

```
<type>: <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci

## Feature Implementation Workflow

1. **Plan First**
   - Use `/brainstorm` workflow to clarify requirements
   - Load `writing-plans/SKILL.md` to create implementation plan
   - Identify dependencies and risks
   - Break down into phases

2. **Implement**
   - Follow `coding-standards/SKILL.md` for code quality
   - Write tests alongside implementation
   - Keep changes focused and atomic

3. **Verify**
   - Run `npm run build` — must pass
   - Run `npm run lint` — must pass
   - Test critical user flows manually

4. **Commit & Push**
   - Detailed commit messages using Conventional Commits
   - Push to GitHub → Vercel auto-deploys

## Pull Request Workflow

When creating PRs:
1. Analyze full commit history (not just latest commit)
2. Use `git diff [base-branch]...HEAD` to see all changes
3. Draft comprehensive PR summary
4. Include test plan
5. Push with `-u` flag if new branch
