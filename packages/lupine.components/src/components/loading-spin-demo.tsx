import { DemoStory } from '../demo/demo-types';
import { LoadingSpin } from './loading-spin';
import { Button, ButtonSize } from './button';

export const loadingSpinDemo: DemoStory<any> = {
  id: 'loading-spin-demo',
  text: 'LoadingSpin Demo',
  args: {},
  argTypes: {},
  render: () => {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: '#666', marginBottom: '20px' }}>Click the button to show the loading spinner for 3 seconds.</p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            text='Show Loading Spin'
            size={ButtonSize.Medium}
            onClick={async () => {
              const close = await LoadingSpin.show();
              setTimeout(() => {
                close();
              }, 3000);
            }}
          />
        </div>
      </div>
    );
  },
  code: `import { LoadingSpin } from 'lupine.components/components/loading-spin';

const close = await LoadingSpin.show();
setTimeout(() => {
  close();
}, 3000);
`,
};
