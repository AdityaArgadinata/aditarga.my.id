import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import { BlogPostMeta, getAllBlogsMeta } from '@/lib/mdx';
import Home from '@/modules/home';

interface HomePageProps {
  posts: BlogPostMeta[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <>
      <NextSeo title='Aditya Argadinata - Personal Website' />
      <Container data-aos='fade-up'>
        <Home posts={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = getAllBlogsMeta();

  return {
    props: {
      posts,
    },
  };
};

export default HomePage;
