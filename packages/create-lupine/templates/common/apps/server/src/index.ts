// initApp should be called before any other logics, so need to avoid `export default new Class()`
import * as path from 'path';
import {
  CryptoUtils,
  HostToPathProps,
  appStart,
  getDefaultDbConfig,
  loadEnv,
  setAccessControlAllowHost,
} from 'lupine.api/server';
import { ServerEnvKeys } from './server-env-keys';

const initAndStartServer = async () => {
  const envFile = process.argv.find((i) => i.startsWith('--env='))?.substring(6) || '.env';
  // it can use "#!import file_name" to import another env file
  await loadEnv(envFile);

  const dbConfig = { ...getDefaultDbConfig() };
  const serverRootPath = path.resolve(process.env[ServerEnvKeys.SERVER_ROOT_PATH]!);
  const apps = (process.env[ServerEnvKeys.APPS] || '').split(',');
  const webRootMap: HostToPathProps[] = [];
  const accessControlAllowHosts = new Set(['localhost', '127.0.0.1']);

  const domainCerts: Record<string, { key: string; cert: string }> = {};
  for (const app of apps) {
    const appHosts = (process.env[`${ServerEnvKeys.DOMAINS}:${app}`] || '')
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    appHosts.forEach((host) => accessControlAllowHosts.add(host));
    const dbFilename =
      process.env[`${ServerEnvKeys.DB_FILENAME}:${app}`] || process.env[`${ServerEnvKeys.DB_FILENAME}`] || 'sqlite3.db';

    const DB_TYPE = process.env[`${ServerEnvKeys.DB_TYPE}:${app}`] || process.env[`${ServerEnvKeys.DB_TYPE}`] || 'sqlite';
    const DB_HOST = process.env[`${ServerEnvKeys.DB_HOST}:${app}`] || process.env[`${ServerEnvKeys.DB_HOST}`] || '';
    const DB_PORT = process.env[`${ServerEnvKeys.DB_PORT}:${app}`] || process.env[`${ServerEnvKeys.DB_PORT}`] || '0';
    const DB_USER = process.env[`${ServerEnvKeys.DB_USER}:${app}`] || process.env[`${ServerEnvKeys.DB_USER}`] || '';
    const DB_DATABASE = process.env[`${ServerEnvKeys.DB_DATABASE}:${app}`] || process.env[`${ServerEnvKeys.DB_DATABASE}`] || '';
    const DB_PASSWORD = process.env[`${ServerEnvKeys.DB_PASSWORD}:${app}`] || process.env[`${ServerEnvKeys.DB_PASSWORD}`] || '';
    const DB_TABLE_PREFIX = process.env[`${ServerEnvKeys.DB_TABLE_PREFIX}:${app}`] || process.env[`${ServerEnvKeys.DB_TABLE_PREFIX}`] || '';

    webRootMap.push({
      appName: app,
      hosts: appHosts,
      // web, data, api folders should be created in building process
      webPath: path.join(serverRootPath, app + '_web'),
      dataPath: path.join(serverRootPath, app + '_data'),
      apiPath: path.join(serverRootPath, app + '_api'),
      dbType: DB_TYPE,
      dbConfig: {
        ...dbConfig,
        type: DB_TYPE,
        filename: dbFilename,
        host: DB_HOST,
        port: Number(DB_PORT) || 0,
        user: DB_USER,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        tablePrefix: DB_TABLE_PREFIX,
      },
    });

    for (const domain of appHosts) {
      domainCerts[domain] = {
        key: process.env[`${ServerEnvKeys.SSL_KEY_PATH}:${app}`] || '',
        cert: process.env[`${ServerEnvKeys.SSL_CRT_PATH}:${app}`] || '',
      };
    }
  }
  setAccessControlAllowHost([...accessControlAllowHosts]);

  const bindIp = process.env[ServerEnvKeys.BIND_IP] || '::';
  // 0 to disable http/https server
  const httpPort = Number.parseInt(process.env[ServerEnvKeys.HTTP_PORT] || '0');
  const httpsPort = Number.parseInt(process.env[ServerEnvKeys.HTTPS_PORT] || '0');
  const sslKeyPath = process.env[ServerEnvKeys.SSL_KEY_PATH] || '';
  const sslCrtPath = process.env[ServerEnvKeys.SSL_CRT_PATH] || '';

  // Can't use log until initApp is called (after AppStart.start)
  await appStart.start({
    debug: process.env[ServerEnvKeys.NODE_ENV] === 'development',
    devToken: CryptoUtils.sha256(process.env['DEV_TOKEN'] || ''),
    appEnvFile: envFile,
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
