import { projectCategories, projects, type ProjectFilter, type ProjectRecord } from './projects';
import { readPersistedRegion } from './site-region';

export type SiteRegion = 'IN' | 'AE';

export type SiteBlogEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  content: string;
};

export type ServiceDetail = {
  title: string;
  copy: string;
  points: string[];
  categoryKey: string;
  image: string;
};

export type HeroSlide = {
  heading: string;
  body: string;
};

export type TeamMember = {
  name: string;
  displayName?: string;
  role: string;
  image: string;
  linkedin?: string;
};

export type Testimonial = {
  quote: string;
  clientType: string;
  city: string;
  scope: string;
};

export type SiteOffice = {
  city: string;
  phone?: string;
};

export type SiteSocialLink = {
  label: 'Instagram' | 'LinkedIn';
  href: string;
};

export const siteImages = {
  hero: 'https://wanderlustarchitects.com/wp-content/uploads/2023/05/Enscape_2023-08-24-17-53-19-scaled.jpg',
  about: 'https://wanderlustarchitects.com/wp-content/uploads/2023/06/about-bg-02.jpg',
  dubaiHero:
    'https://wanderlustarchitects.com/wp-content/uploads/2026/01/wanderlust-architects-dubai-office-ibn-battuta-interior-design-studio.jpg',
  featuredProjects: [
    'https://wanderlustarchitects.com/wp-content/uploads/2024/11/PENTHOUSE-JAIPUR9.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/THE-BAAGH-BANQUET-E-10042025--scaled.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2023/11/ANJUNA-VILLA-GOA9.jpg',
  ],
  projectGalleryFallbacks: [
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/luxury-resort-architect-rajasthan.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2024/10/MUM-03-1.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/03/PROPEX-01.jpg',
  ],
  serviceHero: {
    Architecture:
      'https://wanderlustarchitects.com/wp-content/uploads/2023/05/Enscape_2023-08-24-18-12-48-scaled-e1719249272569.jpg',
    Interior:
      'https://wanderlustarchitects.com/wp-content/uploads/2023/05/JBO_MD-CABIN-01.jpg',
    Landscape:
      'https://wanderlustarchitects.com/wp-content/uploads/2023/05/LANDSCAPE-01.jpg',
    'Building Documentation':
      'https://wanderlustarchitects.com/wp-content/uploads/2024/11/PROPOSED-PARKING-PLAN-LINE-DRAWING-copy-scaled.webp',
    '3D Visualization':
      'https://wanderlustarchitects.com/wp-content/uploads/2023/05/Enscape_2023-08-24-17-53-19-scaled.jpg',
  },
  team: [
    'https://wanderlustarchitects.com/wp-content/uploads/2025/03/raisar-bw.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/03/shreyeshi.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/03/uday-scaled.jpg',
  ],
  clientLogos: [
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/ananta-logo-1-1.png',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/hoztel-1.png',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/jaiwik-1.png',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/samsung-1.png',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/tea-tradition-1.png',
  ],
  blogThumbs: [
    'https://wanderlustarchitects.com/wp-content/uploads/2026/01/best-architects-in-jaipur-ai-featured-image.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2026/01/best-heritage-hotel-architects-in-rajasthan-wanderlust-architects.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2026/01/wanderlust-architects-dubai-office-ibn-battuta-interior-design-studio.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/03/PROPEX-01.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2025/04/luxury-resort-architect-rajasthan.jpg',
    'https://wanderlustarchitects.com/wp-content/uploads/2024/10/MUM-03-1.jpg',
  ],
};

export const heroSlides: HeroSlide[] = [
  {
    heading: 'Luxury Spatial Outcomes,\nDocumented for Real-World Execution.',
    body:
      'From high-value residences and hospitality spaces in Jaipur, Rajasthan to premium workplace and lifestyle projects in Dubai, UAE, our team delivers luxury architecture and interior design with measurable execution clarity.',
  },
  {
    heading: 'Design, Fit-Out, and Delivery\nEngineered for Speed, Clarity, and Control.',
    body:
      'We align concept, approvals, detailing, and site coordination into one clear execution path so investors, founders, and homeowners can move faster with confidence.',
  },
  {
    heading: 'From Brief to Handover,\nEvery Decision Built for Site Precision.',
    body:
      'Wanderlust Architects combines design intelligence with delivery control through structured timelines, BOQ-ready documentation, and a single-point team that protects intent, speed, and quality.',
  },
];

