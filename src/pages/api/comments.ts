import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    );

    // For static blog, return empty comments array
    // You can implement a static comments system or integrate with a service like Giscus
    const response = {
      status: 200,
      data: [] // Empty comments array
    };

    res.status(200).json({ status: true, data: response.data });
  } catch (error) {
    res.status(200).json({ status: false, error });
  }
}
