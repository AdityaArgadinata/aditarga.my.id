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

const POSTS_PER_PAGE = 6;

const NewsList = ({ posts }: NewsListProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /* ======================
   * DATA PREP
   ====================== */
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const featuredPost =
    !debouncedSearchTerm && sortedPosts.length > 0 ? sortedPosts[0] : null;

  const filteredPosts = sortedPosts.filter((post) => {
    if (!debouncedSearchTerm) return true;
    const q = debouncedSearchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const listPosts =
    featuredPost && !debouncedSearchTerm
      ? filteredPosts.slice(1)
      : filteredPosts;

  const totalPages = Math.ceil(listPosts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = listPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  /* ======================
   * HANDLERS
   ====================== */
  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  /* ======================
   * ANALYTICS
   ====================== */
  useEffect(() => {
    const w = window as WindowWithUmami;
    if (debouncedSearchTerm && w.umami) {
      w.umami.track('Search News', { query: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const w = window as WindowWithUmami;
    if (page > 1 && w.umami) {
      w.umami.track('Navigate News Page', { page });
    }
  }, [page]);

  /* ======================
   * RENDER
   ====================== */
  return (
    <div className='relative -translate-y-16 space-y-16 px-4 sm:mt-8 sm:translate-y-0 md:px-0'>
      {/* SEARCH */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />

      {/* FEATURED */}
      {featuredPost && (
        <section className='relative isolate'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href={`/news/${featuredPost.slug}`} className='block'>
              <article className='relative overflow-hidden rounded-2xl bg-neutral-900 p-6 text-white md:p-10'>
                {/* TEXT */}
                <div className='relative z-10 max-w-3xl'>
                  <span className='mb-3 inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-semibold'>
                    BERITA TERUPDATE
                  </span>
                  <h1 className='mb-3 line-clamp-3 text-xl font-bold leading-snug md:text-4xl'>
                    {featuredPost.title}
                  </h1>
                  <p className='mb-5 line-clamp-4 text-sm text-neutral-300 md:text-lg'>
                    {featuredPost.description}
                  </p>
                  <div className='flex flex-wrap gap-3 text-xs text-neutral-400'>
                    <span>
                      📅 {formatDate(featuredPost.date, 'dd MMMM yyyy')}
                    </span>
                    <span>⏱️ {featuredPost.readingTime} menit baca</span>
                  </div>
                </div>

                {/* IMAGE OVERLAY */}
                <div className='pointer-events-none absolute inset-0 opacity-25'>
                  <Image
                    src={featuredPost.image || defaultImage}
                    alt={featuredPost.title}
                    width={1200}
                    height={600}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
              </article>
            </Link>
          </motion.div>
        </section>
      )}

      {/* EMPTY */}
      {paginatedPosts.length === 0 && debouncedSearchTerm && (
        <EmptyState
          message={`Tidak ada berita untuk "${debouncedSearchTerm}"`}
        />
      )}

      {/* GRID */}
      {paginatedPosts.length > 0 && (
        <section className='relative isolate'>
          <h3 className='mb-6 text-xl font-bold md:text-2xl'>
            {debouncedSearchTerm ? 'Hasil Pencarian' : 'Semua Berita'}
          </h3>

          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {paginatedPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NewsCard post={post} />
              </motion.div>
            ))}
          </div>

          {/* PAGINATION – MOBILE SAFE */}
          {totalPages > 1 && (
            <div className='relative isolate z-40 mt-14 flex justify-center'>
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default NewsList;
