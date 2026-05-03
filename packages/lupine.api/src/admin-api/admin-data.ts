import { ServerResponse } from 'http';
import {
  IApiBase,
  apiCache,
  ServerRequest,
  ApiRouter,
  ApiHelper,
  loadCSV,
} from 'lupine.api';
import { exportCSVHead, exportCSVData } from '../lib/utils/csv-util';

const CONTENT_TABLES: Record<string, string> = {
  menu: '$__s_menu',
  page: '$__s_page',
  process: '$__s_process',
};

export class AdminData implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/export', this.exportData.bind(this));
    this.router.use('/import', this.importData.bind(this));
  }

  async exportData(req: ServerRequest, res: ServerResponse) {
    const tablesParam = req.locals.query.get('tables') || 'menu,page,process';
    const requestedKeys = tablesParam.split(',').map((t: string) => t.trim().toLowerCase());
    const tablesToExport = requestedKeys
      .filter((key: string) => CONTENT_TABLES[key])
      .map((key: string) => CONTENT_TABLES[key]);

    if (tablesToExport.length === 0) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'No valid tables specified.' });
      return true;
    }

    const db = apiCache.getDb();
    exportCSVHead('content-data-' + new Date().toJSON().replace(/:/g, '-'), res);
    for (const tableName of tablesToExport) {
      await exportCSVData(db, tableName, res);
      res.write('\r\n');
    }
    res.end();
    return true;
  }

  async importData(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.lines) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload.' });
      return true;
    }
    try {
      const overwrite = !!data.overwrite;
      const result = await loadCSV(db, data.lines as string[], overwrite);
      ApiHelper.sendJson(req, res, { status: 'ok', result });
    } catch (error: any) {
      ApiHelper.sendJson(req, res, { status: 'error', message: error.message });
    }
    return true;
  }
}
