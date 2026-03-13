import { AreaChart } from './area-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const multiSeriesData: ChartData = {
  labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
  series: [
    { name: 'Cloud Revenue', data: [15, 22, 35, 48, 65, 80] },
    { name: 'Hardware Sales', data: [50, 48, 45, 40, 35, 30] },
  ],
};

export const areaChartDemo: DemoStory<any> = {
  id: 'areaChartDemo',
  text: 'Area Chart',
  args: {
    title: 'Company Revenues',
    width: '100%',
    height: '350px',
    showLegend: true,
    curved: true,
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
            <AreaChart
              data={multiSeriesData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
              curved={args.curved}
              yAxisFormatter={(val) => '$' + val + 'M'}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Straight Area Chart</div>
          <div class='chart-box'>
            <AreaChart
              data={multiSeriesData}
              title='Straight Area Comparison'
              height='300px'
              showLegend={true}
              curved={false}
              yAxisFormatter={(val) => '$' + val + 'M'}
            />
          </div>
        </section>
      </div>
    );
  },
  code: `import { AreaChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['Q1', 'Q2', 'Q3'],
  series: [{ name: 'Growth', data: [10, 25, 45] }]
};

<AreaChart 
  data={data} 
  title="Growth Area" 
  curved={true} 
/>
`,
};
