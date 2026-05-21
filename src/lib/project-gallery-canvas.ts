export const PROJECT_GALLERY_FALLBACK_COLUMNS = 5;
export const PROJECT_GALLERY_MAX_ZOOM_COLUMNS = 3;
export const PROJECT_GALLERY_FRAME_GAP = 12;
export const PROJECT_GALLERY_VIEWPORT_PADDING = 18;
export const PROJECT_GALLERY_PANEL_FALLBACK_HEIGHT = 320;
export const PROJECT_GALLERY_MOBILE_MAX_ZOOM_COLUMNS = 2;

export interface ProjectGalleryOverviewLayout {
  columns: number;
  cardSize: number;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function getMaxZoomColumns(width: number) {
  return width < 760 ? PROJECT_GALLERY_MOBILE_MAX_ZOOM_COLUMNS : PROJECT_GALLERY_MAX_ZOOM_COLUMNS;
}

export function getOverviewLayout(projectCount: number, width: number, height: number): ProjectGalleryOverviewLayout {
  let best: ProjectGalleryOverviewLayout = {
    columns: Math.min(PROJECT_GALLERY_FALLBACK_COLUMNS, projectCount),
    cardSize: 132,
  };

  for (let columns = PROJECT_GALLERY_MAX_ZOOM_COLUMNS; columns <= projectCount; columns += 1) {
    const rows = Math.ceil(projectCount / columns);
    const widthSize = (width - PROJECT_GALLERY_FRAME_GAP * Math.max(columns - 1, 0)) / columns;
    const heightSize = (height - PROJECT_GALLERY_FRAME_GAP * Math.max(rows - 1, 0)) / rows;
    const cardSize = Math.floor(Math.min(widthSize, heightSize));

    if (cardSize > best.cardSize) {
      best = { columns, cardSize };
    }
  }

  return best;
}

export function getCursorPanOffsets({
  clientX,
  clientY,
  rect,
  maxPanX,
  maxPanY,
}: {
  clientX: number;
  clientY: number;
  rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>;
  maxPanX: number;
  maxPanY: number;
}) {
  const normalizedX = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  const normalizedY = clamp((clientY - rect.top) / Math.max(rect.height, 1), 0, 1);

  return {
    x: -maxPanX * normalizedX,
    y: -maxPanY * normalizedY,
  };
}
