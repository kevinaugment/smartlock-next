'use client'

import { useEffect, useState, useCallback } from 'react'

interface StarRatingProps {
    productId: number
    size?: 'sm' | 'md'
    showCount?: boolean
}

function getFingerprint(): string {
    if (typeof window === 'undefined') return ''
    const key = 'slockhub_fp'
    let fp = localStorage.getItem(key)
    if (!fp) {
        fp = crypto.randomUUID()
        localStorage.setItem(key, fp)
    }
    return fp
}

export default function StarRating({ productId, size = 'md', showCount = true }: StarRatingProps) {
    const [average, setAverage] = useState(0)
    const [count, setCount] = useState(0)
    const [userRating, setUserRating] = useState<number | null>(null)
    const [hoverStar, setHoverStar] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const starSize = size === 'sm' ? '1rem' : '1.375rem'
    const textSize = size === 'sm' ? '0.75rem' : '0.875rem'

    // 加载评分数据
    useEffect(() => {
        const fp = getFingerprint()
        if (!fp) return

        fetch(`/api/ratings?product_id=${productId}&fingerprint=${fp}`)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setAverage(json.data.average)
                    setCount(json.data.count)
                    setUserRating(json.data.userRating)
                }
                setLoaded(true)
            })
            .catch(() => setLoaded(true))
    }, [productId])

    // 提交评分
    const handleRate = useCallback(async (rating: number) => {
        if (submitting) return
        setSubmitting(true)

        const fp = getFingerprint()
        try {
            const res = await fetch('/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: productId,
                    rating,
                    fingerprint: fp,
                }),
            })
            const json = await res.json()
            if (json.success) {
                setAverage(json.data.average)
                setCount(json.data.count)
                setUserRating(json.data.userRating)
            }
        } catch {
            // 静默失败
        } finally {
            setSubmitting(false)
        }
    }, [productId, submitting])

    // 骨架加载状态
    if (!loaded) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                    <span
                        key={i}
                        style={{
                            fontSize: starSize,
                            color: 'var(--color-border, #e2e8f0)',
                            opacity: 0.5,
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
        )
    }

    const displayRating = hoverStar || userRating || Math.round(average)

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {/* 可点击星星 */}
            <div
                style={{ display: 'flex', gap: '2px', cursor: submitting ? 'wait' : 'pointer' }}
                onMouseLeave={() => setHoverStar(0)}
                role="group"
                aria-label="Rate this product"
            >
                {[1, 2, 3, 4, 5].map(star => {
                    const isActive = star <= displayRating
                    const isHovered = hoverStar > 0 && star <= hoverStar
                    const isUserRated = userRating !== null && star <= userRating && hoverStar === 0

                    let color = 'var(--color-border, #e2e8f0)'
                    if (isHovered) {
                        color = '#fbbf24' // amber-400 hover preview
                    } else if (isUserRated) {
                        color = '#f59e0b' // amber-500 your rating
                    } else if (isActive && count > 0) {
                        color = '#facc15' // yellow-400 aggregate
                    }

                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRate(star)}
                            onMouseEnter={() => setHoverStar(star)}
                            disabled={submitting}
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0',
                                fontSize: starSize,
                                lineHeight: 1,
                                color,
                                cursor: submitting ? 'wait' : 'pointer',
                                transition: 'color 0.15s ease, transform 0.1s ease',
                                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                            }}
                        >
                            ★
                        </button>
                    )
                })}
            </div>

            {/* 聚合数据 */}
            <span style={{ fontSize: textSize, color: 'var(--color-text-muted)' }}>
                {count > 0 ? (
                    <>
                        {average}/5
                        {showCount && (
                            <span style={{ marginLeft: '4px' }}>
                                ({count} {count === 1 ? 'rating' : 'ratings'})
                            </span>
                        )}
                    </>
                ) : (
                    <span style={{ fontStyle: 'italic' }}>Be the first to rate</span>
                )}
            </span>

            {/* 用户已评分提示 */}
            {userRating !== null && hoverStar === 0 && (
                <span style={{
                    fontSize: size === 'sm' ? '0.65rem' : '0.75rem',
                    color: 'var(--color-accent, #3b82f6)',
                    fontWeight: 500,
                }}>
                    Your rating: {userRating}★
                </span>
            )}
        </div>
    )
}
