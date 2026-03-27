import { DemoStory } from '../demo/demo-types';
import { NotificationMessage, NotificationColor, NotificationLocation, notificationColorFromValue } from './notice-message';
import { Button, ButtonSize } from './button';

export const noticeMessageDemo: DemoStory<any> = {
  id: 'notice-message-demo',
  text: 'Notice Message Demo',
  args: {
    message: 'Action completed successfully!',
    type: 'Info',
    location: 'top-right',
    permanent: false,
    showTime: 3000,
  },
  argTypes: {
    message: { control: 'text', description: 'Message content' },
    type: { control: 'select', options: ['Info', 'Success', 'Warning', 'Error'], description: 'Notification type' },
    location: { control: 'select', options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'], description: 'Notification location' },
    permanent: { control: 'boolean', description: 'If true, stays until manually closed' },
    showTime: { control: 'number', description: 'Time in ms to show (if not permanent)' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          text='Show Notification'
          size={ButtonSize.Medium}
          onClick={() =>
            NotificationMessage.show({
              message: args.message,
              location: args.location as NotificationLocation,
              backgroundColor: notificationColorFromValue(args.type),
              permanent: args.permanent,
              showTime: args.showTime,
            })
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

// Show via detailed object with Location
NotificationMessage.show({
  message: 'Bottom Center Message',
  location: 'bottom-center',
  backgroundColor: NotificationColor.Warning,
  showTime: 3000
});
`,
};
