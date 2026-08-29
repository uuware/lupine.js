import type Database from 'better-sqlite3';
import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';

const logger = new Logger('db-sqlite');

let betterSqlite3Module: any;
function getBetterSqlite3Module() {
  if (!betterSqlite3Module) {
    try {
      betterSqlite3Module = require('better-sqlite3');
    } catch (e: any) {
      throw new Error(
        'The "better-sqlite3" package is required for SQLite database support. Please install it using "npm install better-sqlite3".'
      );
    }
  }
  return betterSqlite3Module;
}

export class DbSqlite extends Db {
  db!: Database.Database;

  constructor(option: DbConfig) {
    super(option);

    const DatabaseConstructor = getBetterSqlite3Module();

    let nativeBinding;
    try {
      nativeBinding = require('path').join(
        require('path').dirname(require.resolve('better-sqlite3/package.json')),
        'build/Release/better_sqlite3.node'
      );
    } catch (e) {
      nativeBinding = 'node_modules/better-sqlite3/build/Release/better_sqlite3.node'; // fallback to production default
    }
    const sqliteConfig = option.sqliteConfig;
    const filename = sqliteConfig?.filename || 'sqlite3.db';
    const readonly = sqliteConfig?.readonly ?? false;
    const timeout = sqliteConfig?.timeout ?? 5000;
    const busyTimeout = sqliteConfig?.busyTimeout;
    if (!Number.isFinite(timeout) || timeout < 0 || (busyTimeout !== undefined && (!Number.isFinite(busyTimeout) || busyTimeout < 0))) {
      throw new Error('Invalid SQLite configuration: timeout values must be non-negative numbers');
    }

    const sqliteOptions: any = {
      nativeBinding,
      readonly,
      fileMustExist: sqliteConfig?.fileMustExist ?? false,
      timeout,
      verbose: sqliteConfig?.verbose ? (message: unknown) => logger.debug(String(message)) : undefined,
    };
    this.db = new DatabaseConstructor(filename, sqliteOptions);

    if (!readonly) {
      const journalMode = (sqliteConfig?.journalMode || 'WAL').toUpperCase();
      if (!['DELETE', 'TRUNCATE', 'PERSIST', 'MEMORY', 'WAL', 'OFF'].includes(journalMode)) {
        this.db.close();
        throw new Error(`Invalid SQLite journal mode: ${journalMode}`);
      }
      this.db.pragma(`journal_mode = ${journalMode}`);
    }
    if (busyTimeout !== undefined) {
      this.db.pragma(`busy_timeout = ${Math.trunc(busyTimeout)}`);
    }
    if (sqliteConfig?.foreignKeys !== undefined) {
      this.db.pragma(`foreign_keys = ${sqliteConfig.foreignKeys ? 'ON' : 'OFF'}`);
    }

    if (logger.isDebug()) {
      this.testConnection();
    }
  }

  public close(): void {
    if (this.db?.open) {
      this.db.close();
    }
  }

  public connect(): Promise<void> {
    return Promise.resolve();
  }

  public async transaction<T>(callback: (trx: Db) => Promise<T>): Promise<T> {
    await this.execute('BEGIN TRANSACTION');
    try {
      const result = await callback(this);
      await this.execute('COMMIT');
      return result;
    } catch (error) {
      try {
        await this.execute('ROLLBACK');
      } catch (rollbackErr: any) {
        logger.error('SQLite transaction rollback failed:', rollbackErr?.message || String(rollbackErr));
      }
      throw error;
    }
  }

  public nativeQuery(sql: string, params?: any, isSelect?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const statement = this.db.prepare(sql);
        let rows: any;
        if (isSelect) {
          rows = params !== undefined ? statement.all(params) : statement.all();
        } else {
          const runResult = params !== undefined ? statement.run(params) : statement.run();
          const isInsert = /^\s*(?:WITH\b[\s\S]*?\b)?INSERT\b/i.test(sql);
          const insertId = isInsert && runResult.changes > 0 ? runResult.lastInsertRowid : undefined;
          rows = [
            {
              ...runResult,
              changes: runResult.changes ?? 0,
              affectedRows: runResult.changes ?? 0,
              lastInsertRowid: insertId,
              insertId,
              id: insertId,
            },
          ];
        }

        if (logger.isDebug()) {
          logger.debug('query:', sql, ', result count:', Array.isArray(rows) ? rows.length : 0);
        }
        resolve(rows);
      } catch (err: any) {
        logger.error('SQLite query failed:', err?.message || String(err));
        reject(err);
      }
    });
  }

  public async truncateTable(tableName: string): Promise<any> {
    const realTable = this.replacePrefix(tableName);
    return this.execute(`DELETE FROM ${this.escapeId(realTable)}`);
  }

  public async getTableCount(tableName: string): Promise<number> {
    const realTable = this.replacePrefix(tableName);
    const result = await this.select(`SELECT COUNT(*) as c FROM ${this.escapeId(realTable)}`);
    return result && result[0] ? Number(result[0].c) : 0;
  }

  public async getAllTables(addCount = false): Promise<any> {
    const query = `SELECT tbl_name as name, tbl_name, type FROM sqlite_master WHERE type ='table' AND tbl_name NOT LIKE 'sqlite_%';`;
    const result = await this.select(query);
    if (result) {
      if (addCount) {
        for (let i = 0; i < result.length; i++) {
          result[i].count = await this.getTableCount(result[i].name || result[i].tbl_name);
        }
      }
      return result;
    }
    return [];
  }

  public async getTableInfo(table: string): Promise<any> {
    const realTable = this.replacePrefix(table);
    const query = `PRAGMA table_info(${this.escapeId(realTable)});`;
    const result = await this.select(query);
    return result;
  }
}
