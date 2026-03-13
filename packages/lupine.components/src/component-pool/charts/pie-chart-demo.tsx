import { PieChart } from './pie-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const sampleData: ChartData = {
  labels: ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries'],
  series: [
    {
      name: 'Sales',
      data: [44, 55, 13, 43, 22],
    },
  ],
};

const emptyData: ChartData = {
  labels: [],
  series: [{ name: 'Empty', data: [] }],
};

export const pieChartDemo: DemoStory<any> = {
  id: 'pieChartDemo',
  text: 'Pie Chart',
  args: {
    title: 'Fruit Sales',
    width: '100%',
    height: '300px',
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
            <PieChart
              data={sampleData}
              title={args.title}
              width={args.width}
              height={args.height}
              showLegend={args.showLegend}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Variations</div>
          <div class='grid'>
            <div class='chart-box'>
              <PieChart data={sampleData} title='No Legend' showLegend={false} height='200px' />
            </div>
            <div class='chart-box'>
              <PieChart data={emptyData} title='Empty Data' height='200px' />
            </div>
            <div class='chart-box'>
              <PieChart
                data={{
                  labels: ['Single Value'],
                  series: [{ name: 'Lone', data: [100] }],
                }}
                title='100% Value'
                height='200px'
              />
            </div>
            <div class='chart-box'>
              <PieChart
                data={{
                  labels: ['A', 'B'],
                  series: [{ name: 'Half', data: [50, 50] }],
                }}
                title='50/50 Split'
                height='200px'
              />
            </div>
          </div>
        </section>
      </div>
    );
  },
  code: `import { PieChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['Apples', 'Bananas', 'Cherries'],
  series: [{ name: 'Sales', data: [44, 55, 13] }]
};

<PieChart 
  data={data} 
  title="Fruit Sales" 
  width="100%" 
  height="300px" 
  showLegend={true} 
/>
`,
};
