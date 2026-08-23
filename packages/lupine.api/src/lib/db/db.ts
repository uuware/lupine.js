import { Logger } from '../logger';
import { DbConfig } from '../../models/db-config';

// Instead, Boolean values are stored as integers 0 (false) and 1 (true).
export type DbFieldExpressionProps = { expression?: string; exprssion?: string; params?: (string | number)[] };
export type DbFieldExprssionProps = DbFieldExpressionProps; // backward compatibility

export type DbFieldValueType = string | number | boolean | null | undefined | (string | number)[];
export type DbFieldValue = { [key: string]: DbFieldValueType };
export type DbFieldExpression = { [key: string]: string | number | boolean | null | undefined | DbFieldExpressionProps };

export const isDbFieldExpression = (value: any): value is DbFieldExpressionProps => {
  return value && typeof value === 'object' && ('expression' in value || 'exprssion' in value);
};
export const isDbFieldExprssion = isDbFieldExpression; // backward compatibility

const logger = new Logger('db');

export class Db {
  type: string;
  tablePrefix: string;
  option: DbConfig;

  constructor(option: DbConfig) {
    if (logger.isDebug()) {
      logger.debug(
        `init Db, type: ${option.type}, host: ${option.host}:${option.port}, user: ${option.user}, database: ${option.database}, filename: ${option.filename}`
      );
    }

    this.option = option;
    this.type = option.type;
    this.tablePrefix = option.tablePrefix || 'tbl_';
  }

  public close(): Promise<void> | void {
    throw new Error('Method not implemented');
  }

  public connect(): Promise<void> | void {
    throw new Error('Method not implemented');
  }

  public async getAllTables(addCount = false): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async getAllTableNames(): Promise<string[]> {
    const result = await this.getAllTables(false);
    return result.map((item: any) => item.name);
  }

