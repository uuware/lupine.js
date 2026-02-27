import { VNode, MenuItemProps } from 'lupine.components';
import { NestMenuItemProps, TabsHookProps } from 'lupine.components';
import { DemoAboutPage } from './demo-about';
import { buttonDemo } from '../components/button-demo';
import { buttonPushAnimationDemo } from '../components/button-push-animation-demo';
import { toggleSwitchDemo } from '../components/toggle-switch-demo';
import { spinnerDemo } from '../components/spinner-demo';
import { starsDemo } from '../components/stars-component-demo';
import { editableLabelDemo } from '../components/editable-label-demo';
import { progressDemo } from '../components/progress-demo';
import { radioLabelDemo } from '../components/radio-label-demo';
import { selectAngleDemo } from '../components/select-angle-demo';
import { switchOptionDemo } from '../components/switch-option-demo';
import { actionSheetDemo } from '../components/action-sheet-demo';
import { selectWithTitleDemo } from '../components/select-with-title-demo';
import { inputWithTitleDemo } from '../components/input-with-title-demo';
import { tabsDemo } from '../components/tabs-demo';
import { modalDemo } from '../components/modal-demo';
import { popupMenuDemo } from '../components/popup-menu-demo';
import { noticeMessageDemo } from '../components/notice-message-demo';
import { resizableSplitterDemo } from '../components/resizable-splitter-demo';
import { redirectDemo } from '../components/redirect-demo';
import { textWaveDemo } from '../components/text-wave-demo';
import { textScaleDemo } from '../components/text-scale-demo';
import { textGlowDemo } from '../components/text-glow-demo';
import { togglePlayButtonDemo } from '../components/toggle-play-button-demo';
import { toggleButtonDemo } from '../components/toggle-button-demo';
import { messageBoxDemo } from '../components/message-box-demo';
import { sliderFrameDemo } from '../components/slider-frame-demo';
import { sliderDemo, gaugeDemo } from '../component-pool/slider';
import { badgeDemo } from '../component-pool/badge';
import { timelineDemo } from '../component-pool/timeline';
import { radialProgressDemo } from '../component-pool/radial-progress';
import { breadcrumbsDemo } from '../component-pool/breadcrumbs';
import { skeletonDemo } from '../component-pool/skeleton';
import { copyButtonDemo } from '../component-pool/copy-button';
import { aspectRatioDemo } from '../component-pool/aspect-ratio';
import { mapWrapperDemo } from '../component-pool/map-wrapper';
import { DemoPage } from './demo-page';

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
  { text: 'Performance', zh: '性能' },

  { text: 'Help', zh: '帮助' },
  { text: 'About', zh: '关于' },
];
const translateMenuToChinese = (text: string) => {
  const menuItem = chineseMenuText.find((item) => item.text === text);
  return menuItem ? menuItem.zh : text;
};

