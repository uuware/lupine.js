import {
  CssProps,
  RefProps,
  VNode,
  bindGlobalStyle,
  getGlobalStylesId,
  mountInnerComponent,
  uniqueIdGenerator,
} from 'lupine.web';
import { stopPropagation } from '../lib';
import { MenuItemProps } from './menu-item-props';
import { calcPreferredPosition } from '../component-pool/picker-helper';

export type ContentMenuPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export type ContentMenuOptions = {
  position?: ContentMenuPosition;
  align?: 'left' | 'right'; // specifically when position is top/bottom
  x?: number;
  y?: number;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  handleSelected?: (value: string, item: any) => void;
  handleOpened?: () => void;
  handleClosed?: () => void;
};

const contentMenuCss: CssProps = {
  position: 'fixed',
  zIndex: 'var(--layer-menu, 2000)',
  opacity: 0,
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  transform: 'scale(0.95)',
  fontSize: 'var(--menu-font-size, 14px)',
  color: 'var(--activatable-color-normal, inherit)',
  backgroundColor: 'var(--activatable-bg-color-normal, var(--primary-bg-color, #fff))',
  borderRadius: '4px',
  border: '1px solid var(--secondary-border-color, #ddd)',
  boxShadow: 'var(--cover-box-shadow, 0 2px 8px rgba(0,0,0,0.15))',
  overflow: 'auto',
  padding: '5px 0',

  '&.visible': {
    opacity: 1,
    transform: 'scale(1)',
  },

  '.&-item': {
    padding: '6px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minHeight: '32px',
    boxSizing: 'border-box',
    '&:hover': {
      color: 'var(--activatable-color-hover, inherit)',
      backgroundColor: 'var(--activatable-bg-color-hover, var(--secondary-bg-color, #f5f5f5))',
    },
    '&.indent1': { paddingLeft: '32px' },
    '&.indent2': { paddingLeft: '48px' },
  },

  '.&-icon-placeholder': {
    width: '1em',
    height: '1em',
    flexShrink: 0,
    display: 'inline-block',
  },

  '.&-icon': {
    width: '1em',
    height: '1em',
    flexShrink: 0,
    display: 'inline-block',
    fontSize: 'inherit',
    lineHeight: '1em',
    verticalAlign: 'middle',
    textAlign: 'center',
  },

  '.&-divider': {
    margin: '4px 0',
    height: '1px',
    backgroundColor: 'var(--secondary-border-color, #eee)',
  },

  '.&-focus': {
    position: 'absolute',
    height: '0px',
    width: '0px',
    opacity: 0,
    overflow: 'hidden',
  },
};

export class ContentMenu {
  private static host: HTMLElement | null = null;
  private static ref: RefProps | null = null;
  private static closeTimer: any = null;
  private static currentInstanceId = '';
  private static uuidGen = uniqueIdGenerator('cm');

  private static initHost() {
    if (this.host) return;
    this.host = document.createElement('div');
    document.body.appendChild(this.host);
  }

  static async show(target: HTMLElement | null, list: (string | MenuItemProps)[], options: ContentMenuOptions = {}) {
    if (!target && (options.x === undefined || options.y === undefined)) return;

    const instanceId = this.uuidGen();
    this.currentInstanceId = instanceId;

    this.initHost();
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
      if (this.ref?.current) {
        (this.ref.current as HTMLElement).classList.remove('visible');
      }
    }

    if (options.handleOpened) options.handleOpened();

    const requestedPos = options.position ?? 'auto';
    const isAuto = requestedPos === 'auto';
    // Start invisible at top to measure
    const initialPos = isAuto ? 'bottom' : requestedPos;

    const hasAnyIcon = list.some((item) => typeof item !== 'string' && item.icon);

    const component = (
      <ContentMenuContainer
        list={list}
        options={options}
        hasAnyIcon={hasAnyIcon}
        onRef={(r) => (this.ref = r)}
        onClose={() => this.hide(instanceId, options.handleClosed)}
      />
    );

    await mountInnerComponent(this.host!, component);

    const menuEl = this.ref?.current as HTMLElement;
    if (!menuEl) return;

    // Apply width/max styles
    if (options.width) menuEl.style.width = options.width;
    if (options.minWidth) menuEl.style.minWidth = options.minWidth;
    if (options.maxWidth) menuEl.style.maxWidth = options.maxWidth;
    if (options.maxHeight) {
      menuEl.style.maxHeight = options.maxHeight;
    }

    const menuWidth = menuEl.offsetWidth;
    const menuHeight = menuEl.offsetHeight;
    let top = 0;
    let left = 0;

    if (target) {
      const rect = target.getBoundingClientRect();
      const offset = 4;

      const position = isAuto ? calcPreferredPosition(rect, menuWidth, menuHeight, offset) : requestedPos;

      if (position === 'top') {
        top = rect.top - menuHeight - offset;
        left = rect.left;
        if (options.align === 'right') {
          left = rect.left + rect.width - menuWidth;
        }
      } else if (position === 'bottom') {
        top = rect.top + rect.height + offset;
        left = rect.left;
        if (options.align === 'right') {
          left = rect.left + rect.width - menuWidth;
        }
      } else if (position === 'left') {
        top = rect.top;
        left = rect.left - menuWidth - offset;
      } else if (position === 'right') {
        top = rect.top;
        left = rect.left + rect.width + offset;
      }
    } else {
      // Use absolute coordinates
      top = options.y || 0;
      left = options.x || 0;
    }

