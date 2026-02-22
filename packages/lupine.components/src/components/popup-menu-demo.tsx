import { DemoStory } from '../demo/demo-types';
import { PopupMenuWithButton, PopupMenuWithLabel, PopupMenuWithIcon } from './popup-menu';

export const popupMenuDemo: DemoStory<any> = {
  id: 'popup-menu-demo',
  text: 'Popup Menu Demo',
  args: {
    label: 'Actions',
    defaultValue: 'Select...',
    align: 'right',
  },
  argTypes: {
    label: { control: 'text', description: 'Label for button/text triggers' },
    defaultValue: { control: 'text', description: 'Default selected text' },
    align: { control: 'select', options: ['left', 'right'], description: 'Menu drop alignment' },
  },
  render: (args) => {
    const list = ['Edit Profile', 'Settings', '', 'Log Out'];
    return (
      <div style={{ padding: '20px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div>
          <h3>With Button</h3>
          <PopupMenuWithButton
            label={args.label}
            list={list}
            defaultValue={args.defaultValue}
            align={args.align}
            handleSelected={(val: string) => console.log('Selected:', val)}
          />
        </div>

        <div>
          <h3>With Label</h3>
          <PopupMenuWithLabel label={args.label} list={list} defaultValue={args.defaultValue} align={args.align} />
        </div>

        <div>
          <h3>With Icon</h3>
          <PopupMenuWithIcon
            list={list}
            defaultValue={args.defaultValue}
            align={args.align}
            icon={<span style={{ fontSize: '24px' }}>⚙️</span>}
          />
        </div>
      </div>
    );
  },
};
