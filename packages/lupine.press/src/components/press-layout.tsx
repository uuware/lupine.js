import { getCurrentLang } from 'lupine.web';
import { PressFrame } from '../frames/press-frame';
import { PageHeader } from './press-header';
import { PressSidemenu } from './press-sidemenu';
import { PressContent } from './press-content';

export const PressLayout = (props: {
  children: any;
  title: string;
  nav: any[];
  sidebar: any[];
  lang: string;
  langs?: any[];
  data?: any;
  headings?: any[];
  sidemenuWidth?: string;
  github?: { url: string; title: string };
}) => {
  const isHome = props.data?.layout === 'home';
  const headings = props.headings || [];
  const currentLang = props.lang || getCurrentLang().langName;

  const sidebar = props.sidebar || [];
  const content = (
    <PressContent sidebar={sidebar} isHome={isHome} headings={headings} data={props.data}>
      {props.children}
    </PressContent>
  );
  return (
    <PressFrame
      header={
        <PageHeader
          title={props.title}
          nav={props.nav}
          langs={props.langs || []}
          currentLang={currentLang}
          github={props.github}
        />
      }
      sidemenu={<PressSidemenu sidebar={sidebar} />}
      content={content}
      hideSidemenu={isHome}
      sidemenuWidth={props.sidemenuWidth}
    />
  );
};
