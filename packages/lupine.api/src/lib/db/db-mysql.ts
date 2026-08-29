import type { Pool, PoolConnection } from 'mysql2/promise';
import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';

const logger = new Logger('db-mysql');

let mysqlModule: any;
function getMysqlModule() {
  if (!mysqlModule) {
    try {
      mysqlModule = require('mysql2/promise');
    } catch (e: any) {
      throw new Error(
        'The "mysql2" package is required for MySQL database support. Please install it using "npm install mysql2".'
      );
    }
  }
  return mysqlModule;
}

export class DbMysqlTransaction extends Db {
  private connection: PoolConnection;

  constructor(option: DbConfig, connection: PoolConnection) {
    super(option);
    this.connection = connection;
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    try {
      let rows: any;
      if (isSelect) {
        const [queryRows] = params !== undefined ? await this.connection.query(sql, params) : await this.connection.query(sql);
        rows = queryRows;
      } else {
        const [resultHeader] = params !== undefined ? await this.connection.query(sql, params) : await this.connection.query(sql);
        if (resultHeader && typeof (resultHeader as any).length === 'undefined') {
          const header = resultHeader as any;
          rows = [
            {
              ...header,
              changes: header.affectedRows !== undefined ? header.affectedRows : 0,
              affectedRows: header.affectedRows !== undefined ? header.affectedRows : 0,
              lastInsertRowid: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
              insertId: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
              id: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
            },
          ];
        } else {
          rows = resultHeader;
        }
      }

      if (logger.isDebug()) {
        logger.debug('trx query:', sql, ', result count:', rows?.length || 0);
      }
      return rows;
    } catch (err: any) {
      logger.error('MySQL transaction query failed:', err?.message || String(err));
      throw err;
    }
  }

  public async truncateTable(tableName: string): Promise<any> {
    const realTable = this.replacePrefix(tableName);
    return this.execute(`TRUNCATE TABLE ${this.escapeId(realTable)}`);
  }

  public async getTableCount(tableName: string): Promise<number> {
    const realTable = this.replacePrefix(tableName);
    const result = await this.select(`SELECT COUNT(*) as c FROM ${this.escapeId(realTable)}`);
    return result && result[0] ? Number(result[0].c) : 0;
  }
}

export class DbMysql extends Db {
  pool!: Pool;

  constructor(option: DbConfig) {
    super(option);

    const mysql = getMysqlModule();
    const mysqlConfig = option.mysqlConfig;
    this.pool = mysql.createPool({
      host: option.host || '127.0.0.1',
      user: option.user || 'root',
      password: option.password || '',
      database: option.database || '',
      port: option.port || 3306,
      connectionLimit: option.poolMax ?? 5,
      connectTimeout: option.connectionTimeout ?? 10000,
      waitForConnections: mysqlConfig?.waitForConnections ?? true,
      queueLimit: mysqlConfig?.queueLimit ?? 0,
      maxIdle: mysqlConfig?.maxIdle,
      idleTimeout: mysqlConfig?.idleTimeout,
      resetOnRelease: mysqlConfig?.resetOnRelease,
      enableKeepAlive: mysqlConfig?.enableKeepAlive ?? true,
      keepAliveInitialDelay: mysqlConfig?.keepAliveInitialDelay ?? 10000,
      supportBigNumbers: mysqlConfig?.supportBigNumbers ?? true,
      bigNumberStrings: mysqlConfig?.bigNumberStrings ?? false,
      dateStrings: mysqlConfig?.dateStrings ?? true,
      decimalNumbers: mysqlConfig?.decimalNumbers,
      namedPlaceholders: mysqlConfig?.namedPlaceholders,
      timezone: mysqlConfig?.timezone,
      charset: mysqlConfig?.charset,
      ssl: mysqlConfig?.ssl,
    });

    if (logger.isDebug()) {
      void this.testConnection().catch((error) => logger.debug('MySQL debug connection test failed:', error?.message || String(error)));
    }
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }

