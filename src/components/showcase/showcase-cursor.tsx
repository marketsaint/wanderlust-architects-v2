import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ShowcaseCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#111111] pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.3,
        }}
      />

      {/* Large cursor circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-[#111111] pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 2 : 1,
          width: 48,
          height: 48,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
      />

      {/* "View Project" label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] flex items-center justify-center"
        animate={{
          x: position.x - 50,
          y: position.y - 50,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div 
          className="w-[100px] h-[100px] rounded-full bg-[#B7936A]/90 backdrop-blur-sm flex items-center justify-center"
        >
          <span 
            className="text-xs text-white tracking-wide"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            View
          </span>
        </div>
      </motion.div>
    </>
  );
}
