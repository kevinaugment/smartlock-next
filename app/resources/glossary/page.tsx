'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
    Search, BookOpen, Cpu, Shield, Wrench, Award,
    ChevronDown, ArrowLeft
} from 'lucide-react'
import type { ReactNode } from 'react'

/* ──────────────────────────── types ──────────────────────────── */
interface GlossaryTerm {
    term: string
    definition: string
    category: string
    relatedTerms?: string[]
    svg?: 'deadbolt' | 'keyway' | 'strike-plate' | 'bore-hole' | 'backset'
}

interface Category {
    id: string
    label: string
    icon: ReactNode
}

/* ──────────────────────────── categories ──────────────────────── */
const categories: Category[] = [
    { id: 'all', label: 'All Terms', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hardware', label: 'Hardware', icon: <Wrench className="w-4 h-4" /> },
    { id: 'protocols', label: 'Protocols', icon: <Cpu className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'standards', label: 'Standards', icon: <Award className="w-4 h-4" /> },
    { id: 'installation', label: 'Installation', icon: <Wrench className="w-4 h-4" /> },
]

/* ──────────────────────────── SVG diagrams ────────────────────── */
function DeadboltSVG() {
    return (
        <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Deadbolt anatomy diagram">
            {/* Door surface */}
            <rect x="20" y="10" width="280" height="160" rx="4" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Lock body */}
            <rect x="100" y="40" width="120" height="80" rx="6" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            {/* Bolt */}
            <rect x="220" y="65" width="60" height="30" rx="3" fill="var(--color-accent)" stroke="var(--color-accent-hover)" strokeWidth="1.5" />
            {/* Keyhole */}
            <circle cx="160" cy="75" r="12" fill="var(--color-bg-dark)" />
            <rect x="156" y="75" width="8" height="18" rx="1" fill="var(--color-bg-dark)" />
            {/* Thumb turn */}
            <rect x="145" y="95" width="30" height="8" rx="4" fill="var(--color-text-muted)" />
            {/* Labels */}
            <line x1="270" y1="60" x2="270" y2="40" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="265" y="35" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Bolt</text>
            <line x1="160" y1="55" x2="160" y2="30" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="160" y="25" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Cylinder</text>
            <line x1="160" y1="110" x2="160" y2="140" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="160" y="152" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Thumb Turn</text>
            <line x1="90" y1="80" x2="50" y2="80" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="55" y="75" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Lock Body</text>
        </svg>
    )
}

function KeywaySVG() {
    return (
        <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Keyway types diagram">
            {/* KW1 Keyway */}
            <g transform="translate(40, 20)">
                <text x="35" y="12" fill="var(--color-text-primary)" fontSize="11" fontWeight="700" textAnchor="middle">KW1 (Kwikset)</text>
                <rect x="10" y="20" width="50" height="110" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                <path d="M 25 30 L 25 50 L 20 55 L 25 60 L 20 70 L 25 80 L 22 90 L 25 100 L 25 120" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
                <circle cx="35" cy="35" r="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="1" />
            </g>
            {/* SC1 Keyway */}
            <g transform="translate(130, 20)">
                <text x="35" y="12" fill="var(--color-text-primary)" fontSize="11" fontWeight="700" textAnchor="middle">SC1 (Schlage)</text>
                <rect x="10" y="20" width="50" height="110" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                <path d="M 25 30 L 25 45 L 18 50 L 25 55 L 18 65 L 25 70 L 18 80 L 25 85 L 20 95 L 25 105 L 25 120" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
                <circle cx="35" cy="35" r="8" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="1" />
            </g>
            {/* Smart keyway */}
            <g transform="translate(220, 20)">
                <text x="35" y="12" fill="var(--color-text-primary)" fontSize="11" fontWeight="700" textAnchor="middle">Smart (Keyless)</text>
                <rect x="10" y="20" width="50" height="110" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
                <circle cx="35" cy="60" r="15" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="1.5" />
                <circle cx="35" cy="60" r="5" fill="var(--color-accent)" />
                {/* Waves for wireless */}
                <path d="M 18 90 Q 25 85, 35 90 Q 45 95, 52 90" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
                <path d="M 18 100 Q 25 95, 35 100 Q 45 105, 52 100" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.4" />
            </g>
        </svg>
    )
}

