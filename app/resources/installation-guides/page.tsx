import Link from 'next/link'
import type { Metadata } from 'next'
import { Ruler, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Smart Lock Installation Diagrams | Door Prep, Wiring & Measurements',
    description: 'Use smart lock diagrams for door anatomy, bore size, backset, strike plate alignment, wiring, measurements, and installation checks.',
    alternates: { canonical: '/resources/installation-guides' },
}

/* ──────────────────────────── Diagram 1: Door Anatomy ──────────────────────────── */
function DoorAnatomyDiagram() {
    return (
        <svg viewBox="0 0 600 480" className="w-full h-auto" role="img" aria-label="Door anatomy and measurement diagram">
            {/* Door */}
            <rect x="150" y="20" width="200" height="440" rx="4" fill="var(--color-bg-alt)" stroke="var(--color-text-primary)" strokeWidth="2" />

            {/* Door face text */}
            <text x="250" y="460" fill="var(--color-text-muted)" fontSize="11" textAnchor="middle" fontWeight="500">DOOR (Interior Face)</text>

            {/* Cross bore */}
            <circle cx="310" cy="200" r="28" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="310" cy="200" r="4" fill="var(--color-accent)" />

            {/* Edge bore  */}
            <rect x="348" y="190" width="3" height="20" fill="var(--color-accent)" rx="1" />

            {/* Latch/bolt path */}
            <rect x="310" y="195" width="42" height="10" fill="var(--color-accent)" opacity="0.2" rx="2" />

            {/* Strike area on frame */}
            <rect x="360" y="160" width="30" height="80" rx="3" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* ── Measurement annotations ── */}

            {/* Cross bore diameter — 2-1/8" */}
            <line x1="282" y1="170" x2="338" y2="170" stroke="var(--color-accent)" strokeWidth="1.2" markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
            <text x="310" y="163" fill="var(--color-accent)" fontSize="11" fontWeight="700" textAnchor="middle">2-1/8&quot;</text>
            <text x="310" y="152" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">(54 mm) Cross Bore</text>

            {/* Backset — edge to center */}
            <line x1="350" y1="250" x2="310" y2="250" stroke="var(--color-warning)" strokeWidth="1.5" />
            <line x1="350" y1="242" x2="350" y2="258" stroke="var(--color-warning)" strokeWidth="1.5" />
            <line x1="310" y1="242" x2="310" y2="258" stroke="var(--color-warning)" strokeWidth="1.5" />
            <text x="330" y="270" fill="var(--color-warning)" fontSize="11" fontWeight="700" textAnchor="middle">Backset</text>
            <text x="330" y="282" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">2-3/8&quot; or 2-3/4&quot;</text>

            {/* Door height indicator */}
            <line x1="130" y1="20" x2="130" y2="460" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="122" y1="20" x2="138" y2="20" stroke="var(--color-text-muted)" strokeWidth="1.5" />
            <line x1="122" y1="460" x2="138" y2="460" stroke="var(--color-text-muted)" strokeWidth="1.5" />
            <text x="120" y="245" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" transform="rotate(-90 120 245)">Standard: 80&quot; (2032 mm)</text>

            {/* Lock height from floor */}
            <line x1="110" y1="200" x2="110" y2="460" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="102" y1="200" x2="118" y2="200" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="100" y="360" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle" transform="rotate(-90 100 360)">Lock Height: 36-48&quot;</text>

            {/* Door thickness callout */}
            <g transform="translate(400, 100)">
                <rect x="0" y="0" width="170" height="78" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
                <text x="85" y="20" fill="var(--color-text-primary)" fontSize="11" fontWeight="700" textAnchor="middle">Door Thickness</text>
                <line x1="10" y1="28" x2="160" y2="28" stroke="var(--color-border)" strokeWidth="1" />
                <text x="15" y="46" fill="var(--color-text-secondary)" fontSize="10">Residential: 1-3/8&quot; – 1-3/4&quot;</text>
                <text x="15" y="62" fill="var(--color-text-secondary)" fontSize="10">Commercial: 1-3/4&quot; – 2-1/4&quot;</text>
                <line x1="350" y1="139" x2="400" y2="139" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3" />
            </g>

            {/* Hinge side label */}
            <text x="160" y="50" fill="var(--color-text-muted)" fontSize="10" fontWeight="500">← Hinge Side</text>

            {/* Lock side label */}
            <text x="340" y="50" fill="var(--color-text-primary)" fontSize="10" fontWeight="600">Lock Side →</text>

            {/* Edge bore annotation */}
            <g transform="translate(420, 195)">
                <rect x="0" y="-5" width="150" height="55" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" strokeWidth="1" />
                <text x="75" y="13" fill="var(--color-accent-text)" fontSize="10" fontWeight="700" textAnchor="middle">Edge Bore</text>
                <text x="75" y="28" fill="var(--color-accent-text)" fontSize="9" textAnchor="middle">1&quot; diameter (25 mm)</text>
                <text x="75" y="42" fill="var(--color-accent-text)" fontSize="9" textAnchor="middle">For latch/bolt mechanism</text>
            </g>

            {/* Arrow markers */}
            <defs>
                <marker id="arrowL" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 10 0 L 0 5 L 10 10 z" fill="var(--color-accent)" />
                </marker>
                <marker id="arrowR" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)" />
                </marker>
            </defs>
        </svg>
    )
}

