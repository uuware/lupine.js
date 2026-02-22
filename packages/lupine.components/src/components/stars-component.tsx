import { bindGlobalStyle, CssProps, RefProps, VNode } from 'lupine.components';

/*
ma-cards-heart and ma-cards-heart-outline are font icons
*/
export type StarsHookComponentProps = {
  setValue: (value: number) => void;
  getValue: () => number;
};
export type StarsComponentProps = {
  maxLength: number;
  value: number;
  onChange?: (value: number) => void;
  hook?: StarsHookComponentProps;
  fontSize?: string;
  fullIcon?: VNode<any>; // should contain full classname
  outlineIcon?: VNode<any>; // should contain outline classname
};
export const StarsComponent = (props: StarsComponentProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    '.stars-label': {
      color: '#9d9d9d',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    '.stars-label.active': {
      color: 'blue',
    },
    '.stars-label .full, .stars-label.active .outline': {
      display: 'none',
    },
    '.stars-label.active .full, .stars-label .outline': {
      display: 'inline',
    },
  };
  bindGlobalStyle('stars-box', css);

  const setValue = (value: number) => {
    props.value = value;
    const stars = ref.$all('.stars-label') as NodeListOf<Element>;
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < value);
    });
  };
  if (props.hook) {
    props.hook.setValue = (value) => {
      setValue(value);
    };
    props.hook.getValue = () => props.value;
  }

  const fullIcon = props.fullIcon || <i class='ifc-icon ma-cards-heart full'></i>;
  const outlineIcon = props.outlineIcon || <i class='ifc-icon ma-cards-heart-outline outline'></i>;
  const ref: RefProps = {};
  return (
    <div style={{ fontSize: props.fontSize || '20px' }} ref={ref} class='stars-box'>
      {Array.from({ length: props.maxLength }).map((value, index) => (
        <label
          class={'stars-label' + (index < props.value ? ' active' : '')}
          onClick={() => {
            setValue(index + 1);
            props.onChange?.(index + 1);
          }}
        >
          {fullIcon}
          {outlineIcon}
        </label>
      ))}
    </div>
  );
};