function StrikePlateSVG() {
    return (
        <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Strike plate diagram">
            {/* Door frame */}
            <rect x="180" y="10" width="120" height="160" rx="2" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1.5" />
            <text x="240" y="170" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">Door Frame</text>
            {/* Strike plate */}
            <rect x="175" y="45" width="40" height="90" rx="3" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" />
            {/* Bolt hole */}
            <rect x="182" y="70" width="26" height="30" rx="2" fill="var(--color-bg-dark)" />
            {/* Screw holes */}
            <circle cx="195" cy="55" r="3" fill="var(--color-text-muted)" />
            <circle cx="195" cy="125" r="3" fill="var(--color-text-muted)" />
            {/* Bolt entering */}
            <rect x="100" y="73" width="82" height="24" rx="3" fill="var(--color-accent)" opacity="0.7" />
            <line x1="100" y1="85" x2="70" y2="85" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="55" y="82" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Bolt</text>
            {/* Labels */}
            <line x1="215" y1="55" x2="260" y2="35" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="275" y="35" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Screws</text>
            <line x1="195" y1="100" x2="130" y2="120" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="105" y="130" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Bolt Pocket</text>
            <line x1="175" y1="90" x2="130" y2="50" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="100" y="45" fill="var(--color-accent)" fontSize="10" fontWeight="600" textAnchor="middle">Strike Plate</text>
        </svg>
    )
}

function BoreHoleSVG() {
    return (
        <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Door bore hole diagram">
            {/* Door edge view */}
            <rect x="130" y="10" width="60" height="160" rx="2" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Cross bore (face) */}
            <circle cx="160" cy="75" r="27" fill="var(--color-surface)" stroke="var(--color-text-primary)" strokeWidth="2" strokeDasharray="4 2" />
            <text x="160" y="78" fill="var(--color-text-muted)" fontSize="8" fontWeight="600" textAnchor="middle">2-1/8"</text>
            {/* Edge bore */}
            <circle cx="160" cy="75" r="12" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="160" y="78" fill="var(--color-accent)" fontSize="7" fontWeight="600" textAnchor="middle">1"</text>
            {/* Backset measurement */}
            <line x1="160" y1="110" x2="160" y2="145" stroke="var(--color-accent)" strokeWidth="1" />
            <line x1="130" y1="145" x2="160" y2="145" stroke="var(--color-accent)" strokeWidth="1.5" />
            <line x1="130" y1="140" x2="130" y2="150" stroke="var(--color-accent)" strokeWidth="1.5" />
            <line x1="160" y1="140" x2="160" y2="150" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="145" y="158" fill="var(--color-accent)" fontSize="9" fontWeight="600" textAnchor="middle">Backset</text>
            {/* Label arrows */}
            <line x1="100" y1="48" x2="133" y2="60" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="80" y="45" fill="var(--color-text-primary)" fontSize="9" fontWeight="600" textAnchor="middle">Cross Bore</text>
            <text x="80" y="55" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">(Face Hole)</text>
            <line x1="210" y1="75" x2="175" y2="75" stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="248" y="72" fill="var(--color-text-primary)" fontSize="9" fontWeight="600" textAnchor="middle">Edge Bore</text>
            <text x="248" y="82" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">(Latch Hole)</text>
        </svg>
    )
}

