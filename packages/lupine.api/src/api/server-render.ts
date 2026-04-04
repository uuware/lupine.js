import * as fs from 'fs';
import * as path from 'path';
import { ServerResponse } from 'http';
import { Logger } from '../lib';
import { getWebEnv } from '../lib';
import { ServerRequest } from '../models/locals-props';
import { ToClientDelivery } from './to-client-delivery';
import { IToClientDelivery } from '../models/to-client-delivery-props';
import { JsonObject } from '../models/json-object';
import { getTemplateCache, apiCache } from './api-cache';
import { getAppCache, AppCacheGlobal, AppCacheKeys } from '../models/app-cache-props';
import { apiStorage } from './api-shared-storage';
import { RuntimeRequire } from '../lib/runtime-require';
import { IRequestContextProps } from '../models';

const getRequestContext = () => {
  try {
    const store = apiCache.getAsyncStore();
    if (!store['requestContext']) {
      const data: IRequestContextProps = {
        pageTitle: '',
        metaData: {},
        themeName: 'light',
        langName: 'en',
        globalStyles: new Map(),
        globalStyleIds: new Map(),
        coreData: {}, // for core development
        devData: {}, // for secondary development
      };
      store['requestContext'] = data;
    }
    return store['requestContext'] as IRequestContextProps;
  } catch (e) {
    throw new Error('Not in ALS context (e.g. startup or outside request)');
  }
};

const logger = new Logger('server-render');

export type RenderPageFunctionsType = {
  fetchData: (url: string, postData: string | JsonObject) => Promise<any>;
  [key: string]: Function;
};
let renderPageFunctions: RenderPageFunctionsType = {
  fetchData: async (url: string, postData: string | JsonObject) => {
    throw new Error('Method not implemented');
  },
};
export const getRenderPageFunctions = () => renderPageFunctions;
// for the FE code to fetch data in SSR
export const bindRenderPageFunctions = (calls: RenderPageFunctionsType) => {
  for (let k in calls) {
    renderPageFunctions[k] = calls[k];
  }
};

export type PageResultType = {
  content: string;
  title: string;
  metaData: string;
  themeName: string;
  globalCss: string;
};
type _LupineJs = {
  generatePage: (props: any, toClientDelivery: IToClientDelivery) => Promise<PageResultType>;
};

export const isServerSideRenderUrl = (urlWithoutQuery: string) => {
  /*
    ""                            -->   ""
    "name"                        -->   ""
    "name.txt"                    -->   "txt"
    ".htpasswd"                   -->   ""
    "name.with.many.dots.myext"   -->   "myext"
  */
  // get last section from /
  const lastSection = urlWithoutQuery.split('/').pop() || '';
  const ext = lastSection.slice(((lastSection.lastIndexOf('.') - 1) >>> 0) + 2);
  return ext === '' || ext === 'html';
};

const findNearestRootSync = (webRoot: string, urlWithoutQuery: string) => {
  if (urlWithoutQuery === '/' || urlWithoutQuery === '/index.html') {
    return webRoot;
  }
  if (urlWithoutQuery.endsWith('/')) {
    urlWithoutQuery = urlWithoutQuery.slice(0, -1);
  }

  let nearRoot = path.join(webRoot, urlWithoutQuery);

  const ssrRootsMap = getAppCache().get(AppCacheGlobal, AppCacheKeys.SSR_ROOTS) as Map<string, Set<string>>;
  const validRoots = ssrRootsMap?.get(webRoot);

  while (nearRoot.length > webRoot.length) {
    if (validRoots && validRoots.has(nearRoot)) {
      return nearRoot;
    }
    // Bubble upwards towards webroot until we find the parent SSR handler
    nearRoot = path.dirname(nearRoot);
  }

  return webRoot;
};

const titleText = '<!--META-TITLE-->';
const metaTextStart = '<!--META-ENV-START-->';
const metaTextEnd = '<!--META-ENV-END-->';
const containerText = '<div class="lupine-root">'; // '</div>'
type CachedHtmlProps = {
  content: string;
  webEnv: { [k: string]: string };
  // serverConfig: { [k: string]: any };
  titleIndex: number;
  metaIndexStart: number;
  metaIndexEnd: number;
  containerIndex: number;
  _lupineJs: _LupineJs;
};
const pendingSsrLoads = new Map<string, Promise<CachedHtmlProps>>();

