---
description: Audit Google Search Console data and output iterative SEO optimization suggestions
---
1. Load `.agent/skills/seo-page/SKILL.md` for single-page analysis criteria.
2. Load `.agent/skills/seo-content/SKILL.md` for E-E-A-T and content quality requirements.
3. Load `.agent/skills/seo-schema/SKILL.md` for structured data validation.
4. Load `.agent/skills/seo-geo/SKILL.md` for AI search optimization signals.
5. **Review past suggestions** — read all existing files in `suggestion/gsc/` to understand:
   - What optimizations have already been applied.
   - Which pages have already been addressed.
   - What the trend of improvements looks like.
   - Avoid recommending changes that were already made.
6. **Analyze GSC data** provided by the user (queries, pages, impressions, clicks, CTR, position):
   - Identify pages with high impressions but low CTR (title/meta description issues).
   - Identify pages with declining position (content freshness or competition issues).
   - Identify queries where the site ranks 4-20 (quick-win optimization targets).
   - Identify cannibalization — multiple pages competing for the same query.
   - Cross-reference with `.agent/skills/seo-technical/SKILL.md` for technical issues.
7. **Strict accuracy requirement**: Verify all recommendations against Google Search results or authoritative sources. No assumptions or fabricated data.
8. **Generate suggestion file** saved to:
   ```
   suggestion/gsc/suggestion-YYYY-MM-DD.md
   ```
   File must include:
   - **Date** and **Data Period** analyzed.
   - **Summary** of key findings (3-5 bullet points).
   - **Past Actions Review** — what was done in previous suggestions and their impact.
   - **New Recommendations** — prioritized as Critical / High / Medium / Low.
   - Each recommendation must include: page URL, current metric, target metric, specific action.
   - **Pages Already Optimized** — list of pages skipped because they were addressed in prior cycles.
9. Create the `suggestion/gsc/` directory if it does not exist.
