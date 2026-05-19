export type ProjectCategory = 'Hospitality' | 'Residential' | 'Commercial' | 'Heritage';
export type ProjectFilter = 'All' | ProjectCategory;

export interface ProjectSection {
  title: string;
  paragraphs: string[];
}

export interface ProjectRecord {
  id: number;
  slug: string;
  title: string;
  imageName: string;
  category: ProjectCategory;
  projectType: string;
  location: string;
  area: string;
  year: number;
  description: string;
  studio: string;
  image: string;
  summary: string;
  sections: ProjectSection[];
}

const studioName = 'Wanderlust Architects';

const rawProjects = [
  {
    title: 'Plush Banquet Venue Ranthambore',
    imageName: 'Plush Banquet Venue by Wanderlust Architects',
    projectType: 'Hospitality / Banquet Venue',
    location: 'Ranthambore, Rajasthan',
    area: '18,500 sq.ft',
    year: 2024,
    description: 'A banquet venue composed around procession, layered hospitality, and a calm material palette that elevates celebration.',
  },
  {
    title: 'The Baagh Luxury Resort',
    imageName: 'The Luxury Resort Rajasthan By Wanderlust Architects',
    projectType: 'Luxury Resort Architecture',
    location: 'Rajasthan',
    area: '24,000 sq.ft',
    year: 2023,
    description: 'A luxury resort shaped through courtyard planning, landscape softness, and understated Rajasthani warmth.',
  },
  {
    title: 'Luxury Corporate Office',
    imageName: 'The Luxury Office by Wanderlust Architects',
    projectType: 'Corporate Office Interior',
    location: 'Jaipur, Rajasthan',
    area: '6,200 sq.ft',
    year: 2024,
    description: 'A corporate workplace that balances executive polish, spatial clarity, and a restrained hospitality-led interior mood.',
  },
  {
    title: 'Rani Sati Temple Renovation',
    imageName: 'Rani Sati Temple Renovation by Wanderlust Architects',
    projectType: 'Heritage Architecture / Temple Documentation',
    location: 'Rajasthan',
    area: '12,400 sq.ft',
    year: 2022,
    description: 'A careful heritage renewal that respects sacred character while bringing renewed spatial clarity and documentation.',
  },
  {
    title: 'Lohia Residence',
    imageName: 'Lohia Residence by Wanderlust Architects',
    projectType: 'Luxury Residence',
    location: 'Jaipur, Rajasthan',
    area: '4,500 sq.ft',
    year: 2024,
    description: 'A contemporary residence organised around comfort, privacy, and a refined domestic rhythm.',
  },
  {
    title: 'Neo Classical Salon',
    imageName: 'Neo Classiscal Salon by Wanderlust Architects',
    projectType: 'Salon Interior Design',
    location: 'Jaipur, Rajasthan',
    area: '2,400 sq.ft',
    year: 2023,
    description: 'A salon interior with classical cues, softened light, and a composed guest journey.',
  },
  {
    title: 'Luxury Penthouse',
    imageName: 'The Luxury Penthouse by Wanderlust Architects',
    projectType: 'Penthouse Interior Design',
    location: 'Jaipur',
    area: '5,800 sq.ft',
    year: 2024,
    description: 'An elevated penthouse interior crafted for panoramic living, quiet luxury, and fluid entertaining.',
  },
  {
    title: 'Pharmaceutical Corporate Office',
    imageName: 'Luxury Office for Pharmaceutical Company by Wanderlust Architects',
    projectType: 'Corporate Office Interior',
    location: 'India',
    area: '7,200 sq.ft',
    year: 2023,
    description: 'A pharmaceutical office interior designed for precision, professionalism, and calm everyday usability.',
  },
  {
    title: 'Ambrosia Restaurant',
    imageName: 'Ambrosia by Wanderlust Architects',
    projectType: 'Restaurant Interior Design',
    location: 'India',
    area: '3,200 sq.ft',
    year: 2022,
    description: 'A restaurant setting that blends atmospheric dining with a warm, tactile spatial character.',
  },
  {
    title: 'Anjuna Villa',
    imageName: 'Anjuna Villa by Wanderlust Architects',
    projectType: 'Luxury Villa Architecture',
    location: 'Goa',
    area: '6,800 sq.ft',
    year: 2024,
    description: 'A Goa villa that pairs open leisure living with coastal light, privacy, and understated resort sensibility.',
  },
  {
    title: 'Maharaja Garden',
    imageName: 'Maharaja Garden by Wanderlust Architects',
    projectType: 'Wedding Garden / Hospitality',
    location: 'India',
    area: '15,000 sq.ft',
    year: 2023,
    description: 'A wedding garden planned for ceremonial flow, layered hospitality, and memorable arrival experiences.',
  },
  {
    title: 'Manpura Farmhouse',
    imageName: 'Manpura Farmhouse by Wanderlust Architects',
    projectType: 'Farmhouse Architecture',
    location: 'Rajasthan',
    area: '7,600 sq.ft',
    year: 2024,
    description: 'A farmhouse retreat grounded in openness, landscape connection, and relaxed luxury.',
  },
  {
    title: 'Spacious Outhouse Jaipur',
    imageName: 'Spacious Outhouse in Jaipur by Wanderlust Architects',
    projectType: 'Residential Outhouse Design',
    location: 'Jaipur',
    area: '3,900 sq.ft',
    year: 2023,
    description: 'An outhouse concept with airy living zones, seamless indoor-outdoor movement, and intimate hospitality.',
  },
  {
    title: 'Propex Office',
    imageName: 'A Tiny Luxury Office Propex by Wanderlust Architects',
    projectType: 'Small Office Interior Design',
    location: 'India',
    area: '1,450 sq.ft',
    year: 2022,
    description: 'A compact office fitted with luxury detailing, efficient planning, and a calm executive tone.',
  },
  {
    title: 'Pratima Showroom',
    imageName: 'Pratima Showroom by Wanderlust Architects',
    projectType: 'Retail Showroom Interior',
    location: 'India',
    area: '2,900 sq.ft',
    year: 2023,
    description: 'A retail showroom designed to frame product display through clarity, material restraint, and visual rhythm.',
  },
  {
    title: 'Hoztel Jollygrant',
    imageName: 'Hozetel Jollygrant by Wanderlust Architects',
    projectType: 'Hostel Architecture',
    location: 'Uttarakhand',
    area: '11,600 sq.ft',
    year: 2024,
    description: 'A hostel architecture project that balances social energy, efficient circulation, and a strong sense of place.',
  },
  {
    title: 'Hoztel Jaipur',
    imageName: 'A Backpacker Jaipur Hoztel by Wanderlust Architects',
    projectType: 'Hostel Interior & Architecture',
    location: 'Jaipur',
    area: '8,400 sq.ft',
    year: 2023,
    description: 'A backpacker hostel in Jaipur with community-led interiors, layered experience, and practical comfort.',
  },
  {
    title: 'Outstay in Woods',
    imageName: 'A Outstay in Woods by Wanderlust Architects',
    projectType: 'Eco Retreat Architecture',
    location: 'India',
    area: '5,200 sq.ft',
    year: 2024,
    description: 'An eco retreat composed to feel quiet, immersive, and closely tied to its woodland context.',
  },
  {
    title: 'Serene Cottages',
    imageName: 'Serene Cottages by Wanderlust Architects',
    projectType: 'Resort Cottage Architecture',
    location: 'India',
    area: '9,800 sq.ft',
    year: 2023,
    description: 'A cottage cluster envisioned as a serene hospitality escape with tactile materials and restful scale.',
  },
];

