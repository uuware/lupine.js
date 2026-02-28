import { DemoStory } from '../demo/demo-types';
import { ToggleSwitch, ToggleSwitchProps, ToggleSwitchSize } from './toggle-switch';

export const toggleSwitchDemo: DemoStory<ToggleSwitchProps> = {
  id: 'toggle-switch-demo',
  text: 'Toggle Switch Demo',
  args: {
    size: ToggleSwitchSize.Medium,
    disabled: false,
    checked: false,
    text: { on: 'ON', off: 'OFF' },
    textWidth: '30px',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ToggleSwitchSize),
      description: 'The size of the switch',
    },
    disabled: { control: 'boolean', description: 'Whether the switch is disabled' },
    checked: { control: 'boolean', description: 'Whether the switch is turned on' },
    textWidth: { control: 'text', description: 'Fixed width for the text to prevent jumping' },
  },
  render: (args: ToggleSwitchProps) => {
    // Note: We don't expose 'text' as a simple control because our current demo system
    // handles primitives. But the user can see how it works with the default args.
    return (
      <div css={{ padding: '20px' }}>
        <ToggleSwitch {...args} />
      </div>
    );
  },
  code: `import { ToggleSwitch, ToggleSwitchSize } from 'lupine.components/components/toggle-switch';

<ToggleSwitch 
  size={ToggleSwitchSize.Medium} 
  disabled={false} 
  checked={false} 
  text={{ on: 'ON', off: 'OFF' }} 
  textWidth="30px" 
/>
`,
};
