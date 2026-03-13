import { CssProps } from 'lupine.web';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      svg: any;
      g: any;
      path: any;
      rect: any;
      circle: any;
      line: any;
      polygon: any;
      polyline: any;
      text: any;
    }
  }
}

// Common CSS for all charts
export const chartCommonCss: CssProps = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px', // Default min height
  display: 'flex',
  flexDirection: 'column',

  // Tooltip integration (if we want to use the Tooltip class)
  '.chart-svg': {
    width: '100%',
    height: '100%',
    overflow: 'visible',
    display: 'block',
  },

  '.chart-title': {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'var(--primary-color)',
    textAlign: 'center' as const,
  },

  '.chart-legend': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '12px',
    fontSize: '12px',
    color: 'var(--primary-color)',
  },

  '.legend-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',

    '&.disabled': {
      opacity: 0.5,
    },
  },

  '.legend-color': {
    width: '12px',
    height: '12px',
    borderRadius: '2px',
  },

  // Tooltip specific for SVG elements
  '.chart-element': {
    transition: 'opacity 0.2s, stroke-width 0.2s, transform 0.2s',
    cursor: 'pointer',

    '&:hover': {
      // Hover effect is usually implemented via JS to handle other groups, but basic SVG hover is here
      opacity: 0.8,
    },
  },
};

// Default colors for charts (Palette)
export const chartColors = [
  'var(--primary-accent-color)', // usually blue
  '#2ecc71', // green
  '#e74c3c', // red
  '#f1c40f', // yellow
  '#9b59b6', // purple
  '#e67e22', // orange
  '#1abc9c', // teal
  '#34495e', // dark blue
  '#ff9ff3', // pink
  '#00d2d3', // cyan
];

export const getChartColor = (index: number) => {
  return chartColors[index % chartColors.length];
};

export type ChartSeries = {
  name: string;
  data: number[];
  color?: string;
};

export type ChartData = {
  labels: string[];
  series: ChartSeries[];
};

export type BasicChartProps = {
  title?: string;
  data: ChartData;
  height?: string | number;
  width?: string | number;
  showLegend?: boolean;
};

// Helper to polar to cartesian coordinates for arc drawing
export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Helper to create an SVG arc path
export const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number = 0
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  if (innerRadius === 0) {
    // Pie slice
    const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'L', x, y, 'Z'].join(' ');
    return d;
  } else {
    // Donut slice
    const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'L',
      innerEnd.x,
      innerEnd.y,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      'Z',
    ].join(' ');
    return d;
  }
};
