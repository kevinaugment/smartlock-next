import type { CalculatorRouteSlug } from './slugs'

/**
 * 计算器 ↔ 内容 交叉链接映射
 * 每个计算器关联 2-3 篇文章 + 1-2 个相关计算器
 */

export interface CalculatorLinks {
    articles: Array<{ slug: string; category: string; title: string }>
    calculators: Array<{ slug: string; title: string }>
}

export const calculatorLinksMap: Record<CalculatorRouteSlug, CalculatorLinks> = {
    'lock-tco': {
        articles: [
            { slug: 'rental-property-smart-locks', category: 'use-cases', title: 'Rental Property Smart Locks Hub' },
            { slug: 'cloud-vs-local-cost', category: 'resources', title: 'Cloud vs Local Cost Analysis' },
            { slug: 'kwikset-vs-defiant-smart-locks', category: 'resources', title: 'Kwikset vs Defiant Budget Comparison' },
        ],
        calculators: [
            { slug: 'battery-life', title: 'Battery Runtime Calculator' },
            { slug: 'subscription-compare', title: 'Subscription Comparison' },
        ],
    },
    'battery-life': {
        articles: [
            { slug: 'smart-lock-battery-life-by-brand', category: 'installation', title: 'Battery Life by Brand' },
            { slug: 'smart-lock-battery-life-guide', category: 'installation', title: 'Battery Life Guide' },
            { slug: 'best-smart-locks-for-airbnb-hosts', category: 'use-cases', title: 'Airbnb Battery Planning' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
            { slug: 'emergency-backup', title: 'Emergency Backup Planner' },
        ],
    },
    'protocol-wizard': {
        articles: [
            { slug: 'matter-vs-homekit-vs-zwave-smart-locks', category: 'protocols', title: 'Matter vs HomeKit vs Z-Wave' },
            { slug: 'apple-home-key-smart-locks-guide', category: 'protocols', title: 'Apple Home Key Guide' },
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
        ],
        calculators: [
            { slug: 'signal-strength', title: 'RSSI Signal Strength Calculator' },
            { slug: 'mesh-planner', title: 'Mesh Network Planner' },
        ],
    },
    'signal-strength': {
        articles: [
            { slug: 'best-z-wave-smart-locks-hubs-apartments', category: 'protocols', title: 'Z-Wave Lock Planning' },
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
            { slug: 'smart-lock-keeps-going-offline', category: 'protocols', title: 'Troubleshoot Offline Issues' },
        ],
        calculators: [
            { slug: 'rf-coverage', title: 'Building RF Coverage Planner' },
            { slug: 'ble-range', title: 'Bluetooth Range Estimator' },
        ],
    },
    'str-roi': {
        articles: [
            { slug: 'best-smart-locks-for-airbnb-hosts', category: 'use-cases', title: 'Best Smart Locks for Airbnb Hosts' },
            { slug: 'airbnb-smart-lock-integration-schlage-yale-august', category: 'integration', title: 'Airbnb Smart Lock Integration' },
            { slug: 'smart-locks-airbnb-complete-guide', category: 'use-cases', title: 'Airbnb Complete Guide' },
        ],
        calculators: [
            { slug: 'guest-code', title: 'Guest Code Capacity Planner' },
            { slug: 'lock-tco', title: 'TCO Calculator' },
        ],
    },
    'installation-cost': {
        articles: [
            { slug: 'install-smart-lock-step-by-step', category: 'installation', title: 'Step-by-Step Installation' },
            { slug: 'door-compatibility-guide', category: 'guides', title: 'Door Compatibility Guide' },
            { slug: 'calibrate-smart-lock', category: 'installation', title: 'Calibration Guide' },
        ],
        calculators: [
            { slug: 'door-fit', title: 'Door Measurement Checker' },
            { slug: 'installation-time', title: 'Installation Time Estimator' },
        ],
    },
    'compatibility': {
        articles: [
            { slug: 'door-compatibility-guide', category: 'guides', title: 'Door Compatibility Guide' },
            { slug: 'install-smart-lock-step-by-step', category: 'installation', title: 'Step-by-Step Installation' },
            { slug: 'smart-lock-setup-checklist', category: 'installation', title: 'Setup Checklist' },
        ],
        calculators: [
            { slug: 'door-fit', title: 'Door Measurement Checker' },
            { slug: 'installation-cost', title: 'Installation Cost Calculator' },
        ],
    },
    'mesh-planner': {
        articles: [
            { slug: 'best-z-wave-smart-locks-hubs-apartments', category: 'protocols', title: 'Z-Wave Lock Planning' },
            { slug: 'matter-vs-homekit-vs-zwave-smart-locks', category: 'protocols', title: 'Matter vs HomeKit vs Z-Wave' },
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
        ],
        calculators: [
            { slug: 'rf-coverage', title: 'Building RF Coverage Planner' },
            { slug: 'signal-strength', title: 'RSSI Signal Strength Calculator' },
        ],
    },
    'rf-coverage': {
        articles: [
            { slug: 'best-z-wave-smart-locks-hubs-apartments', category: 'protocols', title: 'Z-Wave Lock Planning' },
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
            { slug: 'smart-lock-keeps-going-offline', category: 'protocols', title: 'Troubleshoot Offline Issues' },
        ],
        calculators: [
            { slug: 'signal-strength', title: 'RSSI Signal Strength Calculator' },
            { slug: 'mesh-planner', title: 'Repeater Placement Planner' },
        ],
    },
    'fleet-planner': {
        articles: [
            { slug: 'multifamily-smart-locks-resident-staff-access', category: 'use-cases', title: 'Multifamily Smart Locks' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
            { slug: 'enterprise-system-integration', category: 'integration', title: 'Enterprise Integration' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
            { slug: 'access-capacity', title: 'Access Capacity Calculator' },
        ],
    },
    'credential-planner': {
        articles: [
            { slug: 'rental-property-smart-locks', category: 'use-cases', title: 'Rental Property Smart Locks Hub' },
            { slug: 'how-to-add-user-code', category: 'guides', title: 'Add User Code Guide' },
            { slug: 'share-access-securely', category: 'guides', title: 'Share Access Securely' },
        ],
        calculators: [
            { slug: 'guest-code', title: 'Guest Code Planner' },
            { slug: 'access-capacity', title: 'Access Capacity Calculator' },
        ],
    },
    'installation-time': {
        articles: [
            { slug: 'install-smart-lock-step-by-step', category: 'installation', title: 'Step-by-Step Installation' },
            { slug: 'test-smart-lock-after-install', category: 'installation', title: 'Post-Install Testing Guide' },
        ],
        calculators: [
            { slug: 'installation-cost', title: 'Installation Cost Calculator' },
            { slug: 'compatibility', title: 'Full Door Compatibility Checker' },
        ],
    },
    'subscription-compare': {
        articles: [
            { slug: 'cloud-vs-local-cost', category: 'resources', title: 'Cloud vs Local Cost Analysis' },
            { slug: 'smart-lock-saas-value', category: 'resources', title: 'Smart Lock SaaS Value Metrics' },
            { slug: 'local-vs-cloud-architecture', category: 'integration', title: 'Local vs Cloud Architecture' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
        ],
    },
    'offline-resilience': {
        articles: [
            { slug: 'smart-lock-disconnects-after-power-outage', category: 'protocols', title: 'Power Outage Recovery' },
            { slug: 'disaster-recovery-business-continuity', category: 'guides', title: 'Disaster Recovery Planning' },
        ],
        calculators: [
            { slug: 'emergency-backup', title: 'Emergency Backup Planner' },
        ],
    },
    'emergency-backup': {
        articles: [
            { slug: 'emergency-battery-died-locked-out', category: 'installation', title: 'Emergency: Battery Died' },
            { slug: 'forgot-master-code-reset', category: 'guides', title: 'Master Code Reset Guide' },
            { slug: 'disaster-recovery-business-continuity', category: 'guides', title: 'Disaster Recovery Planning' },
        ],
        calculators: [
            { slug: 'battery-life', title: 'Battery Runtime Calculator' },
            { slug: 'offline-resilience', title: 'Offline Resilience Planner' },
        ],
    },
    'access-capacity': {
        articles: [
            { slug: 'multifamily-smart-locks-resident-staff-access', category: 'use-cases', title: 'Multifamily Smart Locks' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
            { slug: 'how-to-add-user-code', category: 'guides', title: 'Add User Code Guide' },
        ],
        calculators: [
            { slug: 'fleet-planner', title: 'Fleet Planner' },
            { slug: 'credential-planner', title: 'Credential Planner' },
        ],
    },
    'security-compliance': {
        articles: [
            { slug: 'smart-lock-compliance-hub', category: 'security', title: 'Smart Lock Compliance Hub' },
            { slug: 'smart-lock-insurance-liability-landlords-airbnb', category: 'security', title: 'Insurance & Liability Guide' },
            { slug: 'data-privacy-compliance-guide', category: 'security', title: 'Data Privacy & Compliance' },
        ],
        calculators: [
            { slug: 'fire-compliance', title: 'Fire Code Compliance Checker' },
        ],
    },
    'lock-compare': {
        articles: [
            { slug: 'schlage-vs-yale-smart-locks', category: 'resources', title: 'Schlage vs Yale Comparison' },
            { slug: 'kwikset-vs-defiant-smart-locks', category: 'resources', title: 'Kwikset vs Defiant Comparison' },
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
            { slug: 'protocol-wizard', title: 'Protocol Selection Wizard' },
        ],
    },
    'warranty-lifecycle': {
        articles: [
            { slug: 'clean-maintain-smart-lock', category: 'installation', title: 'Maintenance Guide' },
            { slug: 'update-smart-lock-firmware', category: 'installation', title: 'Firmware Update Guide' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
        ],
    },
    'network-bandwidth': {
        articles: [
            { slug: 'local-vs-cloud-architecture', category: 'integration', title: 'Local vs Cloud Architecture' },
            { slug: 'enterprise-system-integration', category: 'integration', title: 'Enterprise Integration' },
        ],
        calculators: [
            { slug: 'mesh-planner', title: 'Mesh Network Planner' },
            { slug: 'poe-power', title: 'Hardwired PoE Power Budget' },
        ],
    },
    'poe-power': {
        articles: [
            { slug: 'hotel-smart-lock-roi-mobile-keys-vs-keycards', category: 'use-cases', title: 'Hotel Smart Lock ROI' },
            { slug: 'enterprise-system-integration', category: 'integration', title: 'Enterprise Integration' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
        ],
        calculators: [
            { slug: 'network-bandwidth', title: 'Network Bandwidth Calculator' },
            { slug: 'fleet-planner', title: 'Fleet Planner' },
        ],
    },
    'fire-compliance': {
        articles: [
            { slug: 'smart-lock-compliance-hub', category: 'security', title: 'Smart Lock Compliance Hub' },
            { slug: 'california-vacation-rental-smart-lock-compliance', category: 'use-cases', title: 'California Vacation Rental Compliance' },
            { slug: 'smart-lock-insurance-liability-landlords-airbnb', category: 'security', title: 'Insurance & Liability Guide' },
        ],
        calculators: [
            { slug: 'security-compliance', title: 'Security Compliance Checker' },
        ],
    },
    'guest-code': {
        articles: [
            { slug: 'best-smart-locks-for-airbnb-hosts', category: 'use-cases', title: 'Best Smart Locks for Airbnb Hosts' },
            { slug: 'airbnb-smart-lock-integration-schlage-yale-august', category: 'integration', title: 'Airbnb Smart Lock Integration' },
            { slug: 'create-temporary-guest-code', category: 'guides', title: 'Guest Code Setup' },
        ],
        calculators: [
            { slug: 'str-roi', title: 'STR ROI Calculator' },
            { slug: 'credential-planner', title: 'Credential Planner' },
        ],
    },
    'ble-range': {
        articles: [
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
        ],
        calculators: [
            { slug: 'signal-strength', title: 'RSSI Signal Strength Calculator' },
            { slug: 'rf-coverage', title: 'Building RF Coverage Planner' },
        ],
    },
    'hotel-roi': {
        articles: [
            { slug: 'hotel-smart-lock-roi-mobile-keys-vs-keycards', category: 'use-cases', title: 'Hotel Mobile Key ROI Guide' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
            { slug: 'enterprise-system-integration', category: 'integration', title: 'Enterprise Integration' },
        ],
        calculators: [
            { slug: 'fleet-planner', title: 'Fleet Planner' },
            { slug: 'access-capacity', title: 'Access Capacity Calculator' },
        ],
    },
    'door-fit': {
        articles: [
            { slug: 'door-compatibility-guide', category: 'guides', title: 'Door Compatibility Guide' },
            { slug: 'standard-door-dimensions-table', category: 'resources', title: 'Standard Door Dimensions' },
            { slug: 'hidden-installation-costs', category: 'resources', title: 'Hidden Installation Costs' },
        ],
        calculators: [
            { slug: 'compatibility', title: 'Full Door Compatibility Checker' },
            { slug: 'installation-cost', title: 'Installation Cost Calculator' },
        ],
    },
    'retrofit-advisor': {
        articles: [
            { slug: 'renter-friendly-smart-locks-no-drill-apartments', category: 'use-cases', title: 'Renter-Friendly Smart Locks' },
            { slug: 'rental-property-smart-locks', category: 'use-cases', title: 'Rental Property Smart Locks Hub' },
            { slug: 'door-compatibility-guide', category: 'guides', title: 'Door Compatibility Guide' },
        ],
        calculators: [
            { slug: 'door-fit', title: 'Door Measurement Checker' },
            { slug: 'installation-cost', title: 'Installation Cost Calculator' },
        ],
    },
    'privacy-compliance': {
        articles: [
            { slug: 'data-privacy-compliance-guide', category: 'security', title: 'Data Privacy & Compliance' },
            { slug: 'privacy-policy-template', category: 'resources', title: 'Privacy Policy Template' },
            { slug: 'smart-lock-compliance-hub', category: 'security', title: 'Smart Lock Compliance Hub' },
        ],
        calculators: [
            { slug: 'cyber-risk', title: 'Cyber Risk Scorecard' },
            { slug: 'credential-planner', title: 'Credential Planner' },
        ],
    },
    'cyber-risk': {
        articles: [
            { slug: 'smart-lock-security-complete-analysis', category: 'security', title: 'Smart Lock Security Analysis' },
            { slug: 'secure-smart-lock-best-practices', category: 'security', title: 'Security Best Practices' },
            { slug: 'encryption-standards-guide', category: 'resources', title: 'Encryption Standards Guide' },
        ],
        calculators: [
            { slug: 'security-compliance', title: 'Security Compliance Checker' },
            { slug: 'pin-strength', title: 'PIN Strength Checker' },
        ],
    },
    'pin-strength': {
        articles: [
            { slug: 'secure-smart-lock-best-practices', category: 'security', title: 'Security Best Practices' },
            { slug: 'multiple-failed-code-attempts', category: 'security', title: 'Failed Code Attempts' },
            { slug: 'smart-lock-code-not-working', category: 'guides', title: 'Smart Lock Code Troubleshooting' },
        ],
        calculators: [
            { slug: 'guest-code', title: 'Guest Code Planner' },
            { slug: 'credential-planner', title: 'Credential Planner' },
        ],
    },
    'energy-cost': {
        articles: [
            { slug: 'protocol-power-draw-table', category: 'resources', title: 'Protocol Power Draw Table' },
            { slug: 'what-is-quiescent-current', category: 'resources', title: 'Quiescent Current Explained' },
            { slug: 'wire-gauge-calculator-steps', category: 'resources', title: 'Wire Gauge Planning Steps' },
        ],
        calculators: [
            { slug: 'battery-life', title: 'Battery Runtime Calculator' },
            { slug: 'poe-power', title: 'Hardwired PoE Power Budget' },
        ],
    },
    'noise-level': {
        articles: [
            { slug: 'lock-motor-noise-troubleshooting', category: 'guides', title: 'Lock Motor Noise Troubleshooting' },
            { slug: 'door-alignment-guide', category: 'resources', title: 'Door Alignment Guide' },
            { slug: 'hotel-smart-lock-roi-mobile-keys-vs-keycards', category: 'use-cases', title: 'Hotel Smart Lock ROI' },
        ],
        calculators: [
            { slug: 'lock-compare', title: 'Lock Comparison Tool' },
            { slug: 'compatibility', title: 'Full Door Compatibility Checker' },
        ],
    },
}
