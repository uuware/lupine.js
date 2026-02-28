import { CssProps, RefProps, bindGlobalStyle, getGlobalStylesId, VNode } from 'lupine.web';
import { HtmlVar } from '../../components/html-var';
import { PickerHelper } from '../picker-helper';
import { SvgSvg, SvgRect, SvgLine, SvgPolyline, CalendarIcon, ClearIcon, CheckIcon } from '../svg-props';

export type DatePickerProps = {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  style?: CssProps;
  yearRange?: number; // +/- years to show in menu
  clearable?: boolean;
};

const datePickerCss: CssProps = {
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
    width: '280px',
    backgroundColor: 'var(--primary-bg-color, #fff)',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
  },

  '.&-header': {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid var(--secondary-border-color, #f0f0f0)',
    gap: '4px',
  },

  '.&-nav-btn': {
    padding: '4px 8px',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: 'var(--primary-color-normal, #666)',
    '&:hover': { color: 'var(--primary-color, #1890ff)' },
    fontSize: '16px',
    fontWeight: 'bold',
  },

  '.&-year-input-box': {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    '.year-input': {
      width: '100%',
      border: '1px solid var(--secondary-border-color, #d9d9d9)',
      borderRadius: '4px',
      padding: '4px 8px',
      fontSize: '14px',
      textAlign: 'center',
      cursor: 'pointer',
      '&:focus': { borderColor: 'var(--primary-color, #1890ff)', outline: 'none' },
    },
  },

  '.&-month-select': {
    border: '1px solid var(--secondary-border-color, #d9d9d9)',
    borderRadius: '4px',
    padding: '4px',
    cursor: 'pointer',
  },

  '.&-body': {
    padding: '12px',
  },

  '.&-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
  },

  '.&-weekday': {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--secondary-color, #8c8c8c)',
    padding: '8px 0',
  },

  '.&-day': {
    textAlign: 'center',
    padding: '8px 0',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'all 0.2s',

    '&:hover': {
      backgroundColor: 'var(--primary-bg-color-hover, #e6f7ff)',
      color: 'var(--primary-color, #1890ff)',
    },

    '&.selected': {
      backgroundColor: 'var(--primary-color, #1890ff)',
      color: '#fff',
      fontWeight: 'bold',
    },

    '&.today': {
      color: 'var(--primary-color, #1890ff)',
      fontWeight: 'bold',
      '&::after': {
        content: '""',
        display: 'block',
        margin: '-4px auto 0',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color, #1890ff)',
      },
    },

    '&.not-this-month': {
      color: 'var(--secondary-color-light, #d9d9d9)',
    },
  },

  '.&-ok-btn': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    padding: '2px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'var(--primary-color, #1890ff)',
    color: '#fff',
    border: 'none',
    transition: 'opacity 0.2s',
    '&:hover': { opacity: 0.85 },
  },

  '.&-year-popup': {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.1))',
    borderRadius: '4px',
    border: '1px solid var(--secondary-border-color, #f0f0f0)',
    maxHeight: '200px',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    zIndex: 10,
    display: 'none',
    '&.open': { display: 'block' },
    '.year-item': {
      padding: '8px',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '13px',
      '&:hover': { backgroundColor: 'var(--secondary-bg-color, #f5f5f5)' },
      '&.active': { color: 'var(--primary-color, #1890ff)', fontWeight: 'bold' },
    },
  },
};

