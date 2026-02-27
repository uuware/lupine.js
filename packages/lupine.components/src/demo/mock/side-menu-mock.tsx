import { CssProps, getGlobalStylesId, bindGlobalStyle, RefProps, VNode } from 'lupine.web';
import { MobileSideMenuHelper } from '../../components/mobile-components/mobile-side-menu';

export type SideMenuMockProps = {
  menuItems?: string[];
  title?: string;
  version?: string;
  onAction?: (action: string) => void;
};

const sideMenuMockCss: CssProps = {
  '.msm-header': {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid var(--primary-border-color)',
  },
  '.msm-header-icon': {
    width: '32px',
    height: '32px',
    marginRight: '12px',
    borderRadius: '4px',
    backgroundColor: 'var(--primary-color)',
  },
  '.msm-header-title': {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  '.msm-content': {
    flex: '1',
    overflowY: 'auto',
    padding: '12px 0',
  },
  '.msm-item': {
    padding: '12px 0px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '&:hover': {
      backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.04))',
    },
  },
  '.msm-footer': {
    borderTop: '1px solid var(--primary-border-color)',
    padding: '16px 0',
  },
  '.msm-footer-cfg': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  '.msm-footer-cfg .msm-item': {
    padding: '12px 0px',
  },
  '.msm-footer-version': {
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--secondary-color, #999)',
    marginTop: '16px',
  },
};

export const SideMenuMock = ({
  menuItems = ['Home', 'Profile', 'Messages', 'Settings'],
  title = 'My App Menu',
  version = '1.0.0',
  onAction,
}: SideMenuMockProps): VNode<any> => {
  const globalCssId = getGlobalStylesId(sideMenuMockCss);
  bindGlobalStyle(globalCssId, sideMenuMockCss);

  const ref: RefProps = {
    globalCssId,
  };

  const handleAction = (item: string) => {
    if (onAction) {
      onAction(item);
    } else {
      alert(`Action: ${item}`);
      MobileSideMenuHelper.hide();
    }
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <div class='msm-header'>
        <div class='msm-header-icon'></div>
        <div class='msm-header-title'>{title}</div>
      </div>

      <div class='msm-content'>
        {menuItems.map((item) => (
          <div class='msm-item' onClick={() => handleAction(item)}>
            {item}
          </div>
        ))}
      </div>

      <div class='msm-footer'>
        <div class='msm-footer-cfg'>
          <div class='msm-item' onClick={() => handleAction('Account Settings')}>
            <i class='ifc-icon ma-cog-outline'></i>
            Account
          </div>
          <div class='msm-item' onClick={() => handleAction('Logout')} style={{ color: 'var(--error-color, #ff4d4f)' }}>
            <i class='ifc-icon ma-logout'></i>
            Logout
          </div>
        </div>
        <div class='msm-footer-version'>Version: {version}</div>
      </div>
    </div>
  );
};
