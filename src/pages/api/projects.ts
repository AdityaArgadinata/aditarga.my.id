/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

import { PROJECTS_DATA } from '@/common/constant/projects';

type Data = {
  status: boolean;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    // Filter only projects that should be shown
    const visibleProjects = PROJECTS_DATA.filter((project) => project.is_show);

    // Sort projects: featured first, then by updated date
    const sortedProjects = visibleProjects.sort((a, b) => {
      // First sort by is_featured (featured projects first)
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;

      // Then sort by updated_at (newest first)
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

    res.status(200).json({ status: true, data: sortedProjects });
  } catch (error) {
    res.status(200).json({ status: false, error: error });
  }
}
