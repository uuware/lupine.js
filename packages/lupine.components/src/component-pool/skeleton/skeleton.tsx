import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';

export type SkeletonProps = {
  class?: string;
  style?: CssProps;
  width?: string;
  height?: string;
  circle?: boolean;
  animated?: boolean;
};

export const Skeleton = (props: SkeletonProps) => {
  const css: CssProps = {
    display: 'block',
    backgroundColor: 'var(--secondary-bg-color, #e5e7eb)',
    borderRadius: 'var(--border-radius-m, 4px)',
    flexShrink: 0,

    // Explicit global keyframes, ensuring it exists regardless of Tailwind context
    '@keyframes lupine-skeleton-pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },

    '&.is-animated': {
      animation: 'lupine-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    '&.is-circle': {
      borderRadius: '50%',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const ref: RefProps = {
    globalCssId,
  };

  const isAnimated = props.animated !== false; // defaults to true
  const isCircle = props.circle === true;
  const width = props.width || '100%';
  const height = props.height || '100%';

  const mergedStyle = {
    width,
    height,
    ...props.style,
  };

  return (
    <div
      class={['&-container', isAnimated ? 'is-animated' : '', isCircle ? 'is-circle' : '', props.class]
        .join(' ')
        .trim()}
      ref={ref}
      css={mergedStyle}
      aria-hidden='true'
    ></div>
  );
};
