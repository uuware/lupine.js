import { CssProps, RefProps, VNode, mountInnerComponent } from 'lupine.web';
import { backActionHelper } from '../lib';

export type ActionSheetCloseProps = (reason?: ActionSheetCloseReasonProps) => void;

export type ActionSheetCloseReasonProps = 'cancel' | 'confirm' | 'select' | undefined;

export type ActionSheetShowProps = {
  title: string;
  children: string | VNode<any>;
  contentMaxWidth?: string;
  contentMaxHeight?: string;
  closeEvent?: (reason?: ActionSheetCloseReasonProps) => void;
  closeWhenClickOutside?: boolean; // default true
  confirmButtonText?: string; // no showing if not set
  handleConfirmClicked?: (close: ActionSheetCloseProps) => void;
  cancelButtonText?: string; // no showing if not set
  zIndex?: string;
};

// because it's over a mask, so it can use primary colors
export class ActionSheet {
  static hostNode: HTMLElement;

  static async show({
    title,
    children,
    contentMaxWidth,
    contentMaxHeight,
    closeEvent,
    closeWhenClickOutside = true,
    confirmButtonText = '',
    handleConfirmClicked,
    cancelButtonText = 'Cancel',
    zIndex,
  }: ActionSheetShowProps): Promise<ActionSheetCloseProps> {
    const onConfirm = () => {
      if (handleConfirmClicked) {
        handleConfirmClicked(handleClose);
      } else {
        handleClose('confirm');
      }
    };
    const onCancel = () => {
      handleClose('cancel');
    };
    const onClickContainer = (event: any) => {
      if (closeWhenClickOutside !== false && event.target.classList.contains('act-sheet-box')) {
        handleClose('cancel');
      }
    };
    const handleClose = (reason?: ActionSheetCloseReasonProps) => {
      closeEvent?.(reason);
      ref.current.classList.remove('animation-open');
      setTimeout(() => {
        base.remove();
      }, 300);
    };

    const base = document.createElement('div');
    const ref: RefProps = {
      onLoad: async () => {
        setTimeout(() => {
          ref.current.classList.add('animation-open');
        }, 1);
      },
    };
    const cssContainer: CssProps = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--cover-mask-bg-color)',
      '.act-sheet-body': {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100%',
        maxHeight: contentMaxHeight ? contentMaxHeight : '100%',
        color: 'var(--primary-color)',
        padding: '8px',
        transition: 'all 0.3s',
        transform: 'translateY(100%)',
        '&.animation-open': {
          transform: 'translateY(0)',
        },
        '.act-sheet-title': {
          padding: '20px 15px 10px 15px',
          opacity: 0.5,
        },
        '.act-sheet-content': {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'auto',
          borderRadius: '8px',
          backgroundColor: 'var(--cover-bg-color)', //'#fefefe',
          width: '100%',
          maxWidth: contentMaxWidth ? contentMaxWidth : `clamp(200px, 90%, 600px)`,
          margin: '0 auto',
        },
        '.act-sheet-bottom-item, .act-sheet-item': {
          backgroundColor: 'var(--cover-bg-color)', //'#fefefe',
          padding: '20px 0',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: '100%',
          maxWidth: contentMaxWidth ? contentMaxWidth : `clamp(200px, 90%, 600px)`,
          borderTop: '1px solid var(--primary-border-color)',
        },
        '.act-sheet-bottom-item': {
          borderRadius: '8px',
          margin: '0 auto',
          marginTop: '4px',
        },
        '.act-sheet-bottom-item:hover, .act-sheet-item:hover': {
          fontWeight: 'bold',
        },
        '.act-sheet-confirm, .act-sheet-item': {
          borderRadius: 'unset',
          marginTop: 'unset',
          maxWidth: 'unset',
        },
      },
    };
    const component = (
      <div
        css={cssContainer}
        class='act-sheet-box'
        onClick={onClickContainer}
        data-back-action={backActionHelper.genBackActionId()}
      >
        <div ref={ref} class='act-sheet-body'>
          <div class='act-sheet-content'>
            <div class='act-sheet-title'>{title}</div>
            {children}
            {confirmButtonText && (
              <div class='act-sheet-bottom-item act-sheet-confirm' onClick={onConfirm}>
                {confirmButtonText}
              </div>
            )}
          </div>
          {cancelButtonText && (
            <div class='act-sheet-bottom-item' onClick={onCancel}>
              {cancelButtonText}
            </div>
          )}
        </div>
      </div>
    );
    base.style.position = 'fixed';
    base.style.zIndex = zIndex || 'var(--layer-actionsheet-window)';
    document.body.appendChild(base);
    await mountInnerComponent(base, component);
    return handleClose;
  }
}

export const ActionSheetSelectOptionsProps = {
  YesNo: ['Yes', 'No'],
  Ok: ['OK'],
};
export type ActionSheetSelectProps = Omit<ActionSheetShowProps, 'children'> & {
  options: string[];
  handleClicked: (index: number, close: ActionSheetCloseProps) => void;
};

export class ActionSheetSelect {
  static async show({
    title,
    contentMaxHeight,
    options = ActionSheetSelectOptionsProps.Ok,
    closeEvent,
    handleClicked,
    closeWhenClickOutside = true,
    confirmButtonText,
    handleConfirmClicked,
    cancelButtonText = 'Cancel',
  }: ActionSheetSelectProps): Promise<ActionSheetCloseProps> {
    const handleClose = await ActionSheet.show({
      title,
      children: (
        <div>
          {options.map((option, index) => (
            <div class='act-sheet-item' key={index} onClick={() => handleClicked(index, handleClose)}>
              {option}
            </div>
          ))}
        </div>
      ),
      contentMaxHeight,
      confirmButtonText,
      handleConfirmClicked,
      cancelButtonText,
      closeEvent,
      closeWhenClickOutside,
    });
    return handleClose;
  }
}

