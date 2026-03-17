import { CssProps, RefProps, VNode, mountInnerComponent, uniqueIdGenerator } from 'lupine.web';

export type PickerPosition = 'top' | 'bottom';

/**
 * Calculates the best popup/tooltip direction based on available viewport space.
 * Preference order: top → bottom → right → left.
 * If none has enough space, returns the direction with the most available space.
 */
export function calcPreferredPosition(
  rect: DOMRect,
  popupWidth: number,
  popupHeight: number,
  offset = 8
): 'top' | 'bottom' | 'left' | 'right' {
  const spaceTop = rect.top - offset;
  const spaceBottom = window.innerHeight - rect.bottom - offset;
  const spaceLeft = rect.left - offset;
  const spaceRight = window.innerWidth - rect.right - offset;

  if (spaceTop >= popupHeight) return 'top';
  if (spaceBottom >= popupHeight) return 'bottom';
  if (spaceRight >= popupWidth) return 'right';
  if (spaceLeft >= popupWidth) return 'left';

  // Fallback: direction with most space
  const dirs: Array<['top' | 'bottom' | 'left' | 'right', number]> = [
    ['top', spaceTop],
    ['bottom', spaceBottom],
    ['right', spaceRight],
    ['left', spaceLeft],
  ];
  return dirs.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

const pickerContainerCss: CssProps = {
  position: 'fixed',
  zIndex: 'var(--layer-picker, 3000)',
  backgroundColor: 'var(--primary-bg-color, #fff)',
  boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.15))',
  borderRadius: 'var(--border-radius-m, 8px)',
  border: '1px solid var(--secondary-border-color, #eee)',
  opacity: 0,
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  transform: 'translateY(10px)',
  overflow: 'hidden',
  visibility: 'hidden',
  pointerEvents: 'none',
  outline: 'none',

  '&.open': {
    visibility: 'visible',
    pointerEvents: 'auto',
    opacity: 1,
    transform: 'translateY(0)',
  },

  '&.top': {
    transform: 'translateY(-10px)',
  },
  '&.top.open': {
    transform: 'translateY(0)',
  },
};

export class PickerHelper {
  private static host: HTMLElement | null = null;
  private static currentRef: RefProps | null = null;
  private static closeCallback: (() => void) | null = null;
  private static getUuid = uniqueIdGenerator('picker');
  private static currentInstanceId = '';
  private static closeTimer: any = null;
  private static currentTarget: HTMLElement | null = null;

  private static initHost() {
    if (this.host) return;
    this.host = document.createElement('div');
    this.host.className = 'lupine-picker-host';
    document.body.appendChild(this.host);
  }

  private static documentPointerDownHandler = (e: Event) => {
    if (!this.currentRef?.current) return;
    const pickerEl = this.currentRef.current as HTMLElement;
    const target = e.target as HTMLElement;

    // Do not close if clicking inside the picker itself
    if (pickerEl.contains(target)) return;
    
    // Do not close if clicking the original trigger element
    if (this.currentTarget && this.currentTarget.contains(target)) return;

    this.hide();
  };

  static async show(
    target: HTMLElement,
    content: VNode<any>,
    options: { onRef?: (ref: RefProps) => void; onHide?: () => void } = {}
  ) {
    this.initHost();

    const instanceId = this.getUuid();
    this.currentInstanceId = instanceId;
    this.currentTarget = target;
    this.closeCallback = options.onHide || null;

    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // Remove old listener if any
    document.removeEventListener('pointerdown', this.documentPointerDownHandler);
    
    // Defer adding listener so it doesn't trigger from the very click that invoked show()
    setTimeout(() => {
      document.addEventListener('pointerdown', this.documentPointerDownHandler);
    }, 10);

    const ref: RefProps = {
      onLoad: async () => {
        // If another instance was requested while we were rendering, abort taking over ref
        if (this.currentInstanceId !== instanceId) return;

        this.currentRef = ref;
        options.onRef?.(ref);
        this.updatePosition(target);

        // wait for the host to be showing
        setTimeout(() => {
          if (ref.current) {
            (ref.current as HTMLElement).focus();
          }
        }, 10);
      },
    };

    const component = (
      <div ref={ref} css={pickerContainerCss} tabIndex={-1}>
        {content}
      </div>
    );

    await mountInnerComponent(this.host!, component);
  }

  private static updatePosition(target: HTMLElement) {
    const pickerEl = this.currentRef?.current as HTMLElement;
    if (!pickerEl) return;

    const rect = target.getBoundingClientRect();
    const pickerWidth = pickerEl.offsetWidth;
    const pickerHeight = pickerEl.offsetHeight;

    let left = rect.left;
    let isTop = false;

    // Check if bottom space is enough
    if (rect.bottom + 5 + pickerHeight > window.innerHeight - 10) {
      isTop = true;
    }

    // Double check if top space is at least more than bottom space if we decided to go top
    if (isTop) {
      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;
      if (spaceBottom > spaceTop) {
        // If bottom still has more space, revert to bottom despite clipping
        isTop = false;
      }
    }

    // Check if right space is enough
    if (left + pickerWidth > window.innerWidth - 10) {
      left = window.innerWidth - pickerWidth - 10;
    }
    if (left < 10) left = 10;

    pickerEl.style.left = `${left}px`;

    if (isTop) {
      pickerEl.style.bottom = `${window.innerHeight - rect.top + 5}px`;
      pickerEl.style.top = 'auto'; // ensure top is reset if it was previously set
      pickerEl.classList.add('top');
    } else {
      pickerEl.style.top = `${rect.bottom + 5}px`;
      pickerEl.style.bottom = 'auto'; // ensure bottom is reset
      pickerEl.classList.remove('top');
    }

    requestAnimationFrame(() => {
      pickerEl.classList.add('open');
    });
  }

  static hide() {
    document.removeEventListener('pointerdown', this.documentPointerDownHandler);
    
    if (!this.currentRef?.current) return;
    const pickerEl = this.currentRef.current as HTMLElement;
    pickerEl.classList.remove('open');

    const reqInstanceId = this.currentInstanceId;

    this.closeTimer = setTimeout(() => {
      // Re-verify instance in case another picker opened during the 200ms fade-out
      if (reqInstanceId !== this.currentInstanceId) return;

      if (this.host) {
        this.host.innerHTML = '';
      }
      if (this.closeCallback) {
        this.closeCallback();
        this.closeCallback = null;
      }
      this.currentRef = null;
      this.currentTarget = null;
    }, 200);
  }
}