/* ──────────────────────────── Diagram 2: Lock Components Exploded View ──────────── */
function LockComponentsDiagram() {
    return (
        <svg viewBox="0 0 600 400" className="w-full h-auto" role="img" aria-label="Smart lock components exploded view">
            {/* Title labels for sides */}
            <text x="180" y="25" fill="var(--color-text-primary)" fontSize="13" fontWeight="700" textAnchor="middle">EXTERIOR</text>
            <text x="430" y="25" fill="var(--color-text-primary)" fontSize="13" fontWeight="700" textAnchor="middle">INTERIOR</text>

            {/* Center line (door) */}
            <rect x="290" y="40" width="20" height="320" rx="2" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1.5" />
            <text x="300" y="380" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">DOOR</text>

            {/* ── Exterior assembly ── */}
            {/* Keypad/touchscreen */}
            <rect x="110" y="70" width="120" height="200" rx="10" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            {/* Touchscreen area */}
            <rect x="125" y="90" width="90" height="80" rx="4" fill="var(--color-bg-dark)" opacity="0.08" />
            {/* Keypad buttons */}
            {[0, 1, 2].map(row =>
                [0, 1, 2].map(col => (
                    <circle
                        key={`${row}-${col}`}
                        cx={145 + col * 25}
                        cy={195 + row * 25}
                        r="8"
                        fill="var(--color-bg-alt)"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                    />
                ))
            )}
            {/* Fingerprint area */}
            <ellipse cx="170" cy="105" rx="20" ry="25" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="170" y="109" fill="var(--color-accent)" fontSize="8" fontWeight="600" textAnchor="middle">FP</text>
            {/* Escutcheon label */}
            <line x1="108" y1="165" x2="60" y2="165" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="55" y="155" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="end">Escutcheon</text>
            <text x="55" y="168" fill="var(--color-text-muted)" fontSize="9" textAnchor="end">(Exterior Trim)</text>

            {/* Keypad label */}
            <line x1="108" y1="220" x2="60" y2="230" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="55" y="233" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="end">Keypad</text>

            {/* Fingerprint label */}
            <line x1="170" y1="78" x2="170" y2="55" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="170" y="48" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">Fingerprint</text>

            {/* Mounting plate & connection cable */}
            <rect x="235" y="120" width="50" height="120" rx="3" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <text x="260" y="186" fill="var(--color-text-muted)" fontSize="8" fontWeight="500" textAnchor="middle" transform="rotate(-90 260 186)">Mounting Plate</text>
            {/* Cable */}
            <path d="M 260 125 Q 260 105, 275 100 Q 290 95, 300 115" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 3" />
            <text x="280" y="90" fill="var(--color-accent)" fontSize="9" fontWeight="600" textAnchor="middle">Cable</text>

            {/* Tailpiece */}
            <rect x="280" y="170" width="40" height="15" rx="2" fill="var(--color-accent)" opacity="0.6" />
            <line x1="300" y1="188" x2="300" y2="210" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="300" y="222" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">Tailpiece</text>

            {/* ── Interior assembly ── */}
            {/* Interior cover */}
            <rect x="370" y="80" width="120" height="220" rx="10" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            {/* Battery compartment */}
            <rect x="385" y="100" width="90" height="70" rx="4" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1" />
            {/* Batteries */}
            {[0, 1, 2, 3].map(i => (
                <rect key={i} x={393 + i * 20} y="115" width="14" height="40" rx="2" fill="var(--color-warning-subtle)" stroke="var(--color-warning)" strokeWidth="1" />
            ))}

            {/* Thumb turn */}
            <rect x="410" y="195" width="50" height="15" rx="7" fill="var(--color-text-muted)" />
            <circle cx="435" cy="202" r="3" fill="var(--color-surface)" />

            {/* PCB indicator */}
            <rect x="395" y="230" width="70" height="45" rx="3" fill="var(--color-success-subtle)" stroke="var(--color-success)" strokeWidth="1" />
            <text x="430" y="250" fill="var(--color-success)" fontSize="8" fontWeight="600" textAnchor="middle">PCB</text>
            <text x="430" y="262" fill="var(--color-success)" fontSize="7" textAnchor="middle">Electronics</text>

            {/* Labels */}
            <line x1="490" y1="130" x2="540" y2="120" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="545" y="116" fill="var(--color-text-primary)" fontSize="10" fontWeight="600">4× AA Batteries</text>

            <line x1="490" y1="202" x2="540" y2="202" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="545" y="198" fill="var(--color-text-primary)" fontSize="10" fontWeight="600">Thumb Turn</text>
            <text x="545" y="211" fill="var(--color-text-muted)" fontSize="9">Manual Override</text>

            <line x1="490" y1="255" x2="540" y2="260" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="545" y="257" fill="var(--color-text-primary)" fontSize="10" fontWeight="600">Control Board</text>
            <text x="545" y="270" fill="var(--color-text-muted)" fontSize="9">Motor + Wireless</text>

            {/* Bolt mechanism below */}
            <g transform="translate(220, 295)">
                <rect x="0" y="0" width="160" height="50" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                <rect x="120" y="12" width="50" height="26" rx="3" fill="var(--color-accent)" opacity="0.5" />
                <text x="145" y="29" fill="var(--color-text-on-accent)" fontSize="9" fontWeight="600" textAnchor="middle">Bolt</text>
                <rect x="10" y="12" width="100" height="26" rx="3" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1" />
                <text x="60" y="29" fill="var(--color-text-muted)" fontSize="9" fontWeight="500" textAnchor="middle">Latch Assembly</text>
                <text x="80" y="64" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">Deadbolt Latch Assembly</text>
            </g>
        </svg>
    )
}

