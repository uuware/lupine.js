import { Logger } from '../lib/logger';
import { generateAllGlobalStyles } from './bind-styles';
import { getCurrentTheme, updateTheme } from './bind-theme';
import { mountInnerComponent } from './mount-component';
import { renderComponentAsync } from './render-component';
// import { callPageResetEvent } from './page-reset-events';
import { PageRouter } from './page-router';
import { callPageLoadedEvent } from './page-loaded-event';
import { initServerCookies } from './server-cookie';
import { IRequestContextProps, IToClientDelivery } from '../models';
import { getMetaDataObject, getMetaDataTags, getPageTitle } from './bind-meta';
import { initWebEnv } from '../lib/web-env';
import { _lupineJs, PageProps, PageResultType, setRenderPageProps } from './export-lupine';
import { isFrontEnd } from '../lib/is-frontend';
import { WebConfig } from '../lib/web-config';
import { bindRequestContext } from './use-request-context';
import { CssProps } from '../jsx';

const logger = new Logger('initialize');

const renderTargetPage = async (props: PageProps, renderPartPage: boolean) => {
  if (_lupineJs.router instanceof PageRouter) {
    return _lupineJs.router.handleRoute(props.url, props, renderPartPage);
  }
  return await _lupineJs.router(props);
};

// this is called by server side for SSR (server-side-rendering)
const generatePage = async (props: PageProps, toClientDelivery: IToClientDelivery): Promise<PageResultType> => {
  setRenderPageProps(props);

  bindRequestContext(() => toClientDelivery.getRequestContext());
  initWebEnv(toClientDelivery.getWebEnv());
  WebConfig.initFromData(toClientDelivery.getWebSetting());
  // initWebSetting(toClientDelivery.getWebSetting());
  initServerCookies(toClientDelivery.getServerCookie());
  // callPageResetEvent();
  callPageLoadedEvent();

  const jsxNodes = await renderTargetPage(props, false);
  if (!jsxNodes || !jsxNodes.props) {
    return {
      content: `Unexpected url: ${props.url}`,
      title: '',
      metaData: '',
      globalCss: '',
      themeName: getCurrentTheme().themeName,
    };
  }

  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  const currentTheme = getCurrentTheme();
  const cssText = generateAllGlobalStyles();
  const content = jsxNodes.props._html.join('');

  return {
    content,
    title: getPageTitle(),
    metaData: getMetaDataTags(),
    globalCss: cssText,
    themeName: currentTheme.themeName,
  };
};
_lupineJs.generatePage = generatePage;

const _initSaved = {
  pageInitialized: false,
  appInitialized: false,
};
// this is called in the FE when the document is loaded
// to avoid circular reference, bindLinks can't call initializePage directly
export const initializePage = async (newUrl?: string) => {
  // Default context for Browser (singleton)
  const defaultContext: IRequestContextProps = {
    pageTitle: '',
    metaData: {},
    themeName: '',
    langName: '',
    globalStyles: new Map<string, { topUniqueClassName: string; noTopClassName: boolean; style: CssProps }>(),
    globalStyleIds: new Map<CssProps, string>(),
    coreData: {}, // for core development
    devData: {}, // for secondary development
  };
  bindRequestContext(() => defaultContext);

  const currentPageInitialized = _initSaved.pageInitialized;
  _initSaved.pageInitialized = true;
  logger.log('initializePage: ', newUrl);
  if (newUrl) {
    window.history.pushState({ urlPath: newUrl }, '', newUrl);
    // prevents browser from storing history with each change:
    // window.history.replaceState({ html: '', pageTitle: newUrl }, '', newUrl);
  }
  const splitUrl = newUrl ? newUrl.split('?') : [];
  const url = splitUrl[0] || document.location.pathname;
  const queryString = splitUrl[1] || document.location.search;

  const props: PageProps = {
    url,
    // urlSections: url.split('/').filter((i) => !!i),
    query: Object.fromEntries(new URLSearchParams(queryString)), // new URLSearchParams(queryString),
    urlParameters: {},
    renderPageFunctions: _lupineJs.renderPageFunctions,
  };

  setRenderPageProps(props);
  // can only call callPageLoadedEvent once after page refreshed
  !currentPageInitialized && callPageLoadedEvent();

  const jsxNodes = await renderTargetPage(props, currentPageInitialized);
  if (jsxNodes === null) return;
  if (!jsxNodes || !jsxNodes.props) {
    document.querySelector('.lupine-root')!.innerHTML = `Error happened or unexpected url: ${url}`;
    return;
  }

  // generateAllGlobalStyles will be updated directly in Browser
  await mountInnerComponent('.lupine-root', jsxNodes);
  updateTheme(getCurrentTheme().themeName);

  // title
  document.title = getPageTitle();
  const metaData = getMetaDataObject();
  // meta data?
};
_lupineJs.initializePage = initializePage;

// this is called in bindRouter to avoid tree shaking
export const initializeApp = () => {
  if (isFrontEnd()) {
    if (_initSaved.appInitialized) return;
    _initSaved.appInitialized = true;

    addEventListener('popstate', (event) => {
      initializePage();
    });
    addEventListener('load', (event) => {
      let redirect = new URLSearchParams(window.location.search).get('redirect');
      if (!redirect) {
        redirect = new URLSearchParams(window.location.hash.substring(1)).get('redirect');
      }
      initializePage(redirect || undefined);
    });
  }

  // for SSR, it exports _lupineJs function for the server to call
  // this should be loaded in a sandbox
  if (typeof globalThis !== 'undefined') {
    const gThis = globalThis as any;
    if (gThis._lupineJs === null) {
      gThis._lupineJs = () => {
        return _lupineJs;
      };
    }
  }
  // if (typeof exports !== 'undefined') {
  //   // ignore esbuild's warnings:
  //   // The CommonJS "exports" variable is treated as a global variable in an ECMAScript module and may not work as expected [commonjs-variable-in-esm]
  //   exports._lupineJs = () => {
  //     return _lupineJs;
  //   };
  // }
};
