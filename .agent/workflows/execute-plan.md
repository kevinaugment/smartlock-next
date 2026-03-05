---
description: Execute a plan with review checkpoints between tasks
---
1. Load the implementation plan document.
2. Execute tasks sequentially in the order defined by the plan.
3. After each task, verify the success criterion is met before proceeding.
4. At critical checkpoints (every 3-5 tasks), request user confirmation.
5. If a task fails verification, load `.agent/skills/systematic-debugging/SKILL.md` to investigate.
6. All code must follow `.agent/skills/coding-standards/SKILL.md`.
7. Commit completed work at each checkpoint using Conventional Commits format.
