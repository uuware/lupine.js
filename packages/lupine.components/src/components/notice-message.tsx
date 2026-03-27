import { CssProps, bindGlobalStyle } from 'lupine.web';
/**
How to use:
  Notification.sendMessage(message);
*/
export enum NotificationColor {
  Success = 'var(--success-bg-color)',
  Info = 'var(--info-bg-color)',
  Warning = 'var(--warning-bg-color)',
  Error = 'var(--error-bg-color)',
}
export const notificationColorFromValue = (value: string) => {
  switch (value) {
    case 'Success':
      return NotificationColor.Success;
    case 'Info':
      return NotificationColor.Info;
    case 'Warning':
      return NotificationColor.Warning;
    case 'Error':
      return NotificationColor.Error;
  }
  return NotificationColor.Info;
};
export type NotificationLocation =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface NotificationOptions {
  message: string;
  backgroundColor?: NotificationColor | string;
  permanent?: boolean;
  showTime?: number;
  location?: NotificationLocation;
}

export class NotificationMessage {
  // public static readonly Color = NotificationColor;

  private static initialized = false;
  private static containers: Record<string, HTMLElement> = {};

  static init() {
    /* styles for resizable splitter */
    const css: CssProps = {
      position: 'fixed',
      height: 'auto',
      overflowY: 'auto',
      maxHeight: '100%',
      width: '100%',
      maxWidth: '400px',
      padding: '0 10px',
      zIndex: 'var(--layer-notice)',
      pointerEvents: 'none',
      '>div': {
        pointerEvents: 'auto',
        color: 'var(--notice-color-with-bg)',
        padding: '10px 8px',
        margin: '16px 0',
        borderRadius: '6px',
        boxShadow: 'var(--cover-box-shadow)', //'3px 3px 8px #767676',
        transition: 'all 0.5s',
        transform: 'scale(0.1)',
        opacity: 0,
      },
      /* Location Modifiers */
      '&.top-left': { top: 0, left: 0 },
      '&.top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
      '&.top-right': { top: 0, right: 0 },
      '&.bottom-left': { bottom: 0, left: 0 },
      '&.bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
      '&.bottom-right': { bottom: 0, right: 0 },
      '&.top-center > div, &.bottom-center > div': { justifySelf: 'center' },
      '.close-btn': {
        position: 'absolute',
        top: '-2px',
        right: '3px',
        color: 'var(--notice-color-with-bg)',
        fontWeight: 'bold',
        fontSize: '22px',
        lineHeight: '20px',
        cursor: 'pointer',
        transition: '0.3s',
      },

      '.close-btn:hover': {
        color: 'black',
      },
    };
    bindGlobalStyle('lj_notification', css);
  }

  private static getContainer(location: NotificationLocation): HTMLElement {
    if (!this.containers[location]) {
      const container = document.createElement('div');
      container.className = `lj_notification ${location}`;
      document.body.appendChild(container);
      this.containers[location] = container;
    }
    return this.containers[location];
  }

  static show(options: NotificationOptions) {
    this.sendMessage(
      options.message,
      options.backgroundColor || NotificationColor.Info,
      options.permanent || false,
      options.showTime || 3000,
      options.location || 'top-right'
    );
  }

  static sendMessage(
    message: string,
    backgroundColor: NotificationColor | string = NotificationColor.Info,
    permanent = false,
    showTime = 3000,
    location: NotificationLocation = 'top-right'
  ) {
    if (!this.initialized) {
      this.initialized = true;
      this.init();
    }

    const targetContainer = this.getContainer(location);
    targetContainer.scrollTop = 0;

    const div = document.createElement('div');
    div.innerHTML = message;
    div.style.backgroundColor = backgroundColor;

    // For top, new elements prepend (pushing others down). For bottom, append.
    if (location.startsWith('top')) {
      targetContainer.insertBefore(div, targetContainer.firstChild);
    } else {
      targetContainer.appendChild(div);
    }
    setTimeout(() => {
      div.style.opacity = '1';
      div.style.transform = 'scale(1)';
    }, 0);

    if (permanent) {
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.className = 'close-btn';
      div.appendChild(closeBtn);
      closeBtn.onclick = () => {
        targetContainer.removeChild(div);
      };
    } else {
      setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'scale(0.1)';
        setTimeout(() => {
          if (targetContainer.contains(div)) {
            targetContainer.removeChild(div);
          }
        }, 1000);
      }, showTime);
    }
  }
}
