import { bindGlobalStyle, CssProps, RefProps, clearCookie, TabsPageProps } from 'lupine.components';
import { MenuSidebar, ThemeSelector, TabsHookProps, Tabs } from 'lupine.components';
import { adminCss } from './admin-css';
import { adminFrameHelper } from './admin-frame-helper';

type AdminPanelProps = {
  title?: string;
  css?: CssProps;
  refUpdate: TabsHookProps;
};
const AdminPanel = (props: AdminPanelProps) => {
  const css: CssProps = {
    height: '100%',
  };
  const pages: TabsPageProps[] = [];
  return (
    <div css={css}>
      <Tabs pages={pages} hook={props.refUpdate} pagePadding='8px'></Tabs>
    </div>
  );
};

export type AdminFrameProps = {
  title?: string;
  css?: CssProps;
};
export const AdminFrame = (props: AdminFrameProps) => {
  const refUpdate = adminFrameHelper.getTabsHook();
  const maxWidthMobileMenu = adminFrameHelper.getMobileMenuMaxWidth();
  const css: CssProps = {
    backgroundColor: 'var(--primary-bg-color)',
    color: 'var(--primary-color)',
    ...adminCss,
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
    ...props.css,
  };
  const onLogoutClick = async () => {
    clearCookie('_token_dev', '/');
    await adminFrameHelper.getAppAdminHookLogout()?.();
    window.location.href = '/admin_dev';
  };

  bindGlobalStyle('admin-frame-box', css);

  const refCloseMenu: RefProps = {};
  const adminTopMenu = adminFrameHelper.getAdminTopMenu();
  const onCloseMenuClick = () => {
    refCloseMenu.current.classList.toggle('hide');
  };
  return (
    <div class='admin-frame-box'>
      <div class='f-header'>
        <MenuSidebar
          items={adminTopMenu}
          maxWidthMobileMenu={maxWidthMobileMenu}
          color='var(--sidebar-color)'
          backgroundColor='var(--sidebar-bg-color)'
          mobileMenu={true}
          isDevAdmin={adminFrameHelper.getIsDevAdmin()}
        ></MenuSidebar>
        <div class='top-logo'>Lupine.Dev</div>
        <div class='top-title'>{props.title}</div>
        <div class='top-menu'>
          <ThemeSelector></ThemeSelector>
          <button onClick={() => window.open('/')} class='button-base button-s'>
            Home
          </button>
          <button onClick={onLogoutClick} class='button-base button-s'>
            Logout
          </button>
        </div>
      </div>
      <div class='f-body'>
        <div ref={refCloseMenu} class='close-menu-icon' onClick={onCloseMenuClick} title='Hide / Show Side Menu'></div>
        <div class='body-menu'>
          <MenuSidebar
            items={adminTopMenu}
            maxWidthMobileMenu={maxWidthMobileMenu}
            color='var(--sidebar-color)'
            backgroundColor='var(--sidebar-bg-color)'
            desktopMenu={true}
            isDevAdmin={adminFrameHelper.getIsDevAdmin()}
          ></MenuSidebar>
        </div>
        <div class='body-content'>
          <AdminPanel refUpdate={refUpdate} title='Panel'></AdminPanel>
        </div>
      </div>
    </div>
  );
};
