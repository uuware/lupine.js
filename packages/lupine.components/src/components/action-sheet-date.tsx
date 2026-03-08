import { CssProps, RefProps, VNode } from 'lupine.web';
import { HtmlVar } from './html-var';
import { ActionSheet, ActionSheetCloseProps, ActionSheetCloseReasonProps } from './action-sheet';

export type ActionSheetDatePickerOrder = 'YMD' | 'DMY';
export type ActionSheetDatePickerFormat = 'YMD' | 'MD' | 'D';

export type ActionSheetDatePickerProps = {
  /** Initial date value. Format depends on format prop, defaults to "YYYY-MM-DD" */
  value?: string;
  title?: string;
  /** Format of the picker. Default: 'YMD' */
  format?: ActionSheetDatePickerFormat;
  /** Column order. Default: 'YMD' (Year | Month | Day) */
  order?: ActionSheetDatePickerOrder;
  /** Month labels. Defaults to English month names. Length determines month count. */
  months?: string[];
  /** Years shown above/below current year. Default: 100 (range = currentYear-N to currentYear+N) */
  yearRange?: number;
  confirmButtonText?: string;
  cancelButtonText?: string;
  zIndex?: string;
};

const DEFAULT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Year range: ±yearRange from current year (resolved at call time)
const CURRENT_YEAR = new Date().getFullYear();

const ITEM_H = 44;
const VISIBLE = 5; // number of visible rows (must be odd)
const PAD = Math.floor(VISIBLE / 2); // 2 rows of padding above/below

/**
 * Mobile-friendly date picker shown via an ActionSheet slide-up panel.
 * Shows Year / Month / Day (or Day / Month / Year) columns.
 * Returns "YYYY-MM-DD" or undefined if cancelled.
 */
