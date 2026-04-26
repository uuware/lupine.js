import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { DesignUtils } from './design-utils';
import { Carousel, Card } from 'lupine.components';

export const BlockCarousel = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1' : 'none',
    ...(p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node)),
    '.carousel-wrapper': {
      width: '100%',
    },
    '.card-wrapper': {
      boxShadow: p.cardShadow === true ? 'var(--cover-box-shadow-around)' : 'none',
      height: '100%',
      borderRadius: '8px',
    }
  };

  const cards = Array.isArray(p.cards) ? p.cards : [];

  return (
    <div css={css} class='block-carousel' data-design-id={props.node.id}>
      {cards.length > 0 ? (
        <div class="carousel-wrapper">
          <Carousel 
            showDots={p.showDots === true} 
            showArrows={p.showArrows === true} 
            autoplay={p.autoplay === true} 
            interval={Number(p.interval) || 3000}
          >
            {cards.map((card, index) => {
              const coverImg = card.src ? (
                <img src={card.src} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              ) : undefined;
              
              const linkedCover = card.href && coverImg ? (
                <a href={card.href} target={card.target || '_self'} style={{ display: 'contents' }}>
                  {coverImg}
                </a>
              ) : coverImg;

              const descriptionHtml = card.description ? (
                <div dangerouslySetInnerHTML={card.description} />
              ) : undefined;

              return (
                <div key={card.id || index} class="card-wrapper" style={{ padding: '8px', height: '100%', boxSizing: 'border-box' }}>
                  <Card
                    cover={linkedCover}
                    description={descriptionHtml}
                    style={{ height: '100%' }}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        !isPreview && (
          <div style={{ padding: '40px', border: '1px dashed #ccc', textAlign: 'center', color: '#999', backgroundColor: 'var(--secondary-bg-color, #f9f9f9)' }}>
            Empty Carousel. Please add cards from the properties panel.
          </div>
        )
      )}
    </div>
  );
};
