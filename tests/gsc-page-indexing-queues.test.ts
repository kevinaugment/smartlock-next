import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { generatePageIndexingQueues } from '../scripts/generate-gsc-page-indexing-queues.mjs'

function main() {
  const dir = mkdtempSync(join(tmpdir(), 'slockhub-gsc-details-'))
  const detailsDir = join(dir, 'details')
  const performanceCsv = join(dir, 'performance.csv')
  const output = join(dir, 'queues.md')

  writeFileSync(join(dir, 'placeholder'), '')
  writeFileSync(performanceCsv, [
    '排名靠前的网页,点击次数,展示,点击率,排名',
    'https://www.slockhub.com/compare/weiser-vs-schlage,2,120,1.67%,8.1',
    'https://www.slockhub.com/articles/resources/edge-vs-cloud-guide,0,20,0%,35',
  ].join('\n'))

  // Create after mkdtemp so the generator must read actual URL-level rows, not aggregate coverage counts.
  mkdirSync(detailsDir)
  writeFileSync(join(detailsDir, '已抓取 - 尚未编入索引.csv'), [
    'URL,Last crawled',
    'https://www.slockhub.com/compare/weiser-vs-schlage,2026-08-13',
    'https://www.slockhub.com/articles/resources/edge-vs-cloud-guide,2026-08-13',
  ].join('\n'))
  writeFileSync(join(detailsDir, '其他 4xx.csv'), [
    'URL,Reason',
    'https://www.slockhub.com/brands/wrong-brand/yale-assure-lock-2-plus,Other 4xx',
  ].join('\n'))

  const result = generatePageIndexingQueues({ detailsDir, performanceCsv, output })
  const report = readFileSync(output, 'utf8')

  assert.equal(result.rows.length, 3)
  assert.match(report, /Repair Queue: 4xx \/ 404/)
  assert.match(report, /repair-or-redirect; do not request indexing/)
  assert.match(report, /quality review: upgrade, merge, or noindex after inspection/)
  assert.match(report, /inspect canonical high-value compare; submit only if 200\/self-canonical/)
}

main()