/* ──────────────────────────── Diagram 3: Wiring for Hardwired Lock ──────────────── */
function WiringDiagram() {
    return (
        <svg viewBox="0 0 600 350" className="w-full h-auto" role="img" aria-label="Hardwired smart lock wiring diagram">
            {/* Title */}
            <text x="300" y="25" fill="var(--color-text-primary)" fontSize="14" fontWeight="700" textAnchor="middle">Hardwired Access Control Wiring</text>

            {/* Access Control Panel */}
            <rect x="20" y="60" width="160" height="200" rx="6" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            <rect x="20" y="60" width="160" height="32" rx="6" fill="var(--color-bg-dark)" />
            <rect x="20" y="86" width="160" height="6" rx="0" fill="var(--color-bg-dark)" />
            <text x="100" y="82" fill="var(--color-text-inverse)" fontSize="11" fontWeight="700" textAnchor="middle">Control Panel</text>

            {/* Panel terminals */}
            {['PWR +', 'PWR −', 'DATA A', 'DATA B', 'RTE', 'ALARM', 'RELAY'].map((label, i) => (
                <g key={label} transform={`translate(30, ${108 + i * 22})`}>
                    <rect x="0" y="0" width="12" height="10" rx="1" fill="var(--color-accent)" />
                    <text x="18" y="9" fill="var(--color-text-secondary)" fontSize="9">{label}</text>
                </g>
            ))}

            {/* Lock Unit */}
            <rect x="400" y="60" width="170" height="180" rx="6" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            <rect x="400" y="60" width="170" height="32" rx="6" fill="var(--color-accent)" />
            <rect x="400" y="86" width="170" height="6" rx="0" fill="var(--color-accent)" />
            <text x="485" y="82" fill="var(--color-text-on-accent)" fontSize="11" fontWeight="700" textAnchor="middle">Smart Lock</text>

            {/* Lock terminals */}
            {['12V DC +', '12V DC −', 'RS-485 A', 'RS-485 B', 'SENSOR'].map((label, i) => (
                <g key={label} transform={`translate(410, ${108 + i * 28})`}>
                    <rect x="0" y="0" width="12" height="10" rx="1" fill="var(--color-accent)" />
                    <text x="18" y="9" fill="var(--color-text-secondary)" fontSize="9">{label}</text>
                </g>
            ))}

            {/* Wires */}
            {/* Power + (Red) */}
            <line x1="180" y1="113" x2="400" y2="113" stroke="#ef4444" strokeWidth="2" />
            <text x="290" y="108" fill="#ef4444" fontSize="8" fontWeight="600" textAnchor="middle">+12V (Red)</text>

            {/* Power - (Black) */}
            <line x1="180" y1="135" x2="400" y2="141" stroke="#1e293b" strokeWidth="2" />
            <text x="290" y="133" fill="#1e293b" fontSize="8" fontWeight="600" textAnchor="middle">GND (Black)</text>

            {/* DATA A (Green) */}
            <line x1="180" y1="157" x2="400" y2="169" stroke="#22c55e" strokeWidth="2" />
            <text x="290" y="158" fill="#22c55e" fontSize="8" fontWeight="600" textAnchor="middle">RS-485 A (Green)</text>

            {/* DATA B (Yellow) */}
            <line x1="180" y1="179" x2="400" y2="197" stroke="#eab308" strokeWidth="2" />
            <text x="290" y="185" fill="#eab308" fontSize="8" fontWeight="600" textAnchor="middle">RS-485 B (Yellow)</text>

            {/* Door Contact */}
            <rect x="400" y="260" width="170" height="55" rx="6" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <text x="485" y="282" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle">Door Position Sensor</text>
            <text x="485" y="297" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">(Magnetic reed switch)</text>

            {/* Sensor wire */}
            <path d="M 422 240 L 422 260" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Power Supply */}
            <rect x="200" y="280" width="140" height="55" rx="6" fill="var(--color-warning-subtle)" stroke="var(--color-warning)" strokeWidth="1.5" />
            <text x="270" y="302" fill="var(--color-warning)" fontSize="10" fontWeight="700" textAnchor="middle">Power Supply</text>
            <text x="270" y="317" fill="var(--color-warning)" fontSize="9" textAnchor="middle">12V DC / 2A min</text>
            <text x="270" y="330" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">UL-listed, indoor rated</text>

            {/* Power supply to panel */}
            <path d="M 200 300 L 100 300 L 100 260" fill="none" stroke="#ef4444" strokeWidth="2" />

            {/* RTE Button */}
            <rect x="20" y="280" width="120" height="45" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" strokeWidth="1.5" />
            <text x="80" y="300" fill="var(--color-accent-text)" fontSize="10" fontWeight="600" textAnchor="middle">REX Button</text>
            <text x="80" y="314" fill="var(--color-accent-text)" fontSize="8" textAnchor="middle">(Request to Exit)</text>

            {/* RTE wire */}
            <path d="M 80 280 L 80 260 L 42 260 L 42 218" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        </svg>
    )
}

