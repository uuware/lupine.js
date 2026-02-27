import { CssProps, RefProps } from 'lupine.web';
import { ActionSheet, ActionSheetCloseProps, ActionSheetCloseReasonProps } from './action-sheet';

export type ActionSheetTimePickerProps = {
  /** Initial time value. Format: "HH:mm:ss" or "HH:mm" */
  value?: string;
  title?: string;
  /** Whether to show the Seconds column. Default false. */
  showSeconds?: boolean;
  /** OK button text */
  confirmButtonText?: string;
  /** Cancel button text */
  cancelButtonText?: string;
  zIndex?: string;
};

/**
 * Mobile-friendly time picker shown via an ActionSheet slide-up panel.
 * Returns a time string "HH:mm:ss" (or "HH:mm" if showSeconds is false),
 * or undefined if cancelled.
 */
export const ActionSheetTimePicker = async ({
  value = '',
  title = '',
  showSeconds = false,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetTimePickerProps): Promise<string | undefined> => {
  // Parse initial time
  const parts = value.split(':');
  const initialHour = parseInt(parts[0] || '0', 10) || 0;
  const initialMinute = parseInt(parts[1] || '0', 10) || 0;
  const initialSecond = parseInt(parts[2] || '0', 10) || 0;

  const ITEM_H = 44; // px per row

  return new Promise(async (resolve) => {
    let handleClose: ActionSheetCloseProps;

    // External refs for each column — values are read at confirm time
    const hourRef: RefProps = {};
    const minuteRef: RefProps = {};
    const secondRef: RefProps = {};

    const getIdx = (colRef: RefProps) => Math.round((colRef.current as HTMLElement).scrollTop / ITEM_H);

    const onConfirm = () => {
      const h = String(getIdx(hourRef)).padStart(2, '0');
      const m = String(getIdx(minuteRef)).padStart(2, '0');
      const s = showSeconds ? String(getIdx(secondRef)).padStart(2, '0') : '00';
      const result = showSeconds ? `${h}:${m}:${s}` : `${h}:${m}`;
      resolve(result);
      handleClose('confirm');
    };
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'confirm') resolve(undefined);
    };

    /** Build a single scrollable column — no scroll listener, no selected class */
    const buildColumn = (max: number, initial: number, colRef: RefProps) => {
      colRef.onLoad = async () => {
        const el = colRef.current as HTMLElement;
        const items = el.querySelectorAll('.tp-item');
        // Carousel-style: scroll to item's offsetTop (accounts for padding div above)
        if (items[initial]) {
          el.scrollTop = (items[initial] as HTMLElement).offsetTop - ITEM_H;
        }
      };

      return (
        <div class='col' ref={colRef}>
          <div class='tp-pad' />
          {Array.from({ length: max }, (_, i) => (
            <div class='tp-item'>{String(i).padStart(2, '0')}</div>
          ))}
          <div class='tp-pad' />
        </div>
      );
    };

    const pickerBodyCss: CssProps = {
      borderTop: '1px solid var(--primary-border-color)',
      overflow: 'hidden',
      '.picker-body': {
        display: 'flex',
        height: `${ITEM_H * 3}px`,
        minHeight: '100px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: `${ITEM_H}px`,
          left: 0,
          right: 0,
          height: `${ITEM_H}px`,
          backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.05))',
          borderRadius: '6px',
          pointerEvents: 'none',
          opacity: 0.4,
        },
      },
      '.colon': {
        alignSelf: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'var(--primary-color)',
        padding: '0 4px',
      },
      '.col': {
        flex: 1,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '.tp-pad': { height: `${ITEM_H}px` },
        '.tp-item': {
          scrollSnapAlign: 'center',
          height: `${ITEM_H}px`,
          lineHeight: `${ITEM_H}px`,
          textAlign: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          color: 'var(--secondary-color, #aaa)',
        },
      },
    };
    const pickerBody = (
      <div css={pickerBodyCss}>
        <div class='picker-body'>
          {buildColumn(24, initialHour, hourRef)}
          <div class='colon'>:</div>
          {buildColumn(60, initialMinute, minuteRef)}
          {showSeconds && (
            <>
              <div class='colon'>:</div>
              {buildColumn(60, initialSecond, secondRef)}
            </>
          )}
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
