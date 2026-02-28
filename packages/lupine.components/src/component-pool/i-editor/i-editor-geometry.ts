import { StickerLayer, TextLayer, ShapeLayer } from './i-editor-types';

export function getStickerHandles(s: StickerLayer, viewScale: number) {
  const cx = s.x + s.w / 2,
    cy = s.y + s.h / 2;
  const rotDist = s.h / 2 + 20 / viewScale;
  return {
    rot: { x: cx + rotDist * Math.sin(s.rotation), y: cy - rotDist * Math.cos(s.rotation) },
    resize: {
      x: cx + (s.w / 2) * Math.cos(s.rotation) - (s.h / 2) * Math.sin(s.rotation),
      y: cy + (s.w / 2) * Math.sin(s.rotation) + (s.h / 2) * Math.cos(s.rotation),
    },
    del: {
      x: cx - (s.w / 2) * Math.cos(s.rotation) + (s.h / 2) * Math.sin(s.rotation),
      y: cy - (s.w / 2) * Math.sin(s.rotation) - (s.h / 2) * Math.cos(s.rotation),
    },
  };
}

export function hitSticker(cv: { x: number; y: number }, s: StickerLayer) {
  const cx = s.x + s.w / 2,
    cy = s.y + s.h / 2;
  const cos = Math.cos(-s.rotation),
    sin = Math.sin(-s.rotation);
  const lx = cos * (cv.x - cx) - sin * (cv.y - cy);
  const ly = sin * (cv.x - cx) + cos * (cv.y - cy);
  return lx >= -s.w / 2 && lx <= s.w / 2 && ly >= -s.h / 2 && ly <= s.h / 2;
}

export function getTextHandles(
  t: TextLayer,
  viewScale: number,
  ctx: CanvasRenderingContext2D,
  textFontFn: (t: TextLayer) => string
) {
  ctx.font = textFontFn(t);
  const m = ctx.measureText(t.text);
  const w = m.width;
  const h = t.fontSize;

  const cx = t.x,
    cy = t.y;
  const rotDist = h / 2 + 20 / viewScale;

  return {
    rot: { x: cx + rotDist * Math.sin(t.rotation), y: cy - rotDist * Math.cos(t.rotation) },
    resize: {
      x: cx + (w / 2) * Math.cos(t.rotation) - (h / 2) * Math.sin(t.rotation) + 2 * Math.cos(t.rotation),
      y: cy + (w / 2) * Math.sin(t.rotation) + (h / 2) * Math.cos(t.rotation) + 2 * Math.sin(t.rotation),
    },
    del: {
      x: cx - (w / 2) * Math.cos(t.rotation) + (h / 2) * Math.sin(t.rotation) - 2 * Math.cos(t.rotation),
      y: cy - (w / 2) * Math.sin(t.rotation) - (h / 2) * Math.cos(t.rotation) - 2 * Math.sin(t.rotation),
    },
  };
}

export function hitText(
  cv: { x: number; y: number },
  t: TextLayer,
  ctx: CanvasRenderingContext2D,
  textFontFn: (t: TextLayer) => string
) {
  ctx.font = textFontFn(t);
  const m = ctx.measureText(t.text);
  const w = m.width;
  const h = t.fontSize;
  const cx = t.x,
    cy = t.y;

  const cos = Math.cos(-t.rotation),
    sin = Math.sin(-t.rotation);
  const lx = cos * (cv.x - cx) - sin * (cv.y - cy);
  const ly = sin * (cv.x - cx) + cos * (cv.y - cy);

  // Extend hit area slightly for ease of use
  return lx >= -w / 2 - 4 && lx <= w / 2 + 4 && ly >= -h / 2 - 4 && ly <= h / 2 + 4;
}

export function getShapeBoundingBox(s: ShapeLayer) {
  if (s.type === 'pencil' && s.points && s.points.length > 0) {
    let minX = s.points[0].x,
      maxX = s.points[0].x;
    let minY = s.points[0].y,
      maxY = s.points[0].y;
    for (const p of s.points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY };
  } else if (s.type === 'circle' || s.type === 'star') {
    const radius = Math.hypot(s.w - s.x, s.h - s.y);
    return { cx: s.x, cy: s.y, w: radius * 2, h: radius * 2 };
  } else {
    // x, y is start, w, h is end
    const minX = Math.min(s.x, s.w);
    const maxX = Math.max(s.x, s.w);
    const minY = Math.min(s.y, s.h);
    const maxY = Math.max(s.y, s.h);
    return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY };
  }
}

export function getShapeHandles(s: ShapeLayer, viewScale: number) {
  const { cx, cy, w, h } = getShapeBoundingBox(s);
  const bw = Math.max(w, 20);
  const bh = Math.max(h, 20);

  const rotDist = bh / 2 + 20 / viewScale;
  const rot = s.rotation || 0;
  return {
    rot: { x: cx + rotDist * Math.sin(rot), y: cy - rotDist * Math.cos(rot) },
    resize: {
      x: cx + (bw / 2) * Math.cos(rot) - (bh / 2) * Math.sin(rot),
      y: cy + (bw / 2) * Math.sin(rot) + (bh / 2) * Math.cos(rot),
    },
    del: {
      x: cx - (bw / 2) * Math.cos(rot) + (bh / 2) * Math.sin(rot),
      y: cy - (bw / 2) * Math.sin(rot) - (bh / 2) * Math.cos(rot),
    },
  };
}

export function hitShape(cv: { x: number; y: number }, s: ShapeLayer) {
  const { cx, cy, w, h } = getShapeBoundingBox(s);
  const bw = Math.max(w, 20);
  const bh = Math.max(h, 20);
  const rot = s.rotation || 0;

  const cos = Math.cos(-rot),
    sin = Math.sin(-rot);
  const lx = cos * (cv.x - cx) - sin * (cv.y - cy);
  const ly = sin * (cv.x - cx) + cos * (cv.y - cy);

  const pad = s.strokeWidth / 2 + 6;
  return lx >= -bw / 2 - pad && lx <= bw / 2 + pad && ly >= -bh / 2 - pad && ly <= bh / 2 + pad;
}
