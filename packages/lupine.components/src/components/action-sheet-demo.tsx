import { DemoStory } from '../demo/demo-types';
import {
  ActionSheet,
  ActionSheetSelect,
  ActionSheetMessage,
  ActionSheetInput,
  ActionSheetSelectOptionsProps,
} from './action-sheet';
import { ActionSheetTimePicker } from './action-sheet-time';
import { ActionSheetDatePicker } from './action-sheet-date';
import { ActionSheetColorPicker } from './action-sheet-color';
import { Button, ButtonSize } from './button';

export const actionSheetDemo: DemoStory<any> = {
  id: 'action-sheet-demo',
  text: 'Action Sheet Demo',
  args: {
    title: 'Select an Action',
    confirmButtonText: 'Confirm Option',
    cancelButtonText: 'Cancel Action',
  },
  argTypes: {
    title: { control: 'text', description: 'Title of the action sheet' },
    confirmButtonText: { control: 'text', description: 'Confirm button text' },
    cancelButtonText: { control: 'text', description: 'Cancel button text' },
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <Button
          text='Show Simple Action Sheet'
          size={ButtonSize.Medium}
          onClick={() => {
            ActionSheet.show({
              title: args.title,
              children: <div style={{ padding: '20px' }}>Custom Content Here</div>,
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText,
              handleConfirmClicked: (close) => close('confirm'),
            });
          }}
        />
        <Button
          text='Show Action Sheet Select'
          size={ButtonSize.Medium}
          onClick={() => {
            ActionSheetSelect.show({
              title: args.title,
              options: ['Option A', 'Option B', 'Option C'],
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText,
              handleClicked: (index, close) => {
                console.log('Selected index:', index);
                close('select');
              },
            });
          }}
        />
        <Button
          text='Show Action Sheet Message'
          size={ButtonSize.Medium}
          onClick={() => {
            ActionSheetMessage.show({
              title: args.title,
              message: 'This is a detailed message shown inside the action sheet.',
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText,
            });
          }}
        />
        <Button
          text='Show Action Sheet Input'
          size={ButtonSize.Medium}
          onClick={() => {
            ActionSheetInput.show({
              title: args.title,
              defaultValue: 'Default text',
              confirmButtonText: args.confirmButtonText,
              cancelButtonText: args.cancelButtonText,
              handleConfirmValue: (val, close) => {
                console.log('Input value:', val);
                close('confirm');
              },
            });
          }}
        />
        <Button
          text='Show Time Picker (HH:mm)'
          size={ButtonSize.Medium}
          onClick={async () => {
            const result = await ActionSheetTimePicker({
              title: 'Pick a time',
              value: '09:30',
              showSeconds: false,
            });
            if (result) console.log('Time selected (HH:mm):', result);
          }}
        />
        <Button
          text='Show Time Picker (HH:mm:ss)'
          size={ButtonSize.Medium}
          onClick={async () => {
            const result = await ActionSheetTimePicker({
              title: 'Pick a time',
              value: '14:05:30',
              showSeconds: true,
            });
            if (result) console.log('Time selected (HH:mm:ss):', result);
          }}
        />
        <Button
          text='Show Date Picker (Year-Month-Day)'
          size={ButtonSize.Medium}
          onClick={async () => {
            const result = await ActionSheetDatePicker({
              title: 'Pick a date',
              value: '2026-02-24',
              order: 'YMD',
            });
            if (result) console.log('Date selected (YMD):', result);
          }}
        />
        <Button
          text='Show Date Picker (Day-Month-Year)'
          size={ButtonSize.Medium}
          onClick={async () => {
            const result = await ActionSheetDatePicker({
              title: 'Pick a date',
              value: '2026-02-24',
              order: 'DMY',
            });
            if (result) console.log('Date selected (DMY):', result);
          }}
        />
        <Button
          text='Show Color Picker'
          size={ButtonSize.Medium}
          onClick={async () => {
            const result = await ActionSheetColorPicker({
              title: 'Pick a color',
              value: '#4080ff',
            });
            if (result) console.log('Color selected:', result);
          }}
        />
      </div>
    );
  },
  code: `import { ActionSheet, ActionSheetSelect, ActionSheetMessage, ActionSheetInput } from 'lupine.components/components/action-sheet';

// Simple Action Sheet
ActionSheet.show({
  title: 'Select an Action',
  children: <div style={{ padding: '20px' }}>Custom Content Here</div>,
  confirmButtonText: 'Confirm Option',
  cancelButtonText: 'Cancel Action',
  handleConfirmClicked: (close) => close('confirm'),
});

// Action Sheet Select
ActionSheetSelect.show({
  title: 'Select an Action',
  options: ['Option A', 'Option B', 'Option C'],
  handleClicked: (index, close) => close('select'),
});
`,
};
