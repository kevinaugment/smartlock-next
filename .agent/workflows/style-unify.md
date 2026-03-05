---
description: Audit and unify site-wide styles, eliminate AI-generated aesthetic patterns
---
1. Load `.agent/skills/frontend-design/SKILL.md` for anti-AI-aesthetics principles.
2. Load `.agent/skills/calculator-detail-page/SKILL.md` for approved CSS class conventions and color tokens.
3. Audit `app/globals.css` for design consistency:
   - Verify all CSS custom properties (`--color-*`, `--space-*`) are defined and used consistently.
   - Check for hardcoded color values that should use CSS variables.
   - Verify font stack is consistent (no mixed font families across pages).
4. Scan all pages and components for **AI-style anti-patterns** (MUST be eliminated):
   - ❌ Left border colored blocks (`border-left: 3px solid [color]`) — replace with proper callout classes.
   - ❌ Button background and text in same/similar colors (ensure sufficient contrast ratio ≥ 4.5:1).
   - ❌ Purple gradients on white backgrounds.
   - ❌ Generic font families (Inter, Roboto, Arial as primary).
   - ❌ Cookie-cutter card layouts with identical spacing/shadow patterns across all pages.
   - ❌ Rainbow/multi-color icon systems with no cohesive palette.
5. Verify component class consistency:
   - All content cards use `content-card` class.
   - All section titles use `section-title` class.
   - All data tables use `data-table` class.
   - All callouts use `callout callout-info|warning|danger` classes.
   - All badges use `badge badge-accent|success` classes.
6. Check responsive behavior at 3 breakpoints: mobile (375px), tablet (768px), desktop (1280px).
7. Document all findings and fixes in a brief report.
8. All code must follow `.agent/skills/coding-standards/SKILL.md`.
