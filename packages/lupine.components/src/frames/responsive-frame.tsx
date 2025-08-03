import { VNode, CssProps, MediaQueryRange } from 'lupine.components';
import { MobileFooterMenu, MobileFooterMenuItemProps } from '../components/mobile-components/mobile-footer-menu';
import { Footer } from '../components/footer';
import { DesktopTopMenu } from '../components/desktop-top-menu';
import { MobileHeaderComponent } from '../components/mobile-components/mobile-header-component';
import { webConfig } from '../services/web-config';

export const ResponsiveFrame = async (
  placeholderClassname: string,
  vnode: VNode<any>,
  bottomMenu: MobileFooterMenuItemProps[]
) => {
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
      // height: '72px',
      // position: 'fixed',
      // left: 0,
      // top: 0,
      // zIndex: 'var(--layer-menu)',
      backgroundColor: 'var(--activatable-bg-color-normal)',
    },
    '.frame-content': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      // paddingTop: '100px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        height: '0',
      },
    },
    '.content-block': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    '.content-block .padding-block': {
      padding: '0 16px',
    },
    // '.frame-footer': {
    //   paddingTop: '57px', // 应该和底部菜单的高度一致
    // },
    [MediaQueryRange.TabletBelow]: {
      // .header-box,
      '.frame-footer .footer-box, .frame-top-menu .desktop-menu-box': {
        display: 'none',
      },
      // '.content-block': {
      //   paddingBottom: '16px',
      // },
      '.metronome-page-box, .gauge-box': {
        boxShadow: '#313131 2.02px 2.02px 5.08px 1px !important',
      },
    },
  };

  return (
    <div css={cssContainer} class='responsive-frame'>
      <div class='frame-top-menu'>
        <DesktopTopMenu title={webConfig.getSiteTitle()}></DesktopTopMenu>
        <MobileHeaderComponent></MobileHeaderComponent>
      </div>
      <div class='frame-content'>
        <div class={'content-block ' + placeholderClassname}>{vnode}</div>
        <div class='frame-footer'>
          <Footer title={webConfig.getSiteFooter()}></Footer>
          <MobileFooterMenu items={bottomMenu}></MobileFooterMenu>
        </div>
      </div>
    </div>
  );
};
