import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { generatePageIndexingQueues } from '../scripts/generate-gsc-page-indexing-queues.mjs'

function main() {
  const dir = mkdtempSync(join(tmpdir(), 'slockhub-gsc-details-'))
  const detailsDir = join(dir, 'details')
  const aggregateOnlyDir = join(dir, 'aggregate')
  const missingDetailsDir = join(dir, 'missing-details')
  const performanceCsv = join(dir, 'performance.csv')
  const output = join(dir, 'queues.md')
  const aggregateOutput = join(dir, 'aggregate-queues.md')
  const missingOutput = join(dir, 'missing-queues.md')

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
  assert.equal(result.status.state, 'ok')
  assert.match(report, /Repair Queue: 4xx \/ 404/)
  assert.match(report, /Evidence Status/)
  assert.match(report, /repair-or-redirect; do not request indexing/)
  assert.match(report, /quality review: upgrade, merge, or noindex after inspection/)
  assert.match(report, /inspect canonical high-value compare; submit only if 200\/self-canonical/)

  mkdirSync(aggregateOnlyDir)
  writeFileSync(join(aggregateOnlyDir, '严重问题.csv'), [
    '原因,来源,验证,网页',
    '已抓取 - 尚未编入索引,Google 系统,未开始,274',
  ].join('\n'))
  writeFileSync(join(aggregateOnlyDir, '图表.csv'), [
    '日期,未编入索引,已编入索引,展示',
    '2026-08-07,730,1203,0',
  ].join('\n'))

  const aggregateResult = generatePageIndexingQueues({ detailsDir: aggregateOnlyDir, performanceCsv, output: aggregateOutput })
  const aggregateReport = readFileSync(aggregateOutput, 'utf8')
  assert.equal(aggregateResult.rows.length, 0)
  assert.equal(aggregateResult.status.state, 'aggregate-only')
  assert.match(aggregateReport, /Only aggregate Coverage CSV files were found/)
  assert.match(aggregateReport, /Aggregate-only files ignored/)
  assert.match(aggregateReport, /Action required: export URL-level rows/)

  const missingResult = generatePageIndexingQueues({ detailsDir: missingDetailsDir, performanceCsv, output: missingOutput })
  const missingReport = readFileSync(missingOutput, 'utf8')
  assert.equal(missingResult.rows.length, 0)
  assert.equal(missingResult.status.state, 'missing-directory')
  assert.match(missingReport, /The Page Indexing URL detail directory does not exist yet/)
  assert.match(missingReport, /Action required: export URL-level rows/)
}

main()
