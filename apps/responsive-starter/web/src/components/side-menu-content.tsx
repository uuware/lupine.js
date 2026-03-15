import {
  CssProps,
  getGlobalStylesId,
  bindGlobalStyle,
  RefProps,
  VNode,
  MobileSideMenuHelper,
  updateTheme,
} from 'lupine.components';
import { NotificationColor, NotificationMessage, SliderFrameHookProps } from 'lupine.components';
import { IconMenuItemProps } from 'lupine.components';
import { MineSettingsPage } from './mine-settings-page';

export type SideMenuContentProps = {
  navItems?: IconMenuItemProps[];
  menuItems?: string[];
  title?: string;
  footer?: string;
  version?: string;
  onAction?: (action: string) => void;
  settingSliderHook: SliderFrameHookProps;
};

const sideMenuContentCss: CssProps = {
  margin: '0 -12px',
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
  '.msm-item-link': {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  '.msm-separator': {
    height: '1px',
    backgroundColor: 'var(--primary-border-color)',
    margin: '8px 12px',
  },
  '.msm-item': {
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
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
    padding: '12px',
  },
  '.msm-footer-version': {
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--secondary-color, #999)',
    marginTop: '2px',
  },
};

export const SideMenuContent = ({
  navItems = [],
  menuItems = ['Light Mode', 'Dark Mode'],
  title = 'Function Menu',
  footer,
  onAction,
  settingSliderHook,
}: SideMenuContentProps): VNode<any> => {
  const globalCssId = getGlobalStylesId(sideMenuContentCss);
  bindGlobalStyle(globalCssId, sideMenuContentCss);

  const ref: RefProps = {
    globalCssId,
  };

  const handleAction = (item: string) => {
    if (onAction) {
      onAction(item);
    } else {
      if (item === 'Light Mode') {
        updateTheme('light');
        MobileSideMenuHelper.hide();
      } else if (item === 'Dark Mode') {
        updateTheme('dark');
        MobileSideMenuHelper.hide();
      } else {
        NotificationMessage.sendMessage(`Action: ${item}`, NotificationColor.Info);
        MobileSideMenuHelper.hide();
      }
    }
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <div class='msm-header'>
        {/* <div class='msm-header-icon'></div> */}
        <div class='msm-header-title'>{title}</div>
      </div>

      <div class='msm-content'>
        {navItems &&
          navItems.map((item, index) => {
            const handleClick = (e: Event) => {
              if (item.js) {
                e.preventDefault();
                item.js();
              }
              MobileSideMenuHelper.hide();
            };

            return (
              <a href={item.url || 'javascript:void(0)'} class='msm-item-link' onClick={handleClick}>
                <div class='msm-item'>
                  {item.icon && <i class={`ifc-icon ${item.icon}`}></i>}
                  {item.text}
                </div>
              </a>
            );
          })}
        {navItems && navItems.length > 0 && menuItems.length > 0 && <div class='msm-separator'></div>}
        {menuItems.map((item) => (
          <div class='msm-item' onClick={() => handleAction(item)}>
            {item}
          </div>
        ))}
      </div>

      <div class='msm-footer'>
        <div class='msm-footer-cfg'>
          <div
            class='msm-item'
            onClick={() => {
              settingSliderHook.load!(
                <MineSettingsPage sliderFrameHook={settingSliderHook} onDataChanged={() => {}} />
              );
              MobileSideMenuHelper.hide();
            }}
          >
            <i class='ifc-icon ma-cog-outline'></i>
            Settings
          </div>
        </div>
        {footer && <div class='msm-footer-version'>{footer}</div>}
      </div>
    </div>
  );
};
