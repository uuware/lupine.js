import {
  IApiBase,
  Logger,
  StaticServer,
  ApiRouter,
  langHelper,
  adminApiHelper,
} from 'lupine.api';
import { Api } from './api';
import { apiLangEn } from '../lang/api-lang-en';
import { apiLangZhCn } from '../lang/api-lang-zh-cn';
import { appAdminHookCheckLogin, appAdminHookLogout, appAdminHookSetCookie } from './user-api';

const logger = new Logger('root-api');
const patchAdminLogin = () => {
  adminApiHelper.setAppAdminHookSetCookie(appAdminHookSetCookie);
  adminApiHelper.setAppAdminHookCheckLogin(appAdminHookCheckLogin);
  adminApiHelper.setAppAdminHookLogout(appAdminHookLogout);
};
export class RootApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    logger.info('RootApi is loaded.');
    langHelper.addLang(apiLangEn);
    langHelper.addLang(apiLangZhCn);

    patchAdminLogin();
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/api', new Api().getRouter());

    const staticServer = new StaticServer();
    this.router.use('*', staticServer.processRequest.bind(staticServer));
  }
}
