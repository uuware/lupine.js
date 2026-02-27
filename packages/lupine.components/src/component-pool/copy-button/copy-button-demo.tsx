import { DemoStory } from '../../demo/demo-types';
import { CopyButton, CopyButtonProps } from './copy-button';

export const copyButtonDemo: DemoStory<CopyButtonProps> = {
  id: 'copy-button',
  text: 'CopyButton',
  args: {
    text: () => 'npm install lupine.js',
    variant: 'outline',
  },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'solid', 'ghost'], description: 'Button style variant' },
    timeoutMs: { control: 'number', description: 'Time (ms) before reverting from copied state (default: 2000)' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>Interactive Copy Button</h3>
          <CopyButton {...args} />
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Variants</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <CopyButton text={() => 'Copy me!'} variant='solid'>
              Solid
            </CopyButton>
            <CopyButton text={() => 'Copy me!'} variant='outline'>
              Outline
            </CopyButton>
            <CopyButton text={() => 'Copy me!'} variant='ghost' />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Inline with Code Block</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--secondary-bg-color, #f3f4f6)',
              fontFamily: 'monospace',
              fontSize: '14px',
            }}
          >
            <span style={{ flex: 1 }}>npm install lupine.js</span>
            <CopyButton text={() => 'npm install lupine.js'} variant='ghost' />
          </div>
        </div>
      </div>
    );
  },
  code: `import { CopyButton } from 'lupine.components/component-pool';

// Default (outline) with auto icons — text is a function returning string
<CopyButton text={() => 'npm install lupine.js'} />

// Solid variant
<CopyButton text={() => 'hello world'} variant="solid">Copy</CopyButton>

// Ghost icon-only variant (shows copy icon by default)
<CopyButton text={() => 'hello world'} variant="ghost" />

// Dynamic text — useful for copying from DOM at click time
<CopyButton text={() => ref.$('input').value} />
`,
};
