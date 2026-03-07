import { bindGlobalStyle, CssProps, RefProps, VNode } from 'lupine.web';

export const ToggleBaseSize = {
  Small: { w: 30, h: 30 },
  Medium: { w: 50, h: 50 },
  Large: { w: 70, h: 70 },
};
export type ToggleBaseSizeProps = {
  w: number | string;
  h: number | string;
};
export type ToggleBaseHookProps = {
  setChecked?: (checked: boolean) => void;
  getChecked?: () => boolean;
  setEnabled?: (enabled: boolean) => void;
  getEnabled?: () => boolean;
};
export type ToggleBaseProps = {
  size: ToggleBaseSizeProps;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
  noToggle?: boolean; // if true, it will be like a button
  children: VNode<any>;
  className?: string;
};
export const ToggleBase = (props: ToggleBaseProps) => {
  const applyToggle = (checked: boolean, disabled: boolean) => {
    const childDom = ref.$all('.toggle-base-container .toggle-placeholder');
    childDom.forEach((dom: HTMLElement) => {
      dom.classList.toggle('toggle-on', checked);
      dom.classList.toggle('toggle-off', !checked);
      dom.classList.toggle('disabled', disabled);
    });
  };
  let disabled = props.disabled || false;
  const ref: RefProps = {
    onLoad: async (el: Element) => {
      applyToggle(props.checked || false, disabled);
    },
  };
  const onClick = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    const checked = (e.target as HTMLInputElement).checked;
    !props.noToggle && applyToggle(checked, disabled);
    if (props.onClick) {
      props.onClick(checked);
    }
  };
  if (props.hook) {
    props.hook.setChecked = (checked: boolean) => {
      (ref.$('input.toggle-base-checkbox') as HTMLInputElement).checked = checked;
      applyToggle(checked, disabled);
    };
    props.hook.getChecked = () => {
      return (ref.$('input.toggle-base-checkbox') as HTMLInputElement).checked;
    };
    props.hook.setEnabled = (enabled: boolean) => {
      disabled = !enabled;
      const dom = ref.$('input.toggle-base-checkbox') as HTMLInputElement;
      dom.disabled = disabled;
      applyToggle(dom.checked, disabled);
    };
    props.hook.getEnabled = () => {
      return !disabled;
    };
  }

  const css: CssProps = {
    display: 'inline-block',
    '.toggle-base-box, .toggle-base-container': {
      position: 'relative',
      width: `100%`,
      height: `100%`,
    },
    '.toggle-base-checkbox': {
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute',
      pointerEvents: 'none',
    },
  };
  bindGlobalStyle('toggle-base-component', css);
  return (
    <div
      ref={ref}
      css={{
        width: `${typeof props.size.w === 'number' ? props.size.w + 'px' : props.size.w}`,
        height: `${typeof props.size.h === 'number' ? props.size.h + 'px' : props.size.h}`,
      }}
      class={['toggle-base-component', props.className].join(' ').trim()}
    >
      <label class='toggle-base-box'>
        <div class='toggle-base-container'>{props.children}</div>
        <input
          type='checkbox'
          class='toggle-base-checkbox'
          checked={props.checked || false}
          disabled={disabled}
          onClick={onClick}
        />
      </label>
    </div>
  );
};

export type ToggleWaveFrameProps = {
  children: VNode<any>;
};
export const ToggleWaveFrame = (props: ToggleWaveFrameProps) => {
  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    '@keyframes pulse-border': {
      '0%': {
        transform: 'scale(0.6)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0,
      },
    },
    '.toggle-waves': {
      position: 'absolute',
      width: `100%`,
      height: `100%`,
      top: '0',
      left: '0',
      borderRadius: '50%',
      backgroundColor: '#eb205580',
      opacity: 0,
      animation: 'pulse-border 3s ease-in-out infinite',
    },
    '.toggle-waves-1': {
      '-webkit-animation-delay': '0s',
      'animation-delay': '0s',
    },

    '.toggle-waves-2': {
      '-webkit-animation-delay': '1s',
      'animation-delay': '1s',
    },

    '.toggle-waves-3': {
      '-webkit-animation-delay': '2s',
      'animation-delay': '2s',
    },
    '.toggle-waves-box': {
      position: 'absolute',
      width: `100%`,
      height: `100%`,
      top: '0',
      left: '0',
      padding: `18%`,
    },
    '&.disabled .toggle-waves': {
      backgroundColor: '#5d578b',
    },
  };
  bindGlobalStyle('toggle-waves-box', css);
  return (
    <div class='toggle-waves-box toggle-placeholder'>
      <div class='toggle-waves toggle-waves-1'></div>
      <div class='toggle-waves toggle-waves-2'></div>
      <div class='toggle-waves toggle-waves-3'></div>
      <div class='toggle-waves-box'>{props.children}</div>
    </div>
  );
};

