import { motion } from 'motion/react';

interface FullWidthImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function FullWidthImage({ src, alt, caption }: FullWidthImageProps) {
  return (
    <section className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          style={{ maxHeight: '85vh' }}
        />
      </motion.div>

      {caption && (
        <motion.div
          className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p 
            className="text-sm text-center"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-grey)',
              fontStyle: 'italic'
            }}
          >
            {caption}
          </p>
        </motion.div>
      )}
    </section>
  );
}
