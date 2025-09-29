import { bindGlobalStyle, CssProps, RefProps, VNode, MenuItemProps, clearCookie } from 'lupine.components';
import { NestMenuItemProps, MenuSidebar, ThemeSelector, TabsHookProps, TabsPageProps, Tabs } from 'lupine.components';
import { adminCss } from './admin-css';
import { CreateTablesPage, RunSqlPage } from './admin-db';
import { TableListPage } from './admin-table-list';
import { adminFrameProps } from './admin-frame-props';
import { AdminMenuPage } from './admin-menu-list';
import { TestThemesPage } from './admin-test-themes';
import { AdminPagePage } from './admin-page-list';
import { AdminPerformancePage } from './admin-performance';
import { AdminReleasePage } from './admin-release';
import { AdminTestAnimationsPage } from './admin-test-animations';
import { AdminTestEditPage } from './admin-test-edit';
import { AdminResourcesPage } from './admin-resources';
import { AdminTokensPage } from './admin-tokens';
import { TestComponentPage } from './admin-test-component';
import { AdminConfigPage } from './admin-config';
import { AdminAboutPage } from './admin-about';
import { AdminShellPage } from './admin-shell';

const chineseMenuText: { text: string; zh: string }[] = [
  { text: 'Contents', zh: '内容管理' },
  { text: 'Menu List', zh: '菜单列表' },
  { text: 'Page List', zh: '页面列表' },
  { text: 'Process List', zh: '流程列表' },

  { text: 'DB', zh: '数据库' },
  { text: 'Table List', zh: '表' },
  { text: 'Create Tables', zh: '创建表' },
  { text: 'Run SQL', zh: '运行 SQL' },

  { text: 'Test', zh: '测试' },
  { text: 'Test Themes', zh: '测试主题' },
  { text: 'Test Component', zh: '测试组件' },
  { text: 'Test Animations', zh: '测试动画' },
  { text: 'Test Edit', zh: '测试编辑' },

  { text: 'Access', zh: '管理服务器' },
  { text: 'Release', zh: '发布' },
  { text: 'Tokens', zh: '管理令牌' },

  { text: 'Server Info', zh: '服务器信息' },
  { text: 'Resources', zh: '管理资源' },
  { text: 'Config', zh: '管理配置' },
  { text: 'Shell', zh: '命令终端' },
  { text: 'Server Info', zh: '服务器信息' },
  { text: 'Performance', zh: '性能' },

  { text: 'Help', zh: '帮助' },
  { text: 'About', zh: '关于' },
];
const translateMenuToChinese = (text: string) => {
  const menuItem = chineseMenuText.find((item) => item.text === text);
  return menuItem ? menuItem.zh : text;
};

export class AdminFrameHelper {
  consoleTitle = 'Welcome to Admin Panel';
  getConsoleTitle() {
    return this.consoleTitle;
  }
  setConsoleTitle(title: string) {
    this.consoleTitle = title;
  }

  adminTopMenu: NestMenuItemProps[] = [
    // { text: 'Top', url: '/admin' },
    {
      id: 'contents',
      text: 'Contents',
      url: '',
      // hide: true,
      items: [
        {
          id: 'menu-list',
          text: 'Menu List',
          url: '',
          // hide: true,
          js: () => this.addPanel('Menu', AdminMenuPage()),
        },
        {
          id: 'page-list',
          text: 'Page List',
          url: '',
          js: () => this.addPanel('Page', AdminPagePage()),
        },
        {
          id: 'process-list',
          text: 'Process List',
          url: '',
          js: () => this.addPanel('Process', <div>new Process</div>),
        },
      ],
    },
    // { text: 'menu2', url: '/st_did.l--liangbufan.gunanguanvqingguandeng.html' },
    // {
    //   text: 'Admin',
    //   url: '',
    //   items: [{ text: 'Users', url: '/admin/users' }],
    // },
    {
      id: 'db',
      text: 'DB',
      url: '',
      items: [
        {
          id: 'table-list',
          text: 'Table List',
          url: '',
          js: () => this.addPanel('Table List', TableListPage()),
        },
        {
          id: 'create-tables',
          text: 'Create Tables',
          url: '',
          js: () => this.addPanel('Create Tables', CreateTablesPage()),
        },
        {
          id: 'run-sql',
          text: 'Run SQL',
          url: '',
          js: () => this.addPanel('Run SQL', RunSqlPage()),
        },
      ],
    },
    {
      id: 'test',
      text: 'Test',
      url: '',
      items: [
        {
          id: 'test-themes',
          text: 'Test Themes',
          url: '',
          js: () => this.addPanel('Test Themes', TestThemesPage()),
        },
        {
          id: 'test-component',
          text: 'Test Component',
          url: '',
          js: () => this.addPanel('Test Component', TestComponentPage()),
        },
        {
          id: 'test-animations',
          text: 'Test Animations',
          url: '',
          js: () => this.addPanel('Test Animations', AdminTestAnimationsPage()),
        },
        {
          id: 'test-edit',
          text: 'Test Edit',
          url: '',
          js: () => this.addPanel('Test Edit', AdminTestEditPage()),
        },
      ],
    },

    {
      id: 'access',
      text: 'Access',
      url: '',
      items: [
        {
          id: 'release',
          text: 'Release',
          url: '',
          js: () => this.addPanel('Release', AdminReleasePage()),
        },
        {
          id: 'tokens',
          text: 'Tokens',
          url: '',
          js: () => this.addPanel('Tokens', AdminTokensPage()),
        },
      ],
    },

    {
      id: 'server-info',
      text: 'Server Info',
      url: '',
      items: [
        {
          id: 'performance',
          text: 'Performance',
          url: '',
          js: () => this.addPanel('Performance', AdminPerformancePage()),
        },
        {
          id: 'resources',
          text: 'Resources',
          url: '',
          js: () => this.addPanel('Resources', AdminResourcesPage()),
        },
        {
          id: 'config',
          text: 'Config',
          url: '',
          js: () => this.addPanel('Config', AdminConfigPage()),
        },
        {
          id: 'shell',
          text: 'Shell',
          url: '',
          js: () => this.addPanel('Shell', AdminShellPage()),
        },
      ],
    },
    {
      id: 'help',
      text: 'Help',
      url: '',
      items: [
        {
          id: 'about',
          text: 'About',
          url: '',
          js: () => this.addPanel('About', AdminAboutPage()),
        },
      ],
    },
  ];

