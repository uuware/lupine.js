import { DemoStory } from '../demo/demo-types';
import { ToggleButton } from './toggle-base';

export const toggleButtonDemo: DemoStory<any> = {
  id: 'toggle-button-demo',
  text: 'Toggle Button Demo',
  args: {
    onText: 'Turn Off',
    offText: 'Turn On',
    disabled: false,
    checked: false,
  },
  argTypes: {
    onText: { control: 'text', description: 'Text shown when ON' },
    offText: { control: 'text', description: 'Text shown when OFF' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    checked: { control: 'boolean', description: 'Initial state' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <ToggleButton
          onText={args.onText}
          offText={args.offText}
          disabled={args.disabled}
          checked={args.checked}
          onClick={(val) => console.log('Toggled:', val)}
        />
      </div>
    );
  },
  code: `import { ToggleButton } from 'lupine.components/components/toggle-base';

<ToggleButton 
  onText="Turn Off" 
  offText="Turn On" 
  disabled={false} 
  checked={false} 
  onClick={(val) => console.log('Toggled:', val)} 
/>
`,
};
