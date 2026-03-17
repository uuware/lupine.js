import { DemoStory } from '../demo/demo-types';
import { InputNumber, InputNumberProps, InputNumberSize } from './input-number';
import { HtmlVar } from 'lupine.components';

export const inputNumberDemo: DemoStory<InputNumberProps> = {
  id: 'input-number-demo',
  text: 'Input Number',
  args: {
    value: 0,
    min: -10,
    max: 10,
    step: 1,
    size: InputNumberSize.Medium,
    shape: 'square',
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
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Shape of the buttons',
    },
    disabled: { control: 'boolean', description: 'Disable interaction' },
  },
  render: (args: InputNumberProps) => {
    const InputNumberDemoContent = () => {
      const msg = new HtmlVar('');
      return (
        <div style={{ padding: '20px' }}>
          <div class='mx-l my-l'>
            <InputNumber
              {...args}
              onChange={(v) => {
                msg.value = `Value changed: ${v}`;
              }}
            />
          </div>
          <hr />

          <div style={{ display: 'flex', gap: '50px' }}>
            <div>
              <div class='mx-l my-l' style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)' }}>
                Square Shape
              </div>
              <div class='mx-l my-l'>
                <InputNumber size={InputNumberSize.SmallSmall} onChange={(v) => (msg.value = `SmallSmall changed: ${v}`)} />
              </div>
              <div class='mx-l my-l'>
                <InputNumber size={InputNumberSize.Small} onChange={(v) => (msg.value = `Small changed: ${v}`)} />
              </div>
              <div class='mx-l my-l'>
                <InputNumber size={InputNumberSize.Medium} onChange={(v) => (msg.value = `Medium changed: ${v}`)} />
              </div>
              <div class='mx-l my-l'>
                <InputNumber size={InputNumberSize.Large} onChange={(v) => (msg.value = `Large changed: ${v}`)} />
              </div>
              <div class='mx-l my-l'>
                <InputNumber size={InputNumberSize.LargeLarge} onChange={(v) => (msg.value = `LargeLarge changed: ${v}`)} />
              </div>
            </div>

            <div>
              <div class='mx-l my-l' style={{ fontWeight: 'bold', color: 'var(--secondary-color, #666)' }}>
                Circle Shape
              </div>
              <div class='mx-l my-l'>
                <InputNumber
                  size={InputNumberSize.SmallSmall}
                  shape='circle'
                  onChange={(v) => (msg.value = `SmallSmall (Circle) changed: ${v}`)}
                />
              </div>
              <div class='mx-l my-l'>
                <InputNumber
                  size={InputNumberSize.Small}
                  shape='circle'
                  onChange={(v) => (msg.value = `Small (Circle) changed: ${v}`)}
                />
              </div>
              <div class='mx-l my-l'>
                <InputNumber
                  size={InputNumberSize.Medium}
                  shape='circle'
                  onChange={(v) => (msg.value = `Medium (Circle) changed: ${v}`)}
                />
              </div>
              <div class='mx-l my-l'>
                <InputNumber
                  size={InputNumberSize.Large}
                  shape='circle'
                  onChange={(v) => (msg.value = `Large (Circle) changed: ${v}`)}
                />
              </div>
              <div class='mx-l my-l'>
                <InputNumber
                  size={InputNumberSize.LargeLarge}
                  shape='circle'
                  onChange={(v) => (msg.value = `LargeLarge (Circle) changed: ${v}`)}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
        </div>
      );
    };
    return <InputNumberDemoContent />;
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
