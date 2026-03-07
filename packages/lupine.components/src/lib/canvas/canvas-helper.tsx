import { getShapeBoundingBox, computeTextLayout } from './canvas-geometry';

export const FONT_OPTIONS = [
  { val: 'sans-serif', label: 'Sans' },
  { val: 'serif', label: 'Serif' },
  { val: 'monospace', label: 'Mono' },
  { val: 'cursive', label: 'Cursive' },
  { val: 'system-ui', label: 'System UI' },
  { val: 'Arial', label: 'Arial' },
  { val: 'Helvetica', label: 'Helvetica' },
  { val: '"Times New Roman"', label: 'Times New Roman' },
  { val: 'Georgia', label: 'Georgia' },
  { val: 'Verdana', label: 'Verdana' },
  { val: 'Tahoma', label: 'Tahoma' },
  { val: '"Trebuchet MS"', label: 'Trebuchet MS' },
  { val: 'Impact', label: 'Impact' },
  { val: '"Comic Sans MS"', label: 'Comic Sans MS' },
  { val: '"Courier New"', label: 'Courier New' },
  { val: '"Microsoft YaHei", "微软雅黑"', label: 'YaHei (微软雅黑)' },
  { val: '"SimSun", "宋体"', label: 'SimSun (宋体)' },
  { val: '"SimHei", "黑体"', label: 'SimHei (黑体)' },
  { val: '"KaiTi", "楷体"', label: 'KaiTi (楷体)' },
  { val: '"FangSong", "仿宋"', label: 'FangSong (仿宋)' },
  { val: '"PingFang SC"', label: 'PingFang SC' },
  { val: '"Hiragino Sans GB"', label: 'Hiragino Sans GB' },
  { val: '"Source Han Sans SC"', label: 'Source Han Sans (思源黑体)' },
  { val: '"Source Han Serif SC"', label: 'Source Han Serif (思源宋体)' },
];

export const exportToSystemClipboard = (
  clipboardData: any,
  drawFn: (ctx: CanvasRenderingContext2D, shifted: any) => void
) => {
  if (!clipboardData) return;
  (window as any).__lupine_clipboard = clipboardData;
  try {
    const type = clipboardData.type;
    const data = clipboardData.data;
    const tmp = document.createElement('canvas');
    let w = 100,
      h = 100,
      px = 0,
      py = 0;

    if (type === 'text') {
      const textFontFn = (layer: any) =>
        `${layer.italic ? 'italic ' : ''}${layer.bold ? 'bold ' : ''}${layer.fontSize}px ${layer.fontFamily}`;

      tmp.width = 1;
      tmp.height = 1; // dummy layout ctx
      const dummyCtx = tmp.getContext('2d')!;

      const layout = computeTextLayout(dummyCtx, data as any, textFontFn);
      w = layout.actualW;
      h = layout.actualH;
      px = data.x;
      py = data.y - h / 2;

      let minX = px - 20 - (data.strokeWidth || 0);
      let maxX = px + w + 20 + (data.strokeWidth || 0);
      let minY = py - 20 - (data.strokeWidth || 0);
      let maxY = py + h + 20 + (data.strokeWidth || 0);

      // Extend for tail
      if (data.tailActive && data.tailX !== undefined && data.tailY !== undefined) {
        minX = Math.min(minX, data.tailX - 10);
        maxX = Math.max(maxX, data.tailX + 10);
        minY = Math.min(minY, data.tailY - 10);
        maxY = Math.max(maxY, data.tailY + 10);
      }
      px = minX;
      py = minY;
      w = maxX - minX;
      h = maxY - minY;
    } else if (type === 'sticker') {
      w = data.w;
      h = data.h;
      px = data.x;
      py = data.y;
    } else if (type === 'shape') {
      const shapeData = { ...data };
      if (shapeData.endX !== undefined) shapeData.w = shapeData.endX;
      if (shapeData.endY !== undefined) shapeData.h = shapeData.endY;

      const b = getShapeBoundingBox(shapeData);
      w = b.w;
      h = b.h;
      px = b.cx - w / 2;
      py = b.cy - h / 2;
    }

    // Add 10px padding plus line thickness to avoid clipping strokes
    const pad = (data.thickness || 10) + 10;
    tmp.width = Math.max(1, w + pad * 2);
    tmp.height = Math.max(1, h + pad * 2);
    const ctx = tmp.getContext('2d')!;

    const shifted = { ...data };
    if (shifted.x !== undefined) shifted.x -= px - pad;
    if (shifted.y !== undefined) shifted.y -= py - pad;
    if (shifted.endX !== undefined) {
      shifted.endX -= px - pad;
      if (type === 'shape') shifted.w = shifted.endX;
    } else if (type === 'shape' && shifted.w !== undefined) {
      shifted.w -= px - pad;
      shifted.endX = shifted.w;
    }

    if (shifted.endY !== undefined) {
      shifted.endY -= py - pad;
      if (type === 'shape') shifted.h = shifted.endY;
    } else if (type === 'shape' && shifted.h !== undefined) {
      shifted.h -= py - pad;
      shifted.endY = shifted.h;
    }
    if (shifted.points) {
      shifted.points = shifted.points.map((p: any) => ({ x: p.x - px + pad, y: p.y - py + pad }));
    }
    if (shifted.tailX !== undefined) shifted.tailX -= px - pad;
    if (shifted.tailY !== undefined) shifted.tailY -= py - pad;

    ctx.save();
    drawFn(ctx, shifted);
    ctx.restore();

    tmp.toBlob(async (blob) => {
      if (!blob) return;
      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
        } catch (e) {
          console.warn('Clipboard write fallback failed', e);
        }
      }
    }, 'image/png');
  } catch (err) {
    console.warn('export clipboard err', err);
  }
};

export const enforceBounds = (
  obj: any,
  isShape: boolean,
  vx: number,
  vy: number,
  vw: number,
  vh: number,
  zoomScale: number
) => {
  if (obj.x < vx || obj.x > vx + vw || obj.y < vy || obj.y > vy + vh) {
    const targetX = vx + vw / 2;
    const targetY = vy + vh / 2;
    // Fallback if center is not desirable, could use 50 / zoomScale
    const dx = targetX - obj.x;
    const dy = targetY - obj.y;

    obj.x += dx;
    obj.y += dy;
    if (obj.tailX !== undefined) obj.tailX += dx;
    if (obj.tailY !== undefined) obj.tailY += dy;

    if (isShape) {
      if (obj.w !== undefined) obj.w += dx;
      if (obj.endX !== undefined) obj.endX += dx;
      if (obj.h !== undefined) obj.h += dy;
      if (obj.endY !== undefined) obj.endY += dy;
      if (obj.points) {
        for (const p of obj.points) {
          p.x += dx;
          p.y += dy;
        }
      }
    }
  }
};
