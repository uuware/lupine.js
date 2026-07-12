import { EntityObject, FieldObject } from './field-objects';

export interface DbLike {
  type?: string;
  replacePrefix?: (sql: string, fromPrefix?: string) => string;
  escape?: (value: unknown) => string;
  escapeId?: (identifier: string) => string;
}

export interface SqlFragment {
  sql: string;
  params: unknown[];
}

export interface SelectRecordSqlResult extends SqlFragment {
  mainTableId: string;
  fieldArr: Record<string, string>;
}

type AddErrorFn = (
  field: EntityObject | FieldObject | null,
  msgId: string,
  type?: string,
  params?: string | string[]
) => void;

const DEFAULT_ALIAS = 'a';

export function normalizeTableId(tableId: string): string {
  return tableId.trim().replace(/^#__/, '$__');
}

export function resolveTableId(db: DbLike, tableId: string): string {
  const normalized = normalizeTableId(tableId);
  return db.replacePrefix ? db.replacePrefix(normalized) : normalized;
}

function getIdentifierQuote(db: DbLike): string {
  const type = String(db.type || '').toLowerCase();
  return type === 'mysql' || type === 'mariadb' ? '`' : '"';
}

function isQuotedIdentifier(identifier: string): boolean {
  return (
    (identifier.startsWith('"') && identifier.endsWith('"')) ||
    (identifier.startsWith('`') && identifier.endsWith('`')) ||
    (identifier.startsWith('[') && identifier.endsWith(']'))
  );
}

export function escapeSqlIdentifier(db: DbLike, identifier: string): string {
  const value = String(identifier || '').trim();
  if (value === '*') return value;
  if (db.escapeId) return db.escapeId(value);

  const quote = getIdentifierQuote(db);
  return value
    .split('.')
    .map((part) => {
      const trimmed = part.trim();
      if (trimmed === '*') return trimmed;
      if (isQuotedIdentifier(trimmed)) return trimmed;
      return quote + trimmed.replaceAll(quote, quote + quote) + quote;
    })
    .join('.');
}

export function escapeSqlTableName(db: DbLike, tableName: string): string {
  const resolved = resolveTableId(db, tableName);
  return resolved
    .split('.')
    .map((part) => escapeSqlIdentifier(db, part))
    .join('.');
}

export function escapeSqlValue(db: DbLike, value: unknown): string {
  if (db.escape) return db.escape(value);
  if (value == null) return 'NULL';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'NULL';
  if (typeof value === 'boolean') return value ? '1' : '0';
  return `'${String(value).replace(/'/g, "''")}'`;
}

export function appendSqlLimit(db: DbLike, sql: string, limit: number): string {
  if (!Number.isInteger(limit) || limit <= 0) return sql;
  const type = String(db.type || '').toLowerCase();
  if (type === 'oracle') return `${sql} FETCH FIRST ${limit} ROWS ONLY`;
  if (type === 'sqlserver') return `${sql} OFFSET 0 ROWS FETCH NEXT ${limit} ROWS ONLY`;
  return `${sql} LIMIT ${limit}`;
}

function escapeLikeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
}

function addParam(params: unknown[] | undefined, db: DbLike, value: unknown): string {
  if (params) {
    params.push(value);
    return '?';
  }
  return escapeSqlValue(db, value);
}

/**
 * Builds a filter expression for one field and appends it to an existing filter string.
 * When params is provided, values are pushed into params and placeholders are emitted.
 */
