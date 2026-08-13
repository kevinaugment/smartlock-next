import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { auditStaticIndexing } from '../scripts/audit-static-indexing.mjs'

function writeHtml(dist: string, path: string, body: string) {
  const filePath = join(dist, path)
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, body)
}

function main() {
  const dir = mkdtempSync(join(tmpdir(), 'slockhub-static-indexing-'))
  const dist = join(dir, 'out')
  const output = join(dir, 'static-indexing.md')

  writeHtml(dist, 'index.html', '<a href="/about">About</a><a href="/compare/a-vs-b">Compare</a>')
  writeHtml(dist, 'about/index.html', '<a href="/index.html">Home</a>')
  writeHtml(dist, 'compare/a-vs-b/index.html', '<a href="/">Home</a>')
  writeHtml(dist, 'articles/resources/foo/index.html', '<a href="/about/index.html">About</a>')
  writeFileSync(join(dist, 'sitemap.xml'), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '<url><loc>https://www.slockhub.com</loc></url>',
    '<url><loc>https://www.slockhub.com/about</loc></url>',
    '<url><loc>https://www.slockhub.com/compare/a-vs-b</loc></url>',
    '<url><loc>https://www.slockhub.com/articles/resources/foo</loc></url>',
    '</urlset>',
  ].join('\n'))

  const result = auditStaticIndexing({ dist, output })
  const report = readFileSync(output, 'utf8')
  const rowByUrl = new Map(result.rows.map((row) => [row.url, row]))

  assert.equal(result.rows.length, 4)
  assert.equal(result.sitemapUrls.length, 4)
  assert.equal(result.broken.length, 0)
  assert.equal(rowByUrl.get('https://www.slockhub.com/')?.inSitemap, true)
  assert.equal(rowByUrl.get('https://www.slockhub.com/about')?.inbound, 2)
  assert.equal(rowByUrl.get('https://www.slockhub.com/compare/a-vs-b')?.type, 'compare')
  assert.equal(rowByUrl.get('https://www.slockhub.com/articles/resources/foo')?.type, 'short-resource')
  assert.match(report, /Sitemap URLs missing HTML file: 0/)
  assert.match(report, /Internal links to missing local HTML files: 0/)
}

main()
