import { CssProps, VNode } from 'lupine.web';
import { HtmlVar } from '../html-var';

export class MobileHeaderHelper {
  private static instance: MobileHeaderHelper;

  private leftContent = HtmlVar('');
  private centerContent = HtmlVar('');
  private rightContent = HtmlVar('');
  private constructor() {}

  public static getInstance(): MobileHeaderHelper {
    if (!MobileHeaderHelper.instance) {
      MobileHeaderHelper.instance = new MobileHeaderHelper();
    }
    return MobileHeaderHelper.instance;
  }

  public setLeftContent(content: string | VNode<any>) {
    this.leftContent.value = content;
  }
  public getLeftContent() {
    return this.leftContent;
  }
  public setCenterContent(content: string | VNode<any>) {
    this.centerContent.value = content;
  }
  public getCenterContent() {
    return this.centerContent;
  }
  public setRightContent(content: string | VNode<any>) {
    this.rightContent.value = content;
  }
  public getRightContent() {
    return this.rightContent;
  }

  public hideHeader() {
    this.leftContent.value = '';
    this.centerContent.value = '';
    this.rightContent.value = '';
  }
}
export const mobileHeaderHelper = MobileHeaderHelper.getInstance();

export const MobileHeaderLeft = (props: { children: VNode<any> }) => {
  mobileHeaderHelper.setLeftContent(props.children);
  return <></>;
};

export const MobileHeaderCenter = (props: { children: VNode<any> }) => {
  mobileHeaderHelper.setCenterContent(props.children);
  return <></>;
};

export const MobileHeaderRight = (props: { children: VNode<any> }) => {
  mobileHeaderHelper.setRightContent(props.children);
  return <></>;
};

export const MobileHeaderHide = () => {
  mobileHeaderHelper.hideHeader();
  return <></>;
};

export const MobileHeaderComponent = (props: any) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    padding: '2px 0',
    boxShadow: '0 4px 4px var(--primary-border-color)', // 第二项 2px 的话，顶部有阴影（线）
    '& > *': {
      height: '100%',
    },
    '.mobile-header-center': {
      flex: 1,
    },
  };

  return (
    <div css={css} class='mobile-header-component'>
      <div class='mobile-header-left'>{mobileHeaderHelper.getLeftContent().node}</div>
      <div class='mobile-header-center'>{mobileHeaderHelper.getCenterContent().node}</div>
      <div class='mobile-header-right'>{mobileHeaderHelper.getRightContent().node}</div>
    </div>
  );
};
