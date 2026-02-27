import { DemoStory } from '../../demo/demo-types';
import { FloatingIconMenu } from './floating-icon-menu';
import { NotificationMessage, NotificationColor } from '../../components/notice-message';

const showMsg = (msg: string) => {
  NotificationMessage.sendMessage(msg, NotificationColor.Success);
};

export const floatingIconMenuMainBtnMock = {
  icon: 'ma-add',
  url: '',
  text: 'Options',
};

export const floatingIconMenuOptionsMock = [
  {
    icon: 'ma-home-outline',
    url: '#/home',
    text: 'Home',
    js: () => showMsg('Navigated to Home!'),
  },
  {
    icon: 'ma-tools',
    url: '#/tools',
    text: 'Tools',
    js: () => showMsg('Opened Tools!'),
  },
  {
    icon: 'co-cil-chat-bubble',
    url: '#/chat',
    text: 'Chat',
    js: () => showMsg('Chat Support Selected!'),
  },
  {
    icon: 'ma-crown-outline',
    url: '#/vip',
    text: 'VIP',
    js: () => showMsg('VIP Lounge!'),
  },
];

export const floatingIconMenuDemo: DemoStory<any> = {
  id: 'floating-icon-menu-demo',
  text: 'Floating Icon Menu',
  args: {
    top: '',
    bottom: '20px',
    left: '',
    right: '20px',
    direction: 'up',
  },
  argTypes: {
    top: { control: 'text' },
    bottom: { control: 'text' },
    left: { control: 'text' },
    right: { control: 'text' },
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
    },
  },
  render: (args: any) => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ padding: '20px' }}>
          <h3>Floating Action Menu Demo</h3>
          <p>
            Use the controls in the <strong>Props</strong> panel to adjust the position (`top`, `bottom`, `left`,
            `right`) and the popup `direction` (`up`, `down`, `left`, `right`).
          </p>
          <p style={{ color: 'var(--secondary-text-color)' }}>
            Note: This component uses `position: fixed`, so it will appear at the specified coordinates of your
            <strong>entire browser viewport</strong> regardless of scrolling.
          </p>
          <p style={{ color: 'var(--danger-color, #ff4d4f)' }}>
            <strong>Important:</strong> If you set `top` or `left`, you should typically clear the default `bottom` or
            `right` values to avoid CSS conflicts.
          </p>
        </div>

        {/* Interactive Menu based on props */}
        <FloatingIconMenu
          mainIcon={{ ...floatingIconMenuMainBtnMock, text: args.direction || 'Options' }}
          items={floatingIconMenuOptionsMock}
          top={args.top || undefined}
          bottom={args.bottom || undefined}
          left={args.left || undefined}
          right={args.right || undefined}
          direction={args.direction}
        />
      </div>
    );
  },
};
