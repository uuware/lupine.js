import { DemoStory } from '../demo/demo-types';
import {
  ToggleSwitch,
  ToggleSwitchIcon,
  ToggleSwitchIconSize,
  ToggleSwitchProps,
  ToggleSwitchSize,
} from './toggle-switch';
import { HtmlVar } from 'lupine.components';

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
    const ToggleSwitchDemoContent = () => {
      const msg = new HtmlVar('');
      return (
        <div css={{ padding: '20px' }}>
          <div class='mx-l my-l'>
            <ToggleSwitch
              {...args}
              onClick={(c) => {
                msg.value = `Interactive Switch checked: ${c}`;
              }}
            />
          </div>
          <hr />

          <div class='mx-l my-l'>
            <ToggleSwitch
              size={ToggleSwitchSize.SmallSmall}
              text={{ on: 'ON', off: 'OFF' }}
              textWidth='30px'
              onClick={(c) => {
                msg.value = `SmallSmall Switch checked: ${c}`;
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <ToggleSwitch
              size={ToggleSwitchSize.Small}
              text={{ on: 'ON', off: 'OFF' }}
              textWidth='30px'
              onClick={(c) => {
                msg.value = `Small Switch checked: ${c}`;
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <ToggleSwitch
              size={ToggleSwitchSize.Medium}
              text={{ on: 'ON', off: 'OFF' }}
              textWidth='30px'
              onClick={(c) => {
                msg.value = `Medium Switch checked: ${c}`;
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <ToggleSwitch
              size={ToggleSwitchSize.Large}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ma-account-cog-outline'></i>On
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ma-account-cog-outline'></i>Off
                  </>
                ),
              }}
              textWidth='50px'
              checked={true}
              onClick={(c) => {
                msg.value = `Large Switch checked: ${c}`;
              }}
            />
          </div>
          <div class='mx-l my-l'>
            <ToggleSwitch
              size={ToggleSwitchSize.LargeLarge}
              text={{ on: 'ON', off: 'OFF' }}
              textWidth='50px'
              onClick={(c) => {
                msg.value = `LargeLarge Switch checked: ${c}`;
              }}
            />
          </div>

          <hr style={{ margin: '30px 0' }} />

          <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>ToggleSwitchIcon Sizes</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
            <ToggleSwitchIcon
              size={ToggleSwitchIconSize.SmallSmall}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ic-pause'></i>
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ic-play'></i>
                  </>
                ),
              }}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(c) => console.log(`SmallSmall ToggleSwitchIcon checked: ${c}`)}
            />

            <ToggleSwitchIcon
              size={ToggleSwitchIconSize.Small}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ic-pause'></i>
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ic-play'></i>
                  </>
                ),
              }}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(c) => console.log(`Small ToggleSwitchIcon checked: ${c}`)}
            />

            <ToggleSwitchIcon
              size={ToggleSwitchIconSize.Medium}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ic-pause'></i>
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ic-play'></i>
                  </>
                ),
              }}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(c) => console.log(`Medium ToggleSwitchIcon checked: ${c}`)}
            />

            <ToggleSwitchIcon
              size={ToggleSwitchIconSize.Large}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ic-pause'></i>
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ic-play'></i>
                  </>
                ),
              }}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(c) => console.log(`Large ToggleSwitchIcon checked: ${c}`)}
            />

            <ToggleSwitchIcon
              size={ToggleSwitchIconSize.LargeLarge}
              text={{
                on: (
                  <>
                    <i class='icon ifc-icon ic-pause'></i>
                  </>
                ),
                off: (
                  <>
                    <i class='icon ifc-icon ic-play'></i>
                  </>
                ),
              }}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(c) => console.log(`LargeLarge ToggleSwitchIcon checked: ${c}`)}
            />
          </div>
          <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
        </div>
      );
    };
    return <ToggleSwitchDemoContent />;
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
