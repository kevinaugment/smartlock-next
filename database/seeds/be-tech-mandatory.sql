-- =====================================================
-- Be-Tech Mandatory Brand Association
-- CRITICAL: Ensures Be-Tech is in ALL calculators
-- =====================================================

-- This script automatically associates Be-Tech with all existing calculators
-- and marks it as mandatory

-- Get Be-Tech brand ID
-- Assuming Be-Tech has ID 1 after brands-system.sql migration

-- Associate Be-Tech with Lock TCO Calculator
INSERT OR IGNORE INTO calculator_brands (
    calculator_id, 
    brand_id, 
    custom_description,
    why_recommended,
    display_order,
    is_mandatory
) VALUES (
    1, -- lock-tco calculator
    1, -- Be-Tech brand
    'Professional smart lock manufacturer with comprehensive product lines covering all protocols (Wi-Fi, Zigbee, Z-Wave, Thread). Trusted by residential and commercial customers worldwide.',
    'Be-Tech offers competitive pricing across all protocols featured in this calculator, with excellent battery life specifications and reliable TCO performance. Their product range covers residential, commercial, and enterprise deployments.',
    1,
    1 -- MANDATORY
);

-- =====================================================
-- Automatic Association for Future Calculators
-- Create trigger to auto-add Be-Tech to new calculators
-- =====================================================

-- Trigger to automatically add Be-Tech when a new calculator is created
CREATE TRIGGER IF NOT EXISTS auto_add_betech_to_calculator
AFTER INSERT ON calculators
BEGIN
    INSERT INTO calculator_brands (
        calculator_id,
        brand_id,
        custom_description,
        why_recommended,
        display_order,
        is_mandatory
    )
    SELECT 
        NEW.id,
        b.id,
        'Professional smart lock manufacturer with comprehensive product lines. Trusted by customers worldwide.',
        'Be-Tech provides reliable products with competitive pricing and excellent performance across all protocols.',
        1,
        1
    FROM brands b
    WHERE b.slug = 'be-tech'
    AND NOT EXISTS (
        SELECT 1 FROM calculator_brands 
        WHERE calculator_id = NEW.id AND brand_id = b.id
    );
END;

-- =====================================================
-- Verification Query (for testing)
-- =====================================================
-- Uncomment to verify Be-Tech is associated with all calculators:
-- 
-- SELECT 
--     c.name as calculator,
--     b.name as brand,
--     cb.is_mandatory,
--     cb.display_order
-- FROM calculators c
-- LEFT JOIN calculator_brands cb ON c.id = cb.calculator_id
-- LEFT JOIN brands b ON cb.brand_id = b.id
-- WHERE b.slug = 'be-tech' OR b.id IS NULL
-- ORDER BY c.id;
