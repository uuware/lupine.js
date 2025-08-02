import { getCookie, JsonObject, webEnv } from 'lupine.components';

export const baseUrl = (urlWithoutHost?: string) => {
  let baseUrl = webEnv('API_BASE_URL', '');
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return baseUrl + (urlWithoutHost || '');
};

export const fetchData = async (
  urlWithoutHost: string,
  postData?: string | JsonObject,
  returnRawResponse?: boolean,
  returnHeaders?: boolean
) => {
  const url = baseUrl(urlWithoutHost);
  console.log('========fetchData', url);

  const option = {
    method: postData ? 'POST' : 'GET',
    credentials: 'include' as RequestCredentials,
    headers: new Headers({
      _token: getCookie('_token') || '',
    }),
    body: postData ? (typeof postData === 'string' ? postData : JSON.stringify(postData)) : undefined,
  };
  try {
    const response = await fetch(url, option);
    if (returnRawResponse) {
      return response;
    }
    // const json = await data.json();
    const text = await response.text();
    const headers: { [key: string]: string } = {};
    if (returnHeaders) {
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
    }
    try {
      const json = JSON.parse(text);
      return returnHeaders ? { json, headers } : { json };
    } catch (e) {
      return returnHeaders ? { text, headers } : { text };
    }
  } catch (e) {
    return { json: { status: 'error', error: e } };
  }
};
