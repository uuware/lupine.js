import { LineChart } from './line-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const multiSeriesData: ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    { name: 'USD/EUR', data: [0.92, 0.93, 0.91, 0.94, 0.95, 0.93, 0.92] },
    { name: 'USD/GBP', data: [0.78, 0.79, 0.77, 0.81, 0.82, 0.8, 0.79] },
  ],
};

const exchangeRatesData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [{ name: 'Bitcoin (k$)', data: [42, 45, 52, 60, 58, 62, 65, 61, 68, 72, 70, 75] }],
};

export const lineChartDemo: DemoStory<any> = {
  id: 'lineChartDemo',
  text: 'Line Chart',
  args: {
    title: 'Exchange Rates over Week',
    width: '100%',
    height: '350px',
    showLegend: true,
    curved: false,
  },
  argTypes: {
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    showLegend: { control: 'boolean' },
    curved: { control: 'boolean' },
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
            <LineChart
              data={multiSeriesData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
              curved={args.curved}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Curved Line Chart</div>
          <div class='chart-box'>
            <LineChart
              data={exchangeRatesData}
              title='Crypto Value 2024'
              height='300px'
              showLegend={true}
              curved={true}
            />
          </div>
        </section>
      </div>
    );
  },
  code: `import { LineChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['Mon', 'Tue', 'Wed'],
  series: [{ name: 'Price', data: [100, 105, 102] }]
};

<LineChart 
  data={data} 
  title="Stock Price" 
  curved={true} 
/>
`,
};