/* ──────────────────────────── Diagram 4: Installation Steps ──────────────────────── */
function InstallationStepsDiagram() {
    return (
        <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-label="Smart lock installation steps">
            {/* Step nodes */}
            {[
                { x: 60, y: 60, step: '1', title: 'Remove', subtitle: 'Old Lock', icon: 'M 50 50 L 70 50 M 60 40 L 60 60', color: 'var(--color-danger)' },
                { x: 200, y: 60, step: '2', title: 'Check', subtitle: 'Door Prep', icon: 'M 50 55 L 56 60 L 70 45', color: 'var(--color-warning)' },
                { x: 340, y: 60, step: '3', title: 'Install', subtitle: 'Latch', icon: 'M 55 45 L 55 65 L 65 65 L 65 45', color: 'var(--color-accent)' },
                { x: 480, y: 60, step: '4', title: 'Mount', subtitle: 'Exterior', icon: 'M 50 50 L 70 50 M 50 55 L 70 55 M 50 60 L 70 60', color: 'var(--color-accent)' },
                { x: 60, y: 200, step: '8', title: 'Test &', subtitle: 'Calibrate', icon: 'M 55 45 L 60 60 L 65 45', color: 'var(--color-success)' },
                { x: 200, y: 200, step: '7', title: 'Connect', subtitle: 'to App', icon: 'M 55 50 Q 60 42, 65 50 Q 60 58, 55 50', color: 'var(--color-success)' },
                { x: 340, y: 200, step: '6', title: 'Insert', subtitle: 'Batteries', icon: 'M 56 45 L 56 65 M 64 45 L 64 65', color: 'var(--color-accent)' },
                { x: 480, y: 200, step: '5', title: 'Mount', subtitle: 'Interior', icon: 'M 50 50 L 70 50 M 50 55 L 70 55 M 50 60 L 70 60', color: 'var(--color-accent)' },
            ].map((s, i) => (
                <g key={s.step} transform={`translate(${s.x}, ${s.y})`}>
                    {/* Circle */}
                    <circle cx="0" cy="0" r="38" fill="var(--color-surface)" stroke={s.color} strokeWidth="2.5" />
                    {/* Step number badge */}
                    <circle cx="-28" cy="-28" r="14" fill={s.color} />
                    <text x="-28" y="-24" fill="white" fontSize="12" fontWeight="700" textAnchor="middle">{s.step}</text>
                    {/* Title */}
                    <text x="0" y="-5" fill="var(--color-text-primary)" fontSize="11" fontWeight="700" textAnchor="middle">{s.title}</text>
                    <text x="0" y="10" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">{s.subtitle}</text>
                </g>
            ))}

            {/* Forward arrows (top row) */}
            {[120, 260, 400].map(x => (
                <g key={`top-${x}`}>
                    <line x1={x} y1="60" x2={x + 20} y2="60" stroke="var(--color-border-strong)" strokeWidth="2" markerEnd="url(#stepArrow)" />
                </g>
            ))}

            {/* Down arrow right side */}
            <line x1="480" y1="110" x2="480" y2="148" stroke="var(--color-border-strong)" strokeWidth="2" markerEnd="url(#stepArrow)" />

            {/* Backward arrows (bottom row) */}
            {[400, 260, 120].map(x => (
                <g key={`bot-${x}`}>
                    <line x1={x + 20} y1="200" x2={x} y2="200" stroke="var(--color-border-strong)" strokeWidth="2" markerEnd="url(#stepArrowL)" />
                </g>
            ))}

            {/* Time estimate */}
            <rect x="180" y="280" width="240" height="32" rx="16" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" strokeWidth="1" />
            <text x="300" y="300" fill="var(--color-accent-text)" fontSize="12" fontWeight="700" textAnchor="middle">⏱ Typical Install Time: 15-30 min</text>

            <defs>
                <marker id="stepArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-border-strong)" />
                </marker>
                <marker id="stepArrowL" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M 10 0 L 0 5 L 10 10 z" fill="var(--color-border-strong)" />
                </marker>
            </defs>
        </svg>
    )
}