    // Horizontal boundary clamp
    if (left < 10) left = 10;
    if (left + menuWidth > window.innerWidth - 10) left = window.innerWidth - menuWidth - 10;

    // Vertical boundary clamp
    if (top < 10) top = 10;

    // Dynamic max-height if it goes off bottom screen and no explicit max height
    if (top + menuHeight > window.innerHeight - 10) {
      if (!options.maxHeight) {
        const availableHeight = window.innerHeight - top - 10;
        menuEl.style.maxHeight = `${Math.max(100, availableHeight)}px`;
      }
      top = window.innerHeight - menuEl.offsetHeight - 10; // Recalculate top just in case
    }

    menuEl.style.top = `${top}px`;
    menuEl.style.left = `${left}px`;

    requestAnimationFrame(() => {
      menuEl.classList.add('visible');
      const focusEl = this.ref?.$('.&-focus') as HTMLElement;
      if (focusEl) focusEl.focus();
    });
  }

  static hide(instanceIdOrCb?: string | (() => void), onClosedCallback?: () => void) {
    let callback = onClosedCallback;
    let reqInstanceId: string | undefined;

    if (typeof instanceIdOrCb === 'function') {
      callback = instanceIdOrCb;
    } else if (typeof instanceIdOrCb === 'string') {
      reqInstanceId = instanceIdOrCb;
    }

    // Ignore if this hide request came from an outdated menu instance
    if (reqInstanceId !== undefined && reqInstanceId !== this.currentInstanceId) return;

    if (!this.ref?.current) return;
    const menuEl = this.ref.current as HTMLElement;
    menuEl.classList.remove('visible');

    this.closeTimer = setTimeout(() => {
      // Re-verify instance in case another menu opened during the 200ms fade-out
      if (reqInstanceId !== undefined && reqInstanceId !== this.currentInstanceId) return;

      if (this.host) {
        this.host.innerHTML = '';
      }
      if (callback) callback();
    }, 200);
  }
}

const ContentMenuContainer = (props: {
  list: (string | MenuItemProps)[];
  options: ContentMenuOptions;
  hasAnyIcon: boolean;
  onRef: (ref: RefProps) => void;
  onClose: () => void;
}) => {
  const globalCssId = getGlobalStylesId(contentMenuCss);
  bindGlobalStyle(globalCssId, contentMenuCss);

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      props.onRef(ref);
    },
  };

  const itemClick = (event: any, item: string | MenuItemProps) => {
    event.stopPropagation();
    event.preventDefault();

    if (item === '-') return;

    if (props.options.handleSelected) {
      const text = typeof item === 'string' ? item : item.text;
      props.options.handleSelected(text, item);
    }

    if (typeof item !== 'string' && item.js) {
      item.js();
    }

    props.onClose();
  };

  const onBlur = (event: FocusEvent) => {
    // Timeout to allow click events to register before removing DOM
    setTimeout(() => {
      props.onClose();
    }, 150);
  };

  const renderIcon = (icon?: string | VNode<any>) => {
    if (!icon) {
      if (props.hasAnyIcon) {
        return <div class='&-icon-placeholder'></div>;
      }
      return null;
    }

    if (typeof icon === 'string') {
      if (icon.startsWith('<') || icon.startsWith('data:')) {
        return <img src={icon} class='&-icon' />;
      }
      return <i class={['&-icon', 'ifc-icon', icon].join(' ')}></i>;
    }
    return <div class='&-icon'>{icon}</div>;
  };

  return (
    <div class='&-container' ref={ref}>
      {props.list.map((item) => {
        if (item === '-' || item === '') return <div class='&-divider'></div>;

        const isStr = typeof item === 'string';
        const text = isStr ? item : item.text;
        const indentClass = !isStr && item.indent ? `indent${item.indent}` : '';
        const hide = !isStr && item.hide;

        if (hide) return null;

        return (
          <div
            class={['&-item', indentClass].filter(Boolean).join(' ')}
            onClick={(e) => itemClick(e, item)}
            title={!isStr && item.alt ? item.alt : undefined}
          >
            {renderIcon(!isStr ? item.icon : undefined)}
            <span>{text}</span>
          </div>
        );
      })}
      <div class='&-focus' onBlur={onBlur} tabIndex={0}></div>
    </div>
  );
};

export type PopupMenuHookProps = {
  openMenu?: (event?: MouseEvent) => void;
  getValue?: () => string;
  setLabel?: (label: string) => void;
};

