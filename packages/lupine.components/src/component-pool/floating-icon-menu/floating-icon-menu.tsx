import { CssProps, RefProps, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';
import { IconMenuItemProps } from '../../components/mobile-components/icon-menu-item-props';

export interface FloatingIconMenuProps {
  mainIcon: IconMenuItemProps;
  items: IconMenuItemProps[];
  className?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const FloatingIconMenu = (props: FloatingIconMenuProps) => {
  const css: CssProps = {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    zIndex: '1000',

    '&.dir-up': { flexDirection: 'column-reverse' },
    '&.dir-up .&-children': { flexDirection: 'column-reverse' },

    '&.dir-down': { flexDirection: 'column' },
    '&.dir-down .&-children': { flexDirection: 'column' },

    '&.dir-left': { flexDirection: 'row-reverse' },
    '&.dir-left .&-children': { flexDirection: 'row-reverse' },

    '&.dir-right': { flexDirection: 'row' },
    '&.dir-right .&-children': { flexDirection: 'row' },

    '.&-main-btn': {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-color)',
      color: 'var(--primary-bg-color)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.15))',
      cursor: 'pointer',
      transition: 'transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), background-color 0.3s',
      fontSize: '24px',
      i: {
        transition: 'transform 0.3s',
      },
    },

    // When the menu is open
    '&.is-open .&-main-btn': {
      backgroundColor: 'var(--danger-color, #ff4d4f)',
      // The icon revolves
      i: {
        transform: 'rotate(135deg)',
      },
    },

    '.&-children': {
      display: 'flex',
      gap: '16px',
    },

    '.&-child-item': {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-bg-color)',
      color: 'var(--primary-color)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.1))',
      cursor: 'pointer',
      textDecoration: 'none',
      position: 'relative',
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      fontSize: '20px',
    },

    '&.dir-up .&-child-item': { transform: 'translateY(16px) scale(0.8)' },
    '&.dir-down .&-child-item': { transform: 'translateY(-16px) scale(0.8)' },
    '&.dir-left .&-child-item': { transform: 'translateX(16px) scale(0.8)' },
    '&.dir-right .&-child-item': { transform: 'translateX(-16px) scale(0.8)' },

    '&.is-open .&-child-item': {
      opacity: '1',
      visibility: 'visible',
      transform: 'translate(0, 0) scale(1)',
    },

    '.&-child-item:hover': {
      backgroundColor: 'var(--secondary-bg-color)',
    },

    '.&-text-label': {
      position: 'absolute',
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--primary-bg-color)',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'all 0.3s ease',
    },

    // Label positioning classes
    '&.label-pos-left .&-text-label': {
      right: '60px',
      transform: 'translateX(10px)',
    },
    '&.label-pos-right .&-text-label': {
      left: '60px',
      transform: 'translateX(-10px)',
    },
    '&.label-pos-top .&-text-label': {
      bottom: '60px',
      transform: 'translateY(10px)',
    },
    '&.label-pos-bottom .&-text-label': {
      top: '60px',
      transform: 'translateY(-10px)',
    },

    '&.is-open.label-pos-left .&-text-label': { transform: 'translateX(0)' },
    '&.is-open.label-pos-right .&-text-label': { transform: 'translateX(0)' },
    '&.is-open.label-pos-top .&-text-label': { transform: 'translateY(0)' },
    '&.is-open.label-pos-bottom .&-text-label': { transform: 'translateY(0)' },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const ref: RefProps = {
    globalCssId,
  };

  const toggleMenu = () => {
    // We get the root container of this component
    const root = ref.current as HTMLElement;
    if (root) {
      if (root.classList.contains('is-open')) {
        root.classList.remove('is-open');
      } else {
        root.classList.add('is-open');
      }
    }

    // Also trigger the js of the main button if defined
    if (props.mainIcon.js) {
      props.mainIcon.js();
    }
  };

  const top = props.top;
  const left = props.left;
  // If top/left are defined without bottom/right, don't set bottom/right to '20px'
  const bottom = props.bottom !== undefined ? props.bottom : top !== undefined ? undefined : '20px';
  const right = props.right !== undefined ? props.right : left !== undefined ? undefined : '20px';

  const containerStyle: any = {};
  if (top !== undefined) containerStyle.top = top;
  if (left !== undefined) containerStyle.left = left;
  if (bottom !== undefined) containerStyle.bottom = bottom;
  if (right !== undefined) containerStyle.right = right;

  const direction = props.direction || 'up';

  let labelPos = 'left';
  if (direction === 'up' || direction === 'down') {
    labelPos = left !== undefined ? 'right' : 'left';
  } else {
    labelPos = top !== undefined ? 'bottom' : 'top';
  }

  const wrapperClass = ['floating-icon-menu', `dir-${direction}`, `label-pos-${labelPos}`, props.className]
    .filter(Boolean)
    .join(' ');

  return (
    <div class={wrapperClass} style={containerStyle} ref={ref}>
      <div class='&-main-btn' onClick={toggleMenu}>
        <i class={`ifc-icon ${props.mainIcon.icon}`}></i>
      </div>

      <div class='&-children'>
        {props.items.map((item, index) => {
          const handleClick = (e: Event) => {
            if (item.js) {
              e.preventDefault();
              item.js();
            }
            // Auto close after click
            ref.current.classList.remove('is-open');
          };

          const delay = `${index * 0.05}s`;

          return (
            <a
              class='&-child-item'
              href={item.url || 'javascript:void(0)'}
              onClick={handleClick}
              style={{ transitionDelay: delay }}
            >
              <span class='&-text-label' style={{ transitionDelay: delay }}>
                {item.text}
              </span>
              <i class={`ifc-icon ${item.icon}`}></i>
            </a>
          );
        })}
      </div>
    </div>
  );
};
