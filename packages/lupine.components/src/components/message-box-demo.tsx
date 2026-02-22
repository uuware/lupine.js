import { NotificationColor, NotificationMessage } from 'lupine.components';
import { DemoStory } from '../demo/demo-types';
import { MessageBox, MessageBoxButtonProps } from './message-box';
import { Button, ButtonSize } from './button';

export const messageBoxDemo: DemoStory<any> = {
  id: 'message-box-demo',
  text: 'MessageBox Demo',
  args: {
    title: 'System Alert',
    contentMinWidth: '300px',
  },
  argTypes: {
    title: { control: 'text', description: 'Title of the MessageBox' },
    contentMinWidth: { control: 'text', description: 'Minimum width of MessageBox' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: '#666', marginBottom: '20px' }}>Test different button configurations for MessageBox.</p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            text='Yes / No Dialog'
            size={ButtonSize.Medium}
            onClick={() => {
              MessageBox.show({
                title: args.title,
                buttonType: MessageBoxButtonProps.YesNo,
                contentMinWidth: args.contentMinWidth,
                children: <div style={{ padding: '20px' }}>Are you sure you want to proceed?</div>,
                handleClicked: (index, close) => {
                  const result = index === 0 ? 'Yes' : 'No';
                  NotificationMessage.sendMessage('You clicked: ' + result, NotificationColor.Info);
                  close();
                },
              });
            }}
          />

          <Button
            text='Ok / Cancel Dialog'
            size={ButtonSize.Medium}
            onClick={() => {
              MessageBox.show({
                title: args.title,
                buttonType: MessageBoxButtonProps.OkCancel,
                contentMinWidth: args.contentMinWidth,
                children: <div style={{ padding: '20px' }}>Please confirm this action.</div>,
                handleClicked: (index, close) => {
                  const result = index === 0 ? 'OK' : 'Cancel';
                  const level = index === 0 ? NotificationColor.Success : NotificationColor.Warning;
                  NotificationMessage.sendMessage('You clicked: ' + result, level);
                  close();
                },
              });
            }}
          />

          <Button
            text='Ok Only'
            size={ButtonSize.Medium}
            onClick={() => {
              MessageBox.show({
                title: args.title,
                buttonType: MessageBoxButtonProps.Ok,
                contentMinWidth: args.contentMinWidth,
                children: <div style={{ padding: '20px' }}>Operation completed successfully!</div>,
                handleClicked: (index, close) => {
                  NotificationMessage.sendMessage('Dialog dismissed', NotificationColor.Success);
                  close();
                },
              });
            }}
          />
        </div>
      </div>
    );
  },
  code: `import { MessageBox, MessageBoxButtonProps } from 'lupine.components/components/message-box';

// Quick Alert
MessageBox.show({
  title: 'System Alert',
  buttonType: MessageBoxButtonProps.Ok,
  children: <div style={{ padding: '20px' }}>Operation completed successfully!</div>,
  handleClicked: (index, close) => {
    close();
  }
});

// Confirmation Dialog
MessageBox.show({
  title: 'Confirm Action',
  buttonType: MessageBoxButtonProps.OkCancel,
  children: <div style={{ padding: '20px' }}>Are you sure you want to proceed?</div>,
  handleClicked: (index, close) => {
    if (index === 0) {
      console.log('User clicked OK');
    } else {
      console.log('User clicked Cancel');
    }
    close();
  }
});
`,
};
