import { CssProps, RefProps, VNode, callUnload, mountInnerComponent } from 'lupine.web';
import { backActionHelper, stopPropagation } from '../lib';
import { MediaQueryMaxWidth, MediaQueryRange } from '../styles';

export type SliderHelperDirection = 'right' | 'left' | 'bottom' | 'top';
export type SliderHelperCloseProps = () => void;

export type SliderHelperShowProps = {
  children: VNode<any>;
  direction?: SliderHelperDirection;
  closeEvent?: () => void;
  closeWhenClickOutside?: boolean;
  zIndex?: string;
  maxWidth?: string;
  className?: string;
  contentClassName?: string;
  mountTarget?: HTMLElement;
};

export class SliderHelper {
  static async show({
    children,
    direction = 'right',
    closeEvent,
    closeWhenClickOutside = true,
    zIndex,
    maxWidth = MediaQueryMaxWidth.MobileMax,
    className = '',
    contentClassName = '',
    mountTarget,
  }: SliderHelperShowProps): Promise<SliderHelperCloseProps> {
    const base = document.createElement('div');
    const isHorizontal = direction === 'left' || direction === 'right';
    const isFromEnd = direction === 'right' || direction === 'bottom';
    const closeClassName = isFromEnd ? 'close-to-end' : 'close-to-start';

    let closed = false;
    const handleClose = () => {
      if (closed) return;
      closed = true;
      closeEvent?.();
      ref.current?.classList.remove('show');
      ref.current?.classList.add(closeClassName);
      setTimeout(async () => {
        await callUnload(base);
        base.remove();
      }, 400);
    };

    const onClickContainer = (event: MouseEvent) => {
      if (closeWhenClickOutside !== false && event.target === ref.current) {
        handleClose();
      }
    };

    const onClickContent = (event: MouseEvent) => {
      stopPropagation(event);
    };

    const ref: RefProps = {
      onLoad: async () => {
        // Make sure the browser has painted the initial transform state before adding show,
        // otherwise rapid close/open can skip the transition and display directly.
        ref.current?.classList.remove('show', 'close-to-end', 'close-to-start');
        ref.current?.getBoundingClientRect();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ref.current?.classList.add('show');
          });
        });
      },
    };

    const startTransform = isHorizontal
      ? direction === 'right'
        ? 'translateX(100%)'
        : 'translateX(-100%)'
      : direction === 'bottom'
        ? 'translateY(100%)'
        : 'translateY(-100%)';
    const showTransform = 'translate(0, 0)';
    const endTransform = isHorizontal
      ? direction === 'right'
        ? 'translateX(100%)'
        : 'translateX(-100%)'
      : direction === 'bottom'
        ? 'translateY(100%)'
        : 'translateY(-100%)';
    const oppositeTransform = isHorizontal
      ? direction === 'right'
        ? 'translateX(-100%)'
        : 'translateX(100%)'
      : direction === 'bottom'
        ? 'translateY(-100%)'
        : 'translateY(100%)';

    const contentCss: CssProps = isHorizontal
      ? {
          top: '0',
          bottom: '0',
          width: '100%',
          maxWidth,
          [direction]: '0',
        }
      : {
          top: direction === 'top' ? '0' : 'auto',
          bottom: direction === 'bottom' ? '0' : 'auto',
          left: 'auto',
          right: '0',
          width: '100%',
          maxWidth,
          height: '100%',
        };

    const cssContainer: CssProps = {
      display: 'flex',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: zIndex || 'var(--layer-slider)',
      overflow: 'hidden',
      backgroundColor: '#00000000',
      transition: 'background-color 0.4s ease-in-out',
      pointerEvents: 'auto',
      '&.show': {
        [MediaQueryRange.MobileAbove]: {
          backgroundColor: 'var(--cover-mask-bg-color)',
        },
        '.slider-helper-content': {
          transform: showTransform,
        },
      },
      '&.close-to-end': {
        '.slider-helper-content': {
          transform: endTransform,
        },
      },
      '&.close-to-start': {
        '.slider-helper-content': {
          transform: oppositeTransform,
        },
      },
      '.slider-helper-content': {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        color: 'var(--primary-color)',
        backgroundColor: 'var(--primary-bg-color)',
        boxShadow: 'var(--cover-box-shadow)',
        transform: startTransform,
        transition: 'transform 0.4s ease-in-out',
        // trick: to put two padding-top properties
        'padding-top ': 'constant(safe-area-inset-top)',
        'padding-top': 'env(safe-area-inset-top)',
        ...contentCss,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    };

    const component = (
      <div
        css={cssContainer}
        ref={ref}
        class={['slider-helper-box', `from-${direction}`, className].join(' ').trim()}
        onClick={onClickContainer}
      >
        <div
          class={['slider-helper-content', contentClassName].join(' ').trim()}
          onClick={onClickContent}
          data-back-action={backActionHelper.genBackActionId()}
        >
          {children}
        </div>
      </div>
    );

    base.style.position = 'fixed';
    base.style.inset = '0';
    base.style.zIndex = zIndex || 'var(--layer-slider)';
    const host = mountTarget || document.querySelector('.responsive-frame') || document.querySelector('.lupine-root') || document.body;
    host.appendChild(base);
    await mountInnerComponent(base, component);
    return handleClose;
  }
}
