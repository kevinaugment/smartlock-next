/**
 * 计算器 ↔ 内容 交叉链接映射
 * 每个计算器关联 2-3 篇文章 + 1-2 个相关计算器
 */

export interface CalculatorLinks {
    articles: Array<{ slug: string; category: string; title: string }>
    calculators: Array<{ slug: string; title: string }>
}

export const calculatorLinksMap: Record<string, CalculatorLinks> = {
    'lock-tco': {
        articles: [
            { slug: 'cloud-vs-local-cost', category: 'resources', title: 'Cloud vs Local Cost Analysis' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
            { slug: 'smart-lock-battery-life-guide', category: 'installation', title: 'Battery Life Guide' },
        ],
        calculators: [
            { slug: 'battery-life', title: 'Battery Life Calculator' },
            { slug: 'subscription-compare', title: 'Subscription Comparison' },
        ],
    },
    'battery-life': {
        articles: [
            { slug: 'smart-lock-battery-life-guide', category: 'installation', title: 'Battery Life Guide' },
            { slug: 'how-to-change-smart-lock-battery', category: 'installation', title: 'How to Change Battery' },
            { slug: 'emergency-battery-died-locked-out', category: 'installation', title: 'Emergency: Battery Died' },
        ],
        calculators: [
            { slug: 'lock-tco', title: 'TCO Calculator' },
            { slug: 'emergency-backup', title: 'Emergency Backup Planner' },
        ],
    },
    'protocol-wizard': {
        articles: [
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
            { slug: 'zigbee-vs-zwave-comparison', category: 'protocols', title: 'Zigbee vs Z-Wave Comparison' },
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
        ],
        calculators: [
            { slug: 'signal-strength', title: 'Signal Strength Calculator' },
            { slug: 'mesh-planner', title: 'Mesh Network Planner' },
        ],
    },
    'signal-strength': {
        articles: [
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
            { slug: 'smart-lock-keeps-going-offline', category: 'protocols', title: 'Troubleshoot Offline Issues' },
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
        ],
        calculators: [
            { slug: 'rf-coverage', title: 'RF Coverage Planner' },
            { slug: 'ble-range', title: 'BLE Range Calculator' },
        ],
    },
    'str-roi': {
        articles: [
            { slug: 'smart-locks-airbnb-complete-guide', category: 'use-cases', title: 'Airbnb Complete Guide' },
            { slug: 'long-term-rental-strategy', category: 'use-cases', title: 'Rental Strategy Guide' },
            { slug: 'create-temporary-guest-code', category: 'guides', title: 'Guest Code Setup' },
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
            { slug: 'compatibility', title: 'Compatibility Checker' },
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
            { slug: 'installation-cost', title: 'Installation Cost Calculator' },
            { slug: 'lock-compare', title: 'Lock Comparison Tool' },
        ],
    },
    'mesh-planner': {
        articles: [
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
            { slug: 'zigbee-vs-zwave-comparison', category: 'protocols', title: 'Zigbee vs Z-Wave Comparison' },
        ],
        calculators: [
            { slug: 'rf-coverage', title: 'RF Coverage Planner' },
            { slug: 'signal-strength', title: 'Signal Strength Calculator' },
        ],
    },
    'rf-coverage': {
        articles: [
            { slug: 'improve-connection-stability', category: 'protocols', title: 'Connection Stability Guide' },
            { slug: 'smart-lock-keeps-going-offline', category: 'protocols', title: 'Troubleshoot Offline Issues' },
        ],
        calculators: [
            { slug: 'signal-strength', title: 'Signal Strength Calculator' },
            { slug: 'mesh-planner', title: 'Mesh Network Planner' },
        ],
    },
    'fleet-planner': {
        articles: [
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
            { slug: 'how-to-add-user-code', category: 'guides', title: 'Add User Code Guide' },
            { slug: 'share-access-securely', category: 'guides', title: 'Share Access Securely' },
            { slug: 'delete-smart-lock-user', category: 'guides', title: 'Delete User Guide' },
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
            { slug: 'compatibility', title: 'Compatibility Checker' },
        ],
    },
    'subscription-compare': {
        articles: [
            { slug: 'cloud-vs-local-cost', category: 'resources', title: 'Cloud vs Local Cost Analysis' },
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
            { slug: 'battery-life', title: 'Battery Life Calculator' },
            { slug: 'offline-resilience', title: 'Offline Resilience Planner' },
        ],
    },
    'access-capacity': {
        articles: [
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
            { slug: 'data-privacy-compliance-guide', category: 'security', title: 'Data Privacy & Compliance' },
            { slug: 'smart-lock-security-complete-analysis', category: 'security', title: 'Security Complete Analysis' },
            { slug: 'audit-trail-forensic-analysis', category: 'security', title: 'Audit Trail Analysis' },
        ],
        calculators: [
            { slug: 'fire-compliance', title: 'Fire Code Compliance Checker' },
        ],
    },
    'lock-compare': {
        articles: [
            { slug: 'smart-lock-protocols-overview', category: 'protocols', title: 'Protocol Overview' },
            { slug: 'door-compatibility-guide', category: 'guides', title: 'Door Compatibility Guide' },
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
            { slug: 'poe-power', title: 'PoE Power Budget Calculator' },
        ],
    },
    'poe-power': {
        articles: [
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
            { slug: 'data-privacy-compliance-guide', category: 'security', title: 'Data Privacy & Compliance' },
            { slug: 'enterprise-commercial-deployment', category: 'use-cases', title: 'Enterprise Deployment Guide' },
        ],
        calculators: [
            { slug: 'security-compliance', title: 'Security Compliance Checker' },
        ],
    },
    'guest-code': {
        articles: [
            { slug: 'create-temporary-guest-code', category: 'guides', title: 'Guest Code Setup' },
            { slug: 'smart-locks-airbnb-complete-guide', category: 'use-cases', title: 'Airbnb Complete Guide' },
            { slug: 'multiple-failed-code-attempts', category: 'security', title: 'Failed Code Attempts' },
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
            { slug: 'signal-strength', title: 'Signal Strength Calculator' },
            { slug: 'rf-coverage', title: 'RF Coverage Planner' },
        ],
    },
}
