export function applyMosaic(
  imageData: ImageData,
  targetWidth: number,
  targetHeight: number,
  x0: number, // canvas X
  y0: number, // canvas Y
  cx: number, // pointer X
  cy: number, // pointer Y
  mosaicSize: number
): ImageData {
  // Brush radius for mosaic
  const r = 20;

  // Precompute bounds
  const minX = Math.max(0, Math.floor(x0 - r));
  const maxX = Math.min(targetWidth - 1, Math.ceil(x0 + r));
  const minY = Math.max(0, Math.floor(y0 - r));
  const maxY = Math.min(targetHeight - 1, Math.ceil(y0 + r));

  const newImgData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  const data = newImgData.data;

  // Optimization: only process blocks overlapping the brush bounding box
  const startBX = Math.floor(minX / mosaicSize) * mosaicSize;
  const startBY = Math.floor(minY / mosaicSize) * mosaicSize;

  for (let by = startBY; by <= maxY; by += mosaicSize) {
    for (let bx = startBX; bx <= maxX; bx += mosaicSize) {
      // Check if block center is within brush radius
      const blockCX = bx + mosaicSize / 2;
      const blockCY = by + mosaicSize / 2;
      // Interpolate center from last point to current point
      const distToLine =
        Math.abs((cy - y0) * blockCX - (cx - x0) * blockCY + cx * y0 - cy * x0) / Math.hypot(cy - y0, cx - x0) ||
        Math.hypot(blockCX - x0, blockCY - y0);

      // We approximate the brush radius check (adding some margin for the block size)
      if (distToLine < r + mosaicSize) {
        // Compute average color of the block
        let rSum = 0,
          gSum = 0,
          bSum = 0,
          aSum = 0,
          count = 0;
        const eY = Math.min(by + mosaicSize, targetHeight);
        const eX = Math.min(bx + mosaicSize, targetWidth);

        for (let y = by; y < eY; y++) {
          for (let x = bx; x < eX; x++) {
            const i = (y * targetWidth + x) * 4;
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            aSum += data[i + 3];
            count++;
          }
        }
        if (count > 0) {
          const rAvg = rSum / count;
          const gAvg = gSum / count;
          const bAvg = bSum / count;
          const aAvg = aSum / count;
          // Apply average color back to block
          for (let y = by; y < eY; y++) {
            for (let x = bx; x < eX; x++) {
              // Only apply if point is actually within brush circle from line segment
              // Simple segment check:
              const dot = (x - x0) * (cx - x0) + (y - y0) * (cy - y0);
              const lenSq = (cx - x0) ** 2 + (cy - y0) ** 2;
              let param = -1;
              if (lenSq !== 0) param = dot / lenSq;
              let px, py;
              if (param < 0) {
                px = x0;
                py = y0;
              } else if (param > 1) {
                px = cx;
                py = cy;
              } else {
                px = x0 + param * (cx - x0);
                py = y0 + param * (cy - y0);
              }
              if (Math.hypot(x - px, y - py) < r) {
                const i = (y * targetWidth + x) * 4;
                data[i] = rAvg;
                data[i + 1] = gAvg;
                data[i + 2] = bAvg;
                data[i + 3] = aAvg;
              }
            }
          }
        }
      }
    }
  }

  return newImgData;
}

export function flipImageDataVertical(imgData: ImageData): ImageData {
  const { width, height, data } = imgData;
  const newData = new Uint8ClampedArray(data.length);
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    const srcOffset = srcY * width * 4;
    const destOffset = y * width * 4;
    newData.set(data.subarray(srcOffset, srcOffset + width * 4), destOffset);
  }
  return new ImageData(newData, width, height);
}
