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
    this.db = new DatabaseConstructor(option.filename!, {
      nativeBinding,
    });
    this.db.pragma('journal_mode = WAL');

    if (logger.isDebug()) {
      this.testConnection();
    }
  }

  public close(): void {
    if (this.db) {
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
        console.error('SQLite transaction rollback failed:', rollbackErr);
        logger.error('SQLite transaction rollback failed:', rollbackErr && rollbackErr.message);
      }
      throw error;
    }
  }

  // INSERT...RETURNING is also supported in MariaDB from 10.5.0
  public nativeQuery(sql: string, params?: any, isSelect?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let rows: any;
        if (isSelect) {
          rows = params ? this.db.prepare(sql).all(params) : this.db.prepare(sql).all();
        } else {
          const preSql = sql.trim().substring(0, 6).toLowerCase();
          if (preSql.startsWith('insert') || preSql.startsWith('update') || preSql.startsWith('delete')) {
            sql = sql + ' returning *';
          }
          rows = params ? this.db.prepare(sql).run(params) : this.db.prepare(sql).run();
          if (rows && typeof rows.length === 'undefined') {
            // sqlite3 returns id as a record
            rows = [
              {
                ...rows,
                changes: rows.changes !== undefined ? rows.changes : 0,
                affectedRows: rows.changes !== undefined ? rows.changes : 0,
                lastInsertRowid: rows.lastInsertRowid !== undefined ? rows.lastInsertRowid : undefined,
                insertId: rows.lastInsertRowid !== undefined ? rows.lastInsertRowid : undefined,
                id: rows.changes > 0 ? rows.lastInsertRowid : undefined,
              },
            ];
          }
        }

        if (logger.isDebug()) {
          console.log('query:', sql, ', params:', params, ', result:', rows && rows.length);
        }
        resolve(rows);
      } catch (err) {
        console.error('query:', sql, ', params:', params, ', error:', err);
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
