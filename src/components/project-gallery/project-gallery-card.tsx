import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { type ProjectRecord } from '@/lib/projects';

interface ProjectGalleryCardProps {
  project: ProjectRecord;
  isActive: boolean;
  onSelect: () => void;
}

export function ProjectGalleryCard({ project, isActive, onSelect }: ProjectGalleryCardProps) {
  return (
    <motion.button
      type='button'
      aria-label={`Select ${project.title}`}
      aria-pressed={isActive}
      onClick={onSelect}
      whileHover={{ y: -3, scale: 1.008 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative aspect-square w-full overflow-hidden border border-white/18 bg-[#0d0d0d] text-left transition-[border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        isActive ? 'border-white/72' : 'hover:border-white/36',
      )}
    >
      <img
        src={project.image}
        alt={project.title}
        className={cn(
          'h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isActive ? 'scale-[1.025] grayscale-0' : 'grayscale group-hover:scale-[1.035] group-hover:grayscale-0',
        )}
      />

      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.02)_0%,rgba(7,7,7,0.14)_34%,rgba(7,7,7,0.84)_100%)]' />
      <div className='absolute inset-0 border border-white/10' />

      <div className='absolute inset-x-0 bottom-0 grid gap-2 p-3.5 sm:p-4'>
        <div className='flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70'>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className='max-w-[15ch] text-[1.05rem] leading-[0.98] text-[#f5f1ea] sm:text-[1.2rem]'>{project.title}</h3>
      </div>
    </motion.button>
  );
}
