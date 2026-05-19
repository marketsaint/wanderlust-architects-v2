import { useMemo, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { Container, Reveal } from './ui';
import {
  dubaiServices,
  dubaiSectors,
  getFeaturedProjects,
  getLatestBlogs,
  getLegacyProjectDetailPath,
  processSteps,
  siteImages,
  type SiteRegion,
  teamMembers,
} from '@/lib/site-content';
import { type ProjectRecord } from '@/lib/projects';

type HomeDeckTabKey = 'portfolio' | 'method' | 'studio' | 'connect';

type HomeDeckTab = {
  key: HomeDeckTabKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
};

type RegionConfig = {
  homeLabel: string;
  heroTitle: string;
  heroCopy: string;
  heroImage: string;
  chips: string[];
  kicker: string;
  deckLabel: string;
  methodTitle: string;
  methodDescription: string;
  methodImage: string;
  methodItems: Array<{ title: string; body: string }>;
  connectTitle: string;
  connectDescription: string;
};

const INDIA_CONFIG: RegionConfig = {
  homeLabel: 'India studio',
  heroTitle: 'Spaces with restraint, warmth, and lived-in precision.',
  heroCopy:
    'A quieter, sharper website architecture for premium residences, boutique hospitality, and thoughtful interiors. The experience is denser, calmer, and more intentional so visitors do not need to scroll through an endless stack to understand the studio.',
  heroImage: siteImages.hero,
  chips: ['Luxury residences', 'Boutique hospitality', 'Interior architecture', 'Documentation-led delivery'],
  kicker: 'Jaipur / Rajasthan / India',
  deckLabel: 'A compact architecture for the brand',
  methodTitle: 'A method that protects quality without creating friction.',
  methodDescription:
    'The work moves from brief to build through a clear set of design and delivery decisions. It stays premium because the thinking stays disciplined.',
  methodImage: siteImages.about,
  methodItems: processSteps.map((step) => ({ title: step.title, body: step.description })),
  connectTitle: 'The first conversation should be as considered as the project.',
  connectDescription:
    'Share the location, scale, and atmosphere you are aiming for. We can shape the right starting point from there.',
};

const DUBAI_CONFIG: RegionConfig = {
  homeLabel: 'UAE studio',
  heroTitle: 'Dubai interiors with stronger taste and clearer delivery.',
  heroCopy:
    'A more controlled regional experience for Dubai visitors: fewer long sections, tighter positioning, and a premium layout that presents the studio with speed, confidence, and clarity.',
  heroImage: siteImages.dubaiHero,
  chips: ['Luxury villas', 'Hospitality', 'Executive workplaces', 'Fit-out clarity'],
  kicker: 'Dubai / UAE',
  deckLabel: 'A compact architecture for the region',
  methodTitle: 'Design direction and delivery logic held in the same frame.',
  methodDescription:
    'Dubai briefs move quickly. The process here is designed to communicate taste, fit-out readiness, and remote-friendly decision support without diluting the design intent.',
  methodImage: siteImages.dubaiHero,
  methodItems: dubaiServices.map((service) => ({ title: service.title, body: service.copy })),
  connectTitle: 'If the brief needs stronger taste, structure, and pace, let’s talk.',
  connectDescription:
    'Villa, hospitality, and workplace enquiries can start with a single clear brief. We’ll map the most effective first phase from there.',
};

const HOME_TABS: HomeDeckTab[] = [
  {
    key: 'portfolio',
    label: 'portfolio',
    eyebrow: 'Selected Work',
    title: 'Projects are presented first, because the work should carry the brand.',
    description: 'A curated image-led view that lets the visitor assess tone, range, and confidence quickly.',
  },
  {
    key: 'method',
    label: 'method',
    eyebrow: 'Design Method',
    title: 'The process is visible, but compact.',
    description: 'Rather than turning the homepage into a long explanation, the key steps are condensed into one strong panel.',
  },
  {
    key: 'studio',
    label: 'studio',
    eyebrow: 'Studio',
    title: 'Leadership, design language, and decision-making in one view.',
    description: 'The studio story becomes part of the architecture instead of living on a separate, oversized page.',
  },
  {
    key: 'connect',
    label: 'connect',
    eyebrow: 'Contact + Journal',
    title: 'Contact, writing, and next steps stay close to the main narrative.',
    description: 'Important support information remains accessible without creating a long tail of secondary sections.',
  },
] as const;

function RegionHero({
  config,
  contact,
  proofBarCopy,
}: {
  config: RegionConfig;
  contact: { phone: string; whatsapp: string };
  proofBarCopy: string;
}) {
  return (
    <section data-site-hero='true' className='relative isolate overflow-hidden bg-[#070707] text-white'>
      <div className='absolute inset-0'>
        <img
          src={config.heroImage}
          alt=''
          aria-hidden='true'
          className='h-full w-full object-cover grayscale contrast-[1.02] brightness-[0.34]'
        />
      </div>
      <div className='absolute inset-0 bg-[linear-gradient(100deg,rgba(6,6,6,0.94)_0%,rgba(6,6,6,0.74)_44%,rgba(6,6,6,0.54)_100%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.1),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(232,214,184,0.12),transparent_20%)]' />
      <div className='absolute inset-0 architect-hero-grid opacity-30' />

      <Container className='relative z-10 flex min-h-[calc(100svh-4rem)] items-end py-10 pt-28 sm:pt-32 lg:items-center lg:py-16'>
        <div className='grid w-full gap-5 xl:grid-cols-[1.04fr_0.96fr] xl:gap-6'>
          <Reveal className='space-y-7 border border-white/10 bg-[rgba(0,0,0,0.2)] p-5 backdrop-blur-md sm:p-6 lg:p-8'>
            <div className='space-y-4'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e9dbc4]'>
                Wanderlust Architects / {config.homeLabel}
              </p>
              <h1 className='max-w-[8.4ch] text-[clamp(3.8rem,8vw,7.6rem)] leading-[0.82] text-[#f4ecdf]'>
                {config.heroTitle}
              </h1>
              <p className='max-w-[34rem] text-sm leading-8 text-white/72 sm:text-base'>{config.heroCopy}</p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
              {config.chips.map((chip) => (
                <div key={chip} className='border border-white/10 bg-white/[0.04] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/74'>
                  {chip}
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-3 border-t border-white/10 pt-5'>
              <Link
                to='/projects'
                className='inline-flex min-h-11 items-center gap-2 border border-white bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black transition hover:bg-transparent hover:text-white'
              >
                <span>Explore work</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={contact.whatsapp}
                target='_blank'
                rel='noreferrer'
                className='inline-flex min-h-11 items-center border border-white/18 px-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white hover:bg-white hover:text-black'
              >
                WhatsApp studio
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className='grid gap-5 xl:grid-rows-[minmax(0,1fr)_auto]'>
            <div className='relative min-h-[22rem] overflow-hidden border border-white/10 bg-black/20'>
              <img src={config.heroImage} alt='' aria-hidden='true' className='h-full w-full object-cover grayscale' />
              <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.72)_100%)]' />
              <div className='absolute inset-x-0 bottom-0 grid gap-3 p-5 sm:p-6'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e9dbc4]/84'>{config.kicker}</p>
                <h2 className='max-w-[10ch] text-[2rem] leading-[0.9] text-white sm:text-[2.6rem]'>
                  A lower-scroll architecture with a stronger point of view.
                </h2>
              </div>
            </div>

            <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]'>
              <div className='border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md sm:p-6'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e9dbc4]'>Positioning</p>
                <p className='mt-4 text-sm leading-8 text-white/72'>{proofBarCopy}</p>
              </div>

              <div className='border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md sm:p-6'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e9dbc4]'>Phone</p>
                <a href={`tel:${contact.phone}`} className='mt-4 block text-[1.15rem] text-white transition hover:text-[#e9dbc4]'>
                  {contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PortfolioPanel({
  featuredProjects,
}: {
  featuredProjects: ProjectRecord[];
}) {
  const [activeProjectSlug, setActiveProjectSlug] = useState(featuredProjects[0]?.slug ?? '');
  const activeProject = featuredProjects.find((project) => project.slug === activeProjectSlug) ?? featuredProjects[0];

  if (!activeProject) {
    return null;
  }

  return (
    <div className='grid gap-5 xl:grid-cols-[0.78fr_1.22fr]'>
      <div className='grid gap-0 border-y border-black/10'>
        {featuredProjects.map((project, index) => {
          const isActive = project.slug === activeProject.slug;

          return (
            <button
              key={project.slug}
              type='button'
              onClick={() => setActiveProjectSlug(project.slug)}
              className={`grid gap-4 border-t px-0 py-5 text-left transition first:border-t-0 sm:grid-cols-[4rem_minmax(0,1fr)_6rem] sm:gap-6 ${
                isActive ? 'border-black/18 text-black' : 'border-black/10 text-[#5f584f] hover:text-black'
              }`}
            >
              <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-iron'>{String(index + 1).padStart(2, '0')}</p>
              <div className='space-y-2'>
                <h3 className='text-[2rem] leading-[0.9] text-[#151311]'>{project.title}</h3>
                <p className='text-sm leading-7 text-[#4d463e]'>{project.description}</p>
              </div>
              <div className='space-y-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-iron sm:text-right'>
                <p>{project.category}</p>
                <p>{project.year}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className='grid gap-4'>
        <div className='relative min-h-[24rem] overflow-hidden border border-black/10 bg-[#f7f1e8]'>
          <img src={activeProject.image} alt={activeProject.title} className='h-full w-full object-cover grayscale' />
        </div>
        <div className='flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-4'>
          <p className='text-sm leading-7 text-[#4d463e]'>
            {activeProject.location} / {activeProject.area}
          </p>
          <Link to={getLegacyProjectDetailPath(activeProject)} className='inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#151311] transition hover:text-iron'>
            <span>Open case study</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MethodPanel({ config }: { config: RegionConfig }) {
  return (
    <div className='grid gap-5 xl:grid-cols-[0.84fr_1.16fr]'>
      <div className='space-y-4 border border-black/10 bg-[#f6f2ea] p-5 sm:p-6'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-iron'>{config.deckLabel}</p>
        <h3 className='max-w-[11ch] text-[2.4rem] leading-[0.9] text-[#151311]'>{config.methodTitle}</h3>
        <p className='text-sm leading-8 text-[#4d463e]'>{config.methodDescription}</p>
      </div>

      <div className='grid gap-5'>
        <div className='relative min-h-[18rem] overflow-hidden border border-black/10'>
          <img src={config.methodImage} alt='' aria-hidden='true' className='h-full w-full object-cover grayscale' />
        </div>
        <div className='grid gap-0 border-y border-black/10'>
          {config.methodItems.map((item, index) => (
            <div key={item.title} className='grid gap-4 border-t border-black/10 py-4 first:border-t-0 sm:grid-cols-[4rem_13rem_minmax(0,1fr)] sm:gap-6'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-iron'>{String(index + 1).padStart(2, '0')}</p>
              <h4 className='text-[1.4rem] leading-[1] text-[#151311]'>{item.title}</h4>
              <p className='text-sm leading-7 text-[#4d463e]'>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioPanel({ region }: { region: SiteRegion }) {
  const leadershipTeam = teamMembers.slice(0, 2);

  return (
    <div className='grid gap-5 xl:grid-cols-[0.88fr_1.12fr]'>
      <div className='space-y-4 border border-black/10 bg-[#f6f2ea] p-5 sm:p-6'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-iron'>
          {region === 'AE' ? 'One studio, region-aware delivery' : 'The people behind the work'}
        </p>
        <h3 className='max-w-[11ch] text-[2.4rem] leading-[0.9] text-[#151311]'>
          Design sensitivity and execution awareness are part of the same practice.
        </h3>
        <p className='text-sm leading-8 text-[#4d463e]'>
          This section replaces a much longer studio story. Leadership, design language, and working style are compressed into one legible view so visitors get the point quickly.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {leadershipTeam.map((member) => (
          <article key={member.name} className='grid gap-4 border border-black/10 bg-white p-4'>
            <div className='relative h-[19rem] overflow-hidden border border-black/10'>
              <img src={member.image} alt={member.name} className='h-full w-full object-cover object-top grayscale' />
            </div>
            <div className='space-y-2 border-t border-black/10 pt-4'>
              <h4 className='text-[1.8rem] leading-[0.95] text-[#151311]'>{member.displayName ?? member.name}</h4>
              <p className='text-[10px] font-semibold uppercase tracking-[0.26em] text-iron'>{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ConnectPanel({
  config,
  contact,
  region,
}: {
  config: RegionConfig;
  contact: { phone: string; whatsapp: string };
  region: SiteRegion;
}) {
  const latestBlogs = getLatestBlogs();

  return (
    <div className='grid gap-5 xl:grid-cols-[0.78fr_1.22fr]'>
      <div className='space-y-4 border border-black/10 bg-[#151311] p-5 text-white sm:p-6'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e9dbc4]'>Contact</p>
        <h3 className='max-w-[11ch] text-[2.3rem] leading-[0.9] text-[#f4ecdf]'>{config.connectTitle}</h3>
        <p className='text-sm leading-8 text-white/72'>{config.connectDescription}</p>
        <div className='space-y-3 border-t border-white/10 pt-5'>
          <a href='mailto:studio@wanderlustarchitects.com' className='block text-[1.05rem] text-white transition hover:text-[#e9dbc4]'>
            studio@wanderlustarchitects.com
          </a>
          <a href={`tel:${contact.phone}`} className='inline-flex items-center gap-2 text-[1.05rem] text-white transition hover:text-[#e9dbc4]'>
            <Phone size={16} />
            <span>{contact.phone}</span>
          </a>
        </div>
        <div className='flex flex-wrap gap-3 pt-2'>
          <Link
            to='/contact'
            className='inline-flex min-h-11 items-center gap-2 border border-white bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black transition hover:bg-transparent hover:text-white'
          >
            <span>Start project</span>
            <ArrowRight size={14} />
          </Link>
          <a
            href={contact.whatsapp}
            target='_blank'
            rel='noreferrer'
            className='inline-flex min-h-11 items-center border border-white/18 px-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white hover:bg-white hover:text-black'
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className='grid gap-0 border-y border-black/10'>
        {latestBlogs.map((blog, index) => (
          <Link
            key={blog.slug}
            to={`/blog/${blog.slug}`}
            className='grid gap-4 border-t border-black/10 py-5 transition first:border-t-0 sm:grid-cols-[4rem_minmax(0,1fr)_8rem] sm:gap-6 hover:text-iron'
          >
            <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-iron'>{String(index + 1).padStart(2, '0')}</p>
            <div className='space-y-2'>
              <h4 className='text-[1.8rem] leading-[0.95] text-[#151311]'>{blog.title}</h4>
              <p className='text-sm leading-7 text-[#4d463e]'>{blog.tags.join(' / ')}</p>
            </div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.28em] text-iron sm:text-right'>{region === 'AE' ? 'UAE' : 'India'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ExperienceDeck({
  region,
  config,
  contact,
}: {
  region: SiteRegion;
  config: RegionConfig;
  contact: { phone: string; whatsapp: string };
}) {
  const [activeTab, setActiveTab] = useState<HomeDeckTabKey>('portfolio');
  const featuredProjects = useMemo(() => getFeaturedProjects(), []);
  const sectors = region === 'AE' ? dubaiSectors : ['Residences', 'Hospitality', 'Workplaces', 'Landscapes'];
  const activeTabData = HOME_TABS.find((tab) => tab.key === activeTab) ?? HOME_TABS[0];

  return (
    <section className='border-y border-black/10 bg-white'>
      <Container className='grid gap-8 py-12 lg:py-14 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-10'>
        <Reveal className='space-y-5 xl:sticky xl:top-28 xl:self-start'>
          <div className='space-y-4'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-iron'>Experience deck</p>
            <h2 className='max-w-[9ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.88] text-[#151311]'>
              More signal, less scroll.
            </h2>
            <p className='text-sm leading-8 text-[#4d463e]'>
              The site now carries its key pages inside one controlled architecture: portfolio, method, studio, and connect.
            </p>
          </div>

          <div className='grid gap-2 border-t border-black/10 pt-5'>
            {HOME_TABS.map((tab) => {
              const isActive = tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  type='button'
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center justify-between border px-4 py-3 text-left text-[11px] transition ${
                    isActive ? 'border-black bg-black text-white' : 'border-black/12 bg-[#faf6ef] text-[#4d463e] hover:border-black hover:text-black'
                  }`}
                >
                  <span className='uppercase tracking-[0.26em]'>{tab.label}</span>
                  <ArrowRight size={14} />
                </button>
              );
            })}
          </div>

          <div className='hidden border-t border-black/10 pt-5 xl:block'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-iron'>Sectors</p>
            <div className='mt-4 grid gap-2'>
              {sectors.map((sector) => (
                <div key={sector} className='border border-black/10 bg-[#faf6ef] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4d463e]'>
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className='border border-black/10 bg-[#fdfbf7] p-5 sm:p-6 lg:p-7'>
            <div className='grid gap-4 border-b border-black/10 pb-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end'>
              <div className='space-y-3'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-iron'>{activeTabData.eyebrow}</p>
                <h3 className='max-w-[12ch] text-[clamp(2.2rem,4vw,4rem)] leading-[0.9] text-[#151311]'>
                  {activeTabData.title}
                </h3>
              </div>
              <p className='max-w-xl text-sm leading-8 text-[#4d463e]'>{activeTabData.description}</p>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className='pt-6'
              >
                {activeTab === 'portfolio' ? <PortfolioPanel featuredProjects={featuredProjects} /> : null}
                {activeTab === 'method' ? <MethodPanel config={config} /> : null}
                {activeTab === 'studio' ? <StudioPanel region={region} /> : null}
                {activeTab === 'connect' ? <ConnectPanel config={config} contact={contact} region={region} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ClosingBand({
  config,
}: {
  config: RegionConfig;
}) {
  return (
    <section className='bg-[#151311] text-white'>
      <Container className='grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-end lg:py-16'>
        <Reveal className='space-y-4'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e9dbc4]'>Final note</p>
          <h2 className='max-w-[11ch] text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.88] text-[#f4ecdf]'>
            Award-level presence usually comes from editing, not adding.
          </h2>
          <p className='max-w-[40rem] text-sm leading-8 text-white/72'>
            This architecture keeps the same underlying studio content, but compresses it into a stronger sequence with fewer long sections and more decisive presentation.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            to='/projects'
            className='inline-flex min-h-11 items-center gap-2 border border-white bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black transition hover:bg-transparent hover:text-white'
          >
            <span>{config.homeLabel === 'UAE studio' ? 'View Dubai portfolio' : 'View portfolio'}</span>
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

export function HomePageSections({
  region,
  contact,
  proofBarCopy,
}: {
  region: SiteRegion;
  contact: { phone: string; whatsapp: string };
  proofBarCopy: string;
}) {
  const config = region === 'AE' ? DUBAI_CONFIG : INDIA_CONFIG;

  return (
    <>
      <RegionHero config={config} contact={contact} proofBarCopy={proofBarCopy} />
      <ExperienceDeck region={region} config={config} contact={contact} />
      <ClosingBand config={config} />
    </>
  );
}
