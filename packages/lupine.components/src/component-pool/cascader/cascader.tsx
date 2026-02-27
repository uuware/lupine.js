import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';

export type CascaderType = 'title' | 'ellipsis';

export type CascaderProps = {
  class?: string;
  style?: CssProps;
  type?: CascaderType;
  title?: string | VNode<any>;
  description?: string | VNode<any>;
  group?: string;
  defaultOpen?: boolean;
  showCircle?: boolean; // New prop for circular button styling
  children?: any;
};

const cascaderCss: CssProps = {
  width: '100%',
  borderBottom: '1px solid var(--secondary-border-color, #eee)',
  backgroundColor: 'var(--primary-bg-color, #fff)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',

  '.&-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: 'var(--secondary-bg-color, #f9f9f9)',
    },
  },

  '.&-title': {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--primary-color)',
  },

  '.&-desc-wrapper': {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px 16px',
    gap: '8px',
  },

  '.&-description': {
    flex: 1,
    fontSize: '14px',
    color: 'var(--secondary-color, #666)',
    lineHeight: '1.6',
  },

  '&:not(.open) .&-description': {
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },

  '.&-content': {
    padding: '0 16px 16px 16px',
    fontSize: '14px',
    color: 'var(--primary-color)',
    display: 'none',
  },

  '&.open .&-content': {
    display: 'block',
  },

  '.&-extra-content': {
    display: 'none',
    marginTop: '8px',
  },

  '&.open .&-extra-content': {
    display: 'block',
  },

  '.&-btn, .&-arrow': {
    marginLeft: 'auto',
    cursor: 'pointer',
    color: 'var(--secondary-color, #999)',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    userSelect: 'none',

    // Circular styling (conditional via class)
    '&.circle': {
      borderRadius: '50%',
      border: '1px solid var(--secondary-border-color, #eee)',
      backgroundColor: 'var(--secondary-bg-color, #f9f9f9)',
    },

    '&:hover': {
      color: 'var(--primary-color)',
      '&.circle': {
        backgroundColor: 'var(--secondary-border-color)',
      },
    },
  },

  '.&-btn span, .&-arrow span': {
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginTop: '-2px',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
    lineHeight: '1',
    transform: 'rotate(0deg)',
  },

  // Merged rotation logic: Right (0deg) -> Down (90deg)
  '&.open .&-arrow span, &.open .&-btn span': {
    transform: 'rotate(90deg)',
  },
};

export const Cascader = (props: CascaderProps) => {
  const type = props.type || 'title';
  const initialState = props.defaultOpen || false;
  const showCircle = props.showCircle || false;

  const globalCssId = getGlobalStylesId(cascaderCss);
  bindGlobalStyle(globalCssId, cascaderCss);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;

    const nextState = !el.classList.contains('open');

    if (nextState && props.group) {
      const others = document.querySelectorAll(`[data-cascader-group="${props.group}"]`);
      others.forEach((other: any) => {
        if (other !== el && other._lj) {
          updateUI(other._lj.ref, false);
        }
      });
    }

    updateUI(ref, nextState);
  };

  const updateUI = (targetRef: RefProps, open: boolean) => {
    const el = targetRef.current;
    if (!el || open === el.classList.contains('open')) return;
    el.classList.toggle('open', open);
  };

  const ref: RefProps = {
    globalCssId,
  };

  const toggleClass = showCircle ? 'circle' : '';
  if (type === 'title') {
    return (
      <div
        class={['&-container', props.class, initialState ? 'open' : ''].join(' ').trim()}
        ref={ref}
        css={props.style}
        data-cascader-group={props.group}
      >
        <div class='&-header' onClick={toggle}>
          <div class='&-title'>{props.title}</div>
          <div class={['&-arrow', toggleClass].join(' ').trim()}>
            <span>&gt;</span>
          </div>
        </div>
        <div class='&-content'>
          {props.description && (
            <div style={{ marginBottom: '12px', color: 'var(--secondary-color)' }}>{props.description}</div>
          )}
          {props.children}
        </div>
      </div>
    );
  }

  return (
    <div
      class={['&-container', props.class, initialState ? 'open' : ''].join(' ').trim()}
      ref={ref}
      css={props.style}
      data-cascader-group={props.group}
    >
      <div class='&-desc-wrapper'>
        <div class='&-description'>
          {props.description}
          <div class='&-extra-content'>{props.children}</div>
        </div>
        <div class={['&-btn', toggleClass].join(' ').trim()} onClick={toggle}>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};
