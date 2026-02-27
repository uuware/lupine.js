import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';
import { SvgSvg, SvgPath, SvgLine, SvgText, SvgCircle, SvgG } from '../svg-props';

export type GaugeHighlightRange = {
  start: number;
  end: number;
  color?: string;
};

export type GaugeHookProps = {
  setValue: (val: number | [number, number]) => void;
  getValue: () => number | [number, number];
};

export type GaugeProps = {
  class?: string;
  style?: any;
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  disabled?: boolean;
  readonly?: boolean;
  showTicks?: boolean;
  showTickLabels?: boolean;
  showActiveTrack?: boolean;
  activeTrackColor?: string;
  tickStep?: number;
  range?: boolean;
  highlights?: GaugeHighlightRange[];
  onChange?: (val: number | [number, number]) => void;
  hook?: GaugeHookProps;
};

const gaugeCss: CssProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  userSelect: 'none',

  '&.disabled': {
    opacity: 'var(--primary-disabled-opacity, 0.5)',
    pointerEvents: 'none',
  },

  '.&-svg': {
    width: '100%',
    height: 'auto',
    maxWidth: '300px',
    overflow: 'visible',
    cursor: 'pointer',
    touchAction: 'none', // Prevent scrolling on touch devices while dragging
  },

  '&.readonly .&-svg': {
    cursor: 'default',
  },

  '.&-track': {
    fill: 'none',
    stroke: 'var(--secondary-bg-color, #eee)',
    strokeWidth: 10,
    strokeLinecap: 'round',
  },

  '.&-active-track': {
    fill: 'none',
    /* We'll set stroke dynamically via style mapping to activeTrackColor */
    strokeWidth: 16,
    strokeLinecap: 'round',
    opacity: 0.5,
  },

  '.&-highlight': {
    fill: 'none',
    strokeWidth: 10,
    strokeLinecap: 'round',
  },

  '.&-needle': {
    fill: 'var(--primary-accent-color, #0a74c9)',
    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))',
    cursor: 'grab',
    transition: 'transform 0.1s ease-out',
  },
  '.&-needle:active': {
    cursor: 'grabbing',
  },

  '.&-tick-mark': {
    stroke: 'var(--secondary-border-color, #a0a0a0)',
    strokeWidth: 2,
  },

  '.&-tick-label': {
    fill: 'var(--secondary-color, #818181)',
    fontSize: '10px',
    textAnchor: 'middle',
    dominantBaseline: 'hanging', // Hangs below the anchor
    pointerEvents: 'none',
  },

  '.&-value-display': {
    marginTop: '-10px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'var(--primary-text-color, #000)',
    textAlign: 'center',
  },
};

// Helper for SVG Arc
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  // 180 deg is Left, 0/360 is Right. Up is 270.
  // In SVG, Top is 0. So Up is -90. Left is 180. Right is 0.
  // To match standard polar coordinates where 0 is left and 180 is right:
  const angleInRadians = (angleInDegrees + 180) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  // To avoid zero length arcs failing to render
  if (Math.abs(endAngle - startAngle) < 0.1) return '';
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  // for semi-circle we don't need largeArcFlag usually, since max is 180.
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

