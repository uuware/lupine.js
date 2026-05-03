import { ServerResponse } from 'http';
import { IApiBase, Logger, ServerRequest, ApiRouter, ApiHelper, apiStorage } from 'lupine.api';
import { adminTokenHelper } from './admin-token-helper';

export class AdminTokens implements IApiBase {
  logger = new Logger('admin-page');
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
    this.router.use('/generate', this.generateToken.bind(this));
    this.router.use('/update', this.update.bind(this));
    this.router.use('/remove', this.remove.bind(this));
  }

  async list(req: ServerRequest, res: ServerResponse) {
    const pageLimit = (await apiStorage.getWeb('pageLimit')) || '15';
    const data = req.locals.json();
    if (!data || Array.isArray(data)) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload.' });
      return true;
    }
    const search = data.q as string || '';
    const list = await adminTokenHelper.list(search);
    const response = {
      status: 'ok',
      message: 'Token List.',
      result: list,
      pageLimit,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async add(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.token) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload: expected { token: string, description: string }.' });
      return true;
    }
    const token = data.token as string;
    const description = data.description as string || '';
    token && (await adminTokenHelper.add({ token, description }));
    const response = {
      status: 'ok',
      message: 'Added token.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async generateToken(req: ServerRequest, res: ServerResponse) {
    const newToken = adminTokenHelper.generate();
    const response = {
      status: 'ok',
      message: 'Generated new token.',
      result: newToken,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async update(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload.' });
      return true;
    }
    const id = data.id as string;
    const description = data.description as string || '';
    id && (await adminTokenHelper.update({ id, description }));
    const response = {
      status: 'ok',
      message: 'Updated token.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async remove(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.json();
    if (!data || Array.isArray(data) || !data.id) {
      ApiHelper.sendJson(req, res, { status: 'error', message: 'Invalid payload.' });
      return true;
    }
    const id = data.id as string;
    id && (await adminTokenHelper.remove(id));

    const response = {
      status: 'ok',
      message: 'Removed token.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
