import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import SearchBar from '@/common/components/elements/SearchBar';
import { BlogPostMeta } from '@/lib/mdx';

import BlogCardMDX from './BlogCardMDX';

interface BlogListMDXProps {
  posts: BlogPostMeta[];
}

const BlogListMDX = ({ posts }: BlogListMDXProps) => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const postsPerPage = 6;

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      debouncedSearchTerm === '' ||
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      post.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
  );

  // Get featured posts
  const featuredPosts = posts.filter((post) => post.featured);

  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  return (
    <div>
      {/* Featured Section - show only if no search term */}
      {!debouncedSearchTerm && featuredPosts.length > 0 && (
        <div className='mb-8'>
          <h2 className='mb-6 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
            Featured Posts
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {featuredPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogCardMDX post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className='space-y-6'>
        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />

        {/* Empty State */}
        {filteredPosts.length === 0 && debouncedSearchTerm && (
          <div className='py-20 text-center'>
            <EmptyState
              message={`No posts found for "${debouncedSearchTerm}". Try different keywords.`}
            />
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 && (
          <>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BlogCardMDX post={post} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}

            {/* Stats */}
            <div className='text-center text-sm text-gray-600 dark:text-gray-400'>
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredPosts.length)} of{' '}
              {filteredPosts.length} posts
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
            </div>
          </>
        )}

        {/* No posts at all */}
        {posts.length === 0 && (
          <div className='py-20 text-center'>
            <EmptyState message='Blog posts will appear here once they are published.' />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListMDX;
