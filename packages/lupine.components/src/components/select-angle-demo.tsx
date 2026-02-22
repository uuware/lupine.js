import { DemoStory } from '../demo/demo-types';
import { SelectAngleComponent, SelectAngleComponentProps } from './select-angle-component';

export const selectAngleDemo: DemoStory<SelectAngleComponentProps> = {
  id: 'select-angle-demo',
  text: 'Select Angle Demo',
  args: {
    size: '100px',
    angle: 45,
    onChange: () => {},
  },
  argTypes: {
    size: { control: 'text', description: 'Size of the dial container' },
    angle: { control: 'number', description: 'Initial angle (0-360)' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: '#666', marginBottom: '16px' }}>Drag the needle or click the edge dots to set the angle.</p>
        <SelectAngleComponent {...args} onChange={(val) => console.log('Angle changed:', val)} />
      </div>
    );
  },
  code: `import { SelectAngleComponent } from 'lupine.components/components/select-angle-component';

<SelectAngleComponent 
  size="100px" 
  angle={45} 
  onChange={(val) => console.log('Angle changed:', val)} 
/>
`,
};
