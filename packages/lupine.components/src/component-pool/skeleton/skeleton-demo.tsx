import { DemoStory } from '../../demo/demo-types';
import { Skeleton, SkeletonProps } from './skeleton';
import { SkeletonCard } from './skeleton-card';

export const skeletonDemo: DemoStory<SkeletonProps> = {
  id: 'skeleton',
  text: 'Skeleton',
  args: {
    width: '100%',
    height: '24px',
    circle: false,
    animated: true,
  },
  argTypes: {
    width: { control: 'text', description: 'Width of the skeleton' },
    height: { control: 'text', description: 'Height of the skeleton' },
    circle: { control: 'boolean', description: 'Render as a circle' },
    animated: { control: 'boolean', description: 'Enable pulse animation' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>Interactive Skeleton</h3>
          <Skeleton {...args} />
        </div>

        <div>
          <h3 style={{ marginBottom: '20px' }}>Card Example (Dynamic Height)</h3>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
            The SkeletonCard automatically fills available vertical space with skeleton lines. Resize the browser to see
            it adapt!
          </p>
          <div style={{ height: '200px', resize: 'vertical', overflow: 'hidden' }}>
            <SkeletonCard height='100%' animated={args.animated} />
          </div>
        </div>
      </div>
    );
  },
  code: `import { Skeleton } from 'lupine.components/component-pool';

// Basic Line
<Skeleton width="100%" height="24px" />

// Circle (Avatar)
<Skeleton width="48px" height="48px" circle={true} />

// Static (No animation)
<Skeleton width="100%" height="100px" animated={false} />

// Dynamic Auto-filling Card
<SkeletonCard width="100%" height="300px" />
`,
};
