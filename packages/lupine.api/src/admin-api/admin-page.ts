import { ServerResponse } from 'http';
import { IApiBase, Logger, apiCache, ServerRequest, ApiRouter, ApiHelper } from 'lupine.api';

const logger = new Logger('admin-page');
export class AdminPage implements IApiBase {
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
    const searchQuery = this.buildQuery(searchValue, ['pageid', 'name', 'remark', 'package']);
    const sortKey = (data.sortKey as string) || 'updatedstamp';

    const conditions = [];
    const params = [];

    // Support both URL param (legacy) and POST body
    const isComponentParam = data.is_component !== undefined ? data.is_component : req.locals.query.get('is_component');
    if (isComponentParam !== undefined && isComponentParam !== '' && isComponentParam !== null) {
      conditions.push('is_component = ?');
      params.push(parseInt(isComponentParam as string, 10));
    }

    let query = `SELECT pageid, name, is_component, remark, package, updateduserid, updatedstamp from $__s_page`;

    if (searchQuery.sql) {
      conditions.push(searchQuery.sql);
      params.push(...searchQuery.params);
    }
    if (data.ids && Array.isArray(data.ids) && data.ids.length > 0) {
      const ids = data.ids as string[];
      conditions.push(`pageid in (${ids.map(() => '?').join(', ')})`);
      params.push(...ids);
    }

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
    
    // updatedstamp might be string from DB, sortKey DESC works correctly.
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
    return this.save(req, res); // Proxy to save for unified upsert
  }

  async save(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const data = req.locals.json() as any;

    const id = data['pageid'] || data['id'];
    
    if (!data['idReadonly'] && data['checkExists']) {
      const result = await db.selectObject('$__s_page', ['pageid'], {
        pageid: id,
      });
      if (result && result.length > 0) {
        const response = {
          status: 'ID_EXISTS',
          message: `Page id: ${id} exists`,
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
    }

    await db.deleteObject('$__s_page', { pageid: id });
    const result = await db.insertObject('$__s_page', {
      pageid: id,
      name: data['name'] || 'Untitled',
      remark: data['remark'] || '',
      package: data['package'] || 'default',
      is_component: data['is_component'] ? 1 : 0,
      json: typeof data['json'] === 'string' ? data['json'] : JSON.stringify(data['json'] || {}),
      updateduserid: 1,
      updatedstamp: new Date().toISOString(),
    });
    const response = {
      status: 'ok',
      result: result,
      message: 'Page Saved.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getRecord(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const id = req.locals.urlParameters.get('id', '');

    const response = {
      status: 'error',
      message: 'Get a page/component.',
      result: {} as any,
    };
    if (id) {
      const result = await db.selectObject('$__s_page', undefined, {
        pageid: id,
      });
      if (result && result.length > 0) {
        let parsedJson = {};
        try {
           parsedJson = JSON.parse(result[0]['json']);
        } catch(e) {}

        response.result = {
          pageid: result[0]['pageid'],
          name: result[0]['name'],
          remark: result[0]['remark'],
          package: result[0]['package'],
          is_component: result[0]['is_component'],
          json: parsedJson,
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
      message: 'Delete a page.',
      result: null as any,
    };
    if (id) {
      const result = await db.deleteObject('$__s_page', { pageid: id });
      response.result = result;
      response.status = 'ok';
    }
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
