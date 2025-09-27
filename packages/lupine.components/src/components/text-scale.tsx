import { bindGlobalStyles, CssProps } from 'lupine.web';

export type TextScaleProps = {
  text: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
};
export const TextScale = (props: TextScaleProps) => {
  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.color || '#22b8ff',
    fontSize: props.fontSize || '30px',
    fontWeight: props.fontWeight || '500',
    '.text-scale': {
      animation: 'text-scale 1.5s infinite alternate',
      backgroundColor: props.backgroundColor || '#a1ffe8',
      padding: props.padding || '10px',
      borderRadius: '5px',
    },
    '@keyframes text-scale': {
      '0%, 100%': {
        transform: 'scale(1)',
      },
      '40%': {
        transform: 'scale(0.7)',
      },
    },
  };
  bindGlobalStyles('text-scale-top', css);
  return (
    <div class='text-scale-top'>
      <div class='text-scale'>{props.text}</div>
    </div>
  );
};
