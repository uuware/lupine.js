/**
 * Converted from PHP classes/InsertEntity.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { createInsertEntitySql } from '../db-helper';

export class InsertEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('entity', 'EntityObject');

    const tblid = this.entity!.getTableId();
    if (tblid === '') {
      this.entity!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }

    const db = apiCache.getDb();
    const sqlResult = createInsertEntitySql(db, tblid, this.entity!);
    if (sqlResult.sql === '') {
      this.entity!.addError('SE_NOFIELD::No field.');
      return false;
    }

    try {
      await db.execute(sqlResult.sql, sqlResult.params);
    } catch (e: any) {
      this.entity!.addError('SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }

    return true;
  }
}
