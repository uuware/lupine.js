import { bindGlobalStyle, getGlobalStylesId, HtmlVar } from 'lupine.components';
import { chartCommonCss, getChartColor, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type ScatterChartProps = BasicChartProps & {
  xAxisFormatter?: (value: number) => string;
  yAxisFormatter?: (value: number) => string;
};

export const ScatterChart = (props: ScatterChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const showLegend = props.showLegend !== false;
  const series = props.data.series;
  // Scatter chart might use numeric labels or categorical labels for X.
  // Assuming equal spacing for labels if provided. If not, data could be `{x, y}` but to keep ChartData simple we use `data: number[]` mapped to `labels` index.
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
    const padding = { top: 20, right: 60, bottom: 40, left: 60 };

    const chartWidth = viewBoxWidth - padding.left - padding.right;
    const chartHeight = viewBoxHeight - padding.top - padding.bottom;

    const pointStep = chartWidth / Math.max(1, labels.length - 1);

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
        const x = padding.left + index * pointStep;
        const y = viewBoxHeight - padding.bottom + 20;
        return (
          <g>
            <line
              x1={x}
              y1={padding.top}
              x2={x}
              y2={viewBoxHeight - padding.bottom}
              stroke='var(--secondary-border-color)'
              stroke-width='1'
              stroke-dasharray='4 4'
            />
            <text
              x={x}
              y={viewBoxHeight - padding.bottom + 25}
              fill='var(--primary-color)'
              fontSize='12'
              text-anchor='middle'
            >
              {label}
            </text>
          </g>
        );
      });
    };

    // Render Points
    const renderPoints = () => {
      const points: any[] = [];

      series.forEach((s, sIndex) => {
        const color = s.color || getChartColor(sIndex);

        const coordinates = s.data.map((val, lIndex) => {
          const x = padding.left + lIndex * pointStep;

          // Add some jitter for scatter if needed? Basic scatter uses exactly the values.
          const y = padding.top + chartHeight - (val / niceMax) * chartHeight;
          return { x, y, val, label: labels[lIndex] };
        });

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
            e.target.setAttribute('r', '8');
          };

          const handleMouseLeave = (e: any) => {
            Tooltip.hide();
            e.target.setAttribute('r', '5');
          };

          points.push(
            <circle
              class='chart-element'
              cx={c.x}
              cy={c.y}
              r='5'
              fill={color}
              opacity='0.7'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
            />
          );
        });
      });

      return points;
    };

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
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={viewBoxHeight - padding.bottom}
          stroke='var(--secondary-color)'
          stroke-width='2'
        />

        <g class='y-axis'>{renderYAxis()}</g>
        <g class='x-axis'>{renderXAxis()}</g>
        <g class='points'>{renderPoints()}</g>
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
