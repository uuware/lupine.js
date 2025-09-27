import { CssProps, getCurrentTheme, updateTheme } from 'lupine.web';
import { PopupMenu } from './popup-menu';

export type ThemeSelectorProps = {
  className?: string;
};

export const ThemeSelector = ({ className }: ThemeSelectorProps) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'end',
  };

  const handleSelected = (themeName: string) => {
    updateTheme(themeName);
  };
  const currentTheme = getCurrentTheme();
  const list = [];
  for (let themeName in currentTheme.themes) {
    list.push(themeName);
  }
  return (
    <div css={css} class={['theme-switch', className].join(' ')} title='Select theme'>
      <PopupMenu list={list} defaultValue={currentTheme.themeName} handleSelected={handleSelected}></PopupMenu>
    </div>
  );
};
