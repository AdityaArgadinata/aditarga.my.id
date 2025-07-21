import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import { BlogPostMeta, getAllBlogsMeta } from '@/lib/mdx';
import BlogListMDX from '@/modules/blog/components/BlogListMDX';

const PAGE_TITLE = 'Blog';

interface BlogPageProps {
  posts: BlogPostMeta[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - Aditya Argadinata`} />
      <Container className='xl:!-mt-5' data-aos='fade-up'>
        <BlogListMDX posts={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = getAllBlogsMeta();

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;
