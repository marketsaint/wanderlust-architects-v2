import { motion, useScroll, useTransform } from 'motion/react';
import { heroReveal } from '../../lib/showcase/motion';

export function ShowcaseHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1690199827629-552c41f6450f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBhcmNoaXRlY3R1cmUlMjB0cm9waWNhbHxlbnwxfHx8fDE3NzMxNjY2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero Architecture"
            className="w-full h-full object-cover"
          />
          {/* Vignette and Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)' 
            }} 
          />
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 max-w-[620px] px-6 md:px-12 lg:px-24 text-white"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={heroReveal}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6"
        >
          <span 
            className="inline-block text-sm tracking-[0.2em] uppercase text-white/90"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Selected Works
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={heroReveal}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="mb-6 leading-[1.1]"
          style={{ 
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 8vw, 88px)'
          }}
        >
          Architecture in Motion
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          variants={heroReveal}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="mb-10 leading-relaxed text-white/85"
          style={{ 
            fontFamily: 'var(--font-sans)',
            fontSize: '18px'
          }}
        >
          Crafting timeless spaces where luxury meets innovation. Explore our portfolio of award-winning architectural masterpieces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroReveal}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="flex flex-wrap gap-5"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center h-[52px] px-8 bg-white text-[#111111] rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-[#B7936A] hover:text-white"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Explore Projects
          </a>
          <a
            href="#featured"
            className="inline-flex items-center justify-center h-[52px] px-8 border-2 border-white text-white rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Featured Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-xs text-white/60 tracking-widest uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-16 bg-white/40"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
