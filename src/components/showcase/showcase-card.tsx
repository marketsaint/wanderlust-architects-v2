import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Project } from '../../lib/showcase/projects';
import { cardHover, imageHover, reveal } from '../../lib/showcase/motion';

interface ShowcaseCardProps {
  project: Project;
  index: number;
  cursorPosition?: { x: number; y: number };
}

export function ShowcaseCard({ project, index, cursorPosition }: ShowcaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [breathingScale, setBreathingScale] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / 20;
    const offsetY = (e.clientY - centerY) / 20;
    
    setMagneticOffset({ x: offsetX, y: offsetY });
  };

  // Breathing grid effect based on cursor distance
  useEffect(() => {
    if (!cardRef.current || !cursorPosition) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - cardCenterX, 2) +
      Math.pow(cursorPosition.y - cardCenterY, 2)
    );

    const maxDistance = 400;
    if (distance < maxDistance) {
      const proximity = 1 - (distance / maxDistance);
      const newScale = 1 + (proximity * 0.04);
      setBreathingScale(newScale);
    } else {
      setBreathingScale(1);
    }
  }, [cursorPosition]);

  // Get height based on card size
  const getHeight = () => {
    const heights: Record<typeof project.size, string> = {
      large: 'h-[420px] md:h-[620px] lg:h-[720px]',
      medium: 'h-[320px] md:h-[460px] lg:h-[560px]',
      small: 'h-[320px] md:h-[360px] lg:h-[420px]',
      tall: 'h-[420px] md:h-[620px] lg:h-[760px]',
      wide: 'h-[420px] md:h-[620px] lg:h-[640px]',
    };
    return heights[project.size];
  };

  // Get column span
  const getColSpan = () => {
    const spans: Record<typeof project.size, string> = {
      large: 'col-span-2 lg:col-span-6',
      medium: 'col-span-2 md:col-span-3 lg:col-span-4',
      small: 'col-span-2 md:col-span-3 lg:col-span-3',
      tall: 'col-span-2 md:col-span-3 lg:col-span-4',
      wide: 'col-span-2 md:col-span-6 lg:col-span-8',
    };
    return spans[project.size];
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor-hover
      className={`relative overflow-hidden cursor-pointer group ${getColSpan()} ${getHeight()}`}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMagneticOffset({ x: 0, y: 0 });
      }}
      style={{
        scale: breathingScale,
        x: magneticOffset.x,
        y: magneticOffset.y,
        borderRadius: '24px',
      }}
    >
      {/* Image Container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: isHovered ? 0.75 : 0.5,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
        {/* Category Tag */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <span 
            className="inline-block px-3 py-1 text-xs tracking-[0.15em] uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="mb-2 text-white leading-tight"
          style={{ 
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3vw, 34px)'
          }}
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        {/* Location */}
        <motion.p
          className="text-white/80 mb-4"
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            letterSpacing: '0.02em'
          }}
          animate={{
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {project.location}
        </motion.p>

        {/* Metadata */}
        <motion.div
          className="pt-4 border-t border-white/20 flex justify-between items-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <span className="text-white/60 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
            {project.year}
          </span>
          {project.area && (
            <span className="text-white/60 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
              {project.area}
            </span>
          )}
        </motion.div>
      </div>

      {/* Hover border accent */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-[#B7936A] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
