import { type CSSProperties, type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { BrandLogo } from './brand-logo';
import { Badge, Button, Container, Input, Reveal, Textarea } from './ui';
import {
  featuredTestimonials,
  getProjectGallery,
  getProjectHighlights,
  getProjectInsight,
  getProjectMoods,
  getProjectPalette,
  getRegionProfile,
  getRegionProjects,
  getRelatedProjects,
  journalEntries,
  leadershipTeam,
  processNarrative,
  serviceNarrative,
  studioMetrics,
  studioPillars,
  studioPromises,
  type ProjectGalleryFrame,
  type RegionProfile,
} from '@/lib/editorial-content';
import {
  estimateReadTime,
  formatDate,
  getBlogBySlug,
  getContactByRegion,
  getRegionFromPathname,
  siteSocialLinks,
} from '@/lib/site-content';
import { extractToc, markdownToBlocks } from '@/lib/site-markdown';
import { getProjectById, getProjectBySlug, projects, type ProjectRecord } from '@/lib/projects';
import { getRegionRoute, persistSiteRegion, type SiteRegionKey } from '@/lib/site-region';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    }
  }, [description, title]);
}

function useWindowScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;
      setScrollY(window.scrollY);
    };

    const queueUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return scrollY;
}

function useViewportSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window === 'undefined' ? 1440 : window.innerWidth,
    height: typeof window === 'undefined' ? 900 : window.innerHeight,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const update = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

function SectionEyebrow({ children, inverted = false }: { children: string; inverted?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em]', inverted ? 'text-white/68' : 'text-[#746b61]')}>
      <span className={cn('h-px w-12', inverted ? 'bg-white/30' : 'bg-black/15')} />
      <span>{children}</span>
    </div>
  );
}

function MetricGrid({ items, inverted = false }: { items: { label: string; value: string }[]; inverted?: boolean }) {
  return (
    <div className={cn('grid gap-px overflow-hidden border', inverted ? 'border-white/12 bg-white/10' : 'border-black/10 bg-black/5', 'sm:grid-cols-3')}>
      {items.map((item) => (
        <div key={item.label} className={cn('grid gap-2 px-4 py-4 backdrop-blur-sm sm:px-5', inverted ? 'bg-black/16' : 'bg-white/72')}>
          <p className={cn('text-[10px] font-semibold uppercase tracking-[0.3em]', inverted ? 'text-white/56' : 'text-[#7a7065]')}>{item.label}</p>
          <p className={cn('text-sm leading-7 sm:text-base', inverted ? 'text-white' : 'text-[#181411]')}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  priority = false,
  size = 'regular',
}: {
  project: ProjectRecord;
  priority?: boolean;
  size?: 'lead' | 'regular' | 'compact';
}) {
  const palette = getProjectPalette(project);
  const moods = getProjectMoods(project);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className='group relative overflow-hidden border border-black/10 bg-[#fbf7f0]'
    >
      <Link to={`/projects/${project.slug}`} className='grid h-full'>
        <div
          className={cn(
            'relative overflow-hidden',
            size === 'lead' ? 'aspect-[5/4] min-h-[24rem]' : size === 'compact' ? 'aspect-[4/3] min-h-[14rem]' : 'aspect-[4/5] min-h-[18rem]',
          )}
        >
          <img
            src={project.image}
            alt={project.title}
            className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]'
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', palette.accent)} />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.04)_0%,rgba(6,6,6,0.68)_100%)]' />
          <div className='absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/72'>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div className='absolute inset-x-0 bottom-0 grid gap-3 p-5 text-white'>
            <div className='flex flex-wrap gap-2'>
              {moods.slice(0, 2).map((mood) => (
                <span key={mood} className='border border-white/18 bg-black/18 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em]'>
                  {mood}
                </span>
              ))}
            </div>
            <h3 className={cn('max-w-[12ch] leading-[0.9]', size === 'compact' ? 'text-[1.9rem]' : size === 'lead' ? 'text-[clamp(2.6rem,4vw,4.8rem)]' : 'text-[2.4rem]')}>
              {project.title}
            </h3>
            <p className='max-w-[36rem] text-sm leading-7 text-white/78'>{project.description}</p>
          </div>
        </div>
        <div className='grid gap-3 border-t border-black/10 bg-[#fbf7f0] px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center'>
          <div className='grid gap-1 text-sm text-[#534c44]'>
            <span>{project.location}</span>
            <span>{project.projectType}</span>
          </div>
          <div className='inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#15120f]'>
            <span>open case study</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function JournalCard({ slug, title, coverImage, tags, date, excerpt }: { slug: string; title: string; coverImage: string; tags: string[]; date: string; excerpt: string }) {
  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.35 }} className='group overflow-hidden border border-black/10 bg-[#fbf7f0]'>
      <Link to={`/blog/${slug}`} className='grid h-full'>
        <div className='relative aspect-[5/4] overflow-hidden'>
          <img src={coverImage} alt={title} className='h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]' loading='lazy' />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.52)_100%)]' />
          <div className='absolute inset-x-0 bottom-0 p-5'>
            <div className='flex flex-wrap gap-2'>
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className='border border-white/18 bg-black/18 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white'>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='grid gap-4 px-5 py-5'>
          <div className='flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7b7165]'>
            <span>{formatDate(date)}</span>
            <span>{estimateReadTime(excerpt)}</span>
          </div>
          <h3 className='max-w-[15ch] text-[2.2rem] leading-[0.92] text-[#15120f]'>{title}</h3>
          <p className='text-sm leading-7 text-[#585046]'>{excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}

