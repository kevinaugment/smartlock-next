# Protocol And Integration Hardening

- Date: 2026-08-07
- Mode: limited existing-page hardening after execution-plan review
- Scope rule: no new pages, no backlinks, no canonical/redirect/schema changes.
- Reason: the 2026-08-06 content audit identified uneven protocol and integration authority, but read-only onsite-growth review warned that broad expansion should wait for GSC retest and stronger query evidence.

## Decision

This pass keeps the protocol/integration work narrow:

- Update thin existing pages that already exist in the site architecture.
- Add concrete decision matrices, operating scenarios, failure cases, and validation checklists.
- Do not create new protocol or integration pages.
- Do not consolidate, canonicalize, redirect, or delete pages.
- Treat sitewide `Research Hubs` link-count gains as crawl-support evidence, not proof of topical authority.

## Pages Hardened

| Page | Previous issue | Action | Protected-list impact | Retest |
| --- | --- | --- | --- | --- |
| `/articles/integration/enterprise-system-integration` | Thin enterprise integration page with broad promise and limited implementation detail | Added architecture matrix, data-contract checklist, error handling, reconciliation, privacy/logging, and pilot acceptance testing. | None | 2026-09-17 |
| `/articles/integration/set-up-lock-automations` | Automation advice lacked platform/rental/business failure handling | Added platform patterns, rental/business rules, failure cases, and acceptance checklist. | None | 2026-09-17 |
| `/articles/protocols/thread-vs-zigbee-smart-locks` | Very short comparison for a protocol-intent page | Added decision matrix, Matter feature exposure, Zigbee support checks, installation checklist, and final recommendation. | None | 2026-09-17 |
| `/articles/protocols/matter-vs-homekit-vs-zwave-smart-locks` | Thin ecosystem comparison despite property-manager intent | Added property manager matrix, guest/staff access, battery/signal planning, ownership/support boundary, and recommendation. | None | 2026-09-17 |
| `/articles/protocols/enterprise-smart-lock-protocol-selection` | Thin enterprise protocol page with limited deployment detail | Added protocol matrix, door classes, network/power ownership, integration readiness, and pilot scorecard. | None | 2026-09-17 |

## Cross-Agent Disagreement

- Onsite-growth review recommended deferring broad protocol/ecosystem and integration expansion until GSC retest.
- Main implementation keeps that recommendation for new pages and cluster expansion.
- Limited hardening was retained because it updates existing thin pages, adds concrete operational value, and does not touch protected SEO assets.

## Validation Needed

- Source consistency: MDX frontmatter, `lib/articles/registry.ts`, and generated `lib/articles/content.generated.ts` must match.
- Build validation: article generation, content consistency tests, template tests, lint, and production build.
- GSC validation: impressions, CTR, clicks, and average position on 2026-09-17.

## Retest Gate

Do not create additional protocol or integration pages until:

- Updated pages are indexed or recrawled.
- GSC shows durable query demand for the exact scenario.
- The planned page can add concrete examples, constraints, or tools beyond existing pages.
- Internal links can be narrowed by topic rather than relying only on global `Research Hubs`.
