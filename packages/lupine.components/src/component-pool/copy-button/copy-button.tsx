import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';
import { SvgSvg, SvgPath, SvgRect, SvgPolyline, CopyIcon, CheckIcon } from '../svg-props';

export type CopyButtonProps = {
  class?: string;
  style?: CssProps;
  text: () => string; // Function that returns the string to be copied to the clipboard
  children?: any; // Default UI content (text or icon)
  copiedContent?: any; // UI content shown immediately after copying
  timeoutMs?: number; // How long to display the copied state before reverting (default: 2000)
  variant?: 'outline' | 'ghost' | 'solid'; // Style variants
  [key: string]: any;
};

const css: CssProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '6px 12px',
  borderRadius: 'var(--border-radius-m, 6px)',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  color: 'inherit',

  // Default styles based on variant
  '&.variant-solid': {
    backgroundColor: 'var(--primary-color, #3b82f6)',
    color: '#fff',
    '&:hover': {
      filter: 'brightness(1.1)',
    },
    '&:active': {
      transform: 'scale(0.97)',
    },
  },
  '&.variant-outline': {
    border: '1px solid var(--secondary-border-color, #e5e7eb)',
    backgroundColor: 'var(--primary-bg-color, #fff)',
    color: 'var(--primary-text-color, #111827)',
    '&:hover': {
      backgroundColor: 'var(--secondary-bg-color, #f3f4f6)',
    },
    '&:active': {
      transform: 'scale(0.97)',
    },
  },
  '&.variant-ghost': {
    padding: '6px',
    color: 'var(--secondary-color, #6b7280)',
    '&:hover': {
      backgroundColor: 'var(--secondary-bg-color, #f3f4f6)',
      color: 'var(--primary-text-color, #111827)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },

  // Internal content wrappers
  '.&-content': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'opacity 0.2s ease',
  },

  // State toggling
  '& .&-copied-content': {
    display: 'none',
  },

  '&.is-copied': {
    color: 'var(--success-color, #10b981)',
    borderColor: 'var(--success-color, #10b981)',
  },
  '&.is-copied.variant-solid': {
    backgroundColor: 'var(--success-color, #10b981)',
    borderColor: 'transparent',
    color: '#fff',
  },
  '&.is-copied .&-default-content': {
    display: 'none',
  },
  '&.is-copied .&-copied-content': {
    display: 'inline-flex',
  },
};

export const CopyButton = (props: CopyButtonProps) => {
  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const onClick = async () => {
    if (!props.text) return;

    try {
      const textToCopy = props.text();
      await navigator.clipboard.writeText(textToCopy);

      ref.current.classList.add('is-copied');

      setTimeout(() => {
        ref.current.classList.remove('is-copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const ref: RefProps = {
    globalCssId,
  };

  const variantClass = `variant-${props.variant || 'outline'}`;

  const DefaultContent = props.children || (
    <>
      <CopyIcon /> Copy
    </>
  );
  const CopiedContent = props.copiedContent || (
    <>
      <CheckIcon /> Copied!
    </>
  );

  return (
    <button
      class={['&-container', variantClass, props.class].join(' ').trim()}
      ref={ref}
      css={props.style}
      type='button'
      onClick={onClick}
      aria-label='Copy to clipboard'
    >
      <span class='&-content &-default-content'>{DefaultContent}</span>
      <span class='&-content &-copied-content'>{CopiedContent}</span>
    </button>
  );
};
