import { CssProps, RefProps } from 'lupine.web';
import { ActionSheet, ActionSheetCloseProps, ActionSheetCloseReasonProps } from './action-sheet';

export type ActionSheetDatePickerOrder = 'YMD' | 'DMY';

export type ActionSheetDatePickerProps = {
  /** Initial date value. Format: "YYYY-MM-DD" */
  value?: string;
  title?: string;
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
  order = 'YMD',
  months = DEFAULT_MONTHS,
  yearRange = 100,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetDatePickerProps): Promise<string | undefined> => {
  // Parse initial date
  const today = new Date();
  const parts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/) ?? [];
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

    const getIdx = (colRef: RefProps) => Math.round((colRef.current as HTMLElement).scrollTop / ITEM_H);

    const onConfirm = () => {
      const year = START_YEAR + getIdx(yearRef);
      const month = 1 + getIdx(monthRef);
      const day = 1 + getIdx(dayRef);
      const result = [String(year).padStart(4, '0'), String(month).padStart(2, '0'), String(day).padStart(2, '0')].join(
        '-'
      );
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
    const buildColumn = (labels: string[], initialIdx: number, colRef: RefProps) => {
      colRef.onLoad = async () => {
        const el = colRef.current as HTMLElement;
        const items = el.querySelectorAll('.dp-item');
        if (items[initialIdx]) {
          // offsetTop accounts for the PAD padding divs above the items
          el.scrollTop = (items[initialIdx] as HTMLElement).offsetTop - PAD * ITEM_H;
        }
      };

      return (
        <div class='col' ref={colRef}>
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

    const years = Array.from({ length: YEAR_COUNT }, (_, i) => String(START_YEAR + i));
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

    const initialYearIdx = Math.max(0, Math.min(YEAR_COUNT - 1, initialYear - START_YEAR));
    const initialMonthIdx = Math.max(0, Math.min(months.length - 1, initialMonth - 1));
    const initialDayIdx = Math.max(0, Math.min(30, initialDay - 1));

    const yearCol = buildColumn(years, initialYearIdx, yearRef);
    const monthCol = buildColumn(months, initialMonthIdx, monthRef);
    const dayCol = buildColumn(days, initialDayIdx, dayRef);

    const orderedCols = order === 'DMY' ? [dayCol, monthCol, yearCol] : [yearCol, monthCol, dayCol];

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
        <div class='picker-body'>
          {orderedCols[0]}
          {orderedCols[1]}
          {orderedCols[2]}
        </div>
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
