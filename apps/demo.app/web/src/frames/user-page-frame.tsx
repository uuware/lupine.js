import {
  MenuBar,
  LinkList,
  MediaQueryMaxWidth,
  VNode,
  CssProps,
  MediaQueryRange,
  HtmlLoad,
  WebConfig,
  HtmlVar,
} from 'lupine.components';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { getCookieUser } from '../services/shared-data';
import { FooterMenu } from '../components/footer-menu';

const defaultTopMenu = [
  { id: 'home', text: 'Home', url: '/' },
  { id: 'page1', text: 'Page1', url: '/user/page1/parameter1/fixed-section/parameter2/option1' },
  { id: 'page2', text: 'Page2', url: '/user/page2/parameterx/fixed-section/parametery/optionz' },
  { id: 'frame1', text: 'Frame1', url: '/frame1' },
  { id: 'frame1-1', text: 'Frame1-1', url: '/frame1/page1' },
  { id: 'frame2', text: 'Frame2', url: '/frame2' },
  { id: 'frame2-1', text: 'Frame2-1', url: '/frame2/page1' },
];

const defaultTopMenuUser = [
  { id: 'home', text: 'Home', url: '/' },
  { id: 'page1', text: 'Page1', url: '/user/page1/parameter1/fixed-section/parameter2/option1' },
  { id: 'page2', text: 'Page2', url: '/user/page2/parameterx/fixed-section/parametery/optionz' },
  { id: 'frame1', text: 'Frame1', url: '/frame1' },
  { id: 'frame1-1', text: 'Frame1-1', url: '/frame1/page1' },
  { id: 'frame2', text: 'Frame2', url: '/frame2' },
  { id: 'frame2-1', text: 'Frame2-1', url: '/frame2/page1' },
  { id: 'user1', text: 'User1', url: '/user/user1/url-parameter/' },
  { id: 'user1-2', text: 'User1-2', url: '/user/user1/sample-parameter/option1/' },
  { id: 'contact', text: 'Contact', url: '/user/contact' },
];

export const UserPageFrame = async (placeholderClassname: string, vnode: VNode<any>) => {
  const cssContainer: CssProps = {
    display: 'flex',
    'flex-direction': 'column',
    // padding: '10px',
    width: '100%',
    'min-height': '100%',
    'overflow-y': 'auto',
    '.content-block': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
    },
    '.content-block .padding-block': {
      padding: '0 16px',
    },
    '.top-link-list, .top-footer': {
      paddingTop: '16px',
    },
    [MediaQueryRange.TabletBelow]: {
      '.header-box, .top-link-list, .top-footer .footer-box, .menu-bar-box': {
        display: 'none',
      },
      '.content-block': {
        paddingBottom: '16px',
      },
      '.metronome-page-box, .gauge-box': {
        boxShadow: '#313131 2.02px 2.02px 5.08px 1px !important',
      },
    },
  };

  const userCookie = getCookieUser();
  const actualMenu = !userCookie || !userCookie.u ? defaultTopMenu : defaultTopMenuUser;
  return (
    <div css={cssContainer}>
      <HtmlLoad
        html={async () => <Header title={await WebConfig.get('siteTitle', `lupine.dev`)} subtitle=''></Header>}
      ></HtmlLoad>
      <MenuBar items={actualMenu} maxWidthMobileMenu={'800px'} maxWidth={MediaQueryMaxWidth.DesktopMax}></MenuBar>
      <div class={'content-block ' + placeholderClassname}>{vnode}</div>
      <div class='top-link-list'>
        <LinkList items={actualMenu} title=''></LinkList>
      </div>
      <div class='top-footer'>
        <HtmlLoad
          html={async () => (
            <Footer
              title={await WebConfig.get('footer', `Copyright© 2024 <a href='/'>lupine.dev</a>. All Rights Reserved.`)}
            ></Footer>
          )}
        ></HtmlLoad>
        {/* {
          new HtmlVar(async () => (
            <Footer
              title={await WebConfig.get('footer', `Copyright© 2024 <a href='/'>lupine.dev</a>. All Rights Reserved.`)}
            ></Footer>
          )).node
        } */}
        {/* <Footer
          title={webSetting('footer', `Copyright© 2024 <a href='/'>lupine.dev</a>. All Rights Reserved.`)}
        ></Footer> */}
        <FooterMenu></FooterMenu>
      </div>
    </div>
  );
};
