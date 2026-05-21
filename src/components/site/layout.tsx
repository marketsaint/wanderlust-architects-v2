import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';
import { FloatingWhatsAppButton } from './floating-whatsapp-button';
import { BrandLogo } from './brand-logo';
import { SiteNavbar } from './site-navbar';
import { Button, Container } from './ui';
import { getContactByRegion, getRegionFromPathname, siteSocialLinks } from '@/lib/site-content';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
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
              {FOOTER_LINKS.map((link) => (
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
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const isProjectsArchive = pathname === '/projects';
  const isCustomHome = pathname === '/';

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    const updateHeight = () => {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const contact = useMemo(() => getContactByRegion(getRegionFromPathname(pathname)), [pathname]);
  const layoutStyle = useMemo(
    () =>
      ({
        '--site-header-height': `${headerHeight}px`,
      }) as CSSProperties,
    [headerHeight],
  );

  return (
    <div className='relative min-h-screen bg-[#f3ece2] text-[#15120f]' style={layoutStyle}>
      {!isProjectsArchive && !isCustomHome ? <div className='site-grain pointer-events-none fixed inset-0 z-0 opacity-35' /> : null}

      <SiteNavbar ref={headerRef} />

      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-black focus:bg-white focus:px-4 focus:py-2'
      >
        Skip to content
      </a>

      <main id='main-content' className='relative z-10'>
        {children ?? <Outlet />}
      </main>

      {!isProjectsArchive && !isCustomHome ? <FloatingWhatsAppButton href={contact.whatsapp} /> : null}
      {!isProjectsArchive && !isCustomHome ? <Footer /> : null}
    </div>
  );
}