  public async getTableInfo(table: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  // Can be used like this: ORDER BY ${db.getRandomOrder()}
  // MySQL / MariaDB: RAND()
  // PostgreSQL, SQLite: RANDOM()
  // SQL Server: NEWID()
  // Oracle: DBMS_RANDOM.VALUE
  public getRandomOrder(): string {
    if (this.type === 'mysql' || this.type === 'mariadb') {
      return 'RAND()';
    }
    if (this.type === 'postgres' || this.type === 'sqlite') {
      return 'RANDOM()';
    }
    if (this.type === 'sqlserver' || this.type === 'mssql') {
      return 'NEWID()';
    }
    if (this.type === 'oracle') {
      return 'DBMS_RANDOM.VALUE';
    }
    throw new Error(`Unsupported database type: ${this.type}`);
  }

  // Can be used like this: SELECT ${db.getConcatSql('first_name', "' '", 'last_name')} AS full_name
  // MySQL / MariaDB / SQL Server: CONCAT(a, b, c)
  // SQLite / PostgreSQL / Oracle: (a || b || c)
  public getConcatSql(...fieldsOrStrings: string[]): string {
    if (fieldsOrStrings.length === 0) {
      return "''";
    }
    if (fieldsOrStrings.length === 1) {
      return fieldsOrStrings[0];
    }
    if (this.type === 'mysql' || this.type === 'mariadb' || this.type === 'sqlserver' || this.type === 'mssql') {
      return `CONCAT(${fieldsOrStrings.join(', ')})`;
    }
    // SQLite, PostgreSQL, Oracle: (a || b || c)
    return `(${fieldsOrStrings.join(' || ')})`;
  }

  // Returns standard UNIX timestamp in SECONDS as a pure integer number.
  //
  // NOTE on Difference from JS Date.now():
  // - JavaScript `Date.now()` returns MILLISECONDS (13 digits: e.g. 1755660000000).
  // - Standard database UNIX timestamp is in SECONDS (10 digits: Math.floor(Date.now() / 1000) e.g. 1755660000).
  //
  // MySQL / MariaDB: UNIX_TIMESTAMP()
  // SQLite: CAST(strftime('%s', 'now') AS INTEGER)
  // PostgreSQL: EXTRACT(EPOCH FROM NOW())::INTEGER
  // SQL Server: DATEDIFF(SECOND, '1970-01-01', GETUTCDATE())
  // Oracle: ((CAST(SYS_EXTRACT_UTC(SYSTIMESTAMP) AS DATE) - DATE '1970-01-01') * 86400)
  public getCurrentTimestampSql(): string {
    if (this.type === 'mysql' || this.type === 'mariadb') {
      return 'UNIX_TIMESTAMP()';
    }
    if (this.type === 'sqlite') {
      return "CAST(strftime('%s', 'now') AS INTEGER)";
    }
    if (this.type === 'postgres') {
      return 'EXTRACT(EPOCH FROM NOW())::INTEGER';
    }
    if (this.type === 'sqlserver' || this.type === 'mssql') {
      return "DATEDIFF(SECOND, '1970-01-01', GETUTCDATE())";
    }
    if (this.type === 'oracle') {
      return "((CAST(SYS_EXTRACT_UTC(SYSTIMESTAMP) AS DATE) - DATE '1970-01-01') * 86400)";
    }
    return 'UNIX_TIMESTAMP()';
  }

  // Null Value Replacement:
  // Standard ANSI SQL `COALESCE(expr, default_val)` (e.g. `COALESCE(price, 0)`)
  // is universally supported across ALL databases (MySQL, SQLite, PostgreSQL, SQL Server, Oracle).
  // Use `COALESCE(...)` directly in your SQL without engine-specific functions like IFNULL, ISNULL, or NVL.

  public escapeId(field: string): string {
    if (
      !field ||
      field === '*' ||
      field.includes('(') ||
      field.includes(')') ||
      field.includes(' ') ||
      field.startsWith('`') ||
      field.startsWith('[') ||
      field.startsWith('"')
    ) {
      return field;
    }
    if (field.includes('.')) {
      return field
        .split('.')
        .map((part) => this.escapeId(part))
        .join('.');
    }
    if (this.type === 'sqlserver' || this.type === 'mssql') {
      return `[${field}]`;
    }
    if (this.type === 'oracle') {
      return `"${field}"`;
    }
    return `\`${field}\``;
  }

  public async transaction<T>(callback: (trx: Db) => Promise<T>): Promise<T> {
    throw new Error('Method not implemented');
  }

  protected nativeQuery(sql: string, params?: any, isSelect?: boolean): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async truncateTable(tableName: string): Promise<any> {
    throw new Error('Method not implemented');
  }

  public async select<T = any>(sql: string, params?: any): Promise<T[]> {
    const fixedSql = this.replacePrefix(sql);
    return (await this.nativeQuery(fixedSql, params, true)) as T[];
  }

  public async execute(sql: string, params?: any): Promise<any> {
    const fixedSql = this.replacePrefix(sql);
    return await this.nativeQuery(fixedSql, params, false);
  }

  public replacePrefix(sql: string, fromPrefix = '$__'): string {
    if (!sql || !sql.includes(fromPrefix)) {
      return sql;
    }

    let quoteChar = '';
    const n = sql.length;
    let startPos = 0;
    let literal = '';

    while (startPos < n) {
      const ip = sql.indexOf(fromPrefix, startPos);
      if (ip < 0) {
        break;
      }

      // Find the next string literal quote (' or ")
      let j = sql.indexOf("'", startPos);
      const k = sql.indexOf('"', startPos);
      if (k >= 0 && (k < j || j < 0)) {
        quoteChar = '"';
        j = k;
      } else {
        quoteChar = "'";
      }

      if (j < 0) {
        j = n;
      }

      // Replace fromPrefix outside string literal quotes (including inside backticks ``)
      literal += sql.substring(startPos, j).split(fromPrefix).join(this.tablePrefix);
      startPos = j;

      j = startPos + 1;
      if (j >= n) {
        break;
      }

      // Quote comes first, find matching closing quote (handling escaping)
      while (true) {
        const closeIdx = sql.indexOf(quoteChar, j);
        if (closeIdx < 0) {
          break;
        }
        let l = closeIdx - 1;
        let escaped = false;
        while (l >= 0 && sql.charAt(l) === '\\') {
          l--;
          escaped = !escaped;
        }
        if (escaped) {
          j = closeIdx + 1;
          continue;
        }
        j = closeIdx;
        break;
      }

      if (j < 0 || j >= n) {
        // No matching end quote found, append rest as-is
        literal += sql.substring(startPos);
        startPos = n;
        break;
      }

      // Append quoted literal as-is (without prefix replacement)
      literal += sql.substring(startPos, j + 1);
      startPos = j + 1;
    }

    if (startPos < n) {
      literal += sql.substring(startPos, n);
    }
    return literal;
  }

  protected buildWhereClause(whereFieldValues?: DbFieldValue): { whereSql: string; params: any[] } {
    if (!whereFieldValues || Object.keys(whereFieldValues).length === 0) {
      return { whereSql: '', params: [] };
    }
    const clauses: string[] = [];
    const params: any[] = [];

    for (const [key, rawValue] of Object.entries(whereFieldValues)) {
      if (rawValue === undefined) {
        continue;
      }
      const escapedKey = this.escapeId(key);
      if (rawValue === null) {
        clauses.push(`${escapedKey} IS NULL`);
      } else if (Array.isArray(rawValue)) {
        if (rawValue.length === 0) {
          clauses.push('1 = 0');
        } else {
          clauses.push(`${escapedKey} IN (${rawValue.map(() => '?').join(', ')})`);
          params.push(...rawValue);
        }
      } else if (typeof rawValue === 'boolean') {
        clauses.push(`${escapedKey} = ?`);
        params.push(rawValue ? 1 : 0);
      } else {
        clauses.push(`${escapedKey} = ?`);
        params.push(rawValue);
      }
    }

    const whereSql = clauses.length > 0 ? ' WHERE ' + clauses.join(' AND ') : '';
    return { whereSql, params };
  }

  protected selectBaseSql(table: string, fields?: string[], whereFieldValues?: DbFieldValue, orderSql?: string) {
    table = this.replacePrefix(table);
    let sql = 'SELECT ';
    if (fields && fields.length > 0) {
      sql += fields.map((f) => this.escapeId(f.trim())).join(', ');
    } else {
      sql += '*';
    }

    sql += ' FROM ' + table;
    const { whereSql, params } = this.buildWhereClause(whereFieldValues);
    sql += whereSql;
    if (orderSql) {
      sql += ' ORDER BY ' + orderSql;
    }
    return { sql, params };
  }

  public async selectObject<T = any>(
    table: string,
    fields?: string[],
    whereFieldValues?: DbFieldValue,
    orderSql?: string,
    limit?: number,
    offset?: number
  ): Promise<T[]> {
    const base = this.selectBaseSql(table, fields, whereFieldValues, orderSql);
    if (this.type === 'sqlserver' || this.type === 'mssql' || this.type === 'oracle') {
      const off = typeof offset === 'number' && !isNaN(offset) && offset >= 0 ? offset : 0;
      if (limit && limit > 0) {
        if (!orderSql) {
          base.sql += ' ORDER BY (SELECT NULL)';
        }
        base.sql += ` OFFSET ${off} ROWS FETCH NEXT ${limit} ROWS ONLY`;
      } else if (off > 0) {
        if (!orderSql) {
          base.sql += ' ORDER BY (SELECT NULL)';
        }
        base.sql += ` OFFSET ${off} ROWS`;
      }
    } else {
      if (limit && limit > 0) {
        base.sql += ' LIMIT ' + limit;
      }
      if (typeof offset === 'number' && !isNaN(offset)) {
        base.sql += ' OFFSET ' + offset;
      }
    }
    return (await this.select<T>(base.sql, base.params)) as T[];
  }

  public async selectOneRow<T = any>(
    table: string,
    fields?: string[],
    whereFieldValues?: DbFieldValue,
    orderSql?: string,
    offset?: number
  ): Promise<T | undefined> {
    const result = await this.selectObject<T>(table, fields, whereFieldValues, orderSql, 1, offset);
    if (result && Array.isArray(result) && result.length > 0) {
      return result[0];
    }
    return undefined;
  }

  public async selectOneResult<T = any>(
    table: string,
    field: string,
    whereFieldValues?: DbFieldValue
  ): Promise<T | undefined> {
    const base = this.selectBaseSql(table, [field], whereFieldValues);
    const result = await this.select(base.sql, base.params);
    if (result && Array.isArray(result) && result.length > 0) {
      return result[0][Object.keys(result[0])[0]] as T;
    }
    return undefined;
  }

  // return ids / resultSet
  public async insertObject(table: string, fieldValues: DbFieldValue): Promise<any> {
    table = this.replacePrefix(table);
    const keys = Object.keys(fieldValues);
    const escapedFields = keys.map((key) => this.escapeId(key));
    const placeholders = Array(keys.length).fill('?').join(', ');
    const sql = `INSERT INTO ${table} (${escapedFields.join(', ')}) VALUES (${placeholders})`;
    const params = keys.map((key) => {
      const val = fieldValues[key];
      if (typeof val === 'boolean') {
        return val ? 1 : 0;
      }
      return val;
    });
    return await this.execute(sql, params);
  }

  public async updateObject(table: string, updateFieldValues: DbFieldExpression, whereFieldValues?: DbFieldValue): Promise<any> {
    table = this.replacePrefix(table);
    const fields = Object.keys(updateFieldValues);
    const setClauseParts: string[] = [];
    const params: any[] = [];

    for (const field of fields) {
      const value = updateFieldValues[field];
      const escapedField = this.escapeId(field);

      // expression
      if (isDbFieldExpression(value)) {
        const expr = value.expression || value.exprssion || '';
        setClauseParts.push(`${escapedField} = ${expr}`);
        if (value.params) params.push(...value.params);
      } else if (value === null) {
        setClauseParts.push(`${escapedField} = NULL`);
      } else if (typeof value === 'boolean') {
        setClauseParts.push(`${escapedField} = ?`);
        params.push(value ? 1 : 0);
      } else {
        // static value
        setClauseParts.push(`${escapedField} = ?`);
        params.push(value);
      }
    }

    let sql = `UPDATE ${table} SET ${setClauseParts.join(', ')}`;
    const { whereSql, params: whereParams } = this.buildWhereClause(whereFieldValues);
    sql += whereSql;
    params.push(...whereParams);

    return await this.execute(sql, params);
  }

  public async deleteObject(table: string, whereFieldValues: DbFieldValue): Promise<any> {
    table = this.replacePrefix(table);
    let sql = 'DELETE FROM ' + table;
    const { whereSql, params } = this.buildWhereClause(whereFieldValues);
    sql += whereSql;
    return await this.execute(sql, params);
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
