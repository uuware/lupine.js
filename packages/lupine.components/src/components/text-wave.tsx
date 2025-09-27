import { bindGlobalStyles, CssProps } from "lupine.web";

export type TextLoadingProps = {
  text: string;
  color?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
};
export const TextWave = (props: TextLoadingProps) => {
  const cssMap: CssProps = {};
  props.text.split('').forEach((char, index) => {
    cssMap[`.span${index}`] = { animationDelay: `${index * 0.1}s` };
  });
  const css: CssProps = {
    width: `100%`,
    height: `100%`,
    textAlign: 'center',
    color: props.color || '#22b8ff',
    padding: props.padding || '10px',
    fontSize: props.fontSize || '20px',
    fontWeight: props.fontWeight,
    textShadow: '1px -1px #ffffff, -2px 2px #999, -6px 7px 3px #131f5be6',
    '.text-wave.wave-animetion span': {
      display: 'inline-block',
      padding: '0 4px',
      animation: 'wave-text 1s ease-in-out infinite',
    },
    '.text-wave.wave-animetion': {
      marginTop: '0.6em',
      ...cssMap,
    },
    '@keyframes wave-text': {
      '0%': {
        transform: 'translateY(0em)',
      },
      '60%': {
        transform: 'translateY(-0.6em)',
      },
      '100%': {
        transform: 'translateY(0em)',
      },
    },
  };
  bindGlobalStyles('text-wave-top', css);
  return (
    <div class='text-wave-top'>
      <div class='text-wave wave-animetion'>
        {props.text.split('').map((char, index) => (
          <span class={`span${index}`}>{char}</span>
        ))}
      </div>
    </div>
  );
};
