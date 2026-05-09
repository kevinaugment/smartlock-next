'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight, Table, FileText, ShieldCheck, Signpost } from 'lucide-react'
import { resolveCalculatorDataSlug } from '@/lib/calculators/slugs'

interface Article {
    id: number
    title: string
    slug: string
    description: string
    custom_title?: string
    custom_description?: string
    tags?: string[] | string // Can be string from DB or array if parsed
    category_slug?: string
}

interface RelatedResourcesProps {
    calculatorSlug: string
}

export function RelatedResources({ calculatorSlug }: RelatedResourcesProps) {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchArticles() {
            const dataSlug = resolveCalculatorDataSlug(calculatorSlug)
            if (!dataSlug) {
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`/api/related-articles?slug=${dataSlug}`)
                if (response.ok) {
                    const rawData = await response.json()
                    const data = rawData.map((article: any) => ({
                        ...article,
                        tags: typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags
                    }))
                    setArticles(data)
                }
            } catch (error) {
                console.error('Failed to fetch related articles', error)
            } finally {
                setLoading(false)
            }
        }

        if (calculatorSlug) {
            fetchArticles()
        }
    }, [calculatorSlug])

    if (loading) return null
    if (articles.length === 0) return null

    const getIcon = (tags: any) => {
        const tagArray = Array.isArray(tags) ? tags : []
        if (tagArray.includes('data-table')) return <Table className="w-6 h-6 group-hover:scale-110 transition-transform" />
        if (tagArray.includes('glossary')) return <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
        if (tagArray.includes('standard')) return <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
        if (tagArray.includes('decision-guide')) return <Signpost className="w-6 h-6 group-hover:scale-110 transition-transform" />
        return <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
    }

    return (
        <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="section-title mb-0">Related Guides and Tables</h2>
                <Link href="/resources" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                    View all resources <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => {
                    const title = article.custom_title || article.title
                    const desc = article.custom_description || article.description

                    return (
                        <Link key={article.id} href={`/articles/${article.category_slug}/${article.slug}`} className="card card-hover group block p-6 h-full transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div style={{ color: 'var(--color-accent)' }} className="shrink-0 pt-1">
                                    {getIcon(article.tags)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
                                    <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
