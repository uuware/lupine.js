import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';
import { buildCssVariables } from './css-variable-utils';

export const BlockGrid = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};
  const overflowY = p.overflowY || sysCss.overflowY;
  const shouldScrollY = overflowY === 'auto' || overflowY === 'scroll';
  const shouldClipY = overflowY === 'hidden';
  const shouldConstrainY = shouldScrollY || shouldClipY;
  const shouldFill = p.flex === '1';
  const isHorizontal = p.layoutDirection !== 'vertical';
  // const naturalRowCss: any = isHorizontal
  //   ? {
  //       gridTemplateRows: 'auto',
  //       '@media only screen and (max-width: 1399px)': { gridTemplateRows: 'auto' },
  //       '@media only screen and (max-width: 991px)': { gridTemplateRows: 'auto' },
  //       '@media only screen and (max-width: 767px)': { gridTemplateRows: 'auto' },
  //       '@media only screen and (max-width: 480px)': { gridTemplateRows: 'auto' },
  //     }
  //   : {};

  const baseSysCss: any = { ...sysCss };

  const cssVars = buildCssVariables(p.cssVars);

  const isHtmlMode = p.componentMode === 'html';

  const css: CssProps = {
    display: p.hidden ? 'none' : 'grid',
    width: '100%',
    minHeight: shouldConstrainY ? '0' : undefined,
    minWidth: '0',
    minInlineSize: '0',
    minBlockSize: shouldConstrainY ? '0' : undefined,
    position: 'relative',
    zIndex: 'auto',
    boxSizing: 'border-box',
    // fix grid-row's overlap issue
    flex: shouldFill ? '1 1 0' : '0 0 auto',
    gap: p.gap || '0',
    alignItems: p.alignItems || 'stretch',
    justifyContent: p.justifyContent || 'flex-start',
    backgroundColor: p.backgroundColor || 'transparent',
    border: isPreview ? 'none' : '1px dashed #ccc',
    ...baseSysCss,
    ...cssVars,
    // ...naturalRowCss,
    height: shouldConstrainY
      ? (sysCss.height && sysCss.height !== 'auto' ? sysCss.height : '100%')
      : (shouldFill ? (sysCss.height || undefined) : (sysCss.height && sysCss.height !== '100%' ? sysCss.height : 'auto')),
    alignSelf: shouldConstrainY || shouldFill ? (sysCss.alignSelf || 'stretch') : (sysCss.alignSelf || 'start'),
    overflowY: overflowY || 'visible',
  };

  return (
    <div css={css} class='block-grid' data-design-id={props.node.id}>
      {isHtmlMode ? <div dangerouslySetInnerHTML={p.content || ''} /> : props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