export const serverSideRenderPage = async (
  appName: string,
  webRoot: string,
  urlWithoutQuery: string,
  urlQuery: string,
  req: ServerRequest,
  res: ServerResponse
) => {
  // console.log(`=========SSR, root: ${webRoot}, url: ${urlWithoutQuery}`);

  // cache multiple folders
  const cachedHtml = getTemplateCache();

  // in order to support virtual path and also sub folders, find nearest sub folder synchronously from pre-cached physical SSR roots
  const nearRoot = findNearestRootSync(webRoot, urlWithoutQuery);

  // Address Cache Stampede Concurrency Vulnerability natively
  if (!cachedHtml[nearRoot]) {
    if (!pendingSsrLoads.has(nearRoot)) {
      const loadPromise = (async () => {
        try {
          const content = await fs.promises.readFile(path.join(nearRoot, 'index.html'));
          let _lupineJs;
          try {
            const gThis = await RuntimeRequire.loadModuleIsolated(path.join(nearRoot, 'index.js'), { _lupineJs: null });
            if (!gThis || !gThis._lupineJs) {
              throw new Error('_lupineJs is not defined');
            }
            _lupineJs = gThis._lupineJs() as _LupineJs;
          } catch (e: any) {
            logger.error(e.message);
          }

          const contentWithEnv = content.toString();
          return {
            content: contentWithEnv,
            webEnv: getWebEnv(appName),
            titleIndex: contentWithEnv.indexOf(titleText),
            metaIndexStart: contentWithEnv.indexOf(metaTextStart),
            metaIndexEnd: contentWithEnv.indexOf(metaTextEnd),
            containerIndex: contentWithEnv.indexOf(containerText),
            _lupineJs: _lupineJs,
          } as CachedHtmlProps;
        } finally {
          // Promise self-cleanup pattern guarantees cleanup safely 
          // to prevent permanent blockage across all future API calls 
          // regardless if readFile succceeded or rejected
          pendingSsrLoads.delete(nearRoot);
        }
      })();
      pendingSsrLoads.set(nearRoot, loadPromise);
    }
    
    // Await either the fresh logic above, or lock onto existing synchronous Promise!
    cachedHtml[nearRoot] = await pendingSsrLoads.get(nearRoot);
  }

  const props = {
    url: urlWithoutQuery,
    // urlSections: urlWithoutQuery.split('/').filter((i) => !!i),
    query: Object.fromEntries(new URLSearchParams(urlQuery || '')), //new URLSearchParams(urlQuery || ''),
    urlParameters: {},
    renderPageFunctions: renderPageFunctions,
  };

  const _lupineJs = cachedHtml[nearRoot]._lupineJs;
  const currentCache = cachedHtml[nearRoot] as CachedHtmlProps;
  const webSetting = await apiStorage.getWebAll();
  // const webSettingShortKey: SimpleStorageDataProps = {};
  // for (let item of Object.keys(webSetting)) {
  //   const newItem = item.substring(4);
  //   webSettingShortKey[newItem] = webSetting[item];
  // }
  // const webSetting = AppConfig.get(AppConfig.WEB_SETTINGS_KEY) || {};
  const clientDelivery = new ToClientDelivery(
    currentCache.webEnv,
    webSetting,
    req.locals.cookies(),
    getRequestContext()
  );

  let page = {
    content: '',
    title: '',
    metaData: '',
    themeName: '',
    globalCss: '',
  };
  if (_lupineJs) {
    try {
      page = await _lupineJs.generatePage(props, clientDelivery);
    } catch (e: any) {
      logger.error(e.message);
    }
  }

  // console.log(`=========load lupin: `, content);

  const originHeader = req.headers.origin && req.headers.origin !== 'null' ? req.headers.origin : null;
  if (originHeader) {
    res.setHeader('Access-Control-Allow-Origin', originHeader);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip' });

  // const s = zlib.createGzip();
  // stream.pipeline(s, res, (err) => {
  //   s.write(cachedHtml.content.substring(0, cachedHtml.titleIndex).replace('<!--META-THEME-->', page.themeName));
  //   s.write(page.title);
  //   s.write(cachedHtml.content.substring(cachedHtml.titleIndex + titleText.length, cachedHtml.metaIndex));
  //   s.write(page.metaData);
  //   s.write(page.globalCss);
  //   s.write(
  //     cachedHtml.content.substring(cachedHtml.metaIndex + metaText.length, cachedHtml.containerIndex + containerText.length)
  //   )
  //   s.write(page.content);
  //   s.write(cachedHtml.content.substring(cachedHtml.containerIndex + containerText.length), (err) => {
  //     s.flush();
  //     res.end();
  //   });
  // });

  // data-theme and title
  res.write(currentCache.content.substring(0, currentCache.titleIndex).replace('<!--META-THEME-->', page.themeName));
  res.write(page.title);
  res.write(currentCache.content.substring(currentCache.titleIndex + titleText.length, currentCache.metaIndexStart));
  // meta data
  res.write(page.metaData);
  res.write(page.globalCss);
  res.write('<script id="web-env" type="application/json">' + JSON.stringify(currentCache.webEnv) + '</script>');
  res.write('<script id="web-setting" type="application/json">' + JSON.stringify(webSetting) + '</script>');
  res.write(
    currentCache.content.substring(
      currentCache.metaIndexEnd + metaTextEnd.length,
      currentCache.containerIndex + containerText.length
    )
  );
  // content
  res.write(page.content);
  res.write(currentCache.content.substring(currentCache.containerIndex + containerText.length));

  // const html = index.toString().replace('<div class="lupine-root"></div>', content);
  // handler200(res, html);
  res.end();
};
