# Agent Orchestration

## Task Decomposition

For complex feature requests:
1. Break into independent sub-tasks
2. Identify dependencies between tasks
3. Execute independent tasks in parallel when possible
4. Verify each task before proceeding

## Parallel Analysis

ALWAYS use parallel execution for independent operations:

```markdown
# GOOD: Parallel execution
Analyze simultaneously:
1. Security review of auth module
2. Performance review of database queries
3. Type checking of utility functions

# BAD: Sequential when unnecessary
First security, then performance, then types
```

## Multi-Perspective Review

For complex problems, analyze from multiple angles:
- **Factual accuracy** — Are all claims verifiable?
- **Engineering quality** — Is the code clean and maintainable?
- **Security** — Are there vulnerabilities?
- **Consistency** — Does it match existing patterns?
- **Redundancy** — Is there unnecessary duplication?

## Skill Loading

Before starting work, load relevant skills:
- Feature design → `brainstorming/SKILL.md`
- Calculator pages → `calculator-detail-page/SKILL.md`
- SEO content → `seo-content/SKILL.md` + `seo-schema/SKILL.md`
- Bug investigation → `systematic-debugging/SKILL.md`
- UI/frontend → `frontend-design/SKILL.md`
- Code quality → `coding-standards/SKILL.md`
