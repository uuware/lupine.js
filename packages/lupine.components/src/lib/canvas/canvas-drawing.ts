import { TextLayer, StickerLayer, ShapeLayer } from './canvas-types';
import { computeTextLayout, getShapeBoundingBox } from './canvas-geometry';

export function drawHeartPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  // Scaling 24x24 viewBox coordinates to fit 'size'
  const s = size / 10;
  const x = (v: number) => cx + (v - 12) * s;
  const y = (v: number) => cy + (v - 12) * s;

  ctx.moveTo(x(12), y(21.35));
  ctx.lineTo(x(10.55), y(20.03));
  ctx.bezierCurveTo(x(5.4), y(15.36), x(2), y(12.28), x(2), y(8.5));
  ctx.bezierCurveTo(x(2), y(5.42), x(4.42), y(3), x(7.5), y(3));
  ctx.bezierCurveTo(x(9.24), y(3), x(10.91), y(3.81), x(12), y(5.09));
  ctx.bezierCurveTo(x(13.09), y(3.81), x(14.76), y(3), x(16.5), y(3));
  ctx.bezierCurveTo(x(19.58), y(3), x(22), y(5.42), x(22), y(8.5));
  ctx.bezierCurveTo(x(22), y(12.28), x(18.6), y(15.36), x(13.45), y(20.04));
  ctx.closePath();
}

export function drawDeleteHandle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fillStyle = '#ff4d4d';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  const offset = size * 0.4;
  ctx.moveTo(-offset, -offset);
  ctx.lineTo(offset, offset);
  ctx.moveTo(offset, -offset);
  ctx.lineTo(-offset, offset);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
}

export function buildBubblePath(
  ctx: CanvasRenderingContext2D,
  tw: number,
  th: number,
  lx: number,
  ly: number,
  tailActive: boolean
) {
  ctx.beginPath();
  const pad = 4;
  const hw = tw / 2 + pad;
  const hh = th / 2 + pad;
  if (!tailActive || (lx === 0 && ly === 0)) {
    ctx.rect(-hw, -hh, hw * 2, hh * 2);
    return;
  }
  const theta = Math.atan2(ly, lx);
  const a1 = Math.atan2(hh, hw);
  const a2 = Math.PI - a1;
  const hb = 8 + th * 0.15; // half base width: scales with font size (th is approx font size)

  let edge = '';
  if (theta >= -a1 && theta <= a1) edge = 'right';
  else if (theta > a1 && theta < a2) edge = 'bottom';
  else if (theta >= a2 || theta <= -a2) edge = 'left';
  else edge = 'top';

  ctx.moveTo(-hw, -hh); // top-left
  if (edge === 'top') {
    let cx = lx * (-hh / ly);
    cx = Math.max(-hw + hb, Math.min(hw - hb, cx));
    ctx.lineTo(cx - hb, -hh);
    ctx.lineTo(lx, ly);
    ctx.lineTo(cx + hb, -hh);
  }
  ctx.lineTo(hw, -hh); // top-right

  if (edge === 'right') {
    let cy = ly * (hw / lx);
    cy = Math.max(-hh + hb, Math.min(hh - hb, cy));
    ctx.lineTo(hw, cy - hb);
    ctx.lineTo(lx, ly);
    ctx.lineTo(hw, cy + hb);
  }
  ctx.lineTo(hw, hh); // bottom-right

  if (edge === 'bottom') {
    let cx = lx * (hh / ly);
    cx = Math.max(-hw + hb, Math.min(hw - hb, cx));
    ctx.lineTo(cx + hb, hh);
    ctx.lineTo(lx, ly);
    ctx.lineTo(cx - hb, hh);
  }
  ctx.lineTo(-hw, hh); // bottom-left

  if (edge === 'left') {
    let cy = ly * (-hw / lx);
    cy = Math.max(-hh + hb, Math.min(hh - hb, cy));
    ctx.lineTo(-hw, cy + hb);
    ctx.lineTo(lx, ly);
    ctx.lineTo(-hw, cy - hb);
  }
  ctx.closePath();
}

