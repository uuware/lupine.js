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
}

export const getDefaultDbConfig = (): DbConfig => {
  // process.env may not be initialized at script starting
  return {
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
};