/* ──────────────────────────── Diagram 5: Measurement Guide ──────────────────────── */
function MeasurementGuideDiagram() {
    return (
        <svg viewBox="0 0 600 300" className="w-full h-auto" role="img" aria-label="Door measurement guide for smart lock installation">
            <text x="300" y="25" fill="var(--color-text-primary)" fontSize="13" fontWeight="700" textAnchor="middle">Pre-Installation Measurement Checklist</text>

            {/* Measurement items */}
            {[
                { y: 55, label: 'Door Thickness', range: '1-3/8" – 2-1/4"', note: 'Measure at lock height', icon: '↔' },
                { y: 110, label: 'Backset Distance', range: '2-3/8" or 2-3/4"', note: 'Edge to center of bore', icon: '↔' },
                { y: 165, label: 'Cross Bore Diameter', range: '2-1/8" (54mm)', note: 'Face hole for lock body', icon: '⊙' },
                { y: 220, label: 'Edge Bore Diameter', range: '1" (25mm)', note: 'Edge hole for latch', icon: '○' },
                { y: 275, label: 'Lock Height from Floor', range: '36" – 48"', note: 'ADA: max 48" to operable part', icon: '↕' },
            ].map((item) => (
                <g key={item.label} transform={`translate(0, ${item.y})`}>
                    {/* Measurement card */}
                    <rect x="30" y="0" width="540" height="42" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />

                    {/* Icon */}
                    <circle cx="62" cy="21" r="16" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" strokeWidth="1" />
                    <text x="62" y="26" fill="var(--color-accent)" fontSize="14" fontWeight="700" textAnchor="middle">{item.icon}</text>

                    {/* Label */}
                    <text x="90" y="17" fill="var(--color-text-primary)" fontSize="12" fontWeight="700">{item.label}</text>
                    <text x="90" y="33" fill="var(--color-text-muted)" fontSize="10">{item.note}</text>

                    {/* Value */}
                    <rect x="400" y="8" width="150" height="26" rx="4" fill="var(--color-accent-subtle)" />
                    <text x="475" y="26" fill="var(--color-accent-text)" fontSize="12" fontWeight="700" textAnchor="middle">{item.range}</text>
                </g>
            ))}
        </svg>
    )
}

