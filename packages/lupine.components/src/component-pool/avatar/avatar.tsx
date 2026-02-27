import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';
import { HtmlVar } from 'lupine.components';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export type AvatarProps = {
  class?: string;
  style?: CssProps;
  src?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  online?: boolean; // Shortcut for status="online"
  [key: string]: any;
};

const avatarCss: CssProps = {
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'middle',

  // Inner wrapper for content clipping/border
  '.&-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--secondary-bg-color, #f0f0f0)',
    color: 'var(--secondary-color, #666)',
    overflow: 'hidden',
    border: '1px solid var(--secondary-border-color, #ddd)',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },

  '&.shape-circle .&-content': { borderRadius: '50%' },
  '&.shape-rounded .&-content': { borderRadius: 'var(--border-radius-m, 8px)' },
  '&.shape-square .&-content': { borderRadius: '0' },

  '&.size-xs': { width: '24px', height: '24px' },
  '&.size-sm': { width: '32px', height: '32px' },
  '&.size-md': { width: '40px', height: '40px' },
  '&.size-lg': { width: '48px', height: '48px' },
  '&.size-xl': { width: '64px', height: '64px' },

  '&.size-xs .&-content': { fontSize: '10px' },
  '&.size-xl .&-content': { fontSize: '20px' },

  '.&-img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '.&-status': {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '25%',
    height: '25%',
    minWidth: '8px',
    minHeight: '8px',
    borderRadius: '50%',
    border: '2px solid var(--primary-bg-color, #fff)',
    backgroundColor: '#999',
    zIndex: 1,
  },

  '.&-status.status-online': { backgroundColor: 'var(--success-color, #2ecc71)' },
  '.&-status.status-offline': { backgroundColor: 'var(--secondary-border-color, #999)' },
  '.&-status.status-busy': { backgroundColor: 'var(--error-color, #e74c3c)' },
  '.&-status.status-away': { backgroundColor: 'var(--warning-color, #f39c12)' },
};

const groupCss: CssProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '.&-item': {
    marginLeft: '-12px',
    border: '2px solid var(--primary-bg-color, #fff)',
    borderRadius: '50%',
    zIndex: 0,
  },
  '.&-item:first-child': {
    marginLeft: '0',
  },
  '.&-item:hover': {
    zIndex: 1,
  },
};

export const Avatar = (props: AvatarProps) => {
  const size = props.size || 'md';
  const shape = props.shape || 'circle';
  const status = props.online ? 'online' : props.status;

  const globalCssId = getGlobalStylesId(avatarCss);
  bindGlobalStyle(globalCssId, avatarCss);

  const renderInitials = () => <span>{props.initials || '?'}</span>;

  const renderContent = () => {
    if (props.src) {
      return (
        <img
          class='&-img'
          src={props.src}
          onError={() => {
            avatarContent.value = renderInitials();
          }}
        />
      );
    }
    return renderInitials();
  };

  // Use HtmlVar to hold the actual renderable content
  const avatarContent = new HtmlVar(renderContent());

  const ref: RefProps = {
    globalCssId,
  };

  return (
    <div class={[`size-${size}`, `shape-${shape}`, props.class].join(' ').trim()} ref={ref} css={props.style}>
      <div class='&-content'>{avatarContent.node}</div>
      {status && <div class={['&-status', `status-${status}`].join(' ')}></div>}
    </div>
  );
};

export type AvatarGroupProps = {
  class?: string;
  style?: CssProps;
  children?: any;
  maxCount?: number;
  size?: AvatarSize;
};

export const AvatarGroup = (props: AvatarGroupProps) => {
  const globalCssId = getGlobalStylesId(groupCss);
  bindGlobalStyle(globalCssId, groupCss);

  const ref: RefProps = {
    globalCssId,
  };

  const children = Array.isArray(props.children) ? props.children : [props.children];
  const max = props.maxCount || children.length;
  const visibleItems = children.slice(0, max);
  const remaining = children.length - max;

  const items = visibleItems.map((child: any) => {
    if (child && typeof child === 'object' && child.props) {
      if (props.size && !child.props.size) child.props.size = props.size;
      child.props.class = [child.props.class, '&-item'].join(' ').trim();
    }
    return child;
  });

  if (remaining > 0) {
    items.push(
      <Avatar
        class='&-item'
        size={props.size || (visibleItems[0]?.props?.size as AvatarSize) || 'md'}
        initials={`+${remaining}`}
      />
    );
  }

  return (
    <div ref={ref} class={['&-group', props.class].join(' ').trim()} css={props.style}>
      {items}
    </div>
  );
};
