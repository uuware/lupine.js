import { DemoStory } from '../demo/demo-types';
import { ButtonPushAnimation, ButtonPushAnimationProps, ButtonPushAnimationSize } from './button-push-animation';
import { HtmlVar } from 'lupine.components';

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
    const ButtonPushAnimationDemoContent = () => {
      const msg = new HtmlVar('');
      const pushMsg = () => (msg.value = `Pushed at ${new Date().toLocaleTimeString()}`);
      return (
        <div css={{ padding: '20px' }}>
          <div class='mx-l my-l'>
            <ButtonPushAnimation {...args} onClick={pushMsg} />
          </div>
          <hr />

          <div class='mx-l my-l'>
            <ButtonPushAnimation size={ButtonPushAnimationSize.SmallSmall} text='SmallSmall Button' onClick={pushMsg} />
          </div>
          <div class='mx-l my-l'>
            <ButtonPushAnimation size={ButtonPushAnimationSize.Small} text='Small Button' onClick={pushMsg} />
          </div>
          <div class='mx-l my-l'>
            <ButtonPushAnimation
              size={ButtonPushAnimationSize.Medium}
              text={
                <>
                  <i class='icon ifc-icon ma-account-cog-outline mr-m'></i>Button
                </>
              }
              onClick={pushMsg}
            />
          </div>
          <div class='mx-l my-l'>
            <ButtonPushAnimation size={ButtonPushAnimationSize.Large} text='Large Button' onClick={pushMsg} />
          </div>
          <div class='mx-l my-l'>
            <ButtonPushAnimation size={ButtonPushAnimationSize.LargeLarge} text='LargeLarge Button' onClick={pushMsg} />
          </div>

          <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
        </div>
      );
    };
    return <ButtonPushAnimationDemoContent />;
  },
  code: `import { ButtonPushAnimation, ButtonPushAnimationSize } from 'lupine.components/components/button-push-animation';

<ButtonPushAnimation 
  text="Push Me" 
  size={ButtonPushAnimationSize.Medium} 
  onClick={() => console.log('Pushed!')} 
/>
`,
};
