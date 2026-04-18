// interface of AppCache

export const AppCacheGlobal = 'APP_GLOBAL';

export enum AppCacheKeys {
  APP_DEBUG = 'APP_DEBUG',
  // APP_ENV_FILE = 'APP_ENV_FILE', // app's env file, for api to reload
  APP_LIST = 'APP_LIST', // all app names list
  TEMPLATE = 'TEMPLATE',
  APP_DATA = 'APP_DATA',
  NODE_ENV = 'NODE_ENV',
  API_MODULE = 'API_MODULE',
  API_CONFIG = 'API_CONFIG',

  START_TIME = 'START_TIME',
  WEB_SERVER = 'WEB_SERVER',
  DEV_SERVICE_PROXY = 'DEV_SERVICE_PROXY',
  SERVER_CONTROL_PROXY = 'SERVER_CONTROL_PROXY',
  SSR_ROOTS = 'SSR_ROOTS',
}

export interface IAppCache {
  clear(appName: string | undefined): void;
  get(appName: string, key: string): any;
  set(appName: string, key: string, value: any): void;
  clearTemplateCache(): void;
}
const _savedCache: { appCache: IAppCache | null } = {
  appCache: null,
};
export const getAppCache = (): IAppCache => {
  return _savedCache.appCache!;
};
export const setAppCache = (cache: IAppCache) => {
  _savedCache.appCache = cache;
};
