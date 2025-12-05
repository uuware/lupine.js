import { bindGlobalStyle, CssProps } from 'lupine.components';

export const RadioLabelComponent = (props: {
  label: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  radioClassname?: string;
}) => {
  const css: CssProps = {
    display: 'flex',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
    },
  };
  bindGlobalStyle('radio-label-component', css);

  return (
    <div class={'radio-label-component' + (props.className ? ' ' + props.className : '')}>
      <label>
        <input
          type='radio'
          name={props.name}
          class={'input-base input-s' + (props.radioClassname ? ' ' + props.radioClassname : '')}
          checked={props.checked}
          disabled={props.disabled}
          onChange={(event) => props.onChange?.((event.target as HTMLInputElement).checked)}
        />
        <span class='ml-ss'>{props.label}</span>
      </label>
    </div>
  );
};
