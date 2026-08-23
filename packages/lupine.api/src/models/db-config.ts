export interface MysqlConfig {
  waitForConnections?: boolean;
  queueLimit?: number;
  enableKeepAlive?: boolean;
  keepAliveInitialDelay?: number;
  supportBigNumbers?: boolean;
  bigNumberStrings?: boolean;
  dateStrings?: boolean | string[];
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
  filename?: string;
  mysqlConfig?: MysqlConfig;
}

export const getDefaultDbConfig = (): DbConfig => {
  // process.env may not be initialized at script starting
  const config: DbConfig = {
    type: process.env['DB_TYPE'] || 'sqlite',
    host: process.env['DB_HOST'] || '',
    port: Number(process.env['DB_PORT']) || 0,
    user: process.env['DB_USER'] || '',
    database: process.env['DB_DATABASE'] || '',
    password: process.env['DB_PASSWORD'] || '',
    poolMin: Number(process.env['DB_POOL_MIN']) || 1,
    poolMax: Number(process.env['DB_POOL_MAX']) || 5,
    connectionTimeout: Number(process.env['DB_CONNECTION_TIMEOUT']) || 10000,
    tablePrefix: process.env['DB_TABLE_PREFIX'] || '',
    filename: process.env['DB_FILENAME'] || 'sqlite3.db',
  };

  const waitForConnections = process.env['MYSQL.WAIT_FOR_CONNECTIONS'];
  const queueLimit = process.env['MYSQL.QUEUE_LIMIT'];
  const enableKeepAlive = process.env['MYSQL.ENABLE_KEEP_ALIVE'];
  const keepAliveInitialDelay = process.env['MYSQL.KEEP_ALIVE_INITIAL_DELAY'];
  const supportBigNumbers = process.env['MYSQL.SUPPORT_BIG_NUMBERS'];
  const bigNumberStrings = process.env['MYSQL.BIG_NUMBER_STRINGS'];
  const dateStrings = process.env['MYSQL.DATE_STRINGS'];

  const hasMysqlConfig = Object.keys(process.env).some((key) => key.startsWith('MYSQL.'));

  if (hasMysqlConfig) {
    const parseBool = (v: string | undefined): boolean | undefined => {
      if (v === undefined) return undefined;
      const lower = v.trim().toLowerCase();
      return lower === 'true' || lower === '1';
    };

    const parseNum = (v: string | undefined): number | undefined => {
      if (v === undefined || v.trim() === '') return undefined;
      const n = Number(v);
      return isNaN(n) ? undefined : n;
    };

    const parseDateStrings = (v: string | undefined): boolean | string[] | undefined => {
      if (v === undefined) return undefined;
      const lower = v.trim().toLowerCase();
      if (lower === 'true' || lower === '1') return true;
      if (lower === 'false' || lower === '0') return false;
      return v.split(',').map((s) => s.trim()).filter(Boolean);
    };

    const mysqlConfig: MysqlConfig = {};
    if (waitForConnections !== undefined) mysqlConfig.waitForConnections = parseBool(waitForConnections);
    if (queueLimit !== undefined) mysqlConfig.queueLimit = parseNum(queueLimit);
    if (enableKeepAlive !== undefined) mysqlConfig.enableKeepAlive = parseBool(enableKeepAlive);
    if (keepAliveInitialDelay !== undefined) mysqlConfig.keepAliveInitialDelay = parseNum(keepAliveInitialDelay);
    if (supportBigNumbers !== undefined) mysqlConfig.supportBigNumbers = parseBool(supportBigNumbers);
    if (bigNumberStrings !== undefined) mysqlConfig.bigNumberStrings = parseBool(bigNumberStrings);
    if (dateStrings !== undefined) mysqlConfig.dateStrings = parseDateStrings(dateStrings);

    config.mysqlConfig = mysqlConfig;
  }

  return config;
};