export function getFilterSql(
  db: DbLike,
  item: FieldObject,
  filter = '',
  customFid?: string,
  params?: unknown[]
): string {
  const pid = item.getPhysicalId();
  if (!pid) return filter;

  let result = filter;
  if (result !== '') {
    result += ' AND ';
  }

  let realfilter = item.getFilter().trim();
  if (realfilter === '') {
    realfilter = '=';
  }

  const val = String(item.getValue() || '');
  const fid = customFid || escapeSqlIdentifier(db, pid);

  if (realfilter === 'l') {
    const pattern = '%' + escapeLikeValue(val);
    result += fid + ' LIKE ' + addParam(params, db, pattern) + " ESCAPE '\\'";
  } else if (realfilter === 'r') {
    const pattern = escapeLikeValue(val) + '%';
    result += fid + ' LIKE ' + addParam(params, db, pattern) + " ESCAPE '\\'";
  } else if (realfilter === 'c') {
    const pattern = '%' + escapeLikeValue(val) + '%';
    result += fid + ' LIKE ' + addParam(params, db, pattern) + " ESCAPE '\\'";
  } else {
    result += fid + ' ' + realfilter + ' ' + addParam(params, db, val);
  }
  return result;
}

export function createEntityFilterSql(db: DbLike, entity: EntityObject, customAlias?: string): SqlFragment {
  let filter = '';
  const params: unknown[] = [];
  for (const item of entity.getItems()) {
    const pid = item.getPhysicalId();
    if (!pid || item.isBlank()) continue;
    const fid = customAlias ? escapeSqlIdentifier(db, customAlias) + '.' + escapeSqlIdentifier(db, pid) : undefined;
    filter = getFilterSql(db, item, filter, fid, params);
  }
  return { sql: filter, params };
}

export function getRowValue(row: Record<string, unknown>, key: string): unknown {
  if (row == null) return undefined;
  if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
  const lower = key.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(row, lower)) return row[lower];
  const upper = key.toUpperCase();
  if (Object.prototype.hasOwnProperty.call(row, upper)) return row[upper];
  const dotPos = key.lastIndexOf('.');
  if (dotPos >= 0) {
    return getRowValue(row, key.substring(dotPos + 1));
  }
  return undefined;
}

export function createInsertEntitySql(db: DbLike, tableId: string, entity: EntityObject): SqlFragment {
  const fields: string[] = [];
  const values: unknown[] = [];

  for (const item of entity.getItems()) {
    const pid = item.getPhysicalId();
    if (!pid) continue;
    fields.push(escapeSqlIdentifier(db, pid));
    values.push(item.getValue());
  }

  if (fields.length === 0) {
    return { sql: '', params: [] };
  }

  const placeholders = fields.map(() => '?').join(', ');
  const sql =
    'INSERT INTO ' + escapeSqlTableName(db, tableId) + ' ( ' + fields.join(', ') + ' ) VALUES ( ' + placeholders + ' )';
  return { sql, params: values };
}

interface ParsedTableRef {
  tableId: string;
  alias: string;
  aliasKey: string;
}

function parseTableRefs(tableIdList: string): ParsedTableRef[] {
  const refs: ParsedTableRef[] = [];
  for (const rawItem of tableIdList.split(',')) {
    const raw = rawItem.trim();
    if (raw === '') continue;

    const parts = raw.split(/\s+/).filter(Boolean);
    let tableId = raw;
    let alias = refs.length === 0 ? DEFAULT_ALIAS : '';

    if (parts.length >= 3 && parts[parts.length - 2].toLowerCase() === 'as') {
      alias = parts[parts.length - 1];
      tableId = parts.slice(0, -2).join(' ');
    } else if (parts.length >= 2) {
      alias = parts[parts.length - 1];
      tableId = parts.slice(0, -1).join(' ');
    }

    if (alias === '') alias = tableId;
    refs.push({ tableId: normalizeTableId(tableId), alias, aliasKey: alias.toLowerCase() });
  }
  return refs;
}

function ensureAlias(filtersByAlias: Record<string, string>, aliasKey: string, original: string): void {
  if (filtersByAlias[aliasKey] === undefined) {
    throw new Error('Unknown alias:' + original);
  }
}

