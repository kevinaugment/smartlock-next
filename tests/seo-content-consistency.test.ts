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

function extractMarkdownLinks(source: string): string[] {
  const links = new Set<string>()
  const markdownLinkPattern = /(?<!!)\[[^\]]+\]\(([^)\s#]+)(?:#[^)\s]+)?\)/g
  for (const match of source.matchAll(markdownLinkPattern)) {
    links.add(match[1])
  }
  return Array.from(links)
}

function normalizeInternalPath(href: string): string | null {
  if (!href.startsWith('/')) return null
  if (href.startsWith('//')) return null
  return href.split(/[?#]/)[0].replace(/\/$/, '') || '/'
}

function parseLegacyFrontmatterValue(raw: string): string | string[] {
  const value = raw.trim()
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  return value.replace(/^['"]|['"]$/g, '')
}

function parseLegacyResourceArticles(): Array<Record<string, string | string[]>> {
  const legacyDir = path.join('content', 'resources')
  const entries: Array<Record<string, string | string[]>> = []

  for (const file of readdirSync(legacyDir).filter((name) => name.endsWith('.md'))) {
    const lines = readFileSync(path.join(legacyDir, file), 'utf8').split(/\r?\n/)
    let index = 0

    while (index < lines.length) {
      while (index < lines.length && !(lines[index] === '---' && /^title:/.test(lines[index + 1] || ''))) {
        index += 1
      }
      if (index >= lines.length) break

      const frontmatterStart = index + 1
      let frontmatterEnd = frontmatterStart
      while (frontmatterEnd < lines.length && lines[frontmatterEnd] !== '---') {
        frontmatterEnd += 1
      }

      const data: Record<string, string | string[]> = {}
      for (const line of lines.slice(frontmatterStart, frontmatterEnd)) {
        const separator = line.indexOf(':')
        if (separator === -1) continue
        data[line.slice(0, separator).trim()] = parseLegacyFrontmatterValue(line.slice(separator + 1))
      }
      entries.push(data)
      index = frontmatterEnd + 1
    }
  }

  return entries
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
  const articlePathKeys = new Set(articles.map((article) => `/articles/${article.category}/${article.slug}`))
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

  for (const legacyArticle of parseLegacyResourceArticles()) {
    const slug = legacyArticle.slug as string
    const article = getArticleBySlug(slug)
    assert.ok(article, `legacy resource article ${slug} must be registered`)
    assert.equal(article?.category, 'resources', `legacy resource article ${slug} must stay in resources`)
    assert.equal(
      existsSync(articlePath('resources', slug)),
      true,
      `legacy resource article ${slug} must have an MDX file`
    )
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
      const source = readFileSync(articlePath(category, slug), 'utf8')

      for (const href of extractMarkdownLinks(source)) {
        const internalPath = normalizeInternalPath(href)
        if (!internalPath) continue

        if (internalPath.startsWith('/articles/')) {
          assert.equal(
            articlePathKeys.has(internalPath) || Object.keys(CATEGORIES).some((categoryKey) => internalPath === `/articles/${categoryKey}`),
            true,
            `${slug} links to missing article route ${internalPath}`
          )
        }

        if (internalPath.startsWith('/calculators/')) {
          const calculatorSlug = internalPath.replace('/calculators/', '')
          assert.equal(calculatorSlugs.has(calculatorSlug), true, `${slug} links to missing calculator route ${internalPath}`)
        }
      }

      for (const relatedSlug of (frontmatter.relatedArticles as string[] | undefined) || []) {
        assert.equal(registrySlugs.has(relatedSlug), true, `${slug} MDX related article ${relatedSlug} must exist`)
      }
    }
  }

  const headerSource = readFileSync(path.join('components', 'Header.tsx'), 'utf8')
  const cssSource = readFileSync(path.join('app', 'globals.css'), 'utf8')
  assert.match(headerSource, /data-menu-open=/, 'Header desktop mega menu must expose explicit open state to CSS')
  assert.doesNotMatch(cssSource, /\.mega-nav__item:hover\s+\.mega-menu/, 'Mega menu visibility must not be controlled by hover-only CSS')

  assert.equal(mdxSlugs.size, articles.length, 'MDX article count must match registry count')
  for (const slug of mdxSlugs) {
    assert.equal(registrySlugs.has(slug), true, `${slug} MDX file must have a registry entry`)
  }
}

main()
