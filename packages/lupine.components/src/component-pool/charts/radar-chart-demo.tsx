import { RadarChart } from './radar-chart';
import { DemoStory } from '../../demo/demo-types';
import { ChartData } from './chart-utils';

const statsData: ChartData = {
  labels: ['Speed', 'Strength', 'Agility', 'Stamina', 'Intelligence', 'Magic'],
  series: [
    { name: 'Warrior', data: [60, 90, 50, 85, 40, 10] },
    { name: 'Mage', data: [40, 20, 40, 50, 95, 100] },
  ],
};

export const radarChartDemo: DemoStory<any> = {
  id: 'radarChartDemo',
  text: 'Radar Chart',
  args: {
    title: 'Character Stats',
    width: '100%',
    height: '400px',
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
            <RadarChart
              data={statsData}
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
  code: `import { RadarChart } from 'lupine.components/component-pool/charts';

const data = {
  labels: ['Design', 'Dev', 'Testing', 'Marketing'],
  series: [{ name: 'Project A', data: [80, 90, 70, 60] }]
};

<RadarChart 
  data={data} 
  title="Project Assessment" 
/>
`,
};
