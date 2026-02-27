import { Tooltip } from './tooltip';
import { DemoStory } from '../../demo/demo-types';

export const tooltipDemo: DemoStory<any> = {
  id: 'tooltipDemo',
  text: 'Tooltip',
  args: {
    content: 'This is a tooltip',
    position: 'auto',
    showArrow: true,
  },
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['auto', 'top', 'bottom', 'left', 'right'],
    },
    showArrow: { control: 'boolean' },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      padding: '48px',
      alignItems: 'center',

      '.demo-section': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '600px',
      },
      '.section-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        marginBottom: '16px',
        borderBottom: '2px solid var(--secondary-border-color)',
        width: '100%',
        paddingBottom: '8px',
      },
      '.grid': {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        width: '100%',
      },
      '.box': {
        padding: '20px',
        border: '1px solid var(--secondary-border-color)',
        borderRadius: '8px',
        textAlign: 'center' as const,
        cursor: 'pointer',
        backgroundColor: 'var(--primary-bg-color)',
        '&:hover': {
          borderColor: 'var(--primary-color)',
        },
      },
    };

    const richContent = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px' }}>💡</span>
        <div>
          <div style={{ fontWeight: 'bold' }}>Rich Content</div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>With icons and formatting</div>
        </div>
      </div>
    );

    return (
      <div css={css}>
        <section class='demo-section'>
          <div class='section-title'>Interactive Control</div>
          <div
            class='box'
            style={{ width: '200px', padding: '40px' }}
            onMouseEnter={(e: any) =>
              Tooltip.show(e, args.content, { position: args.position, showArrow: args.showArrow })
            }
          >
            Hover me to see Tooltip from Controls
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Auto-Position & JIT Binding</div>
          <div class='grid'>
            <div class='box' onMouseEnter={(e: any) => Tooltip.show(e, 'Top Tooltip', { position: 'top' })}>
              Top Position
            </div>
            <div class='box' onMouseEnter={(e: any) => Tooltip.show(e, 'Bottom Tooltip', { position: 'bottom' })}>
              Bottom Position
            </div>
            <div class='box' onMouseEnter={(e: any) => Tooltip.show(e, 'Left Tooltip', { position: 'left' })}>
              Left Position
            </div>
            <div class='box' onMouseEnter={(e: any) => Tooltip.show(e, 'Right Tooltip', { position: 'right' })}>
              Right Position
            </div>
            <div
              class='box'
              onMouseEnter={(e: any) => Tooltip.show(e, 'Square Tooltip (No Arrow)', { showArrow: false })}
            >
              Square Style
            </div>
            <div class='box' onMouseEnter={(e: any) => Tooltip.show(e, richContent)}>
              Rich Content (VNode)
            </div>
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-title'>Standard Buttons</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              class='button-base button-m'
              onMouseEnter={(e: any) => Tooltip.show(e, 'Saved successfully!', { position: 'top' })}
            >
              Save
            </button>
            <button
              class='button-base button-m'
              onMouseEnter={(e: any) => Tooltip.show(e, 'Delete this item forever?', { position: 'bottom' })}
            >
              Delete
            </button>
          </div>
        </section>
      </div>
    );
  },
  code: `import { Tooltip } from 'lupine.components/component-pool';

// JIT triggering
<div onMouseEnter={e => Tooltip.show(e, 'Message')}>Hover me</div>

// With options
Tooltip.show(event, 'Message', { position: 'top', showArrow: true });
`,
};
