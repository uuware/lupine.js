import { RefProps, VNode, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';
import { chartCommonCss, getChartColor, describeArc, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type PieChartProps = BasicChartProps & {
  innerRadiusRatio?: number; // 0 for Pie, > 0 for Donut (e.g., 0.6)
};

export const PieChart = (props: PieChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const showLegend = props.showLegend !== false;
  const innerRadiusRatio = props.innerRadiusRatio ?? 0;

  // Pie chart relies on the first series only
  const series = props.data.series[0];
  if (!series || !series.data || series.data.length === 0) {
    return <div class='&-container'>No data</div>;
  }

  const values = series.data;
  const total = values.reduce((sum, val) => sum + val, 0);

  // SVG viewBox settings
  const viewBoxSize = 200;
  const center = viewBoxSize / 2;
  const radius = (viewBoxSize / 2) * 0.9; // 90% of container to leave margin for stroke/anti-aliasing
  const innerRadius = radius * innerRadiusRatio;

  let currentAngle = 0;

  const slices = values.map((val, index) => {
    // Prevent 0 area slices. Also handle case where 1 val is 100%
    const ratio = total > 0 ? val / total : 0;
    const angleDelta = ratio * 360;

    // Fix for 100% slice (SVG arcs don't draw well at exactly 360)
    const isFullCircle = angleDelta === 360;
    const adjustedAngleDelta = isFullCircle ? 359.99 : angleDelta;

    const startAngle = currentAngle;
    const endAngle = currentAngle + adjustedAngleDelta;
    currentAngle += adjustedAngleDelta;

    const pathD = describeArc(center, center, radius, startAngle, endAngle, innerRadius);
    const color = getChartColor(index);
    const label = props.data.labels[index] || `Item ${index + 1}`;

    const handleMouseEnter = (e: any) => {
      const percentage = (ratio * 100).toFixed(1) + '%';
      Tooltip.show(
        e,
        <div>
          <div style={{ fontWeight: 'bold' }}>{label}</div>
          <div>Value: {val}</div>
          <div>Share: {percentage}</div>
        </div>,
        { position: 'auto' }
      );
      // Optional: highlight slice
      e.target.style.opacity = 0.8;
    };

    const handleMouseLeave = (e: any) => {
      Tooltip.hide();
      e.target.style.opacity = 1;
    };

    return (
      <path
        class='chart-element'
        d={pathD}
        fill={color}
        stroke='var(--primary-bg-color)' // border color between slices
        stroke-width={isFullCircle ? '0' : '1'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  });

  const ref: RefProps = {
    globalCssId,
  };

  const styleStr = `width: ${props.width || '100%'}; height: ${props.height || '100%'}; min-height: 200px;`;

  return (
    <div ref={ref} class='&-container' style={styleStr}>
      {props.title && <div class='chart-title'>{props.title}</div>}

      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '0',
        }}
      >
        <svg
          class='chart-svg'
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          preserveAspectRatio='xMidYMid meet'
        >
          <g>{slices}</g>
        </svg>
      </div>

      {showLegend && (
        <div class='chart-legend'>
          {values.map((_, i) => (
            <div class='legend-item'>
              <div class='legend-color' style={{ backgroundColor: getChartColor(i) }} />
              <div>{props.data.labels[i] || `Item ${i + 1}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
