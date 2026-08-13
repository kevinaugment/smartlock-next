'use client'

import { useState, useCallback } from 'react'

interface StarRatingProps {
    productId: number
    size?: 'sm' | 'md'
    showCount?: boolean
}

export default function StarRating({ productId, size = 'md', showCount = true }: StarRatingProps) {
    const [average, setAverage] = useState(0)
    const [count, setCount] = useState(0)
    const [userRating, setUserRating] = useState<number | null>(null)
    const [hoverStar, setHoverStar] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const starSize = size === 'sm' ? '1rem' : '1.375rem'
    const textSize = size === 'sm' ? '0.75rem' : '0.875rem'

    const handleRate = useCallback(async (rating: number) => {
        if (submitting) return
        setSubmitting(true)

        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(`slockhub_product_rating_${productId}`, String(rating))
            }
            setAverage(rating)
            setCount(1)
            setUserRating(rating)
        } catch {
            setUserRating(rating)
        } finally {
            setSubmitting(false)
        }
    }, [productId, submitting])

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

                    let color = 'var(--color-border)'
                    if (isHovered) {
                        color = 'var(--color-star-hover)' // amber-400 hover preview
                    } else if (isUserRated) {
                        color = 'var(--color-star-user)' // amber-500 your rating
                    } else if (isActive && count > 0) {
                        color = 'var(--color-star-aggregate)' // yellow-400 aggregate
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
                    color: 'var(--color-accent)',
                    fontWeight: 500,
                }}>
                    Your rating: {userRating}★
                </span>
            )}
        </div>
    )
}
