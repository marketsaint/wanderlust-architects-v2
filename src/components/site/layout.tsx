import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { FloatingWhatsAppButton } from './floating-whatsapp-button';
import { BrandLogo } from './brand-logo';
import { Button, Container } from './ui';
import { getContactByRegion, getRegionFromPathname, siteSocialLinks } from '@/lib/site-content';
import { getRegionRoute, getRegionKeyFromPathname, persistSiteRegion, type SiteRegionKey } from '@/lib/site-region';

const PRIMARY_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'Studio' },
  { href: '/blog', label: 'Journal' },
  { href: '/career', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

function useScrollToTop() {
  const pathname = useLocation().pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] transition',
        active ? 'bg-black text-white' : 'text-[#5e564c] hover:text-black',
      )}
    >
      {label}
    </Link>
  );
}

function Footer() {
  return (
    <footer className='border-t border-black/10 bg-[#f8f3ea]'>
      <Container className='grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16'>
        <div className='grid gap-5'>
          <BrandLogo className='justify-start gap-3' iconClassName='h-8 w-auto' textClassName='text-[10px] tracking-[0.3em]' />
          <p className='max-w-xl text-sm leading-8 text-[#5d554b]'>
            Wanderlust Architects shapes residences, hospitality environments, branded interiors, and fit-outs across India and the UAE with a calm, editorial, delivery-aware approach.
          </p>
          <div className='flex flex-wrap gap-2'>
            <Button href='mailto:studio@wanderlustarchitects.com' variant='ghost'>
              email studio
            </Button>
            <Button href='/projects'>browse projects</Button>
          </div>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          <div className='grid gap-3'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#786f64]'>Navigate</p>
            <div className='grid gap-2 text-sm leading-7 text-[#5d554b]'>
              <Link to={getRegionRoute('india')} className='transition hover:text-black'>
                India home
              </Link>
              <Link to={getRegionRoute('dubai')} className='transition hover:text-black'>
                Dubai home
              </Link>
              {PRIMARY_LINKS.map((link) => (
                <Link key={link.href} to={link.href} className='transition hover:text-black'>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='grid gap-3'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#786f64]'>Studios</p>
            <div className='grid gap-4 text-sm leading-7 text-[#5d554b]'>
              <div>
                <p className='font-semibold text-[#181411]'>Jaipur, India</p>
                <p>C-Scheme, Rajasthan</p>
                <a href='tel:+919828485111' className='transition hover:text-black'>
                  +91 98284 85111
                </a>
              </div>
              <div>
                <p className='font-semibold text-[#181411]'>Dubai, UAE</p>
                <p>Ibn Battuta, Jebel Ali</p>
                <a href='tel:+971545052126' className='transition hover:text-black'>
                  +971 54 505 2126
                </a>
              </div>
            </div>
          </div>

          <div className='grid gap-3'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#786f64]'>Elsewhere</p>
            <div className='grid gap-2 text-sm leading-7 text-[#5d554b]'>
              {siteSocialLinks.map((link) => (
                <a key={link.label} href={link.href} target='_blank' rel='noreferrer' className='transition hover:text-black'>
                  {link.label}
                </a>
              ))}
              <a href='mailto:studio@wanderlustarchitects.com' className='transition hover:text-black'>
                studio@wanderlustarchitects.com
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className='border-t border-black/10 py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#786f64]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p>Copyright {new Date().getFullYear()} Wanderlust Architects. All rights reserved.</p>
          <Link to='/contact' className='inline-flex items-center gap-2 text-[#181411] transition hover:text-black'>
            <span>Start an inquiry</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export function SiteLayout({ children }: { children?: ReactNode }) {
  useScrollToTop();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const isProjectsArchive = pathname === '/projects';
  const [activeRegion, setActiveRegion] = useState<SiteRegionKey>(() => getRegionKeyFromPathname(pathname));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActiveRegion(getRegionKeyFromPathname(pathname));
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const contact = useMemo(() => getContactByRegion(getRegionFromPathname(pathname)), [pathname]);
  const homeHref = getRegionRoute(activeRegion);

  const isActiveLink = (href: string) => {
    if (href === homeHref) {
      return pathname === '/india' || pathname === '/dubai';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleRegionSelect = (regionKey: SiteRegionKey) => {
    setActiveRegion(regionKey);
    persistSiteRegion(regionKey);
    navigate(getRegionRoute(regionKey));
  };

  return (
    <div className='relative min-h-screen bg-[#f3ece2] text-[#15120f]'>
      {!isProjectsArchive ? <div className='site-grain pointer-events-none fixed inset-0 z-0 opacity-35' /> : null}

      {!isProjectsArchive ? (
        <header className='sticky top-0 z-50'>
          <Container className='pt-4'>
            <div
              className={cn(
                'border border-black/10 px-4 py-3 backdrop-blur-xl transition sm:px-5',
                scrolled ? 'bg-[rgba(248,243,234,0.92)] shadow-[0_18px_54px_-40px_rgba(13,11,8,0.28)]' : 'bg-[rgba(248,243,234,0.74)]',
              )}
            >
              <div className='flex items-center justify-between gap-4'>
                <Link to={homeHref} className='min-w-0'>
                  <BrandLogo className='justify-start gap-2.5' iconClassName='h-7 w-auto sm:h-8' textClassName='truncate text-[9px] tracking-[0.3em] sm:text-[10px]' />
                </Link>

                <nav className='hidden items-center gap-1 xl:flex' aria-label='Primary'>
                  <NavLink href={homeHref} label='Home' active={isActiveLink(homeHref)} />
                  {PRIMARY_LINKS.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} active={isActiveLink(link.href)} />
                  ))}
                </nav>

                <div className='hidden items-center gap-3 xl:flex'>
                  <div className='flex items-center gap-1 border border-black/10 bg-white/78 px-1 py-1'>
                    {(['india', 'dubai'] as SiteRegionKey[]).map((regionKey) => {
                      const active = activeRegion === regionKey;

                      return (
                        <button
                          key={regionKey}
                          type='button'
                          onClick={() => handleRegionSelect(regionKey)}
                          className={cn(
                            'px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] transition',
                            active ? 'bg-black text-white' : 'text-[#5e564c] hover:text-black',
                          )}
                        >
                          {regionKey === 'dubai' ? 'UAE' : 'India'}
                        </button>
                      );
                    })}
                  </div>
                  <Button href='/contact'>start inquiry</Button>
                </div>

                <button
                  type='button'
                  className='inline-flex h-11 w-11 items-center justify-center border border-black/10 text-black xl:hidden'
                  onClick={() => setOpen((current) => !current)}
                  aria-expanded={open}
                  aria-label='Toggle navigation'
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>

              <div
                className={cn(
                  'grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-300 xl:hidden',
                  open ? 'mt-4 opacity-100 [grid-template-rows:1fr]' : 'mt-0 opacity-0 [grid-template-rows:0fr]',
                )}
              >
                <div className='overflow-hidden border-t border-black/10 pt-4'>
                  <div className='grid gap-3'>
                    <div className='flex items-center gap-1 border border-black/10 bg-white/78 px-1 py-1'>
                      {(['india', 'dubai'] as SiteRegionKey[]).map((regionKey) => {
                        const active = activeRegion === regionKey;

                        return (
                          <button
                            key={regionKey}
                            type='button'
                            onClick={() => handleRegionSelect(regionKey)}
                            className={cn(
                              'flex-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] transition',
                              active ? 'bg-black text-white' : 'text-[#5e564c] hover:text-black',
                            )}
                          >
                            {regionKey === 'dubai' ? 'UAE' : 'India'}
                          </button>
                        );
                      })}
                    </div>

                    <div className='grid gap-2'>
                      <NavLink href={homeHref} label='Home' active={isActiveLink(homeHref)} onClick={() => setOpen(false)} />
                      {PRIMARY_LINKS.map((link) => (
                        <NavLink key={link.href} href={link.href} label={link.label} active={isActiveLink(link.href)} onClick={() => setOpen(false)} />
                      ))}
                    </div>

                    <Button href='/contact' className='w-full' onClick={() => setOpen(false)}>
                      start inquiry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </header>
      ) : null}

      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-black focus:bg-white focus:px-4 focus:py-2'
      >
        Skip to content
      </a>

      <main id='main-content' className='relative z-10'>
        {children ?? <Outlet />}
      </main>

      <FloatingWhatsAppButton href={contact.whatsapp} />
      <Footer />
    </div>
  );
}
