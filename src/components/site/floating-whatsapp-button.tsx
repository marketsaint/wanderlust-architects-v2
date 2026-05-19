import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'motion/react';

type FloatingWhatsAppButtonProps = {
  href: string;
};

export function FloatingWhatsAppButton({ href }: FloatingWhatsAppButtonProps) {
  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noreferrer'
      aria-label='Chat with Wanderlust Architects on WhatsApp'
      className='whatsapp-fab fixed bottom-4 right-4 z-[90] inline-flex items-center justify-center border border-black/10 bg-white/92 p-3 text-black shadow-[0_22px_46px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:bottom-6 sm:right-6'
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className='whatsapp-fab__icon flex h-10 w-10 items-center justify-center bg-[#25D366] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]'>
        <WhatsAppIcon fontSize='small' />
      </span>
    </motion.a>
  );
}
