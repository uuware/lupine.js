import { CssProps, RefProps, VNode, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';

export type CarouselProps = {
  class?: string;
  style?: CssProps;
  children?: VNode<any>[];
  showDots?: boolean;
  showArrows?: boolean;
  autoplay?: boolean;
  interval?: number;
};

const carouselCss: CssProps = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: 'var(--cover-box-shadow-around)',

  '.&-drawer': {
    display: 'flex',
    overflowX: 'auto',
    width: '100%',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    gap: '12px',
    paddingBottom: '10px',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
  },

  '.&-item': {
    minWidth: '100%',
    flexShrink: 0,
    scrollSnapAlign: 'start',
  },

  '.&-dot-box': {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 0',
    backgroundColor: 'var(--primary-bg-color, #6d92b1ff)',
  },

  '.&-dot': {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary-color, #ccc)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&.active': {
      backgroundColor: 'var(--primary-color, #0a74c9)',
      transform: 'scale(1.2)',
    },
  },

  '.&-arrow': {
    position: 'absolute',
    top: 'calc(50% - 20px)', // Offset by half dots height if dots are shown
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid var(--secondary-border-color, #eee)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    '&:hover': {
      backgroundColor: '#fff',
      transform: 'translateY(-50%) scale(1.1)',
    },
    '&.disabled': {
      opacity: 0.2,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },

    span: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '-2px',
      fontFamily: 'monospace',
    },
  },

  '.&-arrow-left': { left: '16px' },
  '.&-arrow-right': { right: '16px' },
};

export const Carousel = (props: CarouselProps) => {
  const children = props.children || [];
  const count = children.length;
  const interval = props.interval || 4000;

  const globalCssId = getGlobalStylesId(carouselCss);
  bindGlobalStyle(globalCssId, carouselCss);

  let currentIndex = 0;
  let autoplayTimer: any = null;

  const updateIndicators = (index: number) => {
    currentIndex = index;
    const dots = ref.$all('.&-dot');
    dots.forEach((dot: HTMLElement, i: number) => {
      dot.classList.toggle('active', i === index);
    });

    const leftArrow = ref.$('.&-arrow-left');
    const rightArrow = ref.$('.&-arrow-right');
    if (leftArrow) leftArrow.classList.toggle('disabled', index === 0);
    if (rightArrow) rightArrow.classList.toggle('disabled', index === count - 1);
  };

  const scrollTo = (index: number) => {
    const drawer = ref.$('.&-drawer');
    if (!drawer) return;

    // Calculate position including gap
    // width includes content only, offsetLeft of items is better
    const items = ref.$all('.&-item');
    if (items[index]) {
      drawer.scrollTo({
        left: (items[index] as HTMLElement).offsetLeft,
        behavior: 'smooth',
      });
    }
    updateIndicators(index);
  };

  const next = () => {
    if (currentIndex >= count - 1) {
      if (props.autoplay) scrollTo(0); // Loop for autoplay
      return;
    }
    scrollTo(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex <= 0) return;
    scrollTo(currentIndex - 1);
  };

  const startAutoplay = () => {
    if (props.autoplay) {
      stopAutoplay();
      autoplayTimer = setInterval(next, interval);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const handleScroll = () => {
    const drawer = ref.$('.&-drawer');
    if (!drawer) return;

    const width = drawer.clientWidth;
    const index = Math.round(drawer.scrollLeft / width);
    if (index !== currentIndex && index >= 0 && index < count) {
      updateIndicators(index);
    }
  };

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      updateIndicators(0);
      startAutoplay();
    },
    onUnload: async () => {
      stopAutoplay();
    },
  };

  return (
    <div
      class={['&-container', props.class].join(' ').trim()}
      css={props.style}
      ref={ref}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div class='&-drawer' onScroll={handleScroll}>
        {children.map((child) => (
          <div class='&-item'>{child}</div>
        ))}
      </div>

      {props.showArrows && count > 1 && (
        <>
          <div class='&-arrow &-arrow-left' onClick={prev}>
            <span>{'<'}</span>
          </div>
          <div class='&-arrow &-arrow-right' onClick={next}>
            <span>{'>'}</span>
          </div>
        </>
      )}

      {props.showDots && count > 1 && (
        <div class='&-dot-box'>
          {children.map((_, i) => (
            <div class='&-dot' onClick={() => scrollTo(i)} />
          ))}
        </div>
      )}
    </div>
  );
};
