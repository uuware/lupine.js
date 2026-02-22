import { DemoStory } from '../demo/demo-types';
import { SwitchOptionComponent, SwitchOptionComponentProps } from './switch-option-component';

export const switchOptionDemo: DemoStory<SwitchOptionComponentProps> = {
  id: 'switch-option-demo',
  text: 'Switch Option Demo',
  args: {
    option1: 'Day',
    option2: 'Night',
    defaultOption: 'Day',
    fontSize: '14px',
  },
  argTypes: {
    option1: { control: 'text', description: 'First option text' },
    option2: { control: 'text', description: 'Second option text' },
    defaultOption: { control: 'text', description: 'Initial selected option' },
    fontSize: { control: 'text', description: 'Font size' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <SwitchOptionComponent {...args} onChange={(val) => console.log('Switched to:', val)} />
      </div>
    );
  },
};
