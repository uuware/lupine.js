import { backActionHelper, CssProps, RefProps, VNode, MediaQueryRange } from 'lupine.components';

export class MobileSideMenuHelper {
  static show() {
    const ref = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
    if (!ref) return;
    if (window.getComputedStyle(ref).pointerEvents === 'none') return; // Prevent show in desktop auto-extend mode
    if (ref.classList.contains('animate-show')) return; // Already fully open

    const isPreShown = ref.classList.contains('show');
    ref.classList.add('show');

    const menuDom = ref.querySelector('.mobile-side-menu') as HTMLDivElement;
    if (menuDom) {
      menuDom.style.transition = '';
      menuDom.style.transform = '';
    }
    ref.style.backgroundColor = '';

    // Force a browser reflow ONLY if not pre-shown
    if (!isPreShown) {
      void ref.offsetWidth;
    }

    ref.classList.add('animate-show');

    const backActionId = backActionHelper.genBackActionId();
    ref.setAttribute('data-back-action', backActionId);
  }

  static hide() {
    const ref = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
    if (!ref) return;
    if (window.getComputedStyle(ref).pointerEvents === 'none') return; // Prevent hide in desktop auto-extend mode

    ref.removeAttribute('data-back-action');

    const menuDom = ref.querySelector('.mobile-side-menu') as HTMLDivElement;
    if (menuDom) {
      menuDom.style.transition = '';
      menuDom.style.transform = '';
    }
    ref.style.backgroundColor = '';

    ref.classList.remove('animate-show');
    setTimeout(() => {
      ref.classList.remove('show');
    }, 300);
  }

