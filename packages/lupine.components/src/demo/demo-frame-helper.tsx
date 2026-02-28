import { VNode, MenuItemProps } from 'lupine.components';
import { NestMenuItemProps, TabsHookProps } from 'lupine.components';
import { DemoAboutPage } from './demo-about';
import { buttonDemo } from '../components/button-demo';
import { buttonPushAnimationDemo } from '../components/button-push-animation-demo';
import { toggleSwitchDemo } from '../components/toggle-switch-demo';
import { inputNumberDemo } from '../components/input-number-demo';
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
import { mobileSideMenuDemo } from '../components/mobile-components/mobile-side-menu-demo';
import { sliderFrameDemo } from '../components/slider-frame-demo';
import { rangeDemo, gaugeDemo } from '../component-pool/range';
import { badgeDemo } from '../component-pool/badge';
import { timelineDemo } from '../component-pool/timeline';
import { radialProgressDemo } from '../component-pool/radial-progress';
import { breadcrumbsDemo } from '../component-pool/breadcrumbs';
import { skeletonDemo } from '../component-pool/skeleton';
import { copyButtonDemo } from '../component-pool/copy-button';
import { aspectRatioDemo } from '../component-pool/aspect-ratio';
import { mapWrapperDemo } from '../component-pool/map-wrapper';
import { avatarDemo } from '../component-pool/avatar';
import { cardDemo } from '../component-pool/card';
import { carouselDemo } from '../component-pool/carousel';
import { cascaderDemo } from '../component-pool/cascader';
import { tooltipDemo } from '../component-pool/tooltip';
import { timePickerDemo } from '../component-pool/time-picker';
import { datePickerDemo } from '../component-pool/date-picker';
import { pullToRefreshDemo } from '../component-pool/pull-to-refresh/pull-to-refresh-demo';
import { tagInputDemo } from '../component-pool/tag-input/tag-input-demo';
import { floatingIconMenuDemo } from '../component-pool/floating-icon-menu';
import { tourDemo } from '../component-pool/tour';
import { searchInputDemo } from '../component-pool/search-input';
import { hEditorDemo } from '../component-pool/h-editor';
import { pagingLinkDemo } from '../components/paging-link-demo';
import { slideTabDemo } from '../components/slide-tab-component-demo';
import { qrcodeDemo } from '../component-pool/qrcode';
import { iEditorDemo } from '../component-pool/i-editor';
import { youtubePlayerDemo } from '../component-pool/youtube-player';
import { pEditorDemo } from '../component-pool/p-editor';
import { pdfViewerDemo } from '../component-pool/pdf-viewer';
import { DemoPage } from './demo-page';
import { responsiveFrameDemo } from '../frames/responsive-frame-demo';

