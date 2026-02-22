import { DemoStory } from '../demo/demo-types';
import { Tabs } from './tabs';

export const tabsDemo: DemoStory<any> = {
  id: 'tabs-demo',
  text: 'Tabs Demo',
  args: {
    defaultIndex: 0,
    pagePadding: '16px',
  },
  argTypes: {
    defaultIndex: { control: 'number', description: 'Index of the active tab on load' },
    pagePadding: { control: 'text', description: 'Padding inside each tab page' },
  },
  render: (args) => {
    return (
      <div style={{ height: '300px', width: '500px', border: '1px solid #ccc' }}>
        <Tabs
          defaultIndex={args.defaultIndex}
          pagePadding={args.pagePadding}
          pages={[
            { title: 'Tab 1', page: <div>Content for Tab 1</div> },
            { title: 'Tab 2', page: <div>Content for Tab 2</div> },
            { title: 'Tab 3', page: <div style={{ color: 'red' }}>Content for Tab 3</div> },
          ]}
        />
      </div>
    );
  },
};
