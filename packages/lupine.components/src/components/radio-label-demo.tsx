import { DemoStory } from '../demo/demo-types';
import { RadioLabelComponent } from './radio-label-component';

export const radioLabelDemo: DemoStory<any> = {
  id: 'radio-label-demo',
  text: 'Radio Label Demo',
  args: {
    label: 'Option A',
    name: 'demo-radio-group',
    checked: true,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    name: { control: 'text', description: 'Radio group name' },
    checked: { control: 'boolean', description: 'Is checked?' },
    disabled: { control: 'boolean', description: 'Is disabled?' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <RadioLabelComponent {...args} />
        <RadioLabelComponent label='Option B' name={args.name} disabled={args.disabled} />
      </div>
    );
  },
  code: `import { RadioLabelComponent } from 'lupine.components/components/radio-label-component';

<RadioLabelComponent 
  label="Option A" 
  name="demo-radio-group" 
  checked={true} 
  disabled={false} 
/>
<RadioLabelComponent 
  label="Option B" 
  name="demo-radio-group" 
  disabled={false} 
/>
`,
};