export const Gauge = (props: GaugeProps) => {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const step = props.step ?? 1;
  const isRange = !!props.range;
  const isReadonly = !!props.readonly;
  const showActiveTrack = props.showActiveTrack !== false; // Default true
  const activeColor = props.activeTrackColor || 'var(--success-color, #2ecc71)';

  const globalCssId = getGlobalStylesId(gaugeCss);
  bindGlobalStyle(globalCssId, gaugeCss);

  let val1 = 0;
  let val2 = 100;
  if (isRange) {
    if (Array.isArray(props.value)) {
      val1 = props.value[0];
      val2 = props.value[1];
    } else {
      val1 = min;
      val2 = max;
    }
    if (val1 > val2) {
      const temp = val1;
      val1 = val2;
      val2 = temp;
    }
  } else {
    val1 = (props.value as number) ?? min;
  }

  let currentVal1 = val1;
  let currentVal2 = val2;

  const getPercent = (v: number) => {
    return Math.max(0, Math.min(1, (v - min) / (max - min)));
  };

  const updateVisuals = () => {
    const needle1 = ref.$('.needle-1') as SVGElement;
    const needle2 = ref.$('.needle-2') as SVGElement;
    const valDisplay = ref.$('.&-value-display') as HTMLElement;

    if (needle1) {
      const angle = getPercent(currentVal1) * 180;
      needle1.setAttribute('transform', `translate(100, 100) rotate(${angle})`);
    }

    if (isRange && needle2) {
      const angle = getPercent(currentVal2) * 180;
      needle2.setAttribute('transform', `translate(100, 100) rotate(${angle})`);
    }

    const activeTrack = ref.$('.&-active-track') as SVGPathElement;
    if (activeTrack) {
      const startP = getPercent(isRange ? currentVal1 : min) * 180;
      const endP = getPercent(isRange ? currentVal2 : currentVal1) * 180;
      const d = describeArc(100, 100, 80, startP, endP);
      activeTrack.setAttribute('d', d);
    }

    if (valDisplay) {
      valDisplay.innerText = isRange ? `${currentVal1} - ${currentVal2}` : `${currentVal1}`;
    }
  };

  let draggingNeedle: 1 | 2 | null = null;

  const handlePointerDown = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || isReadonly) return;

    const svg = ref.$('.&-svg') as SVGSVGElement;
    if (!svg) return;

    let clientX, clientY;
    if (e.type.startsWith('touch')) {
      clientX = (e as TouchEvent).touches[0].clientX;
      clientY = (e as TouchEvent).touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const setPosition = (cx: number, cy: number) => {
      const rect = svg.getBoundingClientRect();
      // Center of viewBox(100, 100) based on actual width/height
      const scaleX = rect.width / 200;
      const scaleY = rect.height / 120; // total viewbox height

      const centerX = rect.left + 100 * scaleX;
      const centerY = rect.top + 100 * scaleY;

      const dx = cx - centerX;
      const dy = cy - centerY;

      let angle = Math.atan2(dy, dx);
      // Math.atan2 returns -PI to PI.
      // Top half is -PI to 0. (0 is right, -PI is left).
      // Bottom half is 0 to PI.

      if (angle >= 0) {
        // user clicked below center line
        if (angle > Math.PI / 2) angle = -Math.PI; // clamp to Left
        else angle = 0; // clamp to Right
      }

      // Convert from [-PI, 0] to [0, 1] (0% = Left, 100% = Right)
      // Left is -PI, Right is 0.
      // angle/PI is [-1, 0]. (angle/PI) + 1 is [0, 1].
      const percent = angle / Math.PI + 1;
      let val = min + percent * (max - min);

      // Snap to step
      if (step > 0) {
        val = Math.round((val - min) / step) * step + min;
      }
      val = Math.max(min, Math.min(max, val));

      if (isRange) {
        if (!draggingNeedle) {
          // Identify closest thumb
          const dist1 = Math.abs(val - currentVal1);
          const dist2 = Math.abs(val - currentVal2);
          if (dist1 <= dist2) draggingNeedle = 1;
          else draggingNeedle = 2;
        }

        if (draggingNeedle === 1) {
          currentVal1 = Math.min(val, currentVal2);
        } else {
          currentVal2 = Math.max(val, currentVal1);
        }
      } else {
        currentVal1 = val;
      }

      updateVisuals();
    };

    setPosition(clientX, clientY);

    const onMove = (moveEvt: MouseEvent | TouchEvent) => {
      moveEvt.preventDefault();
      let mx, my;
      if (moveEvt.type.startsWith('touch')) {
        mx = (moveEvt as TouchEvent).touches[0].clientX;
        my = (moveEvt as TouchEvent).touches[0].clientY;
      } else {
        mx = (moveEvt as MouseEvent).clientX;
        my = (moveEvt as MouseEvent).clientY;
      }
      setPosition(mx, my);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      draggingNeedle = null;
      if (props.onChange) {
        props.onChange(isRange ? [currentVal1, currentVal2] : currentVal1);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  };

  if (props.hook) {
    props.hook.setValue = (val) => {
      if (isRange && Array.isArray(val)) {
        currentVal1 = Math.min(Math.max(val[0], min), max);
        currentVal2 = Math.max(Math.min(val[1], max), currentVal1);
      } else if (!isRange && typeof val === 'number') {
        currentVal1 = Math.min(Math.max(val, min), max);
      }
      updateVisuals();
    };
    props.hook.getValue = () => (isRange ? [currentVal1, currentVal2] : currentVal1);
  }

  const ref: RefProps & { onUnload?: (el: Element) => Promise<void> } = {
    globalCssId,
    onLoad: async () => {
      updateVisuals();
    },
    onUnload: async (el: Element) => {
      return Promise.resolve();
    },
  };

  const ticks: VNode<any>[] = [];
  if (props.showTicks || props.showTickLabels) {
    const tStep = props.tickStep || max - min;
    const tickValues = [];
    for (let i = min; i <= max; i += tStep) {
      tickValues.push(i);
    }
    if (tickValues[tickValues.length - 1] !== max) {
      tickValues.push(max);
    }

    tickValues.forEach((t) => {
      const p = getPercent(t);
      const angle = p * 180; // 0 to 180

      if (props.showTicks) {
        const start = polarToCartesian(100, 100, 72, angle);
        const end = polarToCartesian(100, 100, 65, angle);
        ticks.push(<SvgLine class='&-tick-mark' x1={start.x} y1={start.y} x2={end.x} y2={end.y} />);
      }
      if (props.showTickLabels) {
        // Push labels slightly further in
        const pos = polarToCartesian(100, 100, 52, angle);
        ticks.push(
          <SvgText class='&-tick-label' x={pos.x} y={pos.y + 2}>
            {t}
          </SvgText>
        );
      }
    });
  }

  const highlightPaths = (props.highlights || []).map((h) => {
    const startP = getPercent(h.start) * 180;
    const endP = getPercent(h.end) * 180;
    const d = describeArc(100, 100, 80, startP, endP);
    return <SvgPath class='&-highlight' d={d} style={{ stroke: h.color || 'var(--warning-color, #f39c12)' }} />;
  });

  return (
    <div
      class={['&-container', props.class, props.disabled ? 'disabled' : '', isReadonly ? 'readonly' : '']
        .join(' ')
        .trim()}
      ref={ref}
      style={props.style}
    >
      <SvgSvg class='&-svg' viewBox='0 0 200 120' onMouseDown={handlePointerDown} onTouchStart={handlePointerDown}>
        {/* Active Track (filled portion) - Placed first so it renders behind the base track and needles */}
        {showActiveTrack && <SvgPath class='&-active-track' d='' style={{ stroke: activeColor }} />}

        {/* Base Track */}
        <SvgPath class='&-track' d='M 20 100 A 80 80 0 0 1 180 100' />

        {/* Highlight Ranges */}
        {highlightPaths}

        {/* Ticks */}
        {ticks}

        {/* Needle 1 */}
        {/* Needle path at angle 0 (points Left) */}
        {!isRange ? (
          <SvgG class='&-needle needle-1' transform='translate(100, 100) rotate(0)'>
            <SvgPath d='M 0 -8 L 0 8 L -82 2 L -82 -2 Z' />
            <SvgCircle cx='0' cy='0' r='10' />
          </SvgG>
        ) : (
          <>
            <SvgG class='&-needle needle-1' transform='translate(100, 100) rotate(0)'>
              <SvgPath d='M 0 -8 L 0 8 L -82 2 L -82 -2 Z' />
              <SvgCircle cx='0' cy='0' r='10' />
            </SvgG>
            <SvgG class='&-needle needle-2' transform='translate(100, 100) rotate(180)'>
              <SvgPath d='M 0 -8 L 0 8 L -82 2 L -82 -2 Z' />
              <SvgCircle cx='0' cy='0' r='10' />
            </SvgG>
          </>
        )}
      </SvgSvg>
      <div class='&-value-display'>{isRange ? `${currentVal1} - ${currentVal2}` : currentVal1}</div>
    </div>
  );
};
