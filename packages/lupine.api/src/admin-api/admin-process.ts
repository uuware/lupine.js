import { ServerResponse } from 'http';
import { IApiBase, Logger, apiCache, ServerRequest, ApiRouter, ApiHelper, JsonKeyValue } from 'lupine.api';
import { getAllRegisteredClasses, getClassConstructor } from './process/class-registry';
import { ProcessBase } from './process/process-base';

const logger = new Logger('admin-process');

export class AdminProcess implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/list', this.list.bind(this));
    this.router.use('/add', this.save.bind(this)); // Alias add to save
    this.router.use('/save', this.save.bind(this));
    this.router.use('/get/:id', this.getRecord.bind(this));
    this.router.use('/delete/:id', this.delete.bind(this));
    this.router.use('/classes', this.getClasses.bind(this));
    this.router.use('/class-info', this.getClassInfo.bind(this));
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
    const searchQuery = this.buildQuery(searchValue, ['processid', 'remark', 'package']);
    const sortKey = (data.sortKey as string) || 'updatetime';

    const conditions = [];
    const params = [];

    let query = `SELECT processid, name, accesslevel, remark, package, updatetime from $__s_process`;

    if (searchQuery.sql) {
      conditions.push(searchQuery.sql);
      params.push(...searchQuery.params);
    }
    if (data.ids && Array.isArray(data.ids) && data.ids.length > 0) {
      const ids = data.ids as string[];
      conditions.push(`processid in (${ids.map(() => '?').join(', ')})`);
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

  async save(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const data = req.locals.json() as any;

    let id = data['processid'] || data['id'];
    if (!id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Process ID is required.' });
      return true;
    }
    id = String(id).trim().toLowerCase();
    if (!/^[a-z0-9_]+$/.test(id)) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Process ID can only contain lowercase letters, numbers, and underscores.' });
      return true;
    }

    if (!data['idReadonly'] && data['checkExists']) {
      const result = await db.selectObject('$__s_process', ['processid', 'updatetime'], {
        processid: id,
      });
      if (result && result.length > 0) {
        if (data['originalUpdatetime']) {
          if (data['originalUpdatetime'] === result[0].updatetime) {
            // It's the same record the user opened, overwrite is safe.
          } else {
            const response = {
              status: 'MODIFIED_BY_OTHER',
              message: `Process id: ${id} has been modified by someone else.`,
            };
            ApiHelper.sendJson(req, res, response);
            return true;
          }
        } else {
          const response = {
            status: 'ID_EXISTS',
            message: `Process id: ${id} exists.`,
          };
          ApiHelper.sendJson(req, res, response);
          return true;
        }
      }
    }

    await db.deleteObject('$__s_process', { processid: id });
    const newStamp = Date.now();
    const result = await db.insertObject('$__s_process', {
      processid: id,
      name: data['name'] || '',
      remark: data['remark'] || '',
      package: data['package'] || 'default',
      accesslevel: data['accesslevel'] || '0',
      json: typeof data['json'] === 'string' ? data['json'] : JSON.stringify(data['json'] || {}),
      updatetime: newStamp,
    });
    const response = {
      status: 'ok',
      result: result,
      newUpdatetime: newStamp,
      message: 'Process Saved.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getRecord(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const id = req.locals.urlParameters.get('id', '');

    const response = {
      status: 'error',
      message: 'Get a process.',
      result: {} as any,
    };
    if (id) {
      const result = await db.selectObject('$__s_process', undefined, {
        processid: id,
      });
      if (result && result.length > 0) {
        let parsedJson = {};
        try {
          parsedJson = JSON.parse(result[0]['json']);
        } catch (e) {}

        response.result = {
          processid: result[0]['processid'],
          name: result[0]['name'] || '',
          remark: result[0]['remark'],
          package: result[0]['package'],
          accesslevel: result[0]['accesslevel'],
          updatetime: result[0]['updatetime'],
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
      message: 'Delete a process.',
      result: null as any,
    };
    if (id) {
      const result = await db.deleteObject('$__s_process', { processid: id });
      response.result = result;
      response.status = 'ok';
    }
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getClasses(req: ServerRequest, res: ServerResponse) {
    // Import dynamically so it doesn't cause top-level circular issues if any
    const response = {
      status: 'ok',
      results: getAllRegisteredClasses(),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getClassInfo(req: ServerRequest, res: ServerResponse) {
    try {
      const name = req.locals.urlParameters.get('name', '') || ((req.locals.json() as JsonKeyValue)['name'] as string);
      if (!name) throw new Error('Missing class name');

      const Cls = getClassConstructor(name);
      if (!Cls) throw new Error('Class not found');

      const instance = new Cls();
      const fields: string[] = [];
      const excludedSetters = ['setConditionalField', 'setConditionalValue', 'setErrorField'];

      let obj = instance;
      while (obj && obj !== Object.prototype && obj.constructor.name !== 'ProcessBase') {
        for (const key of Object.getOwnPropertyNames(obj)) {
          if (key.startsWith('set') && typeof (obj as any)[key] === 'function' && key.length > 3) {
            if (excludedSetters.includes(key)) continue;
            let fname = key.substring(3);
            fname = fname.charAt(0).toLowerCase() + fname.slice(1);
            if (!fields.includes(fname)) {
              fields.push(fname);
            }
          }
        }
        obj = Object.getPrototypeOf(obj);
      }

      ApiHelper.sendJson(req, res, { status: 'ok', results: fields });
    } catch (e: any) {
      ApiHelper.sendJson(req, res, { status: 'ng', message: e.message });
    }
    return true;
  }
}
