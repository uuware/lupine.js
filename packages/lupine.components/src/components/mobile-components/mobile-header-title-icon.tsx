/*
MobileHeaderTitleIcon can be used in MobileHeaderComponent's Center part.
It has it's own Left and Right icons.
*/
import { VNode, CssProps, HtmlVar } from 'lupine.components';

export const MobileHeadeIconHeight = '40px';
export const MobileHeadeBackIcon = ({ onClick }: { onClick: (event: Event) => void }) => {
  return <i class='ifc-icon mg-arrow_back_ios_new_outlined mhti-back-icon' onClick={(event) => onClick(event)}></i>;
};

export const MobileHeadeCloseIcon = ({ onClick }: { onClick: (event: Event) => void }) => {
  return <i class='ifc-icon ma-close mhti-close-icon' onClick={(event) => onClick(event)}></i>;
};

export const MobileHeaderEmptyIcon = () => {
  return <div class='mhti-empty-icon' style={{ width: '28px' }}></div>;
};

export interface MobileHeaderTitleIconHookProps {
  updateTitle?: (title: VNode<any> | string) => void;
  updateLeft?: (left: VNode<any>) => void;
  updateRight?: (right: VNode<any>) => void;
}
export interface MobileHeaderTitleIconProps {
  title: VNode<any> | string;
  onBack?: (event: Event) => void;
  left?: VNode<any>;
  right?: VNode<any>;
  hook?: MobileHeaderTitleIconHookProps;
}
// there may have a few MobileHeaderTitleIcon for different pages
export const MobileHeaderTitleIcon = ({ title, onBack, left, right, hook }: MobileHeaderTitleIconProps) => {
  // const processBack = (event: Event) => {
  //   if (onBack) {
  //     onBack(event);
  //   }
  // };
  // left = left || <MobileHeadeBackIcon onClick={processBack} />;
  // right = right || <MobileHeadeCloseIcon onClick={processBack} />;
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    padding: '6px 0',
    backgroundColor: 'var(--activatable-bg-color-normal)',
    boxShadow: 'var(--mobile-header-shadow)',
    '.mhti-title': {
      display: 'flex',
      fontSize: '1.3rem',
      flex: '1',
      color: 'var(--activatable-text-color-normal)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.mhti-title > *': {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.mhti-left, .mhti-right': {
      height: MobileHeadeIconHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px',
    },
    '.mhti-left': {
      paddingLeft: '8px',
    },
    '.mhti-right': {
      paddingRight: '8px',
    },
    '.mhti-left i, .mhti-right i': {
      fontSize: '28px',
    },
  };

  if (hook) {
    hook.updateTitle = (title: VNode<any> | string) => {
      domCenter.value = title;
    };
    hook.updateLeft = (left: VNode<any>) => {
      domLeft.value = left;
    };
    hook.updateRight = (right: VNode<any>) => {
      domRight.value = right;
    };
  }
  const domLeft = HtmlVar(left);
  const domCenter = HtmlVar(title);
  const domRight = HtmlVar(right);
  return (
    <div css={css} class='mobile-header-title-icon-top'>
      <div class='mhti-left'>{domLeft.node}</div>
      <div class='mhti-title'>{domCenter.node}</div>
      <div class='mhti-right'>{domRight.node}</div>
    </div>
  );
};
