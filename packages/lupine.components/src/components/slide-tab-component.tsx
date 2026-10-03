import { CssProps, RefProps, VNode, bindGlobalStyle } from 'lupine.components';

export interface SlideTabHookProps {
  moveTo?: (index: number) => void;
  getIndex?: () => number;
}

export interface SlideTabPage {
  id?: string;
  title: string;
  content: VNode<any> | any;
}

export interface SlideTabProps {
  pages: SlideTabPage[];
  hook?: SlideTabHookProps;
  initialIndex?: number;
  onChange?: (index: number, page: SlideTabPage) => void;
  navClass?: string;
  class?: string;
}

export const SlideTabComponent = (props: SlideTabProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',

    '.slide-tab-c-nav': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'var(--primary-bg-color)',
      borderBottom: '1px solid var(--secondary-border-color)',
      padding: '10px 16px 8px 16px',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      flexShrink: 0,
      zIndex: 10,
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
    },
    '.slide-tab-c-nav-wrap': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
      paddingRight: '16px',
    },
    '.slide-tab-c-nav-item': {
      cursor: 'pointer',
      padding: '7px 16px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--secondary-color)',
      backgroundColor: 'var(--secondary-bg-color)',
      whiteSpace: 'nowrap',
      transition: 'all 0.18s ease',
      WebkitTapHighlightColor: 'transparent',
      flexShrink: 0,
      userSelect: 'none',
      WebkitUserSelect: 'none',
      '&:active': {
        transform: 'scale(0.96)',
        opacity: 0.85,
      },
    },
    '.slide-tab-c-nav-item.active': {
      backgroundColor: 'var(--primary-accent-color)',
      color: '#ffffff',
      boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)',
    },

    '.slide-tab-c-list': {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100%',
      height: '100%',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      boxSizing: 'border-box',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
    },
    '.slide-tab-c-slide': {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      flexShrink: 0,
      height: '100%',
      overflowY: 'auto',
      position: 'relative',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      WebkitOverflowScrolling: 'touch',
      boxSizing: 'border-box',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
    },
  };
  bindGlobalStyle('slide-tab-c-box', css);

  const ref: RefProps = {};
  let slideIndex = props.initialIndex || 0;
  let manualScroll = false;
  let scrollEndTimer: any = null;

  const resetSlides = (index: number) => {
    const dots = ref.$all?.('.slide-tab-c-nav-item');
    if (dots) {
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === index);
      }
      dots[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    if (props.onChange && props.pages[index]) {
      props.onChange(index, props.pages[index]);
    }
  };

  const drawerScrollStop = () => {
    const drawer = ref.$?.('.slide-tab-c-list') as HTMLElement | undefined;
    if (!drawer) return;
    const width = drawer.clientWidth;
    if (width <= 0) return;
    const currentScrollIndex = Math.round(drawer.scrollLeft / width);
    if (currentScrollIndex !== slideIndex && currentScrollIndex >= 0 && currentScrollIndex < props.pages.length) {
      slideIndex = currentScrollIndex;
      resetSlides(slideIndex);
    }
  };

  const drawerScroll = () => {
    if (manualScroll) return;
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      drawerScrollStop();
    }, 60);
  };

  const moveSlide = (targetIndex: number) => {
    const drawer = ref.$?.('.slide-tab-c-list') as HTMLElement | undefined;
    if (!drawer) return;
    const width = drawer.clientWidth;
    if (width <= 0) return;

    manualScroll = true;
    slideIndex = targetIndex;
    resetSlides(slideIndex);

    drawer.scrollTo({
      left: targetIndex * width,
      behavior: 'smooth',
    });

    setTimeout(() => {
      manualScroll = false;
    }, 350);
  };

  if (props.hook) {
    props.hook.moveTo = moveSlide;
    props.hook.getIndex = () => slideIndex;
  }

  ref.onLoad = async () => {
    const drawer = ref.$?.('.slide-tab-c-list') as HTMLElement | undefined;
    if (drawer) {
      drawer.addEventListener('scrollend', drawerScrollStop);
    }
    if (slideIndex > 0) {
      setTimeout(() => {
        moveSlide(slideIndex);
      }, 50);
    }
  };

  ref.onUnload = async () => {
    const drawer = ref.$?.('.slide-tab-c-list') as HTMLElement | undefined;
    if (drawer) {
      drawer.removeEventListener('scrollend', drawerScrollStop);
    }
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }
  };

  return (
    <section class={`slide-tab-c-box ${props.class || ''}`} ref={ref}>
      <div class={`slide-tab-c-nav no-scrollbar-container ${props.navClass || ''}`}>
        <div class="slide-tab-c-nav-wrap">
          {props.pages.map((page, index) => (
            <div
              class={`slide-tab-c-nav-item ${index === slideIndex ? 'active' : ''}`}
              onClick={(event: any) => {
                event.preventDefault();
                moveSlide(index);
              }}
            >
              {page.title}
            </div>
          ))}
        </div>
      </div>
      <div class="slide-tab-c-list no-scrollbar-container" onScroll={drawerScroll}>
        {props.pages.map((page) => (
          <div class="slide-tab-c-slide no-scrollbar-container">{page.content}</div>
        ))}
      </div>
    </section>
  );
};
