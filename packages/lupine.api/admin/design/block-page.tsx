import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';
import { buildCssVariables } from './css-variable-utils';

export const BlockPage = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};

  const isRoot = p.isRoot === true;
  const overflowY = p.overflowY || sysCss.overflowY;
  const shouldScrollY = overflowY === 'auto' || overflowY === 'scroll';
  const shouldClipY = overflowY === 'hidden';
  const shouldConstrainY = shouldScrollY || shouldClipY;
  const shouldFill = p.flex === '1';
  const naturalPageCss: CssProps = isRoot
    ? {}
    : shouldConstrainY
    ? {
        gridTemplateRows: 'auto',
        gridAutoRows: 'max-content',
        alignContent: 'start',
        alignSelf: 'stretch',
        overflowY,
        minHeight: '0',
        minBlockSize: '0',
      }
    : {
        height: shouldFill ? '100%' : 'auto',
        gridTemplateRows: 'auto',
        gridAutoRows: 'max-content',
        alignContent: 'start',
        alignSelf: shouldFill ? 'stretch' : 'flex-start',
        overflowY: 'visible',
        // '@media only screen and (max-width: 1399px)': { gridTemplateRows: 'auto', gridAutoRows: 'max-content' },
        // '@media only screen and (max-width: 991px)': { gridTemplateRows: 'auto', gridAutoRows: 'max-content' },
        // '@media only screen and (max-width: 767px)': { gridTemplateRows: 'auto', gridAutoRows: 'max-content' },
        // '@media only screen and (max-width: 480px)': { gridTemplateRows: 'auto', gridAutoRows: 'max-content' },
      };

  const baseSysCss: any = { ...sysCss };
  if (!isRoot && !shouldConstrainY) {
    delete baseSysCss.overflowY;
  }

  const cssVars = buildCssVariables(p.cssVars);

  const isHtmlMode = p.componentMode === 'html';
  const isFlexMode = p.componentMode === 'flex';

  const css: CssProps = {
    display: p.hidden ? 'none' : isFlexMode ? 'flex' : 'grid',
    width: '100%',
    minHeight: isRoot ? '100%' : shouldConstrainY ? '0' : undefined,
    minWidth: '0',
    minInlineSize: '0',
    minBlockSize: isRoot ? undefined : shouldConstrainY ? '0' : undefined,
    position: 'relative',
    zIndex: 'auto',
    boxSizing: 'border-box',
    flex: isRoot ? (p.flex === 'none' ? 'none' : '1 1 0') : shouldFill ? '1 1 0' : '0 0 auto',
    backgroundColor: p.backgroundColor || 'transparent',
    border: 'none',
    flexDirection: isFlexMode ? p.flexDirection || 'row' : undefined,
    flexWrap: isFlexMode ? p.flexWrap || 'nowrap' : undefined,
    gap: isFlexMode ? p.gap || '0' : undefined,
    alignItems: isFlexMode ? p.alignItems || 'stretch' : undefined,
    justifyContent: isFlexMode ? p.justifyContent || 'flex-start' : undefined,
    ...baseSysCss,
    ...cssVars,
    ...naturalPageCss,
    height: isRoot
      ? undefined
      : shouldConstrainY
      ? baseSysCss.height && baseSysCss.height !== 'auto'
        ? baseSysCss.height
        : '100%'
      : shouldFill
      ? baseSysCss.height || undefined
      : baseSysCss.height && baseSysCss.height !== '100%'
      ? baseSysCss.height
      : 'auto',
    overflowY: shouldConstrainY ? overflowY : baseSysCss.overflowY || 'visible',
  };

  return (
    <div css={css} class='block-page root-page' data-design-id={props.node.id}>
      {isHtmlMode ? <div dangerouslySetInnerHTML={p.content || ''} /> : props.node.children?.map((child) => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
