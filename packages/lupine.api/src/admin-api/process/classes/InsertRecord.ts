/**
 * Converted from PHP classes/InsertRecord.php
 */

import { ProcessBase } from '../process-base';
import { ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { createInsertEntitySql } from '../db-helper';

export class InsertRecord extends ProcessBase {
  datalist: ListObject | null = null;
  getDatalistInfo() {
    return { list: true, type: FieldType.String };
  }
  setDatalist(datalist: ListObject): void {
    this.datalist = datalist;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('datalist', 'ListObject');
    const tblid = this.datalist!.getTableId();
    if (tblid === '') {
      this.datalist!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }

    const db = apiCache.getDb();
    if (this.datalist!.getItems().every((item) => item.getPhysicalId() === '')) {
      this.datalist!.addError('SE_NOFIELD::No field.');
      return false;
    }

    const arr = this.datalist!.getRecords();
    for (const entity of arr) {
      const sqlResult = createInsertEntitySql(db, tblid, entity);
      if (sqlResult.sql === '') {
        this.datalist!.addError('SE_NOFIELD::No field.');
        return false;
      }
      try {
        await db.execute(sqlResult.sql, sqlResult.params);
      } catch (e: any) {
        this.datalist!.addError('SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
        return false;
      }
    }
    return true;
  }
}
