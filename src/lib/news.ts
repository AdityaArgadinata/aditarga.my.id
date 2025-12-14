import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

export interface NewsPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  featured: boolean;
  author: string;
  tags: string[];
  image?: string;
  content: MDXRemoteSerializeResult;
  readingTime: number;
  frontMatter: Record<string, unknown>;
}

export interface NewsPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  featured: boolean;
  author: string;
  tags: string[];
  image?: string;
  readingTime: number;
}

const contentDirectory = path.join(process.cwd(), 'content/news');

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Get all news post slugs
export const getNewsSlugs = (): string[] => {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
};

// Get news post metadata (without serialized content)
export const getNewsMeta = (slug: string): NewsPostMeta | null => {
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
      author: data.author || 'Aditya Argadinata',
      tags: data.tags || [],
      image: data.image,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    // Return null if news post metadata not found
    return null;
  }
};

// Get news post with serialized MDX content
export const getNewsBySlug = async (slug: string): Promise<NewsPost | null> => {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      published: data.published ?? true,
      featured: data.featured ?? false,
      author: data.author || 'Aditya Argadinata',
      tags: data.tags || [],
      image: data.image,
      content: mdxSource,
      readingTime: calculateReadingTime(content),
      frontMatter: data,
    };
  } catch (error) {
    // Return null if news post not found
    return null;
  }
};

// Get all news posts metadata
export const getAllNewsMeta = (): NewsPostMeta[] => {
  const slugs = getNewsSlugs();

  return slugs
    .map((slug) => getNewsMeta(slug))
    .filter((post): post is NewsPostMeta => post !== null)
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get featured news posts metadata
export const getFeaturedNewsMeta = (): NewsPostMeta[] => {
  return getAllNewsMeta().filter((post) => post.featured);
};

// Get news posts by tag
export const getNewsMetaByTag = (tag: string): NewsPostMeta[] => {
  return getAllNewsMeta().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
};

// Get all unique tags
export const getAllNewsTags = (): string[] => {
  const posts = getAllNewsMeta();
  const tags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
};
