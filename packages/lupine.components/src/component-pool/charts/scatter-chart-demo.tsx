import { ScatterChart } from './scatter-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const correlationData: ChartData = {
  labels: ['10', '20', '30', '40', '50', '60', '70', '80'],
  series: [
    { name: 'Group A', data: [12, 19, 25, 42, 55, 61, 75, 82] },
    { name: 'Group B', data: [5, 12, 22, 28, 35, 40, 48, 52] },
  ],
};

export const scatterChartDemo: DemoStory<any> = {
  id: 'scatterChartDemo',
  text: 'Scatter Chart',
  args: {
    title: 'Value Correlation',
    width: '100%',
    height: '350px',
    showLegend: true,
  },
  argTypes: {
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    showLegend: { control: 'boolean' },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      padding: '24px',
      alignItems: 'center',

      '.demo-section': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '800px',
      },
      '.section-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        marginBottom: '16px',
        borderBottom: '2px solid var(--secondary-border-color)',
        width: '100%',
        paddingBottom: '8px',
      },
      '.chart-box': {
        padding: '20px',
        border: '1px solid var(--secondary-border-color)',
        borderRadius: '8px',
        backgroundColor: 'var(--primary-bg-color)',
        width: '100%',
      },
    };

    return (
      <div css={css}>
        <section class='demo-section'>
          <div class='section-title'>Interactive Control</div>
          <div class='chart-box'>
            <ScatterChart
              data={correlationData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
            />
          </div>
        </section>
      </div>
    );
  },
  code: `import { ScatterChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['0', '1', '2'],
  series: [{ name: 'Points', data: [5, 15, 8] }]
};

<ScatterChart 
  data={data} 
  title="Distribution" 
/>
`,
};