export const homeChips = [
  'Clear timelines + milestone tracking',
  'BOQ-ready drawings and execution detailing',
  'Single-point ownership from concept to handover',
];

export const processSteps = [
  { title: 'Brief', description: 'Program goals, budget band, and timeline alignment.' },
  { title: 'Concept', description: 'Design direction with spatial strategy and material intent.' },
  { title: 'Design', description: 'Refined layouts, technical coordination, and approval readiness.' },
  { title: 'Documentation', description: 'Construction drawings, BOQs, and issue-controlled revisions.' },
  { title: 'Execution', description: 'Site coordination, milestone checks, and quality validation.' },
  { title: 'Handover', description: 'Final snag closure and delivery sign-off with clarity.' },
];

export const journalTopics = ['Architecture', 'Interior', 'Hospitality', 'Residential', 'Commercial'];

export const services: ServiceDetail[] = [
  {
    title: 'Architecture',
    copy: 'Context-aware architecture concepts translated into approval-ready and execution-ready packages.',
    points: ['Site response and massing', 'Design development drawings', 'Material and facade specifications'],
    categoryKey: 'commercial',
    image: siteImages.serviceHero.Architecture,
  },
  {
    title: 'Interior',
    copy: 'Spatial planning and detailing calibrated for premium living, hospitality, and workplace outcomes.',
    points: ['Layout and circulation planning', 'Joinery and finish detailing', 'Lighting and styling packages'],
    categoryKey: 'residential',
    image: siteImages.serviceHero.Interior,
  },
  {
    title: 'Landscape',
    copy: 'Climate-aware outdoor systems that align aesthetic experience with long-term maintainability.',
    points: ['Planting and zoning strategy', 'Hardscape technical detailing', 'Outdoor use programming'],
    categoryKey: 'hospitality',
    image: siteImages.serviceHero.Landscape,
  },
  {
    title: 'Building Documentation',
    copy: 'Comprehensive drawing sets built to reduce ambiguity and improve on-site decision speed.',
    points: ['Construction drawings', 'Schedules and specifications', 'Revision and issue control'],
    categoryKey: 'heritage',
    image: siteImages.serviceHero['Building Documentation'],
  },
  {
    title: '3D Visualization',
    copy: 'Render-ready visualization packages that help clients, consultants, and stakeholders see decisions clearly before execution begins.',
    points: ['Photoreal perspectives', 'Material and lighting studies', 'Presentation visuals for approvals'],
    categoryKey: 'residential',
    image: siteImages.serviceHero['3D Visualization'],
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Riddhiraj Raisar',
    displayName: 'Riddhiraj R.',
    role: 'Principal Architect',
    image: siteImages.team[0],
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Riddhiraj%20Raisar%20WA%20BIM%20Studio',
  },
  {
    name: 'Shreyeshi Sharma',
    displayName: 'Shreyeshi S.',
    role: 'Director - Interiors',
    image: siteImages.team[1],
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Shreyeshi%20Sharma%20WA%20BIM%20Studio',
  },
  { name: 'Uday Singh', role: 'Lead - Project Delivery', image: siteImages.team[2] },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Wanderlust translated our vision into a timeless built form. Every detail, from planning to finish, felt intentional and premium.',
    clientType: 'Private Residence Client',
    city: 'Jaipur',
    scope: 'Architecture + Interior Delivery',
  },
  {
    quote:
      'Their architectural clarity and documentation rigor made execution seamless. The final outcome exceeded our expectations.',
    clientType: 'Hospitality Developer',
    city: 'Ranthambore',
    scope: 'Architecture + Documentation',
  },
  {
    quote:
      'The team balanced elegance with operational intelligence. A rare design studio that understands both emotion and precision.',
    clientType: 'Corporate Workplace Client',
    city: 'Dubai',
    scope: 'Office Fit-Out + Project Delivery',
  },
];

export const siteOffices: SiteOffice[] = [
  { city: 'India', phone: '+91 98284 85111' },
  { city: 'UAE', phone: '+971 54 505 2126' },
];

