import cluster from 'cluster';
import { Logger } from '../lib/logger';
import { ServerResponse } from 'http';
import { AddressInfo } from 'net';
import { appHelper } from './app-helper';
import { DebugService } from '../api/debug-service';
import { AppCacheGlobal, AppCacheKeys, getAppCache, ServerRequest } from '../models';
import { cleanupAndExit } from './cleanup-exit';
import { ShellService } from '../api/shell-service';
const logger = new Logger('process-dev-requests');

function deleteRequireCache(moduleName: string) {
  var solvedName = require.resolve(moduleName),
    nodeModule = require.cache[solvedName];
  if (nodeModule) {
    for (var i = 0; i < nodeModule.children.length; i++) {
      var child = nodeModule.children[i];
      deleteRequireCache(child.filename);
    }
    delete require.cache[solvedName];
  }
}

// this is a worker and msg is from Primary
// when debug is on, it's in primary, but it shouldn't receive those msgs
export const processDebugMessage = async (msgObject: any) => {
  logger.info(`processDebugMessage, id: ${msgObject && msgObject.id}, message: ${msgObject && msgObject.message}`);
  if (msgObject.id === 'debug' && msgObject.message === 'refresh') {
    if (msgObject.appName) {
      const appConfig = getAppCache().get(msgObject.appName, AppCacheKeys.API_CONFIG);
      appHelper.refreshApi(appConfig);
    } else {
      // refresh all in a worker (app scope)
      let appList = getAppCache().get(AppCacheGlobal, AppCacheKeys.APP_LIST);
      for (const appName of appList) {
        const appConfig = getAppCache().get(appName, AppCacheKeys.API_CONFIG);
        appHelper.refreshApi(appConfig);
      }
    }

    // TemplateCache should be only used in api scope, so shouldn't clear it here
    // apiCache.clearTemplateCache();

    // this only works in debug mode (no clusters)
    DebugService.broadcastRefresh();
  }
  if (msgObject.id === 'debug' && msgObject.message === 'shutdown') {
    // Only when it's debug mode, it can go here, otherwise shutdown should be processed in processMessageFromWorker
    console.log(`${process.pid} - [server] Received shutdown command.`);
    await cleanupAndExit();
  }
};

export async function processRefreshCache(req: ServerRequest) {
  // if this is a child process, we need to notice parent process to broadcast to all clients
  if (!cluster.isPrimary && process.send) {
    const appName = req.locals.query.get('appName');
    process.send({ id: 'debug', message: 'refresh', appName });
  }
  // in case if it's only one process (primary process)
  else {
    // if (getAppCache().get(APP_GLOBAL, AppCacheKeys.API_DEBUG) === true)
    const appName = req.locals.query.get('appName');
    processDebugMessage({ id: 'debug', message: 'refresh', appName });
  }
}

export async function processRestartApp(req: ServerRequest) {
  // if this is a child process, we need to notice parent process to broadcast to all clients
  if (!cluster.isPrimary && process.send) {
    // send message to Primary to handle it
    process.send({ id: 'debug', message: 'restartApp' });
  }
  // in case if it's only one process (primary process)
  else {
    sendRestartAppMsgToLoader();
  }
}

export async function processShell(req: ServerRequest) {
  const data = req.locals.json();
  if (!data || Array.isArray(data) || !data.cmd) {
    return 'Wrong data.';
  }
  const cmd = data.cmd as string;
  const shell = await ShellService.directCmd(cmd);
  return shell;
}

// this is called from a request in debug mode
export async function processDevRequests(req: ServerRequest, res: ServerResponse, rootUrl?: string) {
  res.end();
  const address = req.socket.address() as AddressInfo;
  if (address.address !== '127.0.0.1') {
    console.log(`${process.pid} - [server] Ignore request from: `, req.url, address.address);
    return true;
  }
  if (req.url === '/debug/shutdown') {
    console.log(`${process.pid} - [server] Received shutdown command.`);
    if (process.send) {
      // send to parent process to kill all
      process.send({ id: 'debug', message: 'shutdown' });
    }
    // if it's debug mode (only one process)
    else if (getAppCache().get(AppCacheGlobal, AppCacheKeys.APP_DEBUG) === true) {
      await processDebugMessage({ id: 'debug', message: 'shutdown' });
    }
  } else if (req.url === '/debug/refresh') {
    await processRefreshCache(req);
  }
  // else if (req.url === '/debug/client') {
  // }
  return true;
}

// this is called from a request and passes the restartApp message to loader
export const sendRestartAppMsgToLoader = async () => {
  if (!cluster.isPrimary) {
    console.warn(`restartApp: shouldn't come here`);
    return;
  }

  if (!process.send) {
    console.log(`${process.pid} - The primary process is not focked from loader, so cannot restart.`);
  } else {
    console.log(`${process.pid} - Old app sends restartApp to loader (${process.execPath})`);

    process.send({ id: 'debug', message: 'restartApp' });
  }
};
