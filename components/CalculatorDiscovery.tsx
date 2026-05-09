'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
    Search, X, Sparkles, ChevronRight, ChevronLeft,
    Building2, Home, Shield, Wrench, DollarSign,
    Users, Zap, Radio, Flame, Star
} from 'lucide-react'
import type { ReactNode } from 'react'

/* ─── Types ─── */
interface Calculator {
    name: string
    slug: string
    icon: ReactNode
    description: string
    features: string[]
    complexity: string
}

interface Category {
    name: string
    icon: ReactNode
    calculators: string[]
}

interface CalculatorDiscoveryProps {
    calculators: Calculator[]
    categories: Category[]
}

const POPULAR_FILTER = 'Popular'
const NEW_FILTER = 'New'

/* ─── Smart Finder Wizard Data ─── */
const WIZARD_STEPS = [
    {
        question: 'What type of project are you working on?',
        options: [
            { id: 'residential', label: 'Residential / Home', icon: <Home className="w-5 h-5" />, tags: ['battery-life', 'compatibility', 'lock-tco', 'pin-strength', 'door-fit', 'retrofit-advisor', 'noise-level'] },
            { id: 'rental', label: 'Short-Term Rental', icon: <DollarSign className="w-5 h-5" />, tags: ['str-roi', 'guest-code', 'credential-planner', 'battery-life', 'lock-tco', 'offline-resilience'] },
            { id: 'commercial', label: 'Commercial / Office', icon: <Building2 className="w-5 h-5" />, tags: ['fleet-planner', 'installation-cost', 'installation-time', 'access-capacity', 'security-compliance', 'fire-compliance', 'network-bandwidth', 'poe-power'] },
            { id: 'hotel', label: 'Hotel / Hospitality', icon: <Building2 className="w-5 h-5" />, tags: ['hotel-roi', 'credential-planner', 'access-capacity', 'fleet-planner', 'energy-cost', 'cyber-risk'] },
        ],
    },
    {
        question: 'What is your primary concern?',
        options: [
            { id: 'cost', label: 'Cost & Budget', icon: <DollarSign className="w-5 h-5" />, tags: ['lock-tco', 'installation-cost', 'subscription-compare', 'str-roi', 'hotel-roi', 'energy-cost', 'warranty-lifecycle'] },
            { id: 'security', label: 'Security & Compliance', icon: <Shield className="w-5 h-5" />, tags: ['security-compliance', 'fire-compliance', 'offline-resilience', 'emergency-backup', 'cyber-risk', 'privacy-compliance', 'pin-strength'] },
            { id: 'connectivity', label: 'Connectivity & Network', icon: <Radio className="w-5 h-5" />, tags: ['signal-strength', 'ble-range', 'rf-coverage', 'mesh-planner', 'network-bandwidth', 'protocol-wizard'] },
            { id: 'hardware', label: 'Hardware & Installation', icon: <Wrench className="w-5 h-5" />, tags: ['compatibility', 'door-fit', 'installation-time', 'retrofit-advisor', 'lock-compare', 'noise-level'] },
            { id: 'scale', label: 'Scaling & Management', icon: <Users className="w-5 h-5" />, tags: ['fleet-planner', 'credential-planner', 'access-capacity', 'guest-code', 'poe-power'] },
        ],
    },
    {
        question: 'How many doors are involved?',
        options: [
            { id: 'single', label: '1–3 doors', icon: <Home className="w-5 h-5" />, tags: ['battery-life', 'compatibility', 'door-fit', 'retrofit-advisor', 'pin-strength'] },
            { id: 'small', label: '4–20 doors', icon: <Building2 className="w-5 h-5" />, tags: ['lock-tco', 'installation-cost', 'installation-time', 'mesh-planner', 'credential-planner'] },
            { id: 'medium', label: '20–100 doors', icon: <Building2 className="w-5 h-5" />, tags: ['fleet-planner', 'rf-coverage', 'network-bandwidth', 'access-capacity', 'subscription-compare'] },
            { id: 'large', label: '100+ doors', icon: <Building2 className="w-5 h-5" />, tags: ['fleet-planner', 'poe-power', 'network-bandwidth', 'access-capacity', 'energy-cost', 'cyber-risk'] },
        ],
    },
]

/* ─── Fuzzy Search Helper ─── */
function fuzzyMatch(text: string, query: string): boolean {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    // Simple substring + word-start matching
    if (lowerText.includes(lowerQuery)) return true
    // Check if all query words are found
    const queryWords = lowerQuery.split(/\s+/)
    return queryWords.every(word => lowerText.includes(word))
}

