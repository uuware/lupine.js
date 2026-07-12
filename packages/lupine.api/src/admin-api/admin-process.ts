import { ServerResponse } from 'http';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IApiBase, Logger, apiCache, ServerRequest, ApiRouter, ApiHelper, JsonKeyValue } from 'lupine.api';
import { getAllRegisteredClasses, getClassConstructor } from './process/class-registry';
import { ProcessBase } from './process/process-base';
import { ProcessContext } from './process/process-context';
import { ClassDef, ItemDef, runProcess } from './process/run-process';
import { exportCSV } from '../lib/utils/csv-util';

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
    this.router.use('/run/:id', this.run.bind(this));
    this.router.use('/delete/:id', this.delete.bind(this));
    this.router.use('/classes', this.getClasses.bind(this));
    this.router.use('/class-info', this.getClassInfo.bind(this));
    this.router.use('/export', this.export.bind(this));
  }

  private getRunDebugDir() {
    const cwd = process.cwd();
    const packageRoot = path.basename(cwd) === 'lupine.api' ? cwd : path.join(cwd, 'packages', 'lupine.api');
    return path.join(packageRoot, 'dist', 'temp');
  }

  private async saveRunDebugDump(
    processId: string,
    input: Record<string, string>,
    items: ItemDef[],
    classes: ClassDef[],
    output: Record<string, string>,
    ok?: boolean,
    error?: unknown
  ) {
    try {
      const debugDir = this.getRunDebugDir();
      await fs.mkdir(debugDir, { recursive: true });
      const safeProcessId = processId.replace(/[^a-zA-Z0-9_\-#]/g, '_') || 'unknown';
      const debugFile = path.join(debugDir, `${safeProcessId}.json`);
      await fs.writeFile(
        debugFile,
        JSON.stringify(
          {
            processId,
            savedAt: new Date().toISOString(),
            ok,
            input,
            items,
            classes,
            output,
            error: error ? (error as any)?.stack || (error as any)?.message || String(error) : undefined,
          },
          null,
          2
        ),
        'utf-8'
      );
    } catch (e: any) {
      logger.error(`Failed to save process run debug dump: ${e?.message || e}`);
    }
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
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.processid) {
      ApiHelper.sendJson(req, res, {
        status: 'error',
        message: 'Invalid payload: expected { processid: string, ... }.',
      });
      return true;
    }

    let id = data.processid as string;
    if (!id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Process ID is required.' });
      return true;
    }
    id = String(id).trim().toLowerCase();
    if (!/^[a-z0-9_\-#]+$/.test(id)) {
      ApiHelper.sendJson(req, res, {
        status: 'error',
        message: 'Process ID can only contain lowercase letters, numbers, and underscores.',
      });
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
      name: (data['name'] as string) || '',
      remark: (data['remark'] as string) || '',
      package: (data['package'] as string) || 'default',
      accesslevel: (data['accesslevel'] as string) || '0',
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

  async run(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const id = req.locals.urlParameters.get('id', '');
    const data = req.locals.json();

    if (!id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Process ID is required.' });
      return true;
    }
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload: expected JSON object.' });
      return true;
    }

    const result = await db.selectObject('$__s_process', ['processid', 'json'], { processid: id });
    if (!result || result.length === 0) {
      ApiHelper.sendJson(req, res, { status: 'error', message: `Process id: ${id} does not exist.` });
      return true;
    }

    let parsedJson: { items?: ItemDef[]; classes?: ClassDef[] } = {};
    try {
      parsedJson = JSON.parse(result[0]['json'] || '{}');
    } catch (e) {
      ApiHelper.sendJson(req, res, { status: 'error', message: `Invalid process json for id: ${id}.` });
      return true;
    }

    const input = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value == null ? '' : String(value)])
    );
    const ctx = new ProcessContext(input, id);

    try {
      const items = parsedJson.items || [];
      const classes = parsedJson.classes || [];
      const ok = await runProcess(ctx, items, classes);
      if (!ok) {
        ctx.output.error = 'true';
      }
      await this.saveRunDebugDump(id, input, items, classes, ctx.output, ok);
      ApiHelper.sendJson(req, res, ctx.output);
    } catch (e: any) {
      await this.saveRunDebugDump(id, input, parsedJson.items || [], parsedJson.classes || [], ctx.output, false, e);
      logger.error(e?.message || e);
      ApiHelper.sendJson(req, res, { status: 'error', message: e?.message || 'Run process failed.' });
    }
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

  async export(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const idsParam = req.locals.query.get('ids') || '';
    let where = '';
    if (idsParam) {
      const ids = idsParam
        .split(',')
        .filter(Boolean)
        .map((id: string) => id.trim());
      if (ids.length > 0) {
        const safeIds = ids.map((id: string) => `'${id.replace(/'/g, "''")}'`).join(',');
        where = `processid IN (${safeIds})`;
      }
    }
    await exportCSV(db, '$__s_process', res, where);
    return true;
  }
}
