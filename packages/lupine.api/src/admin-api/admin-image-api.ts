import { ServerResponse } from 'http';
import {
  IApiBase,
  Logger,
  ApiRouter,
  ServerRequest,
  apiCache,
  FsUtils,
  ApiHelper,
  langHelper,
  CryptoUtils,
} from 'lupine.api';
import path from 'path';
import { adminApiHelper } from './admin-api-helper';
import * as fs from 'fs/promises';

export const serveUploadImage = async (req: ServerRequest, res: ServerResponse) => {
  return AdminImageApi.serverImage(req, res);
};

const IMG_ROOT_FOLDER = 'img_upload';
const logger = new Logger('admin-image-api');
export class AdminImageApi implements IApiBase {
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
    this.router.use('/rn-dir', this.renameDir.bind(this));
    this.router.use('/rename', this.rename.bind(this));
  }

  public static async serverImage(req: ServerRequest, res: ServerResponse) {
    const file_id = req.locals.urlParameters.get('id', '');
    if (!file_id || file_id.indexOf('.') < 0) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:wrong_data'),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const db = apiCache.getDb();
    const records = await db.selectObject('$__image', ['*'], {
      file_id,
    });
    if (records.length !== 1) {
      const response = {
        status: 'error',
        message: 'File not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, records[0].parent_full_path, records[0].file_id);
    if (!(await FsUtils.pathExist(dataPath))) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:file_not_found'),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    // redirect to \assets\images\no-image.jpg ?
    await ApiHelper.sendFile(req, res, dataPath);
    return true;
  }

  // isSafeFilename(s: string): boolean {
  //   return /^(?!\.)(?!.*\.\.)[A-Za-z0-9_\-#<>.]+$/.test(s);
  // }
  checkCurrentDir(currentDir: string): boolean {
    return !!currentDir && currentDir[0] === '/' && !currentDir.includes('\\');
  }
  hasSlash(s: string): boolean {
    return s.includes('/') || s.includes('\\');
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
    // subPath is id path
    let currentDir = decodeURIComponent((req.locals.query.get('p') as string) || '');
    if (!this.checkCurrentDir(currentDir)) {
      // const response = {
      //   status: 'error',
      //   message: 'Wrong data.',
      // };
      // ApiHelper.sendJson(req, res, response);
      // return true;
      currentDir = '/';
    }

    if (currentDir.length > 1 && currentDir.endsWith('/')) {
      currentDir = currentDir.slice(0, -1);
    }
    const pathSections = currentDir.split('/').filter(Boolean);
    if (pathSections.length > 6) {
      const response = {
        status: 'error',
        message: 'Too many directory levels.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const db = apiCache.getDb();
    if (currentDir !== '/') {
      const folderExist = await db.selectObject('$__image_folder', undefined, { full_path: currentDir });
      if (folderExist.length === 0) {
        const response = {
          status: 'error',
          message: 'Directory not found.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
    }

    let folderIdMap: { [key: string]: string } = {};
    if (pathSections.length > 0) {
      let orSql =
        'SELECT folder_id, display_name FROM $__image_folder WHERE ' +
        pathSections.map((item) => `folder_id=?`).join(' OR ');
      const sectionRecords = await db.select(orSql, pathSections);
      if (sectionRecords.length !== pathSections.length) {
        const response = {
          status: 'error',
          message: 'Directory not found.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
      sectionRecords.forEach((item: any) => {
        folderIdMap[item.folder_id] = item.display_name;
      });
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, currentDir);

    const folders = await db.selectObject('$__image_folder', undefined, { parent_full_path: currentDir });
    const images = await db.selectObject('$__image', undefined, { parent_full_path: currentDir }, 'updatetime desc');
    let upFolders = [];
    if (currentDir.length > 1) {
      let upFolder = currentDir.slice(0, currentDir.lastIndexOf('/'));
      if (!upFolder) {
        upFolder = '/';
      }
      upFolders = await db.selectObject('$__image_folder', undefined, { parent_full_path: upFolder });
    }

    // const result = await this.listImageFiles(dataPath, currentDir);
    const response = {
      status: 'ok',
      result: {
        path: currentDir,
        // subDirs: result.subDirs,
        // files: result.files,
        folders,
        images,
        folderIdMap,
        upFolders,
      },
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async newDir(req: ServerRequest, res: ServerResponse) {
    // currentDir is id path
    let currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const newDir = decodeURIComponent(req.locals.query.get('f') || '');
    if (
      !this.checkCurrentDir(currentDir) ||
      !newDir ||
      newDir.indexOf('/') !== -1 ||
      newDir.indexOf('\\') !== -1 ||
      newDir.length > 40 ||
      currentDir.length + newDir.length > 250 ||
      currentDir.split('/').length > 4
    ) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    if (currentDir.length > 1 && currentDir.endsWith('/')) {
      currentDir = currentDir.slice(0, -1);
    }
    const db = apiCache.getDb();
    if (currentDir !== '/') {
      const records = await db.selectObject('$__image_folder', ['count(*) as cnt'], { full_path: currentDir });
      if (records.length !== 1 || records[0].cnt !== 1) {
        const response = {
          status: 'error',
          message: 'Parent directory not found.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
    }

    const records = await db.selectObject('$__image_folder', ['count(*) as cnt'], {
      parent_full_path: currentDir,
      display_name: newDir,
    });
    if (records.length !== 1 || records[0].cnt !== 0) {
      const response = {
        status: 'error',
        message: 'Directory already exists.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    // Generate a random string as the actual directory name, not considering hierarchy, should be globally unique
    let folderId = CryptoUtils.randomCharNumberString(10);
    while (true) {
      const records = await db.selectObject('$__image_folder', ['count(*) as cnt'], { folder_id: folderId });
      if (records.length === 1 && records[0].cnt === 0) {
        break;
      }
      folderId = CryptoUtils.randomCharNumberString(10);
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, currentDir, folderId);
    const result = await FsUtils.mkdir(dataPath);

    if (result) {
      await db.insertObject('$__image_folder', {
        folder_id: folderId,
        display_name: newDir,
        full_path: path.join(currentDir, folderId).replace(/\\/g, '/'),
        parent_full_path: currentDir,
      });
    }

    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'Directory created successfully.' : 'Directory creation failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async upload(req: ServerRequest, res: ServerResponse) {
    const data = req.locals.body;
    let currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    const filename = decodeURIComponent(req.locals.query.get('f') || '');
    let newName = decodeURIComponent(req.locals.query.get('n') || '');
    const force = decodeURIComponent(req.locals.query.get('force') || '');
    if (
      !data ||
      data.length < 1 ||
      !this.checkCurrentDir(currentDir) ||
      !filename ||
      this.hasSlash(filename) ||
      this.hasSlash(newName)
    ) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    if (currentDir === '/') {
      const response = {
        status: 'error',
        message: 'Cannot upload files to the root directory.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    if (currentDir.length > 1 && currentDir.endsWith('/')) {
      currentDir = currentDir.slice(0, -1);
    }

    const nowExt = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    if (nowExt.length >= 9) {
      const response = {
        status: 'error',
        message: 'File extension is too long.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const newExt = newName && newName.substring(newName.lastIndexOf('.')).toLowerCase();
    if (newName) {
      if (nowExt !== newExt) {
        newName += nowExt;
      }
    } else {
      newName = filename;
    }
    if (newName.length > 40) {
      const response = {
        status: 'error',
        message: 'File name is too long.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    // Convert extension to lowercase
    newName = newName.slice(0, -nowExt.length) + nowExt.toLowerCase();

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

    const db = apiCache.getDb();
    const hasRecord = await db.selectObject('$__image_folder', ['*'], { full_path: currentDir });
    if (hasRecord.length !== 1) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    let file_id = '';
    const imgRecords = await db.selectObject('$__image', ['*'], {
      parent_full_path: currentDir,
      display_name: newName,
    });
    // At the beginning of file upload, if not overwriting, check for existence. If overwriting and a record exists, use the previous id, otherwise generate a new id
    if (chunkNumber === 0) {
      if (force !== '1' && imgRecords.length > 0) {
        const response = {
          status: 'error',
          message: '同名文件已存在',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
      if (!imgRecords || imgRecords.length !== 1) {
        // Generate a random string as the actual directory name, globally unique
        file_id = CryptoUtils.randomCharNumberString(12) + nowExt;
        while (true) {
          const records = await db.selectObject('$__image', ['count(*) as cnt'], {
            file_id,
          });
          if (records.length === 1 && records[0].cnt === 0) {
            break;
          }
          file_id = CryptoUtils.randomCharNumberString(12) + nowExt;
        }
      } else {
        file_id = imgRecords[0].file_id;
        // update version
        await db.updateObject('$__image', { version: imgRecords[0].version + 1, updatetime: Date.now() }, { file_id });
      }
    } else {
      if (!imgRecords || imgRecords.length !== 1) {
        const response = {
          status: 'error',
          message: 'File not found.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }

      file_id = imgRecords[0].file_id;
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, currentDir);

    if (!(await FsUtils.pathExist(dataPath))) {
      const response = {
        status: 'error',
        message: 'Current directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const fullpath = path.join(dataPath, file_id);
    // write data to a file
    if (chunkNumber === 0) {
      await fs.writeFile(fullpath, data, 'binary');

      if (!imgRecords || imgRecords.length !== 1) {
        await db.insertObject('$__image', {
          file_id,
          display_name: newName,
          parent_full_path: currentDir,
          version: 1,
          updatetime: Date.now(),
        });
      }
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
    const file_id = decodeURIComponent(req.locals.query.get('f') || '');
    if (!file_id) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const db = apiCache.getDb();
    const records = await db.selectObject('$__image', ['*'], {
      file_id,
    });
    if (records.length !== 1) {
      const response = {
        status: 'error',
        message: 'File not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, records[0].parent_full_path);
    if (!(await FsUtils.pathExist(dataPath))) {
      const response = {
        status: 'error',
        message: 'Current directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    const fullpath = path.join(dataPath, records[0].file_id);
    await FsUtils.unlinkFile(fullpath);
    await db.deleteObject('$__image', { file_id });

    const response = {
      status: 'ok',
      message: 'File deleted successfully. Please refresh the current directory.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async delDir(req: ServerRequest, res: ServerResponse) {
    let currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    if (!this.checkCurrentDir(currentDir)) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    if (currentDir === '/') {
      const response = {
        status: 'error',
        message: 'Cannot delete root directory.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    if (currentDir.length > 1 && currentDir.endsWith('/')) {
      currentDir = currentDir.slice(0, -1);
    }

    const db = apiCache.getDb();
    const hasRecord = await db.selectObject('$__image_folder', ['count(*) as cnt'], { full_path: currentDir });
    if (hasRecord.length !== 1 || hasRecord[0].cnt !== 1) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const records = await db.selectObject('$__image', ['count(*) as cnt'], { parent_full_path: currentDir });
    if (records.length !== 1 || records[0].cnt !== 0) {
      const response = {
        status: 'error',
        message: 'Directory is not empty.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const appData = apiCache.getAppData();
    const dataPath = path.join(appData.dataPath, IMG_ROOT_FOLDER, currentDir);

    let result = await FsUtils.unlinkFolderEmpty(dataPath);
    if (!result && !(await FsUtils.pathExist(dataPath))) {
      result = true;
    }
    if (result) {
      await db.deleteObject('$__image_folder', { full_path: currentDir });
    }
    const response = {
      status: result ? 'ok' : 'error',
      message: result ? 'Directory deleted successfully.' : 'Directory deletion failed.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async rename(req: ServerRequest, res: ServerResponse) {
    const file_id = decodeURIComponent(req.locals.query.get('f') || '');
    let newName = decodeURIComponent(req.locals.query.get('n') || '');
    if (!file_id || !newName || this.hasSlash(newName)) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const db = apiCache.getDb();
    const records = await db.selectObject('$__image', ['*'], {
      file_id,
    });
    if (records.length !== 1) {
      const response = {
        status: 'error',
        message: 'File not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const nowExt = file_id.substring(file_id.lastIndexOf('.')).toLowerCase();
    const newExt = newName.substring(newName.lastIndexOf('.')).toLowerCase();
    if (nowExt !== newExt) {
      newName += nowExt;
    }
    // Convert extension to lowercase
    newName = newName.slice(0, -nowExt.length) + nowExt.toLowerCase();

    await db.updateObject('$__image', { display_name: newName }, { file_id });
    const response = {
      status: 'ok',
      message: 'File renamed successfully.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async renameDir(req: ServerRequest, res: ServerResponse) {
    const currentDir = decodeURIComponent(req.locals.query.get('p') || '');
    let newName = decodeURIComponent(req.locals.query.get('n') || '');
    if (!currentDir || !newName || this.hasSlash(newName)) {
      const response = {
        status: 'error',
        message: 'Wrong data.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const db = apiCache.getDb();
    const records = await db.selectObject('$__image_folder', ['*'], {
      full_path: currentDir,
    });
    if (records.length !== 1) {
      const response = {
        status: 'error',
        message: 'Directory not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    await db.updateObject('$__image_folder', { display_name: newName }, { full_path: currentDir });
    const response = {
      status: 'ok',
      message: 'Directory renamed successfully.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}
