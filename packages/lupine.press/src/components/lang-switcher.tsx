import { initializePage } from 'lupine.web';
import { PopupMenu } from 'lupine.components';
import langIcon from '../styles/lang.svg';
import { Svg } from 'lupine.components';
import { getPressSubDir } from '../services';

export const LangSwitcher = (props: { className?: string; currentLang: string; langs: any[] }) => {
  const langs = props.langs || [];
  const currentLabel = langs.find((l) => l.id === props.currentLang)?.text || 'Language';

  const handleSelected = (text: string) => {
    const lang = langs.find((l) => l.text === text);
    if (lang && lang.id !== props.currentLang) {
      let newPath = window.location.pathname;
      const subDir = getPressSubDir();
      if (subDir && newPath.startsWith(subDir)) {
        newPath = newPath.substring(subDir.length);
      }

      const langIds = langs.map((l) => l.id).join('|');
      const langRegex = new RegExp(`^/(${langIds})(\\/|$)`);
      if (langRegex.test(newPath)) {
        newPath = newPath.replace(langRegex, `/${lang.id}$2`);
      } else {
        newPath = `/${lang.id}${newPath === '/' ? '/' : newPath}`;
      }
      newPath = `${subDir}${newPath}`;
      initializePage(newPath);
    }
  };

  return (
    <div class={['lang-switcher', props.className].join(' ')}>
      <PopupMenu
        list={langs.map((l) => l.text)}
        defaultValue={currentLabel}
        icon={<Svg>{langIcon}</Svg>}
        handleSelected={handleSelected}
        align='right'
      />
    </div>
  );
};
