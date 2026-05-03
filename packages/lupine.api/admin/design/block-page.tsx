import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';

export const BlockPage = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};

  const css: CssProps = {
    display: p.hidden ? 'none' : 'grid',
    width: '100%',
    minHeight: p.isRoot ? '100vh' : '0',
    minWidth: '0',
    flex: p.flex === 'none' ? 'none' : '1',
    backgroundColor: p.backgroundColor || 'transparent',
    border: 'none',
    ...sysCss
  };

  return (
    <div css={css} class='block-page root-page' data-design-id={props.node.id}>
      {props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
