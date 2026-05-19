import { getBlogs, processSteps, services, siteImages, teamMembers, testimonials } from './site-content';
import { projects, type ProjectCategory, type ProjectRecord } from './projects';
import type { SiteRegionKey } from './site-region';

type RegionStat = {
  label: string;
  value: string;
};

export type RegionProfile = {
  key: SiteRegionKey;
  label: string;
  cityline: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    caption: string;
  };
  pullQuote: string;
  signatureNotes: string[];
  journalLead: string;
  inquiryLabel: string;
  stats: RegionStat[];
};

export type ProjectGalleryFrame = {
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
};

type Palette = {
  accent: string;
  glow: string;
};

const paletteByCategory: Record<ProjectCategory, Palette> = {
  Hospitality: {
    accent: 'from-[#d8b38f] via-[#8f5d39] to-[#2f2118]',
    glow: 'rgba(199, 140, 88, 0.22)',
  },
  Residential: {
    accent: 'from-[#d7c8b7] via-[#786354] to-[#292320]',
    glow: 'rgba(189, 165, 136, 0.24)',
  },
  Commercial: {
    accent: 'from-[#cbc7be] via-[#667a86] to-[#1a232a]',
    glow: 'rgba(100, 122, 134, 0.22)',
  },
  Heritage: {
    accent: 'from-[#d7ba8c] via-[#8a6238] to-[#2b2017]',
    glow: 'rgba(168, 115, 60, 0.24)',
  },
};

const moodByCategory: Record<ProjectCategory, string[]> = {
  Hospitality: ['arrival sequence', 'ambient lighting', 'ceremonial circulation'],
  Residential: ['privacy gradient', 'soft tactility', 'everyday elegance'],
  Commercial: ['brand clarity', 'measured efficiency', 'client-facing polish'],
  Heritage: ['memory retention', 'restorative detailing', 'timeless continuity'],
};

const insightByCategory: Record<ProjectCategory, string> = {
  Hospitality:
    'Hospitality work here is treated as choreography: the arrival, pause points, visual compression, and release are all considered part of the guest memory.',
  Residential:
    'Residential work focuses on emotional comfort as much as visual order, using spatial pacing, daylight, and tactile finishes to create a lived-in calm.',
  Commercial:
    'Commercial environments are designed to feel composed under pressure, with circulation, visibility, and brand tone all resolved into one clean operating system.',
  Heritage:
    'Heritage projects are approached with restraint, allowing continuity, repair, and documentation discipline to carry more weight than stylistic overstatement.',
};

const galleryPositionSets = [
  ['50% 50%', '50% 18%', '50% 78%', '22% 50%'],
  ['50% 50%', '68% 26%', '32% 74%', '80% 52%'],
  ['50% 50%', '35% 22%', '68% 76%', '18% 58%'],
  ['50% 50%', '56% 20%', '42% 80%', '72% 42%'],
] as const;

function getProjectFrameCaptions(project: ProjectRecord) {
  const type = project.projectType.toLowerCase();

  if (type.includes('banquet') || type.includes('wedding')) {
    return ['Arrival atmosphere', 'Ceremonial detail', 'Guest sequence', 'Evening material glow'];
  }

  if (type.includes('resort') || type.includes('cottages') || type.includes('retreat')) {
    return ['Landscape-facing frame', 'Quiet material register', 'Restorative guest zone', 'Hospitality mood study'];
  }

  if (type.includes('office')) {
    return ['Workplace overview', 'Executive detail', 'Client-facing atmosphere', 'Material discipline'];
  }

  if (type.includes('temple') || type.includes('heritage')) {
    return ['Architectural continuity', 'Repair and preservation detail', 'Sacred movement', 'Surface memory'];
  }

  if (type.includes('residence') || type.includes('villa') || type.includes('farmhouse') || type.includes('penthouse') || type.includes('outhouse')) {
    return ['Primary living frame', 'Domestic detail', 'Light and privacy study', 'Material calm'];
  }

  if (type.includes('restaurant') || type.includes('salon') || type.includes('showroom')) {
    return ['Brand-led overview', 'Tactile focal detail', 'Customer journey frame', 'Lighting character'];
  }

  if (type.includes('hostel')) {
    return ['Social commons overview', 'Durable detail', 'Shared circulation', 'Everyday comfort'];
  }

  return ['Architectural overview', 'Material detail', 'Spatial sequence', 'Atmosphere study'];
}

