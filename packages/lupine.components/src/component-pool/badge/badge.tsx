import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';

export type BadgeProps = {
  class?: string;
  style?: CssProps;
  children?: any;

  content?: number | string | VNode<any>;
  max?: number;
  dot?: boolean;
  color?: string;
  bgColor?: string;
  onClick?: (e: MouseEvent) => void;
};

const badgeCss: CssProps = {
  display: 'inline-flex',
  position: 'relative',
  verticalAlign: 'middle',

  '.&-bubble': {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
    transformOrigin: '100% 0%',

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '0 6px',
    height: '20px',
    minWidth: '20px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '1',
    whiteSpace: 'nowrap',

    backgroundColor: 'var(--danger-color, #e74c3c)',
    color: '#ffffff',
    boxShadow: '0 0 0 1px var(--primary-bg-color, #ffffff)',

    zIndex: 10,
  },

  '.&-bubble.is-dot': {
    padding: 0,
    height: '8px',
    minWidth: '8px',
    width: '8px',
    borderRadius: '50%',
  },

  '.&-bubble.is-standalone': {
    position: 'relative',
    transform: 'none',
  },
};

export const Badge = (props: BadgeProps) => {
  const globalCssId = getGlobalStylesId(badgeCss);
  bindGlobalStyle(globalCssId, badgeCss);

  const ref: RefProps = {
    globalCssId,
  };

  let displayContent = props.content;

  // Handle max value for numbers
  if (typeof displayContent === 'number' && props.max && displayContent > props.max) {
    displayContent = `${props.max}+`;
  }

  // Determine bubbling style
  const bubbleStyle: any = {};
  if (props.bgColor) bubbleStyle.backgroundColor = props.bgColor;
  if (props.color) bubbleStyle.color = props.color;

  const hasChildren = props.children && (Array.isArray(props.children) ? props.children.length > 0 : true);

  const isSup = !props.dot && displayContent !== undefined && displayContent !== null && displayContent !== '';
  const showBubble = props.dot || isSup;

  return (
    <div class={['&-container', props.class].join(' ').trim()} ref={ref} css={props.style} onClick={props.onClick}>
      {/* The Anchor Element */}
      {props.children}

      {/* The floating Badge Bubble */}
      {showBubble && (
        <sup
          class={['&-bubble', props.dot ? 'is-dot' : '', !hasChildren ? 'is-standalone' : ''].join(' ').trim()}
          style={bubbleStyle}
        >
          {!props.dot && displayContent}
        </sup>
      )}
    </div>
  );
};
