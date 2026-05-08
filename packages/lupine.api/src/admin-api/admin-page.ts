import { ServerResponse } from 'http';
import { IApiBase, Logger, apiCache, ServerRequest, ApiRouter, ApiHelper } from 'lupine.api';
import { exportCSV } from '../lib/utils/csv-util';
import { adminApiHelper, getDesignLang, selectLangFallbackRecord } from './admin-api-helper';

const logger = new Logger('admin-page');

const parsePageJson = (json: any) => {
  if (!json) return {};
  if (typeof json !== 'string') return json;
  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
};

const getComponentRef = (node: any) => {
  const ref = node?.props?._componentRef;
  const id = ref?.id || (node?.type === 'block-component-ref' ? node?.props?.pageid : '');
  if (!id) return null;
  return {
    id: String(id),
    name: String(ref?.name || node?.props?.name || id),
  };
};

const createMissingComponentNode = (node: any, ref: { id: string; name: string }) => ({
  id: node?.id || ref.id,
  type: 'block-component-ref',
  props: {
    _componentRef: ref,
  },
});

const expandComponentRefs = async (node: any, lang: string, currentLevel: number, stack: string[] = []): Promise<any> => {
  if (!node || typeof node !== 'object') return node;

  const ref = getComponentRef(node);
  if (ref) {
    if (stack.includes(ref.id)) {
      logger.warn(`Circular component reference skipped: ${[...stack, ref.id].join(' -> ')}`);
      return createMissingComponentNode(node, ref);
    }

    const componentResult = await selectLangFallbackRecord('$__s_page', 'pageid', ref.id, lang);
    if (!componentResult || componentResult.length === 0) {
      return createMissingComponentNode(node, ref);
    }

    const componentAccesslevel = String(componentResult[0]['accesslevel'] || '0');
    const componentLevel = /^\d+$/.test(componentAccesslevel) ? parseInt(componentAccesslevel, 10) : 0;
    if (componentLevel > 0 && currentLevel < componentLevel) {
      return createMissingComponentNode(node, ref);
    }

    const expandedJson = parsePageJson(componentResult[0]['json']);
    const expandedNode = await expandComponentRefs(expandedJson, lang, currentLevel, [...stack, ref.id]);
    if (expandedNode && typeof expandedNode === 'object') {
      expandedNode.id = node.id || expandedNode.id;
      expandedNode.props = {
        ...(expandedNode.props || {}),
        _componentRef: ref,
      };
    }
    return expandedNode;
  }

  if (Array.isArray(node.children)) {
    node.children = await Promise.all(node.children.map((child: any) => expandComponentRefs(child, lang, currentLevel, stack)));
  }
  return node;
};

export const serveDesignPage = async (req: ServerRequest, res: ServerResponse) => {
  const id = req.locals.urlParameters.get('id', '');

  const response = {
    status: 'error',
    message: 'Get a page/component.',
    result: {} as any,
  };

  if (!id) {
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  const loginLevel = await adminApiHelper.getLoginLevel(req, res);
  const lang = getDesignLang(req);
  const result = await selectLangFallbackRecord('$__s_page', 'pageid', id, lang);

  if (!result || result.length === 0) {
    response.message = 'Page does not exist or access level is not enough.';
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  const pageAccesslevel = String(result[0]['accesslevel'] || '0');
  const currentAccesslevel = String(loginLevel.accesslevel || '0');
  const pageLevel = /^\d+$/.test(pageAccesslevel) ? parseInt(pageAccesslevel, 10) : 0;
  const currentLevel = /^\d+$/.test(currentAccesslevel) ? parseInt(currentAccesslevel, 10) : 0;

  if (pageLevel > 0 && currentLevel < pageLevel) {
    response.message = 'Page does not exist or access level is not enough.';
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  let parsedJson = parsePageJson(result[0]['json']);
  parsedJson = await expandComponentRefs(parsedJson, lang, currentLevel);

  response.result = {
    pageid: result[0]['pageid'],
    name: result[0]['name'],
    remark: result[0]['remark'],
    package: result[0]['package'],
    accesslevel: pageAccesslevel,
    is_component: result[0]['is_component'],
    updatetime: result[0]['updatetime'],
    json: parsedJson,
  };
  response.status = 'ok';
  ApiHelper.sendJson(req, res, response);
  return true;
};

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
    this.router.use('/export', this.export.bind(this));
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
    const sortKey = (data.sortKey as string) || 'updatetime';

    const conditions = [];
    const params = [];

    // Support both URL param (legacy) and POST body
    const isComponentParam = data.is_component !== undefined ? data.is_component : req.locals.query.get('is_component');
    if (isComponentParam !== undefined && isComponentParam !== '' && isComponentParam !== null) {
      conditions.push('is_component = ?');
      params.push(parseInt(isComponentParam as string, 10));
    }

    let query = `SELECT pageid, name, is_component, remark, package, accesslevel, updateduserid, updatetime from $__s_page`;

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
    
    // updatetime is integer from DB
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
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.pageid) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload: expected { pageid: string, ... }.' });
      return true;
    }

    let id = data.pageid as string;
    if (!id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Page ID is required.' });
      return true;
    }
    id = String(id).trim().toLowerCase();
    if (!/^[a-z0-9_\-#]+$/.test(id)) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Page ID can only contain lowercase letters, numbers, and underscores.' });
      return true;
    }
    
    if (!data['idReadonly'] && data['checkExists']) {
      const result = await db.selectObject('$__s_page', ['pageid', 'updatetime'], {
        pageid: id,
      });
      if (result && result.length > 0) {
        if (data['originalUpdatetime']) {
          if (data['originalUpdatetime'] === result[0].updatetime) {
             // It's the same record the user opened, overwrite is safe.
          } else {
             const response = {
               status: 'MODIFIED_BY_OTHER',
               message: `Page id: ${id} has been modified by someone else.`,
             };
             ApiHelper.sendJson(req, res, response);
             return true;
          }
        } else {
          const response = {
            status: 'ID_EXISTS',
            message: `Page id: ${id} exists.`,
          };
          ApiHelper.sendJson(req, res, response);
          return true;
        }
      }
    }

    await db.deleteObject('$__s_page', { pageid: id });
    const newStamp = Date.now();
    const result = await db.insertObject('$__s_page', {
      pageid: id,
      name: data['name'] as string || 'Untitled',
      remark: data['remark'] as string || '',
      package: data['package'] as string || 'default',
      accesslevel: data['accesslevel'] as string || '0',
      is_component: data['is_component'] ? 1 : 0,
      json: typeof data['json'] === 'string' ? data['json'] : JSON.stringify(data['json'] || {}),
      updateduserid: 1,
      updatetime: newStamp,
    });
    const response = {
      status: 'ok',
      result: result,
      newUpdatetime: newStamp,
      message: 'Page Saved.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getRecord(req: ServerRequest, res: ServerResponse) {
    return serveDesignPage(req, res);
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

  async export(req: ServerRequest, res: ServerResponse) {
    const db = apiCache.getDb();
    const idsParam = req.locals.query.get('ids') || '';
    let where = '';
    if (idsParam) {
      const ids = idsParam.split(',').filter(Boolean).map((id: string) => id.trim());
      if (ids.length > 0) {
        const safeIds = ids.map((id: string) => `'${id.replace(/'/g, "''")}'`).join(',');
        where = `pageid IN (${safeIds})`;
      }
    }
    await exportCSV(db, '$__s_page', res, where);
    return true;
  }
}
