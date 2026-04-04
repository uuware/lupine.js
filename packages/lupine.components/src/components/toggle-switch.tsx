import { bindGlobalStyle, CssProps, VNode } from 'lupine.web';
import { ToggleBase, ToggleBaseHookProps, ToggleWaveFrame } from './toggle-base';

export const ToggleSwitchIconSize = {
  SmallSmall: { w: 30, h: 30 },
  Small: { w: 50, h: 50 },
  Medium: { w: 70, h: 70 },
  Large: { w: 90, h: 90 },
  LargeLarge: { w: 120, h: 120 },
};
export type ToggleSwitchIconSizeProps = {
  w: number;
  h: number;
};
export type ToggleSwitchIconProps = {
  size: ToggleSwitchIconSizeProps;
  text: { on: string | VNode<any>; off: string | VNode<any> };
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
  textColor?: string;
  backgroundColor?: string;
  noWave?: boolean;
};
export const ToggleSwitchIcon = (props: ToggleSwitchIconProps) => {
  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '&:hover:not(.disabled)': {
      opacity: 0.8,
    },
    '.ts-icon': {
      width: '100%',
      height: '100%',
      transition: 'all 0.2s ease-in-out',
    },
    '.ts-icon > *': {
      width: '1em !important',
      height: '1em !important',
      fontSize: 'inherit',
    },
    '&.toggle-off .ts-on-icon, &.toggle-on .ts-off-icon': {
      display: 'none',
    },
    '&.toggle-on .ts-on-icon, &.toggle-off .ts-off-icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '&.disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
      filter: 'grayscale(1)',
    },
  };
  bindGlobalStyle('toggle-switch-icon-component', css);

  const Btn = () => (
    <div
      class={`toggle-switch-icon-component toggle-placeholder ${props.checked ? 'toggle-on' : 'toggle-off'}${
        props.disabled ? ' disabled' : ''
      }`}
      style={{
        backgroundColor: props.backgroundColor || 'var(--primary-bg-color)',
        color: props.textColor || 'var(--primary-color)',
        fontSize: typeof props.size.h === 'number' ? `${Number((props.size.h * 0.35).toFixed(2))}px` : '1rem',
      }}
    >
      <div class='ts-icon ts-on-icon'>{props.text.on}</div>
      <div class='ts-icon ts-off-icon'>{props.text.off}</div>
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

export enum ToggleSwitchSize {
  SmallSmall = 'smallsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  LargeLarge = 'largelarge',
}
export type ToggleSwitchProps = {
  size: ToggleSwitchSize;
  text?: { on: string | VNode<any>; off: string | VNode<any> };
  textWidth?: string;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (checked: boolean) => void;
  hook?: ToggleBaseHookProps;
};
export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const sizeH =
    props.size === ToggleSwitchSize.SmallSmall
      ? 16
      : props.size === ToggleSwitchSize.Small
      ? 22
      : props.size === ToggleSwitchSize.Large
      ? 42
      : props.size === ToggleSwitchSize.LargeLarge
      ? 52
      : 34;
  const classSize =
    props.size === ToggleSwitchSize.SmallSmall
      ? 'smallsmall'
      : props.size === ToggleSwitchSize.Small
      ? 'small'
      : props.size === ToggleSwitchSize.Large
      ? 'large'
      : props.size === ToggleSwitchSize.LargeLarge
      ? 'largelarge'
      : '';

  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .ts-slider': {
      position: 'relative',
      cursor: 'pointer',
      backgroundColor: 'var(--toggle-background-color, #e6e6e6)',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.15), inset 0 -2px 5px rgba(255,255,255,0.8)',
      transition: 'background-color .4s, padding .4s, box-shadow .4s',
      borderRadius: '999px',
      height: '100%',
      display: 'flex',
      padding: '0 27px 0 37px',
      alignItems: 'center',
      color: 'var(--secondary-color, #8b8b8b)',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      letterSpacing: '0.5px',
      textShadow: '0 1px 1px var(--primary-color, rgba(255,255,255,0.9))',
      userSelect: 'none',
    },
    '&.smallsmall .ts-slider': {
      padding: '0 8px 0 22px',
      fontSize: '0.65rem',
    },
    '&.small .ts-slider': {
      padding: '0 17px 0 27px',
      fontSize: '0.85rem',
    },
    '&.large .ts-slider': {
      padding: '0 37px 0 57px',
    },
    '&.largelarge .ts-slider': {
      padding: '0 57px 0 77px',
    },

    '& .ts-slider .ts-circle': {
      position: 'absolute',
      height: '26px',
      width: '26px',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '4px',
      backgroundColor: 'var(--primary-bg-color, #f9f9f9)',
      backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
      boxShadow:
        '0 2px 5px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.1), inset 0 -2px 2px rgba(0,0,0,0.05), inset 0 2px 2px rgba(255,255,255,0.9)',
      transition: 'left .4s, right .4s',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .ts-slider .ts-circle::after': {
      content: '""',
      position: 'relative',
      width: '50%',
      height: '50%',
      borderRadius: '50%',
      background: 'var(--primary-bg-color, #e0e0e0)',
      backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(255,255,255,0.4) 100%)',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.8)',
    },
    '&.smallsmall .ts-slider .ts-circle': {
      height: '12px',
      width: '12px',
      left: '2px',
    },
    '&.small .ts-slider .ts-circle': {
      height: '18px',
      width: '18px',
      left: '2px',
    },
    '&.large .ts-slider .ts-circle': {
      height: '34px',
      width: '34px',
      left: '4px',
    },
    '&.largelarge .ts-slider .ts-circle': {
      height: '44px',
      width: '44px',
      left: '4px',
    },

    '&.toggle-on .ts-on-text, &.toggle-off .ts-off-text': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '&.toggle-on .ts-slider': {
      backgroundColor: 'var(--primary-accent-color, #389cf0)',
      boxShadow:
        'inset 0 3px 6px rgba(0,0,0,0.3), inset 0 1px 3px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,255,255,0.4)',
      color: '#fff',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
      padding: '0 37px 0 27px',
    },
    '&.toggle-on .toggle-switch-component': {
      backgroundColor: 'var(--primary-accent-color, #3b29cc)',
      boxShadow:
        '1px 1px 0.05em 0 inset rgba(0, 0, 0, 0.75), -0.025em -0.03em 0.05em 0.025em inset rgba(0, 0, 0, 0.5), 0.25em 0.25em 0.2em 0 inset rgba(0, 0, 0, 0.5), 0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15), 0 0 0 0 inset rgba(255, 255, 255, 1), 0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25), -0.075em -0.12em 0.2em 0.1em inset rgba(0, 0, 0, 0.25)',
    },
    '&.smallsmall.toggle-on .ts-slider': {
      padding: '0 22px 0 8px',
    },
    '&.small.toggle-on .ts-slider': {
      padding: '0 27px 0 17px',
    },
    '&.large.toggle-on .ts-slider': {
      padding: '0 57px 0 37px',
    },
    '&.largelarge.toggle-on .ts-slider': {
      padding: '0 77px 0 57px',
    },

    '&.toggle-on .ts-slider .ts-circle': {
      left: 'calc(100% - 30px)',
    },
    '&.smallsmall.toggle-on .ts-slider .ts-circle': {
      left: 'calc(100% - 14px)',
    },
    '&.small.toggle-on .ts-slider .ts-circle': {
      left: 'calc(100% - 20px)',
    },
    '&.large.toggle-on .ts-slider .ts-circle': {
      left: 'calc(100% - 38px)',
    },
    '&.largelarge.toggle-on .ts-slider .ts-circle': {
      left: 'calc(100% - 48px)',
    },

    '&.disabled .ts-slider': {
      cursor: 'not-allowed',
      opacity: 'var(--primary-disabled-opacity, 0.5)',
      filter: 'grayscale(1)',
    },
  };

  // cssTheme is no longer needed as standard framework variables are now used.
  // bindGlobalStyle('toggle-switch-theme', cssTheme, false, true);
  bindGlobalStyle('toggle-switch-component', css);

  const cssTheme: CssProps = {
    '[data-theme="light" i]': {
      '--toggle-background-color': '#e6e6e6',
    },
    '[data-theme="dark" i]': {
      '--toggle-background-color': '#232323',
    },
  };
  bindGlobalStyle('toggle-switch-theme', cssTheme, false, true);

  const cssSize: CssProps = {
    '& .ts-on-text, & .ts-off-text': {
      display: 'none',
      width: props.textWidth,
    },
  };
  return (
    <ToggleBase {...props} size={{ w: 'auto', h: sizeH }}>
      <div
        css={cssSize}
        class={`toggle-switch-component toggle-placeholder ${props.checked ? 'toggle-on' : 'toggle-off'}${
          props.disabled ? ' disabled' : ''
        } ${classSize}`}
      >
        <span class='ts-slider'>
          <span class='ts-on-text'>{props.text?.on}</span>
          <span class='ts-circle'></span>
          <span class='ts-off-text'>{props.text?.off}</span>
        </span>
      </div>
    </ToggleBase>
  );
};
