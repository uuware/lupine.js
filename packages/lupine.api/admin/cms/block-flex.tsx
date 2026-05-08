import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';
import { buildCssVariables } from './css-variable-utils';

export const BlockFlex = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};
  const overflowY = p.overflowY || sysCss.overflowY;
  const shouldScrollY = overflowY === 'auto' || overflowY === 'scroll';
  const shouldClipY = overflowY === 'hidden';
  const shouldConstrainY = shouldScrollY || shouldClipY;
  const shouldFill = p.flex === '1';

  const cssVars = buildCssVariables(p.cssVars);

  const isHtmlMode = p.componentMode === 'html';

  const css: CssProps = {
    display: p.hidden ? 'none' : isHtmlMode ? 'block' : 'flex',
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
    backgroundColor: p.backgroundColor || 'transparent',
    border: isPreview ? 'none' : '1px dashed #ccc',
    flexWrap: p.flexWrap || 'nowrap',
    ...sysCss,
    ...cssVars,
    height: shouldConstrainY
      ? (sysCss.height && sysCss.height !== 'auto' ? sysCss.height : '100%')
      : (shouldFill ? (sysCss.height || undefined) : (sysCss.height && sysCss.height !== '100%' ? sysCss.height : 'auto')),
    alignSelf: shouldConstrainY || shouldFill ? (sysCss.alignSelf || 'stretch') : (sysCss.alignSelf || 'start'),
    overflowY: overflowY || 'visible',
    ...(isPreview
      ? undefined
      : {
          '.empty-drop-zone': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // padding: '24px',
            color: '#aaa',
            fontStyle: 'italic',
            width: '100%',
            height: '100%',
            // minHeight: '50px',
          },
        }),
  };

  return (
    <div css={css} class='block-flex' data-design-id={props.node.id}>
      {isHtmlMode ? <div dangerouslySetInnerHTML={p.content || ''} /> : (
        <>
          {(!props.node.children || props.node.children.length === 0) && !isPreview && (
            <div class='empty-drop-zone text-center w-100'>Drop components or containers here</div>
          )}
          {props.node.children?.map((child) => (
            <RenderBlocks key={child.id} node={child} />
          ))}
        </>
      )}
    </div>
  );
};
