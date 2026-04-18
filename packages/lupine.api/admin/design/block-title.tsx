import { CssProps } from 'lupine.web';
import { DesignNode } from './design-store';

export const BlockTitle = (props: { node: DesignNode }) => {
  const p = props.node.props;
  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    textAlign: p.textAlign || 'left',
    color: p.color || 'inherit',
    overflow: 'hidden',
    minWidth: '0',
  };

  // Convert generic 'h1' - 'h6' string to a tag name. Fallback if something weird happens.
  const Tag = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(p.level) ? p.level : 'h2') as any;

  return (
    <Tag css={css} class='block-title' dangerouslySetInnerHTML={p.text} />
  );
};
