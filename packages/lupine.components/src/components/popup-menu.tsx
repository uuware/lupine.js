import { CssProps, RefProps, VNode } from 'lupine.web';
import { stopPropagation } from '../lib';
import { MenuItemProps } from './menu-item-props';

export type PopupMenuHookProps = {
  openMenu?: (event?: MouseEvent) => void;
  getValue?: () => string;
  setLabel?: (label: string) => void;
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
        tips={props.tips}
        minWidth={props.minWidth}
        maxWidth={props.maxWidth}
        maxHeight={props.maxHeight}
        handleSelected={props.handleSelected}
        handleOpened={props.handleOpened}
        handleClosed={props.handleClosed}
        noUpdateLabel={props.noUpdateLabel}
        hook={hook}
        noTriangleIcon={props.noTriangleIcon}
      ></PopupMenu>
    </div>
  );
};

export type PopupMenuProps = {
  list: (string | MenuItemProps)[];
  defaultValue: string;
  icon?: VNode<any>;
  tips?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  handleSelected?: Function;
  handleOpened?: Function;
  handleClosed?: Function;
  noUpdateLabel?: boolean;
  hook?: PopupMenuHookProps;
  noTriangleIcon?: boolean;
  align?: 'left' | 'right';
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
        tips={props.tips}
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
        tips={props.tips}
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

export const PopupMenu = ({
  list,
  defaultValue,
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
    '.popup-menu-item': {
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
    },
    '.popup-menu-item:hover': {
      padding: '1px 0 0 0',
    },
    '.popup-menu-bottom': {
      position: 'relative',
      height: '1px',
      '.popup-menu-list': {
        display: 'none',
        position: 'absolute',
        fontSize: 'var(--menu-font-size)',
        top: 0,
        width: width || '100px',
        color: 'var(--activatable-color-normal)',
        backgroundColor: 'var(--activatable-bg-color-normal)',
        zIndex: 'var(--layer-menu)',
        borderRadius: '4px',
        border: '1px solid #ddd',
        padding: '5px 0px',
        overflow: 'auto',
        'line-height': '1.2em',
        'min-width': minWidth || 'max-content',
        'max-width': maxWidth || '200px',
        'max-height': maxHeight || '300px',
        'box-shadow': 'var(--cover-box-shadow)', //'#0000004c 0px 19px 38px, #00000038 0px 15px 12px',
        '.menu-focus': {
          position: 'absolute',
          height: '0px',
        },
        '.item': {
          padding: '2px 12px',
        },
        '.item:hover': {
          padding: '2px 11px 2px 13px',
          color: 'var(--activatable-color-hover)',
          backgroundColor: 'var(--activatable-bg-color-hover)',
          cursor: 'pointer',
        },
        '.item.indent1': {
          paddingLeft: '19px',
        },
        '.item.indent1:hover': {
          paddingLeft: '18px',
        },
        '.item.indent2': {
          paddingLeft: '35px',
        },
        '.item.indent2:hover': {
          paddingLeft: '34px',
        },
      },
      '.popup-menu-list.left-align': {
        left: '2px',
      },
      '.popup-menu-list.right-align': {
        right: '2px',
      },
      '.popup-menu-list.open': {
        display: 'inline-block',
      },
    },
  };

  let ref: RefProps = { id: '' };
  let isShowing = false;
  let selectedValue = defaultValue;
  const openMenu = (event?: MouseEvent) => {
    stopPropagation(event);

    handleOpened && handleOpened();
    // console.log('=======22', event);
    isShowing = !isShowing;
    const listDom = ref.$('.popup-menu-list');
    if (align === 'left') {
      listDom.classList.add('left-align');
    } else {
      listDom.classList.add('right-align');
    }
    listDom.classList.toggle('open', isShowing);
    ref.$('.popup-menu-list .menu-focus').focus();
  };
  if (hook) {
    hook.openMenu = openMenu;
    hook.getValue = () => selectedValue;
    hook.setLabel = (label: string) => {
      if (!icon && noUpdateLabel !== true) {
        ref.$('.popup-menu-item .popup-menu-text').innerText = label;
      }
    };
  }
  const itemClick = (event: any, item: any) => {
    stopPropagation(event);

    // console.log('=======', event);
    isShowing = false;
    ref.$('.popup-menu-list').classList.remove('open');
    if (event.target) {
      selectedValue = event.target.innerText;
      if (!icon && noUpdateLabel !== true) {
        ref.$('.popup-menu-item .popup-menu-text').innerText = event.target.innerText;
      }
      if (handleSelected) {
        handleSelected(event.target.innerText, item);
      }
    }
    handleClosed && handleClosed();
  };
  const onBlur = (event: any) => {
    setTimeout(() => {
      ref.$('.popup-menu-list').classList.remove('open');
      isShowing && handleClosed && handleClosed();
      isShowing = false;
    }, 300);
  };

  return (
    <div ref={ref} css={css} onClick={openMenu} title={tips}>
      <div class='popup-menu-item'>
        {icon ? (
          icon
        ) : (
          <span class={'popup-menu-text' + (noTriangleIcon !== true ? ' triangle-icon' : '')}>
            {defaultValue || '&nbsp;'}
          </span>
        )}
      </div>
      <div class='popup-menu-bottom'>
        <div class='popup-menu-list'>
          <div>
            {list.map((item) => {
              if (item === '') return <hr />;
              const text = typeof item === 'string' ? item : item.text;
              const indent = typeof item === 'string' ? 0 : item.indent;
              return (
                <div class={'item' + (indent ? ' indent' + indent : '')} onClick={(e) => itemClick(e, item)}>
                  {text}
                </div>
              );
            })}
          </div>
          <div class='menu-focus' onBlur={onBlur} tabIndex={0}></div>
        </div>
      </div>
    </div>
  );
};
