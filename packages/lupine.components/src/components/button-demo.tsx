import { DemoStory } from '../demo/demo-types';
import { Button, ButtonProps, ButtonSize } from './button';
import { useState } from 'lupine.components';

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
    const ButtonDemoContent = () => {
      const [msg, setMsg] = useState('');
      return (
        <div css={{ padding: '20px' }}>
          <div class='mx-l my-l'>
            <Button
              {...args}
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <hr />

          <div class='mx-l my-l'>
            <Button
              size={ButtonSize.SmallSmall}
              text='SmallSmall Button'
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <Button
              size={ButtonSize.Small}
              text='Small Button'
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <Button
              size={ButtonSize.Medium}
              text={
                <>
                  <i class='icon ifc-icon ma-account-cog-outline mr-m'></i>Button
                </>
              }
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <Button
              size={ButtonSize.Large}
              text='Large Button'
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <Button
              size={ButtonSize.LargeLarge}
              text='Large Button'
              onClick={() => {
                setMsg(`Clicked at ${new Date().toLocaleTimeString()}`);
              }}
            />
          </div>
          <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg}</div>
        </div>
      );
    };
    return <ButtonDemoContent />;
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
