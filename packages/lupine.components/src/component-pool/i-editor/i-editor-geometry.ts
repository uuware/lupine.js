import { StickerLayer, TextLayer, ShapeLayer } from './i-editor-types';

export interface TextLayoutResult {
  fs: number;
  lines: string[];
  actualW: number;
  actualH: number;
  lineHeight: number;
}

export function computeTextLayout(
  ctx: CanvasRenderingContext2D,
  t: TextLayer,
  textFontFn: (t: TextLayer) => string
): TextLayoutResult {
  const reqW = t.w || Infinity;
  const reqH = t.h || Infinity;
  const minFs = 12;
  const maxFs = 500;

  let bestFs = minFs;
  let bestLines: string[] = [];
  let bestTotalH = 0;
  let foundFit = false;

  const wrapFn = (size: number) => {
    ctx.font = textFontFn({ ...t, fontSize: size } as TextLayer);
    const result: string[] = [];
    const paragraphs = t.text.split('\n');
    for (const p of paragraphs) {
      if (!p) {
        result.push('');
        continue;
      }
      let line = '';
      for (let i = 0; i < p.length; i++) {
        const char = p[i];
        const testLine = line + char;
        if (ctx.measureText(testLine).width > reqW && line.length > 0) {
          const lastSpace = line.lastIndexOf(' ');
          if (lastSpace > 0) {
            result.push(line.substring(0, lastSpace));
            line = line.substring(lastSpace + 1) + char;
          } else {
            result.push(line);
            line = char;
          }
        } else {
          line = testLine;
        }
      }
      if (line) result.push(line);
    }
    return result;
  };

  let low = minFs;
  let high = t.w && t.h ? maxFs : t.fontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lines = wrapFn(mid);
    const lh = mid * 1.2;
    const totalH = lines.length * lh;

    ctx.font = textFontFn({ ...t, fontSize: mid } as TextLayer);
    let maxLineWidth = 0;
    for (const l of lines) {
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(l).width);
    }

    if (totalH <= reqH && maxLineWidth <= reqW) {
      bestFs = mid;
      bestLines = lines;
      bestTotalH = totalH;
      foundFit = true;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (!foundFit) {
    bestFs = minFs;
    bestLines = wrapFn(bestFs);
    bestTotalH = bestLines.length * (bestFs * 1.2);
  }

  ctx.font = textFontFn({ ...t, fontSize: bestFs } as TextLayer);
  let maxLineWidth = 0;
  for (const l of bestLines) maxLineWidth = Math.max(maxLineWidth, ctx.measureText(l).width);

  return {
    fs: bestFs,
    lines: bestLines,
    actualW: t.w ? reqW : Math.max(maxLineWidth, 20),
    actualH: t.h ? Math.max(t.h, bestTotalH) : Math.max(bestFs * 1.5, bestTotalH),
    lineHeight: bestFs * 1.2,
  };
}

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
  const layout = computeTextLayout(ctx, t, textFontFn);
  const w = layout.actualW;
  const h = layout.actualH;

  const cx = t.x + w / 2,
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
    tail: t.tailActive && t.tailX !== undefined && t.tailY !== undefined ? { x: t.tailX, y: t.tailY } : undefined,
  };
}

export function hitText(
  cv: { x: number; y: number },
  t: TextLayer,
  ctx: CanvasRenderingContext2D,
  textFontFn: (t: TextLayer) => string
) {
  const layout = computeTextLayout(ctx, t, textFontFn);
  const w = layout.actualW;
  const h = layout.actualH;
  const cx = t.x + w / 2,
    cy = t.y;

  // Extend hit area slightly for ease of use, scaling larger if a bubble stroke is present
  const pad = t.tailActive ? (t.strokeWidth || 0) + 12 : 4;
  if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
    if (Math.hypot(cv.x - t.tailX, cv.y - t.tailY) < pad) return true;

    const l2 = (t.tailX - cx) ** 2 + (t.tailY - cy) ** 2;
    if (l2 > 0) {
      let t_param = ((cv.x - cx) * (t.tailX - cx) + (cv.y - cy) * (t.tailY - cy)) / l2;
      t_param = Math.max(0, Math.min(1, t_param));
      const projX = cx + t_param * (t.tailX - cx);
      const projY = cy + t_param * (t.tailY - cy);
      const distToLine = Math.hypot(cv.x - projX, cv.y - projY);
      // The visual tail is thickest near the box (approx h/2) and thin at the tip
      const allowedDist = pad + (1 - t_param) * (h / 2 + 10);
      if (distToLine < allowedDist) return true;
    }
  }

  // Then check inner bounding box using reverse matrix rotation
  const cos = Math.cos(-t.rotation),
    sin = Math.sin(-t.rotation);
  const lx = cos * (cv.x - cx) - sin * (cv.y - cy);
  const ly = sin * (cv.x - cx) + cos * (cv.y - cy);

  return lx >= -w / 2 - pad && lx <= w / 2 + pad && ly >= -h / 2 - pad && ly <= h / 2 + pad;
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
