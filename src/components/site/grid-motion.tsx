import { useEffect, useRef } from 'react';
import './grid-motion.css';

const TOTAL_ITEMS = 28;
const ROWS = 4;
const ITEMS_PER_ROW = 7;
const SPEED_MULTIPLIER = 2;

type GridMotionProps = {
  items?: string[];
  gradientColor?: string;
  className?: string;
  disabled?: boolean;
};

export function GridMotion({ items = [], gradientColor = 'rgba(0,0,0,0.66)', className = '', disabled = false }: GridMotionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const segmentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rowOffsetsRef = useRef<number[]>([]);
  const rowDistancesRef = useRef<number[]>([]);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const speedRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const defaultItems = Array.from({ length: TOTAL_ITEMS }, (_, index) => `Item ${index + 1}`);
  const filteredItems = items.filter(Boolean);
  const combinedItems =
    filteredItems.length > 0
      ? Array.from({ length: TOTAL_ITEMS }, (_, index) => filteredItems[index % filteredItems.length])
      : defaultItems;

  useEffect(() => {
    if (typeof window === 'undefined' || disabled) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    const handlePointerEnter = () => {
      isHoveringRef.current = true;
    };

    const handlePointerLeave = () => {
      isHoveringRef.current = false;
    };

    const updateDistances = () => {
      rowDistancesRef.current = rowRefs.current.map((row, index) => {
        const firstSegment = segmentRefs.current[index];
        if (!row || !firstSegment) {
          return 0;
        }

        const rowStyles = window.getComputedStyle(row);
        const gap = parseFloat(rowStyles.columnGap || rowStyles.gap || '0');
        return firstSegment.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
      });
    };

    const updateMotion = (time: number) => {
      const isReduced = reducedMotionRef.current;
      const isActive = isHoveringRef.current;
      const basePixelsPerSecond = (isReduced ? 8 : 18) * SPEED_MULTIPLIER;
      const hoverPixelsPerSecond = (isReduced ? 22 : 96) * SPEED_MULTIPLIER;
      const targetSpeed = isActive ? hoverPixelsPerSecond : basePixelsPerSecond;
      const dt = lastTimeRef.current ? Math.min(0.05, (time - lastTimeRef.current) / 1000) : 0;

      lastTimeRef.current = time;
      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 9);
      const speed = speedRef.current;

      rowRefs.current.forEach((row, index) => {
        if (!row) {
          return;
        }

        const distance = rowDistancesRef.current[index];
        if (!distance) {
          return;
        }

        const direction = index % 2 === 0 ? 1 : -1;
        let offset = rowOffsetsRef.current[index] || 0;
        offset += direction * speed * dt;

        if (offset >= distance) {
          offset -= distance;
        }

        if (offset <= -distance) {
          offset += distance;
        }

        rowOffsetsRef.current[index] = offset;
        row.style.transform = `translate3d(${offset}px, 0, 0)`;
      });

      frameRef.current = window.requestAnimationFrame(updateMotion);
    };

    const containerElement = containerRef.current;
    rowOffsetsRef.current = rowRefs.current.map(() => 0);
    updateDistances();

    window.addEventListener('resize', updateDistances);
    containerElement?.addEventListener('pointerenter', handlePointerEnter);
    containerElement?.addEventListener('pointerleave', handlePointerLeave);
    frameRef.current = window.requestAnimationFrame(updateMotion);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionPreference);
    } else {
      mediaQuery.addListener(handleMotionPreference);
    }

    return () => {
      window.removeEventListener('resize', updateDistances);
      containerElement?.removeEventListener('pointerenter', handlePointerEnter);
      containerElement?.removeEventListener('pointerleave', handlePointerLeave);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionPreference);
      } else {
        mediaQuery.removeListener(handleMotionPreference);
      }

      rowRefs.current.forEach((row) => {
        if (row) {
          row.style.transform = '';
        }
      });
    };
  }, [disabled]);

  return (
    <div className={`wa-gridmotion ${className}`} aria-hidden='true'>
      <section
        ref={containerRef}
        className='wa-gridmotion__intro'
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradientColor} 0%, transparent 78%)`,
        }}
      >
        <div className='wa-gridmotion__container'>
          {Array.from({ length: ROWS }).map((_, rowIndex) => {
            const rowItems = Array.from({ length: ITEMS_PER_ROW }, (_, itemIndex) => combinedItems[rowIndex * ITEMS_PER_ROW + itemIndex]);

            return (
              <div key={rowIndex} className='wa-gridmotion__row' ref={(element) => { rowRefs.current[rowIndex] = element; }}>
                {[0, 1].map((segmentIndex) => (
                  <div
                    key={`${rowIndex}-${segmentIndex}`}
                    className='wa-gridmotion__segment'
                    ref={segmentIndex === 0 ? (element) => { segmentRefs.current[rowIndex] = element; } : undefined}
                  >
                    {rowItems.map((content, itemIndex) => {
                      const isImage = typeof content === 'string' && /^https?:\/\//.test(content);

                      return (
                        <div key={`${rowIndex}-${segmentIndex}-${itemIndex}`} className='wa-gridmotion__item'>
                          <div className='wa-gridmotion__item-inner'>
                            {isImage ? (
                              <>
                                <div className='wa-gridmotion__item-img' style={{ backgroundImage: `url(${content})` }} />
                                <div className='wa-gridmotion__item-img-overlay' />
                              </>
                            ) : (
                              <div className='wa-gridmotion__item-content'>{content}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className='wa-gridmotion__mono-overlay' />
      </section>
    </div>
  );
}
