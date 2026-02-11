import { CssProps } from '../jsx';
import { ThemesProps } from '../models';

export type LangProps = { [key: string]: string };
export type LangsProps = { [key: string]: LangProps };

export type StylesProps = Map<string, { topUniqueClassName: string; noTopClassName: boolean; style: CssProps }>;

// this is called at generatePage & initializePage, a chance to set data for each session
// export type SetDataEventProps = () => void;

// those data should be set once at index.tsx and never change, because they are same for all sessions
export type AppDataProps = {
  defaultPageTitle: string;

  defaultLang: string;
  langs: LangsProps;

  defaultTheme: string;
  themes: ThemesProps;

  defaultStyles: StylesProps;

  // setDataEvent: SetDataEventProps | null;
};

// those data is for each request
export interface IRequestContextProps {
  pageTitle: string;
  metaData: { [key: string]: string };
  themeName: string;
  langName: string;
  globalStyles: StylesProps;
  globalStyleIds: Map<CssProps, string>;
  coreData: { [key: string]: any }; // for core development
  devData: { [key: string]: any }; // for secondary development
}
