import { DemoStory } from '../demo/demo-types';
import { TextScale, TextScaleProps } from './text-scale';

export const textScaleDemo: DemoStory<TextScaleProps> = {
  id: 'text-scale-demo',
  text: 'Text Scale Demo',
  args: {
    text: 'Scaling Text!!!',
    color: '#22b8ff',
    backgroundColor: '#a1ffe8',
    fontSize: '35px',
    padding: '15px 30px',
    fontWeight: 'bold',
  },
  argTypes: {
    text: { control: 'text', description: 'The text to animate' },
    color: { control: 'text', description: 'Color of the text' },
    backgroundColor: { control: 'text', description: 'Background color behind text' },
    fontSize: { control: 'text', description: 'Font size' },
    padding: { control: 'text', description: 'Padding around background' },
    fontWeight: { control: 'text', description: 'Font weight' },
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <TextScale {...args} />
      </div>
    );
  },
};
