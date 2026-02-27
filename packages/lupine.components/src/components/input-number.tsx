import { CssProps, RefProps } from 'lupine.web';
import { ButtonSize } from './button';

// Re-export ButtonSize as InputNumberSize for semantic clarity
export { ButtonSize as InputNumberSize };

export type InputNumberProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: ButtonSize;
  disabled?: boolean;
  onChange?: (value: number) => void;
  class?: string;
  css?: CssProps;
};

type SizeCfg = { h: number; fs: number; valW: number };
const SIZE_CFG: Record<ButtonSize, SizeCfg> = {
  [ButtonSize.SmallLarge]: { h: 24, fs: 11, valW: 36 },
  [ButtonSize.Small]: { h: 28, fs: 12, valW: 42 },
  [ButtonSize.Medium]: { h: 36, fs: 14, valW: 52 },
  [ButtonSize.Large]: { h: 44, fs: 16, valW: 60 },
  [ButtonSize.LargeLarge]: { h: 52, fs: 18, valW: 72 },
};

export const InputNumber = ({
  value = 0,
  min,
  max,
  step = 1,
  size = ButtonSize.Medium,
  disabled = false,
  onChange,
  class: cls,
  css: extraCss,
}: InputNumberProps) => {
  let current = value;
  const valRef: RefProps = {};
  const { h, fs, valW } = SIZE_CFG[size];

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
    opacity: disabled ? '0.5' : '1',
    userSelect: 'none',

    '.inp-btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${h}px`,
      height: `${h}px`,
      fontSize: `${fs + 5}px`,
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
      minWidth: `${valW}px`,
      height: `${h}px`,
      fontSize: `${fs}px`,
      fontVariantNumeric: 'tabular-nums',
      borderLeft: '1px solid var(--primary-border-color)',
      borderRight: '1px solid var(--primary-border-color)',
      color: 'var(--activatable-color-normal)',
      padding: '0 6px',
    },

    ...extraCss,
  };

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
    <div css={css} class={cls}>
      <button
        ref={minusBtnRef}
        class='inp-btn'
        disabled={disabled}
        onMouseDown={() => pressStart(-step)}
        onMouseUp={pressStop}
        onMouseLeave={pressStop}
      >
        −
      </button>
      <span class='inp-val' ref={valRef}>
        {value}
      </span>
      <button
        ref={plusBtnRef}
        class='inp-btn'
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
