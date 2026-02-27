import { DemoStory } from '../../demo/demo-types';
import { AspectRatio, AspectRatioProps } from './aspect-ratio';

export const aspectRatioDemo: DemoStory<AspectRatioProps> = {
  id: 'aspect-ratio',
  text: 'AspectRatio',
  args: {
    ratio: 16 / 9,
    children: <div />,
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: [16 / 9, 4 / 3, 1, 9 / 16],
      description: 'Aspect ratio (width / height)',
    },
  },
  render: (args) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '8px' }}>16 / 9 (Video)</h3>
          <AspectRatio ratio={16 / 9}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--secondary-bg-color, #e5e7eb)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary-color, #6b7280)',
                fontSize: '14px',
              }}
            >
              16:9 Content
            </div>
          </AspectRatio>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px' }}>4 / 3 (Classic Photo)</h3>
          <AspectRatio ratio={4 / 3}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--secondary-bg-color, #e5e7eb)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary-color, #6b7280)',
                fontSize: '14px',
              }}
            >
              4:3 Content
            </div>
          </AspectRatio>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px' }}>1 / 1 (Square)</h3>
          <AspectRatio ratio={1}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--secondary-bg-color, #e5e7eb)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary-color, #6b7280)',
                fontSize: '14px',
              }}
            >
              1:1 Content
            </div>
          </AspectRatio>
        </div>
      </div>
    );
  },
  code: `import { AspectRatio } from 'lupine.components/component-pool';

// Video embed (16:9)
<AspectRatio ratio={16 / 9}>
  <iframe src="..." style={{ width: '100%', height: '100%', border: 'none' }} />
</AspectRatio>

// Image (4:3)
<AspectRatio ratio={4 / 3}>
  <img src="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatio>

// Square
<AspectRatio ratio={1}>
  <img src="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatio>
`,
};
