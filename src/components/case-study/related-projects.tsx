import { motion } from 'motion/react';

export function RelatedProjects() {
  const projects = [
    {
      title: 'Urban Tower London',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMTA4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Minimalist Haven',
      location: 'Copenhagen, Denmark',
      image: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY29udGVtcG9yYXJ5JTIwaG91c2UlMjBkZXNpZ258ZW58MXx8fHwxNzczMTY2NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Azure Heights',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMxNjY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

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
            Related Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href="#"
              className="group block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden bg-white mb-4 aspect-[3/4]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <h3 
                className="text-xl mb-2 group-hover:text-[#C8BBAA] transition-colors duration-300"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-black)'
                }}
              >
                {project.title}
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-grey)'
                }}
              >
                {project.location}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