function BacksetSVG() {
    return (
        <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Backset measurement diagram">
            {/* Door top-down view */}
            <rect x="40" y="40" width="240" height="60" rx="3" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="1.5" />
            <text x="160" y="108" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">Door (Top-Down View)</text>
            {/* Door edge */}
            <line x1="40" y1="35" x2="40" y2="105" stroke="var(--color-text-primary)" strokeWidth="3" />
            <text x="40" y="120" fill="var(--color-text-primary)" fontSize="9" fontWeight="600" textAnchor="middle">Edge</text>
            {/* Lock center point */}
            <circle cx="160" cy="70" r="20" fill="var(--color-accent-subtle)" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="160" cy="70" r="3" fill="var(--color-accent)" />
            {/* 2-3/8" backset */}
            <line x1="40" y1="30" x2="120" y2="30" stroke="var(--color-accent)" strokeWidth="1.5" />
            <line x1="40" y1="25" x2="40" y2="35" stroke="var(--color-accent)" strokeWidth="1.5" />
            <line x1="120" y1="25" x2="120" y2="35" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="80" y="22" fill="var(--color-accent)" fontSize="10" fontWeight="700" textAnchor="middle">2-3/8"</text>
            {/* 2-3/4" backset */}
            <line x1="40" y1="140" x2="160" y2="140" stroke="var(--color-warning)" strokeWidth="1.5" />
            <line x1="40" y1="135" x2="40" y2="145" stroke="var(--color-warning)" strokeWidth="1.5" />
            <line x1="160" y1="135" x2="160" y2="145" stroke="var(--color-warning)" strokeWidth="1.5" />
            <text x="100" y="155" fill="var(--color-warning)" fontSize="10" fontWeight="700" textAnchor="middle">2-3/4"</text>
            {/* Legend */}
            <rect x="200" y="130" width="10" height="10" rx="1" fill="var(--color-accent)" opacity="0.3" stroke="var(--color-accent)" strokeWidth="1" />
            <text x="215" y="139" fill="var(--color-text-secondary)" fontSize="9">Standard</text>
            <rect x="200" y="148" width="10" height="10" rx="1" fill="var(--color-warning)" opacity="0.3" stroke="var(--color-warning)" strokeWidth="1" />
            <text x="215" y="157" fill="var(--color-text-secondary)" fontSize="9">Commercial</text>
        </svg>
    )
}

const svgComponents: Record<string, () => JSX.Element> = {
    'deadbolt': DeadboltSVG,
    'keyway': KeywaySVG,
    'strike-plate': StrikePlateSVG,
    'bore-hole': BoreHoleSVG,
    'backset': BacksetSVG,
}

