import { Cascader } from './cascader';
import { DemoStory } from '../../demo/demo-types';

export const cascaderDemo: DemoStory<any> = {
  id: 'cascaderDemo',
  text: 'Cascader',
  args: {
    type: 'title',
    showCircle: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['title', 'ellipsis'],
    },
    showCircle: {
      control: 'boolean',
    },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '32px',
      maxWidth: '600px',
      margin: '0 auto',

      '.demo-section': {
        border: '1px solid var(--secondary-border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'var(--primary-bg-color)',
      },
      '.section-label': {
        padding: '16px',
        backgroundColor: 'var(--secondary-bg-color)',
        borderBottom: '1px solid var(--secondary-border-color)',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'var(--secondary-color)',
      },
    };

    return (
      <div css={css}>
        <section class='demo-section'>
          <div class='section-label'>Interactive Demo</div>
          <div style={{ padding: args.type === 'ellipsis' ? '12px' : '0' }}>
            <Cascader
              type={args.type}
              showCircle={args.showCircle}
              title='Interactive Cascader'
              description='Change the controls on the right to see this component update in real-time.'
              defaultOpen={true}
              key={`${args.type}-${args.showCircle}`}
            >
              <div style={{ padding: '10px', backgroundColor: 'var(--secondary-bg-color)', borderRadius: '4px' }}>
                <p>This section is dynamic!</p>
                <p>
                  Current Type: <strong>{args.type}</strong>
                </p>
                <p>
                  Show Circle: <strong>{args.showCircle ? 'Yes' : 'No'}</strong>
                </p>
              </div>
            </Cascader>
          </div>
        </section>

        <section class='demo-section'>
          <div class='section-label'>Accordion Group (Mixed Styles)</div>
          <Cascader
            title='Account Settings'
            description='Manage your profile and security'
            group='settings'
            showCircle={args.showCircle}
            defaultOpen={true}
            key={`s1-${args.showCircle}`}
          >
            <p>Username: Admin</p>
          </Cascader>
          <Cascader
            title='Privacy Policy'
            description='Learn how we handle your data'
            group='settings'
            showCircle={args.showCircle}
            key={`s2-${args.showCircle}`}
          >
            <p>Your privacy is important to us.</p>
          </Cascader>
        </section>

        <section class='demo-section'>
          <div class='section-label'>Ellipsis Mode (Inline Expand)</div>
          <div style={{ padding: '12px' }}>
            <Cascader
              type='ellipsis'
              showCircle={args.showCircle}
              key={`e1-${args.showCircle}`}
              description='Lupine.js is a lightweight, high-performance web framework designed for modern agent-centric applications. It provides a rich set of UI components and a robust state management system that works seamlessly across different environments. By leveraging reactive principles and a clean component model, Lupine.js allows developers to build complex user interfaces with minimal boilerplate code.'
            >
              <p>Additional details for the ellipsis item.</p>
            </Cascader>
          </div>
        </section>
      </div>
    );
  },
  code: `import { Cascader } from 'lupine.components/component-pool';

<Cascader 
  title="Account Settings" 
  description="Manage your profile"
  group="settings"
>
  <p>Content goes here...</p>
</Cascader>

<Cascader 
  type="ellipsis"
  description="Lupine.js is a lightweight, high-performance web framework..."
>
  <p>Expanded content</p>
</Cascader>
`,
};
