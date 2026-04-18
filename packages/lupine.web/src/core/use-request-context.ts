import { AppDataProps, IRequestContextProps } from '../models/use-request-context-props';
import { CssProps } from '../jsx';

export const defaultLang = 'en';
export const defaultTheme = 'light';
export const appData: AppDataProps = {
  defaultPageTitle: '',

  defaultLang: defaultLang,
  langs: {},

  defaultTheme: defaultTheme,
  themes: {},

  appGlobalStyles: new Map<string, { topUniqueClassName: string; noTopClassName: boolean; style: CssProps }>(),

  // setDataEvent: null,
};

// export const callAppDataEvent = () => {
//   try {
//     _appData.fn && _appData.fn();
//   } catch (e) {
//     console.error(e);
//   }
// };

// // AppDataEvent should be called only once at index.tsx, and should be safe for all sessions.
// export const bindAppDataEvent = (fn: AppDataEventProps) => {
//   _appData.fn = fn;
// };

// The RequestContext can be provided by the server side or the client side.
let _contextGetter: () => IRequestContextProps | undefined;
export const bindRequestContext = (getter: () => IRequestContextProps | undefined) => {
  _contextGetter = getter;
};

export const getRequestContext = (): IRequestContextProps => {
  const gThis = globalThis as any;
  // if it's from SSR
  if (gThis.__SSR_ALS_PROPS__) {
    const store = gThis.__SSR_ALS_PROPS__.getStore();
    if (store && store.requestContext) {
      return store.requestContext;
    }
  }

  let ctx;
  if (!_contextGetter || !(ctx = _contextGetter())) {
    throw new Error('Request context is not initialized');
  }
  return ctx;
};
