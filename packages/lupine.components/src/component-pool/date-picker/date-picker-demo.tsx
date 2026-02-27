import { DatePicker, DatePickerProps } from './date-picker';
import { DemoStory } from '../../demo/demo-types';

export const datePickerDemo: DemoStory<DatePickerProps> = {
  id: 'datePickerDemo',
  text: 'DatePicker',
  args: {
    value: '2026-02-24',
    placeholder: 'Pick a date',
    yearRange: 10,
  },
  argTypes: {
    value: { control: 'text', description: 'Initial date value (YYYY-MM-DD)' },
    placeholder: { control: 'text' },
    yearRange: { control: 'number', description: 'Years +/- to show in menu' },
  },
  render: (args: any) => {
    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '400px' }}>
        <section>
          <div class='section-title'>Interactive Date Selection</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Click the input to open the calendar. Use the header to change year/month. Double-click a date or click OK
            to confirm.
          </p>
          <DatePicker {...args} onChange={(val) => console.log('Date changed:', val)} />
        </section>

        <section>
          <div class='section-title'>Presets</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <DatePicker value='1990-01-01' style={{ width: '150px' }} />
            <DatePicker value='2030-12-31' style={{ width: '150px' }} />
          </div>
        </section>
      </div>
    );
  },
  code: `import { DatePicker } from 'lupine.components/component-pool';

<DatePicker 
  value="2026-02-24" 
  onChange={(val) => console.log(val)} 
  placeholder="Select date"
  yearRange={10}
/>
`,
};
