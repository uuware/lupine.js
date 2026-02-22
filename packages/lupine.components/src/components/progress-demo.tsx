import { RefProps } from 'lupine.web';
import { DemoStory } from '../demo/demo-types';
import { Progress, ProgressHookProps } from './progress';

// Note: Progress uses a singleton-like hook approach internally,
// so we create a dummy hook object to interact with it.
const progressHook: ProgressHookProps = {};

export const progressDemo: DemoStory<any> = {
  id: 'progress-demo',
  text: 'Progress Demo',
  args: {
    simulate: false,
  },
  argTypes: {
    simulate: {
      control: 'boolean',
      description: 'Check this to simulate a 3-second progress upload',
    },
  },
  render: (args) => {
    const ref: RefProps = {
      onLoad: async () => {
        // If the simulate toggle is flipped, run a fake progression
        if (args.simulate && progressHook.onShow) {
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
        } else if (!args.simulate && progressHook.onShow) {
          progressHook.onShow(false);
        }
      },
    };
    return (
      <div ref={ref} style={{ padding: '20px' }}>
        <p style={{ color: '#666' }}>
          Toggle the 'simulate' control to see the fixed progress bar at the bottom of the screen.
        </p>
        <Progress hook={progressHook} />
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
