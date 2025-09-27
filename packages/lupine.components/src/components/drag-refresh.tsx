import { CssProps, RefProps } from 'lupine.web';
import { Spinner02, SpinnerSize } from './spinner';

export type DragRefreshCloseProps = () => void;

export type DragRefreshHookProps = {
  setEnable: (enable: boolean) => void;
  updateOnDragRefresh: (onDragRefresh: (close: DragRefreshCloseProps) => Promise<void>) => void;
};

export type DragRefreshProps = {
  container: string;
  onDragRefresh: (close: DragRefreshCloseProps) => Promise<void>;
  hook?: DragRefreshHookProps;
};

// globally there should be only one DragFresh
export const DragFresh = (props: DragRefreshProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '0px',
    position: 'relative',
    '.drag-spinner': {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: 'var(--layer-dragged-item)',
      display: 'none',
      justifyContent: 'center',
      transition: 'opacity 0.5s ease',
      alignItems: 'end',
      backgroundImage: 'linear-gradient(to bottom, rgba(200,200,200,0.8), rgba(255,255,255,0))',
    },
    '&.show .drag-spinner': {
      display: 'flex',
    },
  };

  let isEnabled = true;
  if (props.hook) {
    props.hook.setEnable = (enable: boolean) => {
      isEnabled = enable;
    };
    props.hook.updateOnDragRefresh = (onDragRefresh: (close: DragRefreshCloseProps) => Promise<void>) => {
      props.onDragRefresh = onDragRefresh;
    };
  }
  const closeSpin = () => {
    const spinnerDom = ref.$('.drag-spinner') as HTMLDivElement;
    if (!spinnerDom) return;
    spinnerDom.style.opacity = '0';
    setTimeout(() => {
      spinnerDom.style.opacity = '1';
      spinnerDom.parentElement!.classList.remove('show');
    }, 300);
  };
  const ref: RefProps = {
    onLoad: async () => {
      const container = document.querySelector(props.container) as HTMLDivElement;
      const pullDom = ref.current as HTMLDivElement;
      const spinnerDom = ref.$('.drag-spinner') as HTMLDivElement;
      if (!container || !pullDom || !spinnerDom) return;
      let touchstartY = 0;
      let touchstartX = 0;
      let direction: 'X' | 'Y' | '' = '';
      let needRefresh = false;
      const maxHeight = 150;
      container.addEventListener('touchstart', (e: any) => {
        if (!isEnabled) return;
        touchstartY = e.touches[0].clientY;
        touchstartX = e.touches[0].clientX;
        direction = '';
        needRefresh = false;
      });
      container.addEventListener('touchmove', (e: any) => {
        if (!isEnabled) return;
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const movedY = touchY - touchstartY;
        const movedX = touchX - touchstartX;
        if (direction === '') {
          if (Math.abs(movedY) > Math.abs(movedX)) {
            direction = 'Y';
          } else {
            direction = 'X';
          }
        }
        // console.log(`direction: ${direction}, movedX: ${movedX}, movedY: ${movedY}, container.scrollTop: ${container.scrollTop}`);
        if (direction !== 'Y') {
          return;
        }
        if (container.scrollTop <= 0 && movedY > 5) {
          needRefresh = movedY > 60;
          if (movedY > 5) {
            pullDom.classList.add('show');
            spinnerDom.style.height = `${Math.min(maxHeight, movedY)}px`;
          } else {
            pullDom.classList.remove('show');
            spinnerDom.style.height = '0';
          }
        } else {
          pullDom.classList.remove('show');
          spinnerDom.style.height = '0';
        }
      });
      container.addEventListener('touchend', (e) => {
        if (!isEnabled) return;
        if (direction === 'Y') {
          if (needRefresh) {
            props.onDragRefresh(closeSpin);
          } else {
            closeSpin();
          }
        }
        direction = '';
      });
    },
  };
  return (
    <div css={css} ref={ref} class='drag-refresh-box'>
      <div class='drag-spinner'>
        <Spinner02 size={SpinnerSize.Large} />
      </div>
    </div>
  );
};
