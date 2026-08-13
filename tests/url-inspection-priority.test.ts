import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { generateUrlInspectionPriority } from '../scripts/generate-url-inspection-priority.mjs'

function main() {
  const dir = mkdtempSync(join(tmpdir(), 'slockhub-url-inspection-'))
  const performanceCsv = join(dir, 'performance.csv')
  const output = join(dir, 'priority.md')

  writeFileSync(performanceCsv, [
    '排名靠前的网页,点击次数,展示,点击率,排名',
    'https://www.slockhub.com/compare/weiser-vs-schlage,2,120,1.67%,8.1',
    'https://www.slockhub.com/compare/schlage-vs-weiser,1,80,1.25%,9.2',
    'https://www.slockhub.com/compare/schlage-vs-veise,4,60,6.67%,6.1',
    'https://www.slockhub.com/compare/veise-vs-schlage,1,30,3.33%,8.7',
    'https://www.slockhub.com/articles/guides/door-compatibility-guide,0,90,0%,13',
    'https://www.slockhub.com/brands/samsung/samsung-shp-dp609,0,70,0%,14',
    'https://www.slockhub.com/articles/resources/edge-vs-cloud-guide,0,20,0%,35',
  ].join('\n'))

  const result = generateUrlInspectionPriority({ performanceCsv, output })
  const report = readFileSync(output, 'utf8')

  assert.equal(result.performanceRows.length, 7)
  assert.equal(result.compareRows.length, 2)
  assert.equal(result.compareRows[0].url, 'https://www.slockhub.com/compare/schlage-vs-weiser')
  assert.equal(result.compareRows[0].impressions, 200)
  assert.equal(result.compareRows[0].clicks, 3)
  assert.deepEqual(result.compareRows[0].variants, ['https://www.slockhub.com/compare/weiser-vs-schlage'])
  assert.equal(result.compareRows[1].url, 'https://www.slockhub.com/compare/veise-vs-schlage')
  assert.deepEqual(result.compareRows[1].variants, ['https://www.slockhub.com/compare/schlage-vs-veise'])
  assert.equal(result.productRows[0].url, 'https://www.slockhub.com/brands/samsung/samsung-shp-dp609')

  assert.match(report, /Batch 1: High-Value Canonical Compare Pages/)
  assert.match(report, /200 grouped impressions, 3 grouped clicks/)
  assert.match(report, /90 grouped impressions, 5 grouped clicks/)
  assert.match(report, /Batch 2: Non-Canonical Compare Consolidation Checks/)
  assert.match(report, /https:\/\/www\.slockhub\.com\/compare\/weiser-vs-schlage/)
  assert.match(report, /https:\/\/www\.slockhub\.com\/compare\/veise-vs-schlage/)
  assert.match(report, /Batch 5: Short Resource Quality Samples/)
  assert.match(report, /Do Not Submit In Bulk/)
}

main()
