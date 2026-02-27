import { DemoStory } from '../demo/demo-types';
import { Button, ButtonProps, ButtonSize } from './button';
import { HtmlVar } from './html-var';

export const buttonDemo: DemoStory<ButtonProps> = {
  id: 'button-demo',
  text: 'Button Demo',
  args: {
    text: 'Click Me',
    size: ButtonSize.Medium,
    disabled: false,
  },
  argTypes: {
    text: { control: 'text', description: 'The text displayed inside the button' },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
      description: 'The size of the button',
    },
    disabled: { control: 'boolean', description: 'Whether the button is disabled' },
  },
  render: (args: ButtonProps) => {
    const msg = new HtmlVar('');
    return (
      <div>
        <Button
          {...args}
          onClick={() => {
            msg.value = `Clicked at ${new Date().toLocaleTimeString()}`;
          }}
        />
        <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
      </div>
    );
  },
  code: `import { Button, ButtonSize } from 'lupine.components/components/button';

// Basic Usage
<Button 
  text="Click Me" 
  size={ButtonSize.Medium} 
  onClick={() => console.log('Clicked!')} 
/>
`,
};
