import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';
import { 
  PieChart, 
  DonutChart, 
  ColumnChart, 
  BarChart, 
  LineChart, 
  AreaChart, 
  RadarChart, 
  ScatterChart, 
  GaugeChart 
} from 'lupine.components';

export const BlockChart = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1' : 'none',
    width: p.width || '100%',
    height: p.height || '350px',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node)),
    '.chart-error': {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--error-bg-color, #ffebee)',
      color: 'var(--error-color, #c62828)',
      padding: '20px',
      textAlign: 'center',
      fontSize: '12px',
      border: '1px solid var(--error-border-color, #ef9a9a)',
      borderRadius: '4px'
    }
  };

  let parsedData: any = null;
  let parseError: string | null = null;

  try {
    if (p.chartData) {
      parsedData = JSON.parse(p.chartData);
    }
  } catch (err: any) {
    parseError = 'Invalid JSON Data: ' + err.message;
  }

  const renderChart = () => {
    if (parseError) {
      return <div class="chart-error">{parseError}</div>;
    }

    if (!parsedData) {
      return <div class="chart-error">No data provided.</div>;
    }

    const commonProps = {
      title: p.chartTitle,
      showLegend: p.showLegend !== false,
      width: '100%',
      height: '100%',
    };

    switch (p.chartType) {
      case 'pie':
        return <PieChart data={parsedData} {...commonProps} />;
      case 'donut':
        return <DonutChart data={parsedData} {...commonProps} />;
      case 'column':
        return <ColumnChart data={parsedData} {...commonProps} />;
      case 'bar':
        return <BarChart data={parsedData} {...commonProps} />;
      case 'line':
        return <LineChart data={parsedData} {...commonProps} />;
      case 'area':
        return <AreaChart data={parsedData} {...commonProps} />;
      case 'radar':
        return <RadarChart data={parsedData} {...commonProps} />;
      case 'scatter':
        return <ScatterChart data={parsedData} {...commonProps} />;
      case 'gauge':
        // Gauge chart has different data format
        return (
          <GaugeChart 
            value={parsedData.value ?? 0} 
            min={parsedData.min} 
            max={parsedData.max} 
            color={p.gaugeColor} 
            title={p.chartTitle}
            width="100%"
            height="100%"
          />
        );
      default:
        return <PieChart data={parsedData} {...commonProps} />;
    }
  };

  return (
    <div css={css} class='block-chart' data-design-id={props.node.id}>
      <div style={{ width: '100%', height: '100%', pointerEvents: isPreview ? 'auto' : 'none' }}>
        {renderChart()}
      </div>
    </div>
  );
};
