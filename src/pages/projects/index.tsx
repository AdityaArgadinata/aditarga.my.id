import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { PROJECTS_DATA } from '@/common/constant/projects';
import { ProjectItemProps } from '@/common/types/projects';
import Projects from '@/modules/projects';

interface ProjectsPageProps {
  projects: ProjectItemProps[];
}

const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION =
  'Several projects that I have worked on, both private and open source.';

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);
  const hasMore = visibleProjects < projects.length;

  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - Aditya Argadinata`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Projects
          projects={projects.slice(0, visibleProjects)}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </Container>
    </>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async () => {
  // Sort projects: featured first, then by updated date
  const sortedProjects = PROJECTS_DATA.sort((a, b) => {
    // First sort by is_featured (featured projects first)
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    
    // Then sort by updated_at (newest first)
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return {
    props: {
      projects: JSON.parse(JSON.stringify(sortedProjects)),
    },
  };
};
