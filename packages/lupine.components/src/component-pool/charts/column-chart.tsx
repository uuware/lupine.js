import { bindGlobalStyle, getGlobalStylesId, HtmlVar } from 'lupine.components';
import { chartCommonCss, getChartColor, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type ColumnChartProps = BasicChartProps & {
  yAxisFormatter?: (value: number) => string;
};

export const ColumnChart = (props: ColumnChartProps) => {
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

  // Calculate nice Y axis ticks (simple approach)
  const tickCount = 5;
  // const tickStep = maxVal > 0 ? Math.ceil(maxVal / tickCount / 10) * 10 : 10;
  // maxVal = Math.max(maxVal, tickStep * tickCount);

  // Actually, a better simple nice step:
  const order = Math.floor(Math.log10(maxVal || 1));
  const magnitude = Math.pow(10, order);
  const niceStep = Math.ceil(maxVal / magnitude / tickCount) * magnitude;
  const niceMax = niceStep * tickCount;

  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => parseFloat((i * niceStep).toPrecision(12)));

  const formatY = props.yAxisFormatter || ((val) => val.toString());

  const renderChart = (viewBoxWidth: number, viewBoxHeight: number) => {
    // Layout parameters
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    const chartWidth = viewBoxWidth - padding.left - padding.right;
    const chartHeight = viewBoxHeight - padding.top - padding.bottom;

    const groupWidth = chartWidth / labels.length;
    const groupPadding = 0.2 * groupWidth;
    const columnWidth = (groupWidth - groupPadding) / series.length;

    // Render X Axis
    const renderXAxis = () => {
      return labels.map((label, index) => {
        const x = padding.left + index * groupWidth + groupWidth / 2;
        const y = viewBoxHeight - padding.bottom + 25;
        return (
          <text x={x} y={y} fill='var(--primary-color)' fontSize='12' text-anchor='middle'>
            {label}
          </text>
        );
      });
    };

    // Render Y Axis Labels
    const renderYAxis = () => {
      return yTicks.map((val) => {
        const y = padding.top + chartHeight - (val / niceMax) * chartHeight;
        return (
          <text x={padding.left - 10} y={y + 4} fill='var(--primary-color)' fontSize='12' text-anchor='end'>
            {formatY(val)}
          </text>
        );
      });
    };

    // Render Columns
    const renderColumns = () => {
      const columns: any[] = [];

      labels.forEach((label, lIndex) => {
        const groupX = padding.left + lIndex * groupWidth + groupPadding / 2;

        series.forEach((s, sIndex) => {
          const val = s.data[lIndex] || 0;
          const color = s.color || getChartColor(sIndex);

          const colHeight = (val / niceMax) * chartHeight;
          const x = groupX + sIndex * columnWidth;
          const y = padding.top + chartHeight - colHeight;

          const handleMouseEnter = (e: any) => {
            Tooltip.show(
              e,
              <div>
                <div style={{ fontWeight: 'bold' }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '2px' }} />
                  <span>
                    {s.name}: {formatY(val)}
                  </span>
                </div>
              </div>,
              { position: 'auto' }
            );
            e.target.style.opacity = 0.8;
          };

          const handleMouseLeave = (e: any) => {
            Tooltip.hide();
            e.target.style.opacity = 1;
          };

          columns.push(
            <rect
              class='chart-element'
              x={x}
              y={y}
              width={columnWidth - 2} // -2 for slight individual column padding
              height={colHeight}
              fill={color}
              rx='2'
              ry='2'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      });

      return columns;
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
          stroke='var(--secondary-border-color)'
          stroke-width='2'
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={viewBoxHeight - padding.bottom}
          stroke='var(--secondary-border-color)'
          stroke-width='2'
        />

        <g class='y-axis-grid'>
          {yTicks.map((val) => {
            const y = padding.top + chartHeight - (val / niceMax) * chartHeight;
            return (
              <line
                x1={padding.left}
                y1={y}
                x2={viewBoxWidth - padding.right}
                y2={y}
                stroke='var(--secondary-border-color)'
                stroke-width='1'
                stroke-dasharray='4 4'
              />
            );
          })}
        </g>

        <g class='y-axis'>{renderYAxis()}</g>
        <g class='x-axis'>{renderXAxis()}</g>
        <g class='data'>{renderColumns()}</g>
      </svg>
    );
  };

  const chartVar = new HtmlVar(renderChart(1000, 300)); // Default wide ratio initial paint

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
