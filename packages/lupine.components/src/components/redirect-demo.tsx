import { DemoStory } from '../demo/demo-types';
import { Redirect, RedirectProps } from './redirect';

export const redirectDemo: DemoStory<RedirectProps> = {
  id: 'redirect-demo',
  text: 'Redirect Demo',
  args: {
    title: 'Redirecting you soon...' + new Date().toISOString(),
    url: '#test-redirect',
    delaySeconds: 3,
  },
  argTypes: {
    title: { control: 'text', description: 'Text shown while waiting' },
    url: { control: 'text', description: 'URL to redirect to' },
    delaySeconds: { control: 'number', description: 'Delay before redirecting' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          This component automatically changes the `window.location.href` after the specified delay. In this demo, the
          iframe will redirect itself to `{args.url}` after {args.delaySeconds} seconds.
        </p>
        <Redirect {...args} />
      </div>
    );
  },
};