/* ──────────────────────────── page component ──────────────────────────── */
function DiagramSection({
    title,
    id,
    description,
    children,
}: {
    title: string
    id: string
    description: string
    children: React.ReactNode
}) {
    return (
        <section id={id} className="mb-16">
            <h2 className="section-title">{title}</h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', maxWidth: '65ch' }}>
                {description}
            </p>
            <div className="card" style={{ padding: 'var(--space-lg)', overflow: 'hidden' }}>
                {children}
            </div>
        </section>
    )
}

export default function InstallationGuidesPage() {
    return (
        <div className="page-wrapper-alt">
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link href="/resources">Resources</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">Installation Guides</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <div className="page-header__icon">
                        <Ruler className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Installation Diagrams</h1>
                    <p className="page-header__subtitle">
                        Professional SVG diagrams for door preparation, lock components, wiring, and step-by-step installation
                    </p>
                </div>

                {/* Jump Links */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { id: 'door-anatomy', label: 'Door Anatomy' },
                            { id: 'components', label: 'Lock Components' },
                            { id: 'wiring', label: 'Wiring Diagram' },
                            { id: 'steps', label: 'Install Steps' },
                            { id: 'measurements', label: 'Measurements' },
                        ].map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="badge badge-default text-sm px-4 py-2 transition-colors"
                                style={{ textDecoration: 'none' }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">

                    <DiagramSection
                        id="door-anatomy"
                        title="Door Anatomy & Dimensions"
                        description="Key measurements and structural features of a standard entry door. Understanding these dimensions is essential before selecting or installing any smart lock."
                    >
                        <DoorAnatomyDiagram />
                    </DiagramSection>

                    <DiagramSection
                        id="components"
                        title="Smart Lock Components — Exploded View"
                        description="A typical smart deadbolt consists of an exterior assembly (keypad/touchscreen), interior assembly (batteries and control board), and a latch assembly connecting through the door."
                    >
                        <LockComponentsDiagram />
                    </DiagramSection>

                    <DiagramSection
                        id="wiring"
                        title="Hardwired Access Control Wiring"
                        description="Commercial smart locks often use hardwired connections to a central access control panel. This diagram shows a typical RS-485 communication and 12V DC power wiring layout."
                    >
                        <WiringDiagram />
                    </DiagramSection>

                    <DiagramSection
                        id="steps"
                        title="Installation Steps — Residential Smart Deadbolt"
                        description="Standard 8-step installation flow for DIY smart lock replacement. Most residential installations can be completed in 15-30 minutes with basic tools (Phillips screwdriver)."
                    >
                        <InstallationStepsDiagram />
                    </DiagramSection>

                    <DiagramSection
                        id="measurements"
                        title="Pre-Installation Measurement Guide"
                        description="Before purchasing a smart lock, verify these five critical door measurements to ensure compatibility. Mismatched dimensions are the #1 cause of installation failures."
                    >
                        <MeasurementGuideDiagram />
                    </DiagramSection>
                </div>

                {/* CTA Section */}
                <div className="max-w-5xl mx-auto mt-8">
                    <div className="cta-section">
                        <h2 className="cta-section__title">Fit, Cost, Install Tools</h2>
                        <p className="cta-section__subtitle">
                            Use our calculators to estimate time, cost, and compatibility
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/calculators/compatibility" className="btn btn-primary btn-lg">Door Compatibility Check</Link>
                            <Link href="/resources" className="btn btn-secondary btn-lg">
                                <ArrowLeft className="w-4 h-4" /> All Resources
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