type RawProject = (typeof rawProjects)[number];

function inferCategory(projectType: string): ProjectCategory {
  const type = projectType.toLowerCase();

  if (type.includes('heritage') || type.includes('temple')) {
    return 'Heritage';
  }

  if (
    type.includes('resort') ||
    type.includes('banquet') ||
    type.includes('wedding') ||
    type.includes('hostel') ||
    type.includes('retreat') ||
    type.includes('restaurant') ||
    type.includes('cottage')
  ) {
    return 'Hospitality';
  }

  if (
    type.includes('residence') ||
    type.includes('villa') ||
    type.includes('farmhouse') ||
    type.includes('penthouse') ||
    type.includes('outhouse')
  ) {
    return 'Residential';
  }

  return 'Commercial';
}

function buildImagePath(imageName: string) {
  const folder = encodeURIComponent(imageName);
  const file = encodeURIComponent(`${imageName}.jpg`);
  return `/project-media/${folder}/${file}`;
}

function buildSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getLocationContext(location: string) {
  const normalized = location.toLowerCase();

  if (normalized.includes('goa')) {
    return 'coastal light, humid air, and a slower resort rhythm';
  }

  if (normalized.includes('jaipur')) {
    return 'desert light, heat control, and a strong relationship to shade and stone';
  }

  if (normalized.includes('rajasthan')) {
    return 'sun-heavy days, ceremonial scale, and an expectation of tactile material depth';
  }

  if (normalized.includes('uttarakhand')) {
    return 'a softer landscape setting and a need for social zones that still feel grounded';
  }

  return 'local climate, project pace, and long-term durability';
}

