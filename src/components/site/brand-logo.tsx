import { cn } from '@/app/components/ui/utils';

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  iconImageClassName?: string;
  iconSrc?: string;
  textClassName?: string;
  text?: string;
}

export function BrandLogo({
  className,
  iconClassName,
  iconImageClassName,
  iconSrc = '/branding/wanderlust_architects_logo-icon-Black.png',
  textClassName,
  text = 'WANDERLUST ARCHITECTS',
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center justify-center gap-3 align-middle', className)}>
      <img
        src={iconSrc}
        alt=''
        aria-hidden='true'
        className={cn('block h-12 w-auto shrink-0 self-center object-contain align-middle', iconClassName, iconImageClassName)}
      />
      <span
        className={cn(
          'inline-flex items-center self-center text-[10px] font-semibold uppercase leading-none tracking-[0.28em] text-black',
          textClassName,
        )}
      >
        {text}
      </span>
    </span>
  );
}
