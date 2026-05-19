import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1690199827629-552c41f6450f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBhcmNoaXRlY3R1cmUlMjB0cm9waWNhbHxlbnwxfHx8fDE3NzMxNjY2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury Resort Rajasthan"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative h-full flex items-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20"
        style={{ opacity }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category */}
            <div className="mb-4">
              <span 
                className="text-sm tracking-[0.2em] uppercase text-white/80"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Hospitality Architecture
              </span>
            </div>

            {/* Project Title */}
            <h1 
              className="text-white mb-6 leading-[1.1]"
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 400
              }}
            >
              Luxury Resort Rajasthan
            </h1>

            {/* Location */}
            <p 
              className="text-white/90 text-xl md:text-2xl"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Rajasthan, India
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span 
          className="text-xs text-white/60 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-white/40"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
