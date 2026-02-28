import { CssProps, RefProps, bindGlobalStyle, getGlobalStylesId } from 'lupine.web';
import { PickerHelper } from '../picker-helper';
import { SvgSvg, SvgCircle, SvgPolyline, SvgLine, ClockIcon, ClearIcon, CheckIcon } from '../svg-props';

export type TimePickerProps = {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  style?: CssProps;
  clearable?: boolean;
  readonly?: boolean;
};

const timePickerCss: CssProps = {
  display: 'inline-flex',
  position: 'relative',
  width: '100%',
  flexDirection: 'column',

  '.&-input': {
    width: '100%',
    cursor: 'pointer',
    paddingRight: '30px',
  },

  '.&-icon': {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'var(--secondary-color, #999)',
  },

  '.&-icon-clear': {
    position: 'absolute',
    right: '28px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'var(--error-color, #f5222d)',
    opacity: 0.6,
    transition: 'opacity 0.2s',
    '&:hover': { opacity: 1 },
    display: 'none',
  },
  '&:hover .&-icon-clear.visible': {
    display: 'block',
  },

  '.&-panel': {
    display: 'flex',
    flexDirection: 'column-reverse', // Footer at top when popup is BELOW input
    width: '240px',
    backgroundColor: 'var(--primary-bg-color, #fff)',
    borderRadius: 'var(--border-radius-m, 8px)',
  },

  ':global(.lupine-picker-host .top) .&-panel': {
    flexDirection: 'column', // Footer at bottom when popup is ABOVE input
  },

  '.&-columns': {
    display: 'flex',
    height: '220px',
    borderBottom: '1px solid var(--secondary-border-color, #eee)',
  },

  '.&-column': {
    flex: 1,
    overflowY: 'auto',
    textAlign: 'center',
    padding: '4px 0',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowX: 'hidden',
  },

  '.&-item': {
    padding: '2px 0',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
    color: 'var(--primary-color-normal, #333)',

    '&:hover': {
      backgroundColor: 'var(--secondary-bg-color, #f5f5f5)',
    },

    '&.selected': {
      backgroundColor: 'var(--primary-bg-color-hover, #e6f7ff)',
      color: 'var(--primary-color, #1890ff)',
      fontWeight: 'bold',
    },
  },

  '.&-footer': {
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: '1px solid var(--secondary-border-color, #f0f0f0)',
  },

  ':global(.lupine-picker-host .top) .&-footer': {
    borderBottom: 'none',
    borderTop: '1px solid var(--secondary-border-color, #f0f0f0)',
  },

  '.&-ok-btn': {
    padding: '2px 0 0 0',
    borderRadius: 'var(--border-radius-m, 6px)',
    cursor: 'pointer',
    backgroundColor: 'var(--primary-color, #1890ff)',
    color: '#fff',
    border: 'none',
    transition: 'opacity 0.2s',
    width: '100%',

    '&:hover': {
      opacity: 0.85,
    },
    '&:active': {
      opacity: 0.7,
    },
  },
};

export const TimePicker = (props: TimePickerProps) => {
  const globalCssId = getGlobalStylesId(timePickerCss);
  bindGlobalStyle(globalCssId, timePickerCss);

  const ref: RefProps = { globalCssId };
  let currentValue = props.value || '';

  const parseValue = (val: string) => {
    const parts = val.split(':');
    return {
      h: parseInt(parts[0]) || 0,
      m: parseInt(parts[1]) || 0,
      s: parseInt(parts[2]) || 0,
    };
  };

  const formatValue = (h: number, m: number, s: number) => {
    return [h.toString().padStart(2, '0'), m.toString().padStart(2, '0'), s.toString().padStart(2, '0')].join(':');
  };

  const updateInput = (val: string) => {
    currentValue = val;
    const input = ref.$('.&-input') as HTMLInputElement;
    if (input) input.value = val;
  };

  const showPicker = () => {
    const input = ref.$('.&-input') as HTMLInputElement;
    const { h: initialH, m: initialM, s: initialS } = parseValue(input.value);

    let selectedH = initialH;
    let selectedM = initialM;
    let selectedS = initialS;

    const rect = input.getBoundingClientRect();
    const offset = 8;
    const spaceTop = rect.top - offset;
    const spaceBottom = window.innerHeight - rect.bottom - offset;

    let columnsHeight = 220;
    const footerHeight = 44;
    const expectedHeight = columnsHeight + footerHeight;

    if (spaceBottom < expectedHeight) {
      if (spaceTop > spaceBottom) {
        // Will go top
        columnsHeight = spaceTop - footerHeight;
      } else {
        // Will stay bottom
        columnsHeight = spaceBottom - footerHeight;
      }
    }
    columnsHeight = Math.max(100, Math.min(220, columnsHeight));

    const renderPanel = () => {
      const hours = Array.from({ length: 24 }, (_, i) => i);
      const minutes = Array.from({ length: 60 }, (_, i) => i);
      const seconds = Array.from({ length: 60 }, (_, i) => i);

      const panelRef: RefProps = {
        globalCssId,
        onLoad: async () => {
          setTimeout(highlightSelection, 10);
        },
      };

      const highlightSelection = () => {
        // Use Namespaced queries correctly via ref.$() and ref.$all()
        panelRef.$all('.&-item').forEach((item: any) => item.classList.remove('selected'));

        const hItem = panelRef.$(`.col-h [data-val="${selectedH}"]`);
        const mItem = panelRef.$(`.col-m [data-val="${selectedM}"]`);
        const sItem = panelRef.$(`.col-s [data-val="${selectedS}"]`);

        hItem?.classList.add('selected');
        mItem?.classList.add('selected');
        sItem?.classList.add('selected');

        // Scroll into view
        hItem?.scrollIntoView({ block: 'nearest' });
        mItem?.scrollIntoView({ block: 'nearest' });
        sItem?.scrollIntoView({ block: 'nearest' });
      };

      const handleConfirm = () => {
        const finalVal = formatValue(selectedH, selectedM, selectedS);
        updateInput(finalVal);
        props.onChange?.(finalVal);
        PickerHelper.hide();
      };

      const selectItem = (type: 'h' | 'm' | 's', val: number, isDoubleClick?: boolean) => {
        if (type === 'h') selectedH = val;
        else if (type === 'm') selectedM = val;
        else if (type === 's') selectedS = val;

        highlightSelection();

        if (isDoubleClick) {
          handleConfirm();
        }
      };

      return (
        <div class='&-panel' ref={panelRef}>
          <div class='&-columns' style={`height: ${columnsHeight}px`}>
            <div class='&-column col-h'>
              {hours.map((h) => (
                <div
                  class='&-item'
                  data-val={h}
                  onClick={() => selectItem('h', h)}
                  onDblClick={() => selectItem('h', h, true)}
                >
                  {h.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
            <div class='&-column col-m'>
              {minutes.map((m) => (
                <div
                  class='&-item'
                  data-val={m}
                  onClick={() => selectItem('m', m)}
                  onDblClick={() => selectItem('m', m, true)}
                >
                  {m.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
            <div class='&-column col-s'>
              {seconds.map((s) => (
                <div
                  class='&-item'
                  data-val={s}
                  onClick={() => selectItem('s', s)}
                  onDblClick={() => selectItem('s', s, true)}
                >
                  {s.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
          <div class='&-footer'>
            <button class='&-ok-btn' onClick={handleConfirm} title='Confirm'>
              <CheckIcon />
            </button>
          </div>
        </div>
      );
    };

    PickerHelper.show(input, renderPanel());
  };

  return (
    <div class='&-container' css={props.style} ref={ref}>
      <input
        class={['&-input', props.className || 'input-base'].join(' ')}
        placeholder={props.placeholder || 'Select time'}
        value={currentValue}
        readonly={props.readonly !== false}
        onClick={showPicker}
      />
      <div
        class={['&-icon-clear', currentValue ? 'visible' : ''].join(' ')}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          updateInput('');
          props.onChange?.('');
        }}
      >
        <ClearIcon />
      </div>
      <div class='&-icon'>
        <ClockIcon />
      </div>
    </div>
  );
};
