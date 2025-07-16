import { CssProps, RefProps, VNode, mountComponents } from 'lupine.web';

export type ActionSheetCloseProps = () => void;

export type ActionSheetShowProps = {
  title: string;
  children: VNode<any>;
  contentMaxHeight?: string;
  closeEvent?: () => void;
  closeWhenClickOutside?: boolean; // default true
  cancelButtonText?: string; // no showing if not set
  zIndex?: string;
};

// because it's over a mask, so it can use primary colors
export class ActionSheet {
  static hostNode: HTMLElement;

  static async show({
    title,
    children,
    contentMaxHeight,
    closeEvent,
    closeWhenClickOutside = true,
    cancelButtonText = 'Cancel',
    zIndex,
  }: ActionSheetShowProps): Promise<ActionSheetCloseProps> {
    const onCancel = () => {
      handleClose();
    };
    const onClickContainer = (event: any) => {
      if (closeWhenClickOutside !== false && event.target.className === 'act-sheet-box') {
        handleClose();
      }
    };
    const handleClose = () => {
      closeEvent?.();
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
        maxHeight: contentMaxHeight ? contentMaxHeight : '',
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
          maxWidth: '450px',
          margin: '0 auto',
        },
        '.act-sheet-bottom-item, .act-sheet-item': {
          backgroundColor: 'var(--cover-bg-color)', //'#fefefe',
          padding: '20px 0',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: '100%',
          maxWidth: '450px',
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
      },
    };
    const component = (
      <div css={cssContainer} class='act-sheet-box' onClick={onClickContainer}>
        <div ref={ref} class='act-sheet-body'>
          <div class='act-sheet-content'>
            <div class='act-sheet-title'>{title}</div>
            {children}
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
    await mountComponents(base, component);
    return handleClose;
  }
}

export const ActionSheetSelectOptionsProps = {
  YesNo: ['Yes', 'No'],
  OkCancel: ['OK'],
};
export type ActionSheetSelectProps = Omit<ActionSheetShowProps, 'children'> & {
  options: string[];
  handleClicked: (index: number, close: ActionSheetCloseProps) => void;
};

export class ActionSheetSelect {
  static async show({
    title,
    contentMaxHeight,
    options = ActionSheetSelectOptionsProps.OkCancel,
    closeEvent,
    handleClicked,
    closeWhenClickOutside = true,
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
      cancelButtonText,
      closeEvent,
      closeWhenClickOutside,
    });
    return handleClose;
  }
}

export type ActionSheetMessageProps = Omit<ActionSheetShowProps, 'children' | 'handleClicked' | 'closeEvent'> & {
  message: string;
};
export class ActionSheetMessage {
  static async show({
    title,
    message,
    contentMaxHeight,
    closeWhenClickOutside = true,
    cancelButtonText = '',
  }: ActionSheetMessageProps): Promise<ActionSheetCloseProps> {
    const handleClose = await ActionSheet.show({
      title,
      children: <div css={{ padding: '0 8px 16px 8px' }}>{message}</div>,
      contentMaxHeight,
      cancelButtonText,
      closeWhenClickOutside,
    });
    return handleClose;
  }
}
