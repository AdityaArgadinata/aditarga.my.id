import Breakline from '@/common/components/elements/Breakline';
import { BlogPostMeta } from '@/lib/mdx';

import BlogPreview from './BlogPreview';
import Introduction from './Introduction';
import Services from './Services';
import SkillsSection from './SkillsSection';

interface HomeProps {
  posts: BlogPostMeta[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Introduction />
      <Breakline className='mb-7 mt-8' />
      <BlogPreview posts={posts} />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
    </>
  );
};

export default Home;
