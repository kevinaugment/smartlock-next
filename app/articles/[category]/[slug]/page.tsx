import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug, getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { getArticleContent } from '@/lib/articles/content';
import { CATEGORIES } from '@/lib/articles/types';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { BeTechRecommendation } from '@/components/articles/BeTechRecommendation';
import { ReadingProgress } from '@/components/articles/ReadingProgress';
import { SeoPathways } from '@/components/seo/SeoPathways';
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture';
import TableOfContents from '@/components/TableOfContents';
import { extractHeadings } from '@/lib/markdown';
import { calculatorTitles, resolveCalculatorRouteSlug } from '@/lib/calculators/slugs';

function getPathwayTopic(article: NonNullable<ReturnType<typeof getArticleBySlug>>) {
  if (article.slug.includes('homekit')) return 'homekit';
  if (article.slug.includes('compatibility') || article.slug.includes('install')) return 'compatibility';
  if (article.category === 'protocols') return 'signal';
  return 'installation';
}

const DEFAULT_RELATED_TOOLS_BY_CATEGORY: Record<string, string[]> = {
  guides: ['compatibility', 'protocol-wizard', 'battery-life'],
  installation: ['installation-cost', 'door-fit', 'installation-time'],
  protocols: ['protocol-wizard', 'signal-strength', 'mesh-planner'],
  security: ['security-compliance', 'pin-strength', 'cyber-risk'],
  integration: ['protocol-wizard', 'network-bandwidth', 'offline-resilience'],
  'use-cases': ['lock-tco', 'str-roi', 'credential-planner'],
  resources: ['lock-compare', 'compatibility', 'installation-cost'],
};

function getDefaultRelatedToolSlugs(article: NonNullable<ReturnType<typeof getArticleBySlug>>): string[] {
  if (article.slug.includes('battery')) return ['battery-life', 'signal-strength', 'lock-tco'];
  if (article.slug.includes('wifi') || article.slug.includes('zigbee') || article.slug.includes('z-wave') || article.slug.includes('thread') || article.slug.includes('matter')) {
    return ['protocol-wizard', 'signal-strength', 'mesh-planner'];
  }
  if (article.slug.includes('rental') || article.slug.includes('airbnb') || article.slug.includes('hotel')) {
    return ['str-roi', 'guest-code', 'lock-tco'];
  }
  if (article.slug.includes('privacy') || article.slug.includes('compliance')) {
    return ['privacy-compliance', 'security-compliance', 'cyber-risk'];
  }
  if (article.slug.includes('install') || article.slug.includes('door') || article.slug.includes('retrofit')) {
    return ['compatibility', 'door-fit', 'installation-cost'];
  }
  return DEFAULT_RELATED_TOOLS_BY_CATEGORY[article.category] || DEFAULT_RELATED_TOOLS_BY_CATEGORY.guides;
}

