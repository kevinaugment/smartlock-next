'use client';

import { useState, useCallback, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { type Components } from 'react-markdown';
import { Copy, Check, ChevronRight } from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

/* ── Copy Button for Code Blocks ─────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select-and-copy
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="code-copy-btn"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span className="code-copy-btn__label">Copied!</span>
        </>
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

/* ── Collapsible Section ─────────────────────────────────── */
function CollapsibleDetails({ children, ...props }: { children?: ReactNode; open?: boolean }) {
  return (
    <details className="collapsible" {...props}>
      {children}
    </details>
  );
}

function CollapsibleSummary({ children }: { children?: ReactNode }) {
  return (
    <summary className="collapsible__trigger">
      <ChevronRight className="collapsible__chevron" />
      <span>{children}</span>
    </summary>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export function ArticleContent({ content }: ArticleContentProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1
        className="text-4xl font-bold mt-8 mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-3xl font-bold mt-8 mb-4"
        id={String(children).toLowerCase().replace(/\s+/g, '-')}
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-2xl font-semibold mt-6 mb-3"
        id={String(children).toLowerCase().replace(/\s+/g, '-')}
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className="text-xl font-semibold mt-4 mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 text-lg">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="callout callout-info">
        {children}
      </blockquote>
    ),
    // Code blocks with copy button
    pre: ({ children }) => {
      // Extract text content from the code element for copying
      const extractText = (node: ReactNode): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object' && 'props' in node) {
          return extractText((node as any).props.children);
        }
        return '';
      };
      const codeText = extractText(children).trim();

      return (
        <div className="code-block-wrapper">
          <CopyButton text={codeText} />
          <pre className="mb-4">{children}</pre>
        </div>
      );
    },
    code: ({ inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code
            className="px-2 py-1 rounded text-sm"
            style={{
              background: 'var(--color-accent-subtle)',
              color: 'var(--color-accent-text)',
              fontFamily: 'var(--font-mono)',
            }}
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code
          className="block p-4 rounded-lg overflow-x-auto text-sm"
          style={{
            background: 'var(--color-bg-dark)',
            color: 'var(--color-text-inverse)',
            fontFamily: 'var(--font-mono)',
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
    // Collapsible sections via <details>/<summary>
    details: CollapsibleDetails as any,
    summary: CollapsibleSummary as any,
    a: ({ href, children }) => (
      <a
        href={href}
        style={{ color: 'var(--color-accent)' }}
        className="hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="data-table">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead>{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr>{children}</tr>
    ),
    th: ({ children }) => (
      <th>{children}</th>
    ),
    td: ({ children }) => (
      <td>{children}</td>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto my-6"
        style={{ borderRadius: 'var(--radius-md)' }}
      />
    ),
    hr: () => (
      <hr className="my-8" style={{ borderColor: 'var(--color-border)' }} />
    ),
    strong: ({ children }) => (
      <strong className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </em>
    ),
  };

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
