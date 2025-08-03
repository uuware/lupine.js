import { VNode, CssProps, RefProps, HtmlVar } from 'lupine.components';

export const HeaderWithBackFrameHeight = '40px';
export const HeaderWithBackFrameLeft = ({ onClick }: { onClick: (event: Event) => void }) => {
  return (
    <i class='ifc-icon mg-arrow_back_ios_new_outlined header-back-left-icon' onClick={(event) => onClick(event)}></i>
  );
};

export const HeaderWithBackFrameRight = ({ onClick }: { onClick: (event: Event) => void }) => {
  return <i class='ifc-icon ma-close header-back-right-icon' onClick={(event) => onClick(event)}></i>;
};

export const HeaderWithBackFrameEmpty = () => {
  return <div class='header-back-top-empty'></div>;
};

export interface HeaderWithBackFrameHookProps {
  updateTitle?: (title: string) => void;
  updateLeft?: (left: VNode<any>) => void;
  updateRight?: (right: VNode<any>) => void;
}
export const HeaderWithBackFrame = ({
  children,
  title,
  onBack,
  left,
  right,
  hook,
  noHeader = false,
}: {
  children: VNode<any>;
  title: string;
  onBack: (event: Event) => void;
  left?: VNode<any>;
  right?: VNode<any>;
  hook?: HeaderWithBackFrameHookProps;
  noHeader?: boolean;
}) => {
  left = left || <HeaderWithBackFrameLeft onClick={onBack} />;
  right = right || <HeaderWithBackFrameRight onClick={onBack} />;
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    '.header-back-top': {
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
      padding: '6px 0',
      backgroundColor: 'var(--activatable-bg-color-normal)',
      boxShadow: '0 2px 4px var(--primary-border-color)',
    },
    '.header-back-content': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      position: 'relative',
      '&::-webkit-scrollbar': {
        height: '0',
      },
    },
    '.header-back-title': {
      flex: '1',
      color: 'var(--activatable-text-color-normal)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.header-back-left, .header-back-right': {
      // width: HeaderWithBackFrameHeight,
      height: HeaderWithBackFrameHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '0 8px',
    },
    '.header-back-left i, .header-back-right i': {
      fontSize: '28px',
    },

  };

  if (hook) {
    hook.updateTitle = (title: string) => {
      const titleDom = ref.current?.querySelector('.header-back-title') as HTMLDivElement;
      titleDom && (titleDom.textContent = title);
    };
    hook.updateLeft = (left: VNode<any>) => {
      domLeft.value = left;
    };
    hook.updateRight = (right: VNode<any>) => {
      domRight.value = right;
    };
  }
  const domLeft = HtmlVar(left);
  const domRight = HtmlVar(right);
  const ref: RefProps = {};
  return (
    <div ref={ref} css={css} class='header-back-frame'>
      {!noHeader && (
        <div class='header-back-top'>
          <div class='header-back-left'>{domLeft.node}</div>
          <div class='mobile-title header-back-title'>{title}</div>
          <div class='header-back-right'>{domRight.node}</div>
        </div>
      )}
      <div class='header-back-content'>{children}</div>
    </div>
  );
};