function getArticleStructuredData(article: NonNullable<ReturnType<typeof getArticleBySlug>>, categoryName: string) {
  const articleUrl = `https://www.slockhub.com/articles/${article.category}/${article.slug}`;
  const baseSchemas = [
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
      mainEntityOfPage: articleUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Articles', item: 'https://www.slockhub.com/articles' },
        { '@type': 'ListItem', position: 2, name: categoryName, item: `https://www.slockhub.com/articles/${article.category}` },
        { '@type': 'ListItem', position: 3, name: article.title },
      ],
    },
  ];

  if (article.slug !== 'zigbee-vs-zwave-comparison') {
    return baseSchemas;
  }

  return [
    ...baseSchemas,
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Zigbee or Z-Wave better for smart locks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Z-Wave is usually better when range, wall penetration, and reduced interference matter most. Zigbee is better when you already have a strong Zigbee hub and powered Zigbee router devices in the home.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do Zigbee smart locks need a hub?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Zigbee smart locks need a compatible Zigbee coordinator or hub, such as SmartThings, Hubitat, Home Assistant with a Zigbee adapter, or supported Echo devices with built-in Zigbee.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do Z-Wave smart locks work without Wi-Fi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Z-Wave locks communicate with a Z-Wave hub over sub-GHz radio, not directly over Wi-Fi. Remote app control may still require the hub and internet connection, but local lock-to-hub communication does not depend on Wi-Fi.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which has better battery life, Zigbee or Z-Wave?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Battery life is usually similar. Both protocols let battery-powered locks sleep most of the time, so real-world battery life depends more on lock model, signal quality, usage frequency, and cold weather than on Zigbee versus Z-Wave alone.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which protocol is better for apartments?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Z-Wave is often better for apartments because sub-GHz radio usually handles walls and crowded 2.4 GHz environments better. Zigbee can still work well if the unit already has a strong Zigbee mesh and the hub is close to the lock.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Zigbee and Z-Wave locks work together?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but they need a controller that supports both protocols or separate hubs connected through the same automation platform. Multi-protocol platforms such as SmartThings, Hubitat, and Home Assistant can often manage both.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Z-Wave better than Zigbee for thick walls?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Usually yes. Z-Wave uses lower-frequency radio than Zigbee, so it often performs better through brick, concrete, and multi-floor layouts. Always verify with a signal or RF coverage check before scaling to many locks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should property managers choose Zigbee or Z-Wave?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Property managers should usually start with Z-Wave for lock-first deployments where range, hub automation, and repeatable troubleshooting matter. Choose Zigbee if the portfolio is already standardized on Zigbee hubs and powered Zigbee routers.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Table',
      name: 'Zigbee vs Z-Wave smart lock comparison table',
      description: 'Comparison of Zigbee and Z-Wave smart locks by frequency, range, wall penetration, battery life, hub requirements, interference risk, ecosystem, and best deployment fit.',
      about: ['Zigbee smart locks', 'Z-Wave smart locks', 'smart lock protocols'],
      mainEntityOfPage: articleUrl,
    },
  ];
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

  const content = getArticleContent(article.category, article.slug);

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
  const pathwayTopic = getPathwayTopic(article);
  const showCompatibilityReport = article.slug === 'door-compatibility-guide';
  const relatedToolSlugs = [...(article.relatedTools || []), ...getDefaultRelatedToolSlugs(article)];
  const relatedTools = relatedToolSlugs
    .map((toolSlug) => {
      const routeSlug = resolveCalculatorRouteSlug(toolSlug);
      if (!routeSlug) return null;
      return {
        href: `/calculators/${routeSlug}`,
        title: calculatorTitles[routeSlug],
      };
    })
    .filter((tool): tool is { href: string; title: string } => Boolean(tool))
    .filter((tool, index, tools) => tools.findIndex((candidate) => candidate.href === tool.href) === index)
    .slice(0, 5);
  const headings = extractHeadings(content);
  const structuredData = getArticleStructuredData(article, categoryInfo.name);

  return (
    <div className="page-bg">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="container-main" style={{ padding: 'var(--space-xl) var(--space-md)', maxWidth: '72rem', margin: '0 auto' }}>
        <TableOfContents headings={headings} variant="mobile" />
        {/* 面包屑导航 */}
        <nav className="breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link href="/articles" className="" prefetch={false}>
            Articles
          </Link>
          <span className="breadcrumb__separator">›</span>
          <Link href={`/articles/${article.category}`} className="" prefetch={false}>
            {categoryInfo.name}
          </Link>
          <span className="breadcrumb__separator">›</span>
          <span className="breadcrumb__current">{article.title}</span>
        </nav>

        {/* 文章头部 */}
        <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <ArticleHeader article={article} />
        </div>

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

        <SeoPathways topic={pathwayTopic} title="Next Tools and Guides" />

        {relatedTools.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="section-title">Tools for This Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="link-card" prefetch={false}>
                  <h3 className="link-card__title">{tool.title}</h3>
                  <p className="link-card__desc">Use this calculator or checker to turn the guide into a practical decision.</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-3xl)', borderTop: '1px solid var(--color-border)' }}>
            <h2 className="section-title">
              Best Articles to Read Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.category}/${related.slug}`}
                  className="link-card"
                  prefetch={false}
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
          <Link href={`/articles/${article.category}`} className="back-link" prefetch={false}>
            ← Back to {categoryInfo.name}
          </Link>
        </div>
      </article>
    </div>
  );
}
