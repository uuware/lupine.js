import { CssProps } from 'lupine.web';
import { MediaQueryRange } from '../../styles';

export interface MobileFooterMenuItemProps {
  icon: string;
  href: string;
  text: string;
  topout?: boolean;
}
export interface MobileFooterMenuProps {
  items: MobileFooterMenuItemProps[];
  color?: string;
  activeColor?: string;
  topoutColor?: string;
  topoutBackgroundColor?: string;
}
export const MobileFooterMenu = (props: MobileFooterMenuProps) => {
  const css: CssProps = {
    '.footer-menu': {
      display: 'none',
      // position: 'fixed',
      // left: 0,
      // right: 0,
      // bottom: 0,
      width: '100%',
      background: 'var(--sidebar-bg-color)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      minHeight: '50px',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: 'var(--primary-border)',
    },
    '.footer-menu, .footer-menu a': {
      textDecoration: 'none',
      color: props.color || 'var(--primary-color)',
    },
    '.footer-menu .footer-menu-item': {
      padding: '4px 16px 4px 16px',
      fontSize: '11px',
      height: '55px', // 和主页保留的底部菜单高度一致
      width: '55px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    '.footer-menu .footer-menu-item i': {
      display: 'block',
      fontSize: '22px',
      marginBottom: '4px',
    },
    '.footer-menu .footer-menu-item.footer-menu-topout': {
      marginTop: '-43px',
      borderRadius: '50%',
      backgroundColor: props.topoutBackgroundColor || '#ff8f8f',
      color: props.topoutColor || 'var(--primary-color)',
      zIndex: 'var(--layer-header-footer)',
    },
    '.footer-menu .footer-menu-item.active': {
      color: props.activeColor || 'var(--primary-accent-color)',
    },
    [MediaQueryRange.TabletBelow]: {
      '.footer-menu': {
        display: 'flex',
      },
    },
  };
  const onClick = (index: number, href: string) => {
    const items = document.querySelector('.footer-menu-item.active');
    items?.classList.remove('active');
    // find footer-menu-item by index
    const item = document.querySelector(`a:nth-child(${index + 1}) .footer-menu-item`);
    item?.classList.add('active');
  };
  let curretnUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  return (
    <div css={css} class='footer-menu-box'>
      <div class='footer-menu'>
        {props.items.map((item, index) => (
          <a href={item.href} key={index}>
            <div
              class={`footer-menu-item ${item.topout ? 'footer-menu-topout' : ''} ${
                curretnUrl === item.href ? 'active' : ''
              }`}
              onClick={() => onClick(index, item.href)}
            >
              <i class={`ifc-icon ${item.icon}`}></i>
              {item.text}
            </div>
          </a>
        ))}
        {/* <div class='footer-menu-item'><a href='/'><i class="ifc-icon bs-person-gear"></i>主页</a></div>
        <div class='footer-menu-item'><a href='/user/tools'><i class="ifc-icon bo-multimedia-music-note"></i>工具</a></div>
        <div class='footer-menu-item footer-menu-topout'><a href='/user/customer'><i class="ifc-icon co-cil-chat-bubble"></i>客服</a></div>
        <div class='footer-menu-item'><a href='/user/member'><i class="ifc-icon ma-crown-outline"></i>会员</a></div>
        <div class='footer-menu-item'><a href='/user/mine'><i class="ifc-icon bs-person-gear"></i>我的</a></div> */}
      </div>
    </div>
  );
};
