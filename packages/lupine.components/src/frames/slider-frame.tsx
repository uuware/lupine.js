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
import { VNode, stopPropagation } from 'lupine.components';
import { SliderHelper, SliderHelperCloseProps } from './slider-helper';

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
// deprecated
export const SliderFrame = (props: SliderFrameProps) => {
  let closeSlider: SliderHelperCloseProps | undefined;
  let opened = false;
  let className = '';

  if (props.hook) {
    props.hook.load = (children) => {
      opened = true;
      SliderHelper.show({
        direction: props.direction || 'right',
        children,
        className,
        closeEvent: () => {
          opened = false;
          closeSlider = undefined;
          props.afterClose?.();
        },
      }).then((close) => {
        closeSlider = close;
      });
    };
    props.hook.close = (event: Event) => {
      stopPropagation(event);
      closeSlider?.();
    };
    // deprecated
    props.hook.addClass = (newClassName) => {
      className = [className, newClassName].join(' ').trim();
    };
    props.hook.isOpened = () => {
      return opened;
    };
  }
  return <></>;
};
