import { CssProps, getCurrentTheme, updateTheme, VNode } from 'lupine.web';
import { PopupMenu } from './popup-menu';

export type ThemeSelectorProps = {
  className?: string;
  icon?: VNode<any>;
  noUpdateLabel?: boolean;
};

export const ThemeSelector = ({ className, icon, noUpdateLabel }: ThemeSelectorProps) => {
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
      <PopupMenu
        list={list}
        defaultValue={currentTheme.themeName}
        handleSelected={handleSelected}
        icon={icon}
        noUpdateLabel={noUpdateLabel}
      ></PopupMenu>
    </div>
  );
};
