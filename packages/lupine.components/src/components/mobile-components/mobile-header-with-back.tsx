/*
HeaderWithBackFrame is a full page frame with header for mobile sliders.
It has Back icon at Left and Close icon at Right.
*/
import { VNode, CssProps, RefProps, HtmlVar, backActionHelper } from 'lupine.components';
import { MobileHeaderTitleIcon } from './mobile-header-title-icon';

export const HeaderWithBackFrameHeight = '40px';
export const HeaderWithBackFrameLeft = ({ onClick }: { onClick: (event: Event) => void }) => {
  return (
    <i
      class='ifc-icon mg-arrow_back_ios_new_outlined header-back-left-icon'
      data-back-action={backActionHelper.genBackActionId()}
      onClick={(event) => onClick(event)}
    ></i>
  );
};

export const HeaderWithBackFrameRight = ({ onClick }: { onClick: (event: Event) => void }) => {
  return <i class='ifc-icon ma-close header-back-right-icon' onClick={(event) => onClick(event)}></i>;
};

export const HeaderWithBackFrameEmpty = () => {
  return <div class='header-back-top-empty'></div>;
};

// there may have a few HeaderWithBackFrame one over another at the same time
export const HeaderWithBackFrame = ({
  children,
  title,
  onBack,
  left,
  right,
  noHeader = false,
  background,
  color,
  noShadow,
  contentColor,
  contentBackground,
}: {
  children: VNode<any>;
  title: VNode<any> | string | HtmlVar;
  onBack: (event: Event) => void;
  left?: VNode<any> | HtmlVar;
  right?: VNode<any> | HtmlVar;
  noHeader?: boolean;
  color?: string;
  background?: string;
  noShadow?: boolean;
  contentColor?: string;
  contentBackground?: string;
}) => {
  left = left || <HeaderWithBackFrameLeft onClick={onBack} />;
  right = right || <HeaderWithBackFrameRight onClick={onBack} />;
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    background: background || 'var(--activatable-bg-color-normal)',
    '.header-back-top': {
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
      padding: '6px 0',
      backgroundColor: 'var(--activatable-bg-color-normal)',
      boxShadow: 'var(--mobile-header-shadow)',
    },
    '.header-back-content': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      position: 'relative',
      color: contentColor || 'var(--primary-color)',
      background: contentBackground || 'var(--activatable-bg-color-normal)',
      '&::-webkit-scrollbar': {
        display: 'none',
        // height: '0',
      },
    },
    '.header-back-title': {
      fontSize: '15px',
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

  const domLeft = left instanceof HtmlVar ? left : new HtmlVar(left);
  const domCenter = title instanceof HtmlVar ? title : new HtmlVar(title);
  const domRight = right instanceof HtmlVar ? right : new HtmlVar(right);
  const ref: RefProps = {};
  return (
    <div ref={ref} css={css} class='header-back-frame'>
      {!noHeader && <MobileHeaderTitleIcon onBack={onBack} left={domLeft} title={domCenter} right={domRight} background={background} color={color} noShadow={noShadow} />}
      <div class='header-back-content'>{children}</div>
    </div>
  );
};