export function drawShapePath(
  ctx: CanvasRenderingContext2D,
  mode: string,
  arrowType: string,
  color: string,
  sw: number, // start x
  sh: number, // start y
  fx: number, // end x (current pointer x)
  fy: number, // end y (current pointer y)
  bgColor?: string,
  points?: { x: number; y: number }[]
) {
  ctx.beginPath();
  switch (mode) {
    case 'pencil':
      if (points && points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
      break;
    case 'line':
      ctx.moveTo(sw, sh);
      ctx.lineTo(fx, fy);
      ctx.stroke();
      break;
    case 'circle': {
      const radius = Math.hypot(fx - sw, fy - sh);
      ctx.arc(sw, sh, radius, 0, Math.PI * 2);
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fill();
      }
      ctx.stroke();
      break;
    }
    case 'rect': {
      const w = fx - sw;
      const h = fy - sh;
      ctx.rect(sw, sh, w, h);
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fill();
      }
      ctx.stroke();
      break;
    }
    case 'triangle': {
      ctx.moveTo(sw + (fx - sw) / 2, sh);
      ctx.lineTo(fx, fy);
      ctx.lineTo(sw, fy);
      ctx.closePath();
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fill();
      }
      ctx.stroke();
      break;
    }
    case 'star': {
      const spikes = 5;
      const outerRadius = Math.hypot(fx - sw, fy - sh);
      const innerRadius = outerRadius / 2.5;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      for (let i = 0; i < spikes; i++) {
        const xOuter = sw + Math.cos(rot) * outerRadius;
        const yOuter = sh + Math.sin(rot) * outerRadius;
        ctx.lineTo(xOuter, yOuter);
        rot += step;

        const xInner = sw + Math.cos(rot) * innerRadius;
        const yInner = sh + Math.sin(rot) * innerRadius;
        ctx.lineTo(xInner, yInner);
        rot += step;
      }
      ctx.closePath();
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fill();
      }
      ctx.stroke();
      break;
    }
    case 'arrow': {
      const dist = Math.hypot(fx - sw, fy - sh);
      if (dist < 2) return;
      const arrowAngle = Math.atan2(fy - sh, fx - sw);
      const headlen = Math.max(10, dist * 0.2); // length of head in pixels
      const arrowAngleSpan = Math.PI / 6;

      if (arrowType === 'standard' || arrowType === 'double') {
        ctx.moveTo(sw, sh);
        ctx.lineTo(fx, fy);

        // Draw front head
        ctx.moveTo(fx, fy);
        ctx.lineTo(
          fx - headlen * Math.cos(arrowAngle - arrowAngleSpan),
          fy - headlen * Math.sin(arrowAngle - arrowAngleSpan)
        );
        ctx.moveTo(fx, fy);
        ctx.lineTo(
          fx - headlen * Math.cos(arrowAngle + arrowAngleSpan),
          fy - headlen * Math.sin(arrowAngle + arrowAngleSpan)
        );

        // Draw back head
        if (arrowType === 'double') {
          ctx.moveTo(sw, sh);
          ctx.lineTo(
            sw + headlen * Math.cos(arrowAngle - arrowAngleSpan),
            sh + headlen * Math.sin(arrowAngle - arrowAngleSpan)
          );
          ctx.moveTo(sw, sh);
          ctx.lineTo(
            sw + headlen * Math.cos(arrowAngle + arrowAngleSpan),
            sh + headlen * Math.sin(arrowAngle + arrowAngleSpan)
          );
        }
        ctx.stroke();
      } else if (arrowType === 'thick') {
        const shaftWidth = dist * 0.1;
        const headWidth = dist * 0.25;
        const shaftLength = dist - headlen;

        ctx.save();
        ctx.translate(sw, sh);
        ctx.rotate(arrowAngle);

        ctx.moveTo(0, -shaftWidth / 2);
        ctx.lineTo(shaftLength, -shaftWidth / 2);
        ctx.lineTo(shaftLength, -headWidth);
        ctx.lineTo(dist, 0);
        ctx.lineTo(shaftLength, headWidth);
        ctx.lineTo(shaftLength, shaftWidth / 2);
        ctx.lineTo(0, shaftWidth / 2);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else if (arrowType === 'fishtail') {
        const fLen = dist;
        const bodyW = fLen * 0.22;
        const notchX = fLen * 0.15;
        const hLen = Math.max(12, fLen * 0.28);
        const hW = fLen * 0.35;

        ctx.save();
        ctx.translate(sw, sh);
        ctx.rotate(arrowAngle);

        ctx.beginPath();
        ctx.moveTo(0, -bodyW / 2);
        ctx.lineTo(notchX, 0);
        ctx.lineTo(0, bodyW / 2);
        ctx.lineTo(fLen - hLen, bodyW / 2);
        ctx.lineTo(fLen - hLen, hW / 2);
        ctx.lineTo(fLen, 0);
        ctx.lineTo(fLen - hLen, -hW / 2);
        ctx.lineTo(fLen - hLen, -bodyW / 2);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else if (arrowType === 'arc') {
        const cpFactor = 0.35;
        const cpOffset = dist * cpFactor;
        const mx = (sw + fx) / 2;
        const my = (sh + fy) / 2;
        const dx = fx - sw;
        const dy = fy - sh;

        const px = (-dy / dist) * cpOffset;
        const py = (dx / dist) * cpOffset;
        const cpx = mx + px;
        const cpy = my + py;

        ctx.beginPath();
        ctx.moveTo(sw, sh);
        ctx.quadraticCurveTo(cpx, cpy, fx, fy);
        ctx.stroke();

        const tx = fx - cpx;
        const ty = fy - cpy;
        const tangAngle = Math.atan2(ty, tx);
        const hLen = Math.max(10, dist * 0.18);
        const hAngle = Math.PI / 7;

        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(tangAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-hLen * Math.cos(hAngle), -hLen * Math.sin(hAngle));
        ctx.lineTo(-hLen * Math.cos(hAngle), hLen * Math.sin(hAngle));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
  }
}

export function renderTextLayer(
  ctx: CanvasRenderingContext2D,
  t: TextLayer,
  textFontFn: (layer: TextLayer) => string,
  viewScale: number = 1,
  isExporting: boolean = false
) {
  const layout = computeTextLayout(ctx, t, textFontFn);
  const tw = layout.actualW * viewScale;
  const th = layout.actualH * viewScale;
  const cx = t.x * viewScale + tw / 2;
  const cy = t.y * viewScale;

  let lx = 0,
    ly = 0;
  if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
    const dx = t.tailX * viewScale - cx;
    const dy = t.tailY * viewScale - cy;
    const cos = Math.cos(-t.rotation);
    const sin = Math.sin(-t.rotation);
    lx = dx * cos - dy * sin;
    ly = dx * sin + dy * cos;
  }

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t.rotation);

  if (t.shadow && t.shadow.type !== 'none') {
    ctx.shadowBlur = t.shadow.blur;
    ctx.shadowColor = t.shadow.color;
    if (t.shadow.type === 'drop') {
      ctx.shadowOffsetX = t.shadow.offsetX;
      ctx.shadowOffsetY = t.shadow.offsetY;
    } else {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    ctx.globalAlpha = t.shadow.opacity / 100;
  }

  ctx.font = textFontFn({ ...t, fontSize: layout.fs * viewScale } as TextLayer);

  if (t.bgColor || t.strokeWidth !== undefined) {
    buildBubblePath(ctx, tw, th, lx, ly, !!t.tailActive);
    if (t.bgColor) {
      ctx.fillStyle = t.bgColor;
      ctx.fill();
    }
    if (t.strokeColor && t.strokeWidth && t.strokeWidth > 0) {
      ctx.setLineDash([]);
      ctx.strokeStyle = t.strokeColor;
      ctx.lineWidth = t.strokeWidth * viewScale;
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else if (t.strokeWidth === 0 && !isExporting) {
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  ctx.fillStyle = t.color;
  ctx.textBaseline = 'middle';

  const totalTextH = layout.lines.length * layout.lineHeight * viewScale;
  const startY = -th / 2 + (th - totalTextH) / 2 + (layout.lineHeight * viewScale) / 2;
  for (let i = 0; i < layout.lines.length; i++) {
    const txtLine = layout.lines[i];
    const dropY = startY + i * layout.lineHeight * viewScale;
    if (t.strokeColor && t.strokeWidth) {
      ctx.strokeText(txtLine, -tw / 2, dropY);
    }
    ctx.fillText(txtLine, -tw / 2, dropY);
  }
  ctx.restore();
}

export function renderStickerLayer(ctx: CanvasRenderingContext2D, s: StickerLayer, viewScale = 1) {
  const w = s.w * viewScale;
  const h = s.h * viewScale;
  const cx = s.x * viewScale + w / 2;
  const cy = s.y * viewScale + h / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(s.rotation);
  if (s.shadow && s.shadow.type !== 'none') {
    ctx.shadowBlur = s.shadow.blur;
    ctx.shadowColor = s.shadow.color;
    if (s.shadow.type === 'drop') {
      ctx.shadowOffsetX = s.shadow.offsetX;
      ctx.shadowOffsetY = s.shadow.offsetY;
    } else {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  }
  ctx.drawImage(s.img, -w / 2, -h / 2, w, h);
  ctx.restore();
}

export function renderShapeLayer(ctx: CanvasRenderingContext2D, s: ShapeLayer, viewScale = 1) {
  ctx.save();
  if (s.type === 'pencil' && s.points) {
    ctx.beginPath();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.strokeWidth * viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const box = getShapeBoundingBox(s);
    ctx.translate(box.cx * viewScale, box.cy * viewScale);
    ctx.rotate(s.rotation || 0);
    ctx.translate(-box.cx * viewScale, -box.cy * viewScale);

    if (s.shadow && s.shadow.type !== 'none') {
      ctx.shadowBlur = s.shadow.blur;
      ctx.shadowColor = s.shadow.color;
      if (s.shadow.type === 'drop') {
        ctx.shadowOffsetX = s.shadow.offsetX;
        ctx.shadowOffsetY = s.shadow.offsetY;
      } else {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
      ctx.globalAlpha = s.shadow.opacity / 100;
    }

    if (s.points.length > 0) {
      ctx.moveTo(s.points[0].x * viewScale, s.points[0].y * viewScale);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x * viewScale, s.points[i].y * viewScale);
      }
      ctx.stroke();
    }
  } else {
    const cx = s.x * viewScale + (s.w * viewScale - s.x * viewScale) / 2;
    const cy = s.y * viewScale + (s.h * viewScale - s.y * viewScale) / 2;
    ctx.translate(cx, cy);
    ctx.rotate(s.rotation || 0);
    ctx.translate(-cx, -cy);

    if (s.shadow && s.shadow.type !== 'none') {
      ctx.shadowBlur = s.shadow.blur;
      ctx.shadowColor = s.shadow.color;
      if (s.shadow.type === 'drop') {
        ctx.shadowOffsetX = s.shadow.offsetX;
        ctx.shadowOffsetY = s.shadow.offsetY;
      } else {
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
      ctx.globalAlpha = s.shadow.opacity / 100;
    }

    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = s.strokeWidth * viewScale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const scaledPoints = s.points ? s.points.map((p) => ({ x: p.x * viewScale, y: p.y * viewScale })) : undefined;
    drawShapePath(
      ctx,
      s.type,
      s.arrowType || 'standard',
      s.color,
      s.x * viewScale,
      s.y * viewScale,
      s.w * viewScale,
      s.h * viewScale,
      s.bgColor,
      scaledPoints
    );
  }
  ctx.restore();
}
