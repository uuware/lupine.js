/* ResponsiveFrame for desktop and mobile
sliderFrameHook is for slider frame from right or bottom used in side-menu
*/

import { VNode, CssProps, MediaQueryRange, SliderFrameHookProps, SliderFrame } from 'lupine.components';
import { MobileFooterMenu } from '../components/mobile-components/mobile-footer-menu';
import { DesktopFooter } from '../components/desktop-footer';
import { DesktopHeader } from '../components/desktop-header';
import { MobileHeaderComponent } from '../components/mobile-components/mobile-header-component';
import { MobileSideMenu } from '../components/mobile-components/mobile-side-menu';
import { IconMenuItemProps } from '../components/mobile-components/icon-menu-item-props';

export interface ResponsiveFrameProps {
  placeholderClassname: string;
  mainContent: VNode<any>;
  desktopHeaderTitle: string;
  desktopFooterTitle: string;
  desktopTopMenu: IconMenuItemProps[];
  mobileBottomMenu: IconMenuItemProps[];
  mobileSideMenuContent: VNode<any>;
  sliderFrameHook: SliderFrameHookProps;
}
export const ResponsiveFrame = async (props: ResponsiveFrameProps) => {
  const cssContainer: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    '.frame-top-menu': {
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      backgroundColor: 'var(--activatable-bg-color-normal)',
    },
    '.frame-content': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.content-block': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    '.content-block::-webkit-scrollbar': {
      display: 'none',
    },
    '.content-block .padding-block': {
      padding: '0 16px',
    },
    [MediaQueryRange.TabletBelow]: {
      '.frame-footer .footer-box, .frame-top-menu .desktop-menu-box': {
        display: 'none',
      },
    },
  };

  return (
    <div css={cssContainer} class='responsive-frame'>
      <SliderFrame hook={props.sliderFrameHook} />
      <div class='frame-top-menu'>
        <DesktopHeader title={props.desktopHeaderTitle} items={props.desktopTopMenu}></DesktopHeader>
        <MobileHeaderComponent></MobileHeaderComponent>
      </div>
      <div class='frame-content'>
        <MobileSideMenu>{props.mobileSideMenuContent}</MobileSideMenu>
        <div class={'content-block ' + props.placeholderClassname}>{props.mainContent}</div>
        <div class='frame-footer'>
          <DesktopFooter title={props.desktopFooterTitle}></DesktopFooter>
          <MobileFooterMenu items={props.mobileBottomMenu}></MobileFooterMenu>
        </div>
      </div>
    </div>
  );
};
