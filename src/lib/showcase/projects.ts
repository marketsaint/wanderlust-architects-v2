export type ProjectCategory = 'All' | 'Residential' | 'Hospitality' | 'Commercial' | 'Interior' | 'Master Planning';

export type CardSize = 'large' | 'medium' | 'small' | 'tall' | 'wide';

export interface Project {
  id: number;
  title: string;
  location: string;
  category: ProjectCategory;
  image: string;
  size: CardSize;
  year: number;
  area?: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Azure Heights',
    location: 'Los Angeles, CA',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMxNjY2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'large',
    year: 2025,
    area: '8,500 sq ft',
    description: 'A stunning modern masterpiece perched atop the Los Angeles hills, featuring seamless indoor-outdoor living spaces.'
  },
  {
    id: 2,
    title: 'Minimalist Haven',
    location: 'Copenhagen, Denmark',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY29udGVtcG9yYXJ5JTIwaG91c2UlMjBkZXNpZ258ZW58MXx8fHwxNzczMTY2NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'small',
    year: 2024,
    area: '3,200 sq ft'
  },
  {
    id: 3,
    title: 'Luxe Interiors',
    location: 'Dubai, UAE',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1612303544167-5871c2331e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwaW50ZXJpb3IlMjBsdXh1cnl8ZW58MXx8fHwxNzczMTY2NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'small',
    year: 2025,
    area: '4,800 sq ft'
  },
  {
    id: 4,
    title: 'Villa Nocturne',
    location: 'Malibu, CA',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1750271329214-a7dbce880e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzczMDc3NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'medium',
    year: 2024,
    area: '6,400 sq ft'
  },
  {
    id: 5,
    title: 'Contemporary Oasis',
    location: 'Singapore',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1611272267060-82338bad4112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMTY2NjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'tall',
    year: 2025,
    area: '5,200 sq ft'
  },
  {
    id: 6,
    title: 'Penthouse Sky',
    location: 'New York, NY',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1677553512940-f79af72efd1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMxMjg1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'medium',
    year: 2024,
    area: '3,900 sq ft'
  },
  {
    id: 7,
    title: 'Urban Tower',
    location: 'London, UK',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczMTA4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'wide',
    year: 2025,
    area: '45,000 sq ft'
  },
  {
    id: 8,
    title: 'Glass Pavilion',
    location: 'Tokyo, Japan',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1761427248716-38448abeb90c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG91c2UlMjBnbGFzcyUyMGZhY2FkZXxlbnwxfHx8fDE3NzMxNjY2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'medium',
    year: 2024,
    area: '4,100 sq ft'
  },
  {
    id: 9,
    title: 'Sunset Residence',
    location: 'Barcelona, Spain',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1758697899438-d53b94633f34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjByZXNpZGVudGlhbHxlbnwxfHx8fDE3NzMxNTI0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    size: 'large',
    year: 2025,
    area: '7,300 sq ft'
  },
];

export const categories: ProjectCategory[] = ['All', 'Residential', 'Hospitality', 'Commercial', 'Interior', 'Master Planning'];
