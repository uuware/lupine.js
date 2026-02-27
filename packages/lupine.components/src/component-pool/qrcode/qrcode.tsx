import { QrCode, QrCodeEcc } from './qrcode-algorithm';

export interface QRCodeImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
  opacity?: number;
}

export interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
  style?: any;
  className?: string;
  title?: string;
  imageSettings?: QRCodeImageSettings;
}

const ERROR_LEVEL_MAP: { [key: string]: QrCodeEcc } = {
  L: QrCodeEcc.LOW,
  M: QrCodeEcc.MEDIUM,
  Q: QrCodeEcc.QUARTILE,
  H: QrCodeEcc.HIGH,
};

// Generates a path string from the sequence of points
function generatePath(modules: boolean[][], margin: number = 0): string {
  const ops: string[] = [];
  modules.forEach((row, y) => {
    let start: number | null = null;
    row.forEach((cell, x) => {
      if (!cell && start !== null) {
        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
        start = null;
        return;
      }
      if (cell && start === null) {
        start = x;
      }
    });
    if (start !== null) {
      ops.push(`M${start + margin} ${y + margin}h${row.length - start}v1H${start + margin}z`);
    }
  });
  return ops.join('');
}

// Escavate a hole in the QR code for a logo
function excavateModules(
  modules: boolean[][],
  excavation: { x: number; y: number; w: number; h: number }
): boolean[][] {
  const newModules = modules.map((row) => row.slice());
  for (let y = excavation.y; y < excavation.y + excavation.h; y++) {
    for (let x = excavation.x; x < excavation.x + excavation.w; x++) {
      if (y >= 0 && y < newModules.length && x >= 0 && x < newModules.length) {
        newModules[y][x] = false;
      }
    }
  }
  return newModules;
}

export function QRCode(props: QRCodeProps) {
  const {
    value,
    size = 128,
    level = 'L',
    bgColor = '#FFFFFF',
    fgColor = '#000000',
    className,
    style,
    title,
    imageSettings,
    ...otherProps
  } = props;

  let qrCode: QrCode;
  try {
    qrCode = QrCode.encodeText(value, ERROR_LEVEL_MAP[level] || QrCodeEcc.LOW);
  } catch (e) {
    if (e instanceof RangeError && e.message === 'Data too long') {
      console.error('QRCode data is too long to be encoded.');
    } else {
      console.error('Failed to generate QR Code:', e);
    }
    return null;
  }

  const cells = qrCode.size;
  const margin = 0;
  const totalCells = cells + margin * 2;
  const viewBox = `0 0 ${totalCells} ${totalCells}`;

  // Extract boolean matrix from the QrCode class instance
  const modules: boolean[][] = [];
  for (let y = 0; y < cells; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < cells; x++) {
      row.push(qrCode.getModule(x, y));
    }
    modules.push(row);
  }

  let finalModules = modules;
  let imageElementStr = '';

  if (imageSettings?.src) {
    const isW = imageSettings.width;
    const isH = imageSettings.height;
    // Compute logical position inside the grid
    const scale = size / totalCells;
    const logicalW = isW / scale;
    const logicalH = isH / scale;

    // X, Y defined relative to the total SVG size
    const destX = imageSettings.x !== undefined ? imageSettings.x : (size - isW) / 2;
    const destY = imageSettings.y !== undefined ? imageSettings.y : (size - isH) / 2;

    const logicalX = destX / scale;
    const logicalY = destY / scale;

    if (imageSettings.excavate) {
      // Carve out a block in the matrix, rounded to nearest cell
      const exX = Math.floor(logicalX);
      const exY = Math.floor(logicalY);
      const exW = Math.ceil(logicalW + (logicalX - exX));
      const exH = Math.ceil(logicalH + (logicalY - exY));

      finalModules = excavateModules(modules, {
        x: exX - margin,
        y: exY - margin,
        w: exW,
        h: exH,
      });
    }

    imageElementStr = `<image href="${
      imageSettings.src
    }" x="${logicalX}" y="${logicalY}" width="${logicalW}" height="${logicalH}" opacity="${
      imageSettings.opacity || 1
    }" preserveAspectRatio="none" />`;
  }

  const pathContent = generatePath(finalModules, margin);

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" role="img" aria-label="${
    title || 'QR Code'
  }">
    <rect x="0" y="0" width="${totalCells}" height="${totalCells}" fill="${bgColor}" />
    <path fill="${fgColor}" d="${pathContent}" shape-rendering="crispEdges" />
    ${imageElementStr}
  </svg>`;

  return (
    <div
      class={['lupine-qrcode', className].filter(Boolean).join(' ')}
      style={{ ...style, width: size, height: size, display: 'inline-block' }}
      dangerouslySetInnerHTML={svgString as any}
      {...otherProps}
    />
  );
}
