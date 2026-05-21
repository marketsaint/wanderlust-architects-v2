import { forwardRef, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { BrandLogo } from './brand-logo';
import { Button, Container } from './ui';

const PRIMARY_LINKS = [
  { href: '__home__', label: 'Home' },
  { href: '/about', label: 'Studio' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Journal' },
  { href: '/career', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

const desktopNavItemClassName =
  'inline-flex items-center justify-center px-3 py-2.5 text-[10px] font-semibold uppercase leading-none tracking-[0.28em] transition-[background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

export const SiteNavbar = forwardRef<HTMLElement>(function SiteNavbar(_, ref) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeActive = pathname === '/' || pathname === '/india' || pathname === '/dubai';

  const isActiveLink = (href: string) => {
    if (href === '__home__') {
      return isHomeActive;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header ref={ref} className='sticky top-0 z-50'>
      <Container className='pt-3 sm:pt-4'>
        <div
          className={cn(
            'border border-black/10 bg-[rgba(248,243,234,0.82)] backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300',
            scrolled ? 'shadow-[0_26px_80px_-54px_rgba(16,12,8,0.38)]' : 'shadow-[0_18px_46px_-38px_rgba(16,12,8,0.18)]',
          )}
        >
          <div className='grid items-center gap-4 px-4 py-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:px-6'>
            <div className='flex min-w-0 items-center justify-between gap-3 lg:justify-self-start'>
              <Link to='/' className='min-w-0'>
                <BrandLogo
                  className='justify-start gap-3'
                  iconClassName='h-8 w-auto'
                  textClassName='truncate text-[10px] tracking-[0.3em]'
                />
              </Link>

              <button
                type='button'
                className='inline-flex h-11 w-11 items-center justify-center border border-black/10 text-black transition hover:border-black/20 hover:bg-white/60 lg:hidden'
                onClick={() => setMobileOpen((current) => !current)}
                aria-expanded={mobileOpen}
                aria-controls='site-mobile-navigation'
                aria-label='Toggle navigation'
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            <nav className='hidden items-center justify-center gap-1 lg:flex' aria-label='Primary navigation'>
              {PRIMARY_LINKS.map((item) => {
                const href = item.href === '__home__' ? '/' : item.href;
                const active = isActiveLink(item.href);

                return (
                  <Link
                    key={item.label}
                    to={href}
                    className={cn(
                      desktopNavItemClassName,
                      active
                        ? 'bg-black !text-white hover:bg-black hover:!text-white'
                        : 'text-[#4f483f] hover:bg-black hover:!text-white',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className='hidden items-center justify-end gap-3 lg:flex'>
              <Button href='/contact' className='min-w-[10.25rem] px-4 py-3 text-[10px] tracking-[0.28em]'>
                Start Project
              </Button>
            </div>
          </div>

          <div
            id='site-mobile-navigation'
            className={cn(
              'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden',
              mobileOpen ? 'opacity-100 [grid-template-rows:1fr]' : 'opacity-0 [grid-template-rows:0fr]',
            )}
            >
              <div className='overflow-hidden border-t border-black/10 px-4 pb-4 pt-4 sm:px-5'>
                <div className='grid gap-3'>
                <nav className='grid gap-1' aria-label='Mobile navigation'>
                  {PRIMARY_LINKS.map((item) => {
                    const href = item.href === '__home__' ? '/' : item.href;
                    const active = isActiveLink(item.href);

                    return (
                      <Link
                        key={item.label}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'inline-flex min-h-11 items-center justify-between border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                          active
                            ? 'border-black bg-black !text-white hover:bg-black hover:!text-white'
                            : 'border-black/10 bg-white/54 text-[#4f483f] hover:border-black hover:bg-black hover:!text-white',
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <Button href='/contact' className='w-full justify-center text-[10px] tracking-[0.28em]' onClick={() => setMobileOpen(false)}>
                  Start Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
});
