import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';

export const BlockPlaceholder = (props: { node: DesignNode; contentReplacement?: any }) => {
  if (props.contentReplacement) {
     return <div class="placeholder-replaced">{props.contentReplacement}</div>;
  }
  
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props || {};

  const css: CssProps = {
    width: '100%',
    height: '100%',
    flex: props.node.props?.flex === 'none' ? 'none' : '1',
    overflowY: p.overflowY || 'auto',
    padding: '32px',
    backgroundColor: '#f5f5f5',
    border: isPreview ? 'none' : '2px dashed #ccc',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: '#999',
    boxSizing: 'border-box',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node))
  };

  return (
    <div css={css} class='block-placeholder' data-design-id={props.node.id}>
      Content Placeholder
    </div>
  );
};
