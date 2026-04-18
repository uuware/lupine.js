import { JsonObject } from '../../models/json-object';

export const baseUrl = (urlWithoutHost?: string) => {
  return urlWithoutHost || '/';
};

// This is a default fetchData, but end user can customise it
// "this" is fetchData's parent object (props.renderPageFunctions.fetchData(`...`))
import { localFetch } from './virtual-request';

export const fetchData = async function (
  this: any,
  urlWithoutHost: string,
  postData?: string | JsonObject,
  returnRawResponse?: boolean,
  returnHeaders?: boolean
) {
  if (returnRawResponse || returnHeaders) {
    throw new Error('returnRawResponse and returnHeaders cannot be used in SSR fetchData');
  }
  try {
    const responseStr = await localFetch(urlWithoutHost, postData);
    try {
      const json = JSON.parse(responseStr);
      return { json };
    } catch (e) {
      return { text: responseStr };
    }
  } catch (e) {
    return { json: { status: 'error', error: e } };
  }
};
