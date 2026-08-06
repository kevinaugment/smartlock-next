import { ArticleMetadata } from '@/lib/articles/types';
import { Clock, Calendar, Tag, Star, Sparkles, UserRound } from 'lucide-react';

interface ArticleHeaderProps {
  article: ArticleMetadata;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const freshnessDate = article.updatedAt || article.pubDate;
  const showPublishedDate = article.updatedAt && article.updatedAt !== article.pubDate;
  const authorName = article.author || 'SLockHub Editorial Team';

  return (
    <header className="mb-12">
      {/* Category & Badges */}
      <div className="flex items-center gap-2 mb-4">
        <span className="badge badge-accent">{article.category}</span>
        {article.isPillar && (
          <span className="badge" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
            <Star className="w-3 h-3" /> Pillar Article
          </span>
        )}
        {article.featured && (
          <span className="badge" style={{ background: 'var(--color-warning-subtle)', color: 'var(--color-warning-text)' }}>
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.025em' }}
      >
        {article.title}
      </h1>

      {/* Description */}
      <p className="text-xl mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
        {article.description}
      </p>

      {/* Meta Info */}
      <div
        className="flex flex-wrap items-center gap-6 text-sm pb-6"
        style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2">
          <UserRound className="w-4 h-4" />
          <span>By</span>
          <span>{authorName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{showPublishedDate ? 'Updated' : 'Published'}</span>
          <time dateTime={freshnessDate}>
            {new Date(freshnessDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {showPublishedDate && (
          <div className="flex items-center gap-2">
            <span>Published</span>
            <time dateTime={article.pubDate}>
              {new Date(article.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{article.readingTime} min read</span>
        </div>

        <div>
          <span>{article.wordCount.toLocaleString()} words</span>
        </div>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <Tag className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
