import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';

export type RangeHookProps = {
  setValue: (val: number | [number, number]) => void;
  getValue: () => number | [number, number];
};

export type RangeProps = {
  class?: string;
  style?: CssProps;
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  disabled?: boolean;
  showTicks?: boolean;
  showTickLabels?: boolean;
  tickStep?: number;
  vertical?: boolean;
  range?: boolean;
  onChange?: (val: number | [number, number]) => void;
  hook?: RangeHookProps;
};

// 1. Define Static CSS completely decoupled from Reactivity (isVertical)
// We rely completely on `.horizontal` and `.vertical` root classes
const rangeCss: CssProps = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',

  '&.horizontal': {
    flexDirection: 'column',
    padding: 'var(--space-m, 8px) 0',
    width: '100%',
    height: 'auto',
    minWidth: '100%',
    minHeight: '40px',
  },
  '&.vertical': {
    flexDirection: 'row',
    padding: '0 var(--space-m, 8px)',
    width: 'auto',
    height: '100%',
    minWidth: '40px',
    minHeight: '200px',
  },

  '&.disabled': {
    opacity: 'var(--primary-disabled-opacity, 0.5)',
    pointerEvents: 'none',
  },

  '.&-wrapper': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '&.horizontal .&-wrapper': {
    width: '100%',
    height: '20px',
  },
  '&.vertical .&-wrapper': {
    width: '20px',
    height: '100%',
  },

  '.&-track': {
    position: 'relative',
    backgroundColor: 'var(--secondary-bg-color, #eee)',
    borderRadius: '999px',
  },
  '&.horizontal .&-track': {
    width: '100%',
    height: '8px',
  },
  '&.vertical .&-track': {
    width: '8px',
    height: '100%',
  },

  '.&-fill': {
    position: 'absolute',
    backgroundColor: 'var(--primary-accent-color, #0a74c9)',
    borderRadius: '999px',
  },
  '&.horizontal .&-fill': {
    left: 'var(--range-fill-start, 0%)',
    width: 'var(--range-fill-size, 0%)',
    top: 0,
    height: '100%',
  },
  '&.vertical .&-fill': {
    bottom: 'var(--range-fill-start, 0%)',
    height: 'var(--range-fill-size, 0%)',
    left: 0,
    width: '100%',
  },

  '.&-input': {
    position: 'absolute',
    margin: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    outline: 'none',
    pointerEvents: 'none',
    zIndex: 2,
  },
  '&.horizontal .&-input': {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transformOrigin: 'none',
    transform: 'none',
  },
  '&.vertical .&-input': {
    height: '20px',
    top: '100%',
    left: 0,
    transformOrigin: '0 0',
    transform: 'rotate(-90deg)',
  },

  '.&-input::-webkit-slider-thumb': {
    appearance: 'none',
    WebkitAppearance: 'none',
    pointerEvents: 'auto',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid var(--primary-accent-color, #0a74c9)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    transition: 'transform 0.1s',
  },
  '.&-input::-webkit-slider-thumb:hover': {
    transform: 'scale(1.15)',
  },
  '.&-input::-webkit-slider-thumb:active': {
    transform: 'scale(0.95)',
  },
  '.&-input::-moz-range-thumb': {
    pointerEvents: 'auto',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid var(--primary-accent-color, #0a74c9)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    transition: 'transform 0.1s',
  },

  '.&-ticks': {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    fontSize: '12px',
    color: 'var(--secondary-color, #818181)',
  },
  '&.horizontal .&-ticks': {
    top: '50%',
    bottom: 'auto',
    left: 0,
    right: 0,
    marginTop: '4px',
    marginLeft: '4px',
    flexDirection: 'row',
    height: 'auto',
  },
  '&.vertical .&-ticks': {
    top: 0,
    bottom: 0,
    left: '20%',
    right: 'auto',
    marginLeft: '8px',
    marginTop: 0,
    flexDirection: 'column-reverse',
    height: '100%',
  },

  '.&-tick': {
    display: 'flex',
    alignItems: 'center',
  },
  '&.horizontal .&-tick': {
    flexDirection: 'column',
  },
  '&.vertical .&-tick': {
    flexDirection: 'row',
  },

  '.&-tick-mark': {
    backgroundColor: 'var(--secondary-border-color, #a0a0a0)',
  },
  '&.horizontal .&-tick-mark': {
    width: '2px',
    height: '8px',
    marginBottom: '4px',
    marginRight: 0,
  },
  '&.vertical .&-tick-mark': {
    width: '8px',
    height: '2px',
    marginBottom: 0,
    marginRight: '4px',
  },
};

export const Range = (props: RangeProps) => {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const step = props.step ?? 1;
  const isRangeMode = !!props.range;
  const isVertical = !!props.vertical;

  // Evaluate the immutable hash exact ONCE for all range implementations.
  const globalCssId = getGlobalStylesId(rangeCss);
  // Bind the global style ID ensuring it's in the CSS tree across instances
  bindGlobalStyle(globalCssId, rangeCss);

  let val1 = 0;
  let val2 = 100;
  if (isRangeMode) {
    if (Array.isArray(props.value)) {
      val1 = props.value[0];
      val2 = props.value[1];
    } else {
      val1 = min;
      val2 = max;
    }
    if (val1 > val2) {
      const temp = val1;
      val1 = val2;
      val2 = temp;
    }
  } else {
    val1 = (props.value as number) ?? min;
  }

  let currentVal1 = val1;
  let currentVal2 = val2;

  const updateVisuals = () => {
    const fill = ref.$('.&-fill') as HTMLElement;
    if (!fill) return;

    if (isRangeMode) {
      const minPercent = ((currentVal1 - min) / (max - min)) * 100;
      const maxPercent = ((currentVal2 - min) / (max - min)) * 100;

      fill.style.setProperty('--range-fill-start', `${minPercent}%`);
      fill.style.setProperty('--range-fill-size', `${maxPercent - minPercent}%`);

      const inputMin = ref.$('.input-min') as HTMLInputElement;
      const inputMax = ref.$('.input-max') as HTMLInputElement;
      if (inputMin && inputMax) {
        if (minPercent > 50) {
          inputMin.style.zIndex = '3';
          inputMax.style.zIndex = '2';
        } else {
          inputMin.style.zIndex = '2';
          inputMax.style.zIndex = '3';
        }
      }
    } else {
      const percent = ((currentVal1 - min) / (max - min)) * 100;
      fill.style.setProperty('--range-fill-start', '0%');
      fill.style.setProperty('--range-fill-size', `${percent}%`);
    }
  };

  const handleInput = (e: Event, isThumb2: boolean) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    if (isRangeMode) {
      if (isThumb2) {
        currentVal2 = Math.max(val, currentVal1);
        (e.target as HTMLInputElement).value = currentVal2.toString();
        (e.target as HTMLInputElement).style.zIndex = '4';
        const sibling = ref.$('.input-min') as HTMLInputElement;
        if (sibling) sibling.style.zIndex = '3';
      } else {
        currentVal1 = Math.min(val, currentVal2);
        (e.target as HTMLInputElement).value = currentVal1.toString();
        (e.target as HTMLInputElement).style.zIndex = '4';
        const sibling = ref.$('.input-max') as HTMLInputElement;
        if (sibling) sibling.style.zIndex = '3';
      }
    } else {
      currentVal1 = val;
    }
    updateVisuals();
  };

  const handleChange = () => {
    if (props.onChange) {
      if (isRangeMode) {
        props.onChange([currentVal1, currentVal2]);
      } else {
        props.onChange(currentVal1);
      }
    }
  };

  if (props.hook) {
    props.hook.setValue = (val) => {
      if (isRangeMode && Array.isArray(val)) {
        currentVal1 = Math.min(Math.max(val[0], min), max);
        currentVal2 = Math.max(Math.min(val[1], max), currentVal1);
        const inputMin = ref.$('.input-min') as HTMLInputElement;
        const inputMax = ref.$('.input-max') as HTMLInputElement;
        if (inputMin) inputMin.value = currentVal1.toString();
        if (inputMax) inputMax.value = currentVal2.toString();
      } else if (!isRangeMode && typeof val === 'number') {
        currentVal1 = Math.min(Math.max(val, min), max);
        const input = ref.$('.input-single') as HTMLInputElement;
        if (input) input.value = currentVal1.toString();
      }
      updateVisuals();
    };
    props.hook.getValue = () => (isRangeMode ? [currentVal1, currentVal2] : currentVal1);
  }

  const ref: RefProps & { onUnload?: (el: Element) => Promise<void> | void } = {
    globalCssId,
    onLoad: async () => {
      if (isVertical) {
        const wrapper = ref.$('.&-wrapper') as HTMLElement;
        const inputs = ref.$all('.&-input') as NodeListOf<HTMLInputElement>;
        if (wrapper && inputs) {
          const ro = new ResizeObserver(() => {
            const height = wrapper.clientHeight;
            inputs.forEach((input) => {
              input.style.width = `${height}px`;
            });
          });
          ro.observe(wrapper);
          (ref as any)._resizeObserver = ro;
        }
      }
      updateVisuals();
    },
    onUnload: async (el: Element) => {
      if ((ref as any)._resizeObserver) {
        ((ref as any)._resizeObserver as ResizeObserver).disconnect();
      }
    },
  };

  const ticks = [];
  if (props.showTicks || props.showTickLabels) {
    const tStep = props.tickStep || max - min;
    for (let i = min; i <= max; i += tStep) {
      ticks.push(i);
    }
    if (ticks[ticks.length - 1] !== max) {
      ticks.push(max);
    }
  }

  return (
    <div
      class={['&-container', props.class, props.disabled ? 'disabled' : '', isVertical ? 'vertical' : 'horizontal']
        .join(' ')
        .trim()}
      ref={ref}
      css={props.style}
    >
      <div class='&-wrapper'>
        <div class='&-track'>
          <div class='&-fill'></div>
        </div>

        {isRangeMode ? (
          <>
            <input
              type='range'
              class='&-input input-min'
              min={min}
              max={max}
              step={step}
              value={val1}
              onInput={(e) => handleInput(e, false)}
              onChange={handleChange}
              disabled={props.disabled}
            />
            <input
              type='range'
              class='&-input input-max'
              min={min}
              max={max}
              step={step}
              value={val2}
              onInput={(e) => handleInput(e, true)}
              onChange={handleChange}
              disabled={props.disabled}
            />
          </>
        ) : (
          <input
            type='range'
            class='&-input input-single'
            min={min}
            max={max}
            step={step}
            value={val1}
            onInput={(e) => handleInput(e, false)}
            onChange={handleChange}
            disabled={props.disabled}
          />
        )}
      </div>

      {(props.showTicks || props.showTickLabels) && (
        <div class='&-ticks'>
          {ticks.map((t) => (
            <div class='&-tick'>
              {props.showTicks && <div class='&-tick-mark'></div>}
              {props.showTickLabels && <span>{t}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
