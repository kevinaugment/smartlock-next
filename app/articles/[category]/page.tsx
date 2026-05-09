import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';

const CATEGORY_TOOLS: Record<string, Array<{ href: string; title: string; description: string }>> = {
  guides: [
    { href: '/calculators/compatibility', title: 'Door Compatibility Checker', description: 'Start here before choosing a lock or guide.' },
    { href: '/calculators/protocol-wizard', title: 'Protocol Wizard', description: 'Choose Wi-Fi, Matter, Thread, Z-Wave, Zigbee, or Bluetooth.' },
    { href: '/calculators/battery-life', title: 'Battery Life Calculator', description: 'Estimate maintenance before installing.' },
  ],
  installation: [
    { href: '/calculators/installation-cost', title: 'Installation Cost Calculator', description: 'Estimate hardware, labor, and drilling costs.' },
    { href: '/calculators/door-fit', title: 'Door Fit Checker', description: 'Validate measurements and lock type.' },
    { href: '/calculators/installation-time', title: 'Installation Time Estimator', description: 'Plan DIY or locksmith time.' },
  ],
  protocols: [
    { href: '/calculators/protocol-wizard', title: 'Protocol Wizard', description: 'Compare hub, range, and ecosystem requirements.' },
    { href: '/calculators/signal-strength', title: 'Signal Strength Calculator', description: 'Estimate wall and distance effects.' },
    { href: '/best/matter-smart-locks', title: 'Best Matter Smart Locks', description: 'Move from protocol research to product picks.' },
  ],
  security: [
    { href: '/calculators/security-compliance', title: 'Security Compliance Checker', description: 'Check security controls and auditability.' },
    { href: '/calculators/pin-strength', title: 'PIN Strength Analyzer', description: 'Test code strength and reuse risk.' },
    { href: '/calculators/cyber-risk', title: 'Cyber Risk Calculator', description: 'Score app, cloud, and credential exposure.' },
  ],
  integration: [
    { href: '/calculators/protocol-wizard', title: 'Protocol Wizard', description: 'Match platforms before pairing.' },
    { href: '/calculators/network-bandwidth', title: 'Network Bandwidth Calculator', description: 'Plan Wi-Fi and IoT network load.' },
    { href: '/best/homekit-smart-locks', title: 'Best HomeKit Smart Locks', description: 'Compare Apple-friendly lock options.' },
  ],
  'use-cases': [
    { href: '/calculators/lock-tco', title: 'TCO Calculator', description: 'Compare hardware, batteries, labor, and subscriptions.' },
    { href: '/calculators/str-roi', title: 'STR ROI Calculator', description: 'Model short-term rental access ROI.' },
    { href: '/calculators/credential-planner', title: 'Credential Planner', description: 'Plan PINs, fingerprints, cards, and app users.' },
  ],
  resources: [
    { href: '/resources/glossary', title: 'Smart Lock Glossary', description: 'Decode specs, acronyms, and lock terms.' },
    { href: '/resources/reference-tables', title: 'Reference Tables', description: 'Use specs and standards while comparing.' },
    { href: '/calculators/lock-compare', title: 'Lock Comparison Tool', description: 'Turn reference research into a shortlist.' },
  ],
};

function getCategoryVerdict(categorySlug: string, count: number): string {
  const verdicts: Record<string, string> = {
    guides: 'Use this hub when you need a practical answer before buying, installing, pairing, or troubleshooting a smart lock.',
    installation: 'Start here when the risk is physical fit, drilling, strike alignment, installation time, or locksmith cost.',
    protocols: 'Use this hub to choose between Matter, Thread, Wi-Fi, Z-Wave, Zigbee, Bluetooth, and platform-specific setup paths.',
    security: 'Use this hub to evaluate credential hygiene, encryption, audit trails, compliance, and backup access risk.',
    integration: 'Start here when a lock must work with Apple Home, Google Home, Alexa, SmartThings, APIs, or broader automation.',
    'use-cases': 'Use this hub to map smart locks to rentals, hotels, commercial doors, families, and operating-cost decisions.',
    resources: 'Use this hub for reference material, glossary terms, standards, and comparison tables that support deeper decisions.',
  };
  return `${verdicts[categorySlug] || 'Use this hub to find the right article path.'} ${count} article${count === 1 ? '' : 's'} are currently published in this category.`;
}

