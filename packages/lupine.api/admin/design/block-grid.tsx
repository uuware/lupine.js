import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';

export const BlockGrid = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};

  const css: CssProps = {
    display: p.hidden ? 'none' : 'grid',
    width: '100%',
    minHeight: '0',
    minWidth: '0',
    flex: p.flex === 'none' ? 'none' : '1',
    gap: p.gap || '0',
    alignItems: p.alignItems || 'stretch',
    justifyContent: p.justifyContent || 'flex-start',
    backgroundColor: p.backgroundColor || 'transparent',
    border: isPreview ? 'none' : '1px dashed #ccc',
    ...sysCss
  };

  return (
    <div css={css} class='block-grid' data-design-id={props.node.id}>
      {props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
