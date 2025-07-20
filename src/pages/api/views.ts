import { NextApiRequest, NextApiResponse } from 'next';

import { getBlogBySlug } from '@/common/constant/blog';

interface ResponseData {
  views: number;
}

// Simple in-memory store for views (in production, you might want to use a proper database or cache)
const viewsStore: Record<string, number> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      // Get views from static data or in-memory store
      const blog = getBlogBySlug(slug as string);
      const staticViews = blog?.total_views_count || 0;
      const additionalViews = viewsStore[slug as string] || 0;

      const response: ResponseData = {
        views: staticViews + additionalViews,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch content meta' });
    }
  } else if (req.method === 'POST') {
    try {
      // Increment views in memory store
      const currentViews = viewsStore[slug as string] || 0;
      viewsStore[slug as string] = currentViews + 1;

      const blog = getBlogBySlug(slug as string);
      const staticViews = blog?.total_views_count || 0;

      return res.json({
        views: staticViews + viewsStore[slug as string],
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update views count' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