/* ─── Component ─── */
export default function CalculatorDiscovery({ calculators, categories }: CalculatorDiscoveryProps) {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [wizardOpen, setWizardOpen] = useState(false)
    const [wizardStep, setWizardStep] = useState(0)
    const [wizardSelections, setWizardSelections] = useState<string[]>([])
    const searchRef = useRef<HTMLInputElement>(null)

    /* ─── ⌘K Keyboard Shortcut ─── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                searchRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    /* ─── Popular calculators (top 6 by cross-category appearances) ─── */
    const popularSlugs = useMemo(() => {
        const counts: Record<string, number> = {}
        categories.forEach(cat => cat.calculators.forEach(slug => {
            counts[slug] = (counts[slug] || 0) + 1
        }))
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([slug]) => slug)
    }, [categories])

    /* ─── New calculators (last 6 in the list) ─── */
    const newSlugs = useMemo(() =>
        calculators.slice(-6).map(c => c.slug)
        , [calculators])

    /* ─── Filtered Calculators ─── */
    const filteredCalculators = useMemo(() => {
        let result = calculators

        // Special category filters
        if (activeCategory === POPULAR_FILTER) {
            result = result.filter(calc => popularSlugs.includes(calc.slug))
        } else if (activeCategory === NEW_FILTER) {
            result = result.filter(calc => newSlugs.includes(calc.slug))
        } else if (activeCategory) {
            const cat = categories.find(c => c.name === activeCategory)
            if (cat) {
                result = result.filter(calc => cat.calculators.includes(calc.slug))
            }
        }

        // Search filter
        if (search.trim()) {
            result = result.filter(calc =>
                fuzzyMatch(calc.name, search) ||
                fuzzyMatch(calc.description, search) ||
                calc.features.some(f => fuzzyMatch(f, search))
            )
        }

        return result
    }, [calculators, categories, activeCategory, search, popularSlugs, newSlugs])

    /* ─── Wizard Results ─── */
    const wizardResults = useMemo(() => {
        if (wizardSelections.length === 0) return []

        // Count how many times each calculator slug was tagged across selections
        const scoreMap: Record<string, number> = {}
        wizardSelections.forEach(selectionId => {
            WIZARD_STEPS.forEach(step => {
                const option = step.options.find(o => o.id === selectionId)
                if (option) {
                    option.tags.forEach(tag => {
                        scoreMap[tag] = (scoreMap[tag] || 0) + 1
                    })
                }
            })
        })

        // Sort by score descending, take top 6
        return Object.entries(scoreMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([slug, score]) => ({
                calculator: calculators.find(c => c.slug === slug),
                score,
            }))
            .filter(r => r.calculator)
    }, [wizardSelections, calculators])

    const handleWizardSelect = useCallback((optionId: string) => {
        const newSelections = [...wizardSelections, optionId]
        setWizardSelections(newSelections)

        if (wizardStep < WIZARD_STEPS.length - 1) {
            setWizardStep(wizardStep + 1)
        }
    }, [wizardSelections, wizardStep])

    const resetWizard = useCallback(() => {
        setWizardStep(0)
        setWizardSelections([])
        setWizardOpen(false)
    }, [])

    const isWizardComplete = wizardSelections.length === WIZARD_STEPS.length

    return (
        <>
            {/* ─── Discovery Header ─── */}
            <div className="discovery-toolbar">
                {/* Search */}
                <div className="discovery-search">
                    <Search className="discovery-search__icon" />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search calculators... (⌘K)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="discovery-search__input"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="discovery-search__clear"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Smart Finder Button */}
                <button
                    onClick={() => { setWizardOpen(!wizardOpen); setWizardStep(0); setWizardSelections([]) }}
                    className={`discovery-finder-btn ${wizardOpen ? 'discovery-finder-btn--active' : ''}`}
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Smart Finder</span>
                </button>
            </div>

            {/* ─── Smart Finder Wizard ─── */}
            {wizardOpen && (
                <div className="wizard-panel">
                    <div className="wizard-panel__stripe" />

                    {!isWizardComplete ? (
                        <>
                            {/* Progress Dots */}
                            <div className="wizard-progress">
                                {WIZARD_STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`wizard-progress__dot ${i < wizardStep ? 'wizard-progress__dot--done' : ''} ${i === wizardStep ? 'wizard-progress__dot--active' : ''}`}
                                    />
                                ))}
                            </div>

                            {/* Step label */}
                            <div className="wizard-step-label">
                                Step {wizardStep + 1} of {WIZARD_STEPS.length}
                            </div>

                            {/* Question */}
                            <h3 className="wizard-question">{WIZARD_STEPS[wizardStep].question}</h3>

                            {/* Options */}
                            <div className="wizard-options">
                                {WIZARD_STEPS[wizardStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleWizardSelect(option.id)}
                                        className="wizard-option"
                                    >
                                        <span className="wizard-option__icon">{option.icon}</span>
                                        <span className="wizard-option__label">{option.label}</span>
                                        <ChevronRight className="w-4 h-4 opacity-40" />
                                    </button>
                                ))}
                            </div>

                            {/* Back / Close */}
                            <div className="wizard-actions">
                                {wizardStep > 0 && (
                                    <button
                                        onClick={() => {
                                            setWizardStep(wizardStep - 1)
                                            setWizardSelections(wizardSelections.slice(0, -1))
                                        }}
                                        className="wizard-back-btn"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                )}
                                <button onClick={resetWizard} className="wizard-close-btn">
                                    Close
                                </button>
                            </div>
                        </>
                    ) : (
                        /* ─── Wizard Results ─── */
                        <>
                            <h3 className="wizard-question">Recommended for You</h3>
                            <p className="wizard-subtitle">Based on your answers, here are the top tools:</p>

                            <div className="wizard-results">
                                {wizardResults.map(({ calculator, score }) => (
                                    <Link
                                        key={calculator!.slug}
                                        href={`/calculators/${calculator!.slug}`}
                                        className="wizard-result-card"
                                        prefetch={false}
                                    >
                                        <div className="wizard-result-card__icon">{calculator!.icon}</div>
                                        <div className="wizard-result-card__body">
                                            <div className="wizard-result-card__name">{calculator!.name}</div>
                                            <div className="wizard-result-card__desc">{calculator!.description}</div>
                                        </div>
                                        <div className="wizard-result-card__score">
                                            <div className="wizard-result-card__match">{Math.round((score / 3) * 100)}%</div>
                                            <div className="wizard-result-card__match-label">match</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="wizard-actions">
                                <button onClick={resetWizard} className="wizard-restart-btn">
                                    <Sparkles className="w-4 h-4" /> Start Over
                                </button>
                                <button onClick={() => setWizardOpen(false)} className="wizard-close-btn">
                                    Browse All
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ─── Category Pills ─── */}
            <div className="category-pills">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`category-pill ${activeCategory === null ? 'category-pill--active' : ''}`}
                >
                    All ({calculators.length})
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                        className={`category-pill ${activeCategory === cat.name ? 'category-pill--active' : ''}`}
                    >
                        {cat.icon}
                        <span>{cat.name}</span>
                        <span className="category-pill__count">{cat.calculators.length}</span>
                    </button>
                ))}
                <button
                    onClick={() => setActiveCategory(activeCategory === POPULAR_FILTER ? null : POPULAR_FILTER)}
                    className={`category-pill ${activeCategory === POPULAR_FILTER ? 'category-pill--active' : ''}`}
                >
                    <Star className="w-4 h-4" />
                    <span>Popular</span>
                    <span className="category-pill__count">{popularSlugs.length}</span>
                </button>
                <button
                    onClick={() => setActiveCategory(activeCategory === NEW_FILTER ? null : NEW_FILTER)}
                    className={`category-pill ${activeCategory === NEW_FILTER ? 'category-pill--active' : ''}`}
                >
                    <Flame className="w-4 h-4" />
                    <span>New</span>
                    <span className="category-pill__count">{newSlugs.length}</span>
                </button>
            </div>

            {/* ─── Results Count ─── */}
            <div className="discovery-results-meta">
                <span className="discovery-results-count">
                    {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
                    {activeCategory && ` in ${activeCategory}`}
                    {search && ` matching "${search}"`}
                </span>
            </div>

            {/* ─── Calculator Grid ─── */}
            {filteredCalculators.length > 0 ? (
                <div className="calculator-grid">
                    {filteredCalculators.map((calculator) => (
                        <Link
                            key={calculator.slug}
                            href={`/calculators/${calculator.slug}`}
                            className="calc-card"
                            prefetch={false}
                        >
                            <div className="calc-card__header">
                                <div className="calc-card__icon">{calculator.icon}</div>
                                <div className="calc-card__meta">
                                    <h3 className="calc-card__name">{calculator.name}</h3>
                                    <span className={`calc-card__badge ${calculator.complexity === 'Simple' ? 'calc-card__badge--simple' : 'calc-card__badge--moderate'}`}>
                                        {calculator.complexity}
                                    </span>
                                </div>
                                <ChevronRight className="calc-card__arrow" />
                            </div>

                            <p className="calc-card__desc">{calculator.description}</p>

                            <div className="calc-card__features">
                                {calculator.features.map((feature, idx) => (
                                    <span key={idx} className="calc-card__feature-tag">{feature}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="discovery-empty">
                    <Search className="w-12 h-12 opacity-30" />
                    <p className="discovery-empty__title">No calculators found</p>
                    <p className="discovery-empty__hint">Try adjusting your search or filter</p>
                    <button onClick={() => { setSearch(''); setActiveCategory(null) }} className="discovery-empty__reset">
                        Reset Filters
                    </button>
                </div>
            )}
        </>
    )
}
