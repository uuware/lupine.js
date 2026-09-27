import { VNode } from '../jsx';
import { IPageRouter, PageRouteResultProps } from './page-router-props';
import { IToClientDelivery, JsonObject } from '.';

export type RenderPageFunctionsProps = {
  fetchData: (
    url: string,
    postBody?: string | JsonObject,
    returnRawResponse?: boolean,
    returnHeaders?: boolean
  ) => Promise<any>;
  // add host for mobile app, which needs the host
  baseUrl: (urlWithoutHost?: string) => string;
  [key: string]: Function;
};

export interface PageProps {
  url: string;
  // urlSections: string[];
  query: { [key: string]: string };
  urlParameters: { [key: string]: string };
  renderPageFunctions: RenderPageFunctionsProps;
}

export type PageResultProps = {
  content: string;
  title: string;
  metaData: string;
  themeName: string;
  globalCss: string;
  statusCode?: number;
};

export type _LupineJs = {
  // generatePage and initializePage are set in initialize.ts to avoid circular reference
  generatePage: (props: any, toClientDelivery: IToClientDelivery) => Promise<PageResultProps>;
  initializePage: (newUrl?: string) => Promise<void>;
  renderPageFunctions: RenderPageFunctionsProps;
  router: IPageRouter | ((props: PageProps) => Promise<PageRouteResultProps>);
  renderPageProps: PageProps;
};
