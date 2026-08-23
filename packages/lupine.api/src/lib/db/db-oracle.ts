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
          let paramIdx = 1;
          transformedSql = sql.replace(/\?/g, () => `:${paramIdx++}`);
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
        console.log('trx query:', transformedSql, ', params:', params, ', result:', rows && rows.length);
      }
      return rows;
    } catch (err: any) {
      console.error('trx query error:', sql, ', params:', params, ', error:', err);
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
      await this.pool.close(10);
    }
  }

  public async connect(): Promise<void> {
    if (this.pool) {
      return;
    }
    try {
      const oracledb = getOracledbModule();
      const connectString = this.option.host
        ? `${this.option.host}:${this.option.port || 1521}/${this.option.database || 'XE'}`
        : this.option.database || 'localhost/XE';

      this.pool = await oracledb.createPool({
        user: this.option.user || 'system',
        password: this.option.password || '',
        connectString,
        poolMin: this.option.poolMin || 1,
        poolMax: this.option.poolMax || 5,
        poolTimeout: 30,
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
        console.error('Oracle transaction rollback failed:', rollbackErr);
        logger.error('Oracle transaction rollback failed:', rollbackErr && rollbackErr.message);
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
          let paramIdx = 1;
          transformedSql = sql.replace(/\?/g, () => `:${paramIdx++}`);
          binds = params;
        } else if (typeof params === 'object') {
          binds = params;
        }
      }

      const result = await connection.execute(transformedSql, binds, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: isSelect ? false : true,
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
        console.log('query:', transformedSql, ', params:', params, ', result:', rows && rows.length);
      }
      return rows;
    } catch (err: any) {
      console.error('query:', sql, ', params:', params, ', error:', err);
      throw err;
    } finally {
      await connection.close();
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
