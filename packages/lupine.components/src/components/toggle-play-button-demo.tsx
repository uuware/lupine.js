import { DemoStory } from '../demo/demo-types';
import { TogglePlayButton, TogglePlayButtonSize } from './toggle-base';

export const togglePlayButtonDemo: DemoStory<any> = {
  id: 'toggle-play-button-demo',
  text: 'Toggle Play Button Demo',
  args: {
    size: 'Medium',
    disabled: false,
    checked: false,
    textColor: '#ffffff',
    backgroundColor: '#3b29cc',
    noWave: false,
  },
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'], description: 'Size preset' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    checked: { control: 'boolean', description: 'Is playing?' },
    textColor: { control: 'text', description: 'Color of the play icon' },
    backgroundColor: { control: 'text', description: 'Background color of the button' },
    noWave: { control: 'boolean', description: 'Disable the background wave animation' },
  },
  render: (args) => {
    // Map string enum back to object
    const sizeMap: any = {
      Small: TogglePlayButtonSize.Small,
      Medium: TogglePlayButtonSize.Medium,
      Large: TogglePlayButtonSize.Large,
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <TogglePlayButton
          size={sizeMap[args.size]}
          disabled={args.disabled}
          checked={args.checked}
          textColor={args.textColor}
          backgroundColor={args.backgroundColor}
          noWave={args.noWave}
          onClick={(val) => console.log('Playing:', val)}
        />
      </div>
    );
  },
  code: `import { TogglePlayButton, TogglePlayButtonSize } from 'lupine.components/components/toggle-base';

<TogglePlayButton 
  size={TogglePlayButtonSize.Medium} 
  disabled={false} 
  checked={false} 
  textColor="#ffffff" 
  backgroundColor="#3b29cc" 
  noWave={false} 
  onClick={(val) => console.log('Playing:', val)} 
/>
`,
};
