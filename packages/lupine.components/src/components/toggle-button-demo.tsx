import { DemoStory } from '../demo/demo-types';
import { ToggleButton, ToggleIcon, ToggleIconSize, ToggleTextSize } from './toggle-base';

export const toggleButtonDemo: DemoStory<any> = {
  id: 'toggle-button-demo',
  text: 'Toggle Button Demo',
  args: {
    text: 'Start',
    size: '',
    disabled: false,
    checked: false,
  },
  argTypes: {
    text: { control: 'text', description: 'Text shown when ON' },
    size: {
      control: 'select',
      options: ['button-ss', 'button-s', '', 'button-l', 'button-ll'],
      description: 'Button size class',
    },
    disabled: { control: 'boolean', description: 'Disabled state' },
    checked: { control: 'boolean', description: 'Initial state' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '50px', marginBottom: '40px' }}>
          {/* Column 1: ToggleButton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)', marginBottom: '10px' }}>
              ToggleButton
            </div>
            <ToggleButton
              size='button-ss'
              text={args.text}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Toggled ss:', val)}
            />
            <ToggleButton
              size='button-s'
              text={args.text}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Toggled s:', val)}
            />
            <ToggleButton
              size=''
              text={args.text}
              disabled={args.disabled}
              checked={true}
              onClick={(val) => console.log('Toggled m:', val)}
            />
            <ToggleButton
              size='button-l'
              text={args.text}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Toggled l:', val)}
            />
            <ToggleButton
              size='button-ll'
              text={args.text}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Toggled ll:', val)}
            />
          </div>

          {/* Column 2: ToggleIcon (Icon) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)', marginBottom: '10px' }}>
              ToggleIcon (Icon)
            </div>
            <ToggleIcon
              size={ToggleIconSize.SmallSmall}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Icon Toggled SmallSmall:', val)}
            />
            <ToggleIcon
              size={ToggleIconSize.Small}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Icon Toggled Small:', val)}
            />
            <ToggleIcon
              size={ToggleIconSize.Medium}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={true}
              onClick={(val) => console.log('Icon Toggled Medium:', val)}
            />
            <ToggleIcon
              size={ToggleIconSize.Large}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Icon Toggled Large:', val)}
            />
            <ToggleIcon
              size={ToggleIconSize.LargeLarge}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Icon Toggled LargeLarge:', val)}
            />
            {/* <ToggleIcon
              size={ToggleIconSize.Auto}
              icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Icon Toggled Auto:', val)}
            /> */}
          </div>

          {/* Column 3: ToggleIcon (Text) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)', marginBottom: '10px' }}>
              ToggleIcon (Text)
            </div>
            <ToggleIcon
              size={ToggleTextSize.SmallSmall}
              icon='Play'
              borderRadius='8px'
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Text Toggled SmallSmall:', val)}
            />
            <ToggleIcon
              size={ToggleTextSize.Small}
              icon='Play'
              borderRadius='8px'
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Text Toggled Small:', val)}
            />
            <ToggleIcon
              size={ToggleTextSize.Medium}
              icon='Play'
              borderRadius='8px'
              disabled={args.disabled}
              checked={true}
              onClick={(val) => console.log('Text Toggled Medium:', val)}
            />
            <ToggleIcon
              size={ToggleTextSize.Large}
              icon={
                <>
                  <i class='icon ifc-icon ma-account-cog-outline mr-m'></i>Play
                </>
              }
              borderRadius='8px'
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Text Toggled Large:', val)}
            />
            <ToggleIcon
              size={ToggleTextSize.LargeLarge}
              icon='Play'
              borderRadius='8px'
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Text Toggled LargeLarge:', val)}
            />
            <ToggleIcon
              size={ToggleTextSize.Auto}
              icon='Play'
              borderRadius='8px'
              disabled={args.disabled}
              checked={args.checked}
              onClick={(val) => console.log('Text Toggled Auto:', val)}
            />
          </div>
        </div>

        <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid var(--primary-border-color, #eee)' }} />

        <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '20px' }}>Button (noToggle=true)</div>
        <div style={{ display: 'flex', gap: '50px' }}>
          {/* Button Column 1: Icon Only */}
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)', marginBottom: '10px' }}>
              Icon Only
            </div>
            <div class='my-l'>
              <ToggleIcon
                size={ToggleIconSize.Medium}
                icon={<i class='icon ifc-icon ma-account-cog-outline'></i>}
                disabled={false}
                checked={false}
                onClick={(val) => console.log('Button clicked:', val)}
                noToggle={true}
              />
            </div>
          </div>

          {/* Button Column 2: With Text */}
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)', marginBottom: '10px' }}>
              With Text (borderRadius='8px')
            </div>
            <div class='my-l'>
              <ToggleIcon
                size={ToggleIconSize.Auto}
                icon='Play'
                borderRadius='8px'
                disabled={false}
                checked={false}
                onClick={(val) => console.log('Button clicked:', val)}
                noToggle={true}
              />
            </div>
          </div>
        </div>
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
