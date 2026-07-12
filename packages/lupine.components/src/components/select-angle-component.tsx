import { CssProps, RefProps } from 'lupine.web';

export type SelectAngleComponentHookProps = {
  setAngle?: (angle: number) => void;
};
export type SelectAngleComponentProps = {
  size?: string;
  angle: number;
  onChange: (angle: number) => void;
  hook?: SelectAngleComponentHookProps;
};
export const SelectAngleComponent = (props: SelectAngleComponentProps) => {
  const css: CssProps = {
    width: props.size || '80px',
    height: props.size || '80px',
    '&circle': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '2px solid #aaa',
      position: 'relative',
      backgroundColor: 'var(--primary-bg-color)',
      cursor: 'pointer',
    },
    '&needle': {
      width: '2px',
      height: '50%',
      backgroundColor: 'red',
      position: 'absolute',
      top: '0',
      left: '50%',
      transformOrigin: 'bottom center',
      transform: 'rotate(90deg)',
    },
    '&tips': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '12px',
      color: 'var(--primary-color)',
      fontWeight: '600',
      zIndex: '10',
    },
    '&a0, &a90, &a180, &a270': {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: '#333',
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '12px',
      color: '#333',
    },
    '&a90': {
      top: '50%',
      left: '100%',
    },
    '&a180': {
      top: '100%',
      left: '50%',
    },
    '&a270': {
      top: '50%',
      left: '0',
    },
  };

  let cx: number = 0;
  let cy: number = 0;
  let mv = false;
  if (props.hook) {
    props.hook.setAngle = (angle) => {
      updateAngleSub(angle);
    };
  }
  const updateAngle = (ev: PointerEvent) => {
    const dx = ev.clientX - cx;
    const dy = ev.clientY - cy;
    // atan2 return radians, 0° at right, clockwise
    let deg = Math.atan2(dy, dx) * (180 / Math.PI);
    deg = (deg + 450) % 360; // top is 0°
    updateAngleSub(deg);
  };
  const updateAngleSub = (deg: number) => {
    const needle = ref.$('&needle');
    const text = ref.$('&tips');
    needle.style.transform = `rotate(${deg}deg)`;
    text.textContent = `${deg.toFixed(0)}°`;
    props.onChange(deg);
  };

  const pointerdown = (ev: PointerEvent) => {
    const picker = ref.$('&circle');
    const rect = picker.getBoundingClientRect();
    cx = rect.left + rect.width / 2;
    cy = rect.top + rect.height / 2;

    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
    updateAngle(ev);
    mv = true;
  };
  const pointermove = (ev: PointerEvent) => {
    if (!mv) {
      return;
    }
    if (ev.buttons === 0) {
      mv = false;
      return;
    }
    updateAngle(ev);
  };
  const pointerup = (ev: PointerEvent) => {
    mv = false;
    try {
      (ev.target as HTMLElement).releasePointerCapture(ev.pointerId);
    } catch (e) {}
  };
  const ref: RefProps = {};
  return (
    <div ref={ref} css={css}>
      <div class='&circle' onPointerDown={pointerdown} onPointerMove={pointermove} onPointerUp={pointerup}>
        <div class='&needle'></div>
        <div class='&tips'>90°</div>

        <div class='&a0' onClick={() => updateAngleSub(0)}></div>
        <div class='&a90' onClick={() => updateAngleSub(90)}></div>
        <div class='&a180' onClick={() => updateAngleSub(180)}></div>
        <div class='&a270' onClick={() => updateAngleSub(270)}></div>
      </div>
    </div>
  );
};