function getProgrammeLens(projectType: string) {
  const type = projectType.toLowerCase();

  if (type.includes('banquet') || type.includes('wedding')) {
    return {
      ambition: 'arrival, celebration, and guest movement',
      planning: 'a procession from arrival to gathering spaces, service support, and event staging',
      mood: 'warmly ceremonial rather than over-decorated',
      material: 'stone, textured plaster, warm metals, and resilient hospitality finishes',
      user: 'guests and hosts',
      delivery: 'event operations, lighting flexibility, and maintenance-readiness',
    };
  }

  if (type.includes('resort') || type.includes('cottages') || type.includes('retreat')) {
    return {
      ambition: 'rest, privacy, and a memorable sense of escape',
      planning: 'shared hospitality amenities with quieter pockets for retreat and landscape immersion',
      mood: 'slow, restorative, and quietly premium',
      material: 'weathered stone, warm timber notes, soft mineral plaster, and low-glare lighting',
      user: 'guests',
      delivery: 'repeat guest comfort, back-of-house coordination, and materials that age gracefully',
    };
  }

  if (type.includes('restaurant') || type.includes('salon') || type.includes('showroom')) {
    return {
      ambition: 'brand presence, memorable experience, and a strong customer journey',
      planning: 'front-facing experience zones supported by efficient back-of-house or staff movement',
      mood: 'composed, tactile, and visually distinct without becoming noisy',
      material: 'durable natural finishes, crafted highlights, and lighting that flatters people and products',
      user: 'visitors and staff',
      delivery: 'high-touch detailing, operational durability, and clear focal moments',
    };
  }

  if (type.includes('office')) {
    return {
      ambition: 'clarity, brand confidence, and daily efficiency',
      planning: 'a careful balance between focused work zones, client-facing areas, and team collaboration',
      mood: 'quietly executive with hospitality-led comfort',
      material: 'muted stone tones, precise joinery, layered lighting, and restrained brand accents',
      user: 'teams and visiting clients',
      delivery: 'MEP coordination, acoustic control, and adaptable workstation planning',
    };
  }

  if (type.includes('temple') || type.includes('heritage')) {
    return {
      ambition: 'continuity, respect, and careful renewal',
      planning: 'documentation, preservation priorities, and visitor movement resolved without disturbing character',
      mood: 'reverent, restrained, and materially honest',
      material: 'repair-first finishes, locally legible surfaces, and interventions that do not compete with the original fabric',
      user: 'visitors, caretakers, and the wider community',
      delivery: 'survey accuracy, phased intervention, and site sensitivity',
    };
  }

  if (type.includes('hostel')) {
    return {
      ambition: 'community, comfort, and efficient repeatable planning',
      planning: 'social commons balanced with private rest zones and operational clarity',
      mood: 'open, energetic, and still grounded in comfort',
      material: 'hardworking finishes, simple textures, and durable joinery with warmth',
      user: 'travellers and operators',
      delivery: 'high-traffic durability, cleaning practicality, and efficient service routing',
    };
  }

  if (type.includes('villa') || type.includes('farmhouse') || type.includes('residence') || type.includes('penthouse') || type.includes('outhouse')) {
    return {
      ambition: 'privacy, ease, and an elevated domestic rhythm',
      planning: 'public entertaining spaces, quieter family zones, and a measured transition between indoors and outdoors',
      mood: 'calm, tactile, and deeply livable',
      material: 'natural stone, timber warmth, soft plaster, and low-contrast luxury finishes',
      user: 'residents and invited guests',
      delivery: 'joinery precision, lighting control, and comfort across everyday use',
    };
  }

  return {
    ambition: 'clarity, atmosphere, and long-term usability',
    planning: 'clear zoning, intuitive movement, and adaptable support spaces',
    mood: 'restrained, tactile, and composed',
    material: 'durable surfaces, soft tonal contrast, and detailing that supports longevity',
    user: 'users and visitors',
    delivery: 'documentation discipline and site-ready coordination',
  };
}

