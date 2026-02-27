import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';

export type CardProps = {
  class?: string;
  style?: CssProps;
  title?: any;
  description?: any;
  cover?: any;
  avatar?: any;
  extra?: any;
  footer?: any;
  horizontal?: boolean;
  hoverable?: boolean;
  children?: any;
};

const cardCss: CssProps = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--primary-bg-color, #fff)',
  border: '1px solid var(--secondary-border-color, #eee)',
  borderRadius: 'var(--border-radius-m, 8px)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  color: 'var(--primary-color)',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',

  '&.hoverable:hover': {
    boxShadow: 'var(--card-box-shadow, 0 4px 12px rgba(0,0,0,0.1))',
    transform: 'translateY(-4px)',
    borderColor: 'var(--primary-border-color, #ddd)',
  },

  // Layouts
  '&.horizontal': {
    flexDirection: 'row',
  },

  // Body content area
  '.&-body': {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-m, 16px)',
    flex: 1,
    gap: '4px',
  },

  '.&-cover': {
    width: '100%',
    position: 'relative',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
  },

  '&.horizontal .&-cover': {
    width: '120px',
    height: 'auto',
    flexShrink: 0,
  },

  '.&-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    width: '100%',
  },

  '.&-title': {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: 'var(--primary-color)',
  },

  '.&-description': {
    fontSize: '14px',
    color: 'var(--secondary-color, #666)',
    margin: 0,
    lineHeight: '1.5',
  },

  '.&-avatar': {
    flexShrink: 0,
  },

  '.&-footer': {
    padding: 'var(--space-m, 16px)',
    borderTop: '1px solid var(--secondary-border-color, #eee)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  '.&-extra': {
    marginLeft: 'auto',
  },

  // Mobile responsiveness
  [MediaQueryRange.MobileBelow]: {
    '&.horizontal': {
      flexDirection: 'column',
      '.&-cover': {
        width: '100%',
        height: '180px',
      },
    },
  },
};

export const Card = (props: CardProps) => {
  const globalCssId = getGlobalStylesId(cardCss);
  bindGlobalStyle(globalCssId, cardCss);

  const ref: RefProps = {
    globalCssId,
  };

  const isHorizontal = props.horizontal ? 'horizontal' : '';
  const isHoverable = props.hoverable ? 'hoverable' : '';

  return (
    <div class={['&-container', isHorizontal, isHoverable, props.class].join(' ').trim()} ref={ref} css={props.style}>
      {props.cover && <div class='&-cover'>{props.cover}</div>}

      <div class='&-body'>
        {(props.avatar || props.title || props.extra) && (
          <div class='&-header'>
            {props.avatar && <div class='&-avatar'>{props.avatar}</div>}
            <div style={{ flex: 1 }}>{props.title && <div class='&-title'>{props.title}</div>}</div>
            {props.extra && <div class='&-extra'>{props.extra}</div>}
          </div>
        )}

        {props.description && <div class='&-description'>{props.description}</div>}

        {props.children}
      </div>

      {props.footer && <div class='&-footer'>{props.footer}</div>}
    </div>
  );
};
