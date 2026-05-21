import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/site/ui';
import { type ProjectRecord } from '@/lib/projects';

interface ProjectGalleryDetailPanelProps {
  project: ProjectRecord;
  onClose?: () => void;
  onOpenCaseStudy: (project: ProjectRecord) => void;
}

export function ProjectGalleryDetailPanel({ project, onClose, onOpenCaseStudy }: ProjectGalleryDetailPanelProps) {
  const metadata = [
    { label: 'Category', value: project.category },
    { label: 'Location', value: project.location },
    { label: 'Area', value: project.area },
    { label: 'Completion', value: `${project.year} · ${project.status}` },
  ];

  return (
    <article
      data-no-canvas-drag='true'
      className='relative overflow-hidden border border-white/12 bg-[linear-gradient(180deg,rgba(243,237,228,0.98)_0%,rgba(232,225,213,0.96)_100%)] text-[#17120e] shadow-[0_34px_90px_-50px_rgba(0,0,0,0.68)]'
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.48),transparent_32%),linear-gradient(90deg,rgba(17,17,17,0.03)_1px,transparent_1px),linear-gradient(rgba(17,17,17,0.025)_1px,transparent_1px)] bg-[length:auto,88px_88px,88px_88px]' />

      <div className='relative grid lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)]'>
        <div className='relative min-h-[18rem] overflow-hidden border-b border-black/10 lg:min-h-[24rem] lg:border-b-0 lg:border-r'>
          <img src={project.image} alt={project.title} className='h-full w-full object-cover' loading='lazy' />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,4,0.04)_0%,rgba(8,6,4,0.52)_100%)]' />
          <div className='absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/74 sm:px-6'>
            <span>{project.projectType}</span>
            <span>{project.studio}</span>
          </div>
        </div>

        <div className='grid content-between gap-8 p-5 sm:p-6 lg:p-8'>
          <div className='grid gap-6'>
            <div className='flex items-start justify-between gap-4'>
              <div className='grid gap-3'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-[#71685d]'>Selected project</p>
                <h3 className='max-w-[13ch] text-[clamp(2.2rem,4vw,4rem)] leading-[0.88] text-[#17120e]'>{project.title}</h3>
              </div>

              {onClose ? (
                <button
                  type='button'
                  onClick={onClose}
                  data-no-canvas-drag='true'
                  className='inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white/56 text-[#17120e] transition hover:border-black/24 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20'
                  aria-label={`Close details for ${project.title}`}
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <p className='max-w-[38rem] text-sm leading-8 text-[#4f473d] sm:text-base'>{project.description}</p>

            <dl className='grid gap-px overflow-hidden border border-black/10 bg-black/5 sm:grid-cols-2'>
              {metadata.map((item) => (
                <div key={item.label} className='grid gap-2 bg-white/70 px-4 py-4 sm:px-5'>
                  <dt className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7b7165]'>{item.label}</dt>
                  <dd className='text-sm leading-7 text-[#181411]'>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className='grid gap-3 border border-black/10 bg-white/44 p-4 text-sm leading-7 text-[#4f473d]'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7b7165]'>Case study preview</p>
              <p>{project.sections[0]?.paragraphs[0] ?? project.summary}</p>
            </div>
          </div>

          <div className='flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between'>
            <div className='grid gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7b7165]'>
              <span>{project.location}</span>
              <span>{project.area}</span>
            </div>

            <Button type='button' onClick={() => onOpenCaseStudy(project)} className='w-full justify-center sm:w-auto' data-no-canvas-drag='true'>
              <span>View Full Case Study</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
