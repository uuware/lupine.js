import cluster from 'cluster';
import { WebProcessor } from './web-processor';
import { appHelper } from './app-helper';
import { processMessageFromPrimary, processMessageFromWorker } from './app-message';
import { WebServer } from './web-server';
import { processDevRequests } from './process-dev-requests';
import { appCache } from './app-cache';
import { AppStartProps, InitStartProps, AppCacheGlobal, AppCacheKeys } from '../models';
import { appStorage } from './app-shared-storage';
import { HostToPath } from './host-to-path';
import { _exitApp, cleanupAndExit } from './cleanup-exit';
import { receiveMessageFromLoader } from './app-message';

// Don't use logger before set process message
class AppStart {
  debug: boolean = false;
  webServer: WebServer | undefined;

  getWorkerId() {
    return cluster.worker ? cluster.worker.id : -1;
  }

  async start(props: AppStartProps, webServer?: WebServer) {
    // if it's started from spawn, wait for old master to clear ports
    if (cluster.isPrimary && process.env.RESTARTING === '1') {
      console.log(`New app ${process.pid} RESTARTING.`);
      await new Promise((r) => setTimeout(r, 100));
    }

    this.debug = props.debug;
    this.bindProcess();

    appCache.set(AppCacheGlobal, AppCacheKeys.APP_DEBUG, props.debug);
    // appCache.set(AppCacheGlobal, AppCacheKeys.APP_ENV_FILE, props.appEnvFile);
    appCache.set(AppCacheGlobal, AppCacheKeys.START_TIME, new Date());
    appCache.set(AppCacheGlobal, AppCacheKeys.RENDER_PAGE_FUNCTIONS, props.renderPageFunctions);
    const appsList = props.apiConfig.webHostMap.map((item) => item.appName);
    appCache.set(AppCacheGlobal, AppCacheKeys.APP_LIST, appsList);

    this.webServer = webServer || new WebServer();

    // call the Logger after initLog
    console.log(
      `${process.pid} - ${
        cluster.isPrimary ? 'Primary Process' : 'Worker Process'
      }, Starting Server, path: ${process.cwd()}`
    );

    // when it's cluster.isPrimary or props.debug, initialize the shared storage first
    if (cluster.isPrimary) {
      for (let appConfig of props.apiConfig.webHostMap) {
        await appStorage.load(appConfig.appName, appConfig.dataPath);
      }
    }

    if (!cluster.isPrimary) {
      console.log(`${process.pid} - Worker id ${this.getWorkerId()}`);

      process.on('message', processMessageFromPrimary);

      HostToPath.setHostToPathList(props.apiConfig.webHostMap);
      appHelper.loadApi(props.apiConfig);
      this.initServer(props.serverConfig);
    } else if (cluster.isPrimary) {
      const numCPUs = props.debug ? 1 : require('os').cpus().length;
      console.log(`${process.pid} - Primary Process is trying to fork ${numCPUs} processes`);

      receiveMessageFromLoader();

      for (let i = 0; i < numCPUs; i++) {
        let worker = cluster.fork();
        worker.on('message', processMessageFromWorker);
      }

      cluster.on('death', (worker: any) => {
        if (!_exitApp.isExiting) {
          console.log(`${worker.pid} - Worker died; starting a new one...`);
          cluster.fork();
        } else {
          console.log(`${worker.pid} - Worker exited during restart`);
        }
      });
    }
  }

  bindProcess() {
    if (cluster.isPrimary) {
      // it looks like the child processes are hung up here
      process.stdin.resume(); // so the program will not close instantly, keep isPrimary process running
    }
    // Emitted whenever a no-error-handler Promise is rejected
    process.on('unhandledRejection', (reason: string, promise) => {
      console.error(`${process.pid} - Process on unhandledRejection, promise: `, promise, ', reason: ', reason);
    });

    // do something when app is closing
    process.on('beforeExit', async () => {
      await cleanupAndExit();
    });
    process.on('exit', (ret) => {
      console.log(`${process.pid} - Process on exit, code: ${ret}`);
    });
    // catches uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
      console.error(`${process.pid} - Process on uncaughtException: `, err);
      console.error(err.stack);
    });
    // catches ctrl+c event and others
    ['SIGTERM', 'SIGHUP', 'SIGINT', 'SIGBREAK'].forEach((evt) => process.on(evt, cleanupAndExit));
  }

  async initServer(config: InitStartProps) {
    const bindIp = config.bindIp || '::';
    const httpPort = config.httpPort;
    const httpsPort = config.httpsPort;
    const sslKeyPath = config.sslKeyPath || '';
    const sslCrtPath = config.sslCrtPath || '';

    console.log(`${process.pid} - Starting Web Server, httpPort: ${httpPort}, httpsPort: ${httpsPort}`);
    // for dev to refresh the FE or stop the server
    if (this.debug) {
      WebProcessor.enableDebug('/debug', processDevRequests);
    }

    const httpServer = httpPort && this.webServer!.startHttp(httpPort, bindIp);
    const heepsServer = httpsPort && this.webServer!.startHttps(httpsPort, bindIp, sslKeyPath, sslCrtPath);

    process.on('SIGTERM', () => {
      console.log(`${process.pid} - Worker closing servers...`);
      httpServer && httpServer.close();
      heepsServer && heepsServer.close();
    });
  }
}

export const appStart = /* @__PURE__ */ new AppStart();
