import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { ProjectItemProps } from '@/common/types/projects';
import ProjectCard from '@/modules/projects/components/ProjectCard';

interface ProjectCarouselProps {
  projects: ProjectItemProps[];
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      className='flex items-stretch gap-4 overflow-y-hidden overflow-x-scroll p-1 scrollbar-hide'
      {...events}
      ref={ref}
    >
      {projects.slice(0, 4).map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className='min-w-[280px] max-w-[320px] flex-shrink-0'
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectCarousel;
