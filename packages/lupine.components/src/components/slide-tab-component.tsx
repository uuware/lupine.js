import { CssProps, RefProps, VNode, bindGlobalStyle } from 'lupine.components';

export interface SlideTabProps {
  pages: { title: string; content: VNode<any> }[];
}
export const SlideTabComponent = (props: SlideTabProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontSize: '12px',
    borderRadius: '6px',
    padding: '0px 8px 4px 8px',
    // marginBottom: '8px',
    height: '100%',
    '.slide-tab-c-list': {
      flex: 1,
      borderRadius: '6px',
      display: 'flex',
      overflowX: 'auto',
      width: '100%',
      scrollSnapType: 'x mandatory',
      gap: '8px',
      paddingBottom: '10px',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
    },
    '.slide-tab-c-slide': {
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      minWidth: '100%',
      flexShrink: 0,
      scrollSnapAlign: 'start',
      height: '100%',
      overflowY: 'auto',
    },

    '.slide-tab-c-nav': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'var(--primary-bg-color)',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    '.slide-tab-c-nav-wrap': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: '2px 4px',
      borderRadius: '4px',
      backgroundColor: 'var(--secondary-bg-color)',
    },
    '.slide-tab-c-nav-item': {
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '4px',
      marginRight: '8px',
    },
    '.slide-tab-c-nav-item.active': {
      backgroundColor: 'var(--primary-accent-color)',
      color: 'white',
    },
  };
  bindGlobalStyle('slide-tab-c-box', css);

  const ref: RefProps = {};
  let slideIndex = 0;
  let manualScroll = false;
  let scrollEndTimer: NodeJS.Timeout | null = null;
  const drawerScroll = () => {
    if (manualScroll) {
      return;
    }
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }
    scrollEndTimer = setTimeout(() => {
      drawerScrollStop();
    }, 100);
  };
  const resetSlides = (index: number) => {
    const dots = ref.$all('.slide-tab-c-nav-item');
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === index);
    }
  };
  const drawerScrollStop = () => {
    const drawer = ref.$('.slide-tab-c-list');
    const width = drawer.clientWidth;
    const currentScrollIndex = Math.round(drawer.scrollLeft / width);
    slideIndex = currentScrollIndex;
    resetSlides(slideIndex);
  };
  const moveSlide = (slideIndex: number) => {
    const drawer = ref.$('.slide-tab-c-list');
    const children = ref.$all('.slide-tab-c-slide');
    if (!drawer || !children || children.length === 0) {
      return;
    }
    const target = children[slideIndex];
    if (!target) {
      return;
    }
    const offsetLeft = target.offsetLeft;
    manualScroll = true;
    drawer.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    });

    resetSlides(slideIndex);
    setTimeout(() => {
      manualScroll = false;
    }, 300);
  };

  return (
    <section class='slide-tab-c-box' ref={ref}>
      <div class='slide-tab-c-nav'>
        <div class='slide-tab-c-nav-wrap'>
          {props.pages.map((page, index) => (
            <div
              class={`slide-tab-c-nav-item ${index === 0 ? 'active' : ''}`}
              onClick={(event) => {
                event.preventDefault();
                moveSlide(index);
              }}
            >
              {page.title}
            </div>
          ))}
        </div>
      </div>
      <div class='slide-tab-c-list no-scrollbar-container' onScroll={drawerScroll}>
        {props.pages.map((page) => (
          <div class='slide-tab-c-slide no-scrollbar-container'>{page.content}</div>
        ))}
      </div>
    </section>
  );
};
