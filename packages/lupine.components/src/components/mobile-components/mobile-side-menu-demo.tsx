import { CssProps } from 'lupine.web';
import { DemoStory } from '../../demo/demo-types';
import { MobileSideMenu, MobileSideMenuHelper } from './mobile-side-menu';
import { SideMenuMock } from '../../demo/mock/side-menu-mock';

export const mobileSideMenuDemo: DemoStory<any> = {
  id: 'mobile-side-menu-demo',
  text: 'Mobile Side Menu',
  args: {},
  argTypes: {},
  render: () => {
    const css: CssProps = {
      '.demo-content': {
        padding: '20px',
        textAlign: 'center',
      },
    };

    return (
      <div css={css} style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div class='demo-content'>
          <h3>Mobile Side Menu Demo</h3>
          <p>You can open the menu by clicking the button below,</p>
          <p>
            <strong>OR by swiping from the left edge of the screen to the right.</strong>
          </p>
          <button class='button-base' onClick={() => MobileSideMenuHelper.show()}>
            Open Side Menu
          </button>
        </div>

        {/* The MobileSideMenu component wrapper */}
        <MobileSideMenu>
          <SideMenuMock />
        </MobileSideMenu>
      </div>
    );
  },
  code: `// Show using method:
MobileSideMenuHelper.show();

<MobileSideMenu>
  {/* Add your custom content directly here */}
  <div>My Menu Content</div>
</MobileSideMenu>
`,
};
