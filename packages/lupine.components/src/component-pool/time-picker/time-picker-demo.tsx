import { TimePicker, TimePickerProps } from './time-picker';
import { DemoStory } from '../../demo/demo-types';
import { ActionSheetTimePicker } from '../../components/action-sheet-time';
import { Button, ButtonSize } from '../../components/button';

export const timePickerDemo: DemoStory<TimePickerProps> = {
  id: 'timePickerDemo',
  text: 'TimePicker',
  args: {
    value: '14:30:00',
    placeholder: 'Pick a time',
  },
  argTypes: {
    value: { control: 'text', description: 'Initial time value (HH:mm:ss)' },
    placeholder: { control: 'text' },
  },
  render: (args: any) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '400px' }}>
        <section>
          <div class='section-title'>Interactive Time Selection</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Click the input to open the 3-column selector. Double-click an item or click OK to confirm.
          </p>
          <TimePicker {...args} onChange={(val) => console.log('Time changed:', val)} />
        </section>

        <section>
          <div class='section-title'>Standalone Usage</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <TimePicker value='09:00:00' style={{ width: '150px' }} />
            <TimePicker value='18:45:30' style={{ width: '150px' }} />
          </div>
        </section>

        <section>
          <div class='section-title'>Mobile Friendly Alternative</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            For mobile environments, it is highly recommended to use the ActionSheet-based Time Picker, which provides a
            native-like bottom-sheet spinning wheel experience.
          </p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
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
          </div>
        </section>
      </div>
    );
  },
  code: `import { TimePicker } from 'lupine.components/component-pool';

<TimePicker 
  value="14:30:00" 
  onChange={(val) => console.log(val)} 
  placeholder="Select time"
/>
`,
};
