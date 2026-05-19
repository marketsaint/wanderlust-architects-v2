import { motion } from 'motion/react';
import { useState } from 'react';

export function ImageGallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1611272267060-82338bad4112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMTY2NjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Resort Exterior',
      span: 'md:col-span-2'
    },
    {
      src: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY29udGVtcG9yYXJ5JTIwaG91c2UlMjBkZXNpZ258ZW58MXx8fHwxNzczMTY2NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Pool Area',
      span: 'md:col-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1758697899438-d53b94633f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjByZXNpZGVudGlhbHxlbnwxfHx8fDE3NzMxNTI0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Courtyard',
      span: 'md:col-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1761427248716-38448abeb90c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG91c2UlMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNjY2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Evening View',
      span: 'md:col-span-2'
    },
    {
      src: 'https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMTA4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Detail Shot',
      span: 'md:col-span-1'
    },
    {
      src: 'https://images.unsplash.com/photo-1750271329214-a7dbce880e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzczMDc3NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Night Lighting',
      span: 'md:col-span-1'
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
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
            Project Gallery
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden bg-gray-200 cursor-pointer group ${image.span}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
