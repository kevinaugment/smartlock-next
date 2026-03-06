'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        window.dispatchEvent(new Event('cookie-consent-update'))
        setVisible(false)
    }

    const decline = () => {
        localStorage.setItem('cookie-consent', 'declined')
        window.dispatchEvent(new Event('cookie-consent-update'))
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
                padding: 'var(--space-md) var(--space-lg)',
                boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
            }}
        >
            <div
                className="container-main"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-md)',
                    flexWrap: 'wrap',
                }}
            >
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, flex: 1, minWidth: '280px' }}>
                    We use cookies for analytics (Google Analytics).
                    By continuing, you agree to our{' '}
                    <a href="/privacy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                        Privacy Policy
                    </a>.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexShrink: 0 }}>
                    <button
                        onClick={decline}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="btn btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}
