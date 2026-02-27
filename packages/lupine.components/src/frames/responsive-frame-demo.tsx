import { CssProps } from 'lupine.web';
import { DemoStory } from '../demo/demo-types';
import {
  HtmlVar,
  MobileHeaderCenter,
  MobileHeaderEmptyIcon,
  MobileHeaderTitleIcon,
  MobileTopSysIcon,
} from '../components';
import { ResponsiveFrame } from './responsive-frame';
import { SideMenuMock } from '../demo/mock/side-menu-mock';
import { SliderFrame, SliderFrameHookProps } from './slider-frame';
import { UserSettingsMock } from '../demo/mock/user-settings-mock';

/*
 * NOTE ON ROUTING IN LUPINE.JS
 * In a real application, you would configure a `PageRouter` at your app's entry point to map URLs to page components.
 * Menu items would then be navigated via their `href` properties. The advantage of this approach is that the browser URL updates,
 * allowing users to bookmark and refresh specific pages normally.
 *
 * However, because this is a single isolated Demo Page designed to showcase various components simultaneously,
 * we use an `HtmlVar` to dynamically swap the main content in place. While this means the URL remains static
 * (and a page refresh will reset to the initial Home view), it is ideal for demonstrating component behavior without requiring full routing setup.
 */
import { HomePage, CustomerPage, MemberPage } from '../demo/mock/responsive-demo-mock-pages';
import { PagingLinkPage } from '../components/paging-link-demo';

export const responsiveFrameDemo: DemoStory<any> = {
  id: 'responsive-frame-demo',
  text: 'Responsive Frame',
  args: {
    slideDirection: 'right',
  },
  argTypes: {
    slideDirection: {
      control: 'select',
      options: ['right', 'bottom'],
    },
  },
  render: (args) => {
    const main = new HtmlVar(HomePage());
    const sliderFrameHook: SliderFrameHookProps = {};

    const mobileBottomMenu = [
      { icon: 'ma-home-outline', url: '#/', text: 'Home', js: () => (main.value = HomePage()) },
      { icon: 'bs-list', url: '#/list', text: 'List', js: () => (main.value = PagingLinkPage()) },
      {
        icon: 'co-cil-chat-bubble',
        url: '#/customer',
        text: 'Service',
        topout: true,
        js: () => (main.value = CustomerPage()),
      },
      { icon: 'ma-crown-outline', url: '#/member', text: 'VIP', js: () => (main.value = MemberPage()) },
      {
        icon: 'ma-account-cog-outline',
        url: '#/settings',
        text: 'Settings',
        js: () => {
          if (sliderFrameHook.load) {
            sliderFrameHook.load(<UserSettingsMock sliderFrameHook={sliderFrameHook} />);
          }
        },
      },
    ];

    const css: CssProps = {
      width: '100%',
      // We limit height carefully so it looks like an App screen within the Demo Container
      height: '600px',
      maxHeight: '100%',
      overflow: 'hidden', // to hide scrollbars bleeding out
      position: 'relative',
      // Responsive reset to see the desktop mode more easily without jumping huge breakpoints
      // But typically ResponsiveFrame handles its own media queries.
    };

    const mainContent = (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <MobileHeaderCenter>
          <MobileHeaderTitleIcon
            title='Responsive Frame Demo'
            left={<MobileHeaderEmptyIcon />}
            right={<MobileTopSysIcon />}
          />
        </MobileHeaderCenter>
        {main.node}
      </div>
    );
    const frame = ResponsiveFrame({
      placeholderClassname: 'demo-responsive-content',
      mainContent: mainContent,
      desktopHeaderTitle: 'Desktop Header',
      desktopFooterTitle: 'Desktop Footer (Hidden on Mobile)',
      desktopTopMenu: mobileBottomMenu,
      mobileBottomMenu: mobileBottomMenu,
      mobileSideMenuContent: <SideMenuMock />,
      sharedContents: (
        <>
          <SliderFrame hook={sliderFrameHook} direction={args.slideDirection} />
        </>
      ),
    });

    return <div css={css}>{frame}</div>;
  },
  code: `// Ensure MobileSideMenuHelper is accessible for touch events
MobileSideMenuHelper.addTouchEvent();

<ResponsiveFrame
  placeholderClassname="my-page-content"
  mainContent={<div>Content</div>}
  desktopHeaderTitle="My PC Site"
  desktopFooterTitle="Copyright 2025"
  desktopTopMenu={menuItems}
  mobileBottomMenu={menuItems}
  mobileSideMenuContent={<MySideMenu />}
  sharedContents={<div style={{ display: 'contents' }}></div>}
/>`,
};
