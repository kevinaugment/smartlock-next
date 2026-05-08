import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { getArticleBySlug, getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { BeTechRecommendation } from '@/components/articles/BeTechRecommendation';
import { ReadingProgress } from '@/components/articles/ReadingProgress';
import { SeoPathways } from '@/components/seo/SeoPathways';
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture';
import TableOfContents from '@/components/TableOfContents';
import { Calculator } from 'lucide-react';
import { extractHeadings } from '@/lib/markdown';

const CALC_SLUG_MAP: Record<string, string> = {
  'diagnostic-tool': 'compatibility',
  'error-code-lookup': 'compatibility',
  'door-lock-compatibility-checker': 'compatibility',
  'protocol-selection-wizard': 'protocol-wizard',
  'bia-calculator': 'lock-tco',
  'rto-rpo-planner': 'emergency-backup',
  'failover-tester': 'offline-resilience',
  'rental-roi-calculator': 'str-roi',
  'turnover-time-estimator': 'installation-time',
  'integration-roi-calculator': 'hotel-roi',
  'api-compatibility-checker': 'compatibility',
  'offline-resilience-scorecard': 'offline-resilience',
  'privacy-impact-assessment': 'privacy-compliance',
  'data-retention-calculator': 'security-compliance',
  'log-analyzer': 'security-compliance',
  'anomaly-detector': 'cyber-risk',
};

const CALC_TITLES: Record<string, string> = {
  'lock-tco': 'TCO Calculator',
  'battery-life': 'Battery Life Calculator',
  'protocol-wizard': 'Protocol Selection Wizard',
  'signal-strength': 'Signal Strength Calculator',
  'str-roi': 'STR ROI Calculator',
  'installation-cost': 'Installation Cost Calculator',
  'compatibility': 'Compatibility Checker',
  'mesh-planner': 'Mesh Network Planner',
  'rf-coverage': 'RF Coverage Planner',
  'fleet-planner': 'Fleet Planner',
  'credential-planner': 'Credential Planner',
  'installation-time': 'Installation Time Estimator',
  'subscription-compare': 'Subscription Comparison',
  'offline-resilience': 'Offline Resilience Planner',
  'emergency-backup': 'Emergency Backup Planner',
  'access-capacity': 'Access Capacity Calculator',
  'security-compliance': 'Security Compliance Checker',
  'lock-compare': 'Lock Comparison Tool',
  'warranty-lifecycle': 'Warranty Lifecycle Planner',
  'network-bandwidth': 'Network Bandwidth Calculator',
  'poe-power': 'PoE Power Budget Calculator',
  'fire-compliance': 'Fire Code Compliance Checker',
  'guest-code': 'Guest Code Planner',
  'ble-range': 'BLE Range Calculator',
  'cyber-risk': 'Cyber Risk Calculator',
  'pin-strength': 'PIN Strength Analyzer',
  'door-fit': 'Door Fit Checker',
  'hotel-roi': 'Hotel ROI Calculator',
  'energy-cost': 'Energy Cost Calculator',
  'noise-level': 'Noise Level Calculator',
  'retrofit-advisor': 'Retrofit Advisor',
  'privacy-compliance': 'Privacy Compliance Checker',
};

function getRelatedTools(article: NonNullable<ReturnType<typeof getArticleBySlug>>): string[] {
  return (article.relatedTools || [])
    .map(tool => CALC_SLUG_MAP[tool] || tool)
    .filter((slug, i, arr) => arr.indexOf(slug) === i)
    .slice(0, 3);
}

function getDefaultTools(article: NonNullable<ReturnType<typeof getArticleBySlug>>): string[] {
  if (article.slug.includes('homekit') || article.category === 'protocols') return ['protocol-wizard', 'signal-strength', 'battery-life'];
  if (article.slug.includes('compatibility') || article.slug.includes('install')) return ['compatibility', 'installation-cost', 'door-fit'];
  if (article.category === 'security') return ['security-compliance', 'cyber-risk', 'pin-strength'];
  if (article.category === 'use-cases') return ['lock-tco', 'str-roi', 'credential-planner'];
  return ['compatibility', 'protocol-wizard', 'battery-life'];
}

function getAnswerChecklist(article: NonNullable<ReturnType<typeof getArticleBySlug>>): string[] {
  if (article.slug.includes('compatibility')) {
    return ['Measure door thickness, bore, backset, and lock type before buying.', 'Use the compatibility calculator before drilling or ordering hardware.', 'If the door is mortise, multi-point, metal, or unusually thick, verify model-specific fit.'];
  }
  if (article.slug.includes('homekit')) {
    return ['Confirm Apple Home, Matter, or Thread support before pairing.', 'Keep a HomePod, HomePod mini, or Apple TV online for remote control and automations.', 'If pairing fails, reset proximity, battery level, iOS version, and accessory code first.'];
  }
  if (article.category === 'protocols') {
    return ['Choose the protocol before choosing the lock model.', 'Check hub, range, battery, and ecosystem requirements together.', 'Use product-level protocol fields to avoid buying a lock that needs a bridge you do not own.'];
  }
  if (article.category === 'security') {
    return ['Start with local unlock reliability, credential hygiene, and auditability.', 'Prefer models with clear encryption, ANSI/UL evidence, and backup access.', 'Review guest-code and app-user permissions after every tenant, staff, or family change.'];
  }
  if (article.category === 'installation') {
    return ['Confirm measurements and tools before removing existing hardware.', 'Plan time and cost around drilling, strike-plate work, and hub placement.', 'Test lock/unlock, auto-lock, app status, and backup access before finishing.'];
  }
  return ['Use the article to identify the decision, then validate with a calculator or product page.', 'Check the related tools before buying or changing hardware.', 'Follow internal links to compare protocols, products, and installation tradeoffs.'];
}

function getPathwayTopic(article: NonNullable<ReturnType<typeof getArticleBySlug>>) {
  if (article.slug.includes('homekit')) return 'homekit';
  if (article.slug.includes('compatibility') || article.slug.includes('install')) return 'compatibility';
  if (article.category === 'protocols') return 'signal';
  return 'installation';
}

// 静态生成所有文章页面
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

// 动态生成SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article || article.category !== params.category) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const categoryInfo = CATEGORIES[article.category];
  const baseUrl = 'https://www.slockhub.com';
  const articleUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;

  return {
    title: `${article.title} | SLockHub.com`,
    description: article.description,
    keywords: article.keywords.join(', '),
    authors: [{ name: article.author || 'SLockHub.com' }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: 'SLockHub.com',
      type: 'article',
      publishedTime: article.pubDate,
      modifiedTime: article.updatedAt || article.pubDate,
      authors: [article.author || 'SLockHub.com'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  // 从注册表获取文章元数据
  const article = getArticleBySlug(params.slug);

  // 验证文章存在且分类匹配
  if (!article || article.category !== params.category) {
    notFound();
  }

  // 读取MDX文件内容
  let content = '';
  try {
    const filePath = path.join(
      process.cwd(),
      'app/_articles',
      article.category,
      `${article.slug}.mdx`
    );
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { content: mdxContent } = matter(fileContent);
    content = mdxContent;
  } catch (error) {
    console.error(`Error reading article file: ${article.slug}`, error);
    content = 'Error loading article content.';
  }

  // 获取相关文章 — 优先使用注册表的跨分类推荐，回退到同分类
  let relatedArticles = (article.relatedArticles || [])
    .map(slug => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => !!a)
    .slice(0, 3);

  if (relatedArticles.length < 3) {
    const sameCat = getArticlesByCategory(article.category)
      .filter(a => a.slug !== article.slug && !relatedArticles.find(r => r.slug === a.slug))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles = [...relatedArticles, ...sameCat];
  }

  const categoryInfo = CATEGORIES[article.category];
  const relatedTools = getRelatedTools(article);
  const aboveFoldTools = relatedTools.length > 0 ? relatedTools : getDefaultTools(article);
  const pathwayTopic = getPathwayTopic(article);
  const hasVisibleQuickAnswer = /^## Quick Answer/m.test(content);
  const answerChecklist = getAnswerChecklist(article);
  const showCompatibilityReport = article.slug === 'door-compatibility-guide';
  const headings = extractHeadings(content);

  return (
    <div className="page-bg">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.description,
              datePublished: article.pubDate,
              dateModified: article.updatedAt || article.pubDate,
              author: {
                '@type': 'Organization',
                name: 'SLockHub.com',
                url: 'https://www.slockhub.com',
              },
              publisher: {
                '@type': 'Organization',
                name: 'SLockHub.com',
                url: 'https://www.slockhub.com',
              },
              mainEntityOfPage: `https://www.slockhub.com/articles/${article.category}/${article.slug}`,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Articles', item: 'https://www.slockhub.com/articles' },
                { '@type': 'ListItem', position: 2, name: categoryInfo.name, item: `https://www.slockhub.com/articles/${article.category}` },
                { '@type': 'ListItem', position: 3, name: article.title },
              ],
            },
          ]),
        }}
      />
      <article className="container-main" style={{ padding: 'var(--space-xl) var(--space-md)', maxWidth: '72rem', margin: '0 auto' }}>
        <TableOfContents headings={headings} variant="mobile" />
        {/* 面包屑导航 */}
        <nav className="breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link href="/articles" className="">
            Articles
          </Link>
          <span className="breadcrumb__separator">›</span>
          <Link href={`/articles/${article.category}`} className="">
            {categoryInfo.name}
          </Link>
          <span className="breadcrumb__separator">›</span>
          <span className="breadcrumb__current">{article.title}</span>
        </nav>

        {/* 文章头部 */}
        <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <ArticleHeader article={article} />
        </div>

        <section className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 className="section-title">{hasVisibleQuickAnswer ? 'Answer Summary' : 'Quick Answer'}</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-lg)' }}>
            {article.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {answerChecklist.map((item) => (
              <div key={item} className="card" style={{ background: 'var(--color-bg-alt)' }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 className="section-title">Reviewed Guidance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TrustStat label="Updated" value={article.updatedAt || article.pubDate} detail="Used for freshness-sensitive lock, protocol, and setup guidance." />
            <TrustStat label="Coverage" value={`${article.wordCount.toLocaleString()} words`} detail={`${article.readingTime} min read with ${article.isPillar ? 'pillar' : 'support'} article depth.`} />
            <TrustStat label="Source Basis" value="SLockHub dataset" detail="Links route to calculators, protocol guides, and product data where relevant." />
          </div>
        </section>

        {aboveFoldTools.length > 0 && (
          <RelatedToolsPanel tools={aboveFoldTools} />
        )}

        {showCompatibilityReport && (
          <ReportLeadCapture
            reportType="door-compatibility-audit"
            title="Door Compatibility Audit PDF"
            description="Turn the measurements and retrofit checks from this guide into a shareable PDF before ordering hardware or asking for install quotes."
            sourcePath={`/articles/${article.category}/${article.slug}`}
            context={{
              article: article.slug,
              category: article.category,
              focus: 'door compatibility buying checklist',
            }}
            bullets={[
              'Extends the highest-exposure compatibility article into a downloadable planning asset.',
              'Useful for sharing door measurements with installers, landlords, or property stakeholders.',
              'Bridges directly into the compatibility and installation-cost calculators.',
            ]}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_17rem] gap-8 items-start">
          <div>
            {/* 文章内容 */}
            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <ArticleContent content={content} />
            </div>
          </div>
          <div>
            <TableOfContents headings={headings} variant="desktop" />
          </div>
        </div>

        {/* Be-Tech 品牌推荐 */}
        <BeTechRecommendation />

        <SeoPathways topic={pathwayTopic} title="Continue Your Smart Lock Research" />

        {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-3xl)', borderTop: '1px solid var(--color-border)' }}>
            <h2 className="section-title">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.category}/${related.slug}`}
                  className="link-card"
                >
                  <h3 className="link-card__title line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="link-card__desc line-clamp-3">
                    {related.description}
                  </p>
                  <div style={{ marginTop: 'var(--space-md)', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Read more →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 返回链接 */}
        <div style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--color-border)' }}>
          <Link href={`/articles/${article.category}`} className="back-link">
            ← Back to {categoryInfo.name}
          </Link>
        </div>
      </article>
    </div>
  );
}

function TrustStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="card" style={{ background: 'var(--color-bg-alt)' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{detail}</div>
    </div>
  );
}

function RelatedToolsPanel({ tools }: { tools: string[] }) {
  return (
    <section className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Calculator className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
        Tools to Validate This Decision
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((slug) => (
          <Link key={slug} href={`/calculators/${slug}`} className="link-card">
            <h3 className="link-card__title">{CALC_TITLES[slug] || slug}</h3>
            <p className="link-card__desc">Use this before buying, drilling, pairing, or changing access settings.</p>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500, marginTop: 'var(--space-sm)' }}>
              Open tool →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
