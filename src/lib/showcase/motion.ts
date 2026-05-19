// Motion tokens for consistent animation across the showcase

export const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

export const cardHover = {
  rest: {
    scale: 1,
    y: 0
  },
  hover: {
    scale: 1.03,
    y: -6,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22
    }
  }
};

export const imageHover = {
  rest: { scale: 1, x: 0, y: 0 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};

export const layoutTransition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8
};

export const heroReveal = {
  hidden: { opacity: 0, y: 40, scale: 1.08 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const maskReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};
