import { DonutChart } from './donut-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const sampleData: ChartData = {
  labels: ['Direct', 'Social', 'Organic', 'Referral'],
  series: [
    {
      name: 'Traffic',
      data: [30, 40, 20, 10],
    },
  ],
};

export const donutChartDemo: DemoStory<any> = {
  id: 'donutChartDemo',
  text: 'Donut Chart',
  args: {
    title: 'Traffic Sources',
    width: '100%',
    height: '300px',
    showLegend: true,
    innerRadiusRatio: 0.6,
  },
  argTypes: {
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    showLegend: { control: 'boolean' },
    innerRadiusRatio: { control: 'number' },
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
      '.grid': {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
      },
    };

    return (
      <div css={css}>
        <section class='demo-section'>
          <div class='section-title'>Interactive Control</div>
          <div class='chart-box'>
            <DonutChart
              data={sampleData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
              innerRadiusRatio={args.innerRadiusRatio}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Variations</div>
          <div class='grid'>
            <div class='chart-box'>
              <DonutChart data={sampleData} title='Thin Ring' innerRadiusRatio={0.8} height='200px' />
            </div>
            <div class='chart-box'>
              <DonutChart data={sampleData} title='Thick Ring' innerRadiusRatio={0.3} height='200px' />
            </div>
          </div>
        </section>
      </div>
    );
  },
  code: `import { DonutChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['A', 'B', 'C'],
  series: [{ name: 'Values', data: [10, 20, 30] }]
};

<DonutChart 
  data={data} 
  title="My Chart" 
  innerRadiusRatio={0.6} 
/>
`,
};
