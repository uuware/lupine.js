import { CssProps } from 'lupine.web';
import { DesignNode } from './design-store';

export const BlockParagraph = (props: { node: DesignNode }) => {
  const p = props.node.props;
  const css: CssProps = {
    textAlign: p.textAlign || 'left',
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    overflow: 'hidden',
    lineHeight: '1.5',
    '.paragraph-title': {
       fontWeight: 'bold',
       marginBottom: '4px',
    }
  };

  return (
    <div css={css} class='block-paragraph'>
      {p.showTitle === true && <div class="paragraph-title" dangerouslySetInnerHTML={p.titleText} />}
      <div dangerouslySetInnerHTML={p.text} />
    </div>
  );
};
