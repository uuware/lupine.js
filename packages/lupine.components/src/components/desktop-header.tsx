import { CssProps } from 'lupine.components';
import { IconMenuItemProps } from './mobile-components/icon-menu-item-props';

export const DesktopHeader = (props: { title: string; items: IconMenuItemProps[] }) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    '.d-header-title': {
      display: 'flex',
      flex: '1',
      margin: '8px 16px',
      textShadow: '-3px -3px 10px white, 3px 3px 10px black',
      color: 'darkblue',
      fontSize: '22px',
    },
    '.desktop-menu-bar': {
      display: 'flex',
      flexDirection: 'row',
      width: 'auto',
      padding: '4px 16px 0',
      '.desktop-menu-item': {
        display: 'flex',
        padding: '0 8px',
        height: 'fit-content',
        a: {
          textDecoration: 'none',
          color: 'var(--sidebar-color)',
          i: {
            paddingRight: '4px',
          },
        },
      },
    },
  };
  return (
    <div css={css} class='desktop-menu-box'>
      <div class='flex-1 d-header-title'>{props.title}</div>
      <div class='desktop-menu-bar'>
        {props.items.map((item) => (
          <div class='desktop-menu-item'>
            <a href={item.href}>
              <i class={`ifc-icon ${item.icon}`}></i>
              {item.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
