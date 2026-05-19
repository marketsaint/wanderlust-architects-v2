import { motion } from 'motion/react';

export function ProjectSnapshot() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Project Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-4xl md:text-5xl mb-6 leading-tight"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-black)',
                fontWeight: 400
              }}
            >
              Project Overview
            </h2>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              A harmonious blend of traditional Rajasthani architecture and contemporary luxury design. This resort embodies the spirit of India's royal heritage while providing modern comfort and sustainability.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-grey)',
                lineHeight: '1.8'
              }}
            >
              Set against the dramatic desert landscape, the 50-room resort features locally sourced sandstone, intricate jali screens, and water features inspired by ancient stepwells.
            </p>
          </motion.div>

          {/* Right: Project Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#F5F5F5] p-8 md:p-10"
          >
            <h3 
              className="text-sm tracking-[0.15em] uppercase mb-8"
              style={{ 
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-black)',
                fontWeight: 500
              }}
            >
              Project Details
            </h3>

            <div className="space-y-6">
              {[
                { label: 'Location', value: 'Rajasthan, India' },
                { label: 'Project Type', value: 'Hospitality / Resort' },
                { label: 'Client', value: 'Heritage Hotels Group' },
                { label: 'Area', value: '45,000 sq ft' },
                { label: 'Status', value: 'Completed 2025' },
                { label: 'Architect', value: 'Wanderlust Architects' },
              ].map((item, index) => (
                <div key={index} className="border-b border-black/10 pb-4">
                  <div 
                    className="text-xs tracking-wide uppercase mb-2"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-text-grey)'
                    }}
                  >
                    {item.label}
                  </div>
                  <div 
                    className="text-base"
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-black)',
                      fontWeight: 400
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