/* ──────────────────────────── glossary data ───────────────────── */
const glossaryTerms: GlossaryTerm[] = [
    // Hardware
    { term: 'Deadbolt', definition: 'A locking mechanism that extends a solid metal bolt into the door frame. Unlike spring bolts, deadbolts cannot be retracted by applying end pressure and require a key or thumb turn to operate. Available in single-cylinder (keyed one side) and double-cylinder (keyed both sides) configurations.', category: 'hardware', svg: 'deadbolt', relatedTerms: ['Thumb Turn', 'Strike Plate', 'Bolt Throw'] },
    { term: 'Bolt Throw', definition: 'The distance a deadbolt extends from the edge of the door into the strike plate. Industry standard is 1 inch (25mm). Longer throws provide better resistance against forced entry. ANSI Grade 1 requires a minimum 1-inch throw.', category: 'hardware', relatedTerms: ['Deadbolt', 'ANSI Grade'] },
    { term: 'Keyway', definition: 'The specific shape of the key slot in a lock cylinder. Different manufacturers use proprietary keyway profiles (e.g., Kwikset KW1, Schlage SC1) to prevent unauthorized key duplication. Smart locks may eliminate the keyway entirely for keyless operation.', category: 'hardware', svg: 'keyway', relatedTerms: ['Cylinder', 'Key Blank'] },
    { term: 'Strike Plate', definition: 'A metal plate mounted on the door frame that receives the bolt when the lock is engaged. Security-grade strike plates use 3-inch screws that anchor into the wall stud, not just the door frame. Box strikes include a recessed pocket for the bolt.', category: 'hardware', svg: 'strike-plate', relatedTerms: ['Deadbolt', 'Door Frame'] },
    { term: 'Cross Bore', definition: 'The large hole (typically 2-1/8 inches / 54mm diameter) drilled through the face of the door for the lock body. This is the primary mounting point for residential deadbolts and handlesets.', category: 'hardware', svg: 'bore-hole', relatedTerms: ['Edge Bore', 'Backset'] },
    { term: 'Edge Bore', definition: 'The smaller hole (typically 1 inch / 25mm diameter) drilled through the edge of the door for the bolt mechanism. Connects to the cross bore at a perpendicular angle.', category: 'hardware', relatedTerms: ['Cross Bore', 'Latch'] },
    { term: 'Backset', definition: 'The distance from the edge of the door to the center of the cross bore hole. Standard residential backset is 2-3/8 inches (60mm). Commercial doors typically use 2-3/4 inches (70mm). Most smart locks include adjustable backset latches to accommodate both sizes.', category: 'hardware', svg: 'backset', relatedTerms: ['Cross Bore', 'Latch'] },
    { term: 'Thumb Turn', definition: 'The interior knob or lever of a deadbolt used to lock/unlock the door from inside without a key. Single-cylinder deadbolts have a thumb turn on the interior side and a keyed cylinder on the exterior.', category: 'hardware', relatedTerms: ['Deadbolt', 'Single-Cylinder'] },
    { term: 'Mortise Lock', definition: 'A lock mechanism installed within a rectangular pocket (mortise) cut into the door edge. Common in commercial applications and older buildings. Provides superior strength compared to cylindrical locks but requires more complex installation.', category: 'hardware', relatedTerms: ['Cylindrical Lock', 'Pocket'] },
    { term: 'Latch', definition: 'A spring-loaded bolt mechanism that keeps a door closed. Unlike deadbolts, latches can be retracted by turning the handle or knob. Smart locks may use motorized latches for auto-locking functionality.', category: 'hardware', relatedTerms: ['Deadbolt', 'Auto-Lock'] },
    { term: 'Escutcheon', definition: 'A decorative plate or trim piece that surrounds the lock mechanism on the door surface. Smart locks often feature larger escutcheons to house keypads, touchscreens, or fingerprint readers.', category: 'hardware', relatedTerms: ['Rosette', 'Trim'] },

    // Protocols
    { term: 'Z-Wave', definition: 'A low-power wireless protocol operating on the 908.42 MHz frequency (US) designed specifically for smart home automation. Creates a mesh network where each device can relay signals. Supports up to 232 devices per network with S2 security framework and typical range of 100m outdoors.', category: 'protocols', relatedTerms: ['Mesh Network', 'S2 Security', 'Hub'] },
    { term: 'Zigbee', definition: 'A low-power IEEE 802.15.4-based protocol operating on the 2.4 GHz band. Supports mesh networking with up to 65,000 theoretical nodes. Used by Amazon Echo, Samsung SmartThings. Zigbee 3.0 unified multiple Zigbee profiles into a single interoperable standard.', category: 'protocols', relatedTerms: ['Mesh Network', 'IEEE 802.15.4', 'Hub'] },
    { term: 'Thread', definition: 'An IPv6-based mesh networking protocol designed for IoT. Built on the IEEE 802.15.4 radio standard. Provides direct IP connectivity without requiring a proprietary hub — only a Thread Border Router. Forms the networking layer for Matter-compatible devices.', category: 'protocols', relatedTerms: ['Matter', 'Border Router', 'IPv6'] },
    { term: 'Matter', definition: 'A unified connectivity standard (formerly Project CHIP) developed by the Connectivity Standards Alliance. Ensures interoperability across brands and ecosystems (Apple HomeKit, Google Home, Amazon Alexa). Uses Thread or Wi-Fi as transport layers.', category: 'protocols', relatedTerms: ['Thread', 'CSA', 'Interoperability'] },
    { term: 'BLE (Bluetooth Low Energy)', definition: 'A power-efficient version of Bluetooth (4.0+) designed for short-range communication. Used for phone-to-lock direct communication, proximity unlocking, and setup. Typical range is 10-30 meters. Does not form mesh networks natively.', category: 'protocols', relatedTerms: ['Bluetooth', 'Proximity Unlock'] },
    { term: 'Mesh Network', definition: 'A network topology where each device can communicate with nearby devices and relay messages to distant ones. Z-Wave and Zigbee form mesh networks, improving reliability and range. Thread also supports mesh networking with self-healing capabilities.', category: 'protocols', relatedTerms: ['Z-Wave', 'Zigbee', 'Thread'] },
    { term: 'Hub', definition: 'A central device that bridges smart home protocols (Z-Wave, Zigbee) to your home network. Required for Z-Wave and Zigbee locks. Examples: Samsung SmartThings, Hubitat, Aeotec Smart Home Hub. Wi-Fi and Thread locks do not require a traditional hub.', category: 'protocols', relatedTerms: ['Z-Wave', 'Zigbee', 'Border Router'] },
    { term: 'Border Router', definition: 'A Thread-specific device that connects the Thread mesh network to your IP network (typically your home Wi-Fi/Ethernet). Apple HomePod Mini, Google Nest Hub, and some third-party devices include Thread Border Router functionality.', category: 'protocols', relatedTerms: ['Thread', 'Hub'] },
    { term: 'OTA Update', definition: 'Over-The-Air firmware update capability that allows smart lock manufacturers to push security patches, bug fixes, and new features wirelessly. Critical for maintaining long-term security of connected locks.', category: 'protocols', relatedTerms: ['Firmware', 'Security Patch'] },

    // Security
    { term: 'AES-128 Encryption', definition: 'Advanced Encryption Standard with a 128-bit key length. The minimum encryption standard for secure smart lock communication. Used by Z-Wave S2, Zigbee 3.0, and most Wi-Fi locks. Considered unbreakable by brute force with current computing power.', category: 'security', relatedTerms: ['S2 Security', 'Encryption'] },
    { term: 'S2 Security Framework', definition: 'Z-Wave\'s latest security standard providing AES-128 encryption, Elliptic Curve Diffie-Hellman (ECDH) key exchange, and secure device pairing via DSK or QR code. Replaces the older S0 framework which had known vulnerabilities during key exchange.', category: 'security', relatedTerms: ['Z-Wave', 'AES-128', 'DSK'] },
    { term: 'Anti-Tamper Alarm', definition: 'A built-in sensor that detects physical manipulation attempts (drilling, prying, impact) and triggers an audible alarm or sends a notification. Required by ANSI/BHMA Grade 1 for commercial applications.', category: 'security', relatedTerms: ['ANSI Grade', 'Tamper Detection'] },
    { term: 'Auto-Lock', definition: 'A feature that automatically engages the deadbolt after a configurable time period (e.g., 30 seconds). Prevents accidentally leaving the door unlocked. Can be triggered by door sensor, timer, or geofencing.', category: 'security', relatedTerms: ['Geofencing', 'Door Sensor'] },
    { term: 'Geofencing', definition: 'A location-based feature that uses your smartphone\'s GPS to automatically lock/unlock the door when you enter or leave a defined radius around your home. Typically requires a dedicated mobile app.', category: 'security', relatedTerms: ['Auto-Lock', 'Proximity Unlock'] },
    { term: 'Access Log', definition: 'A chronological record of all lock/unlock events including the method used (key, code, app, auto), the user identity, and timestamp. Essential for audit trails in commercial deployments. Most smart locks store 100-500 events locally.', category: 'security', relatedTerms: ['Audit Trail', 'User Code'] },
    { term: 'Bump Key Attack', definition: 'A lock-picking technique using a specially cut key inserted into the lock and struck with force to manipulate pin tumblers. Smart locks with electronic-only access (no keyway) are immune to this attack vector.', category: 'security', relatedTerms: ['Pick Resistance', 'Keyless Entry'] },
    { term: 'Two-Factor Authentication', definition: 'Requiring two different forms of verification to unlock (e.g., PIN code + fingerprint, or app + BLE proximity). Significantly increases security but adds friction to the unlock process. Common in commercial-grade smart locks.', category: 'security', relatedTerms: ['Biometric', 'PIN Code'] },

    // Standards
    { term: 'ANSI/BHMA Grade 1', definition: 'The highest residential/commercial lock security rating by the American National Standards Institute and Builders Hardware Manufacturers Association. Requires 800,000 cycle endurance, 10 strikes at 75 lbs door force, and 1-inch bolt throw. Standard for commercial installations.', category: 'standards', relatedTerms: ['ANSI Grade 2', 'ANSI Grade 3'] },
    { term: 'ANSI/BHMA Grade 2', definition: 'Mid-tier lock security rating suitable for residential and light commercial use. Requires 400,000 cycle endurance and 5 strikes at 75 lbs door force. Most quality residential smart locks achieve this rating.', category: 'standards', relatedTerms: ['ANSI Grade 1', 'ANSI Grade 3'] },
    { term: 'ANSI/BHMA Grade 3', definition: 'Entry-level lock security rating for basic residential use. Requires 200,000 cycle endurance and 2 strikes at 75 lbs door force. Generally not recommended for exterior doors or security-critical applications.', category: 'standards', relatedTerms: ['ANSI Grade 1', 'ANSI Grade 2'] },
    { term: 'UL 437', definition: 'Underwriters Laboratories standard specifically for high-security lock cylinders. Tests for drill resistance, pick resistance, key bump resistance, and unauthorized key duplication. A UL 437-listed cylinder provides the highest level of physical security.', category: 'standards', relatedTerms: ['Pick Resistance', 'Drill Resistance'] },
    { term: 'ADA Compliance', definition: 'Americans with Disabilities Act requirements for door hardware. Lever handles must operate with no more than 5 lbs of force and no tight grasping/twisting. Smart locks with touchscreen or proximity unlock can exceed ADA requirements.', category: 'standards', relatedTerms: ['Lever Handle', 'Accessibility'] },
    { term: 'FCC Certification', definition: 'Required certification from the Federal Communications Commission for all wireless devices sold in the US. Ensures the smart lock\'s radio transmitter (Z-Wave, Zigbee, Wi-Fi, BLE) does not cause harmful interference and meets radiation limits.', category: 'standards', relatedTerms: ['RF', 'Wireless'] },
    { term: 'IP Rating', definition: 'Ingress Protection rating indicating dust and water resistance (e.g., IP65 = dust-tight, water jet protection). Critical for outdoor smart locks or those exposed to weather. Not all smart locks carry an IP rating.', category: 'standards', relatedTerms: ['Outdoor Lock', 'Weather Resistance'] },
    { term: 'Fire Rating', definition: 'Certification that a lock/door assembly can withstand fire for a specified duration (e.g., 20, 45, 60, or 90 minutes). Required for fire-rated doors in commercial buildings. Smart locks on fire-rated doors must meet specific code requirements for egress.', category: 'standards', relatedTerms: ['Fire Door', 'Egress'] },

    // Installation
    { term: 'Retrofit', definition: 'Installing a smart lock onto an existing door preparation (bore holes) without modifying the door. Most modern smart locks are designed for retrofit installation using standard 2-1/8" cross bore. Some locks (e.g., Yale Approach) retrofit onto existing deadbolts.', category: 'installation', relatedTerms: ['Cross Bore', 'Backset'] },
    { term: 'Handing', definition: 'The direction a door swings (left-hand or right-hand) and whether it swings inward or outward. Most smart locks are "universal" or "field-reversible" to accommodate any handing without additional parts.', category: 'installation', relatedTerms: ['Door Swing', 'Reversible'] },
    { term: 'Door Thickness', definition: 'The measurement of the door slab from face to face. Standard residential doors are 1-3/8" to 1-3/4" thick. Commercial doors can be up to 2-1/4". Smart locks specify supported thickness ranges — using too thin or too thick a door may prevent proper installation.', category: 'installation', relatedTerms: ['Cross Bore', 'Backset'] },
    { term: 'Tailpiece', definition: 'The metal bar that connects the interior lock assembly to the exterior assembly through the door. Smart locks often include adjustable-length tailpieces to accommodate different door thicknesses. Must be properly aligned for the lock to function.', category: 'installation', relatedTerms: ['Door Thickness', 'Lock Body'] },
    { term: 'Junction Box', definition: 'An electrical enclosure used for hardwired smart lock installations (common in commercial settings). Houses the wiring connections between the lock, power supply, and access control panel. Required to meet local electrical codes.', category: 'installation', relatedTerms: ['Hardwired', 'Access Control'] },
    { term: 'DPS (Door Position Sensor)', definition: 'A magnetic sensor that detects whether a door is open or closed. Built into some smart locks, or installed separately. Enables features like auto-lock-on-close, forced-entry alerts, and ajar warnings.', category: 'installation', relatedTerms: ['Auto-Lock', 'Magnetic Sensor'] },
    { term: 'Cable Pass-Through', definition: 'A channel or conduit for routing power and data cables through the door to hardwired smart locks. Required for PoE (Power over Ethernet) locks and access control systems. Typical size is 3/8" to 1/2" diameter.', category: 'installation', relatedTerms: ['Hardwired', 'PoE'] },
]

