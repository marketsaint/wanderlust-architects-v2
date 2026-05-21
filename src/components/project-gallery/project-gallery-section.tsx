import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { MoveLeft, MoveRight, Plus, Search, X } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import { useNavigate } from 'react-router';
import { ProjectGalleryCard } from './project-gallery-card';
import { ProjectGalleryDetailPanel } from './project-gallery-detail-panel';
import {
  PROJECT_GALLERY_FALLBACK_COLUMNS,
  PROJECT_GALLERY_FRAME_GAP,
  PROJECT_GALLERY_PANEL_FALLBACK_HEIGHT,
  PROJECT_GALLERY_VIEWPORT_PADDING,
  clamp,
  getCursorPanOffsets,
  getMaxZoomColumns,
  getOverviewLayout,
  lerp,
} from '@/lib/project-gallery-canvas';
import { type ProjectRecord } from '@/lib/projects';

interface ProjectGallerySectionProps {
  projects: ProjectRecord[];
}

type CanvasItem = { kind: 'project'; projectId: number } | { kind: 'panel'; projectId: number };

export function ProjectGallerySection({ projects }: ProjectGallerySectionProps) {
  const navigate = useNavigate();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);
  const dragMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [zoomProgress, setZoomProgress] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [panelHeight, setPanelHeight] = useState(PROJECT_GALLERY_PANEL_FALLBACK_HEIGHT);
  const [dragState, setDragState] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects]);
  const selectedProject = useMemo(() => (selectedProjectId ? projectById.get(selectedProjectId) ?? null : null), [projectById, selectedProjectId]);
  const contentWidth = Math.max(0, viewportSize.width - PROJECT_GALLERY_VIEWPORT_PADDING * 2);
  const contentHeightLimit = Math.max(0, viewportSize.height - PROJECT_GALLERY_VIEWPORT_PADDING * 2);
  const maxZoomColumns = useMemo(() => Math.min(getMaxZoomColumns(contentWidth), Math.max(projects.length, 1)), [contentWidth, projects.length]);
  const overviewLayout = useMemo(() => {
    if (!contentWidth || !contentHeightLimit || projects.length === 0) {
      return { columns: Math.min(PROJECT_GALLERY_FALLBACK_COLUMNS, Math.max(projects.length, 1)), cardSize: 144 };
    }

    return getOverviewLayout(projects.length, contentWidth, contentHeightLimit);
  }, [contentHeightLimit, contentWidth, projects.length]);

  const targetCardSize = useMemo(() => {
    if (!contentWidth) {
      return overviewLayout.cardSize;
    }

    const maxCardSize = Math.max(
      overviewLayout.cardSize,
      (contentWidth - PROJECT_GALLERY_FRAME_GAP * Math.max(maxZoomColumns - 1, 0)) / Math.max(maxZoomColumns, 1),
    );

    return lerp(overviewLayout.cardSize, maxCardSize, zoomProgress);
  }, [contentWidth, maxZoomColumns, overviewLayout.cardSize, zoomProgress]);

  const columns = useMemo(() => {
    if (!contentWidth || projects.length === 0) {
      return Math.max(1, Math.min(PROJECT_GALLERY_FALLBACK_COLUMNS, projects.length || 1));
    }

    const derived = Math.floor((contentWidth + PROJECT_GALLERY_FRAME_GAP) / (targetCardSize + PROJECT_GALLERY_FRAME_GAP));
    return clamp(derived, Math.max(1, maxZoomColumns), Math.max(1, projects.length));
  }, [contentWidth, maxZoomColumns, projects.length, targetCardSize]);

  const cardSize = useMemo(() => {
    if (!contentWidth || columns <= 0) {
      return overviewLayout.cardSize;
    }

    return Math.floor((contentWidth - PROJECT_GALLERY_FRAME_GAP * Math.max(columns - 1, 0)) / columns);
  }, [columns, contentWidth, overviewLayout.cardSize]);

  const selectedIndex = useMemo(() => (selectedProjectId ? projects.findIndex((project) => project.id === selectedProjectId) : -1), [projects, selectedProjectId]);
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / columns) : -1;
  const totalColumns = Math.min(columns, Math.max(projects.length, 1));
  const totalRows = Math.ceil(Math.max(projects.length, 1) / columns);
  const gridWidth = totalColumns * cardSize + Math.max(totalColumns - 1, 0) * PROJECT_GALLERY_FRAME_GAP;
  const gridHeight = totalRows * cardSize + Math.max(totalRows - 1, 0) * PROJECT_GALLERY_FRAME_GAP;
  const isManualScrollMode = Boolean(selectedProject);
  const maxPanX = Math.max(0, gridWidth - contentWidth);
  const maxPanY = Math.max(0, gridHeight - contentHeightLimit);
  const isCanvasPannable = !isManualScrollMode && (maxPanX > 0 || maxPanY > 0);
  const centeredOffsetY = !isManualScrollMode && gridHeight < contentHeightLimit ? (contentHeightLimit - gridHeight) / 2 : 0;
  const zoomPercent = Math.round((cardSize / Math.max(overviewLayout.cardSize, 1)) * 100);

  const canvasItems = useMemo(() => {
    const items: CanvasItem[] = [];

    projects.forEach((project, index) => {
      items.push({ kind: 'project', projectId: project.id });

      if (!selectedProject) {
        return;
      }

      const currentRow = Math.floor(index / columns);
      const isRowEnd = index === projects.length - 1 || (index + 1) % columns === 0;

      if (currentRow === selectedRow && isRowEnd) {
        items.push({ kind: 'panel', projectId: project.id });
      }
    });

    return items;
  }, [columns, projects, selectedProject, selectedRow]);

  const clampOffsetX = (nextOffsetX: number) => clamp(nextOffsetX, -maxPanX, 0);
  const clampOffsetY = (nextOffsetY: number) => clamp(nextOffsetY, -maxPanY, 0);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    const updateViewportSize = () => {
      setViewportSize({
        width: viewportRef.current?.clientWidth ?? 0,
        height: viewportRef.current?.clientHeight ?? 0,
      });
    };

    const observer = new ResizeObserver(updateViewportSize);
    observer.observe(viewportRef.current);
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!selectedProject || !detailPanelRef.current) {
      return;
    }

    const updatePanelHeight = () => {
      if (detailPanelRef.current) {
        setPanelHeight(detailPanelRef.current.offsetHeight);
      }
    };

    updatePanelHeight();
    const observer = new ResizeObserver(updatePanelHeight);
    observer.observe(detailPanelRef.current);

    return () => observer.disconnect();
  }, [selectedProject]);

  useEffect(() => {
    if (isManualScrollMode) {
      setOffsetX(0);
      setOffsetY(0);
      return;
    }

    setOffsetX((current) => clampOffsetX(current));
    setOffsetY((current) => clampOffsetY(current));
  }, [isManualScrollMode, maxPanX, maxPanY]);

  useEffect(() => {
    if (!selectedProjectId || !viewportRef.current) {
      return;
    }

    const rowTop = selectedRow * (cardSize + PROJECT_GALLERY_FRAME_GAP);

    viewportRef.current.scrollTo({
      top: Math.max(0, rowTop - PROJECT_GALLERY_VIEWPORT_PADDING),
      behavior: 'smooth',
    });
  }, [cardSize, panelHeight, selectedProjectId, selectedRow]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProjectId(null);
        setZoomProgress(0);
        setOffsetX(0);
        setOffsetY(0);
        viewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, button, a, [contenteditable="true"]')) {
        return;
      }

      if (isManualScrollMode) {
        return;
      }

      const panStep = Math.max(72, Math.round(cardSize * 0.42));
      let handled = false;

      if (event.key === 'ArrowUp' && maxPanY > 0) {
        setOffsetY((current) => clampOffsetY(current + panStep));
        handled = true;
      }

      if (event.key === 'ArrowDown' && maxPanY > 0) {
        setOffsetY((current) => clampOffsetY(current - panStep));
        handled = true;
      }

      if (event.key === 'ArrowLeft' && maxPanX > 0) {
        setOffsetX((current) => clampOffsetX(current + panStep));
        handled = true;
      }

      if (event.key === 'ArrowRight' && maxPanX > 0) {
        setOffsetX((current) => clampOffsetX(current - panStep));
        handled = true;
      }

      if (handled) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardSize, isManualScrollMode, maxPanX, maxPanY]);

  if (projects.length === 0) {
    return (
      <section
        className='relative isolate grid place-items-center overflow-hidden bg-[#090908] text-white'
        style={{ height: 'calc(100svh - var(--site-header-height, 0px))' }}
      >
        <div className='grid max-w-xl gap-5 text-center'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-white/54'>Project archive</p>
          <h1 className='text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.9] text-[#f5efe4]'>No projects are available yet.</h1>
        </div>
      </section>
    );
  }

  const resetOverview = () => {
    setSelectedProjectId(null);
    setZoomProgress(0);
    setOffsetX(0);
    setOffsetY(0);
    viewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (projectId: number) => {
    if (selectedProjectId === projectId) {
      resetOverview();
      return;
    }

    setSelectedProjectId(projectId);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (selectedProject) {
      return;
    }

    event.preventDefault();
    setZoomProgress((current) => clamp(current - event.deltaY * 0.00145, 0, 1));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest('[data-no-canvas-drag="true"], a, button, input, textarea, select')) {
      return;
    }

    if (!isCanvasPannable) {
      return;
    }

    dragMovedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsetX,
      originY: offsetY,
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && isCanvasPannable) {
      if (!viewportRef.current) {
        return;
      }

      const nextOffsets = getCursorPanOffsets({
        clientX: event.clientX,
        clientY: event.clientY,
        rect: viewportRef.current.getBoundingClientRect(),
        maxPanX,
        maxPanY,
      });

      setOffsetX(clampOffsetX(nextOffsets.x));
      setOffsetY(clampOffsetY(nextOffsets.y));
      return;
    }

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragMovedRef.current = true;
    }

    setOffsetX(clampOffsetX(dragState.originX + deltaX));
    setOffsetY(clampOffsetY(dragState.originY + deltaY));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId !== event.pointerId) {
      return;
    }

    if (dragMovedRef.current) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragMovedRef.current = false;
    setDragState(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section
      className='relative isolate overflow-hidden bg-[#090908] text-white'
      style={{ height: 'calc(100svh - var(--site-header-height, 0px))' }}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(8,8,7,0.96)_0%,rgba(10,10,9,1)_100%)]' />
      <div
        className='pointer-events-none absolute inset-0 opacity-45'
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />
      <div className='site-grain pointer-events-none absolute inset-0 opacity-45' />

      <div className='pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:px-6'>
        <div className='grid gap-2 border border-white/10 bg-black/26 px-4 py-3 backdrop-blur-xl'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-white/56'>Project archive</p>
          <p className='text-sm text-white/82 sm:text-base'>{projects.length} case studies arranged as one navigable canvas.</p>
        </div>

        <div className='hidden border border-white/10 bg-black/26 px-4 py-3 backdrop-blur-xl sm:grid sm:justify-items-end'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-white/56'>{selectedProject ? 'Selected mode' : 'Canvas zoom'}</p>
          <p className='mt-1 text-sm text-white/82'>{selectedProject ? 'Scroll the panel or press Escape to return.' : `${zoomPercent}% scale`}</p>
        </div>
      </div>

      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6'>
        <div className='flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-black/26 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/58 backdrop-blur-xl'>
          <span>{selectedProject ? `${selectedIndex + 1} / ${projects.length}` : `${totalColumns} columns active`}</span>
          <span className='flex items-center gap-2'>
            {selectedProject ? (
              <>
                <X size={12} />
                <span>escape closes the expanded study</span>
              </>
            ) : (
              <>
                <Search size={12} />
                <span>scroll to zoom, move cursor to pan, click to expand</span>
              </>
            )}
          </span>
          <span className='hidden items-center gap-2 md:inline-flex'>
            <MoveLeft size={12} />
            <MoveRight size={12} />
            <span>arrow keys pan the canvas</span>
          </span>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={isManualScrollMode ? 'relative h-full overflow-y-auto overflow-x-hidden' : 'relative h-full overflow-hidden'}
        onClickCapture={handleClickCapture}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          touchAction: isManualScrollMode ? 'pan-y' : 'none',
          cursor: !selectedProject && isCanvasPannable ? (dragState ? 'grabbing' : 'move') : 'default',
        }}
      >
        <motion.div
          className={isManualScrollMode ? 'relative min-h-full px-[18px] py-[18px]' : 'absolute inset-x-0 top-0 px-[18px] py-[18px]'}
          animate={isManualScrollMode ? { x: 0, y: 0 } : { x: offsetX, y: offsetY + centeredOffsetY }}
          transition={{ type: 'spring', stiffness: dragState ? 520 : 230, damping: dragState ? 46 : 30, mass: 0.48 }}
        >
          <LayoutGroup id='wanderlust-project-gallery'>
            <div
              className='grid'
              style={{
                gridTemplateColumns: `repeat(${columns}, ${cardSize}px)`,
                gap: `${PROJECT_GALLERY_FRAME_GAP}px`,
                width: 'max-content',
                marginInline: gridWidth < contentWidth ? 'auto' : undefined,
              }}
            >
              <AnimatePresence initial={false}>
                {canvasItems.map((item) => {
                  if (item.kind === 'panel' && selectedProject) {
                    return (
                      <motion.div
                        key={`panel-${selectedProject.id}`}
                        ref={detailPanelRef}
                        layout
                        className='col-span-full'
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ProjectGalleryDetailPanel
                          project={selectedProject}
                          onClose={resetOverview}
                          onOpenCaseStudy={(project) => navigate(`/projects/${project.slug}`)}
                        />
                      </motion.div>
                    );
                  }

                  const project = projectById.get(item.projectId);
                  if (!project) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      className='aspect-square'
                      initial={false}
                      animate={{ filter: project.id === selectedProjectId ? 'brightness(1)' : 'brightness(0.98)' }}
                    >
                      <ProjectGalleryCard project={project} isActive={project.id === selectedProjectId} onSelect={() => handleSelectProject(project.id)} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </motion.div>
      </div>

      {!selectedProject ? (
        <div className='pointer-events-none absolute right-4 top-24 z-20 hidden lg:block'>
          <div className='grid gap-3 border border-white/10 bg-black/24 px-4 py-4 backdrop-blur-xl'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.34em] text-white/56'>Interaction</p>
            <div className='grid gap-2 text-sm leading-6 text-white/78'>
              <p className='inline-flex items-center gap-2'>
                <Search size={14} />
                <span>Wheel in for detail, wheel out for overview.</span>
              </p>
              <p className='inline-flex items-center gap-2'>
                <Plus size={14} />
                <span>Open a project inline before committing to the full story.</span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
