import { CssProps, RefProps } from 'lupine.web';
import { ActionSheet, ActionSheetCloseProps, ActionSheetCloseReasonProps } from './action-sheet';
import { MediaQueryRange } from '../styles/media-query';

export type ActionSheetColorPickerProps = {
  /** Initial color value. Format: "#rrggbb". Default: "#4080ff" */
  value?: string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  /** Show the 16 preset color swatches. Default: true */
  showPresets?: boolean;
  zIndex?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  if (/^[0-9a-f]{6}$/i.test(h)) {
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  return [64, 128, 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}

const PRESET_COLORS = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#808080',
  '#c0c0c0',
  '#800000',
  '#808000',
  '#008000',
  '#800080',
  '#008080',
  '#000080',
];

/**
 * Mobile-friendly color picker via ActionSheet with RGB sliders.
 * Returns "#rrggbb" or undefined if cancelled.
 */
export const ActionSheetColorPicker = async ({
  value = '#4080ff',
  title = '',
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  showPresets = true,
  zIndex,
}: ActionSheetColorPickerProps): Promise<string | undefined> => {
  let [r, g, b] = hexToRgb(value);

  return new Promise(async (resolve) => {
    let handleClose: ActionSheetCloseProps;

    const onConfirm = () => {
      resolve(rgbToHex(r, g, b));
      handleClose('confirm');
    };
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'confirm') resolve(undefined);
    };

    const swatchRef: RefProps = {};
    const hexRef: RefProps = {};

    const updatePreview = () => {
      const hex = rgbToHex(r, g, b);
      if (swatchRef.current) (swatchRef.current as HTMLElement).style.backgroundColor = hex;
      if (hexRef.current) (hexRef.current as HTMLElement).textContent = hex;
    };

    // All CSS defined on root element per framework pattern
    const css: CssProps = {
      borderTop: '1px solid var(--primary-border-color)',
      overflow: 'hidden',
      padding: '16px 20px',

      '.slider-row': {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '14px',
        '.ch': {
          width: '14px',
          fontWeight: 'bold',
          fontSize: '13px',
          flexShrink: 0,
          textAlign: 'center',
        },
        '.val': {
          width: '28px',
          textAlign: 'right',
          fontSize: '12px',
          color: 'var(--secondary-color, #aaa)',
          flexShrink: 0,
          fontFamily: 'monospace',
        },
        // Range input track + thumb styling
        'input[type="range"]': {
          flex: 1,
          WebkitAppearance: 'none' as any,
          appearance: 'none' as any,
          height: '6px',
          borderRadius: '3px',
          outline: 'none',
          border: 'none',
          cursor: 'pointer',
          background: 'var(--primary-border-color)',
          '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none' as any,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'var(--cover-bg-color, #fff)',
            border: '2px solid var(--primary-border-color)',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          },
          '&::-moz-range-thumb': {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'var(--cover-bg-color, #fff)',
            border: '2px solid var(--primary-border-color)',
            cursor: 'pointer',
          },
        },
      },

      '.preview-row': {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginTop: '4px',
        paddingTop: '14px',
        borderTop: '1px solid var(--primary-border-color)',
        '.swatch': {
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '2px solid var(--primary-border-color)',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        },
        '.hex-text': {
          fontSize: '22px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          color: 'var(--activatable-color-normal, #333)',
        },
      },
      '.presets': {
        display: 'grid',
        gap: '8px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--primary-border-color)',
        gridTemplateColumns: 'repeat(16, 1fr)',
        [MediaQueryRange.ExtraSmallBelow]: {
          gridTemplateColumns: 'repeat(8, 1fr)',
        },
        '.preset-dot': {
          aspectRatio: '1',
          borderRadius: '50%',
          border: '2px solid var(--primary-border-color)',
          cursor: 'pointer',
          transition: 'transform 0.15s',
          '&:hover': { transform: 'scale(1.2)' },
        },
      },
    };

    /** Build one RGB slider row with live fill track */
    const buildSlider = (label: string, initial: number, trackColor: string, onChange: (v: number) => void) => {
      const valRef: RefProps = {};
      const inputRef: RefProps = {
        onLoad: async () => {
          const el = inputRef.current as HTMLInputElement;
          el.value = String(initial);
          const pct = (initial / 255) * 100;
          el.style.background = `linear-gradient(to right, ${trackColor} ${pct}%, var(--primary-border-color) ${pct}%)`;
        },
      };

      return (
        <div class='slider-row'>
          <span class='ch' style={{ color: trackColor }}>
            {label}
          </span>
          <input
            ref={inputRef}
            type='range'
            min='0'
            max='255'
            onInput={(e: any) => {
              const v = parseInt(e.target.value, 10);
              onChange(v);
              const pct = (v / 255) * 100;
              e.target.style.background = `linear-gradient(to right, ${trackColor} ${pct}%, var(--primary-border-color) ${pct}%)`;
              if (valRef.current) (valRef.current as HTMLElement).textContent = String(v);
              updatePreview();
            }}
          />
          <span class='val' ref={valRef}>
            {initial}
          </span>
        </div>
      );
    };

    const initialHex = rgbToHex(r, g, b);
    const pickerBody = (
      <div css={css}>
        {buildSlider('R', r, '#ff4444', (v) => {
          r = v;
        })}
        {buildSlider('G', g, '#22cc55', (v) => {
          g = v;
        })}
        {buildSlider('B', b, '#4488ff', (v) => {
          b = v;
        })}
        <div class='preview-row'>
          <div class='swatch' ref={swatchRef} style={{ backgroundColor: initialHex }} />
          <span class='hex-text' ref={hexRef}>
            {initialHex}
          </span>
        </div>
        {showPresets && (
          <div class='presets'>
            {PRESET_COLORS.map((hex) => (
              <div
                class='preset-dot'
                style={{ backgroundColor: hex }}
                title={hex}
                onClick={() => {
                  resolve(hex);
                  handleClose('confirm');
                }}
              />
            ))}
          </div>
        )}
      </div>
    );

    handleClose = await ActionSheet.show({
      title,
      children: pickerBody,
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
