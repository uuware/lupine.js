import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';
import { Skeleton } from './skeleton';

export type SkeletonCardProps = {
  class?: string;
  style?: CssProps;
  width?: string;
  height?: string;
  animated?: boolean;
};

export const SkeletonCard = (props: SkeletonCardProps) => {
  const css: CssProps = {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '24px',
    boxSizing: 'border-box',
    border: '1px solid var(--secondary-border-color, #eee)',
    borderRadius: '12px',
    backgroundColor: 'var(--primary-bg-color, #fff)',
    overflow: 'hidden',

    '.&-content': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: 0,
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const animated = props.animated !== false;

  let ro: ResizeObserver | null = null;
  let timer: any = null;

  const contentRef: RefProps = {};

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      const container = ref.current as HTMLElement;

      const refreshLines = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          // Calculate available vertical space in the content column
          const style = window.getComputedStyle(container);
          const paddingTop = parseFloat(style.paddingTop);
          const paddingBottom = parseFloat(style.paddingBottom);

          const availableHeight = container.clientHeight - paddingTop - paddingBottom;

          // Headings are 20px, sub-lines are 16px. Gap is 8px.
          // Let's assume the first line is always title: 20px
          // Then remaining lines take 16px + 8px gap = 24px each.

          let remainingHeight = availableHeight;
          const lines = [];

          // Title Line (20px)
          if (remainingHeight >= 20) {
            lines.push(<Skeleton width='60%' height='20px' animated={animated} />);
            remainingHeight -= 28; // 20px height + 8px gap
          }

          // Sub line 1 (16px) full width
          if (remainingHeight >= 16) {
            lines.push(<Skeleton width='100%' height='16px' animated={animated} />);
            remainingHeight -= 24; // 16px height + 8px gap
          }

          // Generate remaining lines (80% width for visual variety)
          while (remainingHeight >= 16) {
            // Give the last line a slightly different width if desired, but 80% is good
            lines.push(<Skeleton width={Math.random() > 0.5 ? '80%' : '90%'} height='16px' animated={animated} />);
            remainingHeight -= 24;
          }

          if (contentRef.mountInnerComponent) {
            contentRef.mountInnerComponent(<>{lines}</>);
          }
        }, 50);
      };

      ro = new ResizeObserver(() => refreshLines());
      ro.observe(container);
    },
    onUnload: async () => {
      if (ro) ro.disconnect();
      if (timer) clearTimeout(timer);
    },
  };

  const mergedStyle = {
    width: props.width || '100%',
    height: props.height || '100%',
    ...props.style,
  };

  // Avatar size is fixed to 48px to represent a typical user profile
  return (
    <div class={['&-container', props.class].join(' ').trim()} ref={ref} css={mergedStyle} aria-hidden='true'>
      <Skeleton width='48px' height='48px' circle={true} animated={animated} />
      <div class='&-content' ref={contentRef}></div>
    </div>
  );
};