  public async connect(): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
      connection = await this.pool.getConnection();
    } catch (error: any) {
      logger.error('Failed to connect to MySQL:', error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  public async transaction<T>(callback: (trx: Db) => Promise<T>): Promise<T> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const trxDb = new DbMysqlTransaction(this.option, connection);
      const result = await callback(trxDb);
      await connection.commit();
      return result;
    } catch (error) {
      try {
        await connection.rollback();
      } catch (rollbackErr: any) {
        logger.error('MySQL transaction rollback failed:', rollbackErr?.message || String(rollbackErr));
      }
      throw error;
    } finally {
      connection.release();
    }
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    try {
      let rows: any;
      if (isSelect) {
        const [queryRows] = params !== undefined ? await this.pool.query(sql, params) : await this.pool.query(sql);
        rows = queryRows;
      } else {
        const [resultHeader] = params !== undefined ? await this.pool.query(sql, params) : await this.pool.query(sql);
        if (resultHeader && typeof (resultHeader as any).length === 'undefined') {
          const header = resultHeader as any;
          rows = [
            {
              ...header,
              changes: header.affectedRows !== undefined ? header.affectedRows : 0,
              affectedRows: header.affectedRows !== undefined ? header.affectedRows : 0,
              lastInsertRowid: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
              insertId: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
              id: header.insertId !== undefined && header.insertId !== 0 ? header.insertId : undefined,
            },
          ];
        } else {
          rows = resultHeader;
        }
      }

      if (logger.isDebug()) {
        logger.debug('query:', sql, ', result count:', rows?.length || 0);
      }
      return rows;
    } catch (err: any) {
      logger.error('MySQL query failed:', err?.message || String(err));
      throw err;
    }
  }

  public async truncateTable(tableName: string): Promise<any> {
    const realTable = this.replacePrefix(tableName);
    return this.execute(`TRUNCATE TABLE ${this.escapeId(realTable)}`);
  }

  public async getTableCount(tableName: string): Promise<number> {
    const realTable = this.replacePrefix(tableName);
    const result = await this.select(`SELECT COUNT(*) as c FROM ${this.escapeId(realTable)}`);
    return result && result[0] ? Number(result[0].c) : 0;
  }

  public async getAllTables(addCount: boolean = false): Promise<any[]> {
    const query = `
      SELECT 
        TABLE_NAME as name,
        TABLE_NAME as tbl_name,
        TABLE_SCHEMA as schema_name,
        TABLE_TYPE as type,
        ENGINE as engine,
        TABLE_ROWS as row_count,
        DATA_LENGTH as data_length,
        INDEX_LENGTH as index_length,
        CREATE_TIME as create_time,
        UPDATE_TIME as update_time
      FROM 
        information_schema.TABLES 
      WHERE 
        TABLE_SCHEMA = DATABASE()
    `;

    const result = await this.select(query);

    if (result && Array.isArray(result)) {
      if (addCount) {
        for (let i = 0; i < result.length; i++) {
          try {
            result[i].count = await this.getTableCount(result[i].name);
          } catch (error: any) {
            logger.error(`Error getting count for table ${result[i].name}:`, error);
            result[i].count = -1;
          }
        }
      }
      return result;
    }

    return [];
  }

  public async getTableInfo(table: string): Promise<any> {
    const realTable = this.replacePrefix(table);
    const query = `
      SELECT 
        COLUMN_NAME as name,
        DATA_TYPE as type,
        IS_NULLABLE as is_nullable,
        COLUMN_DEFAULT as default_value,
        COLUMN_KEY as \`key\`,
        CASE WHEN COLUMN_KEY = 'PRI' THEN 1 ELSE 0 END as pk,
        EXTRA as extra,
        CHARACTER_MAXIMUM_LENGTH as max_length,
        NUMERIC_PRECISION as numeric_precision,
        NUMERIC_SCALE as numeric_scale,
        COLUMN_COMMENT as comment
      FROM 
        information_schema.COLUMNS 
      WHERE 
        TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = ?
      ORDER BY 
        ORDINAL_POSITION
    `;

    return await this.select(query, [realTable]);
  }
}
