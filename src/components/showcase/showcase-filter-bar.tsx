import { motion } from 'motion/react';
import { ProjectCategory, categories } from '../../lib/showcase/projects';

interface ShowcaseFilterBarProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export function ShowcaseFilterBar({ selectedCategory, onSelectCategory }: ShowcaseFilterBarProps) {
  return (
    <motion.div
      className="sticky top-24 z-40 flex justify-center py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div 
        className="inline-flex items-center gap-2 px-2 py-2 bg-white/80 backdrop-blur-md rounded-full border border-[#E7E2DA] shadow-sm"
        style={{ height: '56px' }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              relative h-10 px-[18px] rounded-full text-sm tracking-wide transition-all duration-300
              ${selectedCategory === category 
                ? 'bg-[#111111] text-white' 
                : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#F7F5F2]'
              }
            `}
            style={{ fontFamily: 'var(--font-sans)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
            {selectedCategory === category && (
              <motion.div
                className="absolute inset-0 bg-[#111111] rounded-full -z-10"
                layoutId="activeFilter"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