// 静态生成所有分类页面
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

// 动态生成分类页 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryInfo = CATEGORIES[params.category];
  if (!categoryInfo) {
    return { title: 'Category Not Found' };
  }
  const title = `${categoryInfo.name} | Smart Lock Articles, Tools & Tables`;
  const description = categoryInfo.description;
  const canonical = `/articles/${params.category}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SLockHub.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = CATEGORIES[params.category];

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(params.category);

  // 按最近更新时间排序（没有 updatedAt 时回退到 pubDate）
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.updatedAt || b.pubDate).getTime() - new Date(a.updatedAt || a.pubDate).getTime()
  );
  const pillarArticles = sortedArticles.filter(article => article.isPillar);
  const supportArticles = sortedArticles.filter(article => article.isSupport);
  const featuredArticles = sortedArticles.filter(article => article.featured || article.isPillar).slice(0, 4);
  const tools = CATEGORY_TOOLS[params.category] || CATEGORY_TOOLS.guides;
  const tags = Array.from(new Set(sortedArticles.flatMap(article => article.tags))).slice(0, 10);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} | Smart Lock Guides | SLockHub`,
    description: category.description,
    url: `https://www.slockhub.com/articles/${params.category}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sortedArticles.length,
      itemListElement: sortedArticles.map((article, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: article.title,
        url: `https://www.slockhub.com/articles/${params.category}/${article.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-bg">
        <div className="container-main section">
          <div className="max-w-4xl mx-auto">
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <Link href="/articles" className="back-link">
                ← Back to All Articles
              </Link>
            </div>

            <div className="page-header">
              <h1 className="page-header__title">{category.name}</h1>
              <p className="page-header__subtitle">{category.description}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{sortedArticles.length} articles</p>
            </div>

            <section className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                <h2 className="section-title">Topic, Tools, Articles</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-lg)' }}>
                {getCategoryVerdict(params.category, sortedArticles.length)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HubStat label="Pillar guides" value={`${pillarArticles.length}`} detail="Long-form articles for strategic decisions." />
                <HubStat label="Quick fixes" value={`${supportArticles.length}`} detail="Support articles for specific setup or troubleshooting jobs." />
                <HubStat label="Topic coverage" value={`${tags.length}`} detail={tags.slice(0, 4).join(', ') || 'Tags are being expanded.'} />
              </div>
            </section>

            {featuredArticles.length > 0 && (
              <section style={{ marginBottom: 'var(--space-2xl)' }}>
                <h2 className="section-title">Best Articles to Read First</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredArticles.map(article => (
                    <Link key={article.slug} href={`/articles/${params.category}/${article.slug}`} className="link-card">
                      <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-sm)' }}>
                        {article.isPillar && <span className="badge badge-featured">Pillar</span>}
                        {article.featured && <span className="badge badge-accent">Featured</span>}
                      </div>
                      <h3 className="link-card__title">{article.title}</h3>
                      <p className="link-card__desc">{article.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="content-card" style={{ marginBottom: 'var(--space-2xl)' }}>
              <h2 className="section-title">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map(tool => (
                  <Link key={tool.href} href={tool.href} className="link-card">
                    <h3 className="link-card__title">{tool.title}</h3>
                    <p className="link-card__desc">{tool.description}</p>
                    <span style={{ display: 'inline-block', marginTop: 'var(--space-sm)', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                      Open →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {sortedArticles.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>No articles in this category yet.</p>
              </div>
            ) : (
              <div className="form-group">
                {sortedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${params.category}/${article.slug}`}
                    className="link-card group"
                  >
                    <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-sm)' }}>
                      {article.isPillar && (
                        <span className="badge badge-featured">Pillar</span>
                      )}
                      {article.featured && (
                        <span className="badge badge-accent">Featured</span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }} className="group-hover:text-[var(--color-accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }} className="line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <span>
                        {article.updatedAt ? 'Updated ' : 'Published '}
                        {new Date(article.updatedAt || article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span>• {article.readingTime} min read</span>
                      <span>• {article.wordCount.toLocaleString()} words</span>
                      <span className="ml-auto group-hover:translate-x-1 transition-transform" style={{ color: 'var(--color-accent)' }}>
                        Read more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function HubStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="card" style={{ background: 'var(--color-bg-alt)' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{label}</div>
      <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{detail}</div>
    </div>
  )
}
