import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getAllArticles, getArticleBySlug } from '../lib/articles/registry'
import { getArticleContent } from '../lib/articles/content'
import { CATEGORIES } from '../lib/articles/types'
import { calculatorLinksMap } from '../lib/calculators/calculator-links'
import { calculatorRouteSlugs, resolveCalculatorDataSlug, resolveCalculatorRouteSlug } from '../lib/calculators/slugs'

const seoExpansionSlugs = [
  'best-smart-locks-for-airbnb-hosts',
  'airbnb-smart-lock-integration-schlage-yale-august',
  'apple-home-key-smart-locks-guide',
  'matter-vs-homekit-vs-zwave-smart-locks',
  'best-z-wave-smart-locks-hubs-apartments',
  'z-wave-vs-matter-smart-locks',
  'matter-over-thread-smart-locks',
  'thread-vs-zigbee-smart-locks',
  'wifi-vs-zigbee-smart-locks',
  'wifi-vs-z-wave-smart-locks',
  'wifi-smart-lock-battery-drain',
  'bluetooth-vs-wifi-smart-locks',
  'best-smart-lock-protocol-rental-properties',
  'zigbee-smart-locks-home-assistant',
  'smart-lock-mesh-network-planning',
  'enterprise-smart-lock-protocol-selection',
  'schlage-vs-yale-smart-locks',
  'kwikset-vs-defiant-smart-locks',
  'renter-friendly-smart-locks-no-drill-apartments',
  'nyc-short-term-rental-smart-lock-rules',
  'california-vacation-rental-smart-lock-compliance',
  'multifamily-smart-locks-resident-staff-access',
  'hotel-smart-lock-roi-mobile-keys-vs-keycards',
  'smart-lock-insurance-liability-landlords-airbnb',
  'aliro-smart-locks-explained',
  'smart-lock-battery-life-by-brand',
  'rental-property-smart-locks',
  'smart-lock-compliance-hub',
  'connect-lock-to-homekit',
  'smart-lock-protocols-overview',
  'zigbee-vs-zwave-comparison',
]

function articlePath(category: string, slug: string): string {
  return path.join('app', '_articles', category, `${slug}.mdx`)
}

function readFrontmatter(category: string, slug: string): Record<string, unknown> {
  const filePath = articlePath(category, slug)
  assert.equal(existsSync(filePath), true, `${slug} must have an MDX file at ${filePath}`)
  return matter(readFileSync(filePath, 'utf8')).data
}

