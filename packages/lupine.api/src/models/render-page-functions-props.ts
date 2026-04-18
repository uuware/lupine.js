import { JsonObject } from './json-object';

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
