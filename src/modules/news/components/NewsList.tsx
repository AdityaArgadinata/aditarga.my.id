import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import EmptyState from '@/common/components/elements/EmptyState';
import Image from '@/common/components/elements/Image';
import Pagination from '@/common/components/elements/Pagination';
import SearchBar from '@/common/components/elements/SearchBar';
import { formatDate } from '@/common/helpers';
import { NewsPostMeta } from '@/lib/news';

import NewsCard from './NewsCard';

const defaultImage = '/images/placeholder.png';

interface NewsListProps {
  posts: NewsPostMeta[];
}

interface UmamiTracker {
  track: (event: string, data?: Record<string, unknown>) => void;
}

interface WindowWithUmami extends Window {
  umami?: UmamiTracker;
}

const NewsList = ({ posts }: NewsListProps) => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const postsPerPage = 6;

  // Get featured posts - automatically use the latest article
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestPost = sortedPosts[0]; // Most recent article
  const featuredPosts = latestPost ? [latestPost] : []; // Use latest as featured

  // Filter posts based on search term (search through all posts)
  const allFilteredPosts = sortedPosts.filter(
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

  // For display: when no search, exclude featured post from regular list
  const filteredPosts = debouncedSearchTerm
    ? allFilteredPosts // Show all filtered results when searching
    : allFilteredPosts.slice(1); // Exclude featured post when not searching

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

  // Track search events
  useEffect(() => {
    const windowWithUmami = window as WindowWithUmami;
    if (
      debouncedSearchTerm &&
      typeof window !== 'undefined' &&
      windowWithUmami.umami
    ) {
      windowWithUmami.umami.track('Search News', {
        query: debouncedSearchTerm,
      });
    }
  }, [debouncedSearchTerm]);

  // Track pagination events
  useEffect(() => {
    const windowWithUmami = window as WindowWithUmami;
    if (page > 1 && typeof window !== 'undefined' && windowWithUmami.umami) {
      windowWithUmami.umami.track('Navigate News Page', { page });
    }
  }, [page]);

  return (
    <div className='-translate-y-16 space-y-12'>
      {/* Search Bar - Always visible at top */}
      <div className='mb-8'>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />
      </div>

      {/* Magazine-style Hero Section - Main Featured Article */}
      {!debouncedSearchTerm && featuredPosts.length > 0 && (
        <div className='mb-12'>
          {/* Main Hero Article */}
          <div className='mb-8'>
            {featuredPosts.slice(0, 1).map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='group cursor-pointer'
              >
                <Link
                  href={`/news/${post.slug}`}
                  data-umami-event={`Click Main News: ${post.title}`}
                >
                  <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-white dark:from-neutral-800 dark:to-neutral-900 lg:p-12'>
                    <div className='relative z-10 max-w-4xl'>
                      <div className='mb-4'>
                        <span className='inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white'>
                          BERITA TERUPDATE
                        </span>
                      </div>
                      <h1 className='mb-4 line-clamp-3 text-2xl font-bold leading-tight lg:text-5xl lg:leading-tight'>
                        {post.title}
                      </h1>
                      <p className='mb-6 text-lg text-neutral-300 lg:text-xl lg:leading-relaxed'>
                        {post.description}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-neutral-400'>
                        <div className='flex items-center gap-1'>
                          <span>📅</span>
                          <span>{formatDate(post.date, 'dd MMMM yyyy')}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span>⏱️</span>
                          <span>{post.readingTime} menit baca</span>
                        </div>
                      </div>
                    </div>
                    {/* Background Image Overlay */}
                    <div className='absolute inset-0 opacity-20'>
                      <Image
                        src={post.image || defaultImage}
                        width={1200}
                        height={600}
                        alt={post.title}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent' />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Search */}
      {filteredPosts.length === 0 && debouncedSearchTerm && (
        <div className='py-20 text-center'>
          <EmptyState
            message={`Tidak ada berita ditemukan untuk "${debouncedSearchTerm}". Coba kata kunci lain.`}
          />
        </div>
      )}

      {/* All News Posts Grid */}
      {filteredPosts.length > 0 && !debouncedSearchTerm && (
        <>
          <div>
            <h3 className='mb-8 text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
              Semua Berita
            </h3>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NewsCard post={post} />
                </motion.div>
              ))}
            </div>
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
            Menampilkan {startIndex + 1}-
            {Math.min(endIndex, filteredPosts.length)} dari{' '}
            {filteredPosts.length} berita
            {debouncedSearchTerm && ` untuk "${debouncedSearchTerm}"`}
          </div>
        </>
      )}

      {/* Search Results */}
      {filteredPosts.length > 0 && debouncedSearchTerm && (
        <>
          <div>
            <h3 className='mb-6 text-xl font-semibold text-neutral-700 dark:text-neutral-300'>
              Hasil Pencarian
            </h3>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NewsCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination for search results */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}

          {/* Stats for search results */}
          <div className='text-center text-sm text-gray-600 dark:text-gray-400'>
            Menampilkan {startIndex + 1}-
            {Math.min(endIndex, filteredPosts.length)} dari{' '}
            {filteredPosts.length} berita untuk "{debouncedSearchTerm}"
          </div>
        </>
      )}

      {/* No posts at all */}
      {posts.length === 0 && (
        <div className='py-20 text-center'>
          <EmptyState message='Berita akan muncul di sini setelah dipublikasikan.' />
        </div>
      )}
    </div>
  );
};

export default NewsList;