export const siteSocialLinks: SiteSocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/wanderlust.architects/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wanderlustarchitect/' },
];

export const dubaiServices = [
  {
    title: 'Architecture Design',
    copy: 'Context-aware architecture concepts tailored for premium residential and hospitality projects in Dubai.',
  },
  {
    title: 'Interior Design',
    copy: 'Editorial interior environments with strong material direction, lighting hierarchy, and user experience clarity.',
  },
  {
    title: 'Office Fit-Outs',
    copy: 'Fast-track workplace fit-outs with brand-led planning, execution-ready detailing, and contractor coordination.',
  },
  {
    title: 'Project Delivery',
    copy: 'Single-point project delivery support from design approvals to site execution and handover management.',
  },
];

export const dubaiSectors = ['Villas', 'Hospitality', 'Corporate Offices', 'Retail', 'Mixed Use'];

export const blogEntries: SiteBlogEntry[] = [
  {
    slug: 'luxury-interiors-for-modern-jaipur-homes',
    title: 'Luxury Interiors for Modern Jaipur Homes',
    date: '2026-02-11',
    tags: ['Interiors', 'Residential'],
    coverImage: siteImages.blogThumbs[0],
    content:
      '## Why Homeowners Prioritize Clarity Over Complexity\nPremium residential clients are asking for spaces that feel timeless, easy to maintain, and deeply personal. Design decisions now focus on proportion, texture, and performance.\n\n### Planning Priorities\n- Strong zoning between private and social areas\n- Layered lighting designed from day one\n- Material palettes that age gracefully\n\n## Execution Matters as Much as Design\nWhen detailing and documentation are aligned early, on-site changes reduce significantly and the final result remains faithful to concept intent.',
  },
  {
    slug: 'office-fitout-decisions-that-save-time',
    title: 'Office Fit-Out Decisions That Save Time',
    date: '2026-01-18',
    tags: ['Office Fit-Outs', 'Delivery'],
    coverImage: siteImages.blogThumbs[1],
    content:
      '## Fast Delivery Starts with Smart Scope Definition\nOffice fit-out programs often lose time in unclear approvals. A structured brief and phased sign-off flow protects quality while accelerating execution.\n\n### What High-Performing Teams Do\n- Freeze planning assumptions early\n- Coordinate MEP and interiors in one model\n- Lock procurement-critical materials in advance\n\n## Outcome\nTeams that front-load decisions experience fewer site disruptions and achieve smoother handovers.',
  },
  {
    slug: 'architecture-concepts-that-convert-client-trust',
    title: 'Architecture Concepts That Convert Client Trust',
    date: '2025-12-03',
    tags: ['Architecture', 'Strategy'],
    coverImage: siteImages.blogThumbs[2],
    content:
      '## First Impressions Are Designed, Not Accidental\nThe most effective architecture concepts establish trust quickly through coherent massing, disciplined material logic, and strong entry sequence.\n\n### Core Elements\n- Clear arrival and orientation cues\n- Human-scale transitions within large volumes\n- Balanced expression and buildability\n\n## From Pitch to Build\nDesign narratives are strongest when they are supported by documentation that can be executed without interpretation gaps.',
  },
  {
    slug: 'documentation-systems-for-smoother-project-delivery',
    title: 'Documentation Systems for Smoother Project Delivery',
    date: '2025-11-07',
    tags: ['Building Documentation', 'Project Delivery'],
    coverImage: siteImages.blogThumbs[3],
    content:
      '## Documentation Is a Delivery Accelerator\nFor high-value projects, coordinated drawing systems are essential for reducing site uncertainty and procurement mismatch.\n\n### Recommended Documentation Stack\n- Plan/detail package with revision discipline\n- Specification schedules tied to drawing references\n- Issue logs for consultant and vendor coordination\n\n## Practical Impact\nTeams gain speed and confidence when every build decision can be traced to an approved document source.',
  },
  {
    slug: 'landscape-planning-for-premium-heat-resilient-sites',
    title: 'Landscape Planning for Premium Heat-Resilient Sites',
    date: '2025-10-02',
    tags: ['Landscape', 'Climate'],
    coverImage: siteImages.blogThumbs[4],
    content:
      '## Cooling Strategy Should Be Embedded in Design\nLuxury landscapes in warm climates perform best when shade structure, planting hierarchy, and hardscape reflectance are coordinated from the start.\n\n### Key Moves\n- Place canopy where thermal stress is highest\n- Use textured hardscape for glare control\n- Sequence open and shaded zones for comfort\n\n## Long-Term Value\nWell-planned landscapes improve usability, reduce maintenance intensity, and support the architectural identity of the property.',
  },
  {
    slug: 'design-to-delivery-how-clients-avoid-costly-rework',
    title: 'Design to Delivery: How Clients Avoid Costly Rework',
    date: '2025-08-20',
    tags: ['Project Delivery', 'Execution'],
    coverImage: siteImages.blogThumbs[5],
    content:
      '## Rework Is Usually a Coordination Problem\nMost costly site corrections are avoidable when design, procurement, and construction timelines are aligned before mobilization.\n\n### Practical Controls\n- Milestone-based approvals with measurable outputs\n- Material mockups before mass application\n- Regular interface checks between trades\n\n## Reliable Outcomes\nClients who treat delivery as a design discipline achieve stronger quality control and clearer budget predictability.',
  },
];