function getPhysicalFieldRef(
  db: DbLike,
  pid: string,
  mainAlias: string,
  mainAliasKey: string,
  tableRefCount: number
): { sql: string; aliasKey: string; rowKey: string } {
  const pos = pid.indexOf('#');
  if (pos > 0) {
    const alias = pid.substring(0, pos).trim();
    const field = pid.substring(pos + 1).trim();
    return {
      sql: escapeSqlIdentifier(db, alias) + '.' + escapeSqlIdentifier(db, field),
      aliasKey: alias.toLowerCase(),
      rowKey: field,
    };
  }

  if (tableRefCount > 1) {
    return {
      sql: escapeSqlIdentifier(db, mainAlias) + '.' + escapeSqlIdentifier(db, pid),
      aliasKey: mainAliasKey,
      rowKey: pid,
    };
  }

  return { sql: escapeSqlIdentifier(db, pid), aliasKey: mainAliasKey, rowKey: pid };
}

function appendRawWhere(where: string, raw: unknown): string {
  const value = String(raw || '').trim();
  if (value === '') return where;
  return where === '' ? value : where + ' AND ' + value;
}

function appendRawOrder(order: string, raw: unknown): string {
  const value = String(raw || '').trim();
  if (value === '') return order;
  return order === '' ? value : order + ', ' + value;
}

function addSpecialFieldSql(
  fieldId: string,
  value: unknown,
  sqlByAlias: Record<string, string>,
  current: { order: string; where: string }
): void {
  if (fieldId === '#ORDER') {
    current.order = appendRawOrder(current.order, value);
  } else if (fieldId === '#WHERE') {
    current.where = appendRawWhere(current.where, value);
  } else if (fieldId.startsWith('#ON#')) {
    const aliasKey = fieldId.substring(4).trim().toLowerCase();
    ensureAlias(sqlByAlias, aliasKey, fieldId.substring(4).trim());
    sqlByAlias[aliasKey] = appendRawWhere(sqlByAlias[aliasKey], value);
  }
}

