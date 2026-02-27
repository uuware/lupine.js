import { CssProps, RefProps, VNode, bindGlobalStyle, getGlobalStylesId, mountInnerComponent } from 'lupine.web';
import { calcPreferredPosition } from '../picker-helper';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export type TooltipProps = {
  class?: string;
  style?: CssProps;
  content: string | VNode<any>;
  position?: TooltipPosition;
  showArrow?: boolean;
};

const tooltipCss: CssProps = {
  position: 'fixed',
  zIndex: 'var(--layer-tooltip, 2000)',
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  transform: 'scale(0.95)',

  '&.visible': {
    opacity: 1,
    transform: 'scale(1)',
  },

  '.&-box': {
    position: 'relative',
    backgroundColor: 'var(--tooltip-bg, rgba(0, 0, 0, 0.85))',
    color: 'var(--tooltip-color, #fff)',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '13px',
    lineHeight: '1.4',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },

  '.&-arrow': {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },

  // Positions
  '&.top .&-arrow': {
    bottom: '-6px',
    left: '50%',
    marginLeft: '-6px',
    borderWidth: '6px 6px 0 6px',
    borderColor: 'var(--tooltip-bg, rgba(0, 0, 0, 0.85)) transparent transparent transparent',
  },
  '&.bottom .&-arrow': {
    top: '-6px',
    left: '50%',
    marginLeft: '-6px',
    borderWidth: '0 6px 6px 6px',
    borderColor: 'transparent transparent var(--tooltip-bg, rgba(0, 0, 0, 0.85)) transparent',
  },
  '&.left .&-arrow': {
    right: '-6px',
    top: '50%',
    marginTop: '-6px',
    borderWidth: '6px 0 6px 6px',
    borderColor: 'transparent transparent transparent var(--tooltip-bg, rgba(0, 0, 0, 0.85))',
  },
  '&.right .&-arrow': {
    left: '-6px',
    top: '50%',
    marginTop: '-6px',
    borderWidth: '6px 6px 6px 0',
    borderColor: 'transparent var(--tooltip-bg, rgba(0, 0, 0, 0.85)) transparent transparent',
  },
};

const TOOLTIP_INITIALIZED = '__tooltip_init';

export class TooltipHelper {
  private static host: HTMLElement | null = null;
  private static ref: RefProps | null = null;
  private static closeTimer: any = null;

  private static initHost() {
    if (this.host) return;
    this.host = document.createElement('div');
    document.body.appendChild(this.host);
  }

  /**
   * Main entry point: Call this on onMouseEnter
   */
  static show(
    event: any,
    content: string | VNode<any>,
    options: { position?: TooltipPosition; showArrow?: boolean } = {}
  ) {
    const target = event.currentTarget || event.target;
    if (!target) return;

    // JIT: Attach mouseleave if not already done
    if (!(target as any)[TOOLTIP_INITIALIZED]) {
      (target as any)[TOOLTIP_INITIALIZED] = true;
      target.addEventListener('mouseleave', () => this.hide());
      // Also hide on click to be safe
      target.addEventListener('click', () => this.hide());
    }

    this.display(target, content, options);
  }

  /**
   * Internal display logic
   */
  private static async display(
    target: HTMLElement,
    content: string | VNode<any>,
    options: { position?: TooltipPosition; showArrow?: boolean } = {}
  ) {
    this.initHost();
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    const requestedPos = options.position ?? 'auto';
    const isAuto = requestedPos === 'auto';
    const showArrow = options.showArrow ?? true;
    // Mount with 'top' initially (invisible); we'll correct after measuring
    const initialPos: 'top' | 'bottom' | 'left' | 'right' = isAuto ? 'top' : requestedPos;

    const component = (
      <TooltipContent content={content} position={initialPos} showArrow={showArrow} onRef={(r) => (this.ref = r)} />
    );

    await mountInnerComponent(this.host!, component);

    // Calculate position
    const tooltipEl = this.ref?.current as HTMLElement;
    if (!tooltipEl) return;

    const rect = target.getBoundingClientRect();
    const offset = 8;
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    // Determine actual position (auto or explicit)
    const position: 'top' | 'bottom' | 'left' | 'right' = isAuto
      ? calcPreferredPosition(rect, tooltipWidth, tooltipHeight, offset)
      : requestedPos;

    if (position !== initialPos) {
      tooltipEl.classList.remove(initialPos);
      tooltipEl.classList.add(position);
    }

    let top = 0;
    let left = 0;

    if (position === 'top') {
      top = rect.top - tooltipHeight - offset;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    } else if (position === 'bottom') {
      top = rect.top + rect.height + offset;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    } else if (position === 'left') {
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.left - tooltipWidth - offset;
    } else if (position === 'right') {
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.left + rect.width + offset;
    }

    // Horizontal boundary clamp
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
    // Vertical boundary clamp
    if (top < 10) top = 10;
    if (top + tooltipHeight > window.innerHeight - 10) top = window.innerHeight - tooltipHeight - 10;

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;

    // Trigger animation
    requestAnimationFrame(() => {
      tooltipEl.classList.add('visible');
    });
  }

  static hide() {
    if (!this.ref?.current) return;
    const tooltipEl = this.ref.current as HTMLElement;
    tooltipEl.classList.remove('visible');

    this.closeTimer = setTimeout(() => {
      if (this.host) {
        this.host.innerHTML = '';
      }
    }, 200);
  }

  /**
   * Deprecated: Use show(event, ...) instead for better performance
   */
  static attach(
    el: HTMLElement,
    content: string | VNode<any>,
    options: { position?: TooltipPosition; showArrow?: boolean } = {}
  ) {
    el.addEventListener('mouseenter', (e) => this.show(e, content, options));
  }
}

// Internal component for Tooltip visual
const TooltipContent = (props: {
  content: string | VNode<any>;
  position: TooltipPosition;
  showArrow: boolean;
  onRef: (ref: RefProps) => void;
}) => {
  const globalCssId = getGlobalStylesId(tooltipCss);
  bindGlobalStyle(globalCssId, tooltipCss);

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      props.onRef(ref);
    },
  };

  return (
    <div class={['&-container', props.position].join(' ')} ref={ref}>
      <div class='&-box'>
        {props.content}
        {props.showArrow && <div class='&-arrow' />}
      </div>
    </div>
  );
};

export const Tooltip = TooltipHelper;
