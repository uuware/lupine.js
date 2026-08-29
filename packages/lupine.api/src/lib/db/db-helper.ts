import { Db } from './db';
import {
  DbConfig,
  DbEnvKeys,
  MysqlConfig,
  OracleConfig,
  SqliteJournalMode,
  SqlServerConfig,
} from '../../models/db-config';
import { DbSqlite } from './db-sqlite';
import { DbMysql } from './db-mysql';
import { DbSqlServer } from './db-sqlserver';
import { DbOracle } from './db-oracle';

export const getAppDbConfig = (appName?: string): DbConfig => {
  const getEnv = (key: string): string | undefined => {
    if (appName) {
      const appVal = process.env[`${key}:${appName}`];
      if (appVal !== undefined) {
        return appVal;
      }
    }
    return process.env[key];
  };

  const parseBool = (v: string | undefined, _key?: string): boolean | undefined => {
    if (v === undefined) return undefined;
    const lower = v.trim().toLowerCase();
    return lower === 'true' || lower === '1';
  };

  const parseNum = (v: string | undefined, _key?: string): number | undefined => {
    if (v === undefined || v.trim() === '') return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  };

  const parseNonNegativeInteger = (v: string | undefined, key: string, fallback: number): number => {
    const n = parseNum(v, key);
    if (n === undefined) return fallback;
    if (!Number.isInteger(n) || n < 0) {
      throw new Error(`${key} must be a non-negative integer`);
    }
    return n;
  };

  const parseDateStrings = (v: string | undefined): boolean | string[] | undefined => {
    if (v === undefined) return undefined;
    const lower = v.trim().toLowerCase();
    if (lower === 'true' || lower === '1') return true;
    if (lower === 'false' || lower === '0') return false;
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  };

  const parseJournalMode = (v: string | undefined): SqliteJournalMode | undefined => {
    if (v === undefined || v.trim() === '') return undefined;
    const mode = v.trim().toUpperCase();
    if (!['DELETE', 'TRUNCATE', 'PERSIST', 'MEMORY', 'WAL', 'OFF'].includes(mode)) {
      throw new Error(`Invalid SQLite journal mode: ${v}`);
    }
    return mode as SqliteJournalMode;
  };

  const parseMysqlSsl = (v: string | undefined): MysqlConfig['ssl'] => {
    if (v === undefined || v.trim() === '') return undefined;
    const value = v.trim();
    const lower = value.toLowerCase();
    if (lower === 'false' || lower === '0' || lower === 'off' || lower === 'no') return undefined;
    if (lower === 'true' || lower === '1' || lower === 'on' || lower === 'yes') return {};
    if (value.startsWith('{')) {
      try {
        const parsed = JSON.parse(value);
        if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
          throw new Error('expected a JSON object');
        }
        return parsed;
      } catch (error: any) {
        throw new Error(`Invalid JSON value for ${DbEnvKeys.MYSQL_SSL}: ${error.message}`);
      }
    }
    return value;
  };

  const type = (getEnv(DbEnvKeys.DB_TYPE) || 'sqlite').trim().toLowerCase();
  const poolMin = parseNonNegativeInteger(getEnv(DbEnvKeys.DB_POOL_MIN), DbEnvKeys.DB_POOL_MIN, 1);
  const poolMax = parseNonNegativeInteger(getEnv(DbEnvKeys.DB_POOL_MAX), DbEnvKeys.DB_POOL_MAX, 5);
  if (poolMax < 1 || poolMin > poolMax) {
    throw new Error(`${DbEnvKeys.DB_POOL_MIN} must be less than or equal to ${DbEnvKeys.DB_POOL_MAX}, and pool max must be at least 1`);
  }

  const config: DbConfig = {
    type,
    host: getEnv(DbEnvKeys.DB_HOST) || '',
    port: parseNonNegativeInteger(getEnv(DbEnvKeys.DB_PORT), DbEnvKeys.DB_PORT, 0),
    user: getEnv(DbEnvKeys.DB_USER) || '',
    database: getEnv(DbEnvKeys.DB_DATABASE) || '',
    password: getEnv(DbEnvKeys.DB_PASSWORD) || '',
    poolMin,
    poolMax,
    connectionTimeout: parseNonNegativeInteger(
      getEnv(DbEnvKeys.DB_CONNECTION_TIMEOUT),
      DbEnvKeys.DB_CONNECTION_TIMEOUT,
      10000
    ),
    tablePrefix: getEnv(DbEnvKeys.DB_TABLE_PREFIX) ?? 'tbl_',
  };

  if (type === 'sqlite') {
    const filename = getEnv(DbEnvKeys.SQLITE_FILENAME) || 'sqlite3.db';
    config.sqliteConfig = {
      filename,
      journalMode: parseJournalMode(getEnv(DbEnvKeys.SQLITE_JOURNAL_MODE)),
      busyTimeout: parseNum(getEnv(DbEnvKeys.SQLITE_BUSY_TIMEOUT), DbEnvKeys.SQLITE_BUSY_TIMEOUT),
      readonly: parseBool(getEnv(DbEnvKeys.SQLITE_READONLY), DbEnvKeys.SQLITE_READONLY),
      fileMustExist: parseBool(getEnv(DbEnvKeys.SQLITE_FILE_MUST_EXIST), DbEnvKeys.SQLITE_FILE_MUST_EXIST),
      timeout: parseNum(getEnv(DbEnvKeys.SQLITE_TIMEOUT), DbEnvKeys.SQLITE_TIMEOUT),
      verbose: parseBool(getEnv(DbEnvKeys.SQLITE_VERBOSE), DbEnvKeys.SQLITE_VERBOSE),
      foreignKeys: parseBool(getEnv(DbEnvKeys.SQLITE_FOREIGN_KEYS), DbEnvKeys.SQLITE_FOREIGN_KEYS),
    };
  } else if (type === 'mysql' || type === 'mariadb') {
    const waitForConnections = getEnv(DbEnvKeys.MYSQL_WAIT_FOR_CONNECTIONS);
    const queueLimit = getEnv(DbEnvKeys.MYSQL_QUEUE_LIMIT);
    const maxIdle = getEnv(DbEnvKeys.MYSQL_MAX_IDLE);
    const idleTimeout = getEnv(DbEnvKeys.MYSQL_IDLE_TIMEOUT);
    const resetOnRelease = getEnv(DbEnvKeys.MYSQL_RESET_ON_RELEASE);
    const enableKeepAlive = getEnv(DbEnvKeys.MYSQL_ENABLE_KEEP_ALIVE);
    const keepAliveInitialDelay = getEnv(DbEnvKeys.MYSQL_KEEP_ALIVE_INITIAL_DELAY);
    const supportBigNumbers = getEnv(DbEnvKeys.MYSQL_SUPPORT_BIG_NUMBERS);
    const bigNumberStrings = getEnv(DbEnvKeys.MYSQL_BIG_NUMBER_STRINGS);
    const dateStrings = getEnv(DbEnvKeys.MYSQL_DATE_STRINGS);
    const decimalNumbers = getEnv(DbEnvKeys.MYSQL_DECIMAL_NUMBERS);
    const namedPlaceholders = getEnv(DbEnvKeys.MYSQL_NAMED_PLACEHOLDERS);
    const timezone = getEnv(DbEnvKeys.MYSQL_TIMEZONE);
    const charset = getEnv(DbEnvKeys.MYSQL_CHARSET);
    const ssl = getEnv(DbEnvKeys.MYSQL_SSL);

    const hasMysqlConfig = Object.keys(process.env).some((key) => {
      const baseKey = appName && key.endsWith(`:${appName}`) ? key.slice(0, -(appName.length + 1)) : key;
      return baseKey.startsWith('MYSQL_');
    });

    if (hasMysqlConfig) {
      const mysqlConfig: MysqlConfig = {};
      if (waitForConnections !== undefined) {
        mysqlConfig.waitForConnections = parseBool(waitForConnections, DbEnvKeys.MYSQL_WAIT_FOR_CONNECTIONS);
      }
      if (queueLimit !== undefined) mysqlConfig.queueLimit = parseNum(queueLimit, DbEnvKeys.MYSQL_QUEUE_LIMIT);
      if (maxIdle !== undefined) mysqlConfig.maxIdle = parseNum(maxIdle, DbEnvKeys.MYSQL_MAX_IDLE);
      if (idleTimeout !== undefined) mysqlConfig.idleTimeout = parseNum(idleTimeout, DbEnvKeys.MYSQL_IDLE_TIMEOUT);
      if (resetOnRelease !== undefined) {
        mysqlConfig.resetOnRelease = parseBool(resetOnRelease, DbEnvKeys.MYSQL_RESET_ON_RELEASE);
      }
      if (enableKeepAlive !== undefined) {
        mysqlConfig.enableKeepAlive = parseBool(enableKeepAlive, DbEnvKeys.MYSQL_ENABLE_KEEP_ALIVE);
      }
      if (keepAliveInitialDelay !== undefined) {
        mysqlConfig.keepAliveInitialDelay = parseNum(keepAliveInitialDelay, DbEnvKeys.MYSQL_KEEP_ALIVE_INITIAL_DELAY);
      }
      if (supportBigNumbers !== undefined) {
        mysqlConfig.supportBigNumbers = parseBool(supportBigNumbers, DbEnvKeys.MYSQL_SUPPORT_BIG_NUMBERS);
      }
      if (bigNumberStrings !== undefined) {
        mysqlConfig.bigNumberStrings = parseBool(bigNumberStrings, DbEnvKeys.MYSQL_BIG_NUMBER_STRINGS);
      }
      if (dateStrings !== undefined) mysqlConfig.dateStrings = parseDateStrings(dateStrings);
      if (decimalNumbers !== undefined) {
        mysqlConfig.decimalNumbers = parseBool(decimalNumbers, DbEnvKeys.MYSQL_DECIMAL_NUMBERS);
      }
      if (namedPlaceholders !== undefined) {
        mysqlConfig.namedPlaceholders = parseBool(namedPlaceholders, DbEnvKeys.MYSQL_NAMED_PLACEHOLDERS);
      }
      if (timezone !== undefined) mysqlConfig.timezone = timezone;
      if (charset !== undefined) mysqlConfig.charset = charset;
      if (ssl !== undefined) mysqlConfig.ssl = parseMysqlSsl(ssl);
      config.mysqlConfig = mysqlConfig;
    }
  } else if (type === 'oracle') {
    const connectString = getEnv(DbEnvKeys.ORACLE_CONNECT_STRING);
    const poolTimeout = getEnv(DbEnvKeys.ORACLE_POOL_TIMEOUT);
    const queueTimeout = getEnv(DbEnvKeys.ORACLE_QUEUE_TIMEOUT);
    const poolIncrement = getEnv(DbEnvKeys.ORACLE_POOL_INCREMENT);
    const poolPingInterval = getEnv(DbEnvKeys.ORACLE_POOL_PING_INTERVAL);
    const stmtCacheSize = getEnv(DbEnvKeys.ORACLE_STMT_CACHE_SIZE);
    const schema = getEnv(DbEnvKeys.ORACLE_SCHEMA);
    const privilege = getEnv(DbEnvKeys.ORACLE_PRIVILEGE);

    const hasOracleConfig = Object.keys(process.env).some((key) => {
      const baseKey = appName && key.endsWith(`:${appName}`) ? key.slice(0, -(appName.length + 1)) : key;
      return baseKey.startsWith('ORACLE_');
    });

    if (hasOracleConfig) {
      const oracleConfig: OracleConfig = {};
      if (connectString !== undefined) oracleConfig.connectString = connectString;
      if (poolTimeout !== undefined) {
        oracleConfig.poolTimeout = parseNonNegativeInteger(poolTimeout, DbEnvKeys.ORACLE_POOL_TIMEOUT, 30);
      }
      if (queueTimeout !== undefined) {
        oracleConfig.queueTimeout = parseNonNegativeInteger(queueTimeout, DbEnvKeys.ORACLE_QUEUE_TIMEOUT, 0);
      }
      if (poolIncrement !== undefined) {
        oracleConfig.poolIncrement = parseNonNegativeInteger(poolIncrement, DbEnvKeys.ORACLE_POOL_INCREMENT, 1);
      }
      if (poolPingInterval !== undefined) {
        oracleConfig.poolPingInterval = parseNonNegativeInteger(poolPingInterval, DbEnvKeys.ORACLE_POOL_PING_INTERVAL, 0);
      }
      if (stmtCacheSize !== undefined) {
        oracleConfig.stmtCacheSize = parseNonNegativeInteger(stmtCacheSize, DbEnvKeys.ORACLE_STMT_CACHE_SIZE, 0);
      }
      if (schema !== undefined) oracleConfig.schema = schema;
      if (privilege !== undefined) oracleConfig.privilege = parseNonNegativeInteger(privilege, DbEnvKeys.ORACLE_PRIVILEGE, 0);
      config.oracleConfig = oracleConfig;
    }
  } else if (type === 'sqlserver' || type === 'mssql') {
    const encrypt = getEnv(DbEnvKeys.SQLSERVER_ENCRYPT);
    const trustServerCertificate = getEnv(DbEnvKeys.SQLSERVER_TRUST_SERVER_CERTIFICATE);
    const enableArithAbort = getEnv(DbEnvKeys.SQLSERVER_ENABLE_ARITH_ABORT);
    const idleTimeoutMillis = getEnv(DbEnvKeys.SQLSERVER_IDLE_TIMEOUT_MILLIS);
    const requestTimeout = getEnv(DbEnvKeys.SQLSERVER_REQUEST_TIMEOUT);
    const instanceName = getEnv(DbEnvKeys.SQLSERVER_INSTANCE_NAME);
    const sqlAppName = getEnv(DbEnvKeys.SQLSERVER_APP_NAME);
    const domain = getEnv(DbEnvKeys.SQLSERVER_DOMAIN);

    const hasSqlServerConfig = Object.keys(process.env).some((key) => {
      const baseKey = appName && key.endsWith(`:${appName}`) ? key.slice(0, -(appName.length + 1)) : key;
      return baseKey.startsWith('SQLSERVER_');
    });

    if (hasSqlServerConfig) {
      const sqlserverConfig: SqlServerConfig = {};
      if (encrypt !== undefined) sqlserverConfig.encrypt = parseBool(encrypt, DbEnvKeys.SQLSERVER_ENCRYPT);
      if (trustServerCertificate !== undefined) {
        sqlserverConfig.trustServerCertificate = parseBool(
          trustServerCertificate,
          DbEnvKeys.SQLSERVER_TRUST_SERVER_CERTIFICATE
        );
      }
      if (enableArithAbort !== undefined) {
        sqlserverConfig.enableArithAbort = parseBool(enableArithAbort, DbEnvKeys.SQLSERVER_ENABLE_ARITH_ABORT);
      }
      if (idleTimeoutMillis !== undefined) {
        sqlserverConfig.idleTimeoutMillis = parseNonNegativeInteger(
          idleTimeoutMillis,
          DbEnvKeys.SQLSERVER_IDLE_TIMEOUT_MILLIS,
          30000
        );
      }
      if (requestTimeout !== undefined) {
        sqlserverConfig.requestTimeout = parseNonNegativeInteger(
          requestTimeout,
          DbEnvKeys.SQLSERVER_REQUEST_TIMEOUT,
          0
        );
      }
      if (instanceName !== undefined) sqlserverConfig.instanceName = instanceName;
      if (sqlAppName !== undefined) sqlserverConfig.appName = sqlAppName;
      if (domain !== undefined) sqlserverConfig.domain = domain;
      config.sqlserverConfig = sqlserverConfig;
    }
  }

  return config;
};

export const getDefaultDbConfig = (): DbConfig => getAppDbConfig();

export class DbHelper {
  static getAppDbConfig(appName?: string): DbConfig {
    return getAppDbConfig(appName);
  }

  static getDefaultDbConfig(): DbConfig {
    return getDefaultDbConfig();
  }

  static async createInstance(option: DbConfig): Promise<Db> {
    if (!option || !option.type) {
      throw new Error('Invalid configuration');
    }

    const type = option.type.toLowerCase();
    switch (type) {
      case 'sqlite': {
        const sqliteOption: DbConfig = {
          ...option,
          sqliteConfig: {
            ...option.sqliteConfig,
            filename: option.sqliteConfig?.filename || 'sqlite3.db',
          },
        };
        const db = new DbSqlite(sqliteOption);
        await db.connect();
        return db;
      }
      case 'mysql':
      case 'mariadb':
        const dbMysql = new DbMysql(option);
        await dbMysql.connect();
        return dbMysql;
      case 'sqlserver':
      case 'mssql':
        const dbSqlServer = new DbSqlServer(option);
        await dbSqlServer.connect();
        return dbSqlServer;
      case 'oracle':
        const dbOracle = new DbOracle(option);
        await dbOracle.connect();
        return dbOracle;
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}

