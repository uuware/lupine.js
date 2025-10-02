import { VNode, MenuItemProps } from 'lupine.components';
import { NestMenuItemProps, TabsHookProps } from 'lupine.components';
import { CreateTablesPage, RunSqlPage } from './admin-db';
import { TableListPage } from './admin-table-list';
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

export type AppAdminHookCheckLoginProps = (authResponse: object) => Promise<boolean>;
export type AppAdminHookLogoutProps = () => Promise<void>;
export class AdminFrameHelper {
  consoleTitle = 'Welcome to Admin Panel';
  getConsoleTitle() {
    return this.consoleTitle;
  }
  setConsoleTitle(title: string) {
    this.consoleTitle = title;
  }

  isDevAdmin = false;
  getIsDevAdmin() {
    return this.isDevAdmin;
  }
  setIsDevAdmin(isDevAdmin: boolean) {
    this.isDevAdmin = isDevAdmin;
  }

  maxWidthMobileMenu = '700px';
  setMaxWidthMobileMenu(maxWidthMobileMenu: string) {
    this.maxWidthMobileMenu = maxWidthMobileMenu;
  }
  getMaxWidthMobileMenu() {
    return this.maxWidthMobileMenu;
  }

  maxTabsCount = 20;
  setMaxTabsCount(count: number) {
    this.maxTabsCount = count;
  }
  getMaxTabsCount() {
    return this.maxTabsCount;
  }

  tabsHook: TabsHookProps = {} as TabsHookProps;
  setTabsHook(hook: TabsHookProps) {
    this.tabsHook = hook;
  }
  getTabsHook() {
    return this.tabsHook;
  }

  AppAdminHookCheckLogin?: AppAdminHookCheckLoginProps;
  setAppAdminHookCheckLogin(hook: AppAdminHookCheckLoginProps) {
    this.AppAdminHookCheckLogin = hook;
  }
  getAppAdminHookCheckLogin() {
    return this.AppAdminHookCheckLogin;
  }

  AppAdminHookLogout?: AppAdminHookLogoutProps;
  setAppAdminHookLogout(hook: AppAdminHookLogoutProps) {
    this.AppAdminHookLogout = hook;
  }
  getAppAdminHookLogout() {
    return this.AppAdminHookLogout;
  }

  adminTopMenu: NestMenuItemProps[] = [
    // { text: 'Top', url: '/admin' },
    {
      id: 'contents',
      text: 'Contents',
      url: '',
      // hide: true,
      devAdmin: true,
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
      devAdmin: true,
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
      devAdmin: true,
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
      devAdmin: true,
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
      devAdmin: true,
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
      devAdmin: true,
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

  refUpdate = this.getTabsHook();
  async addPanel(title: string, page: VNode) {
    if (this.getTabsHook().getCount!() > this.getMaxTabsCount()) {
      alert('You are opening too many pages');
      return;
    }
    if (this.getTabsHook().findAndActivate!(title)) {
      return;
    }
    await this.getTabsHook().newPage!(title, page);
  }
}
export const adminFrameHelper = /* @__PURE__ */ new AdminFrameHelper();
