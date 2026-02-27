// import { NotificationColor, NotificationMessage, updateTheme, PopupMenuWithIcon, CssProps } from 'lupine.components';
import { CssProps } from 'lupine.components';
import { MobileSideMenuHelper } from './mobile-side-menu';

export const MobileTopSysIcon = () => {
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
    <div css={css} onClick={() => MobileSideMenuHelper.show()}>
      <i class='ifc-icon bs-list'></i>
    </div>
  );
};
