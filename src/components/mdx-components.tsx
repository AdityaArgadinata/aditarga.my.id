import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Custom components for MDX
const mdxComponents: MDXComponents = {
  // Override default HTML elements
  h1: ({ children }) => (
    <h1 className='mb-6 mt-8 text-4xl font-bold text-gray-900 dark:text-white'>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className='mb-4 mt-6 text-3xl font-semibold text-gray-900 dark:text-white'>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className='mb-3 mt-4 text-2xl font-semibold text-gray-900 dark:text-white'>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className='mb-2 mt-3 text-xl font-medium text-gray-900 dark:text-white'>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className='mb-4 leading-relaxed text-gray-700 dark:text-gray-300'>
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || ''}
      className='text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className='mb-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='mb-4 list-inside list-decimal space-y-1 text-gray-700 dark:text-gray-300'>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='ml-4'>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className='mb-4 rounded-r border-l-4 border-blue-500 bg-gray-50 py-2 pl-4 italic text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className='rounded bg-gray-100 px-2 py-1 font-mono text-sm text-blue-600 dark:bg-gray-800 dark:text-blue-400'>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className='mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100'>
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <div className='my-8'>
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className='rounded-lg'
      />
    </div>
  ),
  table: ({ children }) => (
    <div className='mb-4 overflow-x-auto'>
      <table className='min-w-full border border-gray-300 dark:border-gray-600'>
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className='border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold dark:border-gray-600 dark:bg-gray-800'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
      {children}
    </td>
  ),
  hr: () => <hr className='my-8 border-gray-300 dark:border-gray-600' />,

  // Custom components
  callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'error' | 'success';
    children: React.ReactNode;
  }) => {
    const colors = {
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
      warning:
        'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
      error:
        'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
      success:
        'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    };

    return (
      <div className={`mb-4 rounded-r border-l-4 p-4 ${colors[type]}`}>
        {children}
      </div>
    );
  },
};

export default mdxComponents;
