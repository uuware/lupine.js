/*
npm install mysql2
npm install --save-dev @types/mysql2

*/
import { createPool, Pool, PoolConnection, RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { Logger } from '../logger';
import { Db } from './db';
import { DbConfig } from '../../models/db-config';

/**
connection = mysql.createConnection({
  host : 'localhost',
  user : '***',
  password : '***',
  port : 3306,
  database: '***',
  insecureAuth: true,
  //debug: true,
});
connection.connect();

connection.end();

    getConn: function (config) {
      config.host = config.host || "localhost";
      config.port = config.port || 3306;
      connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
        insecureAuth: config.insecureAuth,
        debug: config.debug,
      });
      connection.connect();

      this.debug = config.debug || false;
      var thisObj = this;
      connection.on("error", function (err) {
        if (!err.fatal) {
          return;
        }

        if (err.code !== "PROTOCOL_CONNECTION_LOST") {
          throw err;
        }

        //console.log('Re-connecting lost connection: ' + err.stack);
        console.log("Re-connecting lost connection: " + err);
        thisObj.connection = thisObj.getConn(config);
      });
      this.connection = connection;
      return connection;
    },

    query: function (cb, sql) {
      try {
        var conn = this.connection;
        sql = this.replacePrefix(sql);
        console.log("query:" + sql);
        conn.query(sql, cb);
      } catch (err) {
        console.log(err);
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
          var conn = this.connection;
          conn.query(sql, cb);
        } else {
          cb(err, false);
        }
      }
      return true;
    },

    escape: function (val) {
      return mysql.escape(val);
    },

    escapeId: function (id) {
      return mysql.escapeId(id);
    },

*/

const logger = new Logger('db-mysql');

export class DbMysql extends Db {
  private pool!: Pool;
  private connection!: PoolConnection;

  constructor(option: DbConfig) {
    super(option);

    this.pool = createPool({
      host: option.host || 'localhost',
      user: option.user,
      password: option.password,
      database: option.database,
      port: option.port || 3306,
      /* Math.max(2, Math.floor(10 / numCPUs)); */
      connectionLimit: 2,
      waitForConnections: true,
      queueLimit: 0,
      namedPlaceholders: true,
      supportBigNumbers: true,
      bigNumberStrings: true,
      // Enable for debugging
      // debug: logger.isDebug()
    });

    // Test the connection
    if (logger.isDebug()) {
      this.testConnection();
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async connect() {
    try {
      this.connection = await this.pool.getConnection();
      return Promise.resolve();
    } catch (error: any) {
      logger.error('Failed to connect to MySQL:', error);
      return Promise.reject(error);
    }
  }

  public async nativeQuery(sql: string, params?: any, isSelect: boolean = true): Promise<any> {
    let connection: PoolConnection | null = null;

    try {
      connection = await this.pool.getConnection();

      if (logger.isDebug()) {
        logger.debug('Executing query:', { sql, params });
      }

      let result: any;

      if (isSelect) {
        const [rows] = await connection.execute<RowDataPacket[]>(sql, params);
        result = rows;
      } else {
        const [resultSet] = await connection.execute<ResultSetHeader>(sql, params);
        // For INSERT, UPDATE, DELETE operations, return the result set
        result = [resultSet];
      }

      if (logger.isDebug()) {
        logger.debug('Query result:', { sql, rowCount: Array.isArray(result) ? result.length : 1 });
      }

      return result;
    } catch (error) {
      logger.error('Error executing query:', { sql, params, error });
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  public async truncateTable(tableName: string): Promise<any> {
    // MySQL uses TRUNCATE TABLE which is more efficient than DELETE FROM
    return this.execute(`TRUNCATE TABLE ${tableName}`);
  }

  public async getTableCount(tableName: string): Promise<number> {
    const result = await this.select(`SELECT COUNT(*) as c FROM ${tableName}`);
    return result[0].c;
  }

  public async getAllTables(addCount: boolean = false): Promise<any[]> {
    const query = `
      SELECT 
        TABLE_NAME as name,
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

    if (result && addCount) {
      for (const table of result) {
        try {
          table.count = await this.getTableCount(table.name);
        } catch (error: any) {
          logger.error(`Error getting count for table ${table.name}:`, error);
          table.count = -1; // Indicate error
        }
      }
    }

    return result || [];
  }

  public async getTableInfo(table: string): Promise<any> {
    const query = `
      SELECT 
        COLUMN_NAME as name,
        DATA_TYPE as type,
        IS_NULLABLE as is_nullable,
        COLUMN_DEFAULT as default_value,
        COLUMN_KEY as key,
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

    return await this.select(query, [table]);
  }

  public async testConnection() {
    try {
      const [result] = await this.pool.query('SELECT 1 as test');
      logger.debug('MySQL connection test successful:', result);
      return true;
    } catch (error: any) {
      logger.error('MySQL connection test failed:', error);
      return false;
    }
  }
}
