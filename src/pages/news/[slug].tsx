import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import MDXComponents from '@/components/mdx-components';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import Image from '@/common/components/elements/Image';
import { formatDate } from '@/common/helpers';
import { getNewsBySlug, getNewsSlugs, NewsPost } from '@/lib/news';

interface UmamiTracker {
  track: (event: string, data?: Record<string, unknown>) => void;
}

interface WindowWithUmami extends Window {
  umami?: UmamiTracker;
}

interface NewsDetailPageProps {
  post: NewsPost;
}

const NewsDetailPage: NextPage<NewsDetailPageProps> = ({ post }) => {
  const { title, description, date, tags, content, readingTime, image } = post;

  useEffect(() => {
    // Track news article view
    const windowWithUmami = window as WindowWithUmami;
    if (typeof window !== 'undefined' && windowWithUmami.umami) {
      windowWithUmami.umami.track('View News Article', { title, readingTime });
    }
  }, [title, readingTime]);

  return (
    <>
      <NextSeo
        title={`${title} - Berita Saham`}
        description={description}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
            tags: tags,
          },
          images: image
            ? [{ url: image, width: 1200, height: 630, alt: title }]
            : [],
        }}
      />

      <Container className='!-mt-4' data-aos='fade-up'>
        <BackButton
          href='/news'
          data-umami-event='Click Back from News Article'
        />
        <article className='prose prose-neutral dark:prose-invert max-w-none'>
          <div className='mb-8 space-y-4'>
            <h1 className='text-3xl font-bold text-neutral-800 dark:text-neutral-100 lg:text-4xl'>
              {title}
            </h1>
            <p className='text-lg text-neutral-600 dark:text-neutral-400'>
              {description}
            </p>
            {image && (
              <div className='my-6'>
                <Image
                  src={image}
                  width={800}
                  height={400}
                  alt={title}
                  className='w-full rounded-lg object-cover'
                />
              </div>
            )}
            <div className='flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center gap-1'>
                <span>📅</span>
                <span>{formatDate(date, 'EEEE, dd MMMM yyyy')}</span>
              </div>
              <div className='flex items-center gap-1'>
                <span>⏱️</span>
                <span>{readingTime} menit baca</span>
              </div>
            </div>
            {tags && tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className='prose-headings:text-neutral-800 prose-headings:dark:text-neutral-100 prose-p:text-neutral-700 prose-p:dark:text-neutral-300 prose-strong:text-neutral-900 prose-strong:dark:text-neutral-100 prose-code:text-neutral-800 prose-code:dark:text-neutral-200 prose-pre:bg-neutral-100 prose-pre:dark:bg-neutral-900 prose-blockquote:border-neutral-300 prose-blockquote:dark:border-neutral-700 text-justify'>
            <MDXRemote {...content} components={MDXComponents} />
          </div>
        </article>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getNewsSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NewsDetailPageProps> = async ({
  params,
}) => {
  const { slug } = params as { slug: string };
  const post = await getNewsBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default NewsDetailPage;