export const regionProfiles: Record<SiteRegionKey, RegionProfile> = {
  india: {
    key: 'india',
    label: 'India',
    cityline: 'Jaipur, Rajasthan',
    hero: {
      eyebrow: 'Architecture, interiors, and hospitality across India',
      title: 'Spaces shaped by memory, climate, and quiet luxury.',
      body:
        'Wanderlust Architects designs residences, retreats, hospitality settings, and brand-led interiors with a tactile palette, precise documentation, and a strong sense of place.',
      image: siteImages.hero,
      caption: 'A portfolio rooted in warmth, material gravity, and architectural calm.',
    },
    pullQuote:
      'The most memorable architecture is rarely the loudest. It is the work that allows proportion, material, and atmosphere to settle into confidence.',
    signatureNotes: ['Luxury residences with emotional restraint', 'Hospitality projects with ceremony and softness', 'Execution-ready detailing that protects design intent'],
    journalLead: 'Journal notes on homes, hospitality, execution, and architectural clarity in India.',
    inquiryLabel: 'Start an India project conversation',
    stats: [
      { label: 'market', value: 'India' },
      { label: 'focus', value: 'Homes, hospitality, fit-outs' },
      { label: 'method', value: 'Design to execution alignment' },
    ],
  },
  dubai: {
    key: 'dubai',
    label: 'Dubai',
    cityline: 'Ibn Battuta, Dubai',
    hero: {
      eyebrow: 'Design and fit-out strategy for Dubai, UAE',
      title: 'Refined environments for fast-moving, premium urban briefs.',
      body:
        'For Dubai, the studio frames workplace, hospitality, and lifestyle interiors through delivery-ready coordination, brand sensitivity, and a polished hospitality mindset.',
      image: siteImages.dubaiHero,
      caption: 'A regional presence calibrated for investor pace and premium presentation.',
    },
    pullQuote:
      'In Dubai, speed matters, but so does atmosphere. The design has to hold both commercial clarity and emotional resonance at the same time.',
    signatureNotes: ['Office and lifestyle fit-outs with brand intelligence', 'Premium interiors with hospitality-inflected polish', 'Single-point coordination for fast-track delivery'],
    journalLead: 'Thoughts on fit-outs, hospitality cues, and premium design delivery in the UAE.',
    inquiryLabel: 'Discuss a Dubai fit-out or interior project',
    stats: [
      { label: 'market', value: 'UAE' },
      { label: 'focus', value: 'Offices, hospitality, retail' },
      { label: 'method', value: 'Fast-track delivery discipline' },
    ],
  },
};

export const studioPromises = [
  {
    title: 'Editorial restraint',
    copy:
      'We aim for atmospheres that feel curated rather than decorated, where composition and silence do as much work as ornament.',
  },
  {
    title: 'Material intelligence',
    copy:
      'Palettes are chosen for longevity, tactility, and the way they absorb light over time, not just for immediate novelty.',
  },
  {
    title: 'Execution fidelity',
    copy:
      'Documentation, coordination, and site decisions are treated as part of the design language so the finished project keeps its original character.',
  },
];

export const studioMetrics = [
  { label: 'Practice', value: 'Architecture + Interiors' },
  { label: 'Studios', value: 'India + UAE' },
  { label: 'Bias', value: 'Quiet luxury' },
  { label: 'Output', value: 'Concept to handover' },
];

export const studioPillars = [
  'Architecture-led interiors rather than trend-led styling',
  'Narrative spaces rooted in texture, light, and procession',
  'Premium delivery systems that reduce site ambiguity',
];

export const processNarrative = processSteps.map((step, index) => ({
  ...step,
  index: String(index + 1).padStart(2, '0'),
}));

export const serviceNarrative = services.map((service, index) => ({
  ...service,
  sequence: String(index + 1).padStart(2, '0'),
}));

export const journalEntries = getBlogs();

export const featuredTestimonials = testimonials;

export const leadershipTeam = teamMembers;

export function getRegionProfile(regionKey: SiteRegionKey) {
  return regionProfiles[regionKey];
}

export function getRegionProjects(regionKey: SiteRegionKey) {
  if (regionKey === 'dubai') {
    return [...projects]
      .sort((left, right) => {
        const leftPriority = left.category === 'Commercial' || left.category === 'Hospitality' ? 0 : 1;
        const rightPriority = right.category === 'Commercial' || right.category === 'Hospitality' ? 0 : 1;
        return leftPriority - rightPriority || right.year - left.year;
      })
      .slice(0, 6);
  }

  return [...projects].sort((left, right) => right.year - left.year).slice(0, 6);
}

export function getProjectPalette(project: ProjectRecord) {
  return paletteByCategory[project.category];
}

export function getProjectMoods(project: ProjectRecord) {
  return moodByCategory[project.category];
}

export function getProjectInsight(project: ProjectRecord) {
  return insightByCategory[project.category];
}

export function getProjectHighlights(project: ProjectRecord) {
  return [
    { label: 'category', value: project.category },
    { label: 'location', value: project.location },
    { label: 'area', value: project.area },
    { label: 'year', value: String(project.year) },
  ];
}

export function getProjectGallery(project: ProjectRecord): ProjectGalleryFrame[] {
  const positions = galleryPositionSets[project.id % galleryPositionSets.length];
  const captions = getProjectFrameCaptions(project);

  return captions.map((caption, index) => ({
    src: project.image,
    alt: `${project.title} - ${caption.toLowerCase()}`,
    caption,
    objectPosition: positions[index] ?? '50% 50%',
  }));
}

export function getRelatedProjects(project: ProjectRecord) {
  const sameCategory = projects.filter((entry) => entry.slug !== project.slug && entry.category === project.category);
  const remainder = projects.filter((entry) => entry.slug !== project.slug && entry.category !== project.category);
  return [...sameCategory, ...remainder].slice(0, 3);
}
