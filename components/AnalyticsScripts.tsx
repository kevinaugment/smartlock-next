'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = 'G-RY8C070WKJ'

/**
 * Loads Google Analytics scripts only after user accepts cookie consent.
 * Listens for localStorage changes and re-checks on mount.
 */
export default function AnalyticsScripts() {
    const [consentGiven, setConsentGiven] = useState(false)

    useEffect(() => {
        // Check on mount
        const check = () => {
            setConsentGiven(localStorage.getItem('cookie-consent') === 'accepted')
        }
        check()

        // Listen for storage events (fired when CookieConsent writes to localStorage)
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'cookie-consent') check()
        }
        window.addEventListener('storage', onStorage)

        // Also listen for a custom event dispatched by CookieConsent in same tab
        const onConsent = () => check()
        window.addEventListener('cookie-consent-update', onConsent)

        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('cookie-consent-update', onConsent)
        }
    }, [])

    if (!consentGiven) return null

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                `}
            </Script>
        </>
    )
}
