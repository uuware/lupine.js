import { ServerResponse } from 'http';
import {
  IApiBase,
  Logger,
  apiCache,
  ServerRequest,
  ApiRouter,
  ApiHelper,
  langHelper,
  FsUtils,
  adminApiHelper,
  apiStorage,
  IWebServer,
  AppCacheGlobal,
  AppCacheKeys,
  getAppCache,
  DEV_ADMIN_USER_KEY_NAME,
  DEV_ADMIN_PASS_KEY_NAME,
  CryptoUtils,
} from 'lupine.api';
import path from 'path';
import zlib from 'zlib';
import { needDevAdminSession } from './admin-auth';
import { adminTokenHelper } from './admin-token-helper';

const releaseProgress = 'admin-release-progress';
export class AdminRelease implements IApiBase {
  private logger = new Logger('release-api');
  protected router = new ApiRouter();

  constructor() {
    this.mountDashboard();
  }

  public getRouter(): ApiRouter {
    return this.router;
  }

  protected mountDashboard() {
    // called by FE
    this.router.use('/check', needDevAdminSession, this.check.bind(this));
    this.router.use('/update', needDevAdminSession, this.callUpdate.bind(this));
    this.router.use('/progress', needDevAdminSession, this.getProgress.bind(this));
    this.router.use('/view-log', needDevAdminSession, this.viewLog.bind(this));
    this.router.use('/tail-log', needDevAdminSession, this.tailLog.bind(this));
    // called online or by clients
    this.router.use('/refresh-cache', needDevAdminSession, this.refreshCache.bind(this));
    this.router.use('/restart-app', needDevAdminSession, this.restartApp.bind(this));
    this.router.use('/reload-certs', needDevAdminSession, this.reloadCerts.bind(this));

    this.router.use('/shell', needDevAdminSession, this.shell.bind(this));

    // ...ByClient will verify credentials from post, so it doesn't need AdminSession
    this.router.use('/byClientCheck', this.byClientCheck.bind(this));
    this.router.use('/byClientUpdate', this.byClientUpdate.bind(this));
    this.router.use('/byClientRefreshCache', this.byClientRefreshCache.bind(this));
    this.router.use('/byClientRestartApp', this.byClientRestartApp.bind(this));
    this.router.use('/byClientReloadCerts', this.byClientReloadCerts.bind(this));
    this.router.use('/byClientViewLog', this.byClientViewLog.bind(this));
    this.router.use('/byClientTailLog', this.byClientTailLog.bind(this));

    this.router.use('/byClientShell', this.byClientShell.bind(this));
  }

  async viewLog(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientViewLog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // (remoteData.body as any).pipe(res);
    const data2 = await remoteData.text();
    // res.setHeader('Content-Disposition', 'attachment; filename="log.txt"');
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    res.write(data2);
    res.end();
    return true;
  }

