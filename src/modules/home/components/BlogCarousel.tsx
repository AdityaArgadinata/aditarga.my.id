import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { BlogPostMeta } from '@/lib/mdx';
import BlogCardMDX from '@/modules/blog/components/BlogCardMDX';

interface BlogCarouselProps {
  posts: BlogPostMeta[];
}

const BlogCarousel = ({ posts }: BlogCarouselProps) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const renderBlogCards = () => {
    return posts.slice(0, 4).map((post, index) => (
      <motion.div
        key={post.slug}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className='h-[450px] min-w-[280px] max-w-[320px] flex-shrink-0'
      >
        <BlogCardMDX post={post} />
      </motion.div>
    ));
  };

  return (
    <div
      className='flex items-stretch gap-4 overflow-y-hidden overflow-x-scroll p-1 scrollbar-hide'
      {...events}
      ref={ref}
    >
      {renderBlogCards()}
    </div>
  );
};

export default BlogCarousel;
