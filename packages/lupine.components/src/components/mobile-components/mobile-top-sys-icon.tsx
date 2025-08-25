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
  };
  return (
    <div css={css} onClick={() => MobileSideMenuHelper.show()}>
      <i class='ifc-icon bs-list'></i>
    </div>
  );
};
