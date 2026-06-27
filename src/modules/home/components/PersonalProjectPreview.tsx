import Link from 'next/link';
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs';

import SectionHeading from '@/common/components/elements/SectionHeading';
import SectionSubHeading from '@/common/components/elements/SectionSubHeading';
import { ProjectItemProps } from '@/common/types/projects';

import ProjectCarousel from './ProjectCarousel';

interface PersonalProjectPreviewProps {
  projects: ProjectItemProps[];
}

const PersonalProjectPreview = ({ projects }: PersonalProjectPreviewProps) => {
  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <SectionHeading title='Personal Project' className='ml-1' />
        <SectionSubHeading>
          <Link href='/projects'>
            <div className='mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300'>
              <div className='flex'>
                View All <span className='ml-1 hidden sm:block'>Projects</span>
              </div>
              <ViewAllIcon size={22} />
            </div>
          </Link>
        </SectionSubHeading>
      </div>
      <ProjectCarousel projects={projects} />
    </section>
  );
};

export default PersonalProjectPreview;
