import type { NextApiRequest, NextApiResponse } from 'next';

import { BLOG_DATA, getBlogsByCategory, paginateBlogs, searchBlogs } from '@/common/constant/blog';
import { BlogItemProps } from '@/common/types/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    );

    const { page, per_page, categories, search } = req.query;

    // Get all blogs or filter by category
    let filteredBlogs = categories 
      ? getBlogsByCategory(Number(categories))
      : BLOG_DATA;

    // Apply search filter if search query exists
    if (search) {
      filteredBlogs = searchBlogs(String(search));
    }

    // Sort blogs by date (newest first)
    filteredBlogs.sort((a: BlogItemProps, b: BlogItemProps) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Paginate results
    const paginatedResult = paginateBlogs(
      filteredBlogs,
      Number(page) || 1,
      Number(per_page) || 9
    );

    const responses = {
      status: true,
      data: {
        total_pages: paginatedResult.total_pages,
        total_posts: paginatedResult.total_posts,
        page: paginatedResult.page,
        per_page: paginatedResult.per_page,
        posts: paginatedResult.posts,
        categories: categories ? Number(categories) : undefined,
      },
    };

    res.status(200).json(responses);
  } catch (error) {
    res.status(200).json({ status: false, error });
  }
}
