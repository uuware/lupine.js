import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';

export const BlockImage = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;
  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    minHeight: '0',
    flex: p.flex === '1' ? '1 1 auto' : '0 0 auto',
    backgroundColor: p.backgroundColor || 'transparent',
    boxShadow: p.showShadow === true ? 'var(--cover-box-shadow-around)' : 'none',
    display: 'flex',
    flexDirection: 'column',
    ...(p._sys_css || {}),
    '.image-title': {
       fontWeight: 'bold',
       marginTop: '4px',
       marginBottom: '4px',
       textAlign: p.titleAlign || 'left',
    },
    '.image-description': {
       marginTop: '4px',
       marginBottom: '8px',
       fontSize: '14px',
       color: 'var(--text-color, #666)',
       textAlign: p.descriptionAlign || 'left',
    },
    '.image-element': {
       width: p.width || '100%',
       height: !p.height || p.height === '100%' ? 'auto' : p.height,
       objectFit: p.objectFit || 'cover',
       maxWidth: '100%',
       minHeight: '0',
       flex: '0 0 auto',
    }
  };

  return (
    <div css={css} class='block-image' data-design-id={props.node.id}>
      {p.showTitle === true && <div class="image-title" dangerouslySetInnerHTML={p.titleText} />}
      
      {p.src ? (
        p.href ? (
          <a href={p.href} target={p.target || '_self'} style={{ display: 'contents' }}>
            <img class="image-element" src={p.src} alt={p.alt || ''} />
          </a>
        ) : (
          <img class="image-element" src={p.src} alt={p.alt || ''} />
        )
      ) : (
        !isPreview && (
          <div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center', color: '#999' }}>
            No image selected. Please select an image from the properties panel.
          </div>
        )
      )}

      {p.showDescription === true && <div class="image-description" dangerouslySetInnerHTML={p.descriptionText} />}
    </div>
  );
};
