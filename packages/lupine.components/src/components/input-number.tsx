import { bindGlobalStyle, CssProps, RefProps } from 'lupine.web';
import { ButtonSize } from './button';

// Re-export ButtonSize as InputNumberSize for semantic clarity
export { ButtonSize as InputNumberSize };

export type InputNumberProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: ButtonSize;
  shape?: 'square' | 'circle';
  disabled?: boolean;
  onChange?: (value: number) => void;
  class?: string;
  css?: CssProps;
};

type SizeCfg = { h: number; fs: number; valW: number };
const SIZE_CFG: Record<ButtonSize, SizeCfg> = {
  [ButtonSize.SmallSmall]: { h: 24, fs: 11, valW: 36 },
  [ButtonSize.Small]: { h: 28, fs: 12, valW: 42 },
  [ButtonSize.Medium]: { h: 36, fs: 14, valW: 52 },
  [ButtonSize.Large]: { h: 44, fs: 16, valW: 60 },
  [ButtonSize.LargeLarge]: { h: 52, fs: 18, valW: 72 },
};

const CIRCLE_SIZE_CFG: Record<ButtonSize, SizeCfg> = {
  [ButtonSize.SmallSmall]: { h: 18, fs: 12, valW: 20 },
  [ButtonSize.Small]: { h: 22, fs: 14, valW: 24 },
  [ButtonSize.Medium]: { h: 26, fs: 16, valW: 28 },
  [ButtonSize.Large]: { h: 28, fs: 18, valW: 32 },
  [ButtonSize.LargeLarge]: { h: 30, fs: 20, valW: 36 },
};

export const InputNumber = ({
  value = 0,
  min,
  max,
  step = 1,
  size = ButtonSize.Medium,
  shape = 'square',
  disabled = false,
  onChange,
  class: cls,
}: InputNumberProps) => {
  let current = value;
  const valRef: RefProps = {};
  const { h, fs, valW } = shape === 'circle' ? CIRCLE_SIZE_CFG[size] : SIZE_CFG[size];

  const update = (next: number) => {
    if (disabled) return;
    if (min !== undefined && next < min) return;
    if (max !== undefined && next > max) return;
    current = next;
    if (valRef.current) (valRef.current as HTMLElement).textContent = String(current);
    onChange?.(current);
  };

  // Press-and-hold: fire once immediately, then repeat after 400ms delay at 80ms interval
  let repeatTimer: any = null;
  let repeatInterval: any = null;

  const pressStart = (delta: number) => {
    update(current + delta);
    repeatTimer = setTimeout(() => {
      repeatInterval = setInterval(() => update(current + delta), 80);
    }, 400);
  };

  const pressStop = () => {
    clearTimeout(repeatTimer);
    clearInterval(repeatInterval);
    repeatTimer = null;
    repeatInterval = null;
  };

  // All CSS on root element — children use class names
  const css: CssProps = {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid var(--primary-border-color)',
    borderRadius: 'var(--border-radius-m, 8px)',
    overflow: 'hidden',
    opacity: disabled ? 'var(--primary-disabled-opacity, 0.5)' : '1',
    filter: disabled ? 'grayscale(1)' : 'none',
    userSelect: 'none',

    '.inp-btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      lineHeight: 1,
      background: 'transparent',
      border: 'none',
      color: 'var(--activatable-color-normal)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background 0.15s, transform 0.1s',
      flexShrink: 0,
      '&:hover': { background: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.06))' },
      '&:active': { transform: 'scale(0.85)' },
    },

    '.inp-val': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontVariantNumeric: 'tabular-nums',
      borderLeft: '1px solid var(--primary-border-color)',
      borderRight: '1px solid var(--primary-border-color)',
      color: 'var(--activatable-color-normal)',
      padding: '0 6px',
    },

    '&.shape-circle': {
      border: 'none',
      gap: '4px',
      overflow: 'visible',
      '.inp-btn': {
        borderRadius: '50%',
        color: 'var(--primary-color, #222)',
        background: 'var(--primary-bg-color, linear-gradient(180deg, #fefefe 0%, #dcdcdc 100%))',
        border: 'var(--primary-border, 1px solid #b3b3b3)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.8)',
        transition: 'all 0.1s ease-out',
        '&:hover': {
          background: 'var(--primary-bg-color, linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%))',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.8)',
        },
        '&:active': {
          transform: 'scale(0.96)',
          background: 'var(--secondary-bg-color, linear-gradient(180deg, #dcdcdc 0%, #fefefe 100%))',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.8)',
        },
      },
      '.inp-val': {
        borderLeft: 'none',
        borderRight: 'none',
      },
    },
  };
  bindGlobalStyle('input-number', css);

  // Native touch binding (passive:false = allows e.preventDefault to block synthetic mouse events)
  const minusBtnRef: RefProps = {
    onLoad: async () => {
      const el = minusBtnRef.current as HTMLButtonElement;
      el.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault();
          pressStart(-step);
        },
        { passive: false }
      );
      el.addEventListener('touchend', pressStop);
      el.addEventListener('touchcancel', pressStop);
    },
  };
  const plusBtnRef: RefProps = {
    onLoad: async () => {
      const el = plusBtnRef.current as HTMLButtonElement;
      el.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault();
          pressStart(+step);
        },
        { passive: false }
      );
      el.addEventListener('touchend', pressStop);
      el.addEventListener('touchcancel', pressStop);
    },
  };
  return (
    <div class={['input-number', `shape-${shape}`, cls].join(' ').trim()}>
      <button
        ref={minusBtnRef}
        class='inp-btn'
        style={{ width: `${h}px`, height: `${h}px`, fontSize: `${fs + 5}px` }}
        disabled={disabled}
        onMouseDown={() => pressStart(-step)}
        onMouseUp={pressStop}
        onMouseLeave={pressStop}
      >
        −
      </button>
      <span class='inp-val' ref={valRef} style={{ minWidth: `${valW}px`, height: `${h}px`, fontSize: `${fs}px` }}>
        {value}
      </span>
      <button
        ref={plusBtnRef}
        class='inp-btn'
        style={{ width: `${h}px`, height: `${h}px`, fontSize: `${fs + 5}px` }}
        disabled={disabled}
        onMouseDown={() => pressStart(+step)}
        onMouseUp={pressStop}
        onMouseLeave={pressStop}
      >
        +
      </button>
    </div>
  );
};
