import { ColumnChart } from './column-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const singleSeriesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      name: 'Revenue',
      data: [3500, 4200, 2800, 5100, 6000, 4800],
    },
  ],
};

const multiSeriesData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Product A', data: [400, 300, 500, 700] },
    { name: 'Product B', data: [200, 400, 300, 600] },
    { name: 'Product C', data: [150, 250, 450, 500] },
  ],
};

export const columnChartDemo: DemoStory<any> = {
  id: 'columnChartDemo',
  text: 'Column Chart',
  args: {
    title: 'Monthly Revenue',
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
            <ColumnChart
              data={singleSeriesData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
              yAxisFormatter={(val) => '$' + val}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Multi-Series (Grouped)</div>
          <div class='chart-box'>
            <ColumnChart data={multiSeriesData} title='Quarterly Product Sales' height='300px' showLegend={true} />
          </div>
        </section>
      </div>
    );
  },
  code: `import { ColumnChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  series: [
    { name: 'Apples', data: [10, 20, 15] },
    { name: 'Bananas', data: [5, 25, 30] }
  ]
};

<ColumnChart 
  data={data} 
  title="Sales" 
  yAxisFormatter={val => val + 'k'} 
/>
`,
};