function getSeededCalculatorSlugs(): Set<string> {
  const seedSources = [
    readFileSync(path.join('database', 'seed.sql'), 'utf8'),
    readFileSync(path.join('database', 'd1-import-ordered.sql'), 'utf8'),
  ]
  const calculatorInsertStatements = seedSources.flatMap((source) =>
    Array.from(source.matchAll(/INSERT INTO (?:"calculators"|calculators)[\s\S]*?;/g)).map((match) => match[0])
  )

  return new Set(
    calculatorInsertStatements.flatMap((statement) =>
      Array.from(statement.matchAll(/\(\s*(?:\d+,\s*)?'[^']+',\s*'([^']+)'/g)).map((match) => match[1])
    )
  )
}

function main() {
  const articles = getAllArticles()
  const registrySlugs = new Set(articles.map((article) => article.slug))
  const seededCalculatorSlugs = getSeededCalculatorSlugs()
  const calculatorSlugs = new Set(
    readdirSync(path.join('app', 'calculators')).filter((slug) =>
      existsSync(path.join('app', 'calculators', slug, 'page.tsx'))
    )
  )
  const expectedCalculatorSlugs = new Set<string>(calculatorRouteSlugs)

  assert.equal(calculatorSlugs.size, expectedCalculatorSlugs.size, 'calculator route count must match shared slug registry')
  for (const slug of calculatorSlugs) {
    assert.equal(expectedCalculatorSlugs.has(slug), true, `${slug} calculator route must exist in shared slug registry`)
  }
  for (const slug of expectedCalculatorSlugs) {
    assert.equal(calculatorSlugs.has(slug), true, `${slug} shared slug registry entry must have a calculator page`)
  }

  for (const slug of seoExpansionSlugs) {
    const article = getArticleBySlug(slug)
    assert.ok(article, `${slug} must be registered`)

    const frontmatter = readFrontmatter(article.category, article.slug)
    assert.equal(frontmatter.title, article.title, `${slug} frontmatter title must match registry`)
    assert.equal(frontmatter.description, article.description, `${slug} frontmatter description must match registry`)
    assert.equal(frontmatter.category, article.category, `${slug} frontmatter category must match registry`)

    const body = getArticleContent(article.category, article.slug)
    assert.notEqual(body.trim(), '', `${slug} generated article body must be non-empty`)

  }

  for (const article of articles) {
    for (const relatedSlug of article.relatedArticles || []) {
      assert.equal(registrySlugs.has(relatedSlug), true, `${article.slug} related article ${relatedSlug} must exist`)
    }

    for (const toolSlug of article.relatedTools || []) {
      const calculatorSlug = resolveCalculatorRouteSlug(toolSlug)
      assert.ok(calculatorSlug, `${article.slug} related tool ${toolSlug} must resolve to a calculator route slug`)
      assert.equal(calculatorSlugs.has(calculatorSlug), true, `${article.slug} related tool ${toolSlug} must resolve to an existing calculator`)
    }
  }

  for (const [category, info] of Object.entries(CATEGORIES)) {
    const actual = articles.filter((article) => article.category === category).length
    assert.equal(info.count, actual, `${category} category count must match registry`)
  }

  for (const [calculatorSlug, links] of Object.entries(calculatorLinksMap)) {
    assert.equal(
      existsSync(path.join('app', 'calculators', calculatorSlug, 'page.tsx')),
      true,
      `${calculatorSlug} calculator page must exist`
    )

    for (const articleLink of links.articles) {
      const article = getArticleBySlug(articleLink.slug)
      assert.ok(article, `${calculatorSlug} linked article ${articleLink.slug} must exist`)
      assert.equal(
        article.category,
        articleLink.category,
        `${calculatorSlug} linked article ${articleLink.slug} category must match registry`
      )
    }

    for (const relatedCalculator of links.calculators) {
      assert.equal(
        existsSync(path.join('app', 'calculators', relatedCalculator.slug, 'page.tsx')),
        true,
        `${calculatorSlug} related calculator ${relatedCalculator.slug} must exist`
      )
    }
  }

  for (const calculatorSlug of calculatorSlugs) {
    const pagePath = path.join('app', 'calculators', calculatorSlug, 'page.tsx')
    const source = readFileSync(pagePath, 'utf8')
    assert.match(source, /<CalculatorAnswerBlock\b/, `${calculatorSlug} must render supporting answer content`)
    assert.match(source, /<CalculatorFaqBlock\s+faqs=\{faqs\}/, `${calculatorSlug} must render visible FAQ content`)

    const faqStart = source.indexOf('const faqs = [')
    assert.notEqual(faqStart, -1, `${calculatorSlug} must define visible FAQs`)
    const faqEnd = source.indexOf('\n  ]', faqStart)
    const faqSource = source.slice(faqStart, faqEnd > faqStart ? faqEnd : undefined)
    const questions = Array.from(faqSource.matchAll(/question:\s*['`]([^'`]+)['`]/g)).map((match) => match[1])
    assert.equal(questions.length, 5, `${calculatorSlug} must define exactly 5 FAQ questions`)
    assert.equal(new Set(questions).size, questions.length, `${calculatorSlug} FAQ questions must be unique`)

    const relatedResourceSlugs = Array.from(source.matchAll(/<RelatedResources\s+calculatorSlug="([^"]+)"/g)).map((match) => match[1])
    assert.equal(relatedResourceSlugs.length, 1, `${calculatorSlug} must render exactly one RelatedResources block`)
    for (const relatedResourceSlug of relatedResourceSlugs) {
      assert.ok(
        resolveCalculatorRouteSlug(relatedResourceSlug),
        `${calculatorSlug} RelatedResources slug ${relatedResourceSlug} must resolve to a canonical route slug`
      )
      const dataSlug = resolveCalculatorDataSlug(relatedResourceSlug)
      if (dataSlug) {
        assert.notEqual(dataSlug.trim(), '', `${calculatorSlug} RelatedResources data slug must be non-empty`)
        assert.equal(
          seededCalculatorSlugs.has(dataSlug),
          true,
          `${calculatorSlug} RelatedResources data slug ${dataSlug} must exist in calculator seeds`
        )
      }
    }
  }

  const mdxSlugs = new Set<string>()
  for (const category of readdirSync(path.join('app', '_articles'))) {
    for (const file of readdirSync(path.join('app', '_articles', category))) {
      if (!file.endsWith('.mdx')) continue

      const slug = file.replace(/\.mdx$/, '')
      mdxSlugs.add(slug)

      const frontmatter = readFrontmatter(category, slug)
      for (const relatedSlug of (frontmatter.relatedArticles as string[] | undefined) || []) {
        assert.equal(registrySlugs.has(relatedSlug), true, `${slug} MDX related article ${relatedSlug} must exist`)
      }
    }
  }

  assert.equal(mdxSlugs.size, articles.length, 'MDX article count must match registry count')
  for (const slug of mdxSlugs) {
    assert.equal(registrySlugs.has(slug), true, `${slug} MDX file must have a registry entry`)
  }
}

main()
