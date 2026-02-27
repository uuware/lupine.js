import { DemoStory } from '../../demo/demo-types';
import { Timeline, TimelineProps } from './timeline';

export const timelineDemo: DemoStory<TimelineProps> = {
  id: 'timeline',
  text: 'Timeline',
  args: {
    lineColor: '#cccccc',
    lineThickness: '4px',
    topLabelColor: '#000000',
    stepMode: false,
    items: [], // Will be overridden in render, but needed for type definition
  },
  argTypes: {
    lineColor: { control: 'color', description: 'Line color' },
    lineThickness: { control: 'text', description: 'Thickness of the timeline connecting line' },
    topLabelColor: { control: 'color', description: 'Top label text color' },
    stepMode: { control: 'boolean', description: 'Show numerical steps instead of icons' },
  },
  render: (args) => {
    const items = [
      { percent: 0, topLabel: '2021', bottomInfo: 'Project Kickoff', completed: true },
      { percent: 30, topLabel: '2022', bottomInfo: 'Alpha Release (Internal)', completed: true },
      { percent: 70, topLabel: '2023', bottomInfo: 'Beta Release (Public Testing)', completed: false },
      { percent: 100, topLabel: '2024', bottomInfo: 'Final Production Release', completed: false },
    ];

    const stepItems = [
      { percent: 0, bottomInfo: 'Cart', completed: true },
      { percent: 50, bottomInfo: 'Payment', completed: true },
      { percent: 100, bottomInfo: 'Confirmation', completed: false },
    ];

    return (
      <div style={{ padding: '60px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <div>
            <h3 style={{ marginBottom: '40px', textAlign: 'center' }}>Horizontal Project Timeline</h3>
            <Timeline
              items={items}
              lineColor={args.lineColor}
              lineThickness={args.lineThickness}
              topLabelColor={args.topLabelColor}
              stepMode={args.stepMode}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: '40px', textAlign: 'center' }}>Step Mode (Checkout Flow)</h3>
            <Timeline
              items={stepItems}
              lineColor={args.lineColor}
              lineThickness={args.lineThickness}
              topLabelColor={args.topLabelColor}
              stepMode={true}
            />
          </div>
        </div>
      </div>
    );
  },
  code: `import { Timeline } from 'lupine.components/component-pool';

const items = [
  { percent: 0, topLabel: '2021', bottomInfo: 'Start', completed: true },
  { percent: 50, topLabel: '2022', bottomInfo: 'Beta', completed: true },
  { percent: 100, topLabel: '2025', bottomInfo: 'Final', completed: false },
];

<Timeline 
  items={items} 
  lineColor="#ccc" 
  topLabelColor="#000" 
/>`,
};
