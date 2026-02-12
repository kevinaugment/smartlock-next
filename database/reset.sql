-- Drop tables in reverse dependency order to avoid FK constraint errors
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS analytics;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS navigation;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS calculator_tools;
DROP TABLE IF EXISTS calculator_articles;
DROP TABLE IF EXISTS calculators;
DROP TABLE IF EXISTS article_relations;
DROP TABLE IF EXISTS article_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
