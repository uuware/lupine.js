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
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2px',
    padding: '4px',
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
    touchAction: 'none',
    userSelect: 'none',
  };
  bindGlobalStyle('stars-box', css);

  const setValue = (value: number) => {
    props.value = value;
    const stars = ref.$all('.stars-label');
    stars.forEach((star: HTMLElement, index: number) => {
      star.classList.toggle('active', index < value);
    });
  };

  const calcValue = (clientX: number) => {
    const el = ref.current;
    if (!el) return props.value;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return props.value;
    const x = clientX - rect.left;
    let v = Math.ceil((x / rect.width) * props.maxLength);
    v = Math.max(1, Math.min(props.maxLength, v));
    return v;
  };

  let mv = false;
  const onPointerDown = (ev: PointerEvent) => {
    mv = true;
    (ref.current as HTMLElement).setPointerCapture(ev.pointerId);
    const v = calcValue(ev.clientX);
    setValue(v);
  };
  const onPointerMove = (ev: PointerEvent) => {
    if (!mv) return;
    const v = calcValue(ev.clientX);
    setValue(v);
  };
  const onPointerUp = (ev: PointerEvent) => {
    if (mv) {
      (ref.current as HTMLElement).releasePointerCapture(ev.pointerId);
      mv = false;
      props.onChange?.(props.value);
    }
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
    <div
      style={{ fontSize: props.fontSize || '20px' }}
      ref={ref}
      class='stars-box'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {Array.from({ length: props.maxLength }).map((_, index) => (
        <label key={index} class={'stars-label' + (index < props.value ? ' active' : '')}>
          {fullIcon}
          {outlineIcon}
        </label>
      ))}
    </div>
  );
};
