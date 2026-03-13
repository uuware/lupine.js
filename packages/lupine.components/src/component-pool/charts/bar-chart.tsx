import { bindGlobalStyle, getGlobalStylesId, HtmlVar } from 'lupine.components';
import { chartCommonCss, getChartColor, BasicChartProps } from './chart-utils';
import { Tooltip } from '../tooltip';

export type BarChartProps = BasicChartProps & {
  xAxisFormatter?: (value: number) => string;
};

export const BarChart = (props: BarChartProps) => {
  const globalCssId = getGlobalStylesId(chartCommonCss);
  bindGlobalStyle(globalCssId, chartCommonCss);

  const showLegend = props.showLegend !== false;
  const series = props.data.series;
  const labels = props.data.labels;

  if (!series || series.length === 0 || labels.length === 0) {
    return <div class='&-container'>No data</div>;
  }

  // Find max value for X axis scale
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

  const xTicks = Array.from({ length: tickCount + 1 }, (_, i) => parseFloat((i * niceStep).toPrecision(12)));

  const renderChart = (viewBoxWidth: number, viewBoxHeight: number) => {
    // Layout parameters for Bar Chart (flipped)
    const padding = { top: 20, right: 60, bottom: 40, left: 150 }; // larger left padding for labels

    const chartWidth = viewBoxWidth - padding.left - padding.right;
    const chartHeight = viewBoxHeight - padding.top - padding.bottom;

    const groupHeight = chartHeight / Math.max(1, labels.length);
    // Reduce barPadding a bit, ensure the whole group fits inside the allocated groupHeight height.
    const barPadding = 0.2 * groupHeight;
    const barHeight = (groupHeight - barPadding) / Math.max(1, series.length);

    const formatX = props.xAxisFormatter || ((val) => val.toString());

    // Render X Axis Ticks & Grid (Vertical lines now)
    const renderXAxis = () => {
      return xTicks.map((val) => {
        const x = padding.left + (val / niceMax) * chartWidth;
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
              {formatX(val)}
            </text>
          </g>
        );
      });
    };

    // Render Y Axis Labels (Horizontal text now)
    const renderYAxis = () => {
      return labels.map((label, index) => {
        const y = padding.top + index * groupHeight + groupHeight / 2;
        return (
          <text
            x={padding.left - 15}
            y={y + 4} // slight alignment offset
            fill='var(--primary-color)'
            fontSize='12'
            text-anchor='end'
          >
            {label}
          </text>
        );
      });
    };

    // Render Bars (Horizontal rectangles now)
    const renderBars = () => {
      const bars: any[] = [];

      labels.forEach((label, lIndex) => {
        const groupY = padding.top + lIndex * groupHeight + barPadding / 2;

        series.forEach((s, sIndex) => {
          const val = s.data[lIndex] || 0;
          const color = s.color || getChartColor(sIndex);

          const barWidth = (val / niceMax) * chartWidth;
          const x = padding.left;
          const y = groupY + sIndex * barHeight;

          const handleMouseEnter = (e: any) => {
            Tooltip.show(
              e,
              <div>
                <div style={{ fontWeight: 'bold' }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '2px' }} />
                  <span>
                    {s.name}: {formatX(val)}
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

          bars.push(
            <rect
              class='chart-element'
              x={x}
              y={y}
              width={barWidth}
              height={barHeight - 2} // -2 for slight individual bar padding
              fill={color}
              rx='2'
              ry='2'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      });

      return bars;
    };

    return (
      <svg
        class='chart-svg'
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio='none'
      >
        {/* Base Axis line (Vertical now) */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={viewBoxHeight - padding.bottom}
          stroke='var(--secondary-border-color)'
          stroke-width='2'
        />

        <g class='x-axis'>{renderXAxis()}</g>
        <g class='y-axis'>{renderYAxis()}</g>
        <g class='bars'>{renderBars()}</g>
      </svg>
    );
  };

  const chartVar = new HtmlVar(renderChart(1000, Math.max(300, labels.length * 40 + 60)));

  const ref = {
    globalCssId,
    onLoad: async (el: Element) => {
      const ro = new ResizeObserver((entries) => {
        const { width } = entries[0].contentRect;
        if (width > 50) {
          chartVar.value = renderChart(width, Math.max(300, labels.length * 40 + 60));
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
