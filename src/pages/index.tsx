import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import { PROJECTS_DATA } from '@/common/constant/projects';
import { ProjectItemProps } from '@/common/types/projects';
import Home from '@/modules/home';

interface HomePageProps {
  projects: ProjectItemProps[];
}

const HomePage: NextPage<HomePageProps> = ({ projects }) => {
  return (
    <>
      <NextSeo title='Aditya Argadinata - Personal Website' />
      <Container data-aos='fade-up'>
        <Home projects={projects} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const projects = PROJECTS_DATA.filter((project) => project.is_show).sort(
    (a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    },
  );

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
};

export default HomePage;
