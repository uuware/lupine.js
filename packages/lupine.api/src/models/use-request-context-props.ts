import { ThemesProps } from './theme-props';

export interface IRequestContextProps {
  pageTitle: { value: string; defaultValue: string };
  metaDescription: { value: string; defaultValue: string };
  metaData: { [key: string]: string };
  theme: { defaultTheme: string; themes: ThemesProps };
  globalStyles: Map<string, { topUniqueClassName: string; noTopClassName: boolean; style: any }>;
  devData: { [key: string]: any }; // for secondary development
}
