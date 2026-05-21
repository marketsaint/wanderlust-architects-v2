import { useEffect } from 'react';
import { ProjectGallerySection } from './project-gallery-section';
import { projects } from '@/lib/projects';

export function ProjectGalleryPage() {
  useEffect(() => {
    document.title = 'Wanderlust Architects | Projects';

    const descriptionContent =
      'Explore the Wanderlust Architects project canvas across hospitality, residential, commercial, and heritage case studies.';

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute('content', descriptionContent);
  }, []);

  return <ProjectGallerySection projects={projects} />;
}
