import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';

export const BlockParagraph = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;
  const css: CssProps = {
    textAlign: p.textAlign || 'left',
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1' : 'none',
    lineHeight: '1.5',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node)),
    '.paragraph-title': {
       fontWeight: 'bold',
       marginBottom: '4px',
    }
  };

  let textContent = p.text;
  if (!textContent && !isPreview) {
      textContent = '&nbsp;';
  }

  return (
    <div css={css} class='block-paragraph' data-design-id={props.node.id}>
      {p.showTitle === true && <div class="paragraph-title" dangerouslySetInnerHTML={p.titleText} />}
      <div dangerouslySetInnerHTML={textContent} />
    </div>
  );
};
