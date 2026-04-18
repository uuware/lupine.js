import { DbConfig, DbHelper, HostToPathProps, IApiBase, loadEnv, ServerRequest } from 'lupine.api';
import { ServerResponse } from 'http';
import path from 'path';
import { apiCache, asyncLocalStorage, bindRenderPageFunctions } from '.';
import {
  AppCacheGlobal,
  AppCacheKeys,
  AsyncStorageProps,
  IApiModule,
  IAppCache,
  IAppSharedStorage,
  RenderPageFunctionsType,
  setAppCache,
} from '../models';
import { apiStorage } from './api-shared-storage';
import { baseUrl, fetchData } from './service/fetch-data';
import { assignToServerDevServiceProxy } from './dev-service-proxy';
import { assignFromServerControlProxy } from './server-control-proxy';

const defaultRenderPageFunctions: Partial<RenderPageFunctionsType> = {
  baseUrl,
  fetchData,
};
export class ApiModule implements IApiModule {
  rootApi: IApiBase;
  constructor(api: IApiBase, renderPageFunctions: Partial<RenderPageFunctionsType> = defaultRenderPageFunctions) {
    this.rootApi = api;
    bindRenderPageFunctions(renderPageFunctions);
  }

  public async processApi(store: AsyncStorageProps, url: string, req: ServerRequest, res: ServerResponse) {
    let result = false;
    // Check if we are already in the exact same async context (e.g., recursive internal fetch)
    const currentStore = asyncLocalStorage.getStore();
    if (currentStore && currentStore.uuid === store.uuid) {
      if (await this.rootApi.getRouter().findRoute(url, req, res, true)) {
        return true;
      }
      return false;
    }

    await asyncLocalStorage.run(store, async () => {
      if (await this.rootApi.getRouter().findRoute(url, req, res, true)) {
        result = true;
        return true;
      }
    });
    return result;
  }



  // appCache is from app-helper (parent scope), not the same in current scope
  public async initApi(appConfig: HostToPathProps, appCacheFromApp: IAppCache, appStorageFromApp: IAppSharedStorage) {
    // const evnFile = appCacheFromApp.get(AppCacheGlobal, AppCacheKeys.APP_ENV_FILE);
    // if (evnFile) {
    //   await loadEnv(evnFile);
    // }

    // set app's instances to api
    setAppCache(appCacheFromApp);
    // setAppStorage(appStorageFromApp);
    apiStorage.setAppSharedStorage(appStorageFromApp);
    // set RENDER_PAGE_FUNCTIONS to API module

    assignToServerDevServiceProxy(appCacheFromApp.get(AppCacheGlobal, AppCacheKeys.DEV_SERVICE_PROXY));
    assignFromServerControlProxy(appCacheFromApp.get(AppCacheGlobal, AppCacheKeys.SERVER_CONTROL_PROXY));

    console.log(`appConfig: `, appConfig);
    apiCache.set(apiCache.KEYS.APP_DATA, appConfig);
    // apiCache.set(apiCache.KEYS.APP_CACHE, appCache);

    // await this.initConfig(appConfig);
    apiCache.clearTemplateCache();

    if (appConfig.dbConfig.filename && path.isAbsolute(appConfig.dbConfig.filename)) {
      // Keep absolute path as is
    } else {
      appConfig.dbConfig.filename = path.join(appConfig.dataPath, appConfig.dbConfig.filename || 'sqlite3.db');
    }
    
    await this.initDb(appConfig.dbConfig);
  }

  private async initDb(config: DbConfig) {
    const db = await DbHelper.createInstance(config);
    apiCache.set(apiCache.KEYS.DB, db);
    return db;
  }

  // private async initConfig(appConfig: HostToPathProps) {
  //   await AppConfig.load(appConfig.dataPath);
  // }
}
