import { DemoStory } from '../../demo/demo-types';
import { Breadcrumbs, BreadcrumbsProps } from './breadcrumbs';
import { SvgSvg, SvgPath } from '../svg-props';

const HomeIcon = () => (
  <SvgSvg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
  >
    <SvgPath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
    <SvgPath d='M9 22V12h6v10' />
  </SvgSvg>
);

const FolderIcon = () => (
  <SvgSvg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
  >
    <SvgPath d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' />
  </SvgSvg>
);

export const breadcrumbsDemo: DemoStory<BreadcrumbsProps> = {
  id: 'breadcrumbs',
  text: 'Breadcrumbs',
  args: {
    autoCollapse: true,
    items: [],
  },
  argTypes: {
    autoCollapse: { control: 'boolean', description: 'Automatically collapse middle items on overflow' },
  },
  render: (args) => {
    const longItems = [
      { text: 'Home', url: '/', icon: <HomeIcon /> },
      { text: 'Settings', url: '/settings', icon: <FolderIcon /> },
      { text: 'Account Profile', url: '/account' },
      { text: 'Security Preferences', url: '/security' },
      { text: 'Two-Factor Auth', url: '/2fa' },
      { text: 'Active Sessions' },
    ];

    const shortItems = [{ text: 'Dashboard', url: '/dashboard' }, { text: 'Overview' }];

    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>Auto-Collapsing Long Breadcrumbs</h3>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
            Scale the window (or iframe) down to see the middle sections collapse into an ellipsis `...`
          </p>
          <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <Breadcrumbs items={longItems} autoCollapse={args.autoCollapse} />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '20px' }}>Short Breadcrumbs</h3>
          <div style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <Breadcrumbs items={shortItems} autoCollapse={args.autoCollapse} />
          </div>
        </div>
      </div>
    );
  },
  code: `import { Breadcrumbs } from 'lupine.components/component-pool';

const items = [
  { text: 'Home', url: '/' },
  { text: 'Settings', url: '/settings' },
  { text: 'Account Profile', url: '/account' },
  { text: 'Active Sessions' }, // Last item is automatically rendered as current page
];

// Automatically handles overflow and collapse logic naturally via container ResizeObserver
<Breadcrumbs items={items} autoCollapse={true} />
`,
};
