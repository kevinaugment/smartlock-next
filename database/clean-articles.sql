-- 清理文章数据（保留表结构）
DELETE FROM article_tags;
DELETE FROM tags;
DELETE FROM articles;

-- 重置自增ID
DELETE FROM sqlite_sequence WHERE name IN ('articles', 'tags', 'article_tags');
