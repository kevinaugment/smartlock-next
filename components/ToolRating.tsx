'use client'

import { useState, useEffect, useCallback } from 'react'

interface ToolRatingProps {
    toolSlug: string
}

export function ToolRating({ toolSlug }: ToolRatingProps) {
    const [voted, setVoted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState<{ total: number; helpful: number } | null>(null)

    const storageKey = `tool_rating_${toolSlug}`

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch(`/api/ratings?slug=${toolSlug}`)
            const data = await res.json()
            if (data.success && data.data) {
                setStats({ total: data.data.total, helpful: data.data.helpful })
            }
        } catch {
            // 静默失败
        }
    }, [toolSlug])

    useEffect(() => {
        const savedVote = localStorage.getItem(storageKey)
        if (savedVote) {
            setVoted(true)
            fetchStats()
        }
    }, [fetchStats, storageKey])

    async function handleVote(isHelpful: boolean) {
        if (voted || loading) return
        setLoading(true)

        try {
            const res = await fetch('/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tool_slug: toolSlug, is_helpful: isHelpful }),
            })
            const data = await res.json()

            if (data.success) {
                localStorage.setItem(storageKey, isHelpful ? 'yes' : 'no')
                setVoted(true)
                if (data.data) {
                    setStats({ total: data.data.total, helpful: data.data.helpful })
                }
            }
        } catch {
            // 静默失败
        } finally {
            setLoading(false)
        }
    }

    const helpfulPercent = stats && stats.total > 0
        ? Math.round((stats.helpful / stats.total) * 100)
        : null

    return (
        <div className="tool-rating">
            <div className="tool-rating__inner">
                {voted ? (
                    <div className="tool-rating__thanks">
                        <span className="tool-rating__icon">✓</span>
                        <span>Thanks for your feedback!</span>
                        {helpfulPercent !== null && stats && stats.total >= 3 && (
                            <span className="tool-rating__stat">
                                👍 {helpfulPercent}% found this helpful ({stats.total} votes)
                            </span>
                        )}
                    </div>
                ) : (
                    <>
                        <span className="tool-rating__label">Was this tool helpful?</span>
                        <div className="tool-rating__buttons">
                            <button
                                onClick={() => handleVote(true)}
                                disabled={loading}
                                className="tool-rating__btn tool-rating__btn--yes"
                            >
                                👍 Yes
                            </button>
                            <button
                                onClick={() => handleVote(false)}
                                disabled={loading}
                                className="tool-rating__btn tool-rating__btn--no"
                            >
                                👎 No
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