export type ActionSheetMessageProps = Omit<ActionSheetShowProps, 'children' | 'handleClicked' | 'closeEvent'> & {
  message: string | VNode<any>;
};
export class ActionSheetMessage {
  static async show({
    title,
    message,
    contentMaxWidth,
    contentMaxHeight,
    closeWhenClickOutside = true,
    confirmButtonText,
    handleConfirmClicked,
    cancelButtonText = '',
  }: ActionSheetMessageProps): Promise<ActionSheetCloseProps> {
    const handleClose = await ActionSheet.show({
      title,
      children: (
        <div
          css={{ padding: '8px', borderTop: '1px solid var(--primary-border-color)' }}
          onClick={() => handleClose('select')}
        >
          {message}
        </div>
      ),
      contentMaxWidth,
      contentMaxHeight,
      confirmButtonText,
      handleConfirmClicked,
      cancelButtonText,
      closeWhenClickOutside,
    });
    return handleClose;
  }
}

export type ActionSheetMessagePromiseProps = {
  message: string | VNode<any>;
  title: string;
  contentMaxWidth?: string;
  contentMaxHeight?: string;
  closeWhenClickOutside?: boolean;
  confirmButtonText?: string;
  zIndex?: string;
};
export const ActionSheetMessagePromise = async ({
  title,
  message,
  contentMaxWidth,
  contentMaxHeight,
  closeWhenClickOutside = true,
  confirmButtonText,
  zIndex,
}: ActionSheetMessagePromiseProps): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      resolve();
    };
    await ActionSheet.show({
      title,
      children: <div css={{ padding: '8px', borderTop: '1px solid var(--primary-border-color)' }}>{message}</div>,
      contentMaxWidth,
      contentMaxHeight,
      confirmButtonText,
      closeEvent,
      closeWhenClickOutside,
      zIndex,
    });
  });
};

export type ActionSheetInputProps = Omit<
  ActionSheetShowProps,
  'children' | 'handleClicked' | 'closeEvent' | 'handleConfirmClicked'
> & {
  defaultValue?: string;
  handleConfirmValue: (value: string, close: ActionSheetCloseProps) => void;
};
export class ActionSheetInput {
  static async show({
    title,
    defaultValue,
    contentMaxHeight,
    closeWhenClickOutside = true,
    confirmButtonText = 'OK',
    handleConfirmValue: handleConfirmValue,
    cancelButtonText = 'Cancel',
  }: ActionSheetInputProps): Promise<ActionSheetCloseProps> {
    let value: string = defaultValue || '';
    const handleClose = await ActionSheet.show({
      title,
      children: (
        <div css={{ padding: '8px', borderTop: '1px solid var(--primary-border-color)' }}>
          <input
            class='input-base w-100p'
            type='text'
            value={value}
            onInput={(e) => (value = (e.target as HTMLInputElement).value)}
          />
        </div>
      ),
      contentMaxHeight,
      confirmButtonText,
      handleConfirmClicked: (close) => {
        handleConfirmValue(value, close);
      },
      cancelButtonText,
      closeWhenClickOutside,
    });
    return handleClose;
  }
}

export type ActionSheetInputPromiseProps = {
  defaultValue?: string;
  title: string;
  contentMaxWidth?: string;
  contentMaxHeight?: string;
  closeWhenClickOutside?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  zIndex?: string;
};
export const ActionSheetInputPromise = async ({
  title,
  defaultValue,
  contentMaxWidth,
  contentMaxHeight,
  closeWhenClickOutside = true,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetInputPromiseProps): Promise<string | undefined> => {
  return new Promise(async (resolve, reject) => {
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'confirm') {
        resolve(undefined);
      }
    };
    let value: string = defaultValue || '';
    await ActionSheet.show({
      title,
      children: (
        <div css={{ padding: '8px', borderTop: '1px solid var(--primary-border-color)' }}>
          <input
            class='input-base w-100p'
            type='text'
            value={value}
            onInput={(e) => (value = (e.target as HTMLInputElement).value)}
          />
        </div>
      ),
      contentMaxWidth,
      contentMaxHeight,
      confirmButtonText,
      handleConfirmClicked: (close) => {
        resolve(value);
        close('confirm');
      },
      closeEvent,
      cancelButtonText,
      closeWhenClickOutside,
      zIndex,
    });
  });
};

export type ActionSheetSelectPromiseProps = {
  title: string;
  contentMaxWidth?: string;
  contentMaxHeight?: string;
  options?: string[];
  closeWhenClickOutside?: boolean;
  cancelButtonText?: string;
  zIndex?: string;
};
export const ActionSheetSelectPromise = async ({
  title,
  contentMaxWidth,
  contentMaxHeight,
  options = ActionSheetSelectOptionsProps.Ok,
  closeWhenClickOutside = true,
  cancelButtonText = 'Cancel',
  zIndex,
}: ActionSheetSelectPromiseProps): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    const handleClicked = async (index: number, close: ActionSheetCloseProps) => {
      resolve(index);
      close('select');
    };
    const closeEvent = (reason?: ActionSheetCloseReasonProps) => {
      if (reason !== 'select') {
        resolve(-1);
      }
    };
    const handleClose = await ActionSheet.show({
      title,
      children: (
        <div>
          {options.map((option, index) => (
            <div class='act-sheet-item' key={index} onClick={() => handleClicked(index, handleClose)}>
              {option}
            </div>
          ))}
        </div>
      ),
      contentMaxWidth,
      contentMaxHeight,
      cancelButtonText,
      closeEvent,
      closeWhenClickOutside,
      zIndex,
    });
  });
};