export function createSelectRecordSql(
  db: DbLike,
  keyentity: EntityObject,
  entity: EntityObject,
  addError?: AddErrorFn
): SelectRecordSqlResult | false {
  const tableIdList = entity.getTableId();
  if (tableIdList === '') {
    if (addError) addError(entity, 'SE_NOTABLEID::Not set table id in list.');
    else entity.addError('SE_NOTABLEID::Not set table id in list.');
    return false;
  }

  const tableRefs = parseTableRefs(tableIdList);
  if (tableRefs.length === 0) {
    if (addError) addError(entity, 'SE_NOTABLEID::Not set table id in list.');
    else entity.addError('SE_NOTABLEID::Not set table id in list.');
    return false;
  }

  const mainRef = tableRefs[0];
  const sqlByAlias: Record<string, string> = {};
  const paramsByAlias: Record<string, unknown[]> = {};
  const aliasToTable: Record<string, string> = {};

  for (const ref of tableRefs) {
    if (sqlByAlias[ref.aliasKey] !== undefined) {
      throw new Error('Alias:' + ref.alias + ' has been used for tableid:' + ref.tableId);
    }
    sqlByAlias[ref.aliasKey] = '';
    paramsByAlias[ref.aliasKey] = [];
    aliasToTable[ref.aliasKey] = ref.tableId;
  }

  let order = '';
  let where = '';
  const whereParams: unknown[] = [];
  const state = { order, where };

  for (const item of keyentity.getItems()) {
    const fieldId = item.getFieldId();
    if (fieldId.startsWith('#')) {
      addSpecialFieldSql(fieldId, item.getValue(), sqlByAlias, state);
      continue;
    }

    const pid = item.getPhysicalId();
    if (pid === '' || item.isBlank()) continue;

    const fieldRef = getPhysicalFieldRef(db, pid, mainRef.alias, mainRef.aliasKey, tableRefs.length);
    ensureAlias(sqlByAlias, fieldRef.aliasKey, fieldRef.aliasKey);

    if (entity.getItemIndex(fieldId) >= 0) {
      state.where = getFilterSql(db, item, state.where, fieldRef.sql, whereParams);
    } else {
      sqlByAlias[fieldRef.aliasKey] = getFilterSql(
        db,
        item,
        sqlByAlias[fieldRef.aliasKey],
        fieldRef.sql,
        paramsByAlias[fieldRef.aliasKey]
      );
    }
  }

  const search = String(keyentity.getItemValue('@SEARCH') || '').trim();
  if (search !== '') {
    let searchSql = '';
    for (const searchItem of search.split(/\s+/).filter(Boolean)) {
      let oneWordSql = '';
      for (const item of keyentity.getItems()) {
        const fieldId = item.getFieldId();
        const pid = item.getPhysicalId();
        if (fieldId.startsWith('#') || pid === '') continue;
        const fieldRef = getPhysicalFieldRef(db, pid, mainRef.alias, mainRef.aliasKey, tableRefs.length);
        ensureAlias(sqlByAlias, fieldRef.aliasKey, fieldRef.aliasKey);
        if (oneWordSql !== '') oneWordSql += ' OR ';
        oneWordSql += fieldRef.sql + ' LIKE ?' + " ESCAPE '\\'";
        whereParams.push('%' + escapeLikeValue(searchItem) + '%');
      }
      if (oneWordSql !== '') {
        if (searchSql !== '') searchSql += ' AND ';
        searchSql += '( ' + oneWordSql + ' )';
      }
    }
    if (searchSql !== '') {
      state.where = appendRawWhere(state.where, '( ' + searchSql + ' )');
    }
  }

  order = state.order;
  where = state.where;

  const fieldArr: Record<string, string> = {};
  const selectParts: string[] = [];
  let index = -1;

  for (const item of entity.getItems()) {
    index++;
    const fieldId = item.getFieldId();
    if (fieldId.startsWith('#')) {
      const specialState = { order, where };
      addSpecialFieldSql(fieldId, item.getValue(), sqlByAlias, specialState);
      order = specialState.order;
      where = specialState.where;
      continue;
    }

    const pid = item.getPhysicalId();
    if (pid === '') continue;

    const fieldRef = getPhysicalFieldRef(db, pid, mainRef.alias, mainRef.aliasKey, tableRefs.length);
    ensureAlias(sqlByAlias, fieldRef.aliasKey, fieldRef.aliasKey);
    const outputAlias = '__f' + index;
    fieldArr[String(index)] = outputAlias;
    selectParts.push(fieldRef.sql + ' AS ' + escapeSqlIdentifier(db, outputAlias));
  }

  const select = selectParts.length > 0 ? selectParts.join(', ') : '*';
  let from = '';
  const fromParams: unknown[] = [];

  for (let i = 0; i < tableRefs.length; i++) {
    const ref = tableRefs[i];
    const tableSql = escapeSqlTableName(db, aliasToTable[ref.aliasKey]);
    const aliasSql = escapeSqlIdentifier(db, ref.alias);
    if (i === 0) {
      from = tableRefs.length > 1 ? tableSql + ' ' + aliasSql : tableSql;
    } else {
      from += ' LEFT JOIN ' + tableSql + ' ' + aliasSql;
      if (sqlByAlias[ref.aliasKey] !== '') {
        from += ' ON ' + sqlByAlias[ref.aliasKey];
        fromParams.push(...paramsByAlias[ref.aliasKey]);
      }
    }
  }

  const allWhereParts: string[] = [];
  const allWhereParams: unknown[] = [];
  if (sqlByAlias[mainRef.aliasKey] !== '') {
    allWhereParts.push(sqlByAlias[mainRef.aliasKey]);
    allWhereParams.push(...paramsByAlias[mainRef.aliasKey]);
  }
  if (where !== '') {
    allWhereParts.push(where);
    allWhereParams.push(...whereParams);
  }

  let sql = 'SELECT ' + select + ' FROM ' + from;
  if (allWhereParts.length > 0) {
    sql += ' WHERE ' + allWhereParts.join(' AND ');
  }
  if (order !== '') {
    sql += ' ORDER BY ' + order;
  }

  return {
    sql,
    params: [...fromParams, ...allWhereParams],
    mainTableId: mainRef.tableId,
    fieldArr,
  };
}
