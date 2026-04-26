import { ServerResponse } from 'http';
import { IApiBase, Logger, apiCache, ServerRequest, ApiRouter, ApiHelper } from 'lupine.api';

const logger = new Logger('admin-menu');
export class AdminMenu implements IApiBase {
  protected router = new ApiRouter();
  adminUser: any;

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/list', this.list.bind(this));
    this.router.use('/add', this.add.bind(this));
    this.router.use('/save', this.save.bind(this));
    this.router.use('/get/:id', this.getRecord.bind(this));
    this.router.use('/delete/:id', this.delete.bind(this));
  }

  private buildQuery(searchValue: string[], searchFields: string[]) {
    if (searchValue.length > 0) {
      const sql = searchValue
        .map((value) => '(' + searchFields.map((field) => `${field} like ?`).join(' or ') + ')')
        .join(' and ');
      const params = searchValue.flatMap((value) => searchFields.map((field) => `%${value}%`));
      return { sql: `(${sql})`, params };
    }
    return { sql: '', params: [] };
  }

  async list(req: ServerRequest, res: ServerResponse) {
    res.setHeader('Cache-Control', 'no-cache');
    const db = apiCache.getDb();
    let data = req.locals.json() as any;

    if (!data) {
      data = {};
    }

    const pageLimit = (data.pg_l as number) || 50;
    let pageIndex = (data.pg_i as number) || 0;
    const searchValue = ((data.searchValue as string) || '').split(' ').filter(Boolean);
    const searchQuery = this.buildQuery(searchValue, ['menuid', 'name', 'remark', 'package']);
    const sortKey = (data.sortKey as string) || 'updatetime';

    const conditions = [];
    const params: any[] = [];

    if (searchQuery.sql) {
      conditions.push(searchQuery.sql);
      params.push(...searchQuery.params);
    }

    let query = `SELECT menuid, name, remark, package, updateduserid, updatetime from $__s_menu`;

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' and ')}`;
    }

    const countRec = await db.select(`SELECT count(*) as count FROM (${query})`, params);
    const count = countRec[0].count;

    let pageMax = Math.floor(count / pageLimit);
    if (count > 0 && pageLimit > 0) {
      if (count % pageLimit !== 0) {
        pageMax++;
      }
      if (pageIndex > pageMax) {
        pageIndex = pageMax - 1;
      }
    }

    query += ` ORDER BY ${sortKey} DESC LIMIT ${pageLimit} OFFSET ` + pageIndex * pageLimit;
    const results = await db.select(query, params);

    const response = {
      status: 'ok',
      results,
      count,
      pageIndex,
      pageMax,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async add(req: ServerRequest, res: ServerResponse) {
    return this.save(req, res);
  }

  async save(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const data = req.locals.json() as any;

    let id = data['menuid'] || data['id'];
    if (!id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Menu ID is required.' });
      return true;
    }
    id = String(id).trim().toLowerCase();
    if (!/^[a-z0-9_]+$/.test(id)) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Menu ID can only contain lowercase letters, numbers, and underscores.' });
      return true;
    }

    if (!data['idReadonly'] && data['checkExists']) {
      const result = await db.selectObject('$__s_menu', ['menuid', 'updatetime'], {
        menuid: id,
      });
      if (result && result.length > 0) {
        if (data['originalUpdatetime']) {
          if (data['originalUpdatetime'] === result[0].updatetime) {
            // It's the same record the user opened, overwrite is safe.
          } else {
            const response = {
              status: 'MODIFIED_BY_OTHER',
              message: `Menu id: ${id} has been modified by someone else.`,
            };
            ApiHelper.sendJson(req, res, response);
            return true;
          }
        } else {
          const response = {
            status: 'ID_EXISTS',
            message: `Menu id: ${id} exists.`,
          };
          ApiHelper.sendJson(req, res, response);
          return true;
        }
      }
    }

    await db.deleteObject('$__s_menu', { menuid: id });
    const newStamp = Date.now();
    const result = await db.insertObject('$__s_menu', {
      menuid: id,
      name: data['name'] || 'Untitled',
      remark: data['remark'] || '',
      package: data['package'] || '',
      json: typeof data['json'] === 'string' ? data['json'] : JSON.stringify(data['json'] || []),
      updateduserid: 1,
      updatetime: newStamp,
    });
    const response = {
      status: 'ok',
      result: result,
      newUpdatetime: newStamp,
      message: 'Menu Saved.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getRecord(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const id = req.locals.urlParameters.get('id', '');

    const response = {
      status: 'error',
      message: 'Get a menu.',
      result: {} as any,
    };
    if (id) {
      const result = await db.selectObject('$__s_menu', undefined, {
        menuid: id,
      });
      if (result && result.length > 0) {
        let parsedJson: any[] = [];
        try {
          parsedJson = JSON.parse(result[0]['json']);
        } catch (e) {}

        response.result = {
          menuid: result[0]['menuid'],
          name: result[0]['name'],
          remark: result[0]['remark'],
          package: result[0]['package'],
          updatetime: result[0]['updatetime'],
          items: parsedJson,
        };
      }
      response.status = 'ok';
    }
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async delete(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const id = req.locals.urlParameters.get('id', '');

    const response = {
      status: 'ok',
      message: 'Delete a menu.',
      result: null as any,
    };
    if (id) {
      const result = await db.deleteObject('$__s_menu', { menuid: id });
      response.result = result;
      response.status = 'ok';
    }
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
