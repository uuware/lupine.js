/**
 * Converted from PHP classes/DeleteRecord.php
 */

import { ProcessBase } from '../process-base';
import { EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { createEntityFilterSql, escapeSqlTableName } from '../db-helper';

export class DeleteRecord extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() {
    return { entity: true, type: FieldType.String };
  }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    const tblid = this.keyentity!.getTableId();
    if (tblid === '') {
      this.keyentity!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }

    const db = apiCache.getDb();
    const filterResult = createEntityFilterSql(db, this.keyentity!);

    if (filterResult.sql === '') {
      this.keyentity!.addError('SE0007::For security, can not delete table without filter.');
      return false;
    }

    const sql = 'DELETE FROM ' + escapeSqlTableName(db, tblid) + ' WHERE ' + filterResult.sql;

    try {
      await db.execute(sql, filterResult.params);
    } catch (e: any) {
      this.keyentity!.addError('SE0003::Error while query:{%1}', 'alert', [e.message]);
      return false;
    }
    return true;
  }
}
