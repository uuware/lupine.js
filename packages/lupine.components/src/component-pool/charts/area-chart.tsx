import { bindGlobalStyle, getGlobalStylesId, HtmlVar } from 'lupine.components';
import { chartCommonCss, getChartColor, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type AreaChartProps = BasicChartProps & {
  yAxisFormatter?: (value: number) => string;
  curved?: boolean;
};

export const AreaChart = (props: AreaChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const showLegend = props.showLegend !== false;
  const series = props.data.series;
  const labels = props.data.labels;

  if (!series || series.length === 0 || labels.length === 0) {
    return <div class='&-container'>No data</div>;
  }

  // Find max value for Y axis scale
  let maxVal = 0;
  series.forEach((s) => {
    s.data.forEach((val) => {
      if (val > maxVal) maxVal = val;
    });
  });

  const tickCount = 5;
  const order = Math.floor(Math.log10(maxVal || 1));
  const magnitude = Math.pow(10, order);
  const niceStep = Math.ceil(maxVal / magnitude / tickCount) * magnitude;
  const niceMax = niceStep * tickCount;

  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => parseFloat((i * niceStep).toPrecision(12)));

  const renderChart = (viewBoxWidth: number, viewBoxHeight: number) => {
    // Layout parameters
    const padding = { top: 20, right: 80, bottom: 40, left: 60 };

    const chartWidth = viewBoxWidth - padding.left - padding.right;
    const chartHeight = viewBoxHeight - padding.top - padding.bottom;

    // Calculate points considering a half step padding on left and right for area/line
    const pointStep = chartWidth / Math.max(1, labels.length);
    const dataLeftPadding = pointStep / 2;

    const formatY = props.yAxisFormatter || ((val) => val.toString());

    // Render Y Axis
    const renderYAxis = () => {
      return yTicks.map((val) => {
        const y = padding.top + chartHeight - (val / niceMax) * chartHeight;
        return (
          <g>
            <line
              x1={padding.left}
              y1={y}
              x2={viewBoxWidth - padding.right}
              y2={y}
              stroke='var(--secondary-border-color)'
              stroke-width='1'
              stroke-dasharray='4 4'
            />
            <text x={padding.left - 15} y={y + 4} fill='var(--primary-color)' fontSize='12' text-anchor='end'>
              {formatY(val)}
            </text>
          </g>
        );
      });
    };

    // Render X Axis
    const renderXAxis = () => {
      return labels.map((label, index) => {
        const x = padding.left + dataLeftPadding + index * pointStep;
        const y = viewBoxHeight - padding.bottom + 25;
        return (
          <text x={x} y={y} fill='var(--primary-color)' fontSize='12' text-anchor='middle'>
            {label}
          </text>
        );
      });
    };

    // Render Areas, Lines & Points
    const renderAreasLinesAndPoints = () => {
      const areas: any[] = [];
      const lines: any[] = [];
      const points: any[] = [];

      // Render area in reverse order so first series is drawn last (on top) if they overlap
      // Note: Better visualization is sometimes stacking, but basic is overlapping
      series
        .slice()
        .reverse()
        .forEach((s, revIndex) => {
          const sIndex = series.length - 1 - revIndex;
          const color = s.color || getChartColor(sIndex);

          const coordinates = s.data.map((val, lIndex) => {
            const x = padding.left + dataLeftPadding + lIndex * pointStep;
            const y = padding.top + chartHeight - (val / niceMax) * chartHeight;
            return { x, y, val, label: labels[lIndex] };
          });

          // Draw Path Base
          let linePath = '';
          if (props.curved && coordinates.length > 2) {
            linePath = `M ${coordinates[0].x} ${coordinates[0].y} `;
            for (let i = 0; i < coordinates.length - 1; i++) {
              const current = coordinates[i];
              const next = coordinates[i + 1];
              const mx = (current.x + next.x) / 2;
              linePath += `C ${mx} ${current.y}, ${mx} ${next.y}, ${next.x} ${next.y} `;
            }
          } else {
            linePath = 'M ' + coordinates.map((c) => `${c.x} ${c.y}`).join(' L ');
          }

          const endX = coordinates[coordinates.length - 1].x;
          const startX = coordinates[0].x;
          const baseY = padding.top + chartHeight;

          const areaPath = `${linePath} L ${endX} ${baseY} L ${startX} ${baseY} Z`;

          areas.push(
            <path
              d={areaPath}
              fill={color}
              opacity='0.3' // Transparency for area
            />
          );

          lines.push(<path d={linePath} fill='none' stroke={color} stroke-width='3' />);

          // Draw interactive points overlay
          coordinates.forEach((c) => {
            const handleMouseEnter = (e: any) => {
              Tooltip.show(
                e,
                <div>
                  <div style={{ fontWeight: 'bold' }}>{c.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '2px' }} />
                    <span>
                      {s.name}: {formatY(c.val)}
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

            points.push(
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

      return { areas, lines, points };
    };

    const { areas, lines, points } = renderAreasLinesAndPoints();

    return (
      <svg
        class='chart-svg'
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio='none'
      >
        {/* Base Axis line */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={viewBoxWidth - padding.right}
          y2={padding.top + chartHeight}
          stroke='var(--secondary-color)'
          stroke-width='2'
        />

        <g class='y-axis'>{renderYAxis()}</g>
        <g class='x-axis'>{renderXAxis()}</g>
        <g class='areas'>{areas}</g>
        <g class='lines'>{lines}</g>
        <g class='points'>{points}</g>
      </svg>
    );
  };

  const chartVar = new HtmlVar(renderChart(1000, 300));

  const ref = {
    globalCssId,
    onLoad: async (el: Element) => {
      const ro = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        if (width > 50 && height > 50) {
          chartVar.value = renderChart(width, height);
        }
      });
      ro.observe(el);
      (el as any)._ro = ro;
    },
    onUnload: async (el: Element) => {
      if ((el as any)._ro) {
        (el as any)._ro.disconnect();
      }
    },
  };

  const styleStr = `width: ${props.width || '100%'}; height: ${props.height || '100%'};`;

  return (
    <div ref={ref} class='&-container' style={styleStr}>
      {props.title && <div class='chart-title'>{props.title}</div>}

      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>{chartVar.node}</div>

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
