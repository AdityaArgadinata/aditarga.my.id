import { BlogItemProps } from '@/common/types/blog';

export const BLOG_DATA: BlogItemProps[] = [
  {
    id: 1,
    date: '2024-01-15T15:30:00',
    modified: '2024-01-15T15:30:00',
    slug: 'building-scalable-next-js-applications',
    status: 'publish',
    link: 'https://aditarga.my.id/blog/building-scalable-next-js-applications',
    title: {
      rendered: 'Building Scalable Next.js Applications'
    },
    content: {
      rendered: '<p>Building scalable Next.js applications requires proper architecture and best practices.</p>',
      markdown: '# Building Scalable Next.js Applications\n\nBuilding scalable Next.js applications requires proper architecture and best practices.',
      protected: false
    },
    excerpt: {
      rendered: '<p>Learn how to build scalable Next.js applications.</p>',
      protected: false
    },
    author: 1,
    featured_media: 1,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {
      footnotes: ''
    },
    categories: [1],
    tags: [1, 2],
    tags_list: [
      {
        term_id: 1,
        name: 'Next.js',
        slug: 'nextjs',
        term_group: 0,
        term_taxonomy_id: 1,
        taxonomy: 'post_tag',
        description: '',
        parent: 0,
        count: 3,
        filter: 'raw'
      }
    ],
    amp_enabled: false,
    featured_image_url: '/images/placeholder.png',
    total_views_count: 1250
  },
  {
    id: 2,
    date: '2024-01-10T10:30:00',
    modified: '2024-01-10T10:30:00',
    slug: 'mastering-typescript-fundamentals',
    status: 'publish',
    link: 'https://aditarga.my.id/blog/mastering-typescript-fundamentals',
    title: {
      rendered: 'Mastering TypeScript: From Fundamentals to Advanced Patterns'
    },
    content: {
      rendered: '<h2>Why TypeScript?</h2><p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.</p>',
      markdown: '## Why TypeScript?\n\nTypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
      protected: false
    },
    excerpt: {
      rendered: '<p>A comprehensive guide to TypeScript fundamentals and advanced patterns.</p>',
      protected: false
    },
    author: 1,
    featured_media: 2,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {
      footnotes: ''
    },
    categories: [2],
    tags: [3, 4],
    tags_list: [
      {
        term_id: 3,
        name: 'TypeScript',
        slug: 'typescript',
        term_group: 0,
        term_taxonomy_id: 3,
        taxonomy: 'post_tag',
        description: '',
        parent: 0,
        count: 5,
        filter: 'raw'
      }
    ],
    amp_enabled: false,
    featured_image_url: '/images/placeholder.png',
    total_views_count: 890
  },
  {
    id: 3,
    date: '2024-01-05T14:20:00',
    modified: '2024-01-05T14:20:00',
    slug: 'modern-css-techniques',
    status: 'publish',
    link: 'https://aditarga.my.id/blog/modern-css-techniques',
    title: {
      rendered: 'Modern CSS Techniques: Grid, Flexbox, and Custom Properties'
    },
    content: {
      rendered: '<h2>The Evolution of CSS</h2><p>CSS has evolved tremendously over the years. Modern CSS provides powerful tools like CSS Grid, Flexbox, and Custom Properties.</p>',
      markdown: '## The Evolution of CSS\n\nCSS has evolved tremendously over the years. Modern CSS provides powerful tools like CSS Grid, Flexbox, and Custom Properties.',
      protected: false
    },
    excerpt: {
      rendered: '<p>Explore modern CSS techniques including CSS Grid, Flexbox, and Custom Properties.</p>',
      protected: false
    },
    author: 1,
    featured_media: 3,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {
      footnotes: ''
    },
    categories: [3],
    tags: [5],
    tags_list: [
      {
        term_id: 5,
        name: 'CSS',
        slug: 'css',
        term_group: 0,
        term_taxonomy_id: 5,
        taxonomy: 'post_tag',
        description: '',
        parent: 0,
        count: 4,
        filter: 'raw'
      }
    ],
    amp_enabled: false,
    featured_image_url: '/images/placeholder.png',
    total_views_count: 675
  }
];

export const getBlogById = (id: number): BlogItemProps | undefined => {
  return BLOG_DATA.find(blog => blog.id === id);
};

export const getBlogBySlug = (slug: string): BlogItemProps | undefined => {
  return BLOG_DATA.find(blog => blog.slug === slug);
};

export const getFeaturedBlogs = (limit = 3): BlogItemProps[] => {
  return BLOG_DATA
    .sort((a, b) => b.total_views_count - a.total_views_count)
    .slice(0, limit);
};

export const searchBlogs = (query: string): BlogItemProps[] => {
  const searchTerm = query.toLowerCase();
  return BLOG_DATA.filter(blog => 
    blog.title.rendered.toLowerCase().includes(searchTerm) ||
    blog.content.rendered.toLowerCase().includes(searchTerm) ||
    blog.excerpt.rendered.toLowerCase().includes(searchTerm)
  );
};

export const getBlogsByCategory = (categoryId: number): BlogItemProps[] => {
  return BLOG_DATA.filter(blog => 
    blog.categories.includes(categoryId)
  );
};

export const paginateBlogs = (
  blogs: BlogItemProps[], 
  page = 1, 
  perPage = 10
): { 
  posts: BlogItemProps[], 
  total_pages: number, 
  total_posts: number, 
  page: number, 
  per_page: number 
} => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);
  
  return {
    posts: paginatedBlogs,
    total_pages: Math.ceil(blogs.length / perPage),
    total_posts: blogs.length,
    page: page,
    per_page: perPage
  };
};
