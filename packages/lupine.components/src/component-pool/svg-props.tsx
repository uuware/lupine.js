export const SvgSvg = 'svg' as any;
export const SvgPath = 'path' as any;
export const SvgLine = 'line' as any;
export const SvgText = 'text' as any;
export const SvgCircle = 'circle' as any;
export const SvgG = 'g' as any;
export const SvgRect = 'rect' as any;
export const SvgPolyline = 'polyline' as any;

// Centralized Icons

export const ClockIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '14'}
    height={props.height || '14'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '2'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgCircle cx='12' cy='12' r='10' />
    <SvgPolyline points='12 6 12 12 16 14' />
  </SvgSvg>
);

export const ClearIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '12'}
    height={props.height || '12'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '3'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgLine x1='18' y1='6' x2='6' y2='18' />
    <SvgLine x1='6' y1='6' x2='18' y2='18' />
  </SvgSvg>
);

export const CheckIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '16'}
    height={props.height || '16'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '3'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgPolyline points='20 6 9 17 4 12' />
  </SvgSvg>
);

export const IncompleteIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '16'}
    height={props.height || '16'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '4'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgPath d='M20 6L9 17l-5-5' />
  </SvgSvg>
);

export const CalendarIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '14'}
    height={props.height || '14'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '2'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgRect x='3' y='4' width='18' height='18' rx='2' ry='2' />
    <SvgLine x1='16' y1='2' x2='16' y2='6' />
    <SvgLine x1='8' y1='2' x2='8' y2='6' />
    <SvgLine x1='3' y1='10' x2='21' y2='10' />
  </SvgSvg>
);

export const ChevronRightIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '14'}
    height={props.height || '14'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '2'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgPath d='M9 18l6-6-6-6' />
  </SvgSvg>
);

export const DotsIcon = (props: any = {}) => (
  <SvgSvg width={props.width || '16'} height={props.height || '16'} viewBox='0 0 24 24' fill='currentColor'>
    <SvgCircle cx='5' cy='12' r='2' />
    <SvgCircle cx='12' cy='12' r='2' />
    <SvgCircle cx='19' cy='12' r='2' />
  </SvgSvg>
);

export const CopyIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '16'}
    height={props.height || '16'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '2'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgRect x='9' y='9' width='13' height='13' rx='2' ry='2' />
    <SvgPath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
  </SvgSvg>
);
export const RefreshIcon = (props: any = {}) => (
  <SvgSvg
    width={props.width || '16'}
    height={props.height || '16'}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={props.strokeWidth || '2'}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <SvgPolyline points='23 4 23 10 17 10' />
    <SvgPath d='M20.49 15a9 9 0 1 1-2.12-9.36L23 10' />
  </SvgSvg>
);
