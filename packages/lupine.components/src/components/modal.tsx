import { FloatWindow, FloatWindowCloseProps, FloatWindowShowProps } from './float-window';

export class ModalWindow {
  static async show({
    title,
    children,
    contentMaxHeight,
    contentMinWidth,
    buttons,
    noMoving = true,
    noModal = false,
    closeEvent,
    handleClicked,
    closeWhenClickOutside = true,
    zIndex,
  }: FloatWindowShowProps): Promise<FloatWindowCloseProps> {
    return FloatWindow.show({
      title,
      children,
      contentMaxHeight,
      contentMinWidth,
      buttons,
      noMoving,
      noModal,
      closeEvent,
      handleClicked,
      closeWhenClickOutside,
      zIndex,
    });
  }
}
