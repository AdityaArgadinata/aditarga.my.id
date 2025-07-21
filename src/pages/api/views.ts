import { NextApiRequest, NextApiResponse } from 'next';

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
      // Get views from in-memory store
      const views = viewsStore[slug as string] || 0;

      const response: ResponseData = {
        views,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch views' });
    }
  } else if (req.method === 'POST') {
    try {
      // Increment views in memory store
      const currentViews = viewsStore[slug as string] || 0;
      viewsStore[slug as string] = currentViews + 1;

      return res.json({
        views: viewsStore[slug as string],
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update views count' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