export const DatePicker = (props: DatePickerProps) => {
  const globalCssId = getGlobalStylesId(datePickerCss);
  bindGlobalStyle(globalCssId, datePickerCss);

  const ref: RefProps = { globalCssId };
  let currentValue = props.value || '';

  const parseDate = (val: string) => {
    if (!val) return new Date();
    const d = new Date(val);
    if (isNaN(d.getTime())) return new Date();
    return d;
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const updateInput = (val: string) => {
    currentValue = val;
    const input = ref.$('.&-input') as HTMLInputElement;
    if (input) input.value = val;
  };

  const showPicker = () => {
    const input = ref.$('.&-input') as HTMLInputElement;
    let viewDate = parseDate(input.value);
    let selectedDate = parseDate(input.value);
    let isYearMenuOpen = false;

    const renderPanel = () => {
      const panelRef: RefProps = { globalCssId };
      const gridVar = new HtmlVar('');

      const refreshGrid = () => {
        gridVar.value = renderGridDays();
      };

      const changeYear = (delta: number) => {
        viewDate = new Date(viewDate.setFullYear(viewDate.getFullYear() + delta));
        updateHeader();
        refreshGrid();
      };

      const changeMonth = (m: number) => {
        viewDate = new Date(viewDate.setMonth(m));
        updateHeader();
        refreshGrid();
      };

      const setYear = (y: number) => {
        viewDate = new Date(viewDate.setFullYear(y));
        isYearMenuOpen = false;
        updateHeader();
        refreshGrid();
      };

      const updateHeader = () => {
        const yrInput = panelRef.$('.year-input') as HTMLInputElement;
        if (yrInput) yrInput.value = viewDate.getFullYear().toString();
        const mSelect = panelRef.$('.&-month-select') as HTMLSelectElement;
        if (mSelect) mSelect.value = viewDate.getMonth().toString();

        const yearPopup = panelRef.$('.&-year-popup');
        if (yearPopup) yearPopup.classList.toggle('open', isYearMenuOpen);
      };

      const selectDay = (day: Date, confirm = false) => {
        selectedDate = new Date(day);
        viewDate = new Date(day);
        if (confirm) {
          const val = formatDate(selectedDate);
          updateInput(val);
          props.onChange?.(val);
          PickerHelper.hide();
        } else {
          refreshGrid();
        }
      };

      const renderGridDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Previous month days to fill the gap
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const daysNodes: any[] = [];

        // weekdays
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => {
          daysNodes.push(<div class='&-weekday'>{w}</div>);
        });

        const todayStr = formatDate(new Date());
        const selectedStr = formatDate(selectedDate);

        // fill previous month days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          daysNodes.push(<div class='&-day not-this-month'>{prevMonthLastDay - i}</div>);
        }

        // current month days
        for (let i = 1; i <= daysInMonth; i++) {
          const d = new Date(year, month, i);
          const dStr = formatDate(d);
          const isToday = dStr === todayStr;
          const isSelected = dStr === selectedStr;

          daysNodes.push(
            <div
              class={['&-day', isToday ? 'today' : '', isSelected ? 'selected' : ''].join(' ')}
              onClick={() => selectDay(d)}
              onDblClick={() => selectDay(d, true)}
            >
              {i}
            </div>
          );
        }

        const ref2: RefProps = { globalCssId }; // used to replace the & in css
        return (
          <div class='&-grid' ref={ref2}>
            {daysNodes}
          </div>
        );
      };

      const yearRange = props.yearRange || 10;
      const years: number[] = [];
      const currentYear = new Date().getFullYear();
      for (let i = currentYear - 50; i <= currentYear + 50; i++) {
        years.push(i);
      }

      gridVar.value = renderGridDays();

      return (
        <div class='&-panel' ref={panelRef}>
          <div class='&-header'>
            <button class='&-nav-btn' onClick={() => changeYear(-1)}>
              &laquo;
            </button>
            <button class='&-nav-btn' onClick={() => changeMonth(viewDate.getMonth() - 1)}>
              &lsaquo;
            </button>

            <div class='&-year-input-box'>
              <input
                class='year-input'
                value={viewDate.getFullYear()}
                readonly
                onClick={() => {
                  isYearMenuOpen = !isYearMenuOpen;
                  updateHeader();
                }}
              />
              <div class='&-year-popup'>
                {years.map((y) => (
                  <div
                    class={['year-item', y === viewDate.getFullYear() ? 'active' : ''].join(' ')}
                    onClick={() => setYear(y)}
                  >
                    {y}
                  </div>
                ))}
              </div>
            </div>

            <select
              class='&-month-select'
              value={viewDate.getMonth()}
              onChange={(e: any) => changeMonth(parseInt(e.target.value))}
            >
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                <option value={i}>{m}</option>
              ))}
            </select>

            <button class='&-nav-btn' onClick={() => changeMonth(viewDate.getMonth() + 1)}>
              &rsaquo;
            </button>
            <button class='&-nav-btn' onClick={() => changeYear(1)}>
              &raquo;
            </button>
            <button class='&-ok-btn' onClick={() => selectDay(selectedDate, true)} title='Confirm'>
              <CheckIcon />
            </button>
          </div>

          <div class='&-body'>{gridVar.node}</div>
        </div>
      );
    };

    PickerHelper.show(input, renderPanel());
  };

  return (
    <div class='&-container' css={{ ...datePickerCss, ...props.style }} ref={ref}>
      <input
        class={['&-input', props.className || 'input-base'].join(' ')}
        placeholder={props.placeholder || 'Select date'}
        value={currentValue}
        readonly
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
        <CalendarIcon />
      </div>
    </div>
  );
};
