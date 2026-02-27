import { DemoStory } from '../../demo/demo-types';
import { RadialProgress, RadialProgressProps } from './radial-progress';
import { ButtonSize } from '../../components/button';
import { bindRef } from 'lupine.web';

export const radialProgressDemo: DemoStory<RadialProgressProps> = {
  id: 'radial-progress',
  text: 'Radial Progress',
  args: {
    color: '#0a74c9',
    trackColor: '#e0e0e0',
    value: 75,
    size: ButtonSize.Large,
  },
  argTypes: {
    color: { control: 'color', description: 'Progress ring color' },
    trackColor: { control: 'color', description: 'Background track ring color' },
    value: { control: 'number', description: 'Current completion percentage' },
    size: { control: 'select', options: Object.values(ButtonSize), description: 'Component pixel size mapping' },
  },
  render: (args) => {
    // We will demonstrate both declarative props scaling and hook-driven animations

    const hookData = { onProgress: null as any };
    let simValue = 0;

    // Simulate real-world downloading / progressing every 100ms
    const startSimulation = () => {
      simValue = 0;
      const interval = setInterval(() => {
        simValue += 5;
        if (hookData.onProgress) {
          hookData.onProgress(simValue);
        }
        if (simValue >= 100) clearInterval(interval);
      }, 100);
    };

    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Declarative Value & Dynamic Sizes</h3>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <RadialProgress value={10} size={ButtonSize.SmallLarge} />
            <RadialProgress value={30} size={ButtonSize.Small} />
            <RadialProgress value={args.value} size={args.size} color={args.color} trackColor={args.trackColor} />
            <RadialProgress value={85} size={ButtonSize.LargeLarge} color='#49e57e' />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3>Hook-Driven Realtime Animation</h3>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '20px' }}>
            Click the button below to simulate loading
          </p>
          <RadialProgress value={0} size={ButtonSize.Large} hook={hookData} />
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={startSimulation}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #ccc',
                background: '#fff',
              }}
            >
              Start Upload/Download Simulation
            </button>
          </div>
        </div>
      </div>
    );
  },
  code: `import { RadialProgress } from 'lupine.components/component-pool';
import { ButtonSize } from 'lupine.components/src/components/button.tsx';

// 1. Static declarative rendering
<RadialProgress value={75} size={ButtonSize.Large} color="var(--primary-accent-color)" />

// 2. Reactivity with hooks
const progressHook = {};
<RadialProgress hook={progressHook} size={ButtonSize.Medium} />

// Later triggering the hook update
progressHook.onProgress(100);
`,
};
