import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-10 xl:px-12', className)} {...props}>
      {children}
    </div>
  );
}

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'ghost' | 'subtle';
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const buttonVariants = {
  primary: 'border border-ink bg-ink !text-white shadow-[0_20px_44px_-28px_rgba(0,0,0,0.55)] hover:bg-[#23211e] hover:border-[#23211e]',
  ghost: 'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white',
  subtle: 'border border-black/12 bg-[#fbf8f2] text-ink hover:border-black/22 hover:bg-white',
};

function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href);
}

export function Button({ href, variant = 'primary', className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-none px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 disabled:cursor-not-allowed disabled:opacity-50',
    buttonVariants[variant],
    className,
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article className={cn('border border-black/12 bg-[#fbf8f2] shadow-soft', className)} {...props}>
      {children}
    </article>
  );
}

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-flex border border-black/12 bg-white/86 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-iron', className)} {...props}>
      {children}
    </span>
  );
}

type TabsProps<T extends string> = {
  items: readonly T[];
  active: T;
  onChange: (item: T) => void;
};

export function Tabs<T extends string>({ items, active, onChange }: TabsProps<T>) {
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item) => {
        const isActive = item === active;

        return (
          <button
            key={item}
            type='button'
            onClick={() => onChange(item)}
            className={cn(
              'border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300',
              isActive ? 'border-ink bg-ink text-white' : 'border-black/12 bg-[#fbf8f2] text-iron hover:border-ink hover:text-ink',
            )}
            aria-pressed={isActive}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full border border-black/12 bg-[#fbf8f2] px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-iron focus:border-ink focus:ring-1 focus:ring-ink/50',
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full border border-black/12 bg-[#fbf8f2] px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-iron focus:border-ink focus:ring-1 focus:ring-ink/50',
        props.className,
      )}
    />
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({ eyebrow, title, description = '', align = 'left', className = '' }: SectionTitleProps) {
  return (
    <div className={cn('space-y-5', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className='h-px w-12 bg-gradient-to-r from-black/0 via-black/40 to-black/0' />
          <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-iron'>{eyebrow}</p>
        </div>
      ) : null}
      <h2 className='max-w-[18ch] text-[clamp(2.5rem,5vw,5.6rem)] font-medium leading-[0.92] text-ink [text-wrap:balance]'>{title}</h2>
      {description ? <p className='max-w-2xl text-sm leading-7 text-iron sm:text-base'>{description}</p> : null}
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  depth?: boolean;
};

export function Reveal({ children, className = '', delay = 0, y = 26, depth = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={depth ? { transformPerspective: 1400, transformStyle: 'preserve-3d' } : undefined}
      initial={depth ? { opacity: 0, y, rotateX: 13, scale: 0.985, filter: 'blur(2px)' } : { opacity: 0, y }}
      whileInView={depth ? { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: depth ? 0.82 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
