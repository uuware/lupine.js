import { DemoStory } from '../demo/demo-types';
import { ButtonPushAnimation, ButtonPushAnimationProps, ButtonPushAnimationSize } from './button-push-animation';
import { HtmlVar } from './html-var';

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
    const msg = new HtmlVar('');
    return (
      <div css={{ padding: '20px' }}>
        <ButtonPushAnimation {...args} onClick={() => (msg.value = `Pushed at ${new Date().toLocaleTimeString()}`)} />
        <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
      </div>
    );
  },
  code: `import { ButtonPushAnimation, ButtonPushAnimationSize } from 'lupine.components/components/button-push-animation';

<ButtonPushAnimation 
  text="Push Me" 
  size={ButtonPushAnimationSize.Medium} 
  onClick={() => console.log('Pushed!')} 
/>
`,
};
