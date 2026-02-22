import { DemoStory } from '../demo/demo-types';
import { TextWave, TextLoadingProps } from './text-wave';

export const textWaveDemo: DemoStory<TextLoadingProps> = {
  id: 'text-wave-demo',
  text: 'Text Wave Demo',
  args: {
    text: 'Loading...',
    color: '#22b8ff',
    fontSize: '30px',
    padding: '20px',
    fontWeight: 'bold',
  },
  argTypes: {
    text: { control: 'text', description: 'The text to animate' },
    color: { control: 'text', description: 'Color of the text' },
    fontSize: { control: 'text', description: 'Font size' },
    padding: { control: 'text', description: 'Padding around text' },
    fontWeight: { control: 'text', description: 'Font weight' },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <TextWave {...args} />
      </div>
    );
  },
};
