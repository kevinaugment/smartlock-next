import fs from 'fs';
import path from 'path';

const mappings = {
    'battery-life': 'battery-life-comparison',
    'compatibility': 'door-lock-compatibility-checker',
    'credential-planner': 'credential-capacity-planner',
    'emergency-backup': 'emergency-backup-evaluator',
    'fleet-planner': 'multi-property-fleet-planner',
    'installation-time': 'installation-time-estimator',
    'lock-tco': 'lock-tco-calculator',
    'mesh-planner': 'mesh-node-planner',
    'offline-resilience': 'offline-resilience-scorecard',
    'protocol-wizard': 'protocol-selection-wizard',
    'rf-coverage': 'rf-coverage-estimator',
    'str-roi': 'short-term-rental-roi-calculator',
    'signal-strength': 'signal-strength-analyzer',
    'installation-cost': 'installation-cost-estimator',
    'subscription-compare': 'subscription-vs-purchase-calculator'
};

const baseDir = path.join(process.cwd(), 'app/calculators');

function inject(folder: string, slug: string) {
    const filePath = path.join(baseDir, folder, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Import
    if (!content.includes('RelatedResources')) {
        // Find last import
        const lastImportIdx = content.lastIndexOf('import ');
        const endOfImportLine = content.indexOf('\n', lastImportIdx);

        // Check if we can safely insert
        const importStmt = "import { RelatedResources } from '@/components/calculators/RelatedResources'\n";
        content = content.slice(0, endOfImportLine + 1) + importStmt + content.slice(endOfImportLine + 1);
    } else {
        console.log(`RelatedResources already imported in ${folder}`);
    }

    // 2. Inject Component
    if (content.includes(`<RelatedResources calculatorSlug="${slug}"`)) {
        console.log(`RelatedResources already injected in ${folder}`);
        return;
    }

    // Strategy: 
    // 1. Look for specific comment `{/* Related ... */}`
    // 2. Look for `<ToolRating ... />` and insert AFTER it (fallback)

    const commentMatch = content.match(/{\/\*\s*(Related|More).*(Tools|Calculators|Resources).*\s*\*\/}/i);
    if (commentMatch) {
        const insertIdx = commentMatch.index;
        const injection = `\n          <RelatedResources calculatorSlug="${slug}" />\n\n`;
        content = content.slice(0, insertIdx) + injection + content.slice(insertIdx);
        fs.writeFileSync(filePath, content);
        console.log(`Injected into ${folder} using comment`);
        return;
    }

    // Fallback: ToolRating
    const ratingMatch = content.match(/<ToolRating[^>]*\/>/);
    if (ratingMatch && typeof ratingMatch.index === 'number') {
        const insertIdx = ratingMatch.index + ratingMatch[0].length;
        // Check if "Brand Recommendation" follows?
        // Just put it after. It will be between Rating and Brand/Related.
        const injection = `\n\n          <RelatedResources calculatorSlug="${slug}" />`;
        content = content.slice(0, insertIdx) + injection + content.slice(insertIdx);
        fs.writeFileSync(filePath, content);
        console.log(`Injected into ${folder} after ToolRating (Fallback)`);
        return;
    }

    console.warn(`Could not find insertion point for ${folder}`);
}

Object.entries(mappings).forEach(([folder, slug]) => {
    if (folder === 'battery-life') return; // Already done
    console.log(`Processing ${folder}...`);
    inject(folder, slug);
});