export type AppDemoHookCheckLoginProps = (authResponse: object) => Promise<boolean>;
export type AppDemoHookLogoutProps = () => Promise<void>;
export class DemoFrameHelper {
  consoleTitle = 'Welcome to Demo Panel';
  getConsoleTitle() {
    return this.consoleTitle;
  }
  setConsoleTitle(title: string) {
    this.consoleTitle = title;
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

  AppDemoHookCheckLogin?: AppDemoHookCheckLoginProps;
  setAppDemoHookCheckLogin(hook: AppDemoHookCheckLoginProps) {
    this.AppDemoHookCheckLogin = hook;
  }
  getAppDemoHookCheckLogin() {
    return this.AppDemoHookCheckLogin;
  }

  AppDemoHookLogout?: AppDemoHookLogoutProps;
  setAppDemoHookLogout(hook: AppDemoHookLogoutProps) {
    this.AppDemoHookLogout = hook;
  }
  getAppDemoHookLogout() {
    return this.AppDemoHookLogout;
  }

  demoTopMenu: NestMenuItemProps[] = [
    // { text: 'Top', url: '/admin' },
    {
      id: 'basic-demo',
      text: 'Basic',
      url: '',
      // hide: true,
      items: [
        {
          id: buttonDemo.id,
          text: buttonDemo.text,
          url: '',
          // hide: true,
          // Mounted via DemoPage to provide controls
          js: () => this.addPanel(buttonDemo.text, <DemoPage story={buttonDemo} />),
        },
        {
          id: buttonPushAnimationDemo.id,
          text: buttonPushAnimationDemo.text,
          url: '',
          js: () => this.addPanel(buttonPushAnimationDemo.text, <DemoPage story={buttonPushAnimationDemo} />),
        },
        {
          id: toggleSwitchDemo.id,
          text: toggleSwitchDemo.text,
          url: '',
          js: () => this.addPanel(toggleSwitchDemo.text, <DemoPage story={toggleSwitchDemo} />),
        },
        {
          id: spinnerDemo.id,
          text: spinnerDemo.text,
          url: '',
          js: () => this.addPanel(spinnerDemo.text, <DemoPage story={spinnerDemo} />),
        },
        {
          id: starsDemo.id,
          text: starsDemo.text,
          url: '',
          js: () => this.addPanel(starsDemo.text, <DemoPage story={starsDemo} />),
        },
        {
          id: editableLabelDemo.id,
          text: editableLabelDemo.text,
          url: '',
          js: () => this.addPanel(editableLabelDemo.text, <DemoPage story={editableLabelDemo} />),
        },
        {
          id: progressDemo.id,
          text: progressDemo.text,
          url: '',
          js: () => this.addPanel(progressDemo.text, <DemoPage story={progressDemo} />),
        },
        {
          id: radialProgressDemo.id,
          text: radialProgressDemo.text,
          url: '',
          js: () => this.addPanel(radialProgressDemo.text, <DemoPage story={radialProgressDemo} />),
        },
        {
          id: textWaveDemo.id,
          text: textWaveDemo.text,
          url: '',
          js: () => this.addPanel(textWaveDemo.text, <DemoPage story={textWaveDemo} />),
        },
        {
          id: textScaleDemo.id,
          text: textScaleDemo.text,
          url: '',
          js: () => this.addPanel(textScaleDemo.text, <DemoPage story={textScaleDemo} />),
        },
        {
          id: textGlowDemo.id,
          text: textGlowDemo.text,
          url: '',
          js: () => this.addPanel(textGlowDemo.text, <DemoPage story={textGlowDemo} />),
        },
        {
          id: togglePlayButtonDemo.id,
          text: togglePlayButtonDemo.text,
          url: '',
          js: () => this.addPanel(togglePlayButtonDemo.text, <DemoPage story={togglePlayButtonDemo} />),
        },
        {
          id: toggleButtonDemo.id,
          text: toggleButtonDemo.text,
          url: '',
          js: () => this.addPanel(toggleButtonDemo.text, <DemoPage story={toggleButtonDemo} />),
        },
        {
          id: badgeDemo.id,
          text: badgeDemo.text,
          url: '',
          js: () => this.addPanel(badgeDemo.text, <DemoPage story={badgeDemo} />),
        },
      ],
    },
    {
      id: 'forms-inputs-demo',
      text: 'Forms & Inputs',
      url: '',
      items: [
        {
          id: radioLabelDemo.id,
          text: radioLabelDemo.text,
          url: '',
          js: () => this.addPanel(radioLabelDemo.text, <DemoPage story={radioLabelDemo} />),
        },
        {
          id: selectAngleDemo.id,
          text: selectAngleDemo.text,
          url: '',
          js: () => this.addPanel(selectAngleDemo.text, <DemoPage story={selectAngleDemo} />),
        },
        {
          id: switchOptionDemo.id,
          text: switchOptionDemo.text,
          url: '',
          js: () => this.addPanel(switchOptionDemo.text, <DemoPage story={switchOptionDemo} />),
        },
        {
          id: actionSheetDemo.id,
          text: actionSheetDemo.text,
          url: '',
          js: () => this.addPanel(actionSheetDemo.text, <DemoPage story={actionSheetDemo} />),
        },
        {
          id: selectWithTitleDemo.id,
          text: selectWithTitleDemo.text,
          url: '',
          js: () => this.addPanel(selectWithTitleDemo.text, <DemoPage story={selectWithTitleDemo} />),
        },
        {
          id: inputWithTitleDemo.id,
          text: inputWithTitleDemo.text,
          url: '',
          js: () => this.addPanel(inputWithTitleDemo.text, <DemoPage story={inputWithTitleDemo} />),
        },
        {
          id: sliderDemo.id,
          text: sliderDemo.text,
          url: '',
          js: () => this.addPanel(sliderDemo.text, <DemoPage story={sliderDemo} />),
        },
        {
          id: gaugeDemo.id,
          text: gaugeDemo.text,
          url: '',
          js: () => this.addPanel(gaugeDemo.text, <DemoPage story={gaugeDemo} />),
        },
      ],
    },
    {
      id: 'layout-popups-demo',
      text: 'Layout & Popups',
      url: '',
      items: [
        {
          id: tabsDemo.id,
          text: tabsDemo.text,
          url: '',
          js: () => this.addPanel(tabsDemo.text, <DemoPage story={tabsDemo} />),
        },
        {
          id: modalDemo.id,
          text: modalDemo.text,
          url: '',
          js: () => this.addPanel(modalDemo.text, <DemoPage story={modalDemo} />),
        },
        {
          id: messageBoxDemo.id,
          text: messageBoxDemo.text,
          url: '',
          js: () => this.addPanel(messageBoxDemo.text, <DemoPage story={messageBoxDemo} />),
        },
        {
          id: popupMenuDemo.id,
          text: popupMenuDemo.text,
          url: '',
          js: () => this.addPanel(popupMenuDemo.text, <DemoPage story={popupMenuDemo} />),
        },
        {
          id: noticeMessageDemo.id,
          text: noticeMessageDemo.text,
          url: '',
          js: () => this.addPanel(noticeMessageDemo.text, <DemoPage story={noticeMessageDemo} />),
        },
        {
          id: resizableSplitterDemo.id,
          text: resizableSplitterDemo.text,
          url: '',
          js: () => this.addPanel(resizableSplitterDemo.text, <DemoPage story={resizableSplitterDemo} />),
        },
        {
          id: redirectDemo.id,
          text: redirectDemo.text,
          url: '',
          js: () => this.addPanel(redirectDemo.text, <DemoPage story={redirectDemo} />),
        },
        {
          id: sliderFrameDemo.id,
          text: sliderFrameDemo.text,
          url: '',
          js: () => this.addPanel(sliderFrameDemo.text, <DemoPage story={sliderFrameDemo} />),
        },
        {
          id: timelineDemo.id,
          text: timelineDemo.text,
          url: '',
          js: () => this.addPanel(timelineDemo.text, <DemoPage story={timelineDemo} />),
        },
        {
          id: breadcrumbsDemo.id,
          text: breadcrumbsDemo.text,
          url: '',
          js: () => this.addPanel(breadcrumbsDemo.text, <DemoPage story={breadcrumbsDemo} />),
        },
        {
          id: skeletonDemo.id,
          text: skeletonDemo.text,
          url: '',
          js: () => this.addPanel(skeletonDemo.text, <DemoPage story={skeletonDemo} />),
        },
        {
          id: copyButtonDemo.id,
          text: copyButtonDemo.text,
          url: '',
          js: () => this.addPanel(copyButtonDemo.text, <DemoPage story={copyButtonDemo} />),
        },
        {
          id: aspectRatioDemo.id,
          text: aspectRatioDemo.text,
          url: '',
          js: () => this.addPanel(aspectRatioDemo.text, <DemoPage story={aspectRatioDemo} />),
        },
        {
          id: mapWrapperDemo.id,
          text: mapWrapperDemo.text,
          url: '',
          js: () => this.addPanel(mapWrapperDemo.text, <DemoPage story={mapWrapperDemo} />),
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
          js: () => this.addPanel('About', DemoAboutPage()),
        },
      ],
    },
  ];

  hookBeforeShowMenu?: (adminTopMenu: NestMenuItemProps[]) => NestMenuItemProps[];
  // Set a hook to modify the admin top menu dynamically before it is shown
  setHookBeforeShowMenu(hook: (adminTopMenu: NestMenuItemProps[]) => NestMenuItemProps[]) {
    this.hookBeforeShowMenu = hook;
  }
  getDemoTopMenu() {
    if (this.hookBeforeShowMenu) {
      return this.hookBeforeShowMenu(this.demoTopMenu);
    }
    return this.demoTopMenu;
  }
  setDemoTopMenu(demoTopMenu: NestMenuItemProps[]) {
    this.demoTopMenu = demoTopMenu;
  }
  setChineseDemoTopMenu() {
    this.demoTopMenu.forEach((item) => {
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
      index = this.demoTopMenu.findIndex((m) => m.id === beforeMenuId);
    }
    if (index !== -1) {
      this.demoTopMenu.splice(index, 0, ...item);
    } else {
      this.demoTopMenu.push(...item);
    }
  }
  insertSubMenuItem(item: MenuItemProps[], beforeMenuId: string, beforeSubMenuId?: string) {
    const index = this.demoTopMenu.findIndex((m) => m.id === beforeMenuId);
    if (index !== -1) {
      const subMenu = this.demoTopMenu[index].items || [];
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
    const index = this.demoTopMenu.findIndex((m) => m.id === menuId);
    if (index !== -1) {
      return this.demoTopMenu[index];
    }
    return null;
  }
  getSubMenuItem(menuId: string, subMenuId: string): MenuItemProps | null {
    const index = this.demoTopMenu.findIndex((m) => m.id === menuId);
    if (index !== -1) {
      const subMenu = this.demoTopMenu[index].items || [];
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
export const demoFrameHelper = /* @__PURE__ */ new DemoFrameHelper();
