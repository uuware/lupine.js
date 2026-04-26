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

  const seriesList = props.data.series;
  if (!seriesList || seriesList.length === 0) {
    return <div class='&-container'>No data</div>;
  }

  // SVG viewBox settings
  const viewBoxSize = 200;
  const center = viewBoxSize / 2;
  const maxRadius = (viewBoxSize / 2) * 0.9; // 90% of container to leave margin for stroke/anti-aliasing
  
  const globalInnerRadius = maxRadius * innerRadiusRatio;
  const numSeries = seriesList.length;
  // If only 1 series and innerRadiusRatio is 0, ringThickness is maxRadius.
  // If multiple series, we divide the available space (maxRadius - globalInnerRadius) among them.
  const ringThickness = (maxRadius - globalInnerRadius) / numSeries;

  const allSlices: any[] = [];

  seriesList.forEach((series, seriesIndex) => {
    const values = series.data;
    if (!values || values.length === 0) return;

    const total = values.reduce((sum, val) => sum + val, 0);
    let currentAngle = 0;

    // Outermost ring is series 0
    const outerR = maxRadius - seriesIndex * ringThickness;
    const innerR = outerR - ringThickness;

    values.forEach((val, index) => {
      // Prevent 0 area slices. Also handle case where 1 val is 100%
      const ratio = total > 0 ? val / total : 0;
      const angleDelta = ratio * 360;

      // Fix for 100% slice (SVG arcs don't draw well at exactly 360)
      const isFullCircle = angleDelta === 360;
      const adjustedAngleDelta = isFullCircle ? 359.99 : angleDelta;

      const startAngle = currentAngle;
      const endAngle = currentAngle + adjustedAngleDelta;
      currentAngle += adjustedAngleDelta;

      const pathD = describeArc(center, center, outerR, startAngle, endAngle, innerR);
      const color = getChartColor(index);
      const label = props.data.labels[index] || `Item ${index + 1}`;

      const handleMouseEnter = (e: any) => {
        const percentage = (ratio * 100).toFixed(1) + '%';
        Tooltip.show(
          e,
          <div>
            <div style={{ fontWeight: 'bold' }}>{series.name ? `${series.name} - ` : ''}{label}</div>
            <div>Value: {val}</div>
            <div>Share: {percentage}</div>
          </div>,
          { position: 'auto' }
        );
        e.target.style.opacity = 0.8;
      };

      const handleMouseLeave = (e: any) => {
        Tooltip.hide();
        e.target.style.opacity = 1;
      };

      allSlices.push(
        <path
          class='chart-element'
          d={pathD}
          fill={color}
          stroke='var(--primary-bg-color)' // border color between slices
          stroke-width={isFullCircle ? '0' : '1'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ transition: 'opacity 0.2s' }}
        />
      );
    });
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
          <g>{allSlices}</g>
        </svg>
      </div>

      {showLegend && (
        <div class='chart-legend'>
          {props.data.labels.map((_, i) => (
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
