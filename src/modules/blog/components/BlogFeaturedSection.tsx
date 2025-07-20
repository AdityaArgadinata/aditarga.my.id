import React from 'react';

import { getFeaturedBlogs } from '@/common/constant/blog';

import BlogFeaturedHero from './BlogFeaturedHero';

const BlogFeaturedSection = () => {
  // Use static featured blogs data
  const featuredData = getFeaturedBlogs();

  return <BlogFeaturedHero data={featuredData} />;
};

export default BlogFeaturedSection;
