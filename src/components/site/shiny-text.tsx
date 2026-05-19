import { useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from '@/app/components/ui/utils';

type ShinyTextProps = {
  speedInMs?: number;
  hoverTextColor?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function ShinyText({
  children,
  speedInMs = 3000,
  hoverTextColor,
  className,
  style,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: ShinyTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const updateShinePosition = (clientX: number) => {
    if (!rootRef.current) {
      return;
    }

    const rect = rootRef.current.getBoundingClientRect();
    if (!rect.width) {
      return;
    }

    const ratio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    rootRef.current.style.setProperty('--shine-pos', `${(clamped * 100).toFixed(2)}%`);
  };

  return (
    <>
      <style>{`
        @keyframes shiny-text-shine {
          0% {
            background-position: 220% 50%;
          }
          100% {
            background-position: -120% 50%;
          }
        }
      `}</style>
      <span
        ref={rootRef}
        className={cn('relative inline-block isolate text-current', className)}
        style={{ '--shine-pos': '50%', '--shiny-hover-color': hoverTextColor ?? 'currentColor', ...(style as CSSProperties) } as CSSProperties}
        onPointerEnter={(event) => {
          setIsHovering(true);
          updateShinePosition(event.clientX);
          onPointerEnter?.(event);
        }}
        onPointerMove={(event) => {
          updateShinePosition(event.clientX);
          onPointerMove?.(event);
        }}
        onPointerLeave={(event) => {
          setIsHovering(false);
          onPointerLeave?.(event);
        }}
        {...props}
      >
        <span
          className='relative z-[1] text-current transition-[color,opacity,filter] duration-200'
          style={{
            opacity: isHovering ? 1 : 0.9,
            color: isHovering ? 'var(--shiny-hover-color)' : undefined,
            filter: isHovering ? 'drop-shadow(0 0 18px rgba(255,241,214,0.34))' : 'none',
          }}
        >
          {children}
        </span>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-[2] inline-block text-transparent'
          style={{
            backgroundImage:
              'linear-gradient(110deg, rgba(255,255,255,0) 32%, rgba(255,255,255,0.42) 43%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.42) 57%, rgba(255,255,255,0) 68%)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isHovering ? 'var(--shine-pos) 50%' : '220% 50%',
            backgroundSize: '190% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.48))',
            animation: isHovering ? 'none' : `shiny-text-shine ${speedInMs}ms linear infinite`,
            transition: isHovering ? 'background-position 80ms linear' : 'none',
          }}
        >
          {children}
        </span>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-[2] inline-block text-transparent'
          style={{
            backgroundImage:
              'linear-gradient(110deg, rgba(255,255,255,0) 32%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.74) 50%, rgba(255,255,255,0.22) 55%, rgba(255,255,255,0) 68%)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isHovering ? 'var(--shine-pos) 50%' : '220% 50%',
            backgroundSize: '190% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'blur(4px)',
            opacity: 0.68,
            animation: isHovering ? 'none' : `shiny-text-shine ${speedInMs}ms linear infinite`,
            transition: isHovering ? 'background-position 80ms linear' : 'none',
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
}
