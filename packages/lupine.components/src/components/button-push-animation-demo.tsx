import { DemoStory } from '../demo/demo-types';
import { ButtonPushAnimation, ButtonPushAnimationProps, ButtonPushAnimationSize } from './button-push-animation';

export const buttonPushAnimationDemo: DemoStory<ButtonPushAnimationProps> = {
  id: 'button-push-animation-demo',
  text: 'Button Push Animation Demo',
  args: {
    text: 'Push Me',
    size: ButtonPushAnimationSize.Medium,
    disabled: false,
  },
  argTypes: {
    text: { control: 'text', description: 'The text displayed inside the button' },
    size: {
      control: 'select',
      options: Object.values(ButtonPushAnimationSize),
      description: 'The size of the button',
    },
    disabled: { control: 'boolean', description: 'Whether the button is disabled' },
  },
  render: (args: ButtonPushAnimationProps) => {
    return <ButtonPushAnimation {...args} />;
  },
};
