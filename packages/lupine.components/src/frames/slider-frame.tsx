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
import { MediaQueryMaxWidth, VNode, stopPropagation } from 'lupine.components';
import { SliderHelper, SliderHelperCloseProps } from './slider-helper';

export type SliderFrameHookProps = {
  load?: (children: VNode<any>) => void;
  close?: (event: Event) => void;
  isOpened?: () => boolean;
};

export type SliderFrameProps = {
  defaultContent?: VNode<any> | string;
  direction?: 'right' | 'bottom';
  hook?: SliderFrameHookProps;
  afterClose?: () => void | Promise<void>;
  maxWidth?: string;
};
export const SliderFrame = (props: SliderFrameProps) => {
  let closeSlider: SliderHelperCloseProps | undefined;
  let opened = false;

  if (props.hook) {
    props.hook.load = (children) => {
      opened = true;
      SliderHelper.show({
        direction: props.direction || 'right',
        children,
        maxWidth: props.maxWidth,
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
    props.hook.isOpened = () => {
      return opened;
    };
  }
  return <></>;
};
