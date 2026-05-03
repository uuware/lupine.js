import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';

export const BlockFlex = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || {};

  const css: CssProps = {
    display: p.hidden ? 'none' : 'flex',
    width: '100%',
    minHeight: '0',
    minWidth: '0',
    flex: p.flex === 'none' ? 'none' : '1',
    backgroundColor: p.backgroundColor || 'transparent',
    border: isPreview ? 'none' : '1px dashed #ccc',
    flexWrap: p.flexWrap || 'nowrap',
    ...sysCss,
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
      {(!props.node.children || props.node.children.length === 0) && !isPreview && (
        <div class='empty-drop-zone text-center w-100'>Drop components or containers here</div>
      )}
      {props.node.children?.map((child) => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
