import { useEffect, useMemo, useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode, type Ref } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/app/components/ui/utils';
import { ShinyText } from './shiny-text';

function useMagneticMotion(disabled: boolean, config: { translate?: number; rotate?: number; scale?: number; stiffness?: number; damping?: number } = {}) {
  const { translate = 8, rotate = 6, scale = 1.02, stiffness = 220, damping = 24 } = config;

  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const zoom = useMotionValue(1);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });
  const springRotateX = useSpring(rotateX, { stiffness, damping });
  const springRotateY = useSpring(rotateY, { stiffness, damping });
  const springScale = useSpring(zoom, { stiffness: 220, damping: 18 });
  const springGlowOpacity = useSpring(glowOpacity, { stiffness: 220, damping: 22 });

  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.22), transparent 64%)`;

  const applyVector = (normX: number, normY: number, localX = 50, localY = 50) => {
    x.set(normX * translate);
    y.set(normY * translate);
    rotateY.set(normX * rotate);
    rotateX.set(-normY * rotate);
    zoom.set(scale);
    glowX.set(localX);
    glowY.set(localY);
    glowOpacity.set(1);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    zoom.set(1);
    glowOpacity.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (disabled || !ref.current) {
      return;
    }

    const rect = rectRef.current || ref.current.getBoundingClientRect();
    rectRef.current = rect;
    if (!rect.width || !rect.height) {
      return;
    }

    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const normX = (localX / rect.width - 0.5) * 2;
    const normY = (localY / rect.height - 0.5) * 2;
    const glowPosX = (localX / rect.width) * 100;
    const glowPosY = (localY / rect.height) * 100;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      applyVector(normX, normY, glowPosX, glowPosY);
      rafRef.current = 0;
    });
  };

  const onPointerEnter = () => {
    if (disabled) {
      return;
    }

    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }

    applyVector(0, -0.55, 50, 50);
  };

  const onPointerDown = () => {
    if (disabled) {
      return;
    }

    zoom.set(scale * 0.97);
  };

  const onPointerUp = () => {
    if (disabled) {
      return;
    }

    zoom.set(scale);
  };

  const onPointerLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    rectRef.current = null;
    reset();
  };

  return {
    ref,
    surfaceStyle: {
      x: springX,
      y: springY,
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    } as CSSProperties,
    glowStyle: {
      background: glow,
      opacity: springGlowOpacity,
    } as CSSProperties,
    handlers: {
      onPointerMove,
      onPointerEnter,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
    },
  };
}

function MagneticLink({ href, className, children, disabled = false, ...props }: { href: string; className: string; children: ReactNode; disabled?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const magnetic = useMagneticMotion(disabled, { translate: 14, rotate: 10, scale: 1.05 });

  return (
    <motion.a href={href} ref={magnetic.ref as Ref<HTMLAnchorElement>} {...magnetic.handlers} className={className} {...props}>
      <motion.span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit]' style={magnetic.glowStyle} />
      <motion.span style={{ ...magnetic.surfaceStyle, willChange: 'transform' }} className='relative z-[1] block [transform-style:preserve-3d]'>
        <span className='block [transform:translateZ(18px)]'>{children}</span>
      </motion.span>
    </motion.a>
  );
}

function MagneticChip({ children, disabled = false }: { children: ReactNode; disabled?: boolean }) {
  const magnetic = useMagneticMotion(disabled, { translate: 11, rotate: 8, scale: 1.045 });

  return (
    <motion.div
      ref={magnetic.ref as Ref<HTMLDivElement>}
      {...magnetic.handlers}
      className='relative flex h-full min-h-[78px] cursor-pointer items-center overflow-hidden border border-white/25 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-white/55 hover:bg-white/10 hover:[box-shadow:0_18px_42px_rgba(0,0,0,0.45)]'
    >
      <motion.span aria-hidden className='pointer-events-none absolute inset-0' style={magnetic.glowStyle} />
      <motion.span style={{ ...magnetic.surfaceStyle, willChange: 'transform' }} className='relative z-[1] block [transform-style:preserve-3d]'>
        <span className='block [transform:translateZ(20px)]'>{children}</span>
      </motion.span>
    </motion.div>
  );
}

type HeroCinematicContentProps = {
  contact: { phone: string; whatsapp: string };
  chips: string[];
  headline: string;
  variant?: 'default' | 'india';
};

export function HeroCinematicContent({ contact, chips, headline, variant = 'default' }: HeroCinematicContentProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isIndiaVariant = variant === 'india';

  useEffect(() => {
    setMounted(true);
  }, []);

  const reducedMotion = mounted ? prefersReducedMotion : false;

  const heroStatements = useMemo(
    () =>
      isIndiaVariant
        ? [
            {
              heading: headline,
              body: 'Wanderlust Architects shapes villas, apartments, boutique hospitality, and executive environments with warm material intelligence, disciplined planning, and site-ready execution clarity.',
            },
          ]
        : [
            {
              heading: headline,
              body: 'From high-value residences and hospitality spaces in Jaipur, Rajasthan to premium workplace and lifestyle projects in Dubai, UAE, our team delivers luxury architecture and interior design with measurable execution clarity. Every stage is structured for decision speed: concept validation, buildable detailing, consultant coordination, and site-ready documentation.',
            },
            {
              heading: 'Design, Fit-Out, and\nDelivery Built for\nSpeed, Clarity, Control.',
              body: 'We design spaces that reduce uncertainty at every phase. Our process aligns concept, approvals, detailing, and site coordination into one clear execution path so investors, founders, and homeowners can move faster with confidence.',
            },
            {
              heading: 'From Brief to Handover,\nEvery Decision Built\nfor Site Precision.',
              body: 'Wanderlust Architects combines design intelligence with delivery control. You get structured timelines, BOQ-ready documentation, and a single-point team that protects intent, speed, and quality across architecture, interiors, and fit-outs.',
            },
            {
              heading: 'Luxury Architecture and\nInteriors Structured for\nBuildable Execution.',
              body: 'Our studio balances aesthetic depth with technical rigor. From premium residences and hospitality to office environments, we build decision-ready design systems that perform on site, not just in presentations.',
            },
          ],
    [headline, isIndiaVariant],
  );

  useEffect(() => {
    if (heroStatements.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroStatements.length);
    }, reducedMotion ? 7200 : 5600);

    return () => window.clearInterval(intervalId);
  }, [heroStatements.length, reducedMotion]);

  const headlineStart = isIndiaVariant ? 0.28 : 0.9;
  const ctaDelay = headlineStart + 0.84;
  const chipsDelay = ctaDelay + 0.14;
  const activeStatement = heroStatements[activeIndex] || heroStatements[0];
  const activeHeadingLines = activeStatement.heading.split('\n').slice(0, 3);

  return (
    <div className='relative w-full'>
      <motion.div
        className='relative z-10 w-full [perspective:1600px] [transform-style:preserve-3d]'
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={cn('min-h-[17.5rem] max-w-5xl', isIndiaVariant && 'max-w-[52rem]')}>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={activeIndex}
              initial={reducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -14, filter: 'blur(5px)' }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: activeIndex === 0 ? headlineStart : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={cn('relative max-w-5xl', isIndiaVariant && 'max-w-[52rem]')}>
                <div
                  className={cn(
                    'pointer-events-none absolute -inset-x-5 -inset-y-6 rounded-[34px] bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(120deg,rgba(7,7,9,0.38)_0%,rgba(7,7,9,0.24)_42%,rgba(7,7,9,0.12)_100%)] backdrop-blur-[2px]',
                    isIndiaVariant &&
                      'bg-[radial-gradient(circle_at_14%_14%,rgba(244,226,189,0.11),transparent_24%),linear-gradient(120deg,rgba(10,9,8,0.72)_0%,rgba(10,9,8,0.44)_42%,rgba(10,9,8,0.18)_100%)]',
                  )}
                />
                <div className='relative z-[1]'>
                  {isIndiaVariant ? (
                    <p className='mb-4 text-[10px] uppercase tracking-[0.34em] text-[#d8c2a0]/64'>India Studio | Jaipur + Surat</p>
                  ) : null}
                  <h1
                    aria-label={activeHeadingLines.join(' ')}
                    className={cn(
                      'text-4xl leading-[0.98] text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.82)] sm:text-5xl lg:text-[5.15rem] [transform-style:preserve-3d]',
                      isIndiaVariant && 'max-w-[9ch] text-[#f3ead8] lg:text-[4.15rem] xl:text-[4.5rem]',
                    )}
                  >
                    <ShinyText speedInMs={7000} hoverTextColor={isIndiaVariant ? '#f3d8aa' : '#f7e1b2'} className='inline-flex flex-col gap-1'>
                      {activeHeadingLines.map((line) => (
                        <span key={line} className='block'>
                          {line}
                        </span>
                      ))}
                    </ShinyText>
                  </h1>

                  <p
                    className={cn(
                      'mt-5 max-w-4xl text-sm leading-relaxed text-zinc-200 sm:text-base [transform-style:preserve-3d] drop-shadow-[0_5px_16px_rgba(0,0,0,0.74)]',
                      isIndiaVariant && 'max-w-2xl text-[#f1ece4]/82',
                    )}
                  >
                    {activeStatement.body}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className={cn('mt-8 flex flex-wrap gap-3', isIndiaVariant && 'max-w-3xl')}
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { delay: ctaDelay, duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticLink
            href={`tel:${contact.phone}`}
            className='relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-md border border-white bg-white/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] !text-[#140d06] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition-[background-color,color,letter-spacing,box-shadow,filter] duration-300 ease-out hover:bg-[#120b05] hover:!text-white hover:tracking-[0.22em] hover:[box-shadow:0_20px_42px_rgba(0,0,0,0.62)] hover:[filter:brightness(1.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
          >
            Book Consultation
          </MagneticLink>
          <MagneticLink
            href={contact.whatsapp}
            className='relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-md border border-white/70 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[border-color,background-color,color,letter-spacing,box-shadow,filter] duration-300 ease-out hover:border-white hover:bg-white hover:!text-[#120b05] hover:tracking-[0.22em] hover:[box-shadow:0_20px_42px_rgba(0,0,0,0.62)] hover:[filter:brightness(1.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
            target='_blank'
            rel='noreferrer'
          >
            WhatsApp
          </MagneticLink>
        </motion.div>

        <motion.div
          className={cn('mt-6 grid max-w-5xl gap-3 sm:grid-cols-3 sm:auto-rows-fr', isIndiaVariant && 'max-w-[54rem]')}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { delay: chipsDelay, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          {chips.map((chip, index) => (
            <motion.div
              key={chip}
              className='h-full'
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { delay: chipsDelay + index * 0.08, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticChip>{chip}</MagneticChip>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
