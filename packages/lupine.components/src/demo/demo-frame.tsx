import { bindGlobalStyle, CssProps, RefProps, clearCookie, TabsPageProps, getRenderPageProps } from 'lupine.components';
import { MenuSidebar, ThemeSelector, TabsHookProps, Tabs } from 'lupine.components';
import { demoCss } from './demo-css';
import { demoFrameHelper } from './demo-frame-helper';

export type DemoFrameProps = {
  title?: string;
  css?: CssProps;
};
export const DemoFrame = (props: DemoFrameProps) => {
  const refUpdate = demoFrameHelper.getTabsHook();
  const maxWidthMobileMenu = demoFrameHelper.getMobileMenuMaxWidth();
  const css: CssProps = {
    backgroundColor: 'var(--primary-bg-color)',
    color: 'var(--primary-color)',
    ...demoCss,
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    overflowY: 'auto',
    '.f-header': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 16px 4px 0px',
      fontSize: '80%',
    },
    '.top-logo': {
      marginLeft: '16px',
      marginRight: '16px',
    },
    '.top-title': {
      flex: '1',
      fontSize: '160%',
      margin: 'auto',
    },
    '.top-menu': {
      display: 'flex',
    },
    '.top-menu .item': {
      padding: '0px 2px',
    },
    '.f-body': {
      flex: '1',
      display: 'flex',
      borderTop: 'var(--primary-border)',
      minHeight: '0',
    },
    '.body-menu': {
      width: '165px',
      // padding: '8px 16px',
      borderRight: 'var(--primary-border)',
      overflowX: 'hidden',
      overflowY: 'auto',
      color: 'var(--sidebar-color)',
      backgroundColor: 'var(--sidebar-bg-color)',
    },
    '.close-menu-icon': {
      position: 'relative',
    },
    '.close-menu-icon.hide + .body-menu': {
      display: 'none',
    },
    '.close-menu-icon::after': {
      content: '""',
      position: 'absolute',
      top: '-13px',
      left: '-1px',
      transform: 'rotate(90deg)',
      width: '0',
      height: '0',
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: '7px solid var(--primary-color)',
      transition: 'all 300ms ease-in-out',
      zIndex: 'var(--layer-sidebar)',
    },
    ['@media only screen and (max-width: ' + maxWidthMobileMenu + ')']: {
      '.body-menu, .close-menu-icon': {
        display: 'none',
      },
    },
    '.body-content': {
      flex: '1',
      overflowX: 'auto',
      // padding: '8px 16px',
    },
    '.body-tabs': {
      height: '100%',
    },
    ...props.css,
  };

  bindGlobalStyle('demo-frame-box', css);

  const pages: TabsPageProps[] = [];
  const refCloseMenu: RefProps = {};
  const demoTopMenu = demoFrameHelper.getDemoTopMenu();
  const onCloseMenuClick = () => {
    refCloseMenu.current.classList.toggle('hide');
  };
  return (
    <div class='demo-frame-box'>
      <div class='f-header'>
        <MenuSidebar
          items={demoTopMenu}
          maxWidthMobileMenu={maxWidthMobileMenu}
          color='var(--sidebar-color)'
          backgroundColor='var(--sidebar-bg-color)'
          mobileMenu={true}
        ></MenuSidebar>
        <div class='top-logo'>Lupine.js</div>
        <div class='top-title'>{props.title}</div>
        <div class='top-menu'>
          <ThemeSelector></ThemeSelector>
        </div>
      </div>
      <div class='f-body'>
        <div ref={refCloseMenu} class='close-menu-icon' onClick={onCloseMenuClick} title='Hide / Show Side Menu'></div>
        <div class='body-menu'>
          <MenuSidebar
            items={demoTopMenu}
            maxWidthMobileMenu={maxWidthMobileMenu}
            color='var(--sidebar-color)'
            backgroundColor='var(--sidebar-bg-color)'
            desktopMenu={true}
          ></MenuSidebar>
        </div>
        <div class='body-content'>
          <div class='body-tabs'>
            <Tabs pages={pages} hook={refUpdate} pagePadding='8px'></Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
