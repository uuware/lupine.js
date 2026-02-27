import { Range } from './range';
import { DemoStory } from '../../demo/demo-types';

export const rangeDemo: DemoStory<any> = {
  id: 'rangeDemo',
  text: 'Range',
  args: {
    min: 0,
    max: 100,
    vertical: false,
    range: true,
    showTicks: true,
    showTickLabels: true,
    tickStep: 20,
    disabled: false,
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    vertical: { control: 'boolean' },
    range: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    showTickLabels: { control: 'boolean' },
    tickStep: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      padding: '20px',
      '.range-section': {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
      '.section-title': {
        fontWeight: 'bold',
        fontSize: '16px',
        color: 'var(--primary-color)',
      },
    };

    return (
      <div css={css}>
        <div class='range-section'>
          <div class='section-title'>Interactive Range (Controlled by Panel)</div>
          <Range {...args} style={args.vertical ? { height: '300px' } : {}} />
        </div>

        {!args.vertical && (
          <>
            <div class='range-section'>
              <div class='section-title'>Standard Range (Single Thumb)</div>
              <Range min={0} max={100} value={30} showTicks showTickLabels tickStep={10} />
            </div>

            <div class='range-section'>
              <div class='section-title'>Range Selector (Dual Thumbs)</div>
              <Range min={0} max={100} value={[20, 80]} range showTicks showTickLabels tickStep={20} />
            </div>

            <div class='range-section'>
              <div class='section-title'>Disabled State</div>
              <Range min={0} max={100} value={50} disabled showTicks showTickLabels />
            </div>
          </>
        )}

        {args.vertical && (
          <div style={{ display: 'flex', gap: '40px', height: '300px' }}>
            <div class='range-section'>
              <div class='section-title'>Vertical Single</div>
              <Range vertical min={0} max={100} value={60} showTicks showTickLabels tickStep={20} />
            </div>
            <div class='range-section'>
              <div class='section-title'>Vertical Dual</div>
              <Range vertical range min={0} max={100} value={[25, 75]} showTicks showTickLabels tickStep={25} />
            </div>
          </div>
        )}
      </div>
    );
  },
  code: `import { Range } from 'lupine.components/component-pool';

// Single thumb
<Range min={0} max={100} value={30} showTicks showTickLabels tickStep={10} />

// Dual thumbs (range)
<Range min={0} max={100} value={[20, 80]} range showTicks showTickLabels />

// Vertical
<Range vertical min={0} max={100} value={50} />
`,
};