/* ──────────────────────────── component ──────────────────────── */
export default function GlossaryPage() {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())

    const filteredTerms = useMemo(() => {
        return glossaryTerms
            .filter(t => {
                const matchesCategory = activeCategory === 'all' || t.category === activeCategory
                const matchesSearch = search === '' ||
                    t.term.toLowerCase().includes(search.toLowerCase()) ||
                    t.definition.toLowerCase().includes(search.toLowerCase())
                return matchesCategory && matchesSearch
            })
            .sort((a, b) => a.term.localeCompare(b.term))
    }, [search, activeCategory])

    const toggleTerm = (term: string) => {
        setExpandedTerms(prev => {
            const next = new Set(prev)
            if (next.has(term)) next.delete(term)
            else next.add(term)
            return next
        })
    }

    const termCounts = useMemo(() => {
        const counts: Record<string, number> = { all: glossaryTerms.length }
        glossaryTerms.forEach(t => {
            counts[t.category] = (counts[t.category] || 0) + 1
        })
        return counts
    }, [])

    // Schema.org structured data
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'Smart Lock Glossary',
        description: 'Smart lock glossary terms for protocols, grades, door hardware, batteries, credentials, security, and installation.',
        hasDefinedTerm: glossaryTerms.map(t => ({
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition,
        })),
    }

    return (
        <div className="page-wrapper-alt">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link href="/resources">Resources</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">Glossary</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <div className="page-header__icon">
                        <BookOpen className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Glossary</h1>
                    <p className="page-header__subtitle">
                        {glossaryTerms.length}+ industry terms explained with diagrams
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search terms..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg text-base"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                            style={{
                                background: activeCategory === cat.id ? 'var(--color-accent)' : 'var(--color-surface)',
                                color: activeCategory === cat.id ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
                                border: `1px solid ${activeCategory === cat.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            }}
                        >
                            {cat.icon}
                            {cat.label}
                            <span
                                className="ml-1 text-xs px-1.5 py-0.5 rounded-full"
                                style={{
                                    background: activeCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-alt)',
                                    color: activeCategory === cat.id ? 'var(--color-text-on-accent)' : 'var(--color-text-muted)',
                                }}
                            >
                                {termCounts[cat.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                    Showing {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
                    {search && <> matching &quot;<strong>{search}</strong>&quot;</>}
                </p>

                {/* Terms List */}
                <div className="max-w-4xl mx-auto space-y-3">
                    {filteredTerms.length === 0 && (
                        <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                            <p className="text-lg font-medium">No terms found</p>
                            <p className="text-sm mt-1">Try adjusting your search or category filter</p>
                        </div>
                    )}

                    {filteredTerms.map(term => {
                        const isExpanded = expandedTerms.has(term.term)
                        const SVGComponent = term.svg ? svgComponents[term.svg] : null

                        return (
                            <div key={term.term} className="card" style={{ padding: 0 }}>
                                <button
                                    onClick={() => toggleTerm(term.term)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <h3
                                            className="text-base font-bold"
                                            style={{ color: 'var(--color-text-primary)' }}
                                        >
                                            {term.term}
                                        </h3>
                                        <span className="badge badge-default text-xs whitespace-nowrap">
                                            {categories.find(c => c.id === term.category)?.label}
                                        </span>
                                        {term.svg && (
                                            <span className="badge badge-accent text-xs whitespace-nowrap">
                                                Diagram
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                        style={{ color: 'var(--color-text-muted)' }}
                                    />
                                </button>

                                {isExpanded && (
                                    <div className="px-6 pb-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                                        <p className="mt-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                            {term.definition}
                                        </p>

                                        {/* SVG Diagram */}
                                        {SVGComponent && (
                                            <div className="mt-5 p-4 rounded-lg" style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                                                <SVGComponent />
                                            </div>
                                        )}

                                        {/* Related Terms */}
                                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Related:</span>
                                                {term.relatedTerms.map(rt => (
                                                    <button
                                                        key={rt}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSearch(rt)
                                                            setActiveCategory('all')
                                                        }}
                                                        className="text-xs px-2 py-1 rounded-md transition-colors"
                                                        style={{
                                                            background: 'var(--color-accent-subtle)',
                                                            color: 'var(--color-accent-text)',
                                                            border: '1px solid var(--color-accent-muted)',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {rt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="cta-section">
                        <h2 className="cta-section__title">Terms, Tools, Guides</h2>
                        <p className="cta-section__subtitle">
                            Use calculators for door fit, signal range, battery life, cost, and protocol planning.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/calculators" className="btn btn-primary btn-lg">Try Calculators</Link>
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
