import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';

const logger = new Logger('db-oracle');

let oracledbModule: any;
function getOracledbModule() {
  if (!oracledbModule) {
    try {
      oracledbModule = require('oracledb');
      if (oracledbModule.OUT_FORMAT_OBJECT !== undefined) {
        oracledbModule.outFormat = oracledbModule.OUT_FORMAT_OBJECT;
      }
    } catch (e: any) {
      throw new Error(
        'The "oracledb" package is required for Oracle database support. Please install it using "npm install oracledb".'
      );
    }
  }
  return oracledbModule;
}

export class DbOracleTransaction extends Db {
  private connection: any;

  constructor(option: DbConfig, connection: any) {
    super(option);
    this.connection = connection;
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    try {
      const oracledb = getOracledbModule();
      let transformedSql = sql;
      let binds: any = [];

      if (params !== undefined) {
        if (Array.isArray(params)) {
          let bindCount = 0;
          transformedSql = this.replaceQuestionMarkPlaceholders(sql, (index) => {
            bindCount = index + 1;
            return `:${index + 1}`;
          });
          if (bindCount !== params.length) {
            throw new Error(`Oracle bind count mismatch: SQL has ${bindCount} placeholders but ${params.length} values were provided`);
          }
          binds = params;
        } else if (typeof params === 'object') {
          binds = params;
        }
      }

      const result = await this.connection.execute(transformedSql, binds, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: false,
      });

      let rows: any;
      if (isSelect) {
        rows = result.rows || [];
      } else {
        const affectedRows = result.rowsAffected !== undefined ? result.rowsAffected : 0;
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
      logger.error('Oracle transaction query failed:', err?.message || String(err));
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
    if (result && result[0]) {
      const countVal = result[0].c !== undefined ? result[0].c : result[0].C;
      return Number(countVal);
    }
    return 0;
  }
}

export class DbOracle extends Db {
  pool!: any;

  constructor(option: DbConfig) {
    super(option);
  }

  public async close(): Promise<void> {
    if (this.pool) {
      const pool = this.pool;
      this.pool = undefined;
      await pool.close(10);
    }
  }

  public async connect(): Promise<void> {
    if (this.pool) {
      return;
    }
    try {
      const oracledb = getOracledbModule();
      const oracleConfig = this.option.oracleConfig;
      const connectString = oracleConfig?.connectString || (this.option.host
        ? `${this.option.host}:${this.option.port || 1521}/${this.option.database || 'XE'}`
        : this.option.database || 'localhost/XE');
      const schema = oracleConfig?.schema?.trim();
      if (schema && !/^[A-Za-z][A-Za-z0-9_$#]*$/.test(schema)) {
        throw new Error(`Invalid Oracle schema identifier: ${schema}`);
      }

      this.pool = await oracledb.createPool({
        user: this.option.user || 'system',
        password: this.option.password || '',
        connectString,
        poolMin: this.option.poolMin ?? 1,
        poolMax: this.option.poolMax ?? 5,
        poolTimeout: oracleConfig?.poolTimeout ?? 30,
        queueTimeout: oracleConfig?.queueTimeout ?? this.option.connectionTimeout,
        poolIncrement: oracleConfig?.poolIncrement,
        poolPingInterval: oracleConfig?.poolPingInterval,
        stmtCacheSize: oracleConfig?.stmtCacheSize,
        privilege: oracleConfig?.privilege,
        sessionCallback: schema
          ? async (connection: any) => {
            await connection.execute(`ALTER SESSION SET CURRENT_SCHEMA = ${schema}`);
          }
          : undefined,
      });

      if (logger.isDebug()) {
        await this.testConnection();
      }
    } catch (error: any) {
      logger.error('Failed to connect to Oracle:', error);
      throw error;
    }
  }

  public async transaction<T>(callback: (trx: Db) => Promise<T>): Promise<T> {
    await this.connect();
    const connection = await this.pool.getConnection();
    const trxDb = new DbOracleTransaction(this.option, connection);

    try {
      const result = await callback(trxDb);
      await connection.commit();
      return result;
    } catch (error: any) {
      try {
        await connection.rollback();
      } catch (rollbackErr: any) {
        logger.error('Oracle transaction rollback failed:', rollbackErr?.message || String(rollbackErr));
      }
      throw error;
    } finally {
      await connection.close();
    }
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    await this.connect();
    const connection = await this.pool.getConnection();
    const oracledb = getOracledbModule();

    try {
      let transformedSql = sql;
      let binds: any = [];

      if (params !== undefined) {
        if (Array.isArray(params)) {
          let bindCount = 0;
          transformedSql = this.replaceQuestionMarkPlaceholders(sql, (index) => {
            bindCount = index + 1;
            return `:${index + 1}`;
          });
          if (bindCount !== params.length) {
            throw new Error(`Oracle bind count mismatch: SQL has ${bindCount} placeholders but ${params.length} values were provided`);
          }
          binds = params;
        } else if (typeof params === 'object') {
          binds = params;
        }
      }

      const result = await connection.execute(transformedSql, binds, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: !isSelect,
      });

      let rows: any;
      if (isSelect) {
        rows = result.rows || [];
      } else {
        const affectedRows = result.rowsAffected !== undefined ? result.rowsAffected : 0;
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
      logger.error('Oracle query failed:', err?.message || String(err));
      throw err;
    } finally {
      try {
        await connection.close();
      } catch (closeErr: any) {
        logger.error('Oracle connection close failed:', closeErr?.message || String(closeErr));
      }
    }
  }

  public async truncateTable(tableName: string): Promise<any> {
    const realTable = this.replacePrefix(tableName);
    return this.execute(`TRUNCATE TABLE ${this.escapeId(realTable)}`);
  }

  public async getTableCount(tableName: string): Promise<number> {
    const realTable = this.replacePrefix(tableName);
    const result = await this.select(`SELECT COUNT(*) as c FROM ${this.escapeId(realTable)}`);
    if (result && result[0]) {
      const countVal = result[0].c !== undefined ? result[0].c : result[0].C;
      return Number(countVal);
    }
    return 0;
  }

  public async getAllTables(addCount: boolean = false): Promise<any[]> {
    const query = `
      SELECT 
        TABLE_NAME as "name",
        TABLE_NAME as "tbl_name"
      FROM 
        USER_TABLES
    `;

    const result = await this.select(query);

    if (result && Array.isArray(result)) {
      if (addCount) {
        for (let i = 0; i < result.length; i++) {
          const name = result[i].name || result[i].NAME;
          try {
            result[i].count = await this.getTableCount(name);
          } catch (error: any) {
            logger.error(`Error getting count for table ${name}:`, error);
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
        COLUMN_NAME as "name",
        DATA_TYPE as "type",
        NULLABLE as "is_nullable",
        DATA_DEFAULT as "default_value"
      FROM 
        USER_TAB_COLUMNS 
      WHERE 
        TABLE_NAME = ?
      ORDER BY 
        COLUMN_ID
    `;

    return await this.select(query, [realTable.toUpperCase()]);
  }

  public async testConnection(): Promise<boolean> {
    try {
      const result = await this.select('SELECT 1 as result FROM DUAL');
      return Boolean(result && result.length > 0);
    } catch (error) {
      return false;
    }
  }
}
