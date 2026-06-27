import Breakline from '@/common/components/elements/Breakline';
import { ProjectItemProps } from '@/common/types/projects';

import Introduction from './Introduction';
import PersonalProjectPreview from './PersonalProjectPreview';
import Services from './Services';
import SkillsSection from './SkillsSection';

interface HomeProps {
  projects: ProjectItemProps[];
}

const Home = ({ projects }: HomeProps) => {
  return (
    <>
      <Introduction />
      <Breakline className='mb-7 mt-8' />
      <PersonalProjectPreview projects={projects} />
      <Breakline className='my-8' />
      <SkillsSection />
      <Breakline className='my-8' />
      <Services />
    </>
  );
};

export default Home;
