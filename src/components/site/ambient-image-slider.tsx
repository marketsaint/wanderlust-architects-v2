import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

interface AmbientImageSliderProps {
  images: string[];
  className?: string;
  imageClassName?: string;
  intervalMs?: number;
}

export function AmbientImageSlider({
  images,
  className,
  imageClassName,
  intervalMs = 3800,
}: AmbientImageSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2 || prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length, intervalMs, prefersReducedMotion]);

  if (!images.length) {
    return null;
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <AnimatePresence mode='wait' initial={false}>
        <motion.img
          key={`${images[activeIndex]}-${activeIndex}`}
          src={images[activeIndex]}
          alt=''
          aria-hidden='true'
          className={cn('absolute inset-0 h-full w-full object-cover', imageClassName)}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            duration: prefersReducedMotion ? 0.1 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </AnimatePresence>
    </div>
  );
}
