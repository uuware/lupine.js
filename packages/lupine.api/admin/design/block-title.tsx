import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';

export const BlockTitle = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;
  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    textAlign: p.textAlign || 'left',
    color: p.color || 'inherit',
    minWidth: '0',
    flex: p.flex === '1' ? '1' : 'none',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node))
  };

  // Convert generic 'h1' - 'h6' string to a tag name. Fallback if something weird happens.
  const Tag = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(p.level) ? p.level : 'h2') as any;

  let textContent = p.text;
  if (!textContent && !isPreview) {
      textContent = '&nbsp;';
  }

  return (
    <Tag css={css} class='block-title' data-design-id={props.node.id} dangerouslySetInnerHTML={textContent} />
  );
};
