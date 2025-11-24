'use client'

import { useEffect, useState } from 'react'
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

    // Observe all headings
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span>📑</span> Table of Contents
        </h2>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1 px-3 rounded-md transition-all duration-200
                  ${
                    activeId === heading.id
                      ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 -ml-[2px]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-2 border-transparent -ml-[2px]'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 shadow-sm">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2 text-sm">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full flex items-center gap-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span>⬆️</span> Back to top
          </button>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center gap-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span>🖨️</span> Print article
          </button>
          <button
            onClick={() => {
              const url = window.location.href
              navigator.clipboard.writeText(url)
              alert('Link copied to clipboard!')
            }}
            className="w-full flex items-center gap-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span>🔗</span> Copy link
          </button>
        </div>
      </div>
    </nav>
  )
}
