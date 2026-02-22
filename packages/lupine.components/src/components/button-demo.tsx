import { DemoStory } from '../demo/demo-types';
import { Button, ButtonProps, ButtonSize } from './button';

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
    return <Button {...args} />;
  },
};
