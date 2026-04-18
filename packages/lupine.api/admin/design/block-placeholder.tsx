import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';

export const BlockPlaceholder = (props: { node: DesignNode; contentReplacement?: any }) => {
  if (props.contentReplacement) {
     return <div class="placeholder-replaced">{props.contentReplacement}</div>;
  }
  
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;

  const css: CssProps = {
    width: '100%',
    padding: '32px',
    backgroundColor: '#f5f5f5',
    border: isPreview ? 'none' : '2px dashed #ccc',
    textAlign: 'center',
    color: '#999',
    boxSizing: 'border-box'
  };

  return (
    <div css={css} class='block-placeholder'>
      Content Placeholder
    </div>
  );
};