export const ActionSheetDatePicker = async ({
  value = '',
  title = '',
  format = 'YMD',
  order = 'YMD',
  months = DEFAULT_MONTHS,
  yearRange = 100,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetDatePickerProps): Promise<string | undefined> => {
  // Parse initial date
  const today = new Date();

  let parts: string[] = [];
  if (format === 'MD') {
    parts = value.match(/^(\d{2})-(\d{2})$/) ?? [];
    parts.unshift(''); // Shift empty year so indices [1]/[2] match month/day fallback logic below
    parts.unshift(''); // Padding to push match groups to [2][3]
  } else if (format === 'D') {
    parts = value.match(/^(\d{2})$/) ?? [];
    parts.unshift('');
    parts.unshift('');
    parts.unshift(''); // Push match group to [3]
  } else {
    parts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/) ?? [];
  }

  const initialYear = parts[1] ? parseInt(parts[1], 10) : today.getFullYear();
  const initialMonth = parts[2] ? parseInt(parts[2], 10) : today.getMonth() + 1;
  const initialDay = parts[3] ? parseInt(parts[3], 10) : today.getDate();

  const YEAR_COUNT = yearRange * 2 + 1;
  const START_YEAR = CURRENT_YEAR - yearRange;

  return new Promise(async (resolve) => {
    let handleClose: ActionSheetCloseProps;

    // One ref per column — values are read from scrollTop at confirm time
    const yearRef: RefProps = {};
    const monthRef: RefProps = {};
    const dayRef: RefProps = {};

    const getIdx = (colRef: RefProps) => {
      if (!colRef.current) return 0;
      return Math.round((colRef.current as HTMLElement).scrollTop / ITEM_H);
    };

    const onConfirm = () => {
      const year = START_YEAR + getIdx(yearRef);
      const month = 1 + getIdx(monthRef);
      const day = 1 + getIdx(dayRef);

      let result = '';
      if (format === 'D') {
        result = String(day).padStart(2, '0');
      } else if (format === 'MD') {
        result = [String(month).padStart(2, '0'), String(day).padStart(2, '0')].join('-');
      } else {
        result = [String(year).padStart(4, '0'), String(month).padStart(2, '0'), String(day).padStart(2, '0')].join(
          '-'
        );
      }

      resolve(result);
      handleClose('confirm');
    };
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'confirm') resolve(undefined);
    };

    /**
     * Build a scrollable column.
     * Carousel pattern: scroll to item's offsetTop on load; read scrollTop on confirm.
     */
    const buildColumn = (labels: string[], initialIdx: number, colRef: RefProps, onScroll?: () => void) => {
      colRef.onLoad = async () => {
        const el = colRef.current as HTMLElement;
        const items = el.querySelectorAll('.dp-item');
        if (items[initialIdx]) {
          // offsetTop accounts for the PAD padding divs above the items
          el.scrollTop = (items[initialIdx] as HTMLElement).offsetTop - PAD * ITEM_H;
        }
      };

      return (
        <div class='col' ref={colRef} onScroll={onScroll}>
          {Array.from({ length: PAD }, (_, i) => (
            <div class='dp-pad' key={`t${i}`} />
          ))}
          {labels.map((label, i) => (
            <div class='dp-item' key={i}>
              {label}
            </div>
          ))}
          {Array.from({ length: PAD }, (_, i) => (
            <div class='dp-pad' key={`b${i}`} />
          ))}
        </div>
      );
    };

    const buildDynamicColumn = (labelsVar: HtmlVar, initialIdx: number, colRef: RefProps) => {
      colRef.onLoad = async () => {
        const el = colRef.current as HTMLElement;
        const items = el.querySelectorAll('.dp-item');
        if (items[initialIdx]) {
          el.scrollTop = (items[initialIdx] as HTMLElement).offsetTop - PAD * ITEM_H;
        }
      };

      return (
        <div class='col' ref={colRef}>
          {labelsVar.node}
        </div>
      );
    };

    const generateDaysDOM = (maxDays: number) => {
      const labels = Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'));
      return (
        <>
          {Array.from({ length: PAD }, (_, i) => (
            <div class='dp-pad' key={`t${i}`} />
          ))}
          {labels.map((label: string, i: number) => (
            <div class='dp-item' key={i}>
              {label}
            </div>
          ))}
          {Array.from({ length: PAD }, (_, i) => (
            <div class='dp-pad' key={`b${i}`} />
          ))}
        </>
      );
    };

    const getMaxDays = (year: number, month: number) => {
      if (format === 'D') return 31;
      if (format === 'MD') return new Date(2000, month, 0).getDate(); // Leap year forced max
      return new Date(year, month, 0).getDate();
    };

    let currentMaxDays = 0;
    let scrollTimeout: any;
    const handleDateScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Read current selected year and month based on scroll heights
        const curYear = format === 'MD' ? 2000 : START_YEAR + getIdx(yearRef);
        const curMonth = 1 + getIdx(monthRef);

        // Calculate the maximum allowed days for this selection
        const maxDays = getMaxDays(curYear, curMonth);

        // If the number of days changed, update the reactive var
        if (currentMaxDays !== maxDays) {
          currentMaxDays = maxDays;
          daysVar.value = generateDaysDOM(maxDays);

          // If the currently selected day is now out of bounds (e.g. Feb 30th), clamp it down.
          const currentDayIdx = getIdx(dayRef);
          if (currentDayIdx >= maxDays) {
            setTimeout(() => {
              if (dayRef.current) {
                const el = dayRef.current as HTMLElement;
                const items = el.querySelectorAll('.dp-item');
                const targetItem = items[maxDays - 1] as HTMLElement;
                if (targetItem) {
                  el.scrollTo({ top: targetItem.offsetTop - PAD * ITEM_H, behavior: 'smooth' });
                }
              }
            }, 50);
          }
        }
      }, 150);
    };

    const years = Array.from({ length: YEAR_COUNT }, (_, i) => String(START_YEAR + i));

    const initialYearIdx = Math.max(0, Math.min(YEAR_COUNT - 1, initialYear - START_YEAR));
    const initialMonthIdx = Math.max(0, Math.min(months.length - 1, initialMonth - 1));
    currentMaxDays = getMaxDays(START_YEAR + initialYearIdx, initialMonthIdx + 1);

    // Day array is reactive, max based on initial selection constraints
    const daysVar = new HtmlVar(generateDaysDOM(currentMaxDays));
    const initialDayIdx = Math.max(0, Math.min(currentMaxDays - 1, initialDay - 1));

    const yearCol = buildColumn(years, initialYearIdx, yearRef, handleDateScroll);
    const monthCol = buildColumn(months, initialMonthIdx, monthRef, handleDateScroll);
    const dayCol = buildDynamicColumn(daysVar, initialDayIdx, dayRef);

    let orderedCols: any[] = [];
    if (format === 'D') {
      orderedCols = [dayCol];
    } else if (format === 'MD') {
      orderedCols = order === 'DMY' ? [dayCol, monthCol] : [monthCol, dayCol];
    } else {
      orderedCols = order === 'DMY' ? [dayCol, monthCol, yearCol] : [yearCol, monthCol, dayCol];
    }

    const pickerBodyCss: CssProps = {
      borderTop: '1px solid var(--primary-border-color)',
      overflow: 'hidden', // prevent act-sheet-content from adding outer scrollbar
      '.picker-body': {
        display: 'flex',
        height: `${ITEM_H * VISIBLE}px`,
        position: 'relative',
        // Center-selection highlight band
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `${ITEM_H * PAD}px`,
          left: 0,
          right: 0,
          height: `${ITEM_H}px`,
          backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.05))',
          borderRadius: '6px',
          pointerEvents: 'none',
          opacity: 0.4,
        },
      },
      '.col': {
        flex: 1,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '.dp-pad': { height: `${ITEM_H}px` },
        '.dp-item': {
          scrollSnapAlign: 'center',
          height: `${ITEM_H}px`,
          lineHeight: `${ITEM_H}px`,
          textAlign: 'center',
          fontSize: '18px',
          cursor: 'pointer',
          color: 'var(--secondary-color, #aaa)',
        },
      },
    };

    const pickerBody = (
      <div css={pickerBodyCss}>
        <div class='picker-body'>{orderedCols}</div>
      </div>
    );

    handleClose = await ActionSheet.show({
      title,
      children: pickerBody,
      contentMaxHeight: '33vh',
      closeEvent,
      closeWhenClickOutside: true,
      zIndex,
      confirmButtonText,
      handleConfirmClicked: onConfirm,
      cancelButtonText,
      buttonsPosition: 'header',
    });
  });
};
