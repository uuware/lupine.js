import { DemoStory } from '../../demo/demo-types';
import { Gauge } from './gauge';
import { HtmlVar } from 'lupine.components';

export const gaugeDemo: DemoStory<any> = {
  id: 'gauge-demo',
  text: 'Gauge / Dial Demo',
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    rangeValue: [20, 80],
    disabled: false,
    readonly: false,
    showTicks: true,
    showTickLabels: true,
    showActiveTrack: true,
    activeTrackColor: '#2ecc71',
    tickStep: 10,
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'number', description: 'Single Dial Value' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    showTickLabels: { control: 'boolean' },
    showActiveTrack: { control: 'boolean' },
    activeTrackColor: { control: 'color' },
    tickStep: { control: 'number' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <h3>Standard Dashboard Gauge</h3>
          <Gauge
            min={args.min}
            max={args.max}
            step={args.step}
            value={args.value}
            disabled={args.disabled}
            readonly={args.readonly}
            showTicks={args.showTicks}
            showTickLabels={args.showTickLabels}
            showActiveTrack={args.showActiveTrack}
            activeTrackColor={args.activeTrackColor}
            tickStep={args.tickStep}
            highlights={[
              { start: 0, end: 40, color: 'var(--success-color, #2ecc71)' }, // Safe zone
              { start: 40, end: 80, color: 'var(--warning-color, #f39c12)' }, // Warning zone
              { start: 80, end: 100, color: 'var(--danger-color, #e74c3c)' }, // Danger zone
            ]}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <h3>Dual Range Frequency Selector</h3>
          <Gauge
            min={args.min}
            max={args.max}
            step={args.step}
            value={args.rangeValue}
            range={true}
            disabled={args.disabled}
            readonly={args.readonly}
            showTicks={args.showTicks}
            showTickLabels={args.showTickLabels}
            showActiveTrack={args.showActiveTrack}
            activeTrackColor={args.activeTrackColor}
            tickStep={args.tickStep}
            highlights={[
              // Highlight the selected range directly!
              { start: args.rangeValue[0], end: args.rangeValue[1], color: 'rgba(10, 116, 201, 0.4)' },
            ]}
          />
          <p style={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
            Note: The highlighted region statically binds to initial Props (doesn't hook reactively inside demo loop).
          </p>
        </div>
      </div>
    );
  },
  code: `import { Gauge } from 'lupine.components/component-pool';

// Single Gauge with Danger Zones
<Gauge 
  min={0} max={100} value={85} 
  showTicks={true}
  showTickLabels={true}
  tickStep={10}
  highlights={[
    { start: 0, end: 60, color: 'green' },
    { start: 60, end: 80, color: 'yellow' },
    { start: 80, end: 100, color: 'red' },
  ]}
  onChange={(v) => console.log(v)} 
/>

// Dual Range Frequency Selector
<Gauge 
  range={true}
  min={0} max={100} value={[20, 80]}
  showTicks={true}
  showTickLabels={true}
  tickStep={20}
  onChange={(v) => console.log('Range Selected:', v)}
/>
`,
};
