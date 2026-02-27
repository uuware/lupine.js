import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';

export type AspectRatioProps = {
  class?: string;
  style?: CssProps;
  children: VNode<any>;
  ratio?: number; // width/height ratio, e.g. 16/9, 4/3, 1. Defaults to 16/9
};

export const AspectRatio = (props: AspectRatioProps) => {
  const css: CssProps = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',

    '.&-inner': {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const ref: RefProps = {
    globalCssId,
  };

  const ratio = props.ratio ?? 16 / 9;
  // Use padding-top trick for broad browser support
  // paddingTop = (1 / ratio) * 100%
  const paddingTop = `${(1 / ratio) * 100}%`;

  return (
    <div class={['&-container', props.class].join(' ').trim()} ref={ref} css={{ paddingTop, ...props.style }}>
      <div class='&-inner'>{props.children}</div>
    </div>
  );
};
