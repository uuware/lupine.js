import { VNode } from '../jsx';
import { IPageRouter } from './page-router-props';
import { IToClientDelivery, JsonObject } from '.';

export type RenderPageFunctionsType = {
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
  renderPageFunctions: RenderPageFunctionsType;
}

export type PageResultType = {
  content: string;
  title: string;
  metaData: string;
  themeName: string;
  globalCss: string;
};

export type _LupineJs = {
  // generatePage and initializePage are set in initialize.ts to avoid circular reference
  generatePage: (props: any, toClientDelivery: IToClientDelivery) => Promise<PageResultType>;
  initializePage: (newUrl?: string) => Promise<void>;
  renderPageFunctions: RenderPageFunctionsType;
  router: IPageRouter | ((props: PageProps) => Promise<VNode<any>>);
  renderPageProps: PageProps;
};
