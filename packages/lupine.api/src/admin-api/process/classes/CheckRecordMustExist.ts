/**
 * Converted from PHP classes/CheckRecordMustExist.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { appendSqlLimit, createSelectRecordSql } from '../db-helper';

export class CheckRecordMustExist extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('entity', 'EntityObject');

    const db = apiCache.getDb();
    const sqlResult = createSelectRecordSql(db, this.keyentity!, this.entity!, this.addError.bind(this));
    if (sqlResult === false) {
      return false;
    }

    try {
      const rows = await db.select(appendSqlLimit(db, sqlResult.sql, 1), sqlResult.params);
      if (!rows || rows.length === 0) {
        this.addError(this.entity, 'SE_NOTEXISTREC::Not exist record.');
        return false;
      }
    } catch (e: any) {
      this.addError(this.entity, 'SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }

    return true;
  }
}
