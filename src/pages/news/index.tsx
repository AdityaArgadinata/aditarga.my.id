import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import { getAllNewsMeta, NewsPostMeta } from '@/lib/news';
import NewsList from '@/modules/news/components/NewsList';

const PAGE_TITLE = 'Stock Pulse';

interface NewsPageProps {
  posts: NewsPostMeta[];
}

const NewsPage: NextPage<NewsPageProps> = ({ posts }) => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - Analisis saham independen berbasis data dan riset pasar modal Indonesia.`}
      />
      <Container className='xl:!-mt-5' data-aos='fade-up'>
        <NewsList posts={posts} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const posts = getAllNewsMeta();

  return {
    props: {
      posts,
    },
  };
};

export default NewsPage;
