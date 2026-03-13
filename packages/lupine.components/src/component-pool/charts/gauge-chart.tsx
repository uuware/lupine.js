import { RefProps, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';
import { chartCommonCss, getChartColor, describeArc, polarToCartesian } from './chart-utils';
import { Tooltip } from '../tooltip';

export type GaugeChartProps = {
  title?: string;
  value: number;
  min?: number;
  max?: number;
  color?: string;
  width?: string | number;
  height?: string | number;
  valueFormatter?: (value: number) => string;
};

export const GaugeChart = (props: GaugeChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const min = props.min !== undefined ? props.min : 0;
  const max = props.max !== undefined ? props.max : 100;
  const value = Math.max(min, Math.min(max, props.value)); // Clamp value

  const percentage = (value - min) / (max - min);

  // Gauge is usually a half circle (180 degrees)
  // Let's sweep from -90 to +90 (which maps nicely to polarToCartesian 270 to 90 degrees)
  // Our polarToCartesian treats 0 degree as pointing UP (12 o'clock).
  // So a half circle goes from 270 (-90 left) to 90 (right).
  const startAngle = 270;
  const endAngle = 90;
  const totalAngle = endAngle - startAngle; // 180 (Wait, 90 - 270 = -180. The describeArc helper expects end > start normally for slicing, let's just use 270 to 90 by using 270 and 90 + 360 = 450)

  // Actually, standard polarToCartesian 0 is up, 90 is right, 180 is down, 270 is left
  // So left to right semi-circle is 270 to 450 (which is 90)
  const angleStart = 270;
  const angleEnd = 450;
  const angleRange = angleEnd - angleStart;

  const valueAngle = angleStart + percentage * angleRange;

  const viewBoxSize = 400;
  // Make the radius noticeably smaller than viewBox to prevent clipping
  const radius = (viewBoxSize / 2) * 0.8;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2 + 30; // shift down to fit semi circle, but not too far out of bounds
  const innerRadius = radius * 0.7; // Thick gauge

  const color = props.color || getChartColor(0);
  const formatValue = props.valueFormatter || ((val) => val.toString());

  // Render Background Arc
  const bgPath = describeArc(centerX, centerY, radius, angleStart, angleEnd, innerRadius);

  // Render Value Arc
  // If percentage is 0, we shouldn't render an invalid arc
  const valPath =
    percentage > 0.001
      ? describeArc(centerX, centerY, radius, angleStart, Math.min(valueAngle, angleEnd - 0.001), innerRadius)
      : '';

  const ref: RefProps = {
    globalCssId,
  };

  const styleStr = `width: ${props.width || '100%'}; height: ${props.height || '100%'};`;

  return (
    <div ref={ref} class='&-container' style={styleStr}>
      {props.title && <div class='chart-title'>{props.title}</div>}

      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', minHeight: 0 }}>
        <svg
          class='chart-svg'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          preserveAspectRatio='xMidYMid meet'
        >
          <path d={bgPath} fill='var(--secondary-border-color)' />

          {valPath && <path d={valPath} fill={color} style={{ transition: 'd 0.5s ease-in-out' }} />}

          {/* Needle or simple Text in center */}
          <text
            x={centerX}
            y={centerY - 10}
            fill='var(--primary-color)'
            fontSize='48'
            fontWeight='bold'
            text-anchor='middle'
          >
            {formatValue(props.value)}
          </text>

          <text x={centerX - radius} y={centerY + 20} fill='var(--secondary-color)' fontSize='14' text-anchor='middle'>
            {min}
          </text>

          <text x={centerX + radius} y={centerY + 20} fill='var(--secondary-color)' fontSize='14' text-anchor='middle'>
            {max}
          </text>
        </svg>
      </div>
    </div>
  );
};
