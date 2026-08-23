import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';
import { DbSqlite } from './db-sqlite';
import { DbMysql } from './db-mysql';
import { DbSqlServer } from './db-sqlserver';
import { DbOracle } from './db-oracle';

const logger = new Logger('db-helper');
export class DbHelper {
  static async createInstance(option: DbConfig): Promise<Db> {
    if (!option || !option.type) {
      throw new Error('Invalid configuration');
    }

    const type = option.type.toLowerCase();
    switch (type) {
      case 'sqlite':
        if (!option.filename) {
          throw new Error('Invalid configuration: filename is required for sqlite');
        }
        const db = new DbSqlite(option);
        await db.connect();
        return db;
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
