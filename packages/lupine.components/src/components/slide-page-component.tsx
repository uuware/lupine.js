import { CssProps, RefProps, VNode, bindGlobalStyle } from 'lupine.components';

export interface SlidePageHookProps {
  moveTo?: (index: number) => void;
  getIndex?: () => number;
  setIndex?: (index: number) => void;
  setPause?: (pause: boolean) => void;
  isPaused?: () => boolean;
  togglePause?: () => boolean;
  next?: () => void;
  prev?: () => void;
}

export interface SlidePageItemProps {
  id?: string;
  title?: string;
  content: VNode<any> | any;
  link?: string;
  target?: string;
  onClick?: (event: any, page: SlidePageItemProps, index: number) => void;
}

export type SlidePageItem = SlidePageItemProps;

export interface SlidePageProps {
  pages: SlidePageItemProps[];
  hook?: SlidePageHookProps;
  initialIndex?: number;
  index?: number;
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  dotsPosition?: 'inside' | 'outside';
  showArrows?: boolean;
  pause?: boolean;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  pauseOnInteraction?: boolean;
  draggable?: boolean;
  onChange?: (index: number, page: SlidePageItemProps) => void;
  class?: string;
  style?: CssProps;
  dotClass?: string;
  height?: string;
}

export const SlidePageComponent = (props: SlidePageProps) => {
  if (!props.pages || props.pages.length === 0) {
    return null;
  }

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: props.height || '100%',
    minHeight: '160px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',

    '.slide-page-c-list': {
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
      cursor: 'grab',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'pan-y pinch-zoom',
      '&::-webkit-scrollbar': { display: 'none' },
      '&.is-dragging': {
        cursor: 'grabbing',
        scrollSnapType: 'none !important',
        scrollBehavior: 'auto !important',
      },
    },

    '.slide-page-c-item': {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      flexShrink: 0,
      height: '100%',
      overflowY: 'auto',
      position: 'relative',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      boxSizing: 'border-box',
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': { display: 'none' },
    },

    '.slide-page-c-item.slide-page-c-item-link': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      WebkitTapHighlightColor: 'transparent',
      '&:hover': {
        opacity: 0.95,
      },
      '&:active': {
        transform: 'scale(0.995)',
        opacity: 0.88,
      },
    },

    '.slide-page-c-arrow': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: 'var(--secondary-bg-color)',
      border: '1px solid var(--secondary-border-color)',
      color: 'var(--primary-color)',
      fontFamily: 'monospace',
      fontSize: '22px',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.2s ease',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      padding: '0',
      outline: 'none',
      '&:hover': {
        transform: 'translateY(-50%) scale(1.08)',
        opacity: 0.92,
      },
      '&:active': {
        transform: 'translateY(-50%) scale(0.96)',
      },
    },
    '.slide-page-c-arrow-prev': {
      left: '12px',
    },
    '.slide-page-c-arrow-next': {
      right: '12px',
    },

    '.slide-page-c-dots': {
      position: 'absolute',
      bottom: '12px',
      left: '0',
      right: '0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      zIndex: 10,
      pointerEvents: 'auto',
    },

    '.slide-page-c-dots.dots-outside': {
      position: 'relative',
      bottom: 'auto',
      marginTop: '10px',
      marginBottom: '4px',
    },

    '.slide-page-c-dot': {
      cursor: 'pointer',
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      backgroundColor: 'var(--secondary-color)',
      opacity: 0.5,
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      WebkitTapHighlightColor: 'transparent',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
    },

    '.slide-page-c-dot.active': {
      width: '24px',
      borderRadius: '4px',
      backgroundColor: 'var(--primary-accent-color)',
      opacity: 1,
      boxShadow: '0 2px 6px rgba(2, 132, 199, 0.4)',
    },

    '.slide-page-c-dot:hover': {
      backgroundColor: 'var(--primary-accent-color)',
      opacity: 0.85,
    },
  };

  bindGlobalStyle('slide-page-c-box', css);

  const ref: RefProps = {};
  let slideIndex = props.initialIndex ?? props.index ?? 0;
  if (slideIndex < 0 || slideIndex >= props.pages.length) {
    slideIndex = 0;
  }

  let manualScroll = false;
  let scrollEndTimer: any = null;
  let loopTimer: any = null;
  let isHovered = false;
  let isUserPaused = props.pause || false;

  const autoplay = props.autoplay ?? true;
  const interval = props.interval || 4000;

  const resetSlides = (index: number) => {
    const dots = ref.$all?.('.slide-page-c-dot');
    if (dots) {
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === index);
      }
    }
    if (props.onChange && props.pages[index]) {
      props.onChange(index, props.pages[index]);
    }
  };

  const pauseAutoplay = (userPaused: boolean = false) => {
    if (loopTimer) {
      clearTimeout(loopTimer);
      loopTimer = null;
    }
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = null;
    }
    if (userPaused) {
      isUserPaused = true;
    }
  };

  const canHover = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  };

  const scheduleAutoplay = (customDelay?: number) => {
    if (loopTimer) {
      clearTimeout(loopTimer);
      loopTimer = null;
    }
    if (!autoplay || props.pages.length <= 1 || isUserPaused) {
      return;
    }
    const container = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    // If container is not yet connected or has width <= 0 (e.g. parent tab hidden),
    // do not abandon autoplay; poll every 1s until visible again
    if (!container || !container.isConnected || container.clientWidth <= 0) {
      loopTimer = setTimeout(() => scheduleAutoplay(), 1000);
      return;
    }
    // If user is currently dragging or touching, wait and retry
    if (isPointerDown || isTouching || isDragging || isInteracting) {
      loopTimer = setTimeout(() => scheduleAutoplay(), 1500);
      return;
    }
    // If hovered on a device with hover support, pause temporarily and check back
    if (isHovered && props.pauseOnHover !== false && canHover()) {
      loopTimer = setTimeout(() => scheduleAutoplay(), 2500);
      return;
    }
    const delay = customDelay !== undefined ? customDelay : interval;
    loopTimer = setTimeout(() => {
      autoNextSlide();
    }, delay);
  };

  const autoNextSlide = () => {
    const container = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!container || !container.isConnected || container.clientWidth <= 0) {
      scheduleAutoplay(1000);
      return;
    }
    if (
      isUserPaused ||
      isPointerDown ||
      isTouching ||
      isDragging ||
      isInteracting
    ) {
      scheduleAutoplay(1500);
      return;
    }
    if (isHovered && props.pauseOnHover !== false && canHover()) {
      scheduleAutoplay(2500);
      return;
    }

    const nextIndex = (slideIndex + 1) % props.pages.length;
    moveSlide(nextIndex);
  };

  let isPointerDown = false;
  let isTouching = false;
  let isDragging = false;
  let isInteracting = false;
  let wasDragging = false;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let startScrollLeft = 0;
  let pointerDownTime = 0;

  const drawerScrollStop = () => {
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!drawer) return;
    const width = drawer.clientWidth;
    if (width <= 0) {
      scheduleAutoplay(1000);
      return;
    }
    const currentScrollIndex = Math.round(drawer.scrollLeft / width);
    if (currentScrollIndex !== slideIndex && currentScrollIndex >= 0 && currentScrollIndex < props.pages.length) {
      slideIndex = currentScrollIndex;
      resetSlides(slideIndex);
    }
    if (
      !isPointerDown &&
      !isTouching &&
      !isDragging &&
      !isInteracting &&
      !isUserPaused
    ) {
      scheduleAutoplay();
    }
  };

  const drawerScroll = () => {
    if (isPointerDown || isTouching || isDragging || isInteracting) {
      pauseAutoplay(false);
      return;
    }
    if (manualScroll) return;
    pauseAutoplay(false);
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      drawerScrollStop();
    }, 120);
  };

  const moveSlide = (targetIndex: number) => {
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!drawer) {
      scheduleAutoplay(1000);
      return;
    }
    const width = drawer.clientWidth;
    if (width <= 0) {
      scheduleAutoplay(1000);
      return;
    }

    if (props.pages.length > 0) {
      targetIndex = (targetIndex + props.pages.length) % props.pages.length;
    }
    manualScroll = true;
    slideIndex = targetIndex;
    resetSlides(slideIndex);

    drawer.scrollTo({
      left: targetIndex * width,
      behavior: 'smooth',
    });

    setTimeout(() => {
      manualScroll = false;
      isInteracting = false;
      if (
        !isPointerDown &&
        !isTouching &&
        !isDragging &&
        !isUserPaused
      ) {
        scheduleAutoplay();
      }
    }, 350);
  };

  const handleStart = (clientX: number, clientY: number, pointerId?: number) => {
    if (props.draggable === false) return;
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!drawer) return;

    isPointerDown = true;
    isTouching = true;
    isInteracting = true;
    isDragging = false;
    wasDragging = false;
    startX = clientX;
    startY = clientY;
    lastX = clientX;
    startScrollLeft = drawer.scrollLeft;
    pointerDownTime = Date.now();

    // Immediately freeze/pause autoplay while pressing down
    pauseAutoplay(false);
  };

  const handleMove = (clientX: number, clientY: number, e?: any) => {
    if (!isPointerDown && !isTouching) return;
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!drawer) return;

    lastX = clientX;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Immediately freeze/pause autoplay while sliding
    pauseAutoplay(false);

    if (!isDragging) {
      // Highly responsive drag detection (2px threshold)
      if (Math.abs(deltaX) > 2) {
        isDragging = true;
        wasDragging = true;
        manualScroll = true;
        if (e && e.pointerId !== undefined) {
          try {
            drawer.setPointerCapture?.(e.pointerId);
          } catch { }
        }
        drawer.classList.add('is-dragging');
        drawer.style.scrollSnapType = 'none';
        drawer.style.scrollBehavior = 'auto';
      }
    }

    if (isDragging) {
      if (e && e.cancelable) e.preventDefault();
      drawer.scrollLeft = startScrollLeft - deltaX;
    }
  };

  const handleEnd = (clientX?: number, e?: any) => {
    if (!isPointerDown && !isTouching) return;
    isPointerDown = false;
    isTouching = false;

    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (!drawer) return;

    if (isDragging) {
      isDragging = false;
      drawer.classList.remove('is-dragging');
      drawer.style.scrollSnapType = 'x mandatory';
      drawer.style.scrollBehavior = 'smooth';
      if (e && e.pointerId !== undefined) {
        try {
          drawer.releasePointerCapture?.(e.pointerId);
        } catch { }
      }

      const finalX = clientX !== undefined ? clientX : lastX;
      const deltaX = finalX - startX;
      const elapsed = Math.max(Date.now() - pointerDownTime, 1);
      const velocity = Math.abs(deltaX) / elapsed;
      const width = drawer.clientWidth || 1;

      if (Math.abs(deltaX) > width * 0.15 || velocity > 0.25) {
        const direction = deltaX < 0 ? 1 : -1;
        moveSlide(slideIndex + direction);
      } else {
        moveSlide(slideIndex);
      }
    } else {
      // Clean tap without drag
      if (props.pauseOnClick) {
        props.hook?.togglePause ? props.hook.togglePause() : (isUserPaused = !isUserPaused);
      }
    }

    setTimeout(() => {
      wasDragging = false;
      manualScroll = false;
      isInteracting = false;
      // Resume autoplay after releasing if not user paused
      if (!isPointerDown && !isTouching && !isUserPaused) {
        scheduleAutoplay();
      }
    }, 120);
  };

  if (props.hook) {
    props.hook.moveTo = moveSlide;
    props.hook.setIndex = moveSlide;
    props.hook.getIndex = () => slideIndex;
    props.hook.isPaused = () => isUserPaused;
    props.hook.setPause = (inPause: boolean) => {
      isUserPaused = inPause;
      if (inPause) {
        pauseAutoplay(true);
      } else {
        scheduleAutoplay();
      }
    };
    props.hook.togglePause = () => {
      const next = !isUserPaused;
      props.hook?.setPause?.(next);
      return next;
    };
    props.hook.next = () => moveSlide(slideIndex + 1);
    props.hook.prev = () => moveSlide(slideIndex - 1);
  }

  const handleMouseEnter = () => {
    if (props.pauseOnHover !== false && canHover()) {
      isHovered = true;
      pauseAutoplay(false);
    }
  };

  const handleMouseLeave = () => {
    isHovered = false;
    if (
      !isPointerDown &&
      !isTouching &&
      !isDragging &&
      !isInteracting &&
      !isUserPaused
    ) {
      scheduleAutoplay();
    }
  };

  let resizeObserver: ResizeObserver | null = null;
  let intersectionObserver: IntersectionObserver | null = null;
  let watchdogTimer: any = null;

  const wakeUpAutoplay = () => {
    isPointerDown = false;
    isTouching = false;
    isDragging = false;
    isInteracting = false;
    isHovered = false;
    if (autoplay && !isUserPaused) {
      scheduleAutoplay(400);
    }
  };

  ref.onLoad = async () => {
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (drawer) {
      drawer.addEventListener('scrollend', drawerScrollStop);

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.contentRect.width > 0) {
              if (autoplay && !isUserPaused && !loopTimer) {
                scheduleAutoplay(400);
              }
            }
          }
        });
        resizeObserver.observe(drawer);
      }

      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (autoplay && !isUserPaused && !loopTimer) {
                scheduleAutoplay(400);
              }
            }
          }
        });
        intersectionObserver.observe(drawer);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', wakeUpAutoplay);
      window.addEventListener('updateTheme', wakeUpAutoplay);
      window.addEventListener('theme-bg-change', wakeUpAutoplay);
      window.addEventListener('id-photo-theme-changed', wakeUpAutoplay);
      window.addEventListener('id-photo-tab-switched', wakeUpAutoplay);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          wakeUpAutoplay();
        }
      });
    }

    // Watchdog timer: every 8s ensure rotation hasn't stalled unexpectedly
    watchdogTimer = setInterval(() => {
      if (autoplay && !isUserPaused && !loopTimer) {
        scheduleAutoplay();
      }
    }, 8000);

    resetSlides(slideIndex);
    if (slideIndex > 0) {
      setTimeout(() => {
        moveSlide(slideIndex);
      }, 50);
    }
    scheduleAutoplay();
  };

  ref.onUnload = async () => {
    const drawer = ref.$?.('.slide-page-c-list') as HTMLElement | undefined;
    if (drawer) {
      drawer.removeEventListener('scrollend', drawerScrollStop);
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      intersectionObserver = null;
    }
    if (watchdogTimer) {
      clearInterval(watchdogTimer);
      watchdogTimer = null;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', wakeUpAutoplay);
      window.removeEventListener('updateTheme', wakeUpAutoplay);
      window.removeEventListener('theme-bg-change', wakeUpAutoplay);
      window.removeEventListener('id-photo-theme-changed', wakeUpAutoplay);
      window.removeEventListener('id-photo-tab-switched', wakeUpAutoplay);
      document.removeEventListener('visibilitychange', wakeUpAutoplay);
    }
    pauseAutoplay(false);
  };

  const handleItemClick = (event: any, page: SlidePageItemProps, index: number) => {
    if (wasDragging) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (page.onClick) {
      page.onClick(event, page, index);
    }
  };

  return (
    <section
      class={`slide-page-c-box ${props.class || ''}`}
      ref={ref}
      css={props.style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        class="slide-page-c-list no-scrollbar-container"
        onScroll={drawerScroll}
        onPointerDown={(e: any) => {
          if (e.button !== undefined && e.button !== 0) return;
          handleStart(e.clientX, e.clientY, e.pointerId);
        }}
        onPointerMove={(e: any) => handleMove(e.clientX, e.clientY, e)}
        onPointerUp={(e: any) => handleEnd(e.clientX, e)}
        onPointerCancel={(e: any) => handleEnd(e.clientX, e)}
        onTouchStart={(e: any) => {
          if (e.touches && e.touches[0]) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e: any) => {
          if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
          }
        }}
        onTouchEnd={(e: any) => {
          const t = e.changedTouches?.[0];
          handleEnd(t ? t.clientX : undefined, e);
        }}
        onTouchCancel={(e: any) => {
          const t = e.changedTouches?.[0];
          handleEnd(t ? t.clientX : undefined, e);
        }}
        onMouseDown={(e: any) => {
          if (e.button !== 0) return;
          handleStart(e.clientX, e.clientY);
        }}
      >
        {props.pages.map((page, index) => {
          if (page.link) {
            return (
              <a
                class={`slide-page-c-item slide-page-c-item-link ${page.id ? `slide-page-item-${page.id}` : ''}`}
                href={page.link}
                target={page.target || '_self'}
                title={page.title}
                onClick={(event: any) => handleItemClick(event, page, index)}
              >
                {page.content}
              </a>
            );
          }
          return (
            <div
              class={`slide-page-c-item ${page.id ? `slide-page-item-${page.id}` : ''}`}
              title={page.title}
              onClick={(event: any) => handleItemClick(event, page, index)}
            >
              {page.content}
            </div>
          );
        })}
      </div>

      {props.showArrows && props.pages.length > 1 && (
        <>
          <button
            type="button"
            class="slide-page-c-arrow slide-page-c-arrow-prev"
            aria-label="Previous slide"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              moveSlide(slideIndex - 1);
              scheduleAutoplay(interval);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            class="slide-page-c-arrow slide-page-c-arrow-next"
            aria-label="Next slide"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              moveSlide(slideIndex + 1);
              scheduleAutoplay(interval);
            }}
          >
            ›
          </button>
        </>
      )}

      {props.showDots !== false && props.pages.length > 1 && (
        <div class={`slide-page-c-dots ${props.dotsPosition === 'outside' ? 'dots-outside' : ''} ${props.dotClass || ''}`}>
          {props.pages.map((page, index) => (
            <div
              class={`slide-page-c-dot ${index === slideIndex ? 'active' : ''}`}
              title={page.title || `Page ${index + 1}`}
              onClick={(event: any) => {
                event.preventDefault();
                event.stopPropagation();
                moveSlide(index);
                scheduleAutoplay(interval);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};
