// initApp should be called before any other logics, so need to avoid `export default new Class()`
import * as path from 'path';
import {
  CryptoUtils,
  HostToPathProps,
  appStart,
  bindRenderPageFunctions,
  getDefaultDbConfig,
  getRenderPageFunctions,
  loadEnv,
  setAccessControlAllowHost,
} from 'lupine.api';
import { fetchData } from './fetch-data';
import { ServerEnvKeys } from './server-env-keys';

const initAndStartServer = async () => {
  setAccessControlAllowHost(['localhost', '127.0.0.1']);

  const envFile = process.argv.find((i) => i.startsWith('--env='))?.substring(6) || '.env';
  // it can use "#!import file_name" to import another env file
  await loadEnv(envFile);
  bindRenderPageFunctions({ fetchData });

  const dbConfig = { ...getDefaultDbConfig() };
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const apps = (process.env[ServerEnvKeys.APPS] || '').split(',');
  const webRootMap: HostToPathProps[] = [];

  const domainCerts: Record<string, { key: string; cert: string }> = {};
  for (const app of apps) {
    const appHosts = process.env[`${ServerEnvKeys.DOMAINS}:${app}`] || '';
    const dbFilename =
      process.env[`${ServerEnvKeys.DB_FILENAME}:${app}`] || process.env[`${ServerEnvKeys.DB_FILENAME}`] || 'sqlite3.db';
    webRootMap.push({
      appName: app,
      hosts: appHosts ? appHosts.split(',') : [],
      // web, data, api folders should be created in building process
      webPath: path.join(serverRootPath, app + '_web'),
      dataPath: path.join(serverRootPath, app + '_data'),
      apiPath: path.join(serverRootPath, app + '_api'),
      dbType: process.env[`${ServerEnvKeys.DB_TYPE}:${app}`] || process.env[`${ServerEnvKeys.DB_TYPE}`] || 'sqlite',
      dbConfig: { ...dbConfig, filename: dbFilename },
    });

    const appDomains = appHosts.split(',');
    for (const domain of appDomains) {
      domainCerts[domain] = {
        key: process.env[`${ServerEnvKeys.SSL_KEY_PATH}:${app}`] || '',
        cert: process.env[`${ServerEnvKeys.SSL_CRT_PATH}:${app}`] || '',
      };
    }
  }

  const bindIp = process.env[ServerEnvKeys.BIND_IP] || '::';
  // 0 to disable http/https server
  const httpPort = Number.parseInt(process.env[ServerEnvKeys.HTTP_PORT] || '8080');
  const httpsPort = Number.parseInt(process.env[ServerEnvKeys.HTTPS_PORT] || '8443');
  const sslKeyPath = process.env[ServerEnvKeys.SSL_KEY_PATH] || '';
  const sslCrtPath = process.env[ServerEnvKeys.SSL_CRT_PATH] || '';

  // Can't use log until initApp is called (after AppStart.start)
  await appStart.start({
    debug: process.env[ServerEnvKeys.NODE_ENV] === 'development',
    devToken: CryptoUtils.sha256(process.env['DEV_TOKEN'] || ''),
    appEnvFile: envFile,
    renderPageFunctions: getRenderPageFunctions(),
    apiConfig: {
      serverRoot: `${serverRootPath}`,
      webHostMap: webRootMap,
    },
    serverConfig: {
      bindIp,
      httpPort,
      httpsPort,
      sslKeyPath,
      sslCrtPath,
      domainCerts,
    },
  });
};
initAndStartServer();
