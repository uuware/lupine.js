import { RenderPageFunctionsProps, JsonObject } from '../models';

let renderPageFunctions: RenderPageFunctionsProps = {
  fetchData: async (
    url: string,
    postBody?: string | JsonObject,
    returnRawResponse?: boolean,
    returnHeaders?: boolean
  ) => {
    throw new Error('Method not implemented');
  },
  baseUrl: (urlWithoutHost?: string) => {
    throw new Error('Method not implemented');
  },
};

export const getRenderPageFunctions = () => renderPageFunctions;

export const bindRenderPageFunctions = (calls: Partial<RenderPageFunctionsProps>) => {
  for (let k in calls) {
    if (calls[k]) {
      renderPageFunctions[k] = calls[k]!;
    }
  }
};
