import { motion } from 'motion/react';

export function OverviewSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Section Divider */}
        <motion.div
          className="w-16 h-px bg-[#C8BBAA] mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-3xl md:text-4xl mb-8 leading-tight"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-black)',
              fontWeight: 400
            }}
          >
            Design Philosophy
          </h2>

          <div className="space-y-6">
            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              The design draws inspiration from the majestic forts and palaces of Rajasthan, reinterpreting traditional architectural elements through a contemporary lens. Every detail has been carefully crafted to create an immersive experience that honors the region's rich cultural heritage.
            </p>

            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              The resort is organized around a central courtyard, echoing the traditional haveli layout. This creates intimate social spaces while maximizing natural ventilation and light. Locally quarried sandstone walls, hand-carved wooden screens, and reflective water bodies work together to regulate temperature naturally.
            </p>

            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              Our approach prioritized sustainability and local craftsmanship, employing traditional building techniques while integrating modern environmental systems to achieve LEED Gold certification.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
