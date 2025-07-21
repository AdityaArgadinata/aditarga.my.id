import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiOutlineClock as ClockIcon } from 'react-icons/hi';
import { TbCalendarBolt as DateIcon } from 'react-icons/tb';

import Card from '@/common/components/elements/Card';
import Image from '@/common/components/elements/Image';
import { formatDate } from '@/common/helpers';
import { BlogPostMeta } from '@/lib/mdx';

interface BlogCardMDXProps {
  post: BlogPostMeta;
  isExcerpt?: boolean;
}

const BlogCardMDX = ({ post, isExcerpt = true }: BlogCardMDXProps) => {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { slug, title, description, date, tags, readingTime, image } = post;

  const defaultImage = '/images/placeholder.png';

  return (
    <Link href={`/blog/${slug}`}>
      <Card className='group relative h-full cursor-pointer border border-neutral-200 bg-neutral-50 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 lg:hover:scale-[102%]'>
        <div className='relative'>
          <Image
            src={image || defaultImage}
            width={400}
            height={200}
            alt={title}
            className={clsx(
              'h-48 w-full transform rounded-t-xl object-cover transition-all duration-700',
              !mounted || isImageLoading ? 'blur-2xl' : 'blur-0',
            )}
            onLoad={() => setImageLoading(false)}
          />
          <div className='absolute inset-0 rounded-t-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20' />
        </div>

        <div className='flex h-full flex-col p-5'>
          <div className='flex-grow space-y-3'>
            <div className='space-y-3'>
              <h3 className='text-lg font-medium text-neutral-700 line-clamp-2 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100'>
                {title}
              </h3>

              <div className='flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400'>
                <div className='flex items-center gap-1'>
                  <DateIcon size={14} />
                  <span>
                    {mounted ? formatDate(date, 'MMM dd, yyyy') : 'Loading...'}
                  </span>
                </div>

                <div className='flex items-center gap-1'>
                  <ClockIcon size={14} />
                  <span>{readingTime}m read</span>
                </div>
              </div>

              {isExcerpt && description && (
                <p className='text-sm leading-relaxed text-neutral-600 line-clamp-2 dark:text-neutral-400'>
                  {description.length > 120
                    ? `${description.slice(0, 120)}...`
                    : description}
                </p>
              )}
            </div>

            {tags && tags.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-neutral-200 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className='text-xs text-neutral-500 dark:text-neutral-500'>
                    +{tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCardMDX;
