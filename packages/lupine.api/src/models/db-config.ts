export const enum DbEnvKeys {
  // Common
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  DB_TABLE_PREFIX = 'DB_TABLE_PREFIX',
  DB_POOL_MIN = 'DB_POOL_MIN',
  DB_POOL_MAX = 'DB_POOL_MAX',
  DB_CONNECTION_TIMEOUT = 'DB_CONNECTION_TIMEOUT',

  // SQLite
  SQLITE_FILENAME = 'SQLITE_FILENAME',
  SQLITE_JOURNAL_MODE = 'SQLITE_JOURNAL_MODE',
  SQLITE_BUSY_TIMEOUT = 'SQLITE_BUSY_TIMEOUT',
  SQLITE_READONLY = 'SQLITE_READONLY',
  SQLITE_FILE_MUST_EXIST = 'SQLITE_FILE_MUST_EXIST',
  SQLITE_TIMEOUT = 'SQLITE_TIMEOUT',
  SQLITE_VERBOSE = 'SQLITE_VERBOSE',
  SQLITE_FOREIGN_KEYS = 'SQLITE_FOREIGN_KEYS',

  // MySQL
  MYSQL_WAIT_FOR_CONNECTIONS = 'MYSQL_WAIT_FOR_CONNECTIONS',
  MYSQL_QUEUE_LIMIT = 'MYSQL_QUEUE_LIMIT',
  MYSQL_ENABLE_KEEP_ALIVE = 'MYSQL_ENABLE_KEEP_ALIVE',
  MYSQL_KEEP_ALIVE_INITIAL_DELAY = 'MYSQL_KEEP_ALIVE_INITIAL_DELAY',
  MYSQL_SUPPORT_BIG_NUMBERS = 'MYSQL_SUPPORT_BIG_NUMBERS',
  MYSQL_BIG_NUMBER_STRINGS = 'MYSQL_BIG_NUMBER_STRINGS',
  MYSQL_DATE_STRINGS = 'MYSQL_DATE_STRINGS',
  MYSQL_SSL = 'MYSQL_SSL',
  MYSQL_TIMEZONE = 'MYSQL_TIMEZONE',
  MYSQL_CHARSET = 'MYSQL_CHARSET',
  MYSQL_DECIMAL_NUMBERS = 'MYSQL_DECIMAL_NUMBERS',
  MYSQL_NAMED_PLACEHOLDERS = 'MYSQL_NAMED_PLACEHOLDERS',
  MYSQL_MAX_IDLE = 'MYSQL_MAX_IDLE',
  MYSQL_IDLE_TIMEOUT = 'MYSQL_IDLE_TIMEOUT',
  MYSQL_RESET_ON_RELEASE = 'MYSQL_RESET_ON_RELEASE',

  // Oracle
  ORACLE_CONNECT_STRING = 'ORACLE_CONNECT_STRING',
  ORACLE_POOL_TIMEOUT = 'ORACLE_POOL_TIMEOUT',
  ORACLE_QUEUE_TIMEOUT = 'ORACLE_QUEUE_TIMEOUT',
  ORACLE_POOL_INCREMENT = 'ORACLE_POOL_INCREMENT',
  ORACLE_POOL_PING_INTERVAL = 'ORACLE_POOL_PING_INTERVAL',
  ORACLE_STMT_CACHE_SIZE = 'ORACLE_STMT_CACHE_SIZE',
  ORACLE_SCHEMA = 'ORACLE_SCHEMA',
  ORACLE_PRIVILEGE = 'ORACLE_PRIVILEGE',

  // SQL Server
  SQLSERVER_ENCRYPT = 'SQLSERVER_ENCRYPT',
  SQLSERVER_TRUST_SERVER_CERTIFICATE = 'SQLSERVER_TRUST_SERVER_CERTIFICATE',
  SQLSERVER_ENABLE_ARITH_ABORT = 'SQLSERVER_ENABLE_ARITH_ABORT',
  SQLSERVER_IDLE_TIMEOUT_MILLIS = 'SQLSERVER_IDLE_TIMEOUT_MILLIS',
  SQLSERVER_REQUEST_TIMEOUT = 'SQLSERVER_REQUEST_TIMEOUT',
  SQLSERVER_INSTANCE_NAME = 'SQLSERVER_INSTANCE_NAME',
  SQLSERVER_APP_NAME = 'SQLSERVER_APP_NAME',
  SQLSERVER_DOMAIN = 'SQLSERVER_DOMAIN',
}

export type SqliteJournalMode = 'DELETE' | 'TRUNCATE' | 'PERSIST' | 'MEMORY' | 'WAL' | 'OFF';

export interface SqliteConfig {
  filename?: string;
  journalMode?: SqliteJournalMode | Lowercase<SqliteJournalMode>;
  busyTimeout?: number;
  readonly?: boolean;
  fileMustExist?: boolean;
  timeout?: number;
  verbose?: boolean;
  foreignKeys?: boolean;
}

export interface MysqlConfig {
  waitForConnections?: boolean;
  queueLimit?: number;
  maxIdle?: number;
  idleTimeout?: number;
  resetOnRelease?: boolean;
  enableKeepAlive?: boolean;
  keepAliveInitialDelay?: number;
  supportBigNumbers?: boolean;
  bigNumberStrings?: boolean;
  dateStrings?: boolean | string[];
  decimalNumbers?: boolean;
  namedPlaceholders?: boolean;
  timezone?: string;
  charset?: string;
  ssl?: string | Record<string, unknown>;
}

export interface OracleConfig {
  connectString?: string;
  poolTimeout?: number;
  queueTimeout?: number;
  poolIncrement?: number;
  poolPingInterval?: number;
  stmtCacheSize?: number;
  schema?: string;
  privilege?: number;
}

export interface SqlServerConfig {
  encrypt?: boolean;
  trustServerCertificate?: boolean;
  enableArithAbort?: boolean;
  idleTimeoutMillis?: number;
  requestTimeout?: number;
  instanceName?: string;
  appName?: string;
  domain?: string;
}

export interface DbConfig {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  poolMin: number;
  poolMax: number;
  connectionTimeout: number;
  tablePrefix: string;
  /** TLS switch retained for SQL Server backward compatibility. */
  ssl?: boolean;
  sqliteConfig?: SqliteConfig;
  mysqlConfig?: MysqlConfig;
  oracleConfig?: OracleConfig;
  sqlserverConfig?: SqlServerConfig;
}
