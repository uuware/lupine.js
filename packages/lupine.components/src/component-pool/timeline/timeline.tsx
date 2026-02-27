import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';
import { SvgSvg, SvgPath, SvgCircle, CheckIcon, IncompleteIcon } from '../svg-props';

export type TimelineItem = {
  percent: number; // 0 - 100
  topLabel?: string | VNode<any>;
  bottomInfo?: string | VNode<any>;
  completed?: boolean;
  icon?: number | string | VNode<any>; // Support custom content inside the node
};

export type TimelineProps = {
  class?: string;
  style?: CssProps;
  items: TimelineItem[];
  lineColor?: string;
  lineThickness?: string;
  topLabelColor?: string;
  stepMode?: boolean; // If true, rendering numbers instead of checks
};

const timelineCss: CssProps = {
  position: 'relative',
  width: '100%',
  minHeight: '80px',
  display: 'flex',
  alignItems: 'center',

  '.&-line': {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: 'var(--timeline-line-thickness, 4px)',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },

  '.&-node': {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '.&-icon-wrapper': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    fontSize: '14px', // added for step mode text
    fontWeight: 'bold', // added for step mode text
    color: 'var(--primary-bg-color, #fff)',
    zIndex: 2, // Ensure the circle stays above the continuous line
  },

  '.&-icon-wrapper.step-completed': {
    backgroundColor: 'var(--primary-accent-color, #0a74c9)',
  },

  '.&-icon-wrapper.step-incomplete': {
    backgroundColor: 'var(--secondary-color, #818181)',
  },

  '.&-top-label, .&-bottom-info': {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100px', // Prevents extreme overlaps
    fontSize: '12px',
    padding: '0 4px',
  },

  '.&-top-label': {
    bottom: '24px',
    fontWeight: 'bold',
  },

  '.&-bottom-info': {
    top: '24px',
    color: 'var(--secondary-color, #666)',
  },
};

export const Timeline = (props: TimelineProps) => {
  const globalCssId = getGlobalStylesId(timelineCss);
  bindGlobalStyle(globalCssId, timelineCss);

  const ref: RefProps = {
    globalCssId,
  };

  const lineColor = props.lineColor || 'var(--secondary-border-color, #ccc)';
  const topLabelColor = props.topLabelColor || 'var(--primary-text-color, #000)';

  const containerStyle: CssProps = {
    ...props.style,
    '--timeline-line-thickness': props.lineThickness || '4px',
  };

  return (
    <div class={['&-container', props.class].join(' ').trim()} ref={ref} css={containerStyle}>
      <div class='&-line' style={{ backgroundColor: lineColor }}></div>

      {(props.items || []).map((item, index) => {
        // Determine what to display inside the node
        let nodeContent: VNode<any> | string | number | null = null;
        let wrapperClass = '&-icon-wrapper';
        wrapperClass += item.completed ? ' step-completed' : ' step-incomplete';

        if (props.stepMode) {
          // In Step mode, show the explicit icon, or default to index + 1
          nodeContent = item.icon !== undefined ? item.icon : index + 1;
        } else {
          // Standard timeline mode
          if (item.icon !== undefined) {
            nodeContent = item.icon;
          } else {
            nodeContent = item.completed ? <CheckIcon strokeWidth='4' /> : <IncompleteIcon strokeWidth='4' />;
          }
        }

        return (
          <div class='&-node' style={{ left: `${item.percent}%` }}>
            {item.topLabel && (
              <div
                class='&-top-label'
                style={{ color: topLabelColor }}
                title={typeof item.topLabel === 'string' ? item.topLabel : ''}
              >
                {item.topLabel}
              </div>
            )}

            <div class={wrapperClass}>{nodeContent}</div>

            {item.bottomInfo && (
              <div class='&-bottom-info' title={typeof item.bottomInfo === 'string' ? item.bottomInfo : ''}>
                {item.bottomInfo}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
