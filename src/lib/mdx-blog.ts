import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  featured: boolean;
  author: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime: number;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Get all blog post slugs
export const getBlogSlugs = (): string[] => {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
};

// Get blog post by slug
export const getBlogBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      published: data.published ?? true,
      featured: data.featured ?? false,
      author: data.author || '',
      tags: data.tags || [],
      image: data.image,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    // Return null if blog post not found
    return null;
  }
};

// Get all blog posts
export const getAllBlogs = (): BlogPost[] => {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get featured blog posts
export const getFeaturedBlogs = (): BlogPost[] => {
  return getAllBlogs().filter((post) => post.featured);
};

// Get blog posts by tag
export const getBlogsByTag = (tag: string): BlogPost[] => {
  return getAllBlogs().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const allPosts = getAllBlogs();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
};

// Search blog posts
export const searchBlogs = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    return getAllBlogs();
  }

  return getAllBlogs().filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
};

// Paginate blog posts
export const getPaginatedBlogs = (
  page = 1,
  perPage = 6,
): {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNext: boolean;
  hasPrev: boolean;
} => {
  const allPosts = getAllBlogs();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};
