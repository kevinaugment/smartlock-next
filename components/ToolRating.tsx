'use client'

import { useState, useEffect } from 'react'

interface ToolRatingProps {
    toolSlug: string
}

export function ToolRating({ toolSlug }: ToolRatingProps) {
    const [voted, setVoted] = useState(false)
    const [loading, setLoading] = useState(false)

    const storageKey = `tool_rating_${toolSlug}`

    useEffect(() => {
        const savedVote = localStorage.getItem(storageKey)
        if (savedVote) {
            setVoted(true)
        }
    }, [storageKey])

    async function handleVote(isHelpful: boolean) {
        if (voted || loading) return
        setLoading(true)

        try {
            localStorage.setItem(storageKey, isHelpful ? 'yes' : 'no')
            setVoted(true)
        } catch {
            // 静默失败
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="tool-rating">
            <div className="tool-rating__inner">
                {voted ? (
                    <div className="tool-rating__thanks">
                        <span className="tool-rating__icon">✓</span>
                        <span>Thanks for your feedback!</span>
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
