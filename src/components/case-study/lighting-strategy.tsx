import { motion } from 'motion/react';

export function LightingStrategy() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
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
              Lighting Strategy
            </h2>
            <p 
              className="text-lg mb-6 leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              Natural light drives the design, with deep overhangs and latticed screens controlling harsh desert sun. As day transitions to evening, a layered lighting scheme reveals the building's sculptural qualities.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              Custom brass fixtures and concealed LED strips wash stone surfaces with warm light, while courtyard lanterns create an intimate ambiance after sunset.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1750271329214-a7dbce880e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzczMDc3NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Evening Lighting"
              className="w-full h-auto aspect-[4/5] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
