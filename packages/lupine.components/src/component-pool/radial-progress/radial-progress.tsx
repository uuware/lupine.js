import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';
import { SvgSvg, SvgCircle } from '../svg-props';
import { ButtonSize } from '../../components/button';

export type RadialProgressHookProps = {
  onProgress?: (percentage: number) => void;
};

export type RadialProgressProps = {
  class?: string;
  style?: CssProps;
  color?: string; // Progress ring color
  trackColor?: string; // Background ring color
  size?: ButtonSize | string; // Use ButtonSize for predefined sizes
  value?: number; // 0 to 100, if not using hook
  hook?: RadialProgressHookProps;
};

export const RadialProgress = (props: RadialProgressProps) => {
  const css: CssProps = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    // Default size fallback if no ButtonSize is used
    width: '40px',
    height: '40px',

    // predefined sizes matching ButtonSize visually
    '&.button-ss': { width: '24px', height: '24px', fontSize: '10px' },
    '&.button-s': { width: '32px', height: '32px', fontSize: '12px' },
    '&.button-m': { width: '40px', height: '40px', fontSize: '14px' },
    '&.button-l': { width: '48px', height: '48px', fontSize: '16px' },
    '&.button-ll': { width: '64px', height: '64px', fontSize: '18px' },

    '.&-svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'rotate(-90deg)', // Start from top
    },

    '.&-track': {
      fill: 'none',
      strokeWidth: 8, // 100x100 viewBox
    },

    '.&-progress': {
      fill: 'none',
      strokeWidth: 8,
      transition: 'stroke-dashoffset 0.3s ease',
    },

    '.&-text': {
      fontFamily: 'var(--font-family, sans-serif)',
      fontWeight: 'bold',
      color: 'var(--primary-text-color, #000)',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  let currentValue = props.value !== undefined ? Math.max(0, Math.min(100, props.value)) : 0;

  // Radius of 45 means circumference is 2 * Math.PI * 45 = 282.743
  const circumference = 282.743;
  const getOffset = (val: number) => circumference - (val / 100) * circumference;

  const progressCircleRef: RefProps = {};
  const textRef: RefProps = {};

  if (props.hook) {
    props.hook.onProgress = (percentage: number) => {
      currentValue = Math.max(0, Math.min(100, Math.round(percentage)));
      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = `${getOffset(currentValue)}`;
      }
      if (textRef.current) {
        textRef.current.textContent = `${currentValue}%`;
      }
    };
  }

  const containerRef: RefProps = {
    globalCssId,
  };

  const progressColor = props.color || 'var(--primary-accent-color, #0a74c9)';
  const trackColor = props.trackColor || 'var(--secondary-border-color, #e0e0e0)';
  const sizeClass = props.size || ButtonSize.Medium;

  return (
    <div class={['&-container', sizeClass, props.class].join(' ').trim()} ref={containerRef} css={props.style}>
      <SvgSvg class='&-svg' viewBox='0 0 100 100'>
        <SvgCircle class='&-track' cx='50' cy='50' r='45' style={{ stroke: trackColor }} />
        <SvgCircle
          class='&-progress'
          ref={progressCircleRef}
          cx='50'
          cy='50'
          r='45'
          style={{
            stroke: progressColor,
            strokeDasharray: circumference,
            strokeDashoffset: getOffset(currentValue),
          }}
        />
      </SvgSvg>
      <span class='&-text' ref={textRef}>
        {currentValue}%
      </span>
    </div>
  );
};
