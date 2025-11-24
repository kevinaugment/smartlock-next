import { ArticleMetadata } from '@/lib/articles/types';
import { Clock, Calendar, Tag } from 'lucide-react';

interface ArticleHeaderProps {
  article: ArticleMetadata;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      {/* 分类标签 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {article.category}
        </span>
        {article.isPillar && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            ⭐ Pillar Article
          </span>
        )}
        {article.featured && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            ✨ Featured
          </span>
        )}
      </div>

      {/* 标题 */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {article.title}
      </h1>

      {/* 描述 */}
      <p className="text-xl text-gray-600 mb-6 leading-relaxed">
        {article.description}
      </p>

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={article.pubDate}>
            {new Date(article.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{article.readingTime} min read</span>
        </div>

        <div className="flex items-center gap-2">
          <span>{article.wordCount.toLocaleString()} words</span>
        </div>
      </div>

      {/* 标签 */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <Tag className="w-4 h-4 text-gray-400" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
