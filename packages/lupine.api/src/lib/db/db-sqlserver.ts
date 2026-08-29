import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';

const logger = new Logger('db-sqlserver');

let mssqlModule: any;
function getMssqlModule() {
  if (!mssqlModule) {
    try {
      mssqlModule = require('mssql');
    } catch (e: any) {
      throw new Error(
        'The "mssql" package is required for SQL Server database support. Please install it using "npm install mssql".'
      );
    }
  }
  return mssqlModule;
}

export class DbSqlServerTransaction extends Db {
  private mssqlTransaction: any;

  constructor(option: DbConfig, transaction: any) {
    super(option);
    this.mssqlTransaction = transaction;
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    try {
      const sqlModule = getMssqlModule();
      const request = new sqlModule.Request(this.mssqlTransaction);

      let transformedSql = sql;
      if (params !== undefined) {
        if (Array.isArray(params)) {
          let placeholderCount = 0;
          transformedSql = this.replaceQuestionMarkPlaceholders(sql, (index) => {
            placeholderCount++;
            request.input(`p${index}`, params[index]);
            return `@p${index}`;
          });
          if (placeholderCount !== params.length) {
            throw new Error(
              `SQL Server bind count mismatch: SQL has ${placeholderCount} placeholders but ${params.length} values were provided`
            );
          }
        } else if (typeof params === 'object') {
          for (const key of Object.keys(params)) {
            request.input(key, params[key]);
          }
        }
      }

      const result = await request.query(transformedSql);
      let rows: any;

      if (isSelect) {
        rows = result.recordset || [];
      } else {
        const affectedRows =
          result.rowsAffected && result.rowsAffected.length > 0 ? result.rowsAffected.reduce((a: number, b: number) => a + b, 0) : 0;
        rows = [
          {
            changes: affectedRows,
            affectedRows: affectedRows,
            lastInsertRowid: undefined,
            insertId: undefined,
            id: undefined,
          },
        ];
      }

      if (logger.isDebug()) {
        logger.debug('trx query:', transformedSql, ', result count:', rows?.length || 0);
      }
      return rows;
    } catch (err: any) {
      logger.error('SQL Server transaction query failed:', err?.message || String(err));
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

export class DbSqlServer extends Db {
  pool: any;

  constructor(option: DbConfig) {
    super(option);
  }

  public async close(): Promise<void> {
    if (this.pool) {
      const pool = this.pool;
      this.pool = undefined;
      if (pool.connected || pool.connecting) {
        await pool.close();
      }
    }
  }

  public async connect(): Promise<void> {
    if (this.pool && this.pool.connected) {
      return;
    }
    try {
      const sqlModule = getMssqlModule();
      const sqlserverConfig = this.option.sqlserverConfig;
      if (!this.pool) {
        const config: any = {
          server: this.option.host || '127.0.0.1',
          port: this.option.port || 1433,
          user: this.option.user || 'sa',
          password: this.option.password || '',
          database: this.option.database || 'master',
          domain: sqlserverConfig?.domain,
          connectionTimeout: this.option.connectionTimeout ?? 15000,
          requestTimeout: sqlserverConfig?.requestTimeout,
          options: {
            encrypt: sqlserverConfig?.encrypt ?? this.option.ssl ?? false,
            trustServerCertificate: sqlserverConfig?.trustServerCertificate ?? true,
            enableArithAbort: sqlserverConfig?.enableArithAbort ?? true,
            instanceName: sqlserverConfig?.instanceName,
            appName: sqlserverConfig?.appName,
          },
          pool: {
            min: this.option.poolMin ?? 1,
            max: this.option.poolMax ?? 5,
            idleTimeoutMillis: sqlserverConfig?.idleTimeoutMillis ?? 30000,
          },
        };
        this.pool = new sqlModule.ConnectionPool(config);
      }
      if (!this.pool.connected && !this.pool.connecting) {
        await this.pool.connect();
      }
    } catch (error: any) {
      logger.error('Failed to connect to SQL Server:', error);
      throw error;
    }
  }

  public async transaction<T>(callback: (trx: Db) => Promise<T>): Promise<T> {
    await this.connect();
    const sqlModule = getMssqlModule();
    const transaction = new sqlModule.Transaction(this.pool);
    let started = false;
    try {
      await transaction.begin();
      started = true;
      const trxDb = new DbSqlServerTransaction(this.option, transaction);
      const result = await callback(trxDb);
      await transaction.commit();
      return result;
    } catch (error: any) {
      if (started) {
        try {
          await transaction.rollback();
        } catch (rollbackErr: any) {
          logger.error('SQL Server transaction rollback failed:', rollbackErr?.message || String(rollbackErr));
        }
      }
      throw error;
    }
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    try {
      await this.connect();
      const request = this.pool.request();

      let transformedSql = sql;
      if (params !== undefined) {
        if (Array.isArray(params)) {
          let placeholderCount = 0;
          transformedSql = this.replaceQuestionMarkPlaceholders(sql, (index) => {
            placeholderCount++;
            request.input(`p${index}`, params[index]);
            return `@p${index}`;
          });
          if (placeholderCount !== params.length) {
            throw new Error(
              `SQL Server bind count mismatch: SQL has ${placeholderCount} placeholders but ${params.length} values were provided`
            );
          }
        } else if (typeof params === 'object') {
          for (const key of Object.keys(params)) {
            request.input(key, params[key]);
          }
        }
      }

      const result = await request.query(transformedSql);
      let rows: any;

      if (isSelect) {
        rows = result.recordset || [];
      } else {
        const affectedRows =
          result.rowsAffected && result.rowsAffected.length > 0 ? result.rowsAffected.reduce((a: number, b: number) => a + b, 0) : 0;
        rows = [
          {
            changes: affectedRows,
            affectedRows: affectedRows,
            lastInsertRowid: undefined,
            insertId: undefined,
            id: undefined,
          },
        ];
      }

      if (logger.isDebug()) {
        logger.debug('query:', transformedSql, ', result count:', rows?.length || 0);
      }
      return rows;
    } catch (err: any) {
      logger.error('SQL Server query failed:', err?.message || String(err));
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
        TABLE_TYPE as type
      FROM 
        INFORMATION_SCHEMA.TABLES 
      WHERE 
        TABLE_TYPE = 'BASE TABLE'
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
        CHARACTER_MAXIMUM_LENGTH as max_length,
        NUMERIC_PRECISION as numeric_precision,
        NUMERIC_SCALE as numeric_scale
      FROM 
        INFORMATION_SCHEMA.COLUMNS 
      WHERE 
        TABLE_NAME = ?
      ORDER BY 
        ORDINAL_POSITION
    `;

    return await this.select(query, [realTable]);
  }

  public async testConnection(): Promise<boolean> {
    try {
      const result = await this.select('SELECT 1 as result');
      return Boolean(result && result.length > 0);
    } catch (error) {
      return false;
    }
  }
}
