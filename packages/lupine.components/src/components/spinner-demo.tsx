import { DemoStory } from '../demo/demo-types';
import { Spinner01, Spinner02, Spinner03, SpinnerSize } from './spinner';

export const spinnerDemo: DemoStory<any> = {
  id: 'spinner-demo',
  text: 'Spinner Demo',
  args: {
    size: SpinnerSize.Medium,
    color: '#0a74c9',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SpinnerSize),
      description: 'Size of the spinner',
    },
    color: {
      control: 'text',
      description: 'Color of the spinner (Hex, RGB, or var)',
    },
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Spinner01 size={args.size} color={args.color} />
          <span>Spinner01</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Spinner02 size={args.size} color={args.color} />
          <span>Spinner02</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {/* Spinner03 expects an RGB tuple string without the rgb() wrapper */}
          <Spinner03 size={args.size} colorRGB='10 116 201' />
          <span>Spinner03</span>
        </div>
      </div>
    );
  },
  code: `import { Spinner01, Spinner02, Spinner03, SpinnerSize } from 'lupine.components/components/spinner';

{/* Spinner01 */}
<Spinner01 size={SpinnerSize.Medium} color="#0a74c9" />

{/* Spinner02 */}
<Spinner02 size={SpinnerSize.Medium} color="#0a74c9" />

{/* Spinner03 expects an RGB tuple string without the rgb() wrapper */}
<Spinner03 size={SpinnerSize.Medium} colorRGB="10 116 201" />
`,
};