export type PopupMenuProps = {
  list: (string | MenuItemProps)[];
  defaultValue?: string;
  icon?: VNode<any>;
  tips?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  handleSelected?: Function;
  handleOpened?: () => void;
  handleClosed?: () => void;
  noUpdateLabel?: boolean;
  hook?: PopupMenuHookProps;
  noTriangleIcon?: boolean;
  align?: 'left' | 'right';
};

export const PopupMenu = ({
  list,
  defaultValue = '',
  icon,
  tips = '',
  width,
  minWidth,
  maxWidth,
  maxHeight,
  handleSelected,
  handleOpened,
  handleClosed,
  noUpdateLabel,
  hook,
  align = 'right',
  noTriangleIcon,
}: PopupMenuProps) => {
  const css: CssProps = {
    padding: '0 0 1px 0',
    display: 'inline-block',
    position: 'relative',
    '.triangle-icon': {
      display: 'inline-block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      marginRight: '15px',
    },
    // cover-box-shadow
    '.triangle-icon::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: '3px',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid var(--primary-color)',
    },
    '&:hover': {
      padding: '1px 0 0 0',
    },
  };

  let ref: RefProps = { id: '' };
  let selectedValue = defaultValue;

  const openMenu = (event?: MouseEvent) => {
    stopPropagation(event);
    if (!ref.current) return;

    ContentMenu.show(ref.current as HTMLElement, list, {
      position: 'bottom',
      align: align,
      width,
      minWidth,
      maxWidth,
      maxHeight,
      handleOpened,
      handleClosed,
      handleSelected: (value: string, item: any) => {
        selectedValue = value;
        if (!icon && noUpdateLabel !== true) {
          ref.$('.popup-menu-text').innerText = value;
        }
        if (handleSelected) {
          handleSelected(value, item);
        }
      },
    });
  };

  if (hook) {
    hook.openMenu = openMenu;
    hook.getValue = () => selectedValue;
    hook.setLabel = (label: string) => {
      if (!icon && noUpdateLabel !== true) {
        ref.$('.popup-menu-text').innerText = label;
      }
    };
  }

  return (
    <div ref={ref} css={css} onClick={openMenu} title={tips}>
      {icon ? (
        icon
      ) : (
        <span class={'popup-menu-text' + (noTriangleIcon !== true ? ' triangle-icon' : '')}>
          {defaultValue || '\u00A0'}
        </span>
      )}
    </div>
  );
};

// defaultValue=<i class='ifc-icon co-cil-hamburger-menu'></i>
export const PopupMenuWithIcon = (props: PopupMenuProps) => {
  const hook: PopupMenuHookProps = {};
  const css: CssProps = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '24px',
  };
  return (
    <div
      onClick={() => {
        hook.openMenu && hook.openMenu();
      }}
      css={css}
    >
      <PopupMenu
        list={props.list}
        defaultValue={props.defaultValue}
        icon={props.icon}
        tips={props.tips}
        width={props.width}
        minWidth={props.minWidth}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight}
        handleSelected={props.handleSelected}
        handleOpened={props.handleOpened}
        handleClosed={props.handleClosed}
        noUpdateLabel={props.noUpdateLabel}
        hook={hook}
        noTriangleIcon={props.noTriangleIcon}
        align={props.align}
      ></PopupMenu>
    </div>
  );
};

export type PopupMenuWithButtonProps = { label: string } & PopupMenuProps;

export const PopupMenuWithButton = (props: PopupMenuWithButtonProps) => {
  const hook: PopupMenuHookProps = {};
  return (
    <button
      class='button-base'
      onClick={() => {
        hook.openMenu && hook.openMenu();
      }}
      css={{ '>div': { float: 'right', textAlign: 'left' } }}
    >
      {props.label}:{' '}
      <PopupMenu
        list={props.list}
        defaultValue={props.defaultValue}
        icon={props.icon}
        tips={props.tips}
        width={props.width}
        minWidth={props.minWidth}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight}
        handleSelected={props.handleSelected}
        handleOpened={props.handleOpened}
        handleClosed={props.handleClosed}
        noUpdateLabel={props.noUpdateLabel}
        hook={hook}
        noTriangleIcon={props.noTriangleIcon}
        align={props.align}
      ></PopupMenu>
    </button>
  );
};

export type PopupMenuWithLabelProps = { label: string } & PopupMenuProps;

export const PopupMenuWithLabel = (props: PopupMenuWithLabelProps) => {
  const hook: PopupMenuHookProps = {};
  return (
    <div
      onClick={() => {
        hook.openMenu && hook.openMenu();
      }}
      css={{ cursor: 'pointer', '>div': { float: 'right', textAlign: 'left' } }}
    >
      {props.label}:{' '}
      <PopupMenu
        list={props.list}
        defaultValue={props.defaultValue}
        icon={props.icon}
        tips={props.tips}
        width={props.width}
        minWidth={props.minWidth}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight}
        handleSelected={props.handleSelected}
        handleOpened={props.handleOpened}
        handleClosed={props.handleClosed}
        noUpdateLabel={props.noUpdateLabel}
        hook={hook}
        noTriangleIcon={props.noTriangleIcon}
        align={props.align}
      ></PopupMenu>
    </div>
  );
};
