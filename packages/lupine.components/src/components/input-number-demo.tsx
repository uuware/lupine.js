import { DemoStory } from '../demo/demo-types';
import { InputNumber, InputNumberProps, InputNumberSize } from './input-number';
import { HtmlVar } from './html-var';

export const inputNumberDemo: DemoStory<InputNumberProps> = {
  id: 'input-number-demo',
  text: 'Input Number',
  args: {
    value: 0,
    min: -10,
    max: 10,
    step: 1,
    size: InputNumberSize.Medium,
    disabled: false,
  },
  argTypes: {
    value: { control: 'number', description: 'Initial value' },
    min: { control: 'number', description: 'Minimum allowed value' },
    max: { control: 'number', description: 'Maximum allowed value' },
    step: { control: 'number', description: 'Step amount per click' },
    size: {
      control: 'select',
      options: Object.values(InputNumberSize),
      description: 'Size of the stepper',
    },
    disabled: { control: 'boolean', description: 'Disable interaction' },
  },
  render: (args: InputNumberProps) => {
    const msg = new HtmlVar('');
    return (
      <div>
        <InputNumber
          {...args}
          onChange={(v) => {
            msg.value = `Value changed: ${v}`;
          }}
        />
        <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
      </div>
    );
  },
  code: `import { InputNumber, InputNumberSize } from 'lupine.components/components/input-number';

// Basic usage
<InputNumber
  value={0}
  min={0}
  max={100}
  step={1}
  size={InputNumberSize.Medium}
  onChange={(v) => console.log('Value:', v)}
/>
`,
};
