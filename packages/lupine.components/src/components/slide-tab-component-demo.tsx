import { DemoStory } from '../demo/demo-types';
import { SlideTabComponent, SlideTabProps } from './slide-tab-component';

const samplePages = [
  {
    title: 'Overview',
    content: (
      <div style={{ padding: '12px' }}>
        <h3 style={{ marginTop: 0 }}>Overview</h3>
        <p>This is the overview tab. It provides a summary of the content.</p>
        <ul>
          <li>Feature A: Smooth horizontal scrolling between tabs</li>
          <li>Feature B: Snap-to-slide behaviour</li>
          <li>Feature C: Active tab indicator</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Details',
    content: (
      <div style={{ padding: '12px' }}>
        <h3 style={{ marginTop: 0 }}>Details</h3>
        <p>This is the details tab. It shows in-depth information.</p>
        <p>
          The SlideTabComponent uses CSS scroll-snap for smooth, performant tab transitions without any animation
          libraries.
        </p>
      </div>
    ),
  },
  {
    title: 'Settings',
    content: (
      <div style={{ padding: '12px' }}>
        <h3 style={{ marginTop: 0 }}>Settings</h3>
        <p>This is the settings tab. Configure options here.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>
            <input type='checkbox' checked /> Enable notifications
          </label>
          <label>
            <input type='checkbox' /> Dark mode
          </label>
          <label>
            <input type='checkbox' checked /> Auto-save
          </label>
        </div>
      </div>
    ),
  },
];

export const slideTabDemo: DemoStory<SlideTabProps> = {
  id: 'slide-tab-demo',
  text: 'Slide Tab',
  args: {
    pages: samplePages,
  },
  render: (args: SlideTabProps) => {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          border: 'var(--primary-border)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <SlideTabComponent {...args} />
      </div>
    );
  },
  code: `import { SlideTabComponent } from 'lupine.components/components/slide-tab-component';

const pages = [
  { title: 'Tab 1', content: <div>Content for Tab 1</div> },
  { title: 'Tab 2', content: <div>Content for Tab 2</div> },
  { title: 'Tab 3', content: <div>Content for Tab 3</div> },
];

<SlideTabComponent pages={pages} />
`,
};
