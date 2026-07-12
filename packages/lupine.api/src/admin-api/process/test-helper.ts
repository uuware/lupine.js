import { apiCache } from 'lupine.api';
import { EntityObject, FieldObject, ListObject } from './field-objects';
import { ItemDef } from './run-process';

export const makeField = (name: string, defaultValue = ''): ItemDef => ({
  name,
  type: 'FieldObject',
  flags: 'F,',
  defaultValue,
  ext: {},
});

export const makeFieldObject = (fieldId: string, value = ''): FieldObject => {
  const field = new FieldObject();
  field.setFieldId(fieldId);
  field.setValue(value);
  return field;
};

export const makePhysicalFieldObject = (fieldId: string, physicalId: string, value = '', filter = ''): FieldObject => {
  const field = makeFieldObject(fieldId, value);
  field.setPhysicalId(physicalId);
  field.setFilter(filter);
  return field;
};

export const makeEntityObject = (tableId: string, fields: FieldObject[] = []): EntityObject => {
  const entity = new EntityObject();
  entity.setFieldId(tableId);
  entity.setTableId(tableId);
  for (const field of fields) {
    entity.addItem(field);
  }
  return entity;
};

export const makeListObject = (tableId: string, fields: FieldObject[] = []): ListObject => {
  const list = new ListObject();
  list.setFieldId(tableId);
  list.setTableId(tableId);
  for (const field of fields) {
    list.addItem(field);
  }
  return list;
};

export interface MockDb {
  type: string;
  selects: Array<{ sql: string; params?: unknown[] }>;
  executes: Array<{ sql: string; params?: unknown[] }>;
  selectResults: Record<string, unknown>[][];
  executeResults: unknown[];
  replacePrefix: (sql: string, fromPrefix?: string) => string;
  select: (sql: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;
  execute: (sql: string, params?: unknown[]) => Promise<unknown>;
}

export const makeMockDb = (selectResults: Record<string, unknown>[][] = [[]]): MockDb => {
  const db: MockDb = {
    type: 'sqlite',
    selects: [],
    executes: [],
    selectResults: [...selectResults],
    executeResults: [],
    replacePrefix(sql: string, fromPrefix = '$__') {
      return sql.replaceAll(fromPrefix, 'tbl_');
    },
    async select(sql: string, params?: unknown[]) {
      this.selects.push({ sql, params });
      return this.selectResults.shift() || [];
    },
    async execute(sql: string, params?: unknown[]) {
      this.executes.push({ sql, params });
      return this.executeResults.shift() || [{ changes: 1 }];
    },
  };
  return db;
};

export const withMockDb = async <T>(db: MockDb, callback: () => Promise<T>): Promise<T> => {
  const oldDb = apiCache.get(apiCache.KEYS.DB);
  apiCache.set(apiCache.KEYS.DB, db);
  try {
    return await callback();
  } finally {
    apiCache.set(apiCache.KEYS.DB, oldDb);
  }
};
