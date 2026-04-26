import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';
import { YouTubePlayer } from 'lupine.components';

export const BlockYoutube = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1' : 'none',
    width: p.width || '100%',
    height: p.height || 'auto',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node)),
    '.youtube-wrapper': {
      width: '100%',
      height: '100%',
      minHeight: p.height === 'auto' ? '300px' : undefined,
    }
  };

  return (
    <div css={css} class='block-youtube' data-design-id={props.node.id}>
      {p.url ? (
        <div class="youtube-wrapper" style={{ pointerEvents: isPreview ? 'auto' : 'none' }}>
          <YouTubePlayer 
            srcOrVideoId={p.url} 
            autoplay={isPreview ? p.autoplay === true : false} 
            allowFullScreen={p.allowFullScreen !== false}
            controls={p.controls !== false}
            loop={p.loop === true}
            muted={p.muted === true}
            rel={p.rel === true}
            modestbranding={p.modestbranding !== false}
          />
        </div>
      ) : (
        !isPreview && (
          <div style={{ padding: '40px', border: '1px dashed #ccc', textAlign: 'center', color: '#999', backgroundColor: '#f9f9f9', width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No YouTube URL provided. Please configure it in the properties panel.
          </div>
        )
      )}
    </div>
  );
};
