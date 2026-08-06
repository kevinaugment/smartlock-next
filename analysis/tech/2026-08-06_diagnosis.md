# Technical SEO Diagnosis

- Date: 2026-08-06
- Mode: GSC weekly monitoring transfer plus onsite architecture diagnosis
- Protected list: do not auto-change verified canonical tags, live redirects, or live structured data fields.
- Backlinks: excluded by site rule.
- Tech history: `analysis/tech/` had no prior `.md` records, so no unresolved tech-history items could be aged.
- Retest date: 2026-08-27, because this report creates 5 unresolved/new items.

## Transfer Context

The prior GSC weekly review flagged a weekly click drop from 30 to 17 (-43.3%) while impressions were nearly stable at 1362 to 1299 (-4.6%). CTR fell from 2.20% to 1.31%, while weighted average position only moved from 22.01 to 23.39.

Abnormal pages carried into this diagnosis:

- `/compare/kwikset-vs-schlage`
- `/calculators/battery-life`
- `/compare/samsung-vs-xiaomi`
- `/compare/tedee-vs-august`
- `/compare/veise-vs-schlage`

## Stage 1: Independent Conclusions

### Agent-1: Relevance Engineering / AI Search

- Tool-first routing may under-match comparison-led queries. Severity: 4/5.
- Tiny-sample volatile queries are not enough for precise content retargeting. Severity: 2/5.
- Client-loaded related resources are weak for AI crawlers because links are not guaranteed in initial HTML. Severity: 4/5.
- Missing `llms.txt` and missing current crawl/coverage diagnostics limit AI search confidence. Severity: 3/5.

### Agent-2: Topic Authority / Internal-Link Silo

- Security and integration clusters are thin compared with protocol/resources coverage. Severity: 4/5.
- HomeKit/Z-Wave and long-tail compare pages still need query-specific metadata/link tuning. Severity: 3/5.
- Available source samples do not prove any core page reaches the >=50 relevant internal-link target. Severity: 4/5.
- `SeoPathways` provides only 3 static links per topic and cannot satisfy the core-page threshold alone. Severity: 3/5.
- HTML sitemap is incomplete and includes admin/API links. Severity: 4/5.
- Calculator related links are client-loaded and not guaranteed in initial HTML. Severity: 3/5.

## Stage 2: Cross Review

- Agent-1's comparison-intent concern has partial architecture support: Agent-2 found unresolved long-tail compare tuning and insufficient proof that core pages meet the >=50 relevant-link target.
- Correction: the evidence does not prove that the homepage's tool-first positioning is itself the root cause. The stronger diagnosis is that comparison-intent pages, especially long-tail compare pages, need verified query-specific packaging and stronger relevant internal-link paths.
- Agent-1's AI crawler concern is supported by Agent-2's architecture finding: calculator related links are client-loaded and may not be present in initial HTML.
- Agent-1's `llms.txt` finding has no direct Silo root cause. It remains an independent AI-search adaptation gap, not a traditional internal-link root cause.
- The volatile-query problem has no architecture root cause from current evidence. It remains a measurement limitation because the current inputs lack GSC coverage, URL Inspection, full crawl map, and inbound internal-link counts.

## Decision Table

| Problem | Status | Severity | Fix Action | Protected List Involved | Verification Metric |
|---|---|---:|---|---|---|
| Long-tail compare pages need verified query-specific intent packaging and internal-link prioritization | 新增 | 4 | Audit the affected compare URLs and top long-tail compare templates for above-fold answer, pair-specific caveats, model-level proof, and relevant links from `/compare`, brand pages, best pages, and calculators. Do not change canonical or redirects without approval. | Possible if canonical/redirect/schema changes are proposed; current action is audit/recommendation only. | For affected compare pages: current query mapped, static page has pair-specific verdict/evidence, >=50 relevant internal inbound links confirmed, GSC CTR and average position rechecked on 2026-08-27. |
| Core pages have no proof of meeting the >=50 relevant internal-link target | 新增 | 4 | Generate a crawl-based internal-link map and count relevant inbound links for homepage, `/compare`, `/calculators`, `/protocols`, `/brands`, `/articles`, `/resources`, and affected URLs. | No. | Crawl map exists; each core page has counted relevant inbound links; pages below 50 are listed with source pages to add links from. |
| HTML sitemap is incomplete and includes low-value admin/API links | 新增 | 4 | Propose a sitemap-page cleanup plan that lists core hubs, all calculator pages, article categories, resources, protocols, and selected high-value compare/best pages; remove admin/API links from the human sitemap proposal. | No canonical/redirect/schema change required for proposal. | HTML sitemap sample includes all 32 calculators and main crawl hubs; admin/API links absent; crawl depth to selected URLs <=3 clicks in rendered HTML. |
| Client-loaded calculator related links are not reliable initial-HTML internal links | 新增 | 3 | Replace or supplement client-loaded related resources with server-rendered fallback links for priority calculators, especially `/calculators/battery-life`, `/calculators/compatibility`, `/calculators/signal-strength`, and `/calculators/lock-tco`. | No, unless structured data is later changed. | Raw HTML contains related article/tool links without JS; affected calculator pages have relevant outbound Silo links visible to non-JS crawlers. |
| AI search guidance is incomplete because `/llms.txt` is missing | 新增 | 3 | Draft an `llms.txt` proposal listing primary tool pages, protocol guides, comparison hubs, evidence policy, and contact/about pages. Keep it advisory until reviewed. | No. | `/llms.txt` exists after approval; includes calculators, protocol hub, compare hub, resources, and evidence pages; AI crawler access remains allowed in robots. |

## Not Resolved

Resolved items: 0.

Unresolved/new items: 5.

Retest date: 2026-08-27. Retest should use a crawl map, GSC coverage or URL Inspection samples, rendered/raw HTML checks, and the next GSC performance export.
