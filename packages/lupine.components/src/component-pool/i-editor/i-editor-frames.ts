export function drawFrame(ctx: CanvasRenderingContext2D, w: number, h: number, style: string, frameColor: string) {
  ctx.save();
  if (style === 'border') {
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, w - 20, h - 20);
  } else if (style === 'polaroid') {
    ctx.fillStyle = frameColor;
    ctx.beginPath();
    // Outer rectangle (the whole frame)
    ctx.rect(0, 0, w, h);
    // Inner hole (where the image is)
    ctx.rect(w * 0.05, h * 0.05, w * 0.9, h * 0.75);
    // Fill using even-odd rule to create the hole
    ctx.fill('evenodd');

    ctx.strokeStyle = '#ddd'; // Inner separator
    ctx.lineWidth = 1;
    ctx.strokeRect(w * 0.05, h * 0.05, w * 0.9, h * 0.75);
  } else if (style === 'vignette') {
    const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.6);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (style === 'film') {
    ctx.fillStyle = '#000'; // Film is usually black
    ctx.fillRect(0, 0, w, h * 0.1);
    ctx.fillRect(0, h * 0.9, w, h);
    ctx.fillStyle = frameColor;
    for (let x = 10; x < w; x += 30) {
      ctx.fillRect(x, h * 0.02, 15, h * 0.06);
      ctx.fillRect(x, h * 0.92, 15, h * 0.06);
    }
  } else if (style === 'double') {
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.strokeRect(20, 20, w - 40, h - 40);
  }
  ctx.restore();
}