const chineseMenuText: { text: string; zh: string }[] = [
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
    {
      id: 'general-demo',
      text: 'General',
      url: '',
      items: [
        {
          id: buttonDemo.id,
          text: buttonDemo.text,
          url: '',
          js: () => this.addPanel(buttonDemo.text, <DemoPage story={buttonDemo} />),
        },
        {
          id: buttonPushAnimationDemo.id,
          text: buttonPushAnimationDemo.text,
          url: '',
          js: () => this.addPanel(buttonPushAnimationDemo.text, <DemoPage story={buttonPushAnimationDemo} />),
        },
        {
          id: inputNumberDemo.id,
          text: inputNumberDemo.text,
          url: '',
          js: () => this.addPanel(inputNumberDemo.text, <DemoPage story={inputNumberDemo} />),
        },
        {
          id: toggleSwitchDemo.id,
          text: toggleSwitchDemo.text,
          url: '',
          js: () => this.addPanel(toggleSwitchDemo.text, <DemoPage story={toggleSwitchDemo} />),
        },
        {
          id: toggleButtonDemo.id,
          text: toggleButtonDemo.text,
          url: '',
          js: () => this.addPanel(toggleButtonDemo.text, <DemoPage story={toggleButtonDemo} />),
        },
        {
          id: togglePlayButtonDemo.id,
          text: togglePlayButtonDemo.text,
          url: '',
          js: () => this.addPanel(togglePlayButtonDemo.text, <DemoPage story={togglePlayButtonDemo} />),
        },
        {
          id: badgeDemo.id,
          text: badgeDemo.text,
          url: '',
          js: () => this.addPanel(badgeDemo.text, <DemoPage story={badgeDemo} />),
        },
        {
          id: copyButtonDemo.id,
          text: copyButtonDemo.text,
          url: '',
          js: () => this.addPanel(copyButtonDemo.text, <DemoPage story={copyButtonDemo} />),
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
          id: tooltipDemo.id,
          text: tooltipDemo.text,
          url: '',
          js: () => this.addPanel(tooltipDemo.text, <DemoPage story={tooltipDemo} />),
        },
      ],
    },
    {
      id: 'navigation-demo',
      text: 'Navigation',
      url: '',
      items: [
        {
          id: mobileSideMenuDemo.id,
          text: mobileSideMenuDemo.text,
          url: '',
          js: () => this.addPanel(mobileSideMenuDemo.text, <DemoPage story={mobileSideMenuDemo} />),
        },
        {
          id: responsiveFrameDemo.id,
          text: responsiveFrameDemo.text,
          url: '',
          js: () => this.addPanel(responsiveFrameDemo.text, <DemoPage story={responsiveFrameDemo} />),
        },
        {
          id: floatingIconMenuDemo.id,
          text: floatingIconMenuDemo.text,
          url: '',
          js: () => this.addPanel(floatingIconMenuDemo.text, <DemoPage story={floatingIconMenuDemo} />),
        },
        {
          id: breadcrumbsDemo.id,
          text: breadcrumbsDemo.text,
          url: '',
          js: () => this.addPanel(breadcrumbsDemo.text, <DemoPage story={breadcrumbsDemo} />),
        },
      ],
    },
    {
      id: 'data-entry-demo',
      text: 'Data Entry',
      url: '',
      items: [
        {
          id: inputWithTitleDemo.id,
          text: inputWithTitleDemo.text,
          url: '',
          js: () => this.addPanel(inputWithTitleDemo.text, <DemoPage story={inputWithTitleDemo} />),
        },
        {
          id: searchInputDemo.id,
          text: searchInputDemo.text,
          url: '',
          js: () => this.addPanel(searchInputDemo.text, <DemoPage story={searchInputDemo} />),
        },
        {
          id: tagInputDemo.id,
          text: tagInputDemo.text,
          url: '',
          js: () => this.addPanel(tagInputDemo.text, <DemoPage story={tagInputDemo} />),
        },
        {
          id: hEditorDemo.id,
          text: hEditorDemo.text,
          url: '',
          js: () => this.addPanel(hEditorDemo.text, <DemoPage story={hEditorDemo} />),
        },
        {
          id: iEditorDemo.id,
          text: iEditorDemo.text,
          url: '',
          js: () => this.addPanel(iEditorDemo.text, <DemoPage story={iEditorDemo} />),
        },
        {
          id: pEditorDemo.id,
          text: pEditorDemo.text,
          url: '',
          js: () => this.addPanel(pEditorDemo.text, <DemoPage story={pEditorDemo} />),
        },
        {
          id: pdfViewerDemo.id,
          text: pdfViewerDemo.text,
          url: '',
          js: () => this.addPanel(pdfViewerDemo.text, <DemoPage story={pdfViewerDemo} />),
        },
        {
          id: selectWithTitleDemo.id,
          text: selectWithTitleDemo.text,
          url: '',
          js: () => this.addPanel(selectWithTitleDemo.text, <DemoPage story={selectWithTitleDemo} />),
        },
        {
          id: rangeDemo.id,
          text: rangeDemo.text,
          url: '',
          js: () => this.addPanel(rangeDemo.text, <DemoPage story={rangeDemo} />),
        },
        {
          id: gaugeDemo.id,
          text: gaugeDemo.text,
          url: '',
          js: () => this.addPanel(gaugeDemo.text, <DemoPage story={gaugeDemo} />),
        },
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
          id: timePickerDemo.id,
          text: timePickerDemo.text,
          url: '',
          js: () => this.addPanel(timePickerDemo.text, <DemoPage story={timePickerDemo} />),
        },
        {
          id: datePickerDemo.id,
          text: datePickerDemo.text,
          url: '',
          js: () => this.addPanel(datePickerDemo.text, <DemoPage story={datePickerDemo} />),
        },
      ],
    },
    {
      id: 'data-display-demo',
      text: 'Data Display',
      url: '',
      items: [
        {
          id: pagingLinkDemo.id,
          text: pagingLinkDemo.text,
          url: '',
          js: () => this.addPanel(pagingLinkDemo.text, <DemoPage story={pagingLinkDemo} />),
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
          id: timelineDemo.id,
          text: timelineDemo.text,
          url: '',
          js: () => this.addPanel(timelineDemo.text, <DemoPage story={timelineDemo} />),
        },
        {
          id: skeletonDemo.id,
          text: skeletonDemo.text,
          url: '',
          js: () => this.addPanel(skeletonDemo.text, <DemoPage story={skeletonDemo} />),
        },
        {
          id: avatarDemo.id,
          text: avatarDemo.text,
          url: '',
          js: () => this.addPanel(avatarDemo.text, <DemoPage story={avatarDemo} />),
        },
        {
          id: cardDemo.id,
          text: cardDemo.text,
          url: '',
          js: () => this.addPanel(cardDemo.text, <DemoPage story={cardDemo} />),
        },
        {
          id: carouselDemo.id,
          text: carouselDemo.text,
          url: '',
          js: () => this.addPanel(carouselDemo.text, <DemoPage story={carouselDemo} />),
        },
        {
          id: cascaderDemo.id,
          text: cascaderDemo.text,
          url: '',
          js: () => this.addPanel(cascaderDemo.text, <DemoPage story={cascaderDemo} />),
        },
        {
          id: slideTabDemo.id,
          text: slideTabDemo.text,
          url: '',
          js: () => this.addPanel(slideTabDemo.text, <DemoPage story={slideTabDemo} />),
        },
        {
          id: qrcodeDemo.id,
          text: qrcodeDemo.text,
          url: '',
          js: () => this.addPanel(qrcodeDemo.text, <DemoPage story={qrcodeDemo} />),
        },
        {
          id: youtubePlayerDemo.id,
          text: youtubePlayerDemo.text,
          url: '',
          js: () => this.addPanel(youtubePlayerDemo.text, <DemoPage story={youtubePlayerDemo} />),
        },
      ],
    },
    {
      id: 'feedback-demo',
      text: 'Feedback',
      url: '',
      items: [
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
          id: actionSheetDemo.id,
          text: actionSheetDemo.text,
          url: '',
          js: () => this.addPanel(actionSheetDemo.text, <DemoPage story={actionSheetDemo} />),
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
          id: tourDemo.id,
          text: tourDemo.text,
          url: '',
          js: () => this.addPanel(tourDemo.text, <DemoPage story={tourDemo} />),
        },
        {
          id: pullToRefreshDemo.id,
          text: pullToRefreshDemo.text,
          url: '',
          js: () => this.addPanel(pullToRefreshDemo.text, <DemoPage story={pullToRefreshDemo} />),
        },
      ],
    },
    {
      id: 'layout-demo',
      text: 'Layout',
      url: '',
      items: [
        {
          id: tabsDemo.id,
          text: tabsDemo.text,
          url: '',
          js: () => this.addPanel(tabsDemo.text, <DemoPage story={tabsDemo} />),
        },
        {
          id: resizableSplitterDemo.id,
          text: resizableSplitterDemo.text,
          url: '',
          js: () => this.addPanel(resizableSplitterDemo.text, <DemoPage story={resizableSplitterDemo} />),
        },
        {
          id: aspectRatioDemo.id,
          text: aspectRatioDemo.text,
          url: '',
          js: () => this.addPanel(aspectRatioDemo.text, <DemoPage story={aspectRatioDemo} />),
        },
        {
          id: sliderFrameDemo.id,
          text: sliderFrameDemo.text,
          url: '',
          js: () => this.addPanel(sliderFrameDemo.text, <DemoPage story={sliderFrameDemo} />),
        },
      ],
    },
    {
      id: 'advanced-demo',
      text: 'Special FX',
      url: '',
      items: [
        {
          id: mapWrapperDemo.id,
          text: mapWrapperDemo.text,
          url: '',
          js: () => this.addPanel(mapWrapperDemo.text, <DemoPage story={mapWrapperDemo} />),
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
          id: redirectDemo.id,
          text: redirectDemo.text,
          url: '',
          js: () => this.addPanel(redirectDemo.text, <DemoPage story={redirectDemo} />),
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
