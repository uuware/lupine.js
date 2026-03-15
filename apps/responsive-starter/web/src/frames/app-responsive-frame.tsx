import { VNode } from 'lupine.web';
import { MediaQueryMaxWidth, ResponsiveFrame, SliderFrame, SliderFrameHookProps } from 'lupine.components';
import { SideMenuContent } from '../components/side-menu-content';

// Note: Replace with true site config loading if available
const getSiteTitle = async () => 'My Note App';
const getSiteFooter = async () => '© 2026 My Note App';

// 'sidemenu' | 'tabs', this will be replaced by create-lupine
const DEFAULT_LAYOUT = 'tabs';
export const AppResponsiveFrame = async (placeholderClassname: string, vnode: VNode<any>) => {
  const mobileBottomMenu = [
    { icon: 'ma-home-outline', url: '/', text: 'Notes' },
    { icon: 'icon-finance', url: '/finance', text: 'Finance' },
    { icon: 'ma-book-outline', url: '/about', text: 'About', topout: true },
    { icon: 'ma-tools', url: '/tools', text: 'Tools' },
    { icon: 'ma-account-cog-outline', url: '/mine', text: 'Mine' },
  ];

  const layout: 'sidemenu' | 'tabs' = (localStorage.getItem('app-layout') as any) || DEFAULT_LAYOUT;
  const sliderFrameHook: SliderFrameHookProps = {};

  return ResponsiveFrame({
    placeholderClassname,
    mainContent: vnode,
    desktopHeaderTitle: await getSiteTitle(),
    desktopFooterTitle: await getSiteFooter(),
    desktopTopMenu: layout === 'sidemenu' ? undefined : mobileBottomMenu,
    mobileBottomMenu: layout === 'sidemenu' ? undefined : mobileBottomMenu,
    sharedContents: (
      <>
        <SliderFrame hook={sliderFrameHook} />
      </>
    ),
    mobileSideMenuContent: (
      <SideMenuContent
        navItems={layout === 'sidemenu' ? mobileBottomMenu : undefined}
        settingSliderHook={sliderFrameHook}
        title='My Note App'
        footer='Powered by Lupine.js'
      />
    ),
    maxWidth: MediaQueryMaxWidth.DesktopMax,
    autoExtendSidemenu: layout === 'sidemenu',
  });
};
