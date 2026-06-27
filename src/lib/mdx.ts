import fs from 'fs';
import { load } from 'js-yaml';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
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
  image: string | null;
  content: MDXRemoteSerializeResult;
  readingTime: number;
  frontMatter: Record<string, unknown>;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  featured: boolean;
  author: string;
  tags: string[];
  image: string | null;
  readingTime: number;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

type FrontMatter = Record<string, unknown>;

const parseFrontMatter = (
  fileContents: string,
): { data: FrontMatter; content: string } => {
  const frontMatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!frontMatterMatch) {
    return {
      data: {},
      content: fileContents,
    };
  }

  const parsed = load(frontMatterMatch[1]);

  return {
    data: parsed && typeof parsed === 'object' ? (parsed as FrontMatter) : {},
    content: fileContents.slice(frontMatterMatch[0].length),
  };
};

const getString = (data: FrontMatter, key: string, fallback = ''): string => {
  const value = data[key];
  return typeof value === 'string' ? value : fallback;
};

const getBoolean = (
  data: FrontMatter,
  key: string,
  fallback: boolean,
): boolean => {
  const value = data[key];
  return typeof value === 'boolean' ? value : fallback;
};

const getStringArray = (data: FrontMatter, key: string): string[] => {
  const value = data[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
};

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

// Get blog post metadata (without serialized content)
export const getBlogMeta = (slug: string): BlogPostMeta | null => {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontMatter(fileContents);

    return {
      slug,
      title: getString(data, 'title'),
      description: getString(data, 'description'),
      date: getString(data, 'date'),
      published: getBoolean(data, 'published', true),
      featured: getBoolean(data, 'featured', false),
      author: getString(data, 'author', 'Aditya Argadinata'),
      tags: getStringArray(data, 'tags'),
      image: getString(data, 'image') || null,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    // Return null if blog post metadata not found
    return null;
  }
};

// Get blog post with serialized MDX content
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontMatter(fileContents);

    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    return {
      slug,
      title: getString(data, 'title'),
      description: getString(data, 'description'),
      date: getString(data, 'date'),
      published: getBoolean(data, 'published', true),
      featured: getBoolean(data, 'featured', false),
      author: getString(data, 'author', 'Aditya Argadinata'),
      tags: getStringArray(data, 'tags'),
      image: getString(data, 'image') || null,
      content: mdxSource,
      readingTime: calculateReadingTime(content),
      frontMatter: data,
    };
  } catch {
    // Return null if blog post not found
    return null;
  }
};

// Get all blog posts metadata
export const getAllBlogsMeta = (): BlogPostMeta[] => {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => getBlogMeta(slug))
    .filter((post): post is BlogPostMeta => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get featured blog posts metadata
export const getFeaturedBlogsMeta = (): BlogPostMeta[] => {
  return getAllBlogsMeta().filter((post) => post.featured);
};

// Get blog posts by tag
export const getBlogsMetaByTag = (tag: string): BlogPostMeta[] => {
  return getAllBlogsMeta().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const allPosts = getAllBlogsMeta();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).sort();
};

// Search blog posts
export const searchBlogsMeta = (query: string): BlogPostMeta[] => {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    return getAllBlogsMeta();
  }

  return getAllBlogsMeta().filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
};

// Paginate blog posts
export const getPaginatedBlogsMeta = (
  page = 1,
  perPage = 6,
): {
  posts: BlogPostMeta[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNext: boolean;
  hasPrev: boolean;
} => {
  const allPosts = getAllBlogsMeta();
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
