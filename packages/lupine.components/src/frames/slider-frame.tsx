import { VNode, CssProps, RefProps } from 'lupine.web';
import { stopPropagation } from '../lib';
import { HtmlVar } from '../components';
import { MediaQueryRange } from '../styles';

export type SliderFramePosition = 'desktop-slide-left' | 'desktop-slide-right';
export type SliderFrameHookProps = {
  load?: (children: VNode<any>) => void;
  close?: (event: Event) => void;
  addClass?: (className: SliderFramePosition) => void;
};

export type SliderFrameProps = {
  defaultContent?: VNode<any> | string;
  direction?: 'right' | 'bottom';
  hook?: SliderFrameHookProps;
  afterClose?: () => void;
};
export const SliderFrame = (props: SliderFrameProps) => {
  if (props.hook) {
    props.hook.load = (children) => {
      dom.value = children;
      ref.current?.classList.remove('d-none');
      setTimeout(() => {
        ref.current?.classList.add('show');
      }, 1);
    };
    props.hook.close = (event: Event) => {
      stopPropagation(event);
      ref.current?.classList.remove('show');
      setTimeout(() => {
        ref.current?.classList.add('d-none');
        dom.value = '';
        if (props.afterClose) {
          props.afterClose();
        }
      }, 400);
    };
    props.hook.addClass = (className) => {
      ref.current?.classList.add(className);
    };
  }
  const dom = HtmlVar(<div class='slider-frame-default'>{props.defaultContent || '(No Content)'}</div>);
  const ref: RefProps = {};
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: 'var(--layer-slider)',
    transform: props.direction === 'bottom' ? 'translateY(100%)' : 'translateX(100%)',
    transition: 'transform 0.4s ease-in-out',
    backgroundColor: 'var(--primary-bg-color)',
    '&.show': {
      transform: props.direction === 'bottom' ? 'translateY(0)' : 'translateX(0)',
    },
    '& > fragment': {
      height: '100%',
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
        top: '56px',
        left: '30%',
        transform: 'translateX(0)',
        '.header-back-top': {
          width: '100%',
          boxShadow: 'unset',
        },
        '.header-back-content': {
          width: '100%',
        },
        '.header-back-title': {
          fontSize: '15px',
        },
        '.header-back-left, .header-back-right': {
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
