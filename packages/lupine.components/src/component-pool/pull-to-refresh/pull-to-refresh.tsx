import { CssProps, RefProps } from 'lupine.web';
import { Spinner01, SpinnerSize } from '../../components/spinner';
import { RefreshIcon } from '../svg-props';

export type PullToRefreshCloseProps = () => void;
export type PullToRefreshHookCheckProps = () => boolean;
export type PullToRefreshHookFreshProps = (close: PullToRefreshCloseProps) => Promise<void>;

export type PullToRefreshHookProps = {
  setCheckEnabled?: (checkEnabled: PullToRefreshHookCheckProps) => void;
  setOnDragRefresh?: (onDragRefresh: PullToRefreshHookFreshProps) => void;
};

export type PullToRefreshProps = {
  container: string;
  checkEnabled?: PullToRefreshHookCheckProps;
  onDragRefresh?: PullToRefreshHookFreshProps;
  hook?: PullToRefreshHookProps;
  className?: string;
  style?: CssProps;
};

export const PullToRefresh = (props: PullToRefreshProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '0px',
    position: 'relative',
    pointerEvents: 'none',
    zIndex: 'var(--layer-dragged-item, 4000)',

    '.pull-indicator': {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      transition: 'none',
      background: 'linear-gradient(to bottom, rgba(var(--primary-color-rgb, 55 55 55) / 0.1), transparent)',
      pointerEvents: 'none',
    },

    '.pull-icon-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-bg-color, #fff)',
      boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.15))',
      transition: 'transform 0.1s ease, opacity 0.1s ease',
      color: 'var(--primary-color)',
    },

    '&.refreshing .pull-icon-wrapper': {
      animation: 'pull-to-refresh-pulse 1.5s infinite ease-in-out',
    },

    '@keyframes pull-to-refresh-pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
  };

  let isEnabled = false;
  if (props.hook) {
    props.hook.setCheckEnabled = (checkEnabled: PullToRefreshHookCheckProps) => {
      props.checkEnabled = checkEnabled;
    };
    props.hook.setOnDragRefresh = (onDragRefresh: PullToRefreshHookFreshProps) => {
      props.onDragRefresh = onDragRefresh;
    };
  }

  const ref: RefProps = {
    onLoad: async () => {
      const container = document.querySelector(props.container) as HTMLElement;
      const pullDom = ref.current as HTMLElement;
      const indicatorDom = ref.$('.pull-indicator') as HTMLElement;
      const iconWrapper = ref.$('.pull-icon-wrapper') as HTMLElement;

      if (!container || !pullDom || !indicatorDom || !iconWrapper) return;

      let touchstartY = 0;
      let touchstartX = 0;
      let pulling = false;
      let refreshing = false;
      const threshold = 70;
      const maxPull = 120;

      const reset = (smooth = true) => {
        pulling = false;
        refreshing = false;
        pullDom.classList.remove('refreshing');
        if (smooth) {
          indicatorDom.style.transition = 'height 0.3s ease, opacity 0.3s ease';
        }
        indicatorDom.style.height = '0px';
        indicatorDom.style.opacity = '0';
        iconWrapper.style.transform = 'rotate(0deg) scale(0.5)';

        if (smooth) {
          setTimeout(() => {
            indicatorDom.style.transition = 'none';
          }, 300);
        }
      };

      const close = () => {
        reset(true);
      };

      container.addEventListener(
        'touchstart',
        (e: TouchEvent) => {
          if (refreshing) return;

          // Check if we are at the top
          const scrollTop = container.scrollTop;
          if (scrollTop > 0) {
            isEnabled = false;
            return;
          }

          isEnabled = props.checkEnabled ? props.checkEnabled() : true;
          if (!isEnabled) return;

          touchstartY = e.touches[0].clientY;
          touchstartX = e.touches[0].clientX;
          pulling = false;
          indicatorDom.style.transition = 'none';
        },
        { passive: true }
      );

      container.addEventListener(
        'touchmove',
        (e: TouchEvent) => {
          if (!isEnabled || refreshing) return;

          const touchY = e.touches[0].clientY;
          const touchX = e.touches[0].clientX;
          const deltaY = touchY - touchstartY;
          const deltaX = touchX - touchstartX;

          // If scrolling up, or moving more horizontally than vertically at start, ignore
          if (deltaY <= 0 || (Math.abs(deltaX) > Math.abs(deltaY) && !pulling)) {
            return;
          }

          pulling = true;

          // Prevent default only if pulling
          if (e.cancelable) e.preventDefault();

          // Calculate actual pull distance with resistance
          const pullDistance = Math.min(maxPull, deltaY * 0.5);
          const progress = Math.min(1, pullDistance / threshold);

          indicatorDom.style.height = `${pullDistance}px`;
          indicatorDom.style.opacity = `${progress}`;

          // Animation: rotate and scale icon
          const rotation = progress * 360;
          const scale = 0.5 + progress * 0.5;
          iconWrapper.style.transform = `rotate(${rotation}deg) scale(${scale})`;

          // Background effect based on progress
          indicatorDom.style.background = `linear-gradient(to bottom, rgba(var(--primary-color-rgb, 55 55 55) / ${
            0.1 * progress
          }), transparent)`;
        },
        { passive: false }
      );

      container.addEventListener('touchend', () => {
        if (!isEnabled || !pulling || refreshing) return;

        const currentHeight = parseInt(indicatorDom.style.height);

        if (currentHeight >= threshold) {
          // Trigger refresh
          refreshing = true;
          pullDom.classList.add('refreshing');
          indicatorDom.style.transition = 'height 0.2s ease';
          indicatorDom.style.height = '60px'; // Sticky height while refreshing

          if (props.onDragRefresh) {
            props.onDragRefresh(close);
          } else {
            setTimeout(close, 1500); // Fallback
          }
        } else {
          reset(true);
        }

        pulling = false;
      });
    },
  };

  return (
    <div ref={ref} css={css} class={['pull-to-refresh', props.className].filter(Boolean).join(' ')}>
      <div class='pull-indicator'>
        <div class='pull-icon-wrapper'>
          <PullToRefreshContent />
        </div>
      </div>
    </div>
  );
};

const PullToRefreshContent = () => {
  // We can switch between icon and spinner based on parent class if we want,
  // but for simplicity we'll just use a CSS trick or nested components.
  // Actually, let's just render both and use CSS to toggle.
  return (
    <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div class='refresh-icon-only' css={{ '.refreshing &': { display: 'none' } }}>
        <RefreshIcon width='24' height='24' />
      </div>
      <div class='refresh-spinner-only' css={{ display: 'none', '.refreshing &': { display: 'block' } }}>
        <Spinner01 size={SpinnerSize.Small} />
      </div>
    </div>
  );
};
