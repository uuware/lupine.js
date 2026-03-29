/* frame component to show pages (sliders) from right or bottom
  const sliderFrameHook: SliderFrameHookProps = {};
  const onClick = (event: Event) => {
    sliderFrameHook.load!(<... />);
    or
    sliderFrameHook.close!(event);
  };
  return (
    <div onClick={onClick}>
      <SliderFrame hook={sliderFrameHook} />
      ...
    </div>
  );
*/
import { VNode, CssProps, HtmlVar, RefProps, stopPropagation, MediaQueryRange } from 'lupine.components';

// addClass(SliderFramePosition) is used to show two SliderFrames for big screens,
// so when the second is showing, it needs to set this on the first one
export type SliderFramePosition = 'desktop-slide-left' | 'desktop-slide-right';
export type SliderFrameHookProps = {
  load?: (children: VNode<any>) => void;
  close?: (event: Event) => void;
  addClass?: (className: SliderFramePosition) => void;
  isOpened?: () => boolean;
};

export type SliderFrameProps = {
  defaultContent?: VNode<any> | string;
  direction?: 'right' | 'bottom';
  hook?: SliderFrameHookProps;
  afterClose?: () => void | Promise<void>;
};
export const SliderFrame = (props: SliderFrameProps) => {
  if (props.hook) {
    props.hook.load = (children) => {
      dom.value = children;
      ref.current?.classList.remove('d-none');
      setTimeout(() => {
        ref.current?.classList.add('show');
      }, 100);
    };
    props.hook.close = (event: Event) => {
      stopPropagation(event);
      ref.current?.classList.remove('show');
      setTimeout(async () => {
        ref.current?.classList.add('d-none');
        dom.value = '';
        if (props.afterClose) {
          await props.afterClose();
        }
      }, 400);
    };
    props.hook.addClass = (className) => {
      ref.current?.classList.add(className);
    };
    props.hook.isOpened = () => {
      return ref.current?.classList.contains('show');
    };
  }
  const dom = new HtmlVar(<div class='slider-frame-default'>{props.defaultContent || '(No Content)'}</div>);
  const ref: RefProps = {};
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    left: 'var(--auto-sidemenu-left-offset, 0px)',
    right: '0',
    bottom: '0',
    zIndex: 'var(--layer-slider)',
    transform: props.direction === 'bottom' ? 'translateY(100%)' : 'translateX(100%)',
    transition: 'transform 0.4s ease-in-out',
    backgroundColor: 'var(--primary-bg-color)',
    // trick: to put two padding-top properties
    'padding-top ': 'constant(safe-area-inset-top)',
    'padding-top': 'env(safe-area-inset-top)',
    '&.show': {
      transform: props.direction === 'bottom' ? 'translateY(0)' : 'translateX(0)',
    },
    '& > *': {
      '--auto-sidemenu-left-offset': '0px',
    },
    '& > fragment': {
      height: '100%',
      '--auto-sidemenu-left-offset': '0px',
    },
    '&.desktop-slide-left': {
      [MediaQueryRange.TabletAbove]: {
        '.header-back-content': {
          width: '30%',
        },
      },
    },
    '&.desktop-slide-right': {
      [MediaQueryRange.TabletAbove]: {
        top: '59px', // Just below DesktopHeader
        left: 'calc(max(var(--auto-sidemenu-left-offset, 0px), 30%))',
        transform: 'translateX(0)',
        // notice: here is connected with mobile-header-title-icon.tsx
        '.mobile-header-title-icon-top': {
          width: '100%',
          boxShadow: 'unset',
        },
        '.header-back-content': {
          width: '100%',
        },
        '.mhti-title': {
          fontSize: '15px',
        },
        '.mhti-left, .mhti-right': {
          display: 'none',
        },
        '&.d-none': {
          display: 'unset !important',
        },
      },
    },
  };
  return (
    <div ref={ref} css={css} class='slider-frame d-none'>
      {dom.node}
    </div>
  );
};
