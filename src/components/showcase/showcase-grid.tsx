import { motion, AnimatePresence } from 'motion/react';
import { ShowcaseCard } from './showcase-card';
import { Project } from '../../lib/showcase/projects';
import { staggerContainer } from '../../lib/showcase/motion';

interface ShowcaseGridProps {
  projects: Project[];
  cursorPosition?: { x: number; y: number };
}

export function ShowcaseGrid({ projects, cursorPosition }: ShowcaseGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ShowcaseCard
            key={project.id}
            project={project}
            index={index}
            cursorPosition={cursorPosition}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
