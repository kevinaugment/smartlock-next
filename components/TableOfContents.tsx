'use client'

import { useEffect, useState } from 'react'
import { List, ArrowUp, Printer, Link2 } from 'lucide-react'
import type { Heading } from '@/lib/markdown'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="card" style={{ padding: 'var(--space-xl)' }}>
        <h2
          className="text-sm font-bold uppercase mb-4 flex items-center gap-2"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}
        >
          <List className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
          Table of Contents
        </h2>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className="block py-1 px-3 rounded-md transition-all"
                style={{
                  color: activeId === heading.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  background: activeId === heading.id ? 'var(--color-accent-subtle)' : 'transparent',
                  fontWeight: activeId === heading.id ? 600 : 400,
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="card mt-4" style={{ padding: 'var(--space-md) var(--space-lg)', background: 'var(--color-bg-alt)' }}>
        <h3
          className="text-xs font-bold uppercase mb-3"
          style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}
        >
          Quick Actions
        </h3>
        <div className="space-y-1 text-sm">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full flex items-center gap-2 text-left py-1 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowUp className="w-4 h-4" /> Back to top
          </button>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center gap-2 text-left py-1 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Printer className="w-4 h-4" /> Print article
          </button>
          <button
            onClick={() => {
              const url = window.location.href
              navigator.clipboard.writeText(url)
              alert('Link copied to clipboard!')
            }}
            className="w-full flex items-center gap-2 text-left py-1 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Link2 className="w-4 h-4" /> Copy link
          </button>
        </div>
      </div>
    </nav>
  )
}
