import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ProjectGalleryCard } from './project-gallery-card';
import { ProjectGalleryDetailPanel } from './project-gallery-detail-panel';
import { projects } from '../../lib/projects';

const GRID_COLUMNS = 5;
const CARD_SIZE = 220;
const FRAME_GAP = 0;
const VIEWPORT_PADDING = 6;
const MAX_ZOOM_COLUMNS = 3;
const PANEL_FALLBACK_HEIGHT = 280;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getOverviewLayout(projectCount: number, width: number, height: number) {
  let best = {
    columns: MAX_ZOOM_COLUMNS,
    cardSize: 120,
  };

  for (let columns = MAX_ZOOM_COLUMNS; columns <= projectCount; columns += 1) {
    const rows = Math.ceil(projectCount / columns);
    const widthSize = (width - FRAME_GAP * (columns - 1)) / columns;
    const heightSize = (height - FRAME_GAP * (rows - 1)) / rows;
    const cardSize = Math.floor(Math.min(widthSize, heightSize));

    if (cardSize > best.cardSize) {
      best = { columns, cardSize };
    }
  }

  return best;
}

export function ProjectGallerySection() {
  const navigate = useNavigate();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);
  const dragMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [availableHeight, setAvailableHeight] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [panelHeight, setPanelHeight] = useState(PANEL_FALLBACK_HEIGHT);
  const [shouldAutoCenter, setShouldAutoCenter] = useState(false);
  const [dragState, setDragState] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const contentWidth = Math.max(0, viewportSize.width - VIEWPORT_PADDING * 2);
  const contentHeightLimit = Math.max(0, viewportSize.height - VIEWPORT_PADDING * 2);
  const overviewLayout = useMemo(() => {
    if (!contentWidth || !contentHeightLimit) {
      return { columns: GRID_COLUMNS, cardSize: CARD_SIZE };
    }

    return getOverviewLayout(projects.length, contentWidth, contentHeightLimit);
  }, [contentHeightLimit, contentWidth]);

  const targetCardSize = useMemo(() => {
    if (!contentWidth) {
      return CARD_SIZE;
    }

    const maxCardSize = (contentWidth - FRAME_GAP * (MAX_ZOOM_COLUMNS - 1)) / MAX_ZOOM_COLUMNS;
    return lerp(overviewLayout.cardSize, maxCardSize, zoomProgress);
  }, [contentWidth, overviewLayout.cardSize, zoomProgress]);

  const derivedColumns = useMemo(() => {
    if (!contentWidth) {
      return GRID_COLUMNS;
    }

    return clamp(Math.floor((contentWidth + FRAME_GAP) / (targetCardSize + FRAME_GAP)), MAX_ZOOM_COLUMNS, projects.length);
  }, [contentWidth, targetCardSize]);

  const columns = derivedColumns;
  const cardSize = useMemo(() => {
    if (!contentWidth || columns <= 0) {
      return CARD_SIZE;
    }

    return Math.floor((contentWidth - FRAME_GAP * (columns - 1)) / columns);
  }, [columns, contentWidth]);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;
  const isManualScrollMode = Boolean(selectedProject);
  const zoomPercent = Math.round((cardSize / Math.max(overviewLayout.cardSize, 1)) * 100);

  const selectedIndex = useMemo(() => {
    return selectedProjectId ? projects.findIndex((project) => project.id === selectedProjectId) : -1;
  }, [selectedProjectId]);

  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / columns) : -1;
  const totalColumns = Math.min(columns, projects.length);
  const baseRows = Math.ceil(projects.length / columns);
  const contentWidthTotal = totalColumns * cardSize + Math.max(0, totalColumns - 1) * FRAME_GAP;
  const contentHeight = baseRows * cardSize + Math.max(0, baseRows - 1) * FRAME_GAP + (selectedProject ? panelHeight + FRAME_GAP : 0);
  const maxPanX = Math.max(0, contentWidthTotal - contentWidth);
  const maxPanY = Math.max(0, contentHeight - contentHeightLimit);
  const isCanvasPannable = maxPanX > 0 || maxPanY > 0;
  const overviewBaseOffsetY = !selectedProject && contentHeight < contentHeightLimit ? -Math.max(0, (contentHeightLimit - contentHeight) / 2) : 0;
  const canvasItems = useMemo(() => {
    const items: Array<{ kind: 'project'; projectId: number } | { kind: 'panel'; projectId: number }> = [];

    projects.forEach((project, index) => {
      items.push({ kind: 'project', projectId: project.id });

      const currentRow = Math.floor(index / columns);
      const isRowEnd = index === projects.length - 1 || (index + 1) % columns === 0;
      const shouldInsertPanel = selectedProject && currentRow === selectedRow && isRowEnd;

      if (shouldInsertPanel) {
        items.push({ kind: 'panel', projectId: project.id });
      }
    });

    return items;
  }, [columns, selectedProject, selectedRow]);

  const clampOffsetX = (nextOffsetX: number) => clamp(nextOffsetX, -maxPanX, 0);
  const clampOffsetY = (nextOffsetY: number) => clamp(nextOffsetY, -maxPanY, 0);
  const getAutoPanOffsets = (clientX: number, clientY: number) => {
    if (!viewportRef.current) {
      return { x: 0, y: 0 };
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const normalizedX = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
    const normalizedY = clamp((clientY - rect.top) / Math.max(rect.height, 1), 0, 1);

    return {
      x: clampOffsetX(-maxPanX * normalizedX),
      y: clampOffsetY(-maxPanY * normalizedY),
    };
  };

  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height) {
      return;
    }

    if (!selectedProjectId) {
      setOffsetX(0);
      setOffsetY(0);
    } else {
      setOffsetX(0);
      setOffsetY(0);
    }
  }, [contentHeightLimit, maxPanX, maxPanY, selectedProjectId, viewportSize.height, viewportSize.width]);

  useEffect(() => {
    if (!selectedProject || !detailPanelRef.current) {
      return;
    }

    const updateHeight = () => {
      if (detailPanelRef.current) {
        setPanelHeight(detailPanelRef.current.offsetHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(detailPanelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [selectedProject]);

  useEffect(() => {
    const updateSizes = () => {
      setAvailableHeight(window.innerHeight);

      if (viewportRef.current) {
        setViewportSize({
          width: viewportRef.current.clientWidth,
          height: viewportRef.current.clientHeight,
        });
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    updateSizes();

    window.addEventListener('resize', updateSizes);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  useEffect(() => {
    if (!selectedProjectId || !detailPanelRef.current) {
      return;
    }

    const rowTop = selectedRow * (cardSize + FRAME_GAP);
    viewportRef.current?.scrollTo({
      top: Math.max(0, rowTop - VIEWPORT_PADDING),
      behavior: 'smooth',
    });

    if (shouldAutoCenter) {
      setShouldAutoCenter(false);
    }
  }, [cardSize, panelHeight, selectedProjectId, selectedRow, shouldAutoCenter]);

  const resetOverview = () => {
    setSelectedProjectId(null);
    setZoomProgress(0);
    setOffsetX(0);
    setOffsetY(0);
    setShouldAutoCenter(false);
    viewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }

      if (event.key === 'Escape') {
        resetOverview();
        return;
      }

      const panStep = Math.max(96, Math.round(cardSize * 0.45));
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardSize, maxPanX, maxPanY]);

  const handleSelectProject = (projectId: number) => {
    if (selectedProjectId === projectId) {
      resetOverview();
      return;
    }

    setSelectedProjectId(projectId);
    setShouldAutoCenter(true);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (selectedProjectId) {
      return;
    }

    event.preventDefault();
    setZoomProgress((current) => clamp(current - event.deltaY * 0.0014, 0, 1));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('[data-no-canvas-drag="true"], a, input, textarea, select')) {
      return;
    }

    if (!isCanvasPannable) {
      return;
    }

    if (contentHeight <= contentHeightLimit + 1) {
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
    if (event.pointerType === 'mouse' && isCanvasPannable && !selectedProjectId) {
      const nextOffsets = getAutoPanOffsets(event.clientX, event.clientY);
      setOffsetX(nextOffsets.x);
      setOffsetY(nextOffsets.y);
      return;
    }

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragMovedRef.current = true;
    }

    setOffsetX(clampOffsetX(dragState.originX + deltaX));
    setOffsetY(clampOffsetY(dragState.originY + deltaY));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      if (dragMovedRef.current) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }

      dragMovedRef.current = false;
      setDragState(null);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section
      className='relative overflow-hidden bg-white'
      style={{ height: availableHeight ? `${availableHeight}px` : '100svh' }}
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-60'
        style={{
          backgroundImage: `
            linear-gradient(rgba(222, 222, 222, 0.62) 1px, transparent 1px),
            linear-gradient(90deg, rgba(222, 222, 222, 0.62) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),transparent_36%),linear-gradient(180deg,#ffffff_0%,#ffffff_100%)]' />

      <div className='relative flex h-full flex-col'>
        <div
          ref={viewportRef}
          className={isManualScrollMode ? 'relative h-full overflow-y-auto overflow-x-hidden bg-white' : 'relative h-full overflow-hidden bg-white'}
          onClickCapture={handleClickCapture}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: isManualScrollMode ? 'pan-y' : 'none', cursor: !selectedProjectId && isCanvasPannable ? (dragState ? 'grabbing' : 'move') : 'default' }}
        >
          <motion.div
            className={isManualScrollMode ? 'relative px-2 py-2 sm:px-2.5 sm:py-2.5 lg:px-3 lg:py-3' : 'absolute inset-x-0 top-0 px-2 py-2 sm:px-2.5 sm:py-2.5 lg:px-3 lg:py-3'}
            animate={isManualScrollMode ? { x: 0, y: 0 } : { x: offsetX, y: offsetY + overviewBaseOffsetY }}
            transition={{ type: 'spring', stiffness: dragState ? 500 : 240, damping: dragState ? 44 : 30, mass: 0.45 }}
          >
            <LayoutGroup id='wanderlust-project-canvas'>
              <div
                className='grid'
                style={{
                  gridTemplateColumns: `repeat(${columns}, ${cardSize}px)`,
                  gap: `${FRAME_GAP}px`,
                  width: 'max-content',
                  marginInline: contentWidthTotal < contentWidth ? 'auto' : undefined,
                }}
              >
                {canvasItems.map((item) => {
                  if (item.kind === 'panel' && selectedProject) {
                    return (
                      <motion.div
                        key={`panel-${item.projectId}`}
                        layout
                        ref={detailPanelRef}
                        className='col-span-full'
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ProjectGalleryDetailPanel
                          project={selectedProject}
                          onOpenCaseStudy={(entry) => navigate(`/projects/${entry.slug}`)}
                        />
                      </motion.div>
                    );
                  }

                  const project = projects.find((entry) => entry.id === item.projectId);
                  if (!project) {
                    return null;
                  }

                  return (
                    <motion.div key={project.id} layout className='aspect-square'>
                      <ProjectGalleryCard
                        project={project}
                        isActive={project.id === selectedProjectId}
                        onSelect={() => handleSelectProject(project.id)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </LayoutGroup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