function OfficeCard({
  title,
  address,
  phone,
  email,
  emphasis,
}: {
  title: string;
  address: string;
  phone: string;
  email: string;
  emphasis: string;
}) {
  return (
    <article className='grid gap-5 border border-black/10 bg-[#fbf7f0] p-6'>
      <div className='space-y-3'>
        <Badge>{title}</Badge>
        <h3 className='text-[2rem] leading-[0.92] text-[#15120f]'>{emphasis}</h3>
      </div>

      <div className='grid gap-3 text-sm leading-7 text-[#5a5249]'>
        <div className='flex items-start gap-3'>
          <MapPin size={16} className='mt-1 shrink-0 text-[#1a1714]' />
          <span>{address}</span>
        </div>
        <a href={`tel:${phone}`} className='flex items-center gap-3 text-[#1a1714] transition hover:text-black'>
          <Phone size={16} className='shrink-0' />
          <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`} className='flex items-center gap-3 text-[#1a1714] transition hover:text-black'>
          <Mail size={16} className='shrink-0' />
          <span>{email}</span>
        </a>
      </div>
    </article>
  );
}

function SignatureRibbon({ items }: { items: string[] }) {
  return (
    <div className='grid gap-px overflow-hidden border border-black/10 bg-black/6 lg:grid-cols-3'>
      {items.map((item) => (
        <div key={item} className='bg-[#fbf7f0] px-5 py-4 text-sm leading-7 text-[#4e473f]'>
          {item}
        </div>
      ))}
    </div>
  );
}

function ProjectGalleryTile({
  frame,
  className,
  priority = false,
}: {
  frame: ProjectGalleryFrame;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn('group relative overflow-hidden border border-black/10 bg-[#fbf7f0]', className)}>
      <img
        src={frame.src}
        alt={frame.alt}
        className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]'
        style={{ objectPosition: frame.objectPosition }}
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.56)_100%)]' />
      <figcaption className='absolute inset-x-0 bottom-0 px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/78 sm:px-5'>
        {frame.caption}
      </figcaption>
    </figure>
  );
}

function RegionHero({ profile, featuredProjects }: { profile: RegionProfile; featuredProjects: ProjectRecord[] }) {
  return (
    <section data-site-hero='true' className='relative isolate overflow-hidden border-b border-black/10 bg-[#16120f] text-white'>
      <div className='absolute inset-0'>
        <img src={profile.hero.image} alt='' aria-hidden='true' className='h-full w-full object-cover object-center opacity-88' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(8,6,4,0.12)_0%,rgba(8,6,4,0.74)_38%,rgba(8,6,4,0.96)_100%)]' />
      </div>
      <div className='architect-hero-grid absolute inset-0 opacity-35' />
      <div className='architect-hero-beam absolute inset-y-0 left-1/2 hidden w-[42rem] -translate-x-1/2 lg:block' />
      <div className='site-grain absolute inset-0 opacity-50' />

      <Container className='relative grid gap-12 py-32 sm:py-36 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-42'>
        <Reveal className='space-y-7'>
          <SectionEyebrow inverted>{profile.hero.eyebrow}</SectionEyebrow>
          <div className='space-y-6'>
            <h1 className='max-w-[10ch] text-[clamp(3.9rem,8vw,8.6rem)] leading-[0.8] text-white [text-wrap:balance]'>
              {profile.hero.title}
            </h1>
            <p className='max-w-2xl text-base leading-8 text-white/76 sm:text-lg'>{profile.hero.body}</p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Button href='/projects' className='bg-white !text-black hover:border-white hover:bg-transparent hover:!text-white'>
              view projects
            </Button>
            <Button href='/contact' variant='ghost' className='border-white/22 text-white hover:bg-white hover:text-black'>
              book a design consult
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08} className='grid gap-5 self-end'>
          <div className='border border-white/14 bg-[rgba(12,10,8,0.42)] p-6 backdrop-blur-xl'>
            <div className='grid gap-5'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-white/56'>{profile.cityline}</p>
              <p className='text-[1.45rem] leading-[1.22] text-white/92 sm:text-[1.75rem]'>{profile.pullQuote}</p>
              <p className='text-sm leading-7 text-white/66'>{profile.hero.caption}</p>
            </div>
          </div>
          <MetricGrid items={profile.stats} inverted />
          <div className='grid gap-3 sm:grid-cols-2'>
            {featuredProjects.slice(0, 2).map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className='group grid gap-3 border border-white/14 bg-[rgba(10,8,6,0.34)] p-3 backdrop-blur-xl transition hover:border-white/28'
              >
                <div className='relative aspect-[5/4] overflow-hidden'>
                  <img src={project.image} alt={project.title} className='h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]' loading='lazy' />
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,4,0.02)_0%,rgba(8,6,4,0.62)_100%)]' />
                </div>
                <div className='grid gap-1'>
                  <p className='text-[9px] font-semibold uppercase tracking-[0.3em] text-white/56'>{project.category}</p>
                  <p className='text-lg leading-tight text-white'>{project.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function RegionGatewayPage() {
  const pathname = useLocation().pathname;
  usePageMeta(
    'Wanderlust Architects | Architecture, Interiors, Hospitality',
    'An editorial introduction to Wanderlust Architects, leading from a cinematic brand moment into a project-by-project portfolio sequence.',
  );

  const showcaseProjects = useMemo(() => {
    const gatewayLead =
      projects.find((project) => project.title === 'Plush Banquet Venue Ranthambore') ??
      projects.find((project) => project.category === 'Residential') ??
      projects[0];

    if (!gatewayLead) {
      return projects;
    }

    return [gatewayLead, ...projects.filter((project) => project.id !== gatewayLead.id)];
  }, []);
  const gatewayProject = showcaseProjects[0] ?? projects[0];
  const contactRegion = getRegionFromPathname(pathname);
  const gatewayContact = getContactByRegion(contactRegion);
  const scrollY = useWindowScrollY();
  const viewport = useViewportSize();
  const introDistance = Math.max(viewport.height * 1.52, 1);
  const splitRevealDistance = Math.max(viewport.height * 0.76, 1);
  const projectStepDistance = Math.max(viewport.height * 0.92, 1);
  const sectionHeight = viewport.height + introDistance + splitRevealDistance + projectStepDistance * showcaseProjects.length;
  const introProgress = clamp(scrollY / introDistance, 0, 1);
  const splitProgress = clamp((scrollY - introDistance) / splitRevealDistance, 0, 1);
  const showcaseVisibility = clamp((scrollY - introDistance * 0.9) / (viewport.height * 0.4), 0, 1);
  const showcaseScroll = Math.max(0, scrollY - introDistance - splitRevealDistance);
  const showcaseScene = showcaseScroll / projectStepDistance;
  const activeProjectIndex = clamp(Math.floor(showcaseScene), 0, showcaseProjects.length - 1);
  const activeProjectProgress = clamp(showcaseScene - activeProjectIndex, 0, 1);
  const hasNextProject = activeProjectIndex < showcaseProjects.length - 1;
  const projectRevealProgress = hasNextProject ? smoothstep((activeProjectProgress - 0.4) / 0.46) : 0;
  const currentProject = showcaseProjects[activeProjectIndex] ?? gatewayProject;
  const nextProject = showcaseProjects[Math.min(activeProjectIndex + 1, showcaseProjects.length - 1)] ?? currentProject;
  const initialWidth = clamp(viewport.width * 0.33, 320, 520);
  const initialHeight = initialWidth / 2.85;
  const initialLift = clamp(viewport.height * 0.28, 160, 240);
  const frameWidth = initialWidth + (viewport.width + 6 - initialWidth) * introProgress;
  const frameHeight = initialHeight + (viewport.height + 6 - initialHeight) * introProgress;
  const frameChromeOpacity = clamp(1 - introProgress * 1.9, 0, 1);
  const framePadding = Math.max(0, 14 - introProgress * 22);
  const splitGap = splitProgress * clamp(viewport.width * 0.012, 10, 24);
  const panelTravel = (1 - splitProgress) * clamp(viewport.width * 0.02, 14, 36);
  const showcaseCardVisibility = clamp((showcaseVisibility - 0.1) / 0.32, 0, 1);
  const showcasePanelsOpacity = clamp((showcaseVisibility - 0.02) / 0.18, 0, 1);
  const frameStyle = {
    transform: `translateY(${-initialLift * (1 - introProgress)}px)`,
    width: `${frameWidth}px`,
    height: `${frameHeight}px`,
    ['--gateway-frame-opacity' as const]: String(frameChromeOpacity),
  } satisfies CSSProperties;
  const panelStyle = {
    padding: `${framePadding}px`,
    borderColor: `rgba(217, 207, 191, ${0.88 * frameChromeOpacity})`,
    backgroundColor: `rgba(255, 251, 244, ${0.86 * frameChromeOpacity})`,
    boxShadow: `0 28px 90px -46px rgba(27, 22, 16, ${0.35 * (1 - introProgress * 0.42)})`,
    ['--gateway-panel-opacity' as const]: String(frameChromeOpacity),
  } satisfies CSSProperties;
  const imageShellStyle = {
    borderColor: `rgba(255, 255, 255, ${0.92 * frameChromeOpacity + 0.08})`,
  } satisfies CSSProperties;
  const imageStyle = {
    transform: `scale(${1 + introProgress * 0.14})`,
    objectPosition: '50% 50%',
  } satisfies CSSProperties;
  const copyStyle = {
    opacity: clamp(1 - introProgress * 1.75, 0, 1),
    transform: `translateY(${introProgress * 34}px)`,
    filter: `blur(${introProgress * 8}px)`,
  } satisfies CSSProperties;
  const cueStyle = {
    opacity: clamp(1 - introProgress * 2.2, 0, 1),
  } satisfies CSSProperties;
  const ambientStyle = {
    opacity: 0.55 * (1 - showcaseVisibility * 0.8),
  } satisfies CSSProperties;
  const showcaseShellStyle = {
    opacity: showcaseVisibility,
  } satisfies CSSProperties;
  const showcasePanelsStyle = {
    opacity: showcasePanelsOpacity,
  } satisfies CSSProperties;
  const showcaseBackdropStyle = {
    opacity: clamp(0.22 + showcaseVisibility * 0.52, 0, 0.76),
  } satisfies CSSProperties;
  const leftPanelStyle = {
    transform: `translateX(${panelTravel}px) scale(${0.985 + splitProgress * 0.015})`,
  } satisfies CSSProperties;
  const rightPanelStyle = {
    transform: `translateX(${-panelTravel}px) scale(${0.985 + splitProgress * 0.015})`,
  } satisfies CSSProperties;
  const currentLayerStyle = {
    transform: `translate3d(0, ${activeProjectProgress * 18}px, 0) scale(${1.02 + activeProjectProgress * 0.04})`,
  } satisfies CSSProperties;
  const leftNextLayerStyle = {
    opacity: projectRevealProgress === 0 ? 0 : 1,
    clipPath: `inset(0 0 ${(1 - projectRevealProgress) * 100}% 0)`,
    transform: `translate3d(0, ${-28 * (1 - projectRevealProgress)}px, 0) scale(${1.07 - projectRevealProgress * 0.04})`,
  } satisfies CSSProperties;
  const rightNextLayerStyle = {
    opacity: projectRevealProgress === 0 ? 0 : 1,
    clipPath: `inset(${(1 - projectRevealProgress) * 100}% 0 0 0)`,
    transform: `translate3d(0, ${28 * (1 - projectRevealProgress)}px, 0) scale(${1.07 - projectRevealProgress * 0.04})`,
  } satisfies CSSProperties;
  const dividerStyle = {
    opacity: splitProgress,
  } satisfies CSSProperties;
  const projectCardStageStyle = {
    opacity: showcaseCardVisibility,
    transform: `translate3d(0, ${(1 - showcaseCardVisibility) * 24}px, 0)`,
  } satisfies CSSProperties;
  const currentLeftCardStyle = {
    clipPath: `inset(${projectRevealProgress * 100}% 0 0 0)`,
  } satisfies CSSProperties;
  const currentRightCardStyle = {
    clipPath: `inset(0 0 ${projectRevealProgress * 100}% 0)`,
  } satisfies CSSProperties;
  const nextCardLayerStyle = {
    opacity: showcaseCardVisibility * (projectRevealProgress === 0 ? 0 : 1),
  } satisfies CSSProperties;
  const leftNextCardStyle = {
    clipPath: `inset(0 0 ${(1 - projectRevealProgress) * 100}% 0)`,
    transform: `translate3d(0, ${-10 * (1 - projectRevealProgress)}px, 0)`,
  } satisfies CSSProperties;
  const rightNextCardStyle = {
    clipPath: `inset(${(1 - projectRevealProgress) * 100}% 0 0 0)`,
    transform: `translate3d(0, ${10 * (1 - projectRevealProgress)}px, 0)`,
  } satisfies CSSProperties;
  const leftCardContentShellStyle = {
    width: '200%',
    left: 0,
  } satisfies CSSProperties;
  const rightCardContentShellStyle = {
    width: '200%',
    right: 0,
  } satisfies CSSProperties;
  const showcaseCounterStyle = {
    opacity: showcaseCardVisibility,
    transform: `translate3d(0, ${(1 - showcaseCardVisibility) * 16}px, 0)`,
  } satisfies CSSProperties;
  const sectionStyle = {
    minHeight: `${Math.round(sectionHeight)}px`,
  } satisfies CSSProperties;
  const renderProjectLayer = (project: ProjectRecord, side: 'left' | 'right', style: CSSProperties) => (
    <div key={`${project.slug}-${side}`} className='absolute inset-0 overflow-hidden' style={style}>
      {/* TODO: Replace these duplicated frames with distinct left/right project images once multi-image assets are available. */}
      <img
        src={project.image}
        alt=''
        aria-hidden='true'
        className='h-full w-full object-cover'
        style={{ objectPosition: side === 'left' ? '34% 50%' : '66% 50%' }}
        loading='lazy'
      />
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.08)_0%,rgba(6,6,6,0.38)_100%)]' />
    </div>
  );

  const projectCardBaseClassName =
    'overflow-hidden border border-white/24 bg-[rgba(242,232,217,0.95)] text-[#191510] shadow-[0_28px_110px_-58px_rgba(0,0,0,0.55)] backdrop-blur-sm';
  const projectCardShellClassName = cn('absolute inset-0', projectCardBaseClassName);
  const projectCardContentClassName = 'relative grid h-full items-center gap-6 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center sm:px-7 sm:py-6';

  const renderProjectCardContent = (project: ProjectRecord, linksInteractive = true) => (
    <>
      <div className={projectCardContentClassName}>
        <div className='grid gap-3'>
          <Link
            to={`/projects/${project.slug}`}
            className={cn(
              'w-fit text-[clamp(2.1rem,4.4vw,4rem)] leading-[0.88] tracking-[-0.07em] text-[#17130f] transition-opacity hover:opacity-72',
              linksInteractive ? 'pointer-events-auto' : 'pointer-events-none',
            )}
          >
            {project.title}
          </Link>
          <div className='flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6d6459]'>
            <span>{project.location}</span>
            <span>{project.projectType}</span>
          </div>
        </div>

        <div className='grid gap-4 md:justify-items-end'>
          <div className='grid gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#201b17] md:text-right'>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className={cn(
              'inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#201b17] transition-opacity hover:opacity-72',
              linksInteractive ? 'pointer-events-auto' : 'pointer-events-none',
            )}
          >
            <span>Open project</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className='min-h-screen bg-[#efe8de] text-[#15120f]'>
      <div className='site-grain pointer-events-none fixed inset-0 opacity-45' />
      <section className='relative overflow-clip' style={sectionStyle}>
        <div className='sticky top-0 h-screen overflow-hidden bg-[#efe8de]'>
          <div className='absolute inset-0' style={ambientStyle}>
            <div className='absolute left-[6%] top-[18%] h-28 w-28 border border-white/30 bg-white/10 blur-3xl' />
            <div className='absolute right-[8%] top-[28%] h-36 w-36 border border-black/6 bg-[#d7c7af]/20 blur-3xl' />
            <div className='absolute bottom-[18%] left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/30 blur-3xl' />
          </div>

          <div className='absolute inset-0 z-10 flex items-center justify-center'>
            <div className='gateway-intro-frame relative z-10' style={frameStyle}>
              <div className='gateway-intro-panel h-full border backdrop-blur-sm' style={panelStyle}>
                <div className='h-full overflow-hidden bg-[#fbf6ee]' style={imageShellStyle}>
                  <div className='h-full w-full overflow-hidden'>
                    <img src={gatewayProject.image} alt={gatewayProject.title} className='h-full w-full object-cover' style={imageStyle} loading='eager' />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute inset-0 z-20' style={showcaseShellStyle}>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_22%),linear-gradient(180deg,rgba(9,7,5,0.02)_0%,rgba(9,7,5,0.22)_44%,rgba(9,7,5,0.56)_100%)]' style={showcaseBackdropStyle} />

            <div className='absolute inset-0' style={showcasePanelsStyle}>
              <div className='grid h-full bg-[#100d0b]' style={{ gridTemplateColumns: '1fr 1fr', gap: `${splitGap}px` }}>
                <div className='relative overflow-hidden' style={leftPanelStyle}>
                  {renderProjectLayer(currentProject, 'left', currentLayerStyle)}
                  {hasNextProject ? renderProjectLayer(nextProject, 'left', leftNextLayerStyle) : null}
                </div>
                <div className='relative overflow-hidden' style={rightPanelStyle}>
                  {renderProjectLayer(currentProject, 'right', currentLayerStyle)}
                  {hasNextProject ? renderProjectLayer(nextProject, 'right', rightNextLayerStyle) : null}
                </div>
              </div>
              <div className='pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/12' style={dividerStyle} />
            </div>
          </div>

          <Container className='pointer-events-none relative z-30 h-full max-w-none px-0'>
            <div className='absolute inset-x-0 top-[44%] grid place-items-center gap-4 text-center sm:top-[46%] sm:gap-5' style={copyStyle}>
              <p className='text-[10px] font-semibold uppercase tracking-[0.38em] text-[#8f8678] sm:text-[11px]'>
                Architecture, interiors, and hospitality
              </p>
              <h1 className='mx-auto grid gap-0.5 font-sans text-[clamp(1.8rem,4.8vw,4.2rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#14120f]'>
                <span>Quiet luxury</span>
                <span>spaces shaped</span>
                <span>by climate, craft,</span>
                <span>and lived stories.</span>
              </h1>
            </div>

            <div className='absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-4 sm:px-6'>
              <div className='relative w-full max-w-[56rem] min-h-[12.5rem] sm:min-h-[11rem]'>
                <div className={projectCardShellClassName} style={projectCardStageStyle}>
                  <div className='absolute inset-y-0 left-0 w-1/2 overflow-hidden' style={currentLeftCardStyle}>
                    <div className='absolute inset-y-0' style={leftCardContentShellStyle}>
                      {renderProjectCardContent(currentProject)}
                    </div>
                  </div>
                  <div className='absolute inset-y-0 right-0 w-1/2 overflow-hidden' style={currentRightCardStyle}>
                    <div className='absolute inset-y-0' style={rightCardContentShellStyle}>
                      {renderProjectCardContent(currentProject)}
                    </div>
                  </div>

                  {hasNextProject ? (
                    <div className='pointer-events-none absolute inset-0 overflow-hidden' style={nextCardLayerStyle}>
                      <div className='absolute inset-y-0 left-0 w-1/2 overflow-hidden' style={leftNextCardStyle}>
                        <div className='absolute inset-y-0' style={leftCardContentShellStyle}>
                          {renderProjectCardContent(nextProject, false)}
                        </div>
                      </div>
                      <div className='absolute inset-y-0 right-0 w-1/2 overflow-hidden' style={rightNextCardStyle}>
                        <div className='absolute inset-y-0' style={rightCardContentShellStyle}>
                          {renderProjectCardContent(nextProject, false)}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='absolute bottom-7 left-4 z-20 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/72 sm:left-6 lg:left-10' style={showcaseCounterStyle}>
              <span>{String(activeProjectIndex + 1).padStart(2, '0')}</span>
              <span className='text-white/28'>/</span>
              <span>{String(showcaseProjects.length).padStart(2, '0')}</span>
            </div>

            <div className='absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8c8377]' style={cueStyle}>
              Scroll to enter the studio
            </div>
          </Container>
        </div>
      </section>

      <section className='relative isolate overflow-hidden border-t border-white/10 bg-[#14100d] text-white'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,188,158,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(14,10,7,0.94)_0%,rgba(14,10,7,1)_100%)]' />
        </div>
        <div className='architect-hero-grid absolute inset-0 opacity-20' />

        <Container className='relative grid min-h-screen gap-12 py-28 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:py-36'>
          <Reveal className='space-y-6'>
            <SectionEyebrow inverted>Start your project</SectionEyebrow>
            <h2 className='max-w-[8ch] text-[clamp(3.8rem,7vw,7rem)] leading-[0.82] text-[#f7f1e6]'>
              When the portfolio ends, the brief can begin.
            </h2>
            <p className='max-w-2xl text-base leading-8 text-white/72 sm:text-lg'>
              If one of these worlds feels close to your own ambition, move directly into the contact flow and shape the project brief from there. The inquiry page, office details, and drafting form are all ready to continue the conversation.
            </p>
            <div className='flex flex-wrap gap-3'>
              <Button href='/contact' className='bg-white !text-black hover:border-white hover:bg-transparent hover:!text-white'>
                open contact page
              </Button>
              <Button href={`mailto:${gatewayContact.email}`} variant='ghost' className='border-white/20 text-white hover:bg-white hover:text-black'>
                email studio
              </Button>
              <Button href={gatewayContact.whatsapp} variant='ghost' className='border-white/20 text-white hover:bg-white hover:text-black'>
                whatsapp
              </Button>
            </div>
          </Reveal>

          <div className='grid gap-5'>
            <Reveal delay={0.08}>
              <article className='grid gap-5 border border-white/12 bg-white/6 p-6 backdrop-blur-sm'>
                <div className='grid gap-2'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-white/54'>What opens next</p>
                  <h3 className='text-[2rem] leading-[0.92] text-white'>A direct path into the studio contact and inquiry experience.</h3>
                </div>
                <p className='text-sm leading-8 text-white/68'>
                  Continue into the dedicated contact route with service-focus selection, office details, and a structured inquiry brief form.
                </p>
              </article>
            </Reveal>

            <div className='grid gap-5 md:grid-cols-2'>
              <Reveal delay={0.12}>
                <article className='grid h-full gap-3 border border-white/12 bg-white/6 p-5 backdrop-blur-sm'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-white/54'>Project pages</p>
                  <h3 className='text-[1.7rem] leading-[0.94] text-white'>Every open-project link leads into the full case-study page.</h3>
                  <p className='text-sm leading-7 text-white/68'>
                    The showcase is only the front-door sequence. Each card continues into the full editorial project page for that project.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.16}>
                <article className='grid h-full gap-3 border border-white/12 bg-white/6 p-5 backdrop-blur-sm'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-white/54'>Direct contact</p>
                  <h3 className='text-[1.7rem] leading-[0.94] text-white'>Start with a site, a mood, or a rough programme.</h3>
                  <p className='text-sm leading-7 text-white/68'>
                    We can translate an early idea into a sharper brief and move the conversation into the exact contact workflow when you are ready.
                  </p>
                  <div className='mt-auto flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72'>
                    <a href={`mailto:${gatewayContact.email}`} className='transition hover:text-white'>
                      {gatewayContact.email}
                    </a>
                    <a href={gatewayContact.whatsapp} className='transition hover:text-white'>
                      WhatsApp
                    </a>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export function RegionHomePage({ regionKey }: { regionKey: SiteRegionKey }) {
  const profile = getRegionProfile(regionKey);
  const regionProjects = getRegionProjects(regionKey);
  const contact = getContactByRegion(regionKey === 'dubai' ? 'AE' : 'IN');
  const featuredLead = regionProjects[0];
  const featuredRest = regionProjects.slice(1, 4);
  const journalSlice = journalEntries.slice(0, 3);
  const quote = regionKey === 'dubai' ? featuredTestimonials[2] : featuredTestimonials[0];

  usePageMeta(
    `Wanderlust Architects | ${profile.label} Portfolio`,
    `${profile.hero.body} Explore architecture, interiors, hospitality, and fit-out case studies from Wanderlust Architects.`,
  );

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <RegionHero profile={profile} featuredProjects={regionProjects} />

      <section className='border-b border-black/10 bg-[#efe7dc]'>
        <Container className='py-5'>
          <SignatureRibbon items={profile.signatureNotes} />
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f6f0e6]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Selected work</SectionEyebrow>
            <h2 className='max-w-[9ch] text-[clamp(3rem,5vw,5.4rem)] leading-[0.86] text-[#15120f]'>
              A portfolio built for atmosphere, sequence, and real-world execution.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5b5349]'>
              The work moves between homes, hospitality environments, and branded commercial interiors, but the underlying agenda stays constant: emotional clarity, tactile depth, and buildable precision.
            </p>
            <Button href='/projects' variant='ghost'>
              explore the full archive
            </Button>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-5'>
            {featuredLead ? <ProjectCard project={featuredLead} priority size='lead' /> : null}
            <div className='grid gap-5 md:grid-cols-3'>
              {featuredRest.map((project) => (
                <ProjectCard key={project.slug} project={project} size='compact' />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#efe8de]'>
        <Container className='grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Studio stance</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(3rem,5vw,5.2rem)] leading-[0.88] text-[#15120f]'>
              The luxury is in the editing, not the excess.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>{profile.pullQuote}</p>
            <div className='grid gap-3'>
              {studioPillars.map((pillar) => (
                <div key={pillar} className='border border-black/10 bg-[#fbf7f0] px-5 py-4 text-sm leading-7 text-[#4e473f]'>
                  {pillar}
                </div>
              ))}
            </div>
          </Reveal>

          <div className='grid gap-5'>
            {studioPromises.map((promise, index) => (
              <Reveal key={promise.title} delay={index * 0.08}>
                <article className='grid gap-4 border border-black/10 bg-[#fbf7f0] p-6 sm:grid-cols-[4rem_minmax(0,1fr)]'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#796f63]'>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div className='space-y-3'>
                    <h3 className='text-[2rem] leading-[0.92] text-[#15120f]'>{promise.title}</h3>
                    <p className='text-sm leading-7 text-[#544c42]'>{promise.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-white'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] text-[#15120f]'>
              One architectural rhythm from brief to handover.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>
              The studio treats concept, detailing, coordination, and delivery as one continuous design exercise, so the built result keeps the same tone it had at the sketch stage.
            </p>
          </Reveal>

          <div className='grid gap-px overflow-hidden border border-black/10 bg-black/6'>
            {processNarrative.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className='grid gap-4 bg-[#fbf7f0] px-5 py-5 sm:grid-cols-[4rem_minmax(0,1fr)]'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{step.index}</p>
                  <div className='space-y-2'>
                    <h3 className='text-[1.8rem] leading-[0.95] text-[#15120f]'>{step.title}</h3>
                    <p className='text-sm leading-7 text-[#544c42]'>{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f6f0e6]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Capabilities</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] text-[#15120f]'>
              Services designed to move between narrative and execution.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>
              Architecture, interiors, documentation, landscape, and visualisation are all framed as coordinated layers of one studio language rather than separate silos.
            </p>
          </Reveal>

          <div className='grid gap-5 md:grid-cols-2'>
            {serviceNarrative.map((service, index) => (
              <Reveal key={service.title} delay={(index % 2) * 0.06}>
                <article className='grid gap-5 overflow-hidden border border-black/10 bg-[#fbf7f0]'>
                  <div className='relative aspect-[16/10] overflow-hidden'>
                    <img src={service.image} alt={service.title} className='h-full w-full object-cover' loading='lazy' />
                    <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.58)_100%)]' />
                    <div className='absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72'>
                      <span>{service.sequence}</span>
                      <span>{service.title}</span>
                    </div>
                  </div>
                  <div className='grid gap-4 px-5 pb-5'>
                    <p className='text-sm leading-7 text-[#544c42]'>{service.copy}</p>
                    <div className='flex flex-wrap gap-2'>
                      {service.points.map((point) => (
                        <span key={point} className='border border-black/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#5f564b]'>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow inverted>Client perspective</SectionEyebrow>
            <h2 className='max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] text-[#f7f1e6]'>
              Trust is built when the atmosphere survives the site process.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-5 border border-white/12 bg-white/6 p-6 backdrop-blur-xl'>
            <p className='text-[1.3rem] leading-[1.35] text-white/88 sm:text-[1.7rem]'>{quote.quote}</p>
            <div className='flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/62'>
              <span>{quote.clientType}</span>
              <span>{quote.city}</span>
              <span>{quote.scope}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#efe8de]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Journal</SectionEyebrow>
            <h2 className='max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] text-[#15120f]'>
              Notes from the studio on architecture, delivery, and atmosphere.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>{profile.journalLead}</p>
            <Button href='/blog' variant='ghost'>
              read the journal
            </Button>
          </Reveal>

          <div className='grid gap-5 md:grid-cols-3'>
            {journalSlice.map((entry) => (
              <Reveal key={entry.slug}>
                <JournalCard slug={entry.slug} title={entry.title} coverImage={entry.coverImage} tags={entry.tags} date={entry.date} excerpt={entry.content} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='bg-[#f8f3ea]'>
        <Container className='grid gap-10 py-18 lg:grid-cols-[1fr_auto] lg:items-end lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Next step</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.9rem,5vw,5.4rem)] leading-[0.86] text-[#15120f]'>
              {profile.inquiryLabel}
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>
              Share your site, programme, timeline, or a rough ambition. We can help shape the brief into a clearer design and delivery path.
            </p>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-4 border border-black/10 bg-[#fbf7f0] p-6 sm:min-w-[24rem]'>
            <div className='grid gap-1 text-sm leading-7 text-[#544c42]'>
              <span className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>Contact</span>
              <a href={`mailto:${contact.email}`} className='text-[#181411] transition hover:text-black'>
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className='text-[#181411] transition hover:text-black'>
                {contact.phone}
              </a>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button href='/contact'>start inquiry</Button>
              <Button href={contact.whatsapp} variant='ghost'>
                whatsapp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

export function AboutEditorialPage() {
  usePageMeta(
    'Wanderlust Architects | Studio',
    'Learn about Wanderlust Architects, a premium architecture and interior design studio working across India and the UAE.',
  );

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-24 lg:grid-cols-[0.96fr_1.04fr] lg:items-end lg:py-30'>
          <Reveal className='space-y-5'>
            <SectionEyebrow inverted>Studio</SectionEyebrow>
            <h1 className='max-w-[9ch] text-[clamp(4rem,7vw,7.6rem)] leading-[0.82] text-[#f7f1e6]'>
              Architecture that feels composed before it feels spectacular.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className='space-y-6'>
            <p className='max-w-2xl text-base leading-8 text-white/74 sm:text-lg'>
              Wanderlust Architects works between architecture, interiors, hospitality, fit-outs, and documentation with one shared pursuit: spaces that hold emotion and execution discipline in the same frame.
            </p>
            <MetricGrid items={studioMetrics} inverted />
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f8f3ea]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Practice philosophy</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] text-[#15120f]'>
              The spaces are edited until they feel inevitable.
            </h2>
          </Reveal>

          <div className='grid gap-5'>
            {studioPromises.map((promise, index) => (
              <Reveal key={promise.title} delay={index * 0.06}>
                <article className='grid gap-4 border border-black/10 bg-[#fbf7f0] p-6 sm:grid-cols-[4rem_minmax(0,1fr)]'>
                  <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{String(index + 1).padStart(2, '0')}</p>
                  <div className='space-y-3'>
                    <h3 className='text-[2rem] leading-[0.92] text-[#15120f]'>{promise.title}</h3>
                    <p className='text-sm leading-7 text-[#544c42]'>{promise.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#efe8de]'>
        <Container className='space-y-10 py-16 lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Leadership</SectionEyebrow>
            <h2 className='max-w-[12ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] text-[#15120f]'>
              A leadership team balancing narrative sensitivity with site intelligence.
            </h2>
          </Reveal>

          <div className='grid gap-5 lg:grid-cols-3'>
            {leadershipTeam.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08}>
                <article className='grid gap-5 overflow-hidden border border-black/10 bg-[#fbf7f0]'>
                  <div className='relative aspect-[4/5] overflow-hidden'>
                    <img src={member.image} alt={member.name} className='h-full w-full object-cover object-top' loading='lazy' />
                    <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.46)_100%)]' />
                  </div>
                  <div className='grid gap-3 px-5 pb-5'>
                    <h3 className='text-[2.1rem] leading-[0.92] text-[#15120f]'>{member.displayName ?? member.name}</h3>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{member.role}</p>
                    <p className='text-sm leading-7 text-[#544c42]'>
                      Calm decisions, sharp documentation, and an architectural point of view that stays intact from concept to completion.
                    </p>
                    {member.linkedin ? (
                      <a href={member.linkedin} target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#15120f]'>
                        <span>View profile</span>
                        <ArrowRight size={14} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='bg-white'>
        <Container className='space-y-10 py-16 lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>What clients feel</SectionEyebrow>
            <h2 className='max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[0.88] text-[#15120f]'>
              Confidence comes from beauty that still holds under real project pressure.
            </h2>
          </Reveal>
          <div className='grid gap-5 lg:grid-cols-3'>
            {featuredTestimonials.map((quote, index) => (
              <Reveal key={`${quote.clientType}-${quote.city}`} delay={index * 0.06}>
                <article className='grid h-full gap-5 border border-black/10 bg-[#fbf7f0] p-6'>
                  <Sparkles size={20} className='text-[#15120f]' />
                  <p className='text-[1.15rem] leading-[1.5] text-[#201b17]'>{quote.quote}</p>
                  <div className='mt-auto grid gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a7065]'>
                    <span>{quote.clientType}</span>
                    <span>{quote.city}</span>
                    <span>{quote.scope}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export function ProjectsEditorialPage() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const activeRegion = getRegionFromPathname(pathname) === 'AE' ? 'dubai' : 'india';
  const archiveLinks = [
    { href: getRegionRoute(activeRegion), label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blogs' },
    { href: '/career', label: 'Career' },
    { href: '/contact', label: 'Contact' },
  ] as const;
  const tileAspectPattern = [
    'aspect-[1/0.96]',
    'aspect-[1/1.02]',
    'aspect-[1/0.98]',
    'aspect-[1/0.96]',
    'aspect-[1/1.02]',
    'aspect-[1/0.98]',
  ] as const;
  const startProjectClassName =
    'inline-flex items-center justify-center border border-white/24 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-white hover:text-black';

  usePageMeta(
    'Wanderlust Architects | Projects',
    'Browse the Wanderlust Architects portfolio across hospitality, residential, commercial, and heritage work.',
  );

  const handleRegionSelect = (regionKey: SiteRegionKey) => {
    persistSiteRegion(regionKey);
    navigate(getRegionRoute(regionKey));
  };

  return (
    <div className='bg-white text-[#15120f]'>
      <section className='relative min-h-screen bg-[#efefeb]'>
        <div className='pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.62),transparent_24%)]' />
        <div className='pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_18%)]' />

        <header className='pointer-events-none fixed left-1/2 top-4 z-50 w-[calc(100%-1.25rem)] max-w-[92rem] -translate-x-1/2 sm:top-5 sm:w-[calc(100%-2rem)]'>
          <div className='pointer-events-auto border border-white/18 bg-[linear-gradient(90deg,rgba(15,15,15,0.96)_0%,rgba(97,97,97,0.78)_42%,rgba(82,82,82,0.72)_100%)] px-4 py-4 shadow-[0_24px_90px_-42px_rgba(0,0,0,0.72)] backdrop-blur-xl sm:px-6 xl:px-8'>
            <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
              <div className='flex items-center justify-between gap-4 xl:min-w-0'>
                <Link to={getRegionRoute(activeRegion)} className='min-w-0'>
                  <BrandLogo
                    className='justify-start gap-3'
                    iconClassName='h-8 w-auto'
                    iconSrc='/branding/wanderlust_architects_logo-icon-White.png'
                    textClassName='truncate text-[10px] tracking-[0.28em] text-white'
                  />
                </Link>

                <Link to='/contact' className={cn(startProjectClassName, 'xl:hidden')}>
                  Start Project
                </Link>
              </div>

              <div className='grid gap-3 xl:flex xl:items-center xl:gap-4'>
                <div className='flex items-center gap-1 border border-white/16 bg-white/6 p-1'>
                  {(['india', 'dubai'] as SiteRegionKey[]).map((regionKey) => {
                    const active = activeRegion === regionKey;

                    return (
                      <button
                        key={regionKey}
                        type='button'
                        onClick={() => handleRegionSelect(regionKey)}
                        className={cn(
                          'px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] transition',
                          active ? 'bg-white text-black' : 'text-white/76 hover:bg-white/8 hover:text-white',
                        )}
                      >
                        {regionKey === 'dubai' ? 'UAE' : 'India'}
                      </button>
                    );
                  })}
                </div>

                <nav className='flex flex-wrap items-center gap-1 xl:gap-2' aria-label='Projects archive navigation'>
                  {archiveLinks.map((link) => {
                    const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={cn(
                          'inline-flex items-center px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] transition',
                          active ? 'bg-black text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'text-white/76 hover:text-white',
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <Link to='/contact' className={cn(startProjectClassName, 'hidden xl:inline-flex')}>
                Start Project
              </Link>
            </div>
          </div>
        </header>

        <div className='relative z-10 mx-auto max-w-[120rem] px-1 pb-1 pt-[10.75rem] sm:px-2 sm:pb-2 sm:pt-[12rem] xl:pt-[6.95rem]'>
          <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-6'>
            {projects.map((project, index) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className='group block overflow-hidden border border-[#dfdfdc] bg-[#0f0f0f]'>
                <div className={cn('relative overflow-hidden', tileAspectPattern[index % tileAspectPattern.length])}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0'
                    style={{
                      objectPosition:
                        index % 5 === 0 ? '50% 46%' : index % 5 === 1 ? '44% 50%' : index % 5 === 2 ? '52% 42%' : index % 5 === 3 ? '50% 50%' : '58% 50%',
                    }}
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.04)_0%,rgba(7,7,7,0.26)_44%,rgba(7,7,7,0.86)_100%)]' />
                  <div className='absolute inset-0 border border-white/10' />
                  <div className='absolute inset-x-0 bottom-0 grid gap-2 p-4 sm:p-5'>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.32em] text-white/72'>{project.category}</span>
                    <h2 className='max-w-[14ch] text-[clamp(1.35rem,1.4vw,2rem)] leading-[0.92] text-[#f7f2ea] [text-wrap:balance]'>
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProjectEditorialPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug ?? '') ?? getProjectById(Number(slug)) ?? projects[0];
  const gallery = getProjectGallery(project);
  const related = getRelatedProjects(project);
  const palette = getProjectPalette(project);
  const moods = getProjectMoods(project);
  const insight = getProjectInsight(project);
  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(currentIndex + 1 + projects.length) % projects.length];
  const editorialPanels = [
    { title: 'Spatial cadence', copy: project.sections[1]?.paragraphs[0] ?? project.summary },
    { title: 'Material register', copy: project.sections[2]?.paragraphs[0] ?? project.summary },
    { title: 'Execution lens', copy: project.sections[4]?.paragraphs[0] ?? project.summary },
  ];

  usePageMeta(
    `${project.title} | Wanderlust Architects`,
    `${project.description} Explore the full case study, design logic, and project atmosphere for ${project.title}.`,
  );

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='relative isolate overflow-hidden border-b border-black/10 bg-[#171310] text-white'>
        <div className='absolute inset-0'>
          <img src={project.image} alt='' aria-hidden='true' className='h-full w-full object-cover opacity-92' />
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-78', palette.accent)} />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,4,0.08)_0%,rgba(8,6,4,0.78)_58%,rgba(8,6,4,0.94)_100%)]' />
        </div>
        <div className='site-grain absolute inset-0 opacity-55' />

        <Container className='relative grid gap-10 py-26 sm:py-30 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:py-34'>
          <Reveal className='space-y-6'>
            <Link
              to='/projects'
              className='inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/66 transition hover:text-white'
            >
              <ArrowLeft size={14} />
              <span>back to archive</span>
            </Link>
            <div className='space-y-5'>
              <SectionEyebrow inverted>{project.projectType}</SectionEyebrow>
              <h1 className='max-w-[8ch] text-[clamp(4rem,7vw,7.2rem)] leading-[0.8] text-[#f7f1e6]'>{project.title}</h1>
              <p className='max-w-2xl text-base leading-8 text-white/74 sm:text-lg'>{project.description}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-5'>
            <MetricGrid items={getProjectHighlights(project)} inverted />
            <div className='border border-white/12 bg-[rgba(12,10,8,0.42)] p-6 backdrop-blur-xl'>
              <p className='text-[1.25rem] leading-[1.4] text-white/88 sm:text-[1.55rem]'>{insight}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f8f3ea]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.86fr_1.14fr] lg:py-22'>
          <Reveal className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
            <SectionEyebrow>Atmosphere</SectionEyebrow>
            <h2 className='max-w-[9ch] text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[0.9] text-[#15120f]'>
              One image, reframed like a monograph rather than a gallery dump.
            </h2>
            <div className='flex flex-wrap gap-2'>
              {moods.map((mood) => (
                <span key={mood} className='border border-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#60574d]'>
                  {mood}
                </span>
              ))}
            </div>
          </Reveal>

          <div className='grid gap-5'>
            <Reveal className='grid gap-5 md:grid-cols-[1.12fr_0.88fr]'>
              {gallery[0] ? <ProjectGalleryTile frame={gallery[0]} className='min-h-[26rem]' priority /> : null}
              <div className='grid gap-5'>
                {gallery.slice(1, 3).map((frame, index) => (
                  <ProjectGalleryTile key={`${frame.caption}-${index}`} frame={frame} className='h-[12.3rem] sm:h-[15rem]' />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.04} className='grid gap-5'>
              {gallery[3] ? <ProjectGalleryTile frame={gallery[3]} className='h-[16rem] sm:h-[22rem]' /> : null}
              <div className='grid gap-5 md:grid-cols-3'>
                {editorialPanels.map((item) => (
                  <article key={item.title} className='grid gap-3 border border-black/10 bg-[#fbf7f0] p-5'>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{item.title}</p>
                    <p className='text-sm leading-7 text-[#544c42]'>{item.copy}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#efe8de]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:py-22'>
          <Reveal className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
            <SectionEyebrow>Case study notes</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[0.9] text-[#15120f]'>
              Each chapter breaks down one layer of the design logic.
            </h2>
          </Reveal>

          <div className='grid gap-4'>
            {project.sections.map((section, index) => {
              const id = section.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

              return (
                <Reveal key={section.title} delay={index * 0.04}>
                  <article id={id} className='grid gap-5 border border-black/10 bg-[#fbf7f0] p-6 sm:grid-cols-[4rem_minmax(0,1fr)]'>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{String(index + 1).padStart(2, '0')}</p>
                    <div className='space-y-4'>
                      <h3 className='text-[2rem] leading-[0.92] text-[#15120f]'>{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className='text-sm leading-8 text-[#544c42] sm:text-base'>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-white'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Continue browsing</SectionEyebrow>
            <h2 className='max-w-[11ch] text-[clamp(2.8rem,4.5vw,5rem)] leading-[0.88] text-[#15120f]'>
              Move forward into the next case study or return to the archive.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className='flex flex-wrap gap-3'>
            <Button href='/projects' variant='ghost'>
              all projects
            </Button>
            <Button href={`/projects/${nextProject.slug}`}>next project</Button>
          </Reveal>
        </Container>
      </section>

      <section className='bg-[#f3ece2]'>
        <Container className='space-y-10 py-16 lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Related work</SectionEyebrow>
            <h2 className='max-w-[9ch] text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[0.88] text-[#15120f]'>
              More projects with adjacent material or spatial concerns.
            </h2>
          </Reveal>
          <div className='grid gap-5 md:grid-cols-3'>
            {related.map((entry) => (
              <Reveal key={entry.slug}>
                <ProjectCard project={entry} size='compact' />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export function JournalEditorialPage() {
  const featuredEntry = journalEntries[0];
  const remainingEntries = journalEntries.slice(1);

  usePageMeta(
    'Wanderlust Architects | Journal',
    'Read the Wanderlust Architects journal on architecture, hospitality, interior design, fit-outs, and project delivery.',
  );

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-24 lg:grid-cols-[0.94fr_1.06fr] lg:items-end lg:py-30'>
          <Reveal className='space-y-5'>
            <SectionEyebrow inverted>Journal</SectionEyebrow>
            <h1 className='max-w-[8ch] text-[clamp(4rem,7vw,7.2rem)] leading-[0.82] text-[#f7f1e6]'>
              Studio notes on atmosphere, execution, and built clarity.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className='space-y-5 text-base leading-8 text-white/72'>
            <p>
              The journal collects practical thoughts on architecture, interiors, fit-outs, hospitality sequencing, and the invisible systems that protect design quality on site.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f8f3ea]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:py-22'>
          {featuredEntry ? (
            <Reveal>
              <JournalCard
                slug={featuredEntry.slug}
                title={featuredEntry.title}
                coverImage={featuredEntry.coverImage}
                tags={featuredEntry.tags}
                date={featuredEntry.date}
                excerpt={featuredEntry.content}
              />
            </Reveal>
          ) : null}
          <Reveal delay={0.08} className='grid gap-5'>
            <SectionEyebrow>Featured article</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.9] text-[#15120f]'>
              Writing that stays close to real design decisions.
            </h2>
            <p className='text-base leading-8 text-[#5a5147]'>
              These pieces are written to be useful to clients, collaborators, and anyone interested in how architecture becomes atmosphere without losing technical discipline.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className='bg-[#f3ece2]'>
        <Container className='grid gap-5 py-14 md:grid-cols-2 xl:grid-cols-3 xl:py-18'>
          {remainingEntries.map((entry, index) => (
            <Reveal key={entry.slug} delay={(index % 3) * 0.04}>
              <JournalCard slug={entry.slug} title={entry.title} coverImage={entry.coverImage} tags={entry.tags} date={entry.date} excerpt={entry.content} />
            </Reveal>
          ))}
        </Container>
      </section>
    </div>
  );
}

export function JournalEntryEditorialPage() {
  const { slug } = useParams();
  const entry = getBlogBySlug(slug ?? '') ?? journalEntries[0];
  const toc = extractToc(entry.content);
  const blocks = markdownToBlocks(entry.content);

  usePageMeta(`${entry.title} | Wanderlust Architects Journal`, entry.content.slice(0, 160));

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-24 lg:grid-cols-[0.98fr_1.02fr] lg:items-end lg:py-30'>
          <Reveal className='space-y-5'>
            <Link
              to='/blog'
              className='inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/66 transition hover:text-white'
            >
              <ArrowLeft size={14} />
              <span>back to journal</span>
            </Link>
            <div className='flex flex-wrap gap-2'>
              {entry.tags.map((tag) => (
                <span key={tag} className='border border-white/18 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/74'>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className='max-w-[10ch] text-[clamp(3.6rem,6vw,6.4rem)] leading-[0.84] text-[#f7f1e6]'>{entry.title}</h1>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-5'>
            <div className='overflow-hidden border border-white/12 bg-white/8'>
              <img src={entry.coverImage} alt={entry.title} className='h-[22rem] w-full object-cover sm:h-[26rem]' loading='eager' />
            </div>
            <div className='flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/62'>
              <span>{formatDate(entry.date)}</span>
              <span>{estimateReadTime(entry.content)}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className='bg-[#f8f3ea]'>
        <Container className='grid gap-12 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:py-22'>
          <Reveal className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
            <SectionEyebrow>Contents</SectionEyebrow>
            <div className='grid gap-2'>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    'border border-black/10 bg-[#fbf7f0] px-4 py-3 text-sm leading-7 text-[#564e44] transition hover:border-black/24 hover:text-black',
                    item.level === 3 && 'ml-4',
                  )}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-6'>
            {blocks.map((block, index) => {
              if (block.type === 'h2' || block.type === 'h3') {
                const Tag = block.type;
                return (
                  <Tag
                    key={`${block.type}-${block.id}-${index}`}
                    id={block.id}
                    className={cn(block.type === 'h2' ? 'pt-4 text-[2.5rem] leading-[0.92]' : 'text-[1.9rem] leading-[0.94]')}
                  >
                    {block.content}
                  </Tag>
                );
              }

              if (block.type === 'ul') {
                return (
                  <ul key={`ul-${index}`} className='grid gap-3 border border-black/10 bg-[#fbf7f0] p-5 text-sm leading-7 text-[#554d43]'>
                    {block.items.map((item) => (
                      <li key={item} className='flex gap-3'>
                        <span className='mt-3 h-1.5 w-1.5 shrink-0 bg-[#15120f]' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={`p-${index}`} className='text-base leading-8 text-[#544c42]'>
                  {block.content}
                </p>
              );
            })}
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

export function ContactEditorialPage() {
  const pathname = useLocation().pathname;
  const region = getRegionFromPathname(pathname);
  const preferredRegion = region === 'AE' ? 'dubai' : 'india';
  const contact = getContactByRegion(region);
  const [interest, setInterest] = useState(serviceNarrative[0]?.title ?? '');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    location: '',
    timeline: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  usePageMeta(
    'Wanderlust Architects | Contact',
    'Contact Wanderlust Architects to discuss architecture, interior design, hospitality, or fit-out work across India and the UAE.',
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-24 lg:grid-cols-[0.96fr_1.04fr] lg:items-end lg:py-30'>
          <Reveal className='space-y-5'>
            <SectionEyebrow inverted>Contact</SectionEyebrow>
            <h1 className='max-w-[8ch] text-[clamp(4rem,7vw,7rem)] leading-[0.82] text-[#f7f1e6]'>
              Begin with the atmosphere you want to build.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className='space-y-5 text-base leading-8 text-white/72'>
            <p>
              Share the site, the ambition, the programme, or even just the mood you want the project to carry. We can translate that into a sharper brief and a cleaner delivery conversation.
            </p>
            <div className='flex flex-wrap gap-3'>
              <Button href={`mailto:${contact.email}`} className='bg-white !text-black hover:border-white hover:bg-transparent hover:!text-white'>
                email studio
              </Button>
              <Button href={contact.whatsapp} variant='ghost' className='border-white/20 text-white hover:bg-white hover:text-black'>
                whatsapp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className='border-b border-black/10 bg-[#f8f3ea]'>
        <Container className='grid gap-5 py-16 md:grid-cols-2 lg:py-20'>
          <Reveal>
            <OfficeCard
              title='India studio'
              address='C-Scheme, Jaipur, Rajasthan, India'
              phone='+91 98284 85111'
              email='studio@wanderlustarchitects.com'
              emphasis='Homes, hospitality, and architecture across India.'
            />
          </Reveal>
          <Reveal delay={0.08}>
            <OfficeCard
              title='Dubai studio'
              address='IBN Battuta, 11th Floor, Jebel Ali, Dubai, United Arab Emirates'
              phone='+971 54 505 2126'
              email='studio@wanderlustarchitects.com'
              emphasis='Premium fit-outs and interior delivery in the UAE.'
            />
          </Reveal>
        </Container>
      </section>

      <section className='bg-[#efe8de]'>
        <Container className='grid gap-12 py-16 lg:grid-cols-[0.86fr_1.14fr] lg:py-22'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Inquiry brief</SectionEyebrow>
            <h2 className='max-w-[9ch] text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[0.9] text-[#15120f]'>
              Tell us what kind of project needs design direction.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>
              Pick the service focus first, then leave us the rough site context, timing, and any priorities you already know. We will take it from there.
            </p>
            <div className='grid gap-3'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>Service focus</p>
              <div className='flex flex-wrap gap-2'>
                {serviceNarrative.map((service) => {
                  const active = interest === service.title;
                  return (
                    <button
                      key={service.title}
                      type='button'
                      onClick={() => setInterest(service.title)}
                      className={cn(
                        'border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] transition',
                        active ? 'border-black bg-black text-white' : 'border-black/10 bg-[#fbf7f0] text-[#5a5147] hover:border-black/24 hover:text-black',
                      )}
                    >
                      {service.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className='grid gap-5 border border-black/10 bg-[#fbf7f0] p-6'>
              <div className='grid gap-5 md:grid-cols-2'>
                <div className='grid gap-2'>
                  <label htmlFor='contact-name' className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>
                    Name
                  </label>
                  <Input
                    id='contact-name'
                    value={formState.name}
                    onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                    placeholder='Your name'
                  />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='contact-email' className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>
                    Email
                  </label>
                  <Input
                    id='contact-email'
                    type='email'
                    value={formState.email}
                    onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                    placeholder='you@example.com'
                  />
                </div>
              </div>

              <div className='grid gap-5 md:grid-cols-2'>
                <div className='grid gap-2'>
                  <label htmlFor='contact-location' className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>
                    Project location
                  </label>
                  <Input
                    id='contact-location'
                    value={formState.location}
                    onChange={(event) => setFormState((current) => ({ ...current, location: event.target.value }))}
                    placeholder={preferredRegion === 'dubai' ? 'Dubai Marina, JVC, DIFC...' : 'Jaipur, Goa, Udaipur...'}
                  />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='contact-timeline' className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>
                    Timeline
                  </label>
                  <Input
                    id='contact-timeline'
                    value={formState.timeline}
                    onChange={(event) => setFormState((current) => ({ ...current, timeline: event.target.value }))}
                    placeholder='Immediate, next quarter, exploratory...'
                  />
                </div>
              </div>

              <div className='grid gap-2'>
                <label htmlFor='contact-note' className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>
                  Project note
                </label>
                <Textarea
                  id='contact-note'
                  rows={7}
                  value={formState.note}
                  onChange={(event) => setFormState((current) => ({ ...current, note: event.target.value }))}
                  placeholder='Tell us about the property, ambition, constraints, or the atmosphere you want the finished project to carry.'
                />
              </div>

              <div className='grid gap-4 border-t border-black/10 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center'>
                <p className='text-sm leading-7 text-[#5a5147]'>
                  This demo inquiry form is currently non-transactional. Use it to shape the brief, then continue the conversation at{' '}
                  <a href={`mailto:${contact.email}`} className='text-[#15120f] underline underline-offset-4'>
                    {contact.email}
                  </a>
                  .
                </p>
                <Button type='submit'>draft inquiry</Button>
              </div>

              {submitted ? (
                <div className='border border-black/10 bg-white px-4 py-4 text-sm leading-7 text-[#544c42]'>
                  Inquiry outline saved. For a real submission, send your note to {contact.email} or continue on WhatsApp.
                </div>
              ) : null}
            </form>
          </Reveal>
        </Container>
      </section>

      <section className='bg-white'>
        <Container className='grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-18'>
          <Reveal className='space-y-4'>
            <SectionEyebrow>Elsewhere</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.4rem,4vw,4rem)] leading-[0.9] text-[#15120f]'>
              Follow the studio beyond the project conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className='flex flex-wrap gap-3'>
            {siteSocialLinks.map((link) => (
              <Button key={link.label} href={link.href} variant='ghost'>
                {link.label}
              </Button>
            ))}
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

export function CareerEditorialPage() {
  usePageMeta(
    'Wanderlust Architects | Careers',
    'Explore careers at Wanderlust Architects across architecture, interiors, visualisation, and project delivery.',
  );

  return (
    <div className='bg-[#f3ece2] text-[#15120f]'>
      <section data-site-hero='true' className='border-b border-black/10 bg-[#171310] text-white'>
        <Container className='grid gap-10 py-24 lg:grid-cols-[0.96fr_1.04fr] lg:items-end lg:py-30'>
          <Reveal className='space-y-5'>
            <SectionEyebrow inverted>Careers</SectionEyebrow>
            <h1 className='max-w-[9ch] text-[clamp(4rem,7vw,7.2rem)] leading-[0.82] text-[#f7f1e6]'>
              Join a studio that edits hard and builds carefully.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className='space-y-5 text-base leading-8 text-white/72'>
            <p>
              We look for people who care about atmosphere and precision in equal measure: architects, interior designers, visualisers, and delivery minds who understand that good work survives contact with the site.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className='bg-[#f8f3ea]'>
        <Container className='grid gap-5 py-16 md:grid-cols-3 lg:py-22'>
          {[
            'Architectural design with strong spatial judgement',
            'Interior detailing and material clarity',
            'Project delivery discipline with calm communication',
          ].map((value, index) => (
            <Reveal key={value} delay={index * 0.06}>
              <article className='grid h-full gap-4 border border-black/10 bg-[#fbf7f0] p-6'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a7065]'>{String(index + 1).padStart(2, '0')}</p>
                <p className='text-[1.25rem] leading-[1.45] text-[#201b17]'>{value}</p>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className='bg-[#efe8de]'>
        <Container className='grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20'>
          <Reveal className='space-y-5'>
            <SectionEyebrow>Applications</SectionEyebrow>
            <h2 className='max-w-[10ch] text-[clamp(2.8rem,4vw,4.6rem)] leading-[0.9] text-[#15120f]'>
              Send portfolios, CVs, and a short note on how you think.
            </h2>
            <p className='max-w-xl text-base leading-8 text-[#5a5147]'>
              Include the role you are interested in, your current city, and one recent project that best represents your design judgment.
            </p>
          </Reveal>
          <Reveal delay={0.08} className='flex flex-wrap gap-3'>
            <Button href='mailto:studio@wanderlustarchitects.com?subject=Career%20Application%20-%20Wanderlust%20Architects'>
              apply by email
            </Button>
            <Button href='/contact' variant='ghost'>
              contact studio
            </Button>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

export function NotFoundEditorialPage() {
  usePageMeta('Page not found | Wanderlust Architects', 'The page you requested could not be found.');

  return (
    <div className='bg-[#171310] text-white'>
      <Container className='grid min-h-[78vh] place-items-center py-24 text-center'>
        <Reveal className='grid max-w-3xl gap-6'>
          <Badge className='mx-auto border-white/16 bg-white/8 text-white'>404</Badge>
          <h1 className='text-[clamp(4rem,8vw,8rem)] leading-[0.8] text-[#f7f1e6]'>The page drifted out of frame.</h1>
          <p className='mx-auto max-w-2xl text-base leading-8 text-white/72 sm:text-lg'>
            The link may have changed, or the page may no longer exist. You can return to the regional gateway, the project archive, or the studio journal.
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <Button href='/'>gateway</Button>
            <Button href='/projects' variant='ghost' className='border-white/20 text-white hover:bg-white hover:text-black'>
              projects
            </Button>
            <Button href='/blog' variant='ghost' className='border-white/20 text-white hover:bg-white hover:text-black'>
              journal
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

