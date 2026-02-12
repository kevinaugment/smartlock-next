-- Insert missing calculators
INSERT INTO calculators (name, slug, description, icon, category_id, component_name) VALUES 
('Signal Strength Analyzer', 'signal-strength-analyzer', 'Analyze and optimize your smart lock wireless signal strength.', 'signal', (SELECT id FROM categories WHERE slug = 'connectivity'), 'SignalCalculator'),
('Installation Cost Estimator', 'installation-cost-estimator', 'Calculate total cost of smart lock installation.', 'dollar-sign', (SELECT id FROM categories WHERE slug = 'planning'), 'InstallationCalculator'),
('Subscription vs Purchase', 'subscription-vs-purchase-calculator', 'Compare long-term costs of cloud vs local systems.', 'scale', (SELECT id FROM categories WHERE slug = 'planning'), 'SubscriptionCalculator');
