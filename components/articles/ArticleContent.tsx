'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type Components } from 'react-markdown';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-900" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-4 text-gray-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 text-lg">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 bg-blue-50">
        {children}
      </blockquote>
    ),
    code: ({ inline, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="mb-4">{children}</pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-gray-200">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-gray-900 border border-gray-300">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-gray-700 border border-gray-300">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-6"
      />
    ),
    hr: () => (
      <hr className="my-8 border-t-2 border-gray-300" />
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
  };

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
