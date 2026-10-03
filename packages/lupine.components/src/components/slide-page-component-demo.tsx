import { DemoStory } from '../demo/demo-types';
import { SlidePageComponent, SlidePageProps } from './slide-page-component';

const samplePages = [
  {
    id: 'page-1',
    title: 'Explore Lupine Framework',
    link: 'https://github.com/uuware/lupine.js',
    target: '_blank',
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '28px 32px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #091e3a 0%, #173865 50%, #2b6cb0 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '3px 10px',
                borderRadius: '12px',
                background: 'rgba(2, 132, 199, 0.45)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                color: '#e0f2fe',
              }}
            >
              🔗 Clickable Card (With Link)
            </span>
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Explore Lupine.js Architecture
          </h2>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#cbd5e1', maxWidth: '520px' }}>
            A lightweight, high-performance TypeScript full-stack framework with zero-re-render DOM updates and native mobile navigation.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#38bdf8',
              color: '#0f172a',
            }}
          >
            Visit GitHub Repository ↗
          </span>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Click anywhere on this slide to open</span>
        </div>
      </div>
    ),
  },
  {
    id: 'page-2',
    title: 'Reactive DOM Performance',
    // No link: behaves as a normal card
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '28px 32px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 60%, #3f3f46 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '3px 10px',
                borderRadius: '12px',
                background: 'rgba(161, 161, 170, 0.25)',
                border: '1px solid rgba(212, 212, 216, 0.35)',
                color: '#f4f4f5',
              }}
            >
              📄 Normal Card (No Link)
            </span>
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Direct DOM Updates & State Isolation
          </h2>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.5', color: '#d4d4d8' }}>
            Standard non-clickable presentation card showcasing core reactive capabilities:
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>⚡ 0ms</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Re-render overhead</div>
          </div>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#4ade80' }}>🎯 CSS &</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Scoped namespace</div>
          </div>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#fbbf24' }}>📱 60fps</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Native touch snap</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'page-3',
    title: 'Component Pool & Widgets',
    link: '#component-pool',
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '28px 32px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 55%, #059669 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '3px 10px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.35)',
                border: '1px solid rgba(110, 231, 183, 0.5)',
                color: '#d1fae5',
              }}
            >
              🔗 Clickable Card (With Link)
            </span>
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Slide Tab & Slide Page Suite
          </h2>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#a7f3d0', maxWidth: '520px' }}>
            Standardized components built on top of native CSS scroll-snap with automated indicators and gesture support.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: '#6ee7b7',
              color: '#064e3b',
            }}
          >
            Explore Components ↗
          </span>
          <span style={{ fontSize: '12px', color: '#d1fae5' }}>Click to navigate internal link</span>
        </div>
      </div>
    ),
  },
  {
    id: 'page-4',
    title: 'Customizable Slide Options',
    // No link: behaves as a normal card
    content: (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '28px 32px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 55%, #7c3aed 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '3px 10px',
                borderRadius: '12px',
                background: 'rgba(196, 181, 253, 0.25)',
                border: '1px solid rgba(221, 214, 254, 0.4)',
                color: '#f5f3ff',
              }}
            >
              📄 Normal Card (No Link)
            </span>
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Configurable Controls & Hooks
          </h2>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ddd6fe', maxWidth: '540px' }}>
            Configure autoplay duration, dot indicators, arrow toggles, hover pause, or take programmatic control via hook moveTo(), setIndex(), and setPause().
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#c4b5fd' }}>
            💡 Tip: Hovering over any slide automatically pauses the autoplay cycle.
          </span>
        </div>
      </div>
    ),
  },
];

export const slidePageDemo: DemoStory<SlidePageProps> = {
  id: 'slide-page-demo',
  text: 'Slide Page',
  args: {
    pages: samplePages,
    autoplay: true,
    interval: 4000,
    showDots: true,
    showArrows: true,
    pauseOnHover: true,
  },
  argTypes: {
    autoplay: {
      control: 'boolean',
      description: 'Automatically rotate slides at a set interval',
    },
    interval: {
      control: 'number',
      description: 'Autoplay rotation interval in milliseconds',
    },
    showDots: {
      control: 'boolean',
      description: 'Display navigation dot indicators at the bottom',
    },
    showArrows: {
      control: 'boolean',
      description: 'Display left and right arrow buttons',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay rotation when mouse hovers over slide',
    },
  },
  render: (args: SlidePageProps) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '800px' }}>
        <div
          style={{
            height: '240px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: 'var(--primary-border, 1px solid rgba(60, 60, 67, 0.15))',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            position: 'relative',
          }}
        >
          <SlidePageComponent {...args} />
        </div>
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'var(--secondary-bg-color, #f2f2f7)',
            fontSize: '13px',
            color: 'var(--text-secondary, #64748b)',
            lineHeight: '1.5',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div>
            <strong>Interactive behavior:</strong> Items with <code>link</code> are rendered as clickable elements (e.g. Slide 1 & Slide 3) with pointer cursor and hover states. Items without <code>link</code> (Slide 2 & Slide 4) render as standard content cards.
          </div>
        </div>
      </div>
    );
  },
  code: `import { SlidePageComponent } from 'lupine.components';

const pages = [
  {
    title: 'Slide with Link',
    link: 'https://example.com',
    target: '_blank',
    content: <div>Clickable Slide Content</div>,
  },
  {
    title: 'Regular Slide Card',
    content: <div>Standard Non-Clickable Card Content</div>,
  },
];

<SlidePageComponent
  pages={pages}
  autoplay={true}
  interval={4000}
  showDots={true}
  showArrows={true}
/>
`,
};
