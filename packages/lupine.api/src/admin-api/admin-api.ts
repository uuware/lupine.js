import { ServerResponse } from 'http';
// import { AdminUser } from './admin-user';
import { AdminDb } from './admin-db';
import { AdminMenu } from './admin-menu';
import { devAdminAuth, devAdminLogout, needDevAdminSession } from './admin-auth';
import { AdminPerformance } from './admin-performance';
import { AdminRelease } from './admin-release';
import { AdminResources } from './admin-resources';
import { AdminTokens } from './admin-tokens';
import { AdminConfig } from './admin-config';
import { Logger, IApiBase, ServerRequest, ApiRouter } from 'lupine.api';
import { readWebConfig } from './web-config-api';
import { AdminPage } from './admin-page';
import { AdminImageApi, serveUploadImage } from './admin-image-api';
import { AdminImageAssetApi } from './admin-image-asset-api';
import { readWebSetting, writeWebSetting, readApiSetting, writeApiSetting } from './admin-setting-api';

const logger = new Logger('admin-api');

export class AdminApi implements IApiBase {
  protected router = new ApiRouter();
  adminUser: any;

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/web-config', readWebConfig);

    const adminDb = new AdminDb();
    this.router.use('/db', needDevAdminSession, adminDb.getRouter());

    // const adminUsers = new AdminUser();
    // this.router.use('/user', needDevAdminSession, adminUsers.getRouter());

    const adminMenus = new AdminMenu();
    this.router.use('/menu', needDevAdminSession, adminMenus.getRouter());

    const adminPerformance = new AdminPerformance();
    this.router.use('/performance', needDevAdminSession, adminPerformance.getRouter());

    const adminRelease = new AdminRelease();
    // as some endpoints check the token, so add needDevAdminSession inside
    this.router.use('/release', adminRelease.getRouter());

    const adminResources = new AdminResources();
    this.router.use('/resources', needDevAdminSession, adminResources.getRouter());

    const adminConfig = new AdminConfig();
    this.router.use('/config', needDevAdminSession, adminConfig.getRouter());

    const adminTokens = new AdminTokens();
    this.router.use('/tokens', needDevAdminSession, adminTokens.getRouter());

    const adminPage = new AdminPage();
    this.router.use('/page', needDevAdminSession, adminPage.getRouter());

    const adminImageApi = new AdminImageApi();
    this.router.use('/image', needDevAdminSession, adminImageApi.getRouter());

    const adminImageAssetApi = new AdminImageAssetApi();
    this.router.use('/image-asset', needDevAdminSession, adminImageAssetApi.getRouter());

    this.router.use('/settings/read-web', needDevAdminSession, readWebSetting);
    this.router.use('/settings/write-web', needDevAdminSession, writeWebSetting);
    this.router.use('/settings/read-api', needDevAdminSession, readApiSetting);
    this.router.use('/settings/write-api', needDevAdminSession, writeApiSetting);

    this.router.use('/image/:id', serveUploadImage);

    this.router.use('/auth', async (req: ServerRequest, res: ServerResponse) => {
      return devAdminAuth(req, res);
    });
    this.router.use('/logout', async (req: ServerRequest, res: ServerResponse) => {
      return devAdminLogout(req, res);
    });
  }
}
