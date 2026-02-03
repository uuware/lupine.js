import { CssProps, Svg, ThemeSelector } from 'lupine.components';
import { LangSwitcher } from './lang-switcher';
import githubIcon from '../styles/github.svg';
import themeIcon from '../styles/theme.svg';
import { pressProcessUrl } from '../services';

export type PageHeaderProps = {
  title: string;
  nav: any[];
  langs: any[];
  currentLang: string;
  github?: {
    url: string;
    title: string;
  };
};
export const PageHeader = (props: PageHeaderProps) => {
  const css: CssProps = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    justifyContent: 'space-between',
    '.press-navbar-left': {
      display: 'flex',
      alignItems: 'center',
      '.title': {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginRight: '1rem',
      },
      '.nav': {
        display: 'flex',
        gap: '1rem',
      },
    },
    '.press-navbar-right': {
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      '.navbar-item': {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'color 0.2s',
        '&:hover': { color: 'var(--press-brand-color)' },
      },
    },
  };
  return (
    <header css={css} class='press-navbar'>
      <div class='press-navbar-left'>
        <div class='title'>
          <a href={pressProcessUrl('/')}>{props.title}</a>
        </div>
        <nav class='nav'>
          {props.nav.map((item: any) => (
            <a href={pressProcessUrl(item.link)}>{item.text}</a>
          ))}
        </nav>
      </div>
      <div class='press-navbar-right'>
        {props.langs.length > 1 && (
          <LangSwitcher className='navbar-item' currentLang={props.currentLang} langs={props.langs || []} />
        )}
        <ThemeSelector className='navbar-item' icon={<Svg>{themeIcon}</Svg>} noUpdateLabel={true} />
        {props.github && props.github.url && (
          <a
            href={props.github.url}
            target='_blank'
            rel='noopener noreferrer'
            class='navbar-item'
            title={props.github.title}
          >
            <Svg>{githubIcon}</Svg>
          </a>
        )}
      </div>
    </header>
  );
};