function buildProjectSections(project: RawProject & { category: ProjectCategory }) {
  const lens = getProgrammeLens(project.projectType);
  const context = getLocationContext(project.location);
  const areaBand = `${project.area} of ${project.projectType.toLowerCase()} space`;
  const categoryName = project.category.toLowerCase();

  return [
    {
      title: 'Brief and Setting',
      paragraphs: [
        `${project.title} was developed in ${project.location} as a ${project.projectType.toLowerCase()} brief shaped around ${lens.ambition}. The design direction began with the realities of ${context}, translating the client's ambitions into an architectural language that feels specific to both site and programme.`,
        `At ${areaBand}, the project needed to feel generous without losing control. Wanderlust Architects approached the brief by editing each move down to its essentials so scale, circulation, and atmosphere could work together instead of competing for attention.`,
      ],
    },
    {
      title: 'Spatial Strategy',
      paragraphs: [
        `The planning logic is anchored in ${lens.planning}. Rather than treating the project as a collection of separate rooms, the design reads as a sequence of calibrated transitions, allowing people to understand the space intuitively as they move through it.`,
        `This strategy helps the ${categoryName} programme feel measured and calm. Primary zones are given presence, support spaces remain legible, and visual axes are used to create moments of pause, orientation, and release throughout the experience.`,
      ],
    },
    {
      title: 'Material Language',
      paragraphs: [
        `Materially, the project was imagined as ${lens.mood}. The palette leans on ${lens.material}, creating depth through texture, shadow, and tonal restraint rather than obvious display.`,
        `That restraint matters because it allows the architecture to carry the emotional weight. Surfaces are chosen for the way they receive daylight, endure use, and keep the project feeling composed long after first handover.`,
      ],
    },
    {
      title: 'User Experience',
      paragraphs: [
        `The project is ultimately designed around ${lens.user}. Arrival, orientation, dwell time, and privacy are all considered part of the same user journey, ensuring the space feels intuitive whether it is being experienced for the first time or used every day.`,
        `Attention was also placed on the smaller behavioural cues that shape memory: sightlines, thresholds, pauses before major volumes, and the balance between openness and enclosure. These are the details that make the experience feel intentional instead of generic.`,
      ],
    },
    {
      title: 'Execution and Outcome',
      paragraphs: [
        `From a delivery standpoint, the scheme prioritised ${lens.delivery}. Documentation and detailing were treated as extensions of the design idea so the built result could maintain its original tone without excessive compromise on site.`,
        `The completed project adds to Wanderlust Architects' body of work by showing how ${project.projectType.toLowerCase()} projects can feel expressive, grounded, and highly usable at the same time. It is a study in how calm architecture can still leave a lasting impression.`,
      ],
    },
  ] satisfies ProjectSection[];
}

export const projectCategories: ProjectFilter[] = [
  'All',
  'Hospitality',
  'Residential',
  'Commercial',
  'Heritage',
];

export const projects: ProjectRecord[] = rawProjects.map((project, index) => ({
  id: index + 1,
  slug: buildSlug(project.title),
  title: project.title,
  imageName: project.imageName,
  category: inferCategory(project.projectType),
  projectType: project.projectType,
  location: project.location,
  area: project.area,
  year: project.year,
  description: project.description,
  studio: studioName,
  image: buildImagePath(project.imageName),
  summary: project.description,
  sections: buildProjectSections({ ...project, category: inferCategory(project.projectType) }),
}));

export function getProjectById(id: number) {
  return projects.find((project) => project.id === id);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
