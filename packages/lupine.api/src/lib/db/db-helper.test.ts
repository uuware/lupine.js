import test from 'node:test';
import assert from 'node:assert';
import { DbEnvKeys } from '../../models/db-config';
import { DbHelper, getAppDbConfig, getDefaultDbConfig } from './db-helper';

test('DbHelper and db-config test suite', async (t) => {
  const originalEnv = { ...process.env };

  t.afterEach(() => {
    // Reset process.env after each test
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key];
      }
    }
    Object.assign(process.env, originalEnv);
  });

  await t.test('getDefaultDbConfig returns sqlite defaults and sqliteConfig', () => {
    delete process.env[DbEnvKeys.DB_TYPE];
    delete process.env[DbEnvKeys.SQLITE_FILENAME];

    const config = getDefaultDbConfig();
    assert.strictEqual(config.type, 'sqlite');
    assert.ok(config.sqliteConfig);
    assert.strictEqual(config.sqliteConfig.filename, 'sqlite3.db');
    assert.strictEqual(config.mysqlConfig, undefined);
    assert.strictEqual(config.oracleConfig, undefined);
    assert.strictEqual(config.sqlserverConfig, undefined);

    // Test DbHelper static method parity
    const staticConfig = DbHelper.getDefaultDbConfig();
    assert.deepStrictEqual(config, staticConfig);
  });

  await t.test('getAppDbConfig supports custom sqlite parameters and app-scoped overrides', () => {
    process.env[DbEnvKeys.SQLITE_FILENAME] = 'default.db';
    process.env[`${DbEnvKeys.SQLITE_FILENAME}:app1`] = 'app1.db';
    process.env[`${DbEnvKeys.SQLITE_JOURNAL_MODE}:app1`] = 'WAL';
    process.env[`${DbEnvKeys.SQLITE_BUSY_TIMEOUT}:app1`] = '3000';
    process.env[`${DbEnvKeys.SQLITE_READONLY}:app1`] = 'true';

    const globalConfig = getAppDbConfig();
    assert.strictEqual(globalConfig.sqliteConfig?.filename, 'default.db');

    const app1Config = getAppDbConfig('app1');
    assert.strictEqual(app1Config.sqliteConfig?.filename, 'app1.db');
    assert.strictEqual(app1Config.sqliteConfig?.filename, 'app1.db');
    assert.strictEqual(app1Config.sqliteConfig?.journalMode, 'WAL');
    assert.strictEqual(app1Config.sqliteConfig?.busyTimeout, 3000);
    assert.strictEqual(app1Config.sqliteConfig?.readonly, true);

    const staticAppConfig = DbHelper.getAppDbConfig('app1');
    assert.deepStrictEqual(app1Config, staticAppConfig);
  });

  await t.test('getAppDbConfig initializes mysqlConfig only when type is mysql', () => {
    process.env[DbEnvKeys.DB_TYPE] = 'mysql';
    process.env[DbEnvKeys.MYSQL_WAIT_FOR_CONNECTIONS] = 'false';
    process.env[DbEnvKeys.MYSQL_QUEUE_LIMIT] = '10';
    process.env[DbEnvKeys.MYSQL_MAX_IDLE] = '3';
    process.env[DbEnvKeys.MYSQL_IDLE_TIMEOUT] = '15000';
    process.env[DbEnvKeys.MYSQL_RESET_ON_RELEASE] = 'true';
    process.env[DbEnvKeys.MYSQL_ENABLE_KEEP_ALIVE] = 'false';
    process.env[DbEnvKeys.MYSQL_KEEP_ALIVE_INITIAL_DELAY] = '5000';
    process.env[DbEnvKeys.MYSQL_SUPPORT_BIG_NUMBERS] = 'false';
    process.env[DbEnvKeys.MYSQL_BIG_NUMBER_STRINGS] = 'true';
    process.env[DbEnvKeys.MYSQL_DATE_STRINGS] = 'DATE,DATETIME';
    process.env[DbEnvKeys.MYSQL_DECIMAL_NUMBERS] = 'true';
    process.env[DbEnvKeys.MYSQL_NAMED_PLACEHOLDERS] = 'true';
    process.env[DbEnvKeys.MYSQL_TIMEZONE] = 'Z';
    process.env[DbEnvKeys.MYSQL_CHARSET] = 'utf8mb4';
    process.env[DbEnvKeys.MYSQL_SSL] = 'true';

    const config = getAppDbConfig();
    assert.strictEqual(config.type, 'mysql');
    assert.ok(config.mysqlConfig);
    assert.strictEqual(config.mysqlConfig.waitForConnections, false);
    assert.strictEqual(config.mysqlConfig.queueLimit, 10);
    assert.strictEqual(config.mysqlConfig.maxIdle, 3);
    assert.strictEqual(config.mysqlConfig.idleTimeout, 15000);
    assert.strictEqual(config.mysqlConfig.resetOnRelease, true);
    assert.strictEqual(config.mysqlConfig.enableKeepAlive, false);
    assert.strictEqual(config.mysqlConfig.keepAliveInitialDelay, 5000);
    assert.strictEqual(config.mysqlConfig.supportBigNumbers, false);
    assert.strictEqual(config.mysqlConfig.bigNumberStrings, true);
    assert.deepStrictEqual(config.mysqlConfig.dateStrings, ['DATE', 'DATETIME']);
    assert.strictEqual(config.mysqlConfig.decimalNumbers, true);
    assert.strictEqual(config.mysqlConfig.namedPlaceholders, true);
    assert.strictEqual(config.mysqlConfig.timezone, 'Z');
    assert.strictEqual(config.mysqlConfig.charset, 'utf8mb4');
    assert.deepStrictEqual(config.mysqlConfig.ssl, {});
    assert.strictEqual(config.sqliteConfig, undefined);
  });

  await t.test('getAppDbConfig initializes oracleConfig only when type is oracle', () => {
    process.env[DbEnvKeys.DB_TYPE] = 'oracle';
    process.env[DbEnvKeys.ORACLE_CONNECT_STRING] = '10.0.0.1:1521/ORCL';
    process.env[DbEnvKeys.ORACLE_POOL_TIMEOUT] = '45';
    process.env[DbEnvKeys.ORACLE_POOL_INCREMENT] = '2';
    process.env[DbEnvKeys.ORACLE_SCHEMA] = 'HR';

    const config = getAppDbConfig();
    assert.strictEqual(config.type, 'oracle');
    assert.ok(config.oracleConfig);
    assert.strictEqual(config.oracleConfig.connectString, '10.0.0.1:1521/ORCL');
    assert.strictEqual(config.oracleConfig.poolTimeout, 45);
    assert.strictEqual(config.oracleConfig.poolIncrement, 2);
    assert.strictEqual(config.oracleConfig.schema, 'HR');
    assert.strictEqual(config.mysqlConfig, undefined);
  });

  await t.test('getAppDbConfig initializes sqlserverConfig only when type is sqlserver', () => {
    process.env[`${DbEnvKeys.DB_TYPE}:crm`] = 'sqlserver';
    process.env[`${DbEnvKeys.SQLSERVER_ENCRYPT}:crm`] = 'true';
    process.env[`${DbEnvKeys.SQLSERVER_TRUST_SERVER_CERTIFICATE}:crm`] = 'true';
    process.env[`${DbEnvKeys.SQLSERVER_INSTANCE_NAME}:crm`] = 'SQLEXPRESS';
    process.env[`${DbEnvKeys.SQLSERVER_IDLE_TIMEOUT_MILLIS}:crm`] = '60000';
    process.env[`${DbEnvKeys.SQLSERVER_REQUEST_TIMEOUT}:crm`] = '120000';

    const config = getAppDbConfig('crm');
    assert.strictEqual(config.type, 'sqlserver');
    assert.ok(config.sqlserverConfig);
    assert.strictEqual(config.sqlserverConfig.encrypt, true);
    assert.strictEqual(config.sqlserverConfig.trustServerCertificate, true);
    assert.strictEqual(config.sqlserverConfig.instanceName, 'SQLEXPRESS');
    assert.strictEqual(config.sqlserverConfig.idleTimeoutMillis, 60000);
    assert.strictEqual(config.sqlserverConfig.requestTimeout, 120000);
    assert.strictEqual(config.mysqlConfig, undefined);
  });
  await t.test('getAppDbConfig validates SQLite values', () => {
    process.env[DbEnvKeys.SQLITE_JOURNAL_MODE] = 'invalid';
    assert.throws(() => getDefaultDbConfig(), /Invalid SQLite journal mode/);
  });
});
