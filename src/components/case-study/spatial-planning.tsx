import { motion } from 'motion/react';

export function SpatialPlanning() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-3xl md:text-4xl mb-6 leading-tight"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-black)',
              fontWeight: 400
            }}
          >
            Spatial Planning
          </h2>
          <p 
            className="text-lg max-w-3xl"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-grey)',
              lineHeight: '1.8'
            }}
          >
            The layout balances public and private zones, creating a journey from grand arrival courts to intimate guest pavilions.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white p-1"
          >
            <img
              src="https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMxNjY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Exterior View"
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h3 
                className="text-lg mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Central Courtyard
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                The main gathering space features a restored stepwell and indigenous plantings
              </p>
            </div>
          </motion.div>

          {/* Floor Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-1"
          >
            <div className="w-full h-[400px] bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
              <div className="text-center p-12">
                <div 
                  className="text-6xl mb-4"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  ⌘
                </div>
                <p 
                  className="text-sm tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-text-grey)'
                  }}
                >
                  Master Plan
                </p>
              </div>
            </div>
            <div className="p-6">
              <h3 
                className="text-lg mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Site Layout
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                Organized around a central axis with guest pavilions radiating outward
              </p>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white p-1 md:col-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1677553512940-f79af72efd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMxMjg1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Interior Space"
              className="w-full h-[500px] object-cover"
            />
            <div className="p-6">
              <h3 
                className="text-lg mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Guest Suite
              </h3>
              <p 
                className="text-sm max-w-2xl"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                Private terraces and plunge pools offer panoramic desert views while maintaining privacy through strategic landscaping
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