  hookBeforeShowMenu?: (adminTopMenu: NestMenuItemProps[]) => NestMenuItemProps[];
  // Set a hook to modify the admin top menu dynamically before it is shown
  setHookBeforeShowMenu(hook: (adminTopMenu: NestMenuItemProps[]) => NestMenuItemProps[]) {
    this.hookBeforeShowMenu = hook;
  }
  getAdminTopMenu() {
    if (this.hookBeforeShowMenu) {
      return this.hookBeforeShowMenu(this.adminTopMenu);
    }
    return this.adminTopMenu;
  }
  setAdminTopMenu(adminTopMenu: NestMenuItemProps[]) {
    this.adminTopMenu = adminTopMenu;
  }
  setChineseAdminTopMenu() {
    this.adminTopMenu.forEach((item) => {
      item.text = translateMenuToChinese(item.text);
      item.items?.forEach((subItem) => {
        subItem.text = translateMenuToChinese(subItem.text);
      });
    });
  }

  mobileMenuMaxWidth = '700px';
  setMobileMenuMaxWidth(maxWidth: string) {
    this.mobileMenuMaxWidth = maxWidth;
  }
  getMobileMenuMaxWidth() {
    return this.mobileMenuMaxWidth;
  }

  insertMenuItem(item: NestMenuItemProps[], beforeMenuId?: string) {
    let index = -1;
    if (beforeMenuId) {
      index = this.adminTopMenu.findIndex((m) => m.id === beforeMenuId);
    }
    if (index !== -1) {
      this.adminTopMenu.splice(index, 0, ...item);
    } else {
      this.adminTopMenu.push(...item);
    }
  }
  insertSubMenuItem(item: MenuItemProps[], beforeMenuId: string, beforeSubMenuId?: string) {
    const index = this.adminTopMenu.findIndex((m) => m.id === beforeMenuId);
    if (index !== -1) {
      const subMenu = this.adminTopMenu[index].items || [];
      const subIndex = subMenu.findIndex((s) => s.id === beforeSubMenuId);
      if (subIndex !== -1) {
        subMenu.splice(subIndex, 0, ...item);
      } else {
        subMenu.push(...item);
      }
      // this.adminTopMenu[index].items = subMenu;
    }
  }
  getMenuItem(menuId: string): NestMenuItemProps | null {
    const index = this.adminTopMenu.findIndex((m) => m.id === menuId);
    if (index !== -1) {
      return this.adminTopMenu[index];
    }
    return null;
  }
  getSubMenuItem(menuId: string, subMenuId: string): MenuItemProps | null {
    const index = this.adminTopMenu.findIndex((m) => m.id === menuId);
    if (index !== -1) {
      const subMenu = this.adminTopMenu[index].items || [];
      const subIndex = subMenu.findIndex((s) => s.id === subMenuId);
      if (subIndex !== -1) {
        return subMenu[subIndex];
      }
    }
    return null;
  }

  refUpdate = adminFrameProps.tabsHook;
  async addPanel(title: string, page: VNode) {
    if (adminFrameProps.tabsHook.getCount!() > adminFrameProps.maxTabsCount) {
      alert('You are opening too many pages');
      return;
    }
    if (adminFrameProps.tabsHook.findAndActivate!(title)) {
      return;
    }
    await adminFrameProps.tabsHook.newPage!(title, page);
  }
}
export const adminFrameHelper = /* @__PURE__ */ new AdminFrameHelper();

export type AdminFrameProps = {
  title?: string;
  css?: CssProps;
};
export const AdminFrame = (props: AdminFrameProps) => {
  const refUpdate = adminFrameProps.tabsHook;
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
  const onLogoutClick = () => {
    clearCookie('_token_dev', '/');
    window.location.href = '/admin';
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
          ></MenuSidebar>
        </div>
        <div class='body-content'>
          <AdminPanel refUpdate={refUpdate} title='Panel'></AdminPanel>
        </div>
      </div>
    </div>
  );
};

export type AdminPanelProps = {
  title?: string;
  css?: CssProps;
  refUpdate: TabsHookProps;
};
export const AdminPanel = (props: AdminPanelProps) => {
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
