import { CardSize } from './projects';

// Grid configuration for different card sizes
export const cardDimensions: Record<CardSize, { cols: number; height: number }> = {
  large: { cols: 6, height: 720 },
  medium: { cols: 4, height: 560 },
  small: { cols: 3, height: 420 },
  tall: { cols: 4, height: 760 },
  wide: { cols: 8, height: 640 },
};

// Calculate grid column span for different breakpoints
export const getGridSpan = (size: CardSize, breakpoint: 'mobile' | 'tablet' | 'desktop') => {
  if (breakpoint === 'mobile') {
    return 'col-span-2'; // Most cards full width on mobile
  }
  
  if (breakpoint === 'tablet') {
    if (size === 'large' || size === 'wide') return 'col-span-6';
    return 'col-span-3';
  }
  
  // Desktop
  const { cols } = cardDimensions[size];
  return `col-span-${cols}`;
};

// Get height class for cards
export const getHeightClass = (size: CardSize, breakpoint: 'mobile' | 'tablet' | 'desktop') => {
  if (breakpoint === 'mobile') {
    return size === 'large' || size === 'wide' ? 'h-[420px]' : 'h-[320px]';
  }
  
  if (breakpoint === 'tablet') {
    if (size === 'large' || size === 'wide') return 'h-[620px]';
    if (size === 'tall') return 'h-[620px]';
    return 'h-[460px]';
  }
  
  // Desktop
  const { height } = cardDimensions[size];
  return `h-[${height}px]`;
};
