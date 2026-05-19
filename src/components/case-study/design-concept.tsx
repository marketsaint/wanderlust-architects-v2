import { motion } from 'motion/react';

export function DesignConcept() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Section Title */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-3xl md:text-4xl leading-tight sticky top-32"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-black)',
                fontWeight: 400
              }}
            >
              Design Concept
            </h2>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="md:col-span-8 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 
                className="text-xl mb-4"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-black)'
                }}
              >
                Contextual Integration
              </h3>
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)',
                  lineHeight: '1.8'
                }}
              >
                The architecture responds to the harsh desert climate through passive cooling strategies. Thick sandstone walls provide thermal mass, while strategically placed jali screens create cross-ventilation and dappled light patterns that reference traditional Mughal architecture.
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)',
                  lineHeight: '1.8'
                }}
              >
                The color palette derives from the surrounding landscape—warm ochres, deep terracottas, and cool stone greys create a seamless visual connection between building and site.
              </p>
            </div>

            {/* Inline Image */}
            <motion.div
              className="my-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1612303544167-5871c2331e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczMTY2NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Interior Detail"
                className="w-full h-auto rounded-sm"
              />
              <p 
                className="text-sm mt-3 italic"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                Hand-carved jali screens filter harsh sunlight while creating intricate shadow patterns
              </p>
            </motion.div>

            <div>
              <h3 
                className="text-xl mb-4"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-black)'
                }}
              >
                Craftsmanship & Detail
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)',
                  lineHeight: '1.8'
                }}
              >
                Working with local artisans, we revived traditional stone carving and metalwork techniques. Each architectural element—from door handles to light fixtures—was custom designed and handcrafted, ensuring authenticity and supporting local craft communities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
