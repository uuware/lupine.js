import { DemoStory } from '../demo/demo-types';
import { TextGlow, TextGlowProps } from './text-glow';

export const textGlowDemo: DemoStory<TextGlowProps> = {
  id: 'text-glow-demo',
  text: 'Text Glow Demo',
  args: {
    text: 'NEON GLOW',
    color: '#ffffff',
    fontSize: '40px',
    padding: '30px',
    fontWeight: 'bold',
  },
  argTypes: {
    text: { control: 'text', description: 'The text to animate' },
    color: { control: 'text', description: 'Color of the base text' },
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
          backgroundColor: '#111',
        }}
      >
        <TextGlow {...args} />
      </div>
    );
  },
  code: `import { TextGlow } from 'lupine.components/components/text-glow';

<TextGlow 
  text="NEON GLOW" 
  color="#ffffff" 
  fontSize="40px" 
  padding="30px" 
  fontWeight="bold" 
/>
`,
};
