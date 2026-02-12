-- 1. Create Resources Category
INSERT INTO categories (name, slug, description, icon, display_order)
VALUES ('Resources', 'resources', 'Technical references, data tables, and glossaries.', '📚', 99)
ON CONFLICT(slug) DO UPDATE SET description = excluded.description;

-- 2. Create Tags
INSERT INTO tags (name, slug) VALUES 
('Data Table', 'data-table'),
('Glossary', 'glossary'),
('Decision Guide', 'decision-guide'),
('Standard', 'standard')
ON CONFLICT(slug) DO NOTHING;
