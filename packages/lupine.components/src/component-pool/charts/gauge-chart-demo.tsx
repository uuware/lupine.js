import { GaugeChart } from './gauge-chart';
import { DemoStory } from '../../demo/demo-types';
import { HtmlVar } from '../../components/html-var';

export const gaugeChartDemo: DemoStory<any> = {
  id: 'gaugeChartDemo',
  text: 'Gauge Chart',
  args: {
    title: 'Server Load',
    width: '100%',
    height: '350px',
    value: 65,
  },
  argTypes: {
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    value: { control: 'number' },
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

    // Reactive value for a live demo
    const liveValue = new HtmlVar('');
    let currentValue = 40;

    const updateGauge = () => {
      currentValue = Math.min(100, Math.max(0, currentValue + (Math.random() * 20 - 10)));
      liveValue.value = (
        <GaugeChart
          title='CPU Usage'
          height='300px'
          value={Math.round(currentValue)}
          color='#e74c3c'
          valueFormatter={(v) => v + '%'}
        />
      );
    };

    updateGauge(); // initial
    setInterval(updateGauge, 2000);

    return (
      <div css={css}>
        <section class='demo-section'>
          <div class='section-title'>Interactive Control</div>
          <div class='chart-box'>
            <GaugeChart
              title={args.title}
              width={args.width}
              height={args.height}
              value={args.value}
              valueFormatter={(v) => v + '%'}
            />
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Live Updates</div>
          <div class='chart-box'>{liveValue.node}</div>
        </section>
      </div>
    );
  },
  code: `import { GaugeChart } from 'lupine.components/component-pool/charts';

<GaugeChart 
  title="Memory" 
  value={82}
  min={0}
  max={100}
/>
`,
};
