import { DemoStory } from '../demo/demo-types';
import { NotificationMessage, NotificationColor } from './notice-message';
import { Button, ButtonSize } from './button';

export const noticeMessageDemo: DemoStory<any> = {
  id: 'notice-message-demo',
  text: 'Notice Message Demo',
  args: {
    message: 'Action completed successfully!',
    permanent: false,
    showTime: 3000,
  },
  argTypes: {
    message: { control: 'text', description: 'Message content' },
    permanent: { control: 'boolean', description: 'If true, stays until manually closed' },
    showTime: { control: 'number', description: 'Time in ms to show (if not permanent)' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          text='Show Info'
          size={ButtonSize.Medium}
          onClick={() =>
            NotificationMessage.sendMessage(args.message, NotificationColor.Info, args.permanent, args.showTime)
          }
        />
        <Button
          text='Show Success'
          size={ButtonSize.Medium}
          onClick={() =>
            NotificationMessage.sendMessage(args.message, NotificationColor.Success, args.permanent, args.showTime)
          }
        />
        <Button
          text='Show Warning'
          size={ButtonSize.Medium}
          onClick={() =>
            NotificationMessage.sendMessage(args.message, NotificationColor.Warning, args.permanent, args.showTime)
          }
        />
        <Button
          text='Show Error'
          size={ButtonSize.Medium}
          onClick={() =>
            NotificationMessage.sendMessage(args.message, NotificationColor.Error, args.permanent, args.showTime)
          }
        />
      </div>
    );
  },
  code: `import { NotificationMessage, NotificationColor } from 'lupine.components/components/notice-message';

// Show Info
NotificationMessage.sendMessage('Action completed successfully!', NotificationColor.Info);

// Show Success (permanent)
NotificationMessage.sendMessage('Action completed successfully!', NotificationColor.Success, true);
`,
};
