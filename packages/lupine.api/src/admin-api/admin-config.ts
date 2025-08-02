import { ServerResponse } from 'http';
import * as fs from 'fs/promises';
import {
  IApiBase,
  Logger,
  apiCache,
  ServerRequest,
  ApiRouter,
  ApiHelper,
  langHelper,
  FsUtils,
  adminHelper,
} from 'lupine.api';
import path from 'path';
import { needDevAdminSession } from './admin-auth';

export class AdminConfig implements IApiBase {
  private logger = new Logger('config-api');
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    // called by FE
    this.router.use('/load', this.load.bind(this));
    this.router.use('/save', this.save.bind(this));
  }

  async load(req: ServerRequest, res: ServerResponse) {
    const appData = apiCache.getAppData();
    let cfgPath = path.join(appData.dataPath, 'config.json');
    if (!(await FsUtils.pathExist(cfgPath))) {
      cfgPath = path.join(appData.dataPath, 'resources', 'config_default.json');
    }
    if (!(await FsUtils.pathExist(cfgPath))) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:not_found_file', { fileName: 'config.json' }),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    let jsonCfg: any;
    try {
      jsonCfg = JSON.parse(await fs.readFile(cfgPath, 'utf8'));
    } catch (e) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:not_found_file', { fileName: 'config.json' }),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const response = {
      status: 'ok',
      message: langHelper.getLang('shared:operation_success'),
      result: jsonCfg,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  // called by clients
  async save(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.json) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:wrong_data'),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const cfgPath = path.join(appData.dataPath, 'config.json');
    await fs.writeFile(cfgPath, JSON.stringify(data.json));

    const response = {
      status: 'ok',
      message: langHelper.getLang('shared:operation_success'),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
