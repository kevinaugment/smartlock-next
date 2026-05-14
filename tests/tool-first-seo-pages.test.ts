import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const coreToolPages = [
  'battery-life',
  'compatibility',
  'protocol-wizard',
  'signal-strength',
  'lock-tco',
] as const

function main() {
  for (const slug of coreToolPages) {
    const page = readFileSync(`app/calculators/${slug}/page.tsx`, 'utf8')
    assert.match(page, /<CalculatorAnswerBlock\b/, `${slug} must answer the search intent above supporting copy`)
    assert.match(page, /<CalculatorSeoBlock\b/, `${slug} must disclose calculation logic, assumptions, sources, and next checks`)
    assert.match(page, /<EvidencePanel\b/, `${slug} must render an evidence panel`)
    assert.match(page, /<CalculatorFaqBlock\s+faqs=\{faqs\}/, `${slug} must render visible FAQ content`)
    assert.match(page, /<ToolRating\b/, `${slug} must keep tool engagement feedback`)
    assert.match(page, /formula=\{\{/, `${slug} must pass a formula or decision model`)
    assert.match(page, /assumptions=\{\[/, `${slug} must pass assumptions`)
    assert.match(page, /sources=\{\[/, `${slug} must pass source notes`)
    assert.match(page, /links=\{\[/, `${slug} must pass next-step tool links`)
  }
}

main()
