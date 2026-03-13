import { RefProps, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';
import { chartCommonCss, getChartColor, polarToCartesian, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type RadarChartProps = BasicChartProps & {
  valueFormatter?: (value: number) => string;
};

export const RadarChart = (props: RadarChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const showLegend = props.showLegend !== false;
  const series = props.data.series;
  const labels = props.data.labels;

  if (!series || series.length === 0 || labels.length === 0) {
    return <div class='&-container'>No data</div>;
  }

  // Find max value to determine scale
  let maxVal = 0;
  series.forEach((s) => {
    s.data.forEach((val) => {
      if (val > maxVal) maxVal = val;
    });
  });

  const tickCount = 4;
  const order = Math.floor(Math.log10(maxVal || 1));
  const magnitude = Math.pow(10, order);
  const niceStep = Math.ceil(maxVal / magnitude / tickCount) * magnitude;
  const niceMax = niceStep * tickCount;

  // Viewbox and layout
  const viewBoxSize = 400;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const maxRadius = (viewBoxSize / 2) * 0.7; // Leave space for labels

  const angleStep = 360 / labels.length;

  const formatValue = props.valueFormatter || ((val) => val.toString());

  // Render Grid (Polygons)
  const renderGrid = () => {
    const gridElements: any[] = [];

    // Grid webs
    for (let i = 1; i <= tickCount; i++) {
      const radius = (i / tickCount) * maxRadius;

      const points = Array.from({ length: labels.length }, (_, j) => {
        const angle = j * angleStep;
        const pos = polarToCartesian(centerX, centerY, radius, angle);
        return `${pos.x},${pos.y}`;
      }).join(' ');

      gridElements.push(
        <polygon points={points} fill='none' stroke='var(--secondary-border-color)' stroke-width='1' />
      );
    }

    // Grid axes
    for (let j = 0; j < labels.length; j++) {
      const angle = j * angleStep;
      const endPos = polarToCartesian(centerX, centerY, maxRadius, angle);

      gridElements.push(
        <line
          x1={centerX}
          y1={centerY}
          x2={endPos.x}
          y2={endPos.y}
          stroke='var(--secondary-border-color)'
          stroke-width='1'
        />
      );

      // Label
      const labelPos = polarToCartesian(centerX, centerY, maxRadius + 20, angle);

      gridElements.push(
        <text x={labelPos.x} y={labelPos.y + 4} fill='var(--primary-color)' fontSize='12' text-anchor='middle'>
          {labels[j]}
        </text>
      );
    }

    return gridElements;
  };

  // Render Data
  const renderData = () => {
    const dataElements: any[] = [];

    series.forEach((s, sIndex) => {
      const color = s.color || getChartColor(sIndex);

      const coordinates = s.data.map((val, j) => {
        const radius = (val / niceMax) * maxRadius;
        const angle = j * angleStep;
        return { ...polarToCartesian(centerX, centerY, radius, angle), val, label: labels[j] };
      });

      const pointsStr = coordinates.map((c) => `${c.x},${c.y}`).join(' ');

      // Fill area
      dataElements.push(<polygon points={pointsStr} fill={color} fillOpacity='0.3' stroke={color} strokeWidth='2' />);

      // Points and Tooltips
      coordinates.forEach((c) => {
        const handleMouseEnter = (e: any) => {
          Tooltip.show(
            e,
            <div>
              <div style={{ fontWeight: 'bold' }}>{c.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '2px' }} />
                <span>
                  {s.name}: {formatValue(c.val)}
                </span>
              </div>
            </div>,
            { position: 'auto' }
          );
          e.target.setAttribute('r', '6');
        };

        const handleMouseLeave = (e: any) => {
          Tooltip.hide();
          e.target.setAttribute('r', '4');
        };

        dataElements.push(
          <circle
            class='chart-element'
            cx={c.x}
            cy={c.y}
            r='4'
            fill='var(--primary-bg-color)'
            stroke={color}
            stroke-width='2'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'r 0.2s ease' }}
          />
        );
      });
    });

    return dataElements;
  };

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
          <g class='grid'>{renderGrid()}</g>
          <g class='data'>{renderData()}</g>
        </svg>
      </div>

      {showLegend && (
        <div class='chart-legend'>
          {series.map((s, i) => (
            <div class='legend-item'>
              <div class='legend-color' style={{ backgroundColor: s.color || getChartColor(i) }} />
              <div>{s.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
