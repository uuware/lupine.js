import { backActionHelper, CssProps, RefProps, VNode } from 'lupine.components';

export class MobileSideMenuHelper {
  static show() {
    const ref = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
    ref.classList.add('show');
    setTimeout(() => {
      ref.classList.add('animate-show');
    }, 1);

    const backActionId = backActionHelper.genBackActionId();
    ref.setAttribute('data-back-action', backActionId);
  }

  static hide() {
    const ref = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
    ref.removeAttribute('data-back-action');
    ref.classList.remove('animate-show');
    setTimeout(() => {
      ref.classList.remove('show');
    }, 300);
  }

  static isTouchEventAdded = false;
  static addTouchEvent() {
    if (this.isTouchEventAdded) {
      return;
    }

    this.isTouchEventAdded = true;
    let touchstartY = 0;
    let touchstartX = 0;
    let direction = '';
    let moveStart = false;
    let isOpen = false;
    const maskDom = document.querySelector('.mobile-side-menu-mask') as HTMLDivElement;
    document.addEventListener('touchstart', (e) => {
      touchstartY = e.touches[0].clientY;
      touchstartX = e.touches[0].clientX;
      direction = '';
      moveStart = false;
      isOpen = maskDom?.classList.contains('show');
      if (isOpen) {
        if (touchstartX > 80) {
          moveStart = true;
        }
      } else {
        if (touchstartX < 40) {
          moveStart = true;
        }
      }
      // if (e.touches[0].clientX < 30 && !maskDom?.classList.contains('show')) {
      //   // 靠左边缘, 如果菜单已经打开，忽略手势
      //   touchStartX = e.touches[0].clientX;
      // } else {
      //   touchStartX = -1; // 忽略非左侧边缘手势
      // }
    });

    document.addEventListener('touchmove', (e) => {
      if (!moveStart) {
        return;
      }

      // console.log('touchmove', e.touches[0].clientX);
      if (direction === '') {
        if (e.touches[0].clientX - touchstartX !== 0) {
          direction = 'X';
        } else {
          moveStart = false;
          return;
        }
      }

      if (isOpen) {
        if (e.touches[0].clientX - touchstartX < 30) {
          MobileSideMenuHelper.hide();
          moveStart = false;
          return;
        }
      } else {
        if (e.touches[0].clientX - touchstartX > 80) {
          MobileSideMenuHelper.show();
          moveStart = false;
          return;
        }
      }
    });

    document.addEventListener('touchend', () => {
      moveStart = false;
      direction = '';
    });
  }
}
export const MobileSideMenu = (props: { children: VNode<any> }) => {
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
      backgroundColor: '#000000b0',
      '&.show': {
        display: 'flex',
      },
      '&.animate-show .mobile-side-menu': {
        transform: 'scaleX(1)',
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
      transformOrigin: 'left',
      transform: 'scaleX(0)',
      // boxShadow: 'var(--block-box-shadow)',
      boxShadow: 'var(--cover-box-shadow)',
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
      MobileSideMenuHelper.addTouchEvent();
    },
  };
  return (
    <div css={css} ref={ref}>
      {/* <SliderFrame hook={props.sliderFrameHook} /> */}
      <div class='mobile-side-menu-mask' onClick={onClickContainer}>
        <div class='mobile-side-menu'>{props.children}</div>
      </div>
    </div>
  );
};