export const TogglePlayButtonSize = {
  SmallSmall: { w: 30, h: 30 },
  Small: { w: 50, h: 50 },
  Medium: { w: 70, h: 70 },
  Large: { w: 90, h: 90 },
  LargeLarge: { w: 120, h: 120 },
};
export type TogglePlayButtonSizeProps = {
  w: number;
  h: number;
};
export type TogglePlayButtonProps = {
  size: TogglePlayButtonSizeProps;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
  textColor?: string;
  backgroundColor?: string;
  noWave?: boolean;
  className?: string;
};
export const TogglePlayButton = (props: TogglePlayButtonProps) => {
  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    borderRadius: '50%',
    backgroundColor: '#3b29cc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
    '.play-icon': {
      width: '50%',
      height: '50%',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: '#fff',
    },
    '&.toggle-off .play-icon': {
      clipPath: 'polygon(20% 0, 20% 100%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%, 90% 50%)',
      translate: '6% 0',
    },
    '&.toggle-on .play-icon': {
      clipPath: 'polygon(0 0, 0 100%, 33.33% 100%, 33.33% 0, 66.66% 0, 100% 0, 100% 100%, 66.66% 100%, 66.66% 0)',
      translate: '0 0',
    },
    '&.disabled': {
      cursor: 'not-allowed',
      backgroundColor: '#5d578b',
    },
  };
  bindGlobalStyle('toggle-play-button-component', css);

  const Btn = () => (
    <div
      class={`toggle-play-button-component toggle-placeholder ${props.checked ? 'toggle-on' : 'toggle-off'}${
        props.disabled ? ' disabled' : ''
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div class='play-icon' style={{ backgroundColor: props.textColor }}></div>
    </div>
  );
  return props.noWave ? (
    <ToggleBase {...props}>
      <Btn />
    </ToggleBase>
  ) : (
    <ToggleBase {...props}>
      <ToggleWaveFrame>
        <Btn />
      </ToggleWaveFrame>
    </ToggleBase>
  );
};

export type ToggleButtonProps = {
  text: string | VNode<any>;
  size?: 'button-ss' | 'button-s' | '' | 'button-l' | 'button-ll';
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
  className?: string;
};
export const ToggleButton = (props: ToggleButtonProps) => {
  const css: CssProps = {
    display: 'flex',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    '&.disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    '.button-base': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.15s ease-out',
      backgroundColor: 'var(--primary-bg-color, #f0f0f0)',
      border: '1px solid var(--primary-border-color, #e0e0e0)',
      boxShadow: '4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)',
    },
    '&.toggle-on .button-base, &:active:not(.disabled) .button-base': {
      boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.8)',
    },
    // The Indicator Circle
    '.icon': {
      flexShrink: 0,
      width: '0.8em',
      height: '0.8em',
      borderRadius: '50%',
      // Default Sunken un-lit hole
      backgroundColor: 'rgba(0,0,0,0.1)',
      border: '1px solid rgba(0,0,0,0.1)',
      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.6)',
      transition: 'all 0.25s ease',
    },
    // The Lit State
    '&.toggle-on .icon': {
      backgroundColor: 'var(--primary-accent-color, #1a588a)',
      boxShadow: '0 0 8px var(--primary-accent-color, #1a588a), inset 1px 1px 2px rgba(255,255,255,0.5)',
      borderColor: 'rgba(255,255,255,0.2)',
    },
    '.text': {
      userSelect: 'none',
    },
  };
  bindGlobalStyle('toggle-button-component', css);

  return (
    <ToggleBase {...props} size={{ w: 'fit-content', h: 'fit-content' }}>
      <div
        class={`toggle-button-component toggle-placeholder ${props.checked ? 'toggle-on' : 'toggle-off'}${
          props.disabled ? ' disabled' : ''
        }`}
      >
        <div class={['icon-text', 'button-base', props.size || ''].join(' ').trim()}>
          <div class='icon'></div>
          <div class='text'>{props.text}</div>
        </div>
      </div>
    </ToggleBase>
  );
};

export const ToggleIconSize = {
  SmallSmall: { w: 22, h: 22 },
  Small: { w: 26, h: 26 },
  Medium: { w: 32, h: 32 },
  Large: { w: 40, h: 40 },
  LargeLarge: { w: 48, h: 48 },
  Auto: { w: 'fit-content', h: 'fit-content' },
};
export const ToggleTextSize = {
  SmallSmall: { w: 'fit-content', h: ToggleIconSize.SmallSmall.h, padding: '2px 6px' },
  Small: { w: 'fit-content', h: ToggleIconSize.Small.h, padding: '4px 8px' },
  Medium: { w: 'fit-content', h: ToggleIconSize.Medium.h, padding: '6px 10px' },
  Large: { w: 'fit-content', h: ToggleIconSize.Large.h, padding: '8px 12px' },
  LargeLarge: { w: 'fit-content', h: ToggleIconSize.LargeLarge.h, padding: '10px 16px' },
  Auto: { w: 'fit-content', h: 'fit-content', padding: '4px 8px' },
};
export type ToggleIconSizeProps = ToggleBaseSizeProps & {
  padding?: string;
};
export type ToggleIconProps = {
  size: ToggleIconSizeProps;
  borderRadius?: string;
  icon: string | VNode<any>;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
  noToggle?: boolean; // if true, it will be like a button
  className?: string;
};
export const ToggleIcon = (props: ToggleIconProps) => {
  const css: CssProps = {
    display: 'flex',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    position: 'relative',
    // borderRadius: '50%',
    backgroundColor: 'var(--secondary-bg-color, rgba(0, 0, 0, 0.75))',
    boxShadow: '-0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25), 0.0375em 0.0375em 0.0675em 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.15s ease-out',
    fontSize: '1rem',
    height: '100%',
    width: '100%',
    '&.disabled': {
      cursor: 'not-allowed',
      opacity: 'var(--primary-disabled-opacity, 0.5)',
      filter: 'grayscale(1)',
    },
    '.button-outer': {
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      transition: 'box-shadow 300ms ease',
      willChange: 'box-shadow',
      boxShadow:
        '0 0 0.05em -0.01em rgba(5, 5, 5, 0.8), 0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5), 0.15em 0.3em 0.1em -0.01em rgba(0, 0, 0, 0.25)',
    },
    '.button-inner': {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'inherit',
      background: 'var(--primary-bg-color, linear-gradient(135deg, #ffffff, #eeeeee))',
      transition: 'box-shadow 300ms ease, background-image 250ms ease, transform 250ms ease',
      willChange: 'box-shadow, background-image, transform',
      overflow: 'clip',
      boxShadow:
        '0 0 0 0 inset rgba(0, 0, 0, 0.1), -0.05em -0.05em 0.05em 0 inset rgba(0, 0, 0, 0.25), 0 0 0 0 inset rgba(0, 0, 0, 0.1), 0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25), 0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.25em 0.25em 0.1em inset rgba(0, 0, 0, 0.25)',
    },
    '.icon': {
      transition: 'all 0.25s ease',
      willChange: 'transform',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.icon > *': {
      // to work with icon font and Mask SVG Icon
      width: '1em !important',
      height: '1em !important',
      fontSize: 'inherit',
    },
    '&.toggle-on .button-outer, &:active:not(.disabled) .button-outer': {
      boxShadow: '0 0 0 0 rgba(5, 5, 5, 1), 0 0 0 0 rgba(5, 5, 5, 0.5), 0 0 0 0 rgba(0, 0, 0, 0.25)',
    },
    '&.toggle-on .button-inner, &:active:not(.disabled) .button-inner': {
      boxShadow:
        '1px 1px 0.05em 0 inset rgba(0, 0, 0, 0.75), -0.025em -0.03em 0.05em 0.025em inset rgba(0, 0, 0, 0.5), 0.25em 0.25em 0.2em 0 inset rgba(0, 0, 0, 0.5), 0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15), 0 0 0 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.12em 0.2em 0.1em inset rgba(0, 0, 0, 0.25)',
    },
    '&.toggle-on .icon, &:active:not(.disabled) .icon': {
      transform: 'scale(0.95)',
    },
    '&:hover:not(.disabled) .button-inner': {
      transform: 'scale(0.95)',
    },
  };
  bindGlobalStyle('toggle-icon-component', css);
  const iconStyle = {
    fontSize: typeof props.size.h === 'number' ? `${Number((props.size.h * 0.75).toFixed(2))}px` : '1rem',
    padding: props.size.padding || '4px 12px',
  };

  return (
    <ToggleBase {...props} size={props.size}>
      <div
        style={{ borderRadius: props.borderRadius || '50%' }}
        class={`toggle-icon-component toggle-placeholder ${props.checked ? 'toggle-on' : 'toggle-off'}${
          props.disabled ? ' disabled' : ''
        }`}
      >
        <div class='button-outer'>
          <div class='button-inner'>
            <div class='icon' style={iconStyle}>
              {props.icon}
            </div>
          </div>
        </div>
      </div>
    </ToggleBase>
  );
};
