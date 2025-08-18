import { MenuBar, MediaQueryMaxWidth, webSetting, VNode, CssProps } from 'lupine.components';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

const defaultTopMenu = [
  { id: 'home', text: 'Home', url: '/' },
  { id: 'manage-list', text: 'Manage List', url: '/admin/music-list' },
  { id: 'manage-users', text: 'Manage Users', url: '/admin/user' },
  { id: 'manage-website', text: 'Manage Website', url: '/admin/cfg' },
];

export const AdminPageFrame = async (placeholderClassname: string, vnode: VNode<any>) => {
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
  };

  return (
    <div css={cssContainer}>
      <Header title='Admin Page (Lupine.Dev)'></Header>
      <MenuBar items={defaultTopMenu} maxWidthMobileMenu={'800px'} maxWidth={MediaQueryMaxWidth.DesktopMax}></MenuBar>
      <div class={'content-block ' + placeholderClassname}>{vnode}</div>
      <div class='top-footer'>
        <Footer title={webSetting('footer', `Copyright© 2024 <a href='/'>lupine.dev</a>. All Rights Reserved.`)}></Footer>
      </div>
    </div>
  );
};
