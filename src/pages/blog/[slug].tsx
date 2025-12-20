import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';

import mdxComponents from '@/components/mdx-components';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import { BlogPost, getBlogBySlug, getBlogSlugs } from '@/lib/mdx';
const GiscusComment = dynamic(
  () => import('@/modules/blog/components/GiscusComment'),
);
interface BlogDetailPageProps {
  blog: BlogPost;
}
const BlogDetailPage: NextPage<BlogDetailPageProps> = ({ blog }) => {
  if (!blog) {
    return <div>Blog post not found</div>;
  }
  const {
    title,
    description,
    date,
    author,
    tags,
    readingTime,
    content,
    slug,
    image,
  } = blog;
  const canonicalUrl = `https://aditarga.my.id/blog/${slug}`;
  return (
    <>
      {' '}
      <NextSeo
        title={`${title} - Aditya Argadinata`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: { publishedTime: date, authors: [author], tags },
          url: canonicalUrl,
          images: image
            ? [{ url: image, width: 1200, height: 630, alt: title }]
            : [],
          siteName: 'Aditya Argadinata',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          { name: 'author', content: author },
          { name: 'keywords', content: tags.join(', ') },
          { name: 'article:reading_time', content: readingTime.toString() },
          ...(image ? [{ name: 'twitter:image', content: image }] : []),
        ]}
      />{' '}
      <Container data-aos='fade-up'>
        {' '}
        <BackButton url='/blog' />{' '}
        <article className='mt-6'>
          {' '}
          {/* Header */}{' '}
          <header className='mb-8 space-y-4'>
            {' '}
            <h1 className='text-3xl font-bold text-neutral-800 dark:text-neutral-200 lg:text-4xl'>
              {' '}
              {title}{' '}
            </h1>{' '}
            {description && (
              <p className='text-lg text-neutral-600 dark:text-neutral-400'>
                {' '}
                {description}{' '}
              </p>
            )}{' '}
            <div className='flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400'>
              {' '}
              <span>By {author}</span> <span>•</span>{' '}
              <time dateTime={date}>
                {' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
              </time>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
            {tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          {/* Featured Image */}
          {image && (
            <div className='mb-8'>
              <Image
                src={image}
                alt={title}
                width={800}
                height={450}
                className='w-full rounded-lg object-cover'
                priority
              />
            </div>
          )}
          {/* Content */}
          <div className='prose prose-neutral dark:prose-invert lg:prose-lg max-w-none'>
            <MDXRemote {...content} components={mdxComponents} />
          </div>
        </article>
        {/* Comments */}
        <div className='mt-12'>
          <GiscusComment />
        </div>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getBlogSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export default BlogDetailPage;
