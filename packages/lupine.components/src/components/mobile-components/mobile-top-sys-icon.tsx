// import { NotificationColor, NotificationMessage, updateTheme, PopupMenuWithIcon, CssProps } from "lupine.components";
import { CssProps } from 'lupine.components';
import { MobileSideMenuHelper } from './mobile-side-menu';

export interface MobileTopSysIconProps {
  icon?: string;
}

export const MobileTopSysIcon = (props: MobileTopSysIconProps = {}) => {
  const icon = props?.icon || 'bs-list';
  const css: CssProps = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '28px',
    transition: 'transform 0.1s ease, opacity 0.1s ease',
    '&:hover': {
      opacity: 0.6,
    },
    '&:active': {
      opacity: 0.8,
      transform: 'scale(0.9)',
    },
  };
  return (
    <div css={css} onClick={() => MobileSideMenuHelper.show()} class='mobile-top-sys-icon'>
      <i class={`ifc-icon ${icon}`}></i>
    </div>
  );
};
