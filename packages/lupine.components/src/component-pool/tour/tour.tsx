import { CssProps, RefProps } from 'lupine.web';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
  steps: TourStep[];
  onFinish?: () => void;
  onClose?: () => void;
  zIndex?: number;
}

export const Tour = (props: TourProps) => {
  const zIndex = props.zIndex || 9999;
  const css: CssProps = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: `${zIndex}`,
    transition: 'opacity 0.3s',
    opacity: 0,

    '&.is-active': {
      opacity: 1,
      pointerEvents: 'auto',
    },

    // Overlay background using SVG mask or clip-path or huge box-shadow
    // We'll use absolute elements for precise highlighting
    '.&-overlay-bg': {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'auto', // intercept clicks
    },

    '.&-overlay-top': { top: 0, left: 0, right: 0 },
    '.&-overlay-bottom': { bottom: 0, left: 0, right: 0 },
    '.&-overlay-left': { left: 0 },
    '.&-overlay-right': { right: 0 },

    '.&-highlight': {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderRadius: '4px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'none',
    },

    '.&-popover': {
      position: 'absolute',
      backgroundColor: 'var(--primary-bg-color, white)',
      borderRadius: '8px',
      padding: '16px',
      width: '280px',
      boxShadow: 'var(--cover-box-shadow, 0 4px 12px rgba(0,0,0,0.15))',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      color: 'var(--primary-text-color, #333)',
      boxSizing: 'border-box',
    },

    '.&-title': {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: 'var(--primary-color)',
    },

    '.&-content': {
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '16px',
      color: 'var(--secondary-text-color)',
    },

    '.&-footer': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '.&-steps-count': {
      fontSize: '12px',
      color: 'var(--secondary-text-color)',
    },

    '.&-buttons': {
      display: 'flex',
      gap: '8px',
    },

    '.&-btn': {
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      border: 'none',
      backgroundColor: 'transparent',
    },

    '.&-btn-primary': {
      backgroundColor: 'var(--primary-color, #1890ff)',
      color: 'var(--primary-bg-color, white)',
    },

    '.&-btn-primary:active': {
      opacity: 0.8,
    },
  };

  const ref: RefProps = {};

  let currentStepIndex = 0;

  const updatePosition = () => {
    const root = ref.current as HTMLElement;
    if (!root) return;

    if (props.steps.length === 0 || currentStepIndex >= props.steps.length) {
      root.classList.remove('is-active');
      return;
    }

    const step = props.steps[currentStepIndex];
    let targetEl = document.querySelector(step.target) as HTMLElement;

    // Use body center if target not found
    if (!targetEl) {
      console.warn(`Tour target not found: ${step.target}`);
      targetEl = document.body;
    }

    const rect = targetEl.getBoundingClientRect();
    const hl = ref.$('&-highlight') as HTMLElement;
    const bgTop = ref.$('&-overlay-top') as HTMLElement;
    const bgBottom = ref.$('&-overlay-bottom') as HTMLElement;
    const bgLeft = ref.$('&-overlay-left') as HTMLElement;
    const bgRight = ref.$('&-overlay-right') as HTMLElement;

    const popover = ref.$('&-popover') as HTMLElement;
    const titleEl = ref.$('&-title') as HTMLElement;
    const contentEl = ref.$('&-content') as HTMLElement;
    const countEl = ref.$('&-steps-count') as HTMLElement;
    const nextBtn = ref.$('&-next-btn') as HTMLElement;

    titleEl.textContent = step.title;
    contentEl.textContent = step.content;
    countEl.textContent = `${currentStepIndex + 1} / ${props.steps.length}`;

    if (currentStepIndex === props.steps.length - 1) {
      nextBtn.textContent = 'Finish';
    } else {
      nextBtn.textContent = 'Next';
    }

    const padding = targetEl === document.body ? 0 : 4; // padding around highlighted element

    let ht = 0,
      hl_l = 0,
      hw = 0,
      hh = 0;

    if (targetEl === document.body) {
      // Target not found, pseudo highlight center
      hl.style.width = '0px';
      hl.style.height = '0px';
      hl.style.top = '50%';
      hl.style.left = '50%';
      ht = window.innerHeight / 2;
      hl_l = window.innerWidth / 2;
    } else {
      ht = rect.top - padding;
      hl_l = rect.left - padding;
      hw = rect.width + padding * 2;
      hh = rect.height + padding * 2;

      hl.style.width = `${hw}px`;
      hl.style.height = `${hh}px`;
      hl.style.top = `${ht}px`;
      hl.style.left = `${hl_l}px`;
    }

    // Set 4 dark overlays around the highlight
    bgTop.style.height = `${ht}px`;

    bgBottom.style.top = `${ht + hh}px`;
    bgBottom.style.bottom = '0px';

    bgLeft.style.top = `${ht}px`;
    bgLeft.style.height = `${hh}px`;
    bgLeft.style.width = `${hl_l}px`;

    bgRight.style.top = `${ht}px`;
    bgRight.style.height = `${hh}px`;
    bgRight.style.left = `${hl_l + hw}px`;
    bgRight.style.right = '0px';

    // Simpler more robust placement logic:
    const placement = step.placement || 'bottom';
    const spacing = 12;

    requestAnimationFrame(() => {
      const pRect = popover.getBoundingClientRect();
      let pTop = 0;
      let pLeft = 0;

      switch (placement) {
        case 'top':
          pTop = ht - spacing - pRect.height;
          pLeft = hl_l;
          break;
        case 'bottom':
          pTop = ht + hh + spacing;
          pLeft = hl_l;
          break;
        case 'left':
          pTop = ht;
          pLeft = hl_l - spacing - pRect.width;
          break;
        case 'right':
          pTop = ht;
          pLeft = hl_l + hw + spacing;
          break;
      }

      // basic viewport collision adjustment
      if (pLeft + pRect.width > window.innerWidth) {
        pLeft = window.innerWidth - pRect.width - spacing;
      }
      if (pLeft < 0) {
        pLeft = spacing;
      }
      if (pTop + pRect.height > window.innerHeight) {
        pTop = window.innerHeight - pRect.height - spacing;
      }
      if (pTop < 0) {
        pTop = spacing;
      }

      popover.style.top = `${pTop}px`;
      popover.style.left = `${pLeft}px`;

      // Ensure scrolling to view if needed
      if (targetEl !== document.body) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  // Mount logic
  setTimeout(() => {
    updatePosition();
    const root = ref.current as HTMLElement;
    if (root) {
      root.classList.add('is-active');
    }

    // Listen to resize
    window.addEventListener('resize', updatePosition);
  }, 50);

  const cleanup = () => {
    window.removeEventListener('resize', updatePosition);
  };

  const handleNext = () => {
    if (currentStepIndex < props.steps.length - 1) {
      currentStepIndex++;
      updatePosition();
    } else {
      ref.current.classList.remove('is-active');
      cleanup();
      setTimeout(() => {
        ref.current.remove();
        if (props.onFinish) props.onFinish();
      }, 300);
    }
  };

  const handleClose = () => {
    ref.current.classList.remove('is-active');
    cleanup();
    setTimeout(() => {
      ref.current.remove();
      if (props.onClose) props.onClose();
    }, 300);
  };

  return (
    <div class='tour' ref={ref} css={css}>
      {/* 4 dark backgrounds covering the screen outside the highlight area */}
      <div class='&-overlay-bg &-overlay-top'></div>
      <div class='&-overlay-bg &-overlay-bottom'></div>
      <div class='&-overlay-bg &-overlay-left'></div>
      <div class='&-overlay-bg &-overlay-right'></div>

      <div class='&-highlight'></div>

      <div class='&-popover'>
        <div class='&-title'></div>
        <div class='&-content'></div>
        <div class='&-footer'>
          <div class='&-steps-count'></div>
          <div class='&-buttons'>
            <button class='&-btn' onClick={handleClose}>
              Skip
            </button>
            <button class='&-btn &-btn-primary &-next-btn' onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  ) as HTMLElement;
};
