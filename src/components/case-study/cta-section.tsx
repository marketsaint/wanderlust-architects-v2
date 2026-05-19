import { motion } from 'motion/react';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F5F5F5]">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
            style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-black)',
              fontWeight: 400
            }}
          >
            Start Your Project With Wanderlust Architects
          </h2>
          <p 
            className="text-lg mb-10 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-grey)',
              lineHeight: '1.8'
            }}
          >
            Let's collaborate to create spaces that inspire and endure. Our team is ready to bring your architectural vision to life.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-black text-white text-sm tracking-wider uppercase transition-all duration-300"
            style={{ fontFamily: 'var(--font-sans)' }}
            whileHover={{ scale: 1.05, backgroundColor: '#C8BBAA' }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
