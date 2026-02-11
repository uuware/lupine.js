export type StylesProps = Map<string, { topUniqueClassName: string; noTopClassName: boolean; style: any }>;
export interface IRequestContextProps {
  pageTitle: string;
  metaData: { [key: string]: string };
  themeName: string;
  langName: string;
  globalStyles: StylesProps;
  globalStyleIds: Map<any, string>;
  coreData: { [key: string]: any }; // for core development
  devData: { [key: string]: any }; // for secondary development
}