export function getRegionFromPathname(pathname: string): SiteRegion {
  if (pathname.startsWith('/dubai')) {
    return 'AE';
  }

  if (pathname.startsWith('/india')) {
    return 'IN';
  }

  return readPersistedRegion() === 'dubai' ? 'AE' : 'IN';
}

function normalizePhone(raw: string) {
  return raw.replace(/[^\d+]/g, '');
}

function toWhatsAppLink(raw: string) {
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  return `https://wa.me/${raw.replace(/[^\d]/g, '')}`;
}

export function getContactByRegion(region: SiteRegion) {
  const defaultIndiaPhone = '+919828485111';
  const defaultAEPhone = '+971545052126';
  const phone = region === 'AE' ? defaultAEPhone : defaultIndiaPhone;

  return {
    phone: normalizePhone(phone),
    email: 'studio@wanderlustarchitects.com',
    whatsapp: toWhatsAppLink(phone),
  };
}

export function getProofBarCopy(region: SiteRegion) {
  if (region === 'AE') {
    return 'Built for Dubai, UAE timelines with luxury design intent, technical clarity, and delivery discipline.';
  }

  return 'Trusted for Jaipur and Rajasthan execution with drawing precision, on-site alignment, and milestone accountability.';
}

export function getBlogs() {
  return [...blogEntries].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}

export function getBlogBySlug(slug: string) {
  return getBlogs().find((entry) => entry.slug === slug);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 200))} min read`;
}

export function getFeaturedProjects() {
  return projects.slice(0, 3);
}

export function getAllProjects() {
  return projects;
}

export function getProjectPreviewGroups(active: ProjectFilter) {
  const scoped = active === 'All' ? projects : projects.filter((item) => item.category === active);
  const items = scoped.slice(0, 6).map((item) => ({
    id: item.slug,
    title: item.title,
    category: item.category,
    image: item.image,
    href: `/projects/${item.slug}`,
  }));

  if (items.length >= 6) {
    return items;
  }

  const fillerPool = projects.map((item) => ({
    id: item.slug,
    title: item.title,
    category: item.category,
    image: item.image,
    href: `/projects/${item.slug}`,
  }));

  const filled = [...items];
  let index = 0;

  while (filled.length < 6 && fillerPool.length > 0) {
    const candidate = fillerPool[index % fillerPool.length];
    if (!filled.some((item) => item.id === candidate.id)) {
      filled.push(candidate);
    }
    index += 1;
  }

  return filled;
}

export function getProjectFilters() {
  return projectCategories;
}

export function getLatestBlogs() {
  return getBlogs().slice(0, 3);
}

export function getBlogTagMatches(tag: string) {
  const query = tag.trim().toLowerCase();
  if (!query) {
    return getBlogs();
  }

  return getBlogs().filter((blog) => {
    return blog.tags.some((entry) => entry.toLowerCase() === query);
  });
}

export function getServiceByTitle(title: string) {
  return services.find((service) => service.title === title) ?? services[0];
}

export function getLegacyProjectDetailPath(project: ProjectRecord) {
  return `/projects/${project.slug}`;
}
