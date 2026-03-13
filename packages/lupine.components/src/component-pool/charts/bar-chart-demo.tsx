import { BarChart } from './bar-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const singleSeriesData: ChartData = {
  labels: ['United States', 'China', 'Japan', 'Germany', 'United Kingdom'],
  series: [
    {
      name: 'GDP (Trillions)',
      data: [25.4, 17.9, 4.2, 4.0, 3.0],
    },
  ],
};

const multiSeriesData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Product A', data: [40, 30, 50, 70] },
    { name: 'Product B', data: [20, 40, 30, 60] },
  ],
};

export const barChartDemo: DemoStory<any> = {
  id: 'barChartDemo',
  text: 'Bar Chart',
  args: {
    title: 'Top Economies',
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
            <BarChart
              data={singleSeriesData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
              xAxisFormatter={(val) => '$' + val + 'T'}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Multi-Series (Grouped Horizontal)</div>
          <div class='chart-box'>
            <BarChart data={multiSeriesData} title='Quarterly Comparison' height='300px' showLegend={true} />
          </div>
        </section>
      </div>
    );
  },
  code: `import { BarChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['US', 'CN', 'JP'],
  series: [{ name: 'GDP', data: [25, 18, 4] }]
};

<BarChart 
  data={data} 
  title="Top Economies" 
  xAxisFormatter={val => '$' + val + 'T'} 
/>
`,
};
