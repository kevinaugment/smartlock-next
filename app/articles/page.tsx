import type { Metadata } from 'next'
import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';
import { BookOpen, Clock, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smart Lock Guides | Protocol, Security, Installation & Troubleshooting',
  description: 'Find smart lock guides for door compatibility, protocols, security, installation, troubleshooting, access codes, rentals, and integrations.',
  alternates: { canonical: '/articles' },
  openGraph: {
    title: 'Smart Lock Guides',
    description: 'Guides for smart lock compatibility, protocols, security, installation, troubleshooting, and product decisions.',
    siteName: 'SLockHub.com',
    type: 'website',
    url: 'https://www.slockhub.com/articles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Guides',
    description: 'Start with smart lock compatibility, protocol, security, installation, and troubleshooting guides.',
  },
}

const startHereLinks = [
  {
    href: '/articles/guides/door-compatibility-guide',
    title: 'Door Compatibility Guide',
    description: 'Highest-impression article opportunity. Validate door thickness, backset, bore size, and retrofit risk.',
  },
  {
    href: '/articles/protocols/connect-lock-to-homekit',
    title: 'Connect a Lock to HomeKit',
    description: 'Apple ecosystem setup path with links into Matter, Thread, and HomeKit product pages.',
  },
  {
    href: '/articles/protocols/zigbee-vs-zwave-comparison',
    title: 'Zigbee vs Z-Wave',
    description: 'Protocol comparison that supports signal, battery, and mesh planning decisions.',
  },
]

const articlePathways = [
  { href: '/calculators/compatibility', title: 'Check Door Fit', description: 'Use after compatibility guides to validate measurements.' },
  { href: '/calculators/protocol-wizard', title: 'Choose Protocol', description: 'Turn protocol research into a recommendation.' },
  { href: '/best/matter-smart-locks', title: 'Compare Products', description: 'Move from research to a model shortlist.' },
]

export default function ArticlesPage() {
  const articles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const categories = Object.values(CATEGORIES);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Lock Guides',
    description: 'Smart lock guides for protocol choice, installation, troubleshooting, security, rental access, integrations, and reference tables.',
    url: 'https://www.slockhub.com/articles',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 20).map((article, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: article.title,
        url: `https://www.slockhub.com/articles/${article.category}/${article.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-wrapper-alt">
        <div className="container-main section">
          {/* Header */}
          <div className="page-header">
            <div className="page-header__icon">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="page-header__title">Smart Lock Guides</h1>
            <p className="page-header__subtitle">
              Comprehensive guides, tutorials, and documentation for smart lock systems
            </p>
          </div>

          <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="section-title">Best Articles to Read First</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '52rem', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
              These articles connect the biggest organic opportunities to calculators, best pages, protocol pages, and product decisions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {startHereLinks.map((item) => (
                <Link key={item.href} href={item.href} className="link-card">
                  <h3 className="link-card__title">{item.title}</h3>
                  <p className="link-card__desc">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2 className="section-title">Calculators, Products, Protocols</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articlePathways.map((item) => (
                <Link key={item.href} href={item.href} className="link-card">
                  <h3 className="link-card__title">{item.title}</h3>
                  <p className="link-card__desc">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="section-title">Topics and Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/articles/${category.slug}`}
                  className="group icon-card"
                >
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {category.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{category.count} articles</span>
                    <span
                      className="font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title" style={{ marginBottom: 0 }}>New Smart Lock Guides</h2>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{articles.length} articles</span>
            </div>
            {articles.length === 0 ? (
              <div className="text-center card" style={{ padding: 'var(--space-3xl)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>No articles yet</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Check back soon for new content!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.slice(0, 9).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.category}/${article.slug}`}
                    className="group card card-hover overflow-hidden"
                    style={{ padding: 0 }}
                  >
                    <div style={{ padding: 'var(--space-xl)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="badge badge-accent">
                          {CATEGORIES[article.category].name}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          <Clock className="w-3 h-3" /> {article.readingTime} min
                        </span>
                      </div>

                      <h3
                        className="text-lg font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {article.title}
                      </h3>

                      <p className="text-sm line-clamp-3 mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        {article.description}
                      </p>

                      <div
                        className="flex items-center justify-between text-xs pt-4"
                        style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span
                          className="font-medium group-hover:gap-2 flex items-center gap-1 transition-all"
                          style={{ color: 'var(--color-accent)' }}
                        >
                          Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/" className="btn btn-ghost">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
