import { motion } from 'motion/react';

export function MaterialPalette() {
  const materials = [
    {
      name: 'Rajasthan Sandstone',
      description: 'Locally quarried yellow sandstone',
      image: 'https://images.unsplash.com/photo-1620843002805-05a08cb72f57?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Reclaimed Teak',
      description: 'Hand-carved vintage wood',
      image: 'https://images.unsplash.com/photo-1551191922-a9333d879ebd?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Jaisalmer Stone',
      description: 'Golden limestone accents',
      image: 'https://images.unsplash.com/photo-1611842111201-fe2579c94fe3?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Brass Details',
      description: 'Hand-forged metalwork',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Terracotta Tiles',
      description: 'Traditional clay roofing',
      image: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?w=800&auto=format&fit=crop&q=60'
    },
    {
      name: 'Natural Fabrics',
      description: 'Handwoven textiles',
      image: 'https://images.unsplash.com/photo-1551191922-a9333d879ebd?w=800&auto=format&fit=crop&q=60'
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
            Material Palette
          </h2>
          <p 
            className="text-lg max-w-3xl"
            style={{ 
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-grey)',
              lineHeight: '1.8'
            }}
          >
            A curated selection of regional materials celebrates local craftsmanship while ensuring durability in the desert climate.
          </p>
        </motion.div>

        {/* Material Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gray-200 mb-4 aspect-square">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <h3 
                className="text-base mb-1"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-black)'
                }}
              >
                {material.name}
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                {material.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
