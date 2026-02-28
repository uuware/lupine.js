import { RefProps } from 'lupine.web';
import { DemoStory } from '../demo/demo-types';
import { Progress, ProgressHookProps } from './progress';
import { Button, ButtonSize } from './button';

// Note: Progress uses a singleton-like hook approach internally,
// so we create a dummy hook object to interact with it.
const progressHook: ProgressHookProps = {};

export const progressDemo: DemoStory<any> = {
  id: 'progress-demo',
  text: 'Progress Demo',
  args: {},
  argTypes: {},
  render: (args) => {
    const ref: RefProps = {};
    const startSimulation = () => {
      if (progressHook.onShow) {
        progressHook.onShow(true, 'Simulating Upload...');
        let p = 0;
        const interval = setInterval(() => {
          p += 3;
          if (p > 100) {
            clearInterval(interval);
            progressHook.onShow!(false);
          } else {
            progressHook.onProgress!(p / 100);
          }
        }, 100);
      }
    };
    return (
      <div ref={ref} style={{ padding: '20px' }}>
        <Progress hook={progressHook} />
        <div style={{ marginTop: '20px' }}>
          <Button onClick={startSimulation} size={ButtonSize.Large} text='Start Upload/Download Simulation' />
        </div>
      </div>
    );
  },
  code: `import { Progress, ProgressHookProps } from 'lupine.components/components/progress';

const progressHook: ProgressHookProps = {};

// 1. Render the component somewhere in your app (usually near the root)
<Progress hook={progressHook} />

// 2. Control it via the hook
progressHook.onShow!(true, 'Uploading...'); // Show progress
progressHook.onProgress!(0.5);              // Set to 50%
progressHook.onShow!(false);                // Hide
`,
};
