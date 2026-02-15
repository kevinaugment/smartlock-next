import Link from 'next/link'
import { BookOpen, Calculator } from 'lucide-react'
import { calculatorLinksMap } from '@/lib/calculators/calculator-links'

/**
 * 计算器页面底部的推荐阅读和相关工具
 * 服务端组件 —— 通过 calculatorLinksMap 查找当前计算器的关联内容
 */
export default function RelatedContent({ slug }: { slug: string }) {
    const links = calculatorLinksMap[slug]
    if (!links) return null

    const hasArticles = links.articles.length > 0
    const hasCalculators = links.calculators.length > 0

    if (!hasArticles && !hasCalculators) return null

    return (
        <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-2xl)', borderTop: '1px solid var(--color-border)' }}>
            {/* Related Articles */}
            {hasArticles && (
                <div style={{ marginBottom: hasCalculators ? 'var(--space-2xl)' : 0 }}>
                    <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <BookOpen className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                        Recommended Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {links.articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/articles/${article.category}/${article.slug}`}
                                className="link-card"
                            >
                                <h3 className="link-card__title">{article.title}</h3>
                                <span style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500, marginTop: 'var(--space-sm)' }}>
                                    Read article →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Calculators */}
            {hasCalculators && (
                <div>
                    <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <Calculator className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                        Related Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {links.calculators.map((calc) => (
                            <Link
                                key={calc.slug}
                                href={`/calculators/${calc.slug}`}
                                className="link-card"
                            >
                                <h3 className="link-card__title">{calc.title}</h3>
                                <span style={{ color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500, marginTop: 'var(--space-sm)' }}>
                                    Open tool →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