  async byClientViewLog(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    const appData = apiCache.getAppData();
    const logFile = path.join(appData.apiPath, '../../log', data.logName);
    if (!(await FsUtils.pathExist(logFile))) {
      const response = {
        status: 'error',
        message: 'Log file not found.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }
    ApiHelper.sendFile(req, res, logFile);
    return true;
  }

  async tailLog(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    if (jsonData && !Array.isArray(jsonData) && jsonData.isLocal) {
      const result = await this.readLogTail(jsonData);
      ApiHelper.sendJson(req, res, result);
      return true;
    }

    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientTailLog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }
    ApiHelper.sendJson(req, res, remoteResult);
    return true;
  }

  async byClientTailLog(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    const result = await this.readLogTail(data);
    ApiHelper.sendJson(req, res, result);
    return true;
  }

  async readLogTail(data: {
    logName?: string;
    offset?: number;
    maxBytes?: number;
    initialBytes?: number;
    fileId?: string;
  }) {
    try {
      const appData = apiCache.getAppData();
      const logDir = path.join(appData.apiPath, '../../log');
      const activeLogName = data.logName || 'log-0.log';
      const filePath0 = path.join(logDir, activeLogName);

      // Determine previous rolled log file name (e.g. log-0.log -> log-1.log)
      let rolledLogName = 'log-1.log';
      const match = activeLogName.match(/^log-(\d+)\.log$/);
      if (match) {
        rolledLogName = `log-${parseInt(match[1], 10) + 1}.log`;
      }
      const filePath1 = path.join(logDir, rolledLogName);

      const stat0 = await FsUtils.fileStat(filePath0);
      if (!stat0) {
        return {
          status: 'ok',
          content: '',
          offset: 0,
          size: 0,
          rotated: false,
          fileId: '',
          logName: activeLogName,
        };
      }

      const currentFileId = `${stat0.ino}_${stat0.birthtimeMs || stat0.ctimeMs || stat0.mtimeMs}`;
      const size0 = stat0.size;
      const maxBytes = Math.min(Math.max(data.maxBytes || 64 * 1024, 1), 512 * 1024);
      const initialBytes = Math.min(Math.max(data.initialBytes || 100 * 1024, 1), 500 * 1024);

      // Initial Tail Request (offset is undefined or < 0)
      if (typeof data.offset !== 'number' || data.offset < 0) {
        if (size0 >= initialBytes) {
          const start = size0 - initialBytes;
          const buf = await FsUtils.readByteRange(filePath0, start, initialBytes);
          return {
            status: 'ok',
            content: buf.toString('utf8'),
            offset: size0,
            size: size0,
            rotated: false,
            fileId: currentFileId,
            logName: activeLogName,
          };
        }

        // size0 < initialBytes: read all of file0 + tail of file1 if exists
        const buf0 = await FsUtils.readByteRange(filePath0, 0, size0);
        let part1 = '';
        const stat1 = await FsUtils.fileStat(filePath1);
        if (stat1 && stat1.size > 0) {
          const needed = initialBytes - size0;
          const start1 = Math.max(0, stat1.size - needed);
          const len1 = stat1.size - start1;
          const buf1 = await FsUtils.readByteRange(filePath1, start1, len1);
          part1 = buf1.toString('utf8');
        }

        return {
          status: 'ok',
          content: part1 + buf0.toString('utf8'),
          offset: size0,
          size: size0,
          rotated: false,
          fileId: currentFileId,
          logName: activeLogName,
        };
      }

      // Differential Pull Request (offset >= 0)
      const clientOffset = data.offset;
      const clientFileId = data.fileId;
      const isRotated = size0 < clientOffset || (Boolean(clientFileId) && clientFileId !== currentFileId);

      if (isRotated) {
        // Rotation detected!
        // 1. Read remaining tail from filePath1 (the rolled file)
        let chunk1 = '';
        const stat1 = await FsUtils.fileStat(filePath1);
        if (stat1 && stat1.size > clientOffset) {
          const readLen1 = Math.min(maxBytes, stat1.size - clientOffset);
          const buf1 = await FsUtils.readByteRange(filePath1, clientOffset, readLen1);
          chunk1 = buf1.toString('utf8');
        }

        // 2. Read new head from filePath0 (the new file)
        let chunk0 = '';
        const budgetRemaining = Math.max(0, maxBytes - Buffer.byteLength(chunk1, 'utf8'));
        const readLen0 = Math.min(budgetRemaining, size0);
        if (readLen0 > 0) {
          const buf0 = await FsUtils.readByteRange(filePath0, 0, readLen0);
          chunk0 = buf0.toString('utf8');
        }

        return {
          status: 'ok',
          content: chunk1 + chunk0,
          offset: readLen0,
          size: size0,
          rotated: true,
          fileId: currentFileId,
          logName: activeLogName,
        };
      }

      // No rotation
      if (size0 === clientOffset) {
        return {
          status: 'ok',
          content: '',
          offset: clientOffset,
          size: size0,
          rotated: false,
          fileId: currentFileId,
          logName: activeLogName,
        };
      }

      // size0 > clientOffset
      const readLen = Math.min(maxBytes, size0 - clientOffset);
      const buf = await FsUtils.readByteRange(filePath0, clientOffset, readLen);
      const newOffset = clientOffset + buf.length;
      return {
        status: 'ok',
        content: buf.toString('utf8'),
        offset: newOffset,
        size: size0,
        rotated: false,
        fileId: currentFileId,
        logName: activeLogName,
      };
    } catch (e: any) {
      this.logger.error('readLogTail error', e);
      return {
        status: 'error',
        message: e?.message || 'Failed to read log tail',
      };
    }
  }

  async refreshCache(req: ServerRequest, res: ServerResponse) {
    // check whether it's from online admin
    const json = await adminApiHelper.getDevAdminFromCookie(req, res, false);
    const jsonData = req.locals.json();
    if (json && jsonData && !Array.isArray(jsonData) && jsonData.isLocal) {
      await ServerControlProxy.processRefreshCache?.(req);
      const response = {
        status: 'ok',
        message: 'Cache refreshed successfully.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientRefreshCache', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }
    const response = {
      status: 'ok',
      message: 'check.',
      ...remoteResult,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async restartApp(req: ServerRequest, res: ServerResponse) {
    // check whether it's from online admin
    const json = await adminApiHelper.getDevAdminFromCookie(req, res, false);
    const jsonData = req.locals.json();
    if (json && jsonData && !Array.isArray(jsonData) && jsonData.isLocal) {
      await ServerControlProxy.processRestartApp?.();
      const response = {
        status: 'ok',
        message: 'Restart app successfully.',
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientRestartApp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }
    const response = {
      status: 'ok',
      message: 'check.',
      ...remoteResult,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async reloadCerts(req: ServerRequest, res: ServerResponse) {
    const json = await adminApiHelper.getDevAdminFromCookie(req, res, false);
    const jsonData = req.locals.json();
    if (json && jsonData && !Array.isArray(jsonData) && jsonData.isLocal) {
      this.executeReloadCerts(req, res);
      return true;
    }

    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientReloadCerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }
    const response = {
      status: 'ok',
      message: 'check.',
      ...remoteResult,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async shell(req: ServerRequest, res: ServerResponse) {
    // check whether it's from online admin
    const json = await adminApiHelper.getDevAdminFromCookie(req, res, false);
    const jsonData = req.locals.json();
    if (json && jsonData && !Array.isArray(jsonData) && jsonData.isLocal) {
      const result = await ServerControlProxy.processShell?.(req);
      const response = {
        status: 'ok',
        message: 'Shell executed successfully.',
        result,
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientShell', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }
    const response = {
      status: 'ok',
      message: 'check.',
      ...remoteResult,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  public async chkData(data: any, req: ServerRequest, res: ServerResponse, chkCredential: boolean) {
    // add access token
    if (!data || Array.isArray(data) || typeof data !== 'object' || !data.accessToken || !data.targetUrl) {
      const response = {
        status: 'error',
        message: 'Wrong data [missing parameters].', //langHelper.getLang('shared:wrong_data'),
      };
      ApiHelper.sendJson(req, res, response);
      return false;
    }
    if (chkCredential) {
      if (await adminTokenHelper.validateToken(data.accessToken)) {
        return data;
      }
      if (
        process.env[DEV_ADMIN_PASS_KEY_NAME] &&
        process.env[DEV_ADMIN_USER_KEY_NAME] &&
        data.accessToken.startsWith(process.env[DEV_ADMIN_USER_KEY_NAME] + ':')
      ) {
        // Basic Auth: username:password
        const token = data.accessToken.substring(process.env[DEV_ADMIN_USER_KEY_NAME].length + 1);
        const singleHash = CryptoUtils.sha256(token);
        const doubleHash = CryptoUtils.sha256(singleHash);
        if (doubleHash === process.env[DEV_ADMIN_PASS_KEY_NAME]) {
          return data;
        }
      }

      const response = {
        status: 'error',
        message: 'Wrong data [wrong token].', //langHelper.getLang('shared:wrong_data'),
      };
      ApiHelper.sendJson(req, res, response);
      return false;
    }
    return data;
  }

  // this is called by the FE, then call byClientCheck to get remote server's information
  async check(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    // From app list is from local
    const appData = apiCache.getAppData();
    const folders = await FsUtils.getDirAndFiles(path.join(appData.apiPath, '..'));
    const apps = folders.filter((app: string) => app.endsWith('_web')).map((app: string) => app.replace('_web', ''));

    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const remoteData = await fetch(targetUrl + '/api/admin/release/byClientCheck', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const resultText = await remoteData.text();
    let remoteResult: any;
    try {
      remoteResult = JSON.parse(resultText);
    } catch (e: any) {
      remoteResult = { status: 'error', message: resultText };
    }

    // local dirs under _web
    const webSub: string[] = [];
    for (let j = 0; j < apps.length; j++) {
      const app = apps[j];
      const appRoot = path.join(appData.apiPath, '..');
      const subFolders = await FsUtils.getDirentFullpath(path.join(appRoot, app + '_web'), 5);
      webSub.push(app + '_web/');
      webSub.push(
        ...subFolders
          .filter((i) => i.isDirectory())
          .map((i) => path.join(i.parentPath.substring(appRoot.length + 1), i.name).replace(/\\/g, '/'))
      );
    }
    // const webSub = webSubFolders.filter(i => i.isDirectory()).map(i => path.join(i.parentPath.substring(appData.webPath.length + 1), i.name).replace(/\\/g, '/')).sort();

    const response = {
      releaseProgress: await apiStorage.get(releaseProgress),
      status: 'ok',
      message: 'check.',
      appsFrom: apps,
      ...remoteResult,
      webSub: webSub, // webSubFolders.filter((folder) => folder.isDirectory()).map((folder) => folder.name),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getFileList(parentPath: string, subFolders: string[]) {
    const subFoldersWithTime = [];
    for (let j = 0; j < subFolders.length; j++) {
      const subFolder = subFolders[j];
      const fileInfo = await FsUtils.fileInfo(path.join(parentPath, subFolder));
      subFoldersWithTime.push({
        name: subFolder,
        time: new Date(fileInfo!.mtime).toLocaleString(),
        size: fileInfo?.size,
        dir: fileInfo?.isDir,
      });
    }
    return subFoldersWithTime;
  }

  // called by clients
  async byClientCheck(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    const appData = apiCache.getAppData();
    const folders = await FsUtils.getDirAndFiles(path.join(appData.apiPath, '..'));
    const apps = folders.filter((app: string) => app.endsWith('_web')).map((app: string) => app.replace('_web', ''));

    const foldersWithTime = [];
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];
      const subFolders = await FsUtils.getDirAndFiles(path.join(appData.apiPath, '..', folder));
      const subFoldersWithTime = await this.getFileList(path.join(appData.apiPath, '..', folder), subFolders);
      const fileInfo = await FsUtils.fileInfo(path.join(appData.apiPath, '..', folder));
      foldersWithTime.push({
        name: folder,
        time: new Date(fileInfo!.mtime).toLocaleString(),
        items: subFoldersWithTime,
        dir: fileInfo?.isDir,
      });
    }

    const logFolders = await FsUtils.getDirAndFiles(path.join(appData.apiPath, '../../log'));
    const logFoldersWithTime = await this.getFileList(path.join(appData.apiPath, '../../log'), logFolders);
    const response = {
      status: 'ok',
      message: 'Remote server information called from a client.',
      appData: appData as any,
      apps,
      folders,
      foldersWithTime,
      logs: logFoldersWithTime,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async getProgress(req: ServerRequest, res: ServerResponse) {
    const rawProgress = await apiStorage.get(releaseProgress);
    let progressData = null;
    if (rawProgress) {
      try {
        progressData = typeof rawProgress === 'string' ? JSON.parse(rawProgress) : rawProgress;
      } catch {
        progressData = { status: 'processing', message: String(rawProgress) };
      }
    }
    ApiHelper.sendJson(req, res, { status: 'ok', data: progressData });
    return true;
  }

  async callUpdate(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, false);
    if (!data) return true;

    if (!data.chkServer && !data.chkApi && !data.chkWeb && !data.chkEnv && (!data.webSubs || data.webSubs.length === 0)) {
      const response = {
        status: 'error',
        message: langHelper.getLang('shared:wrong_data'),
      };
      ApiHelper.sendJson(req, res, response);
      return true;
    }

    // Set initial progress
    const initProgress = {
      status: 'processing',
      progress: 0,
      message: 'Update task started...',
      time: Date.now(),
    };
    await apiStorage.set(releaseProgress, JSON.stringify(initProgress));

    // Start async background execution to avoid HTTP timeout
    setTimeout(async () => {
      try {
        await this.doUpdateAsync(data);
        await apiStorage.set(
          releaseProgress,
          JSON.stringify({
            status: 'ok',
            progress: 100,
            message: 'Update completed successfully.',
            time: Date.now(),
          })
        );
      } catch (e: any) {
        this.logger.error(`Update failed: ${e.message}`);
        await apiStorage.set(
          releaseProgress,
          JSON.stringify({
            status: 'error',
            progress: 100,
            message: e.message || 'Update failed.',
            time: Date.now(),
          })
        );
      }
    }, 20);

    const response = {
      status: 'ok',
      message: 'Update task submitted and running in background.',
      started: true,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async doUpdateAsync(data: any) {
    const appData = apiCache.getAppData();
    let targetUrl = data.targetUrl as string;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    if (data.chkEnv) {
      const result = await this.updateSendFile(data, '.env');
      if (!result || result.status !== 'ok') {
        throw new Error(result?.message || 'Failed to send .env');
      }
      const result2 = await this.updateSendFile(data, '.env.development');
      if (!result2 || result2.status !== 'ok') {
        throw new Error(result2?.message || 'Failed to send .env.development');
      }
      const result3 = await this.updateSendFile(data, '.env.production');
      if (!result3 || result3.status !== 'ok') {
        throw new Error(result3?.message || 'Failed to send .env.production');
      }
    }

    if (data.webSubs && data.webSubs.length > 0) {
      const subTop = path.join(appData.apiPath, '..', data.fromList + '_web/');
      for (let i = 0; i < data.webSubs.length; i++) {
        if (!data.webSubs[i].startsWith(data.fromList + '_web/')) {
          throw new Error(`Error: ${data.webSubs[i]} is not under ${data.fromList}`);
        }
        const subFolders = await FsUtils.getDirentFullpath(path.join(appData.apiPath, '..', data.webSubs[i]));
        const subFiles = subFolders
          .filter((e) => e.isFile())
          .map((e) => path.join(e.parentPath.substring(subTop.length), e.name).replace(/\\/g, '/'))
          .sort();
        for (let j = 0; j < subFiles.length; j++) {
          if (subFiles[j].endsWith('.js.map') || subFiles[j].endsWith('.css.map')) {
            continue;
          }
          data.webSub = subFiles[j];
          this.logger.info(`update, webSubs: ${data.webSubs[i]}, subFiles: ${subFiles[j]})`);
          const result2 = await this.updateSendFile(data, 'web-sub');
          if (!result2 || result2.status !== 'ok') {
            throw new Error(result2?.message || `Failed to send web sub: ${subFiles[j]}`);
          }
        }
      }
    }

    if (data.chkApi) {
      const result = await this.updateSendFile(data, 'api');
      if (!result || result.status !== 'ok') {
        throw new Error(result?.message || 'Failed to send api');
      }
    }

    // update server at the last
    if (data.chkServer) {
      const result = await this.updateSendFile(data, 'server');
      if (!result || result.status !== 'ok') {
        throw new Error(result?.message || 'Failed to send server');
      }
      const result2 = await this.updateSendFile(data, 'server-loader');
      if (!result2 || result2.status !== 'ok') {
        throw new Error(result2?.message || 'Failed to send server-loader');
      }
    }

    this.logger.info(`updated, successful`);
  }

  async updateSendFile(data: any, chkOption: string) {
    let targetUrl = data.targetUrl;
    if (targetUrl.endsWith('/')) {
      targetUrl = targetUrl.slice(0, -1);
    }
    const fromList = data.fromList;
    const appData = apiCache.getAppData();
    let sendFile = '';
    if (chkOption === 'server') {
      sendFile = path.join(appData.apiPath, '..', 'server', 'index.js');
    } else if (chkOption === 'server-loader') {
      sendFile = path.join(appData.apiPath, '..', 'server', 'server-loader.js');
    } else if (chkOption === 'api') {
      sendFile = path.join(appData.apiPath, '..', fromList + '_api', 'index.js');
    } else if (chkOption === 'web-sub' && data.webSub) {
      sendFile = path.join(appData.apiPath, '..', fromList + '_web', data.webSub);
    } else if (chkOption.startsWith('.env')) {
      sendFile = path.join(appData.apiPath, '../../..', chkOption);
    }
    if (!(await FsUtils.pathExist(sendFile))) {
      this.logger.error(`updateSendFile, not found: ${sendFile}`);
      return { status: 'error', message: 'Client file not found: ' + sendFile };
    }
    const fileBuffer = await require('fs/promises').readFile(sendFile);
    const chunkSize = 1024 * 500;

    let isCompressed = false;
    let fileBufferToSend: any = fileBuffer;
    let tempSendFile = '';

    if (
      fileBuffer.length > 1024 * 10 &&
      (sendFile.endsWith('.js') || sendFile.endsWith('.css') || sendFile.endsWith('.html'))
    ) {
      fileBufferToSend = await new Promise<Buffer>((resolve, reject) => {
        zlib.gzip(fileBuffer, (err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        });
      });
      tempSendFile = sendFile + '.tmp';
      await require('fs/promises').writeFile(tempSendFile, fileBufferToSend);
      isCompressed = true;
    }

    const totalChunks = Math.ceil(fileBufferToSend.length / chunkSize);
    let cnt = 0;
    this.logger.info(
      `updateSendFile, sendFile: ${sendFile}, original len: ${fileBuffer.length}, send len: ${fileBufferToSend.length}`
    );
    for (let i = 0; i < fileBufferToSend.length; i += chunkSize) {
      let chunk: any = fileBufferToSend.subarray(i, i + chunkSize);
      if (!chunk || chunk.length === 0) break;

      const headerStr =
        JSON.stringify({ ...data, chkOption, index: cnt, totalChunks, size: fileBuffer.length, isCompressed }) + '\n\n';
      const postBody = Buffer.concat([Buffer.from(headerStr), chunk]);

      const postData = {
        method: 'POST',
        body: postBody,
      };
      const uncompressedProgress = Math.min(fileBufferToSend.length, i + chunkSize);
      const pct = Math.round((uncompressedProgress / fileBufferToSend.length) * 100);
      const filename = path.basename(sendFile);
      const progMsg = `Sending ${filename} [${cnt + 1}/${totalChunks}] (${(uncompressedProgress / 1024).toFixed(1)}KB / ${(fileBufferToSend.length / 1024).toFixed(1)}KB, ${pct}%)`;

      this.logger.info(
        `updateSendFile, index: ${cnt}, sending: ${chunk.length} (compressed: ${isCompressed}), progress: ${uncompressedProgress} / ${fileBufferToSend.length}, f: ${sendFile}`
      );
      await apiStorage.set(
        releaseProgress,
        JSON.stringify({
          status: 'processing',
          progress: pct,
          message: progMsg,
          currentFile: filename,
          time: Date.now(),
        })
      );
      i > 0 && (await new Promise((resolve) => setTimeout(resolve, 1000)));
      const remoteData = await fetch(targetUrl + '/api/admin/release/byClientUpdate', postData as any);
      const resultText = await remoteData.text();
      this.logger.info(`updateSendFile, index: ${cnt}, resultText: ${resultText}`);
      let remoteResult: any;
      try {
        remoteResult = JSON.parse(resultText);
      } catch (e: any) {
        remoteResult = { status: 'error', message: resultText };
      }
      if (!remoteResult || remoteResult.status !== 'ok') {
        if (tempSendFile)
          await require('fs/promises')
            .unlink(tempSendFile)
            .catch(() => { });
        return remoteResult;
      }
      cnt++;
    }

    if (tempSendFile) {
      await require('fs/promises')
        .unlink(tempSendFile)
        .catch(() => { });
    }

    const remoteResult = { status: 'ok', message: 'updated' };
    return remoteResult;
  }

  // called by clients
  async byClientUpdate(req: ServerRequest, res: ServerResponse) {
    const body = req.locals.body as Buffer;
    let jsonData: any = {};
    let fileContent: Buffer | null = null;
    try {
      const index = body.indexOf('\n\n');
      if (index !== -1) {
        jsonData = JSON.parse(body.subarray(0, index).toString());
        fileContent = body.subarray(index + 2);
      }
      const data = await this.chkData(jsonData, req, res, true);
      if (!data) return true;

      const toList = data.toList as string;
      const chkOption = data.chkOption as string;
      if (
        !chkOption ||
        !toList ||
        (chkOption !== 'server' &&
          chkOption !== 'server-loader' &&
          chkOption !== 'api' &&
          // chkOption !== 'web' &&
          chkOption !== 'web-sub' &&
          !chkOption.startsWith('.env'))
      ) {
        const response = {
          status: 'error',
          message: 'Wrong data.',
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }

      const appData = apiCache.getAppData();
      let saveFile = '';
      if (chkOption === 'server') {
        saveFile = path.join(appData.apiPath, '..', 'server', 'index.js');
      } else if (chkOption === 'server-loader') {
        saveFile = path.join(appData.apiPath, '..', 'server', 'server-loader.js');
      } else if (chkOption === 'api') {
        saveFile = path.join(appData.apiPath, '..', toList + '_api', 'index.js');
        // } else if (chkOption === 'web') {
        //   saveFile = path.join(appData.apiPath, '..', toList + '_web', 'index.js');
      } else if (chkOption === 'web-sub' && data.webSub) {
        saveFile = path.join(appData.apiPath, '..', toList + '_web', data.webSub);
        const folder = path.dirname(saveFile);
        if (!(await FsUtils.pathExist(folder))) {
          await FsUtils.mkdir(folder);
        }
      } else if ((chkOption as string).startsWith('.env')) {
        saveFile = path.join(appData.apiPath, '../../..', chkOption);
      }
      if (chkOption !== 'web-sub' && !(await FsUtils.pathExist(saveFile))) {
        const response = {
          status: 'error',
          message: 'Server file not found: ' + saveFile,
        };
        ApiHelper.sendJson(req, res, response);
        return true;
      }
      if (data.chkBackup && data.index === 0) {
        const bakContent = await FsUtils.readFile(saveFile);
        if (bakContent) {
          const bakFile = saveFile + '.bak-' + new Date().toISOString().replace(/:/g, '-');
          await FsUtils.writeFile(bakFile, bakContent);
        }
      }

      this.logger.info(
        `byClientUpdate, index: ${data.index}, saveFile: ${saveFile}, received len: ${(fileContent || '').length}`
      );
      // if (data.index === 0) {
      //   await FsUtils.writeFile(saveFile, fileContent || '');
      // } else {
      //   await FsUtils.appendFile(saveFile, fileContent || '');
      // }
      await FsUtils.writeUploadChunk(saveFile, fileContent || '', data.index, data.totalChunks);

      if (data.isCompressed && data.index === data.totalChunks - 1) {
        const tempCompressedFile = saveFile + '.gz.tmp';
        await FsUtils.rename(saveFile, tempCompressedFile);

        const compressedData = await require('fs/promises').readFile(tempCompressedFile);
        const decompressed: any = await new Promise<Buffer>((resolve, reject) => {
          zlib.gunzip(compressedData, (err, buffer) => {
            if (err) reject(err);
            else resolve(buffer);
          });
        });

        await require('fs/promises').writeFile(saveFile, decompressed);
        await require('fs/promises')
          .unlink(tempCompressedFile)
          .catch(() => { });
      }

      const response = {
        status: 'ok',
        message: 'Remote server updated by a client.',
      };
      ApiHelper.sendJson(req, res, response);
    } catch (e: any) {
      console.log('byClientUpdate failed', e);
      const response = {
        status: 'error',
        message: 'byClientUpdate failed',
      };
      ApiHelper.sendJson(req, res, response);
    }
    return true;
  }

  async byClientRefreshCache(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    await ServerControlProxy.processRefreshCache?.(req);
    const response = {
      status: 'ok',
      message: 'Cache refreshed successfully.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async byClientRestartApp(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    await ServerControlProxy.processRestartApp?.();
    const response = {
      status: 'ok',
      message: 'Restart app successfully.',
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  async byClientReloadCerts(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    this.executeReloadCerts(req, res);
    return true;
  }

  private executeReloadCerts(req: ServerRequest, res: ServerResponse) {
    const webServer = getAppCache().get(AppCacheGlobal, AppCacheKeys.WEB_SERVER) as IWebServer;
    if (webServer) {
      webServer.reloadCertificates();
      const response = {
        status: 'ok',
        message: langHelper.getLang('shared:operation_success') || 'Certificates reloaded successfully.',
      };
      ApiHelper.sendJson(req, res, response);
    } else {
      const response = {
        status: 'error',
        message: 'WebServer is not running to accept reloads',
      };
      ApiHelper.sendJson(req, res, response);
    }
  }

  async byClientShell(req: ServerRequest, res: ServerResponse) {
    const jsonData = req.locals.json();
    const data = await this.chkData(jsonData, req, res, true);
    if (!data) return true;

    const result = await ServerControlProxy.processShell?.(req);
    const response = {
      status: 'ok',
      message: 'Shell executed successfully.',
      result,
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }
}

import { ServerControlProxy } from '../api/server-control-proxy';