  static isTouchEventAdded = false;
  static addTouchEvent(_maskDom: HTMLDivElement) {
    if (this.isTouchEventAdded) {
      return;
    }

    this.isTouchEventAdded = true;
    let touchstartY = 0;
    let touchstartX = 0;
    let direction = '';
    let moveStart = false;
    let isOpen = false;
    let menuWidth = 0;

    document.addEventListener('touchstart', (e) => {
      const maskDom = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
      if (!maskDom) return;
      if (window.getComputedStyle(maskDom).pointerEvents === 'none') return;

      touchstartY = e.touches[0].clientY;
      touchstartX = e.touches[0].clientX;
      direction = '';
      moveStart = false;
      isOpen = maskDom.classList.contains('show');
      
      const menuDom = maskDom.querySelector('.mobile-side-menu') as HTMLDivElement;
      if (menuDom) {
        menuWidth = menuDom.offsetWidth || 210; // Fallback width roughly 70% of 300px
      }

      if (isOpen) {
        if (touchstartX > 80) {
          // arbitrary threshold, could just be anywhere really
          moveStart = true;
        } else {
          moveStart = true; // allow dragging to close from anywhere when open
        }
      } else {
        if (touchstartX < 40) {
          moveStart = true;
          // Pre-show the mask to allow rendering the menu while dragging
          maskDom.classList.add('show');
          if (menuDom) {
            menuDom.style.transition = 'none'; // Disable transition for 1:1 finger tracking
            menuDom.style.transform = `translateX(-100%)`; // Start fully hidden left
          }
        }
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (!moveStart) {
        return;
      }

      const maskDom = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
      if (!maskDom) return;

      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchstartX;

      if (direction === '') {
        if (Math.abs(deltaX) > 0) {
          direction = 'X';
        } else {
          moveStart = false;
          return;
        }
      }

      const menuDom = maskDom.querySelector('.mobile-side-menu') as HTMLDivElement;
      if (menuDom) {
        // We override the transition to track the finger precisely
        menuDom.style.transition = 'none';

        // Use translate3d/translateX for better performance and explicit dragging instead of scaleX
        if (!isOpen) {
          // Dragging to open: start at -menuWidth and add deltaX. Cap at 0 (fully open)
          const translateX = Math.min(0, -menuWidth + deltaX);
          menuDom.style.transform = `translateX(${translateX}px)`;

          // optionally adjust mask opacity
          const progress = (menuWidth + translateX) / menuWidth;
          maskDom.style.backgroundColor = `rgba(0,0,0,${0.69 * progress})`;
        } else {
          // Dragging to close: start at 0, subtract from it (deltaX is usually negative).
          // Cap at 0 to prevent dragging the menu further right than open.
          const translateX = Math.min(0, deltaX);
          menuDom.style.transform = `translateX(${translateX}px)`;

          const progress = (menuWidth + translateX) / menuWidth;
          if (progress >= 0) {
            maskDom.style.backgroundColor = `rgba(0,0,0,${0.69 * progress})`;
          }
        }
      }
    });

    document.addEventListener('touchend', (e) => {
      if (!moveStart) return;

      const maskDom = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
      if (!maskDom) return;

      const currentX = e.changedTouches[0].clientX;
      const deltaX = currentX - touchstartX;
      moveStart = false;
      direction = '';

      const menuDom = maskDom.querySelector('.mobile-side-menu') as HTMLDivElement;
      if (menuDom) {
        // Clear manual inline styles to restore CSS control
        menuDom.style.transition = '';
        menuDom.style.transform = '';
        maskDom.style.backgroundColor = '';

        if (!isOpen) {
          // Was trying to open
          if (deltaX > menuWidth / 3) {
            // Dragged more than 1/3, show fully
            MobileSideMenuHelper.show();
          } else {
            // Snap back to hidden
            maskDom.classList.remove('show');
          }
        } else {
          // Was trying to close
          if (deltaX < -menuWidth / 3) {
            // Dragged left more than 1/3, hide fully
            MobileSideMenuHelper.hide();
          } else {
            // Snap back to open
            MobileSideMenuHelper.show();
          }
        }
      }
    });
  }
}
export const MobileSideMenu = (props: { children: VNode<any>; autoExtend?: boolean }) => {
  const css: CssProps = {
    '.mobile-side-menu-mask': {
      display: 'none',
      flexDirection: 'column',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: 'var(--layer-menu)',
      backgroundColor: '#00000000',
      transition: 'background-color 0.3s ease-in-out',
      '&.show': {
        display: 'flex',
      },
      '&.animate-show': {
        backgroundColor: '#000000b0',
      },
      '&.animate-show .mobile-side-menu': {
        transform: 'translateX(0)',
      },
    },
    '.mobile-side-menu': {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      transition: 'transform 0.3s ease-in-out',
      backgroundColor: 'var(--primary-bg-color)',
      width: '70%',
      maxWidth: '300px',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      transform: 'translateX(-100%)',
      boxShadow: 'var(--cover-box-shadow)',
      '@supports (-webkit-touch-callout: none)': {
        'padding-top ': 'constant(safe-area-inset-top)',
        'padding-top': 'env(safe-area-inset-top)',
      },
    },
    [MediaQueryRange.TabletAbove]: {
      '&.auto-extend .mobile-side-menu-mask': {
        display: 'flex !important',
        width: 'var(--auto-sidemenu-left-offset, 260px)',
        right: 'auto',
        backgroundColor: 'transparent !important',
        pointerEvents: 'none',
      },
      '&.auto-extend .mobile-side-menu': {
        transform: 'translateX(0) !important',
        width: '100%',
        maxWidth: 'unset',
        boxShadow: 'none',
        borderRight: '1px solid var(--primary-border-color)',
        pointerEvents: 'auto',
      },
    },
  };

  const onClickContainer = (event: Event) => {
    if (
      event.target instanceof HTMLDivElement &&
      (event.target as HTMLDivElement).classList.contains('mobile-side-menu-mask')
    ) {
      MobileSideMenuHelper.hide();
    }
  };
  const ref: RefProps = {
    onLoad: async () => {
      MobileSideMenuHelper.addTouchEvent(ref.$('.mobile-side-menu-mask'));
    },
  };
  return (
    <div css={css} ref={ref} class={['mobile-side-menu-top', props.autoExtend ? 'auto-extend' : ''].join(' ').trim()}>
      {/* <SliderFrame hook={props.sliderFrameHook} /> */}
      <div class='mobile-side-menu-mask' onClick={onClickContainer}>
        <div class='mobile-side-menu'>{props.children}</div>
      </div>
    </div>
  );
};
