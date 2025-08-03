import { VNode, CssProps, getWebVersion } from 'lupine.web';
import { MediaQueryMaxWidth } from '../styles';
import { MenuBar } from '../components';

export interface MenuBarMenuProps {
  text: string;
  url: string;
}
export const DesktopFrame = async (
  placeholderClassname: string,
  vnode: VNode<any>,
  title: string,
  footerTitle: string,
  logoUrl: string,
  menu: MenuBarMenuProps[]
) => {
  const cssContainer: CssProps = {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    'min-height': '100%',
    'overflow-y': 'auto',
    '.content-block': {
      display: 'flex',
      flex: '1',
      margin: 'auto',
      maxWidth: MediaQueryMaxWidth.DesktopMax,
      width: '100%',
    },
    '.top-footer': {
      paddingTop: '16px',
    },
    '.header-box': {
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
      'min-height': '100%',
      'overflow-y': 'auto',
      '.content-block': {
        display: 'flex',
        flex: '1',
        margin: 'auto',
        maxWidth: MediaQueryMaxWidth.DesktopMax,
        width: '100%',
      },
      '.top-footer': {
        paddingTop: '16px',
      },
    },
    '.footer-box': {
      display: 'flex',
      padding: '0 32px 16px',
      '.footer-cp': {
        padding: '1px 15px',
        margin: 'auto',
      },
    },
  };

  return (
    <div css={cssContainer}>
      <div class='header-box'>
        <div class='logo-box'>
          <img class='logo' src={logoUrl} />
        </div>
        <div class='header-title'>
          {title}
          <div class='header-subtitle pt-s'>{'ver: ' + getWebVersion()}</div>
        </div>
      </div>
      <MenuBar items={menu} maxWidthMobileMenu={'800px'} maxWidth={MediaQueryMaxWidth.DesktopMax}></MenuBar>
      <div class={'content-block ' + placeholderClassname}>{vnode}</div>
      <div class='top-footer'>
        <div class='footer-box'>
          <div class='footer-cp'>{footerTitle}</div>
        </div>
      </div>
    </div>
  );
};
