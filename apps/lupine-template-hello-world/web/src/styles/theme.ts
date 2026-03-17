import { baseThemes, ThemesProps } from 'lupine.components';

const themesBase = {
  // '--input-padding': '1.07rem .6rem',
  '--page-title-font-size': '2rem',
};
export const themes: ThemesProps = {
  light: {
    ...baseThemes.light,
    ...themesBase,
  },
  dark: {
    ...baseThemes.dark,
    ...themesBase,
  },
};
