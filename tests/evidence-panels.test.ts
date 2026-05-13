import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { calculatorEvidenceProfiles, priorityEvidenceCalculatorSlugs } from '../lib/seo/evidence'

const priorityPages = [
  'battery-life',
  'signal-strength',
  'installation-cost',
  'lock-tco',
  'compatibility',
] as const

const staleEvidencePhrases = [
  'Verified Feb 2026',
  'Calculator last updated: February 15, 2026',
  'Next review: August 2026',
]

function main() {
  assert.deepEqual(priorityEvidenceCalculatorSlugs, priorityPages, 'priority evidence slugs must match Batch 2 scope')

  for (const slug of priorityPages) {
    const profile = calculatorEvidenceProfiles[slug]
    assert.ok(profile, `${slug} must have an evidence profile`)
    assert.match(profile.lastVerified, /^\d{4}-\d{2}-\d{2}$/, `${slug} must use ISO lastVerified date`)
    assert.ok(profile.modelLimit.length >= 60, `${slug} must disclose a meaningful model limit`)
    assert.equal(profile.sourceNotes.length >= 3, true, `${slug} must list at least 3 source notes`)
    assert.equal(profile.reviewCadence.length >= 20, true, `${slug} must disclose review cadence`)

    const pagePath = `app/calculators/${slug}/page.tsx`
    const page = readFileSync(pagePath, 'utf8')
    assert.match(page, /EvidencePanel/, `${slug} page must render EvidencePanel`)
    assert.match(page, new RegExp(`calculatorEvidenceProfiles\\[['"]${slug}['"]\\]`), `${slug} page must use its evidence profile`)
    assert.match(page, /const evidenceProfile = calculatorEvidenceProfiles/, `${slug} page must bind its evidence profile once`)
  }

  const calculatorPagePaths = readdirSync('app/calculators', { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join('app/calculators', entry.name, 'page.tsx'))

  for (const pagePath of calculatorPagePaths) {
    const page = readFileSync(pagePath, 'utf8')
    for (const stalePhrase of staleEvidencePhrases) {
      assert.doesNotMatch(page, new RegExp(stalePhrase), `${pagePath} must not retain stale evidence phrase: ${stalePhrase}`)
    }
  }

  const securityArticle = readFileSync('app/_articles/security/smart-lock-security-complete-analysis.mdx', 'utf8')
  assert.match(securityArticle, /## Methodology And Scope/, 'security article must include methodology and scope')
  assert.match(securityArticle, /## Evidence Status And Change Log/, 'security article must include evidence status and change log')
  assert.match(securityArticle, /Last verified: 2026-05-13/, 'security article must disclose last verification date')
  assert.doesNotMatch(securityArticle, /full CVE database/i, 'security article must not overclaim a maintained full CVE database')
}

main()
