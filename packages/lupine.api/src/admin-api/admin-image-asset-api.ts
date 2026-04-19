import { ServerResponse } from 'http';
import { IApiBase, Logger, ApiRouter, ServerRequest, apiCache, FsUtils, ApiHelper, langHelper } from 'lupine.api';
import path from 'path';
import { adminApiHelper } from './admin-api-helper';
import * as fs from 'fs/promises';

const logger = new Logger('admin-image-asset-api');
export class AdminImageAssetApi implements IApiBase {
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    this.router.use('/list', this.list.bind(this));
    this.router.use('/new-dir', this.newDir.bind(this));
    this.router.use('/upload', this.upload.bind(this));
    this.router.use('/delete', this.delete.bind(this));
    this.router.use('/del-dir', this.delDir.bind(this));
    this.router.use('/rename', this.rename.bind(this));
    this.router.use('/rn-dir', this.renameDir.bind(this));
  }

  isSafeFilename(s: string): boolean {
    return /^(?!\.)(?!.*\.\.)[A-Za-z0-9_\-#<>.]+$/.test(s);
  }

  async listImageFiles(folder: string, subPath: string) {
    const subDirs = [];
    const files = [];
    const list = await FsUtils.getDirentFullpath(folder);
    for (let entry of list) {
      const ext = path.extname(entry.name).toLowerCase();
      if (entry.isFile()) {
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.tiff', '.ico'].includes(ext)) {
          files.push(entry.name);
        }
      } else {
        subDirs.push(path.join('/', subPath, entry.name).replace(/\\/g, '/'));
      }
    }
    return { subDirs, files };
  }

  async list(req: ServerRequest, res: ServerResponse) {
    const subPath = decodeURIComponent((req.locals.query.get('p') as string) || '/');
    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, subPath);

    const result = await this.listImageFiles(webPath, subPath);

    const upFolders = [];
    if (subPath.length > 1) {
      let upFolder = subPath.slice(0, subPath.lastIndexOf('/'));
      if (!upFolder) {
        upFolder = '/';
      }
      const webPath2 = path.join(appData.webPath, upFolder);
      const result2 = await this.listImageFiles(webPath2, upFolder);
      upFolders.push(...result2.subDirs);
    }

    const response = {
      status: 'ok',
      result: {
        path: subPath,
        subDirs: result.subDirs,
        files: result.files,
        upFolders,
      },
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async newDir(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const newDir = decodeURIComponent(req.locals.query.get('f') || '').toLowerCase();
    if (!currentDir || currentDir.includes('..') || !newDir || newDir.includes('/')) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const webPath1 = path.join(appData.webPath, currentDir);
    if (!(await FsUtils.pathExist(webPath1))) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const webPath = path.join(appData.webPath, currentDir, newDir.toLowerCase());

    const result = await FsUtils.mkdir(webPath);
    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'Subdirectory created successfully. Please refresh the current directory.' : 'Directory creation failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async upload(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.body;
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const filename = decodeURIComponent(req.locals.query.get('f') || '').toLowerCase();
    let newName = decodeURIComponent(req.locals.query.get('n') || '').toLowerCase();
    const force = decodeURIComponent(req.locals.query.get('force') || '');
    if (
      !data ||
      data.length < 1 ||
      !currentDir ||
      currentDir.includes('..') ||
      !filename ||
      (!newName && !this.isSafeFilename(filename)) ||
      (newName && !this.isSafeFilename(newName))
    ) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const nowExt = filename.substring(filename.lastIndexOf('.'));
    const newExt = newName && newName.substring(newName.lastIndexOf('.'));
    if (newName) {
      if (nowExt !== newExt) {
        newName += nowExt;
      }
    } else {
      newName = filename;
    }

    const key = req.locals.query.get('key') as string;
    const chunkNumberStr = req.locals.query.get('chunkNumber') as string;
    const chunkNumber = parseInt(chunkNumberStr);
    const totalChunks = parseInt(req.locals.query.get('totalChunks') as string);
    const decryptedKey = key && adminApiHelper.decryptJson(key.replace(/ /g, '+'));
    const keyNG =
      !chunkNumberStr ||
      !totalChunks ||
      (chunkNumber !== 0 && (!decryptedKey || decryptedKey.ind !== chunkNumber || decryptedKey.cnt !== totalChunks));

    if (keyNG) {
      const response = {
        status: 'error',
        message: 'Permission denied',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const MAX_FILE_SIZE = 1024 * 1024 * 10; // MB
    if (totalChunks * data.length > MAX_FILE_SIZE) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:file_too_large'),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, currentDir);

    if (!(await FsUtils.pathExist(webPath))) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const fullpath = path.join(webPath, newName);
    if (force !== '1') {
      if (await FsUtils.pathExist(fullpath)) {
        const response = {
          status: 'error',
          message: 'A file with the same name already exists. Please select overwrite.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
    }
    // write data to a file
    if (chunkNumber === 0) {
      await fs.writeFile(fullpath, data, 'binary');
    } else {
      await fs.appendFile(fullpath, data, 'binary');
    }

    const response = {
      status: 'ok',
      chunkNumber,
      totalChunks,
      message: langHelper.getLang('shared:file_part_updated'),
      key: adminApiHelper.encryptJson({ ind: chunkNumber + 1, cnt: totalChunks, t: new Date().getTime() }),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async delete(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const filename = decodeURIComponent(req.locals.query.get('f') || '');
    if (!currentDir || currentDir.includes('..') || !filename) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, currentDir);

    if (!(await FsUtils.pathExist(webPath))) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const fullpath = path.join(webPath, filename);
    await FsUtils.unlinkFile(fullpath);

    const response = {
      status: 'ok',
      message: 'File deleted successfully. Please refresh the current directory.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async delDir(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    if (!currentDir || currentDir.includes('..')) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, currentDir);

    const result = await FsUtils.unlinkFolderEmpty(webPath);
    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'Directory deleted successfully. Please refresh the parent directory.' : 'Directory deletion failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async rename(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const filename = decodeURIComponent(req.locals.query.get('f') || '').toLowerCase();
    let newName = decodeURIComponent(req.locals.query.get('n') || '').toLowerCase();
    if (
      !currentDir ||
      currentDir.includes('..') ||
      !filename ||
      filename.includes('/') ||
      !newName ||
      newName.includes('/')
    ) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const nowExt = filename.substring(filename.lastIndexOf('.'));
    const newExt = newName.substring(newName.lastIndexOf('.'));
    if (nowExt !== newExt) {
      newName += nowExt;
    }

    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, currentDir, filename.toLowerCase());
    if (!(await FsUtils.pathExist(webPath))) {
      const response = {
        status: 'error',
        message: 'File not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const newPath = path.join(appData.webPath, currentDir, newName.toLowerCase());
    if (await FsUtils.pathExist(newPath)) {
      const response = {
        status: 'error',
        message: 'A file with the same name already exists. Cannot rename.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const result = await FsUtils.rename(webPath, newPath);
    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'File renamed successfully.' : 'File rename failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async renameDir(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    let newName = decodeURIComponent(req.locals.query.get('n') || '');
    if (!currentDir || !newName || !this.isSafeFilename(newName)) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const webPath = path.join(appData.webPath, currentDir);
    if (!(await FsUtils.pathExist(webPath))) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const pathSections = currentDir.split('/');
    pathSections.pop();
    pathSections.push(newName);
    const newPath = path.join(appData.webPath, pathSections.join('/'));
    if (await FsUtils.pathExist(newPath)) {
      const response = {
        status: 'error',
        message: 'A directory with the same name already exists. Cannot rename.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const result = await FsUtils.rename(webPath, newPath);
    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'Directory renamed successfully.' : 'Directory rename failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
