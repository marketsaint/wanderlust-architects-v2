import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { fadeUp } from '../../lib/showcase/motion';

export function ShowcaseFeaturedStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 lg:py-32" id="featured">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          className="relative overflow-hidden rounded-[32px] h-[600px] md:h-[700px] lg:h-[780px]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <img
              src="https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMxNjY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Azure Heights Featured"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            {/* Vignette */}
            <div 
              className="absolute inset-0" 
              style={{ 
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 100%)' 
              }} 
            />
          </motion.div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-12">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span 
                className="inline-block px-3 py-1 text-xs tracking-[0.2em] uppercase bg-[#B7936A] text-black rounded-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Project Spotlight
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-white leading-[1.1] max-w-3xl"
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 6vw, 56px)'
              }}
            >
              Azure Heights Residence
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-white/85 max-w-2xl leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                lineHeight: '1.7'
              }}
            >
              A stunning modern masterpiece perched atop the Los Angeles hills, featuring seamless indoor-outdoor living spaces, infinity pool, and panoramic city views. This award-winning design harmoniously blends contemporary architecture with natural surroundings.
            </motion.p>

            {/* Metadata Grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-3xl"
            >
              <div>
                <div className="text-sm text-white/50 mb-1 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  Location
                </div>
                <div className="text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  Los Angeles, CA
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  Year
                </div>
                <div className="text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  2025
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  Size
                </div>
                <div className="text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  8,500 sq ft
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  Type
                </div>
                <div className="text-white" style={{ fontFamily: 'var(--font-sans)' }}>
                  Residential
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center h-[52px] px-8 bg-white text-[#111111] rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-[#B7936A] hover:text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                View Full Project
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
