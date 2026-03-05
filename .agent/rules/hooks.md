# Code Quality Hooks

## Pre-Commit Checks

Before ANY commit, verify:
1. **Build passes:** `npm run build` completes without errors
2. **Lint passes:** `npm run lint` returns clean
3. **No debug code:** No `console.log` statements left in production code
4. **No hardcoded values:** All secrets via `process.env`, all config via constants

## Post-Edit Verification

After editing TypeScript files:
- Check for type errors in the modified file
- Verify imports are correct and used
- Ensure no unused variables or functions

## File Creation Guards

Avoid creating unnecessary files:
- No `.md` process documents in the project root (use `.agent/` directory)
- No scratch files outside `/tmp/`
- No duplicate utility files — check existing `lib/` first

## Quality Checklist (Before Marking Work Complete)

- [ ] Code compiles without errors
- [ ] No `console.log` statements in production code
- [ ] All user inputs validated
- [ ] Error handling is comprehensive
- [ ] File is under 800 lines
- [ ] Functions are under 50 lines
- [ ] No deep nesting (>4 levels)
- [ ] Uses immutable patterns (spread, not mutation)

## Auto-Format Standards

- Prettier for JS/TS/CSS formatting
- ESLint for code quality rules
- TypeScript strict mode enabled
