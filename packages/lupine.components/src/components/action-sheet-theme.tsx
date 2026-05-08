import { CssProps, getCurrentTheme } from 'lupine.web';
import { ActionSheet, ActionSheetCloseProps, ActionSheetCloseReasonProps } from './action-sheet';

export type ActionSheetThemePickerProps = {
  value?: string;
  title?: string;
  cancelButtonText?: string;
  zIndex?: string;
};

const getThemeVarNameFromValue = (value: string) => {
  const match = String(value || '').match(/var\((--[^),\s]+)/);
  return match ? match[1] : '';
};

const getThemeValue = (themes: any, themeName: string, key: string) => {
  const themeValue = themes?.[themeName]?.[key];
  if (themeValue !== undefined) return String(themeValue);

  const fallbackThemeName = Object.keys(themes || {})[0];
  const fallbackValue = themes?.[fallbackThemeName]?.[key];
  return fallbackValue !== undefined ? String(fallbackValue) : '';
};

const getThemeItems = () => {
  const { themeName, themes } = getCurrentTheme();
  const keys = new Set<string>();

  Object.values(themes || {}).forEach((theme: any) => {
    Object.keys(theme || {}).forEach((key) => {
      if (key.startsWith('--')) keys.add(key);
    });
  });

  return Array.from(keys)
    .sort()
    .map((key) => ({
      key,
      value: getThemeValue(themes, themeName, key),
    }));
};

export const ActionSheetThemePicker = async ({
  value = '',
  title = 'Select Theme Variable',
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetThemePickerProps): Promise<string | undefined> => {
  return new Promise(async (resolve) => {
    let handleClose: ActionSheetCloseProps;
    const selectedKey = getThemeVarNameFromValue(value);
    const items = getThemeItems();

    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'confirm') resolve(undefined);
    };

    const css: CssProps = {
      borderTop: '1px solid var(--primary-border-color)',
      overflow: 'hidden',
      '.theme-list': {
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '8px 0',
      },
      '.theme-empty': {
        padding: '24px 16px',
        textAlign: 'center',
        color: 'var(--secondary-color, #888)',
        fontSize: '13px',
      },
      '.theme-item': {
        display: 'grid',
        gridTemplateColumns: '28px minmax(0, 1fr) auto',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 14px',
        cursor: 'pointer',
        borderBottom: '1px solid var(--primary-border-color)',
        color: 'var(--primary-color)',
        '&:hover': {
          backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.06))',
        },
      },
      '.theme-item-selected': {
        backgroundColor: 'var(--activatable-bg-color-selected, rgba(24,144,255,0.12))',
      },
      '.theme-swatch': {
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        border: '1px solid var(--primary-border-color)',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
      },
      '.theme-key': {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontFamily: 'monospace',
        fontSize: '13px',
      },
      '.theme-value': {
        maxWidth: '160px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'var(--secondary-color, #888)',
        fontFamily: 'monospace',
        fontSize: '12px',
      },
    };

    const pickerBody = (
      <div css={css}>
        <div class='theme-list'>
          {items.length === 0 && <div class='theme-empty'>No theme variables found.</div>}
          {items.map((item) => {
            const result = `var(${item.key})`;
            return (
              <div
                class={`theme-item ${item.key === selectedKey ? 'theme-item-selected' : ''}`}
                title={`${item.key}: ${item.value}`}
                onClick={() => {
                  resolve(result);
                  handleClose('confirm');
                }}
              >
                <div class='theme-swatch' style={{ background: result }} />
                <div class='theme-key'>{item.key}</div>
                <div class='theme-value'>{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    );

    handleClose = await ActionSheet.show({
      title,
      children: pickerBody,
      contentMaxHeight: '70vh',
      closeEvent,
      closeWhenClickOutside: true,
      zIndex,
      cancelButtonText,
      buttonsPosition: 'header',
    });
  });
};
