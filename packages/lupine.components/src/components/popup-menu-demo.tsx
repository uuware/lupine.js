import { DemoStory } from '../demo/demo-types';
import {
  PopupMenuWithButton,
  PopupMenuWithLabel,
  PopupMenuWithIcon,
  ContentMenu,
  ContentMenuPosition,
} from './popup-menu';
import { RefProps } from 'lupine.web';

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
    const ref: RefProps = {};
    const list = ['Edit Profile', 'Settings', '-', 'Log Out'];

    const handleShowMenu = (e: MouseEvent, list: any[], options: any = {}) => {
      const target = e.currentTarget as HTMLElement;
      ContentMenu.show(target, list, options);
    };

    const listWithIcons = [
      { text: 'Profile', icon: 'ma-account-cog-outline', id: '1', url: '' },
      { text: 'Messages', icon: 'co-cil-chat-bubble', id: '2', url: '' },
      '-',
      { text: 'Settings', icon: 'ma-tools', id: '3', url: '' },
      { text: 'Logout', icon: 'ma-logout', id: '4', url: '' },
    ];

    const listMixedIcons = [
      { text: 'Cut', icon: 'ma-close', id: '1', url: '' }, // reusing close icon as placeholder for demo
      { text: 'Copy', id: '2', url: '' }, // No icon, should align with text above
      { text: 'Paste', icon: 'ma-home-outline', id: '3', url: '' },
      '-',
      { text: 'Select All', id: '4', url: '' },
    ];

    const listTextOnly = ['Option 1', 'Option 2', '-', 'Option 3', 'Option 4'];
    const longList = Array.from({ length: 30 }, (_, i) => `Menu Item ${i + 1}`);

    const showPositionDemo = (e: MouseEvent) => {
      const position = (ref.$('.&-position-select') as HTMLSelectElement).value as ContentMenuPosition;
      handleShowMenu(e, listWithIcons, { position });
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      ContentMenu.show(null, listMixedIcons, { x: e.clientX, y: e.clientY });
    };
    const simpleList = ['Edit Profile', 'Settings', '', 'Log Out'];
    return (
      <div style={{ padding: '20px', display: 'flex', gap: '40px', alignItems: 'flex-start', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div>
            <h3>With Button</h3>
            <PopupMenuWithButton
              label={args.label}
              list={simpleList}
              defaultValue={args.defaultValue}
              align={args.align}
              handleSelected={(val: string) => console.log('Selected:', val)}
            />
          </div>

          <div>
            <h3>With Label</h3>
            <PopupMenuWithLabel
              label={args.label}
              list={simpleList}
              defaultValue={args.defaultValue}
              align={args.align}
            />
          </div>

          <div>
            <h3>With Icon</h3>
            <PopupMenuWithIcon
              list={simpleList}
              defaultValue={args.defaultValue}
              align={args.align}
              icon={<i class='ifc-icon ma-account-cog-outline'></i>}
            />
          </div>
        </div>
        <div class='padding-top-l'>
          <hr />
          <h3 class='margin-top-l'>ContentMenu Component API Usage</h3>
          <p>
            The <code>ContentMenu</code> class allows triggering menus from anywhere, including context menus.
          </p>

          <div ref={ref} class='row-box' style={{ gap: '10px' }}>
            <select class='&-position-select padding-s'>
              <option value='auto'>Auto</option>
              <option value='bottom'>Bottom</option>
              <option value='top'>Top</option>
              <option value='left'>Left</option>
              <option value='right'>Right</option>
            </select>
            <button class='button-base primary' onClick={showPositionDemo}>
              Show Positional Menu
            </button>
          </div>

          <div class='row-box' style={{ gap: '10px', marginTop: '20px' }}>
            <button
              class='button-base primary'
              onClick={(e) => handleShowMenu(e, listWithIcons, { position: 'bottom' })}
            >
              All Icons
            </button>

            <button
              class='button-base primary'
              onClick={(e) => handleShowMenu(e, listMixedIcons, { position: 'bottom' })}
            >
              Mixed Icons (Alignment Test)
            </button>

            <button
              class='button-base primary'
              onClick={(e) => handleShowMenu(e, listTextOnly, { position: 'bottom' })}
            >
              Text Only
            </button>
            <button class='button-base primary' onClick={(e) => handleShowMenu(e, longList, { position: 'bottom' })}>
              Long List (Scroll Test)
            </button>
          </div>

          <div
            class='padding-l margin-top-l'
            style={{ border: '2px dashed var(--secondary-border-color)', textAlign: 'center', cursor: 'context-menu' }}
            onContextMenu={handleContextMenu}
          >
            Right Click Me to trigger Context Menu!
          </div>
        </div>
      </div>
    );
  },
  code: `import { PopupMenuWithButton, PopupMenuWithLabel, PopupMenuWithIcon } from 'lupine.components/components/popup-menu';

const list = ['Edit Profile', 'Settings', '', 'Log Out'];

{/* With Button */}
<PopupMenuWithButton
  label="Actions"
  list={list}
  defaultValue="Select..."
  align="right"
  handleSelected={(val: string) => console.log('Selected:', val)}
/>

{/* With Icon */}
<PopupMenuWithIcon
  list={list}
  icon={<span style={{ fontSize: '24px' }}>⚙️</span>}
/>
`,
};
