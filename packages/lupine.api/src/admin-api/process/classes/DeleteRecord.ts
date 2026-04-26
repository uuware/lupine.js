/**
 * Converted from PHP classes/DeleteRecord.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { getFilterSql } from '../process-utils';

export class DeleteRecord extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() { return { entity: true, type: FieldType.String }; }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  datalist: ListObject | null = null;
  getDatalistInfo() { return { list: true, type: FieldType.String }; }
  setDatalist(datalist: ListObject): void {
    this.datalist = datalist;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('datalist', 'ListObject');
    let tblid = this.datalist!.getTableid();
    if(tblid === '') {
      this.datalist!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    tblid = tblid; // TODO getRealTableId(tblid)
    if(tblid === '') {
      this.datalist!.addError('SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tblid]);
      return false;
    }

    const db = apiCache.getDb();
    const filter = getFilterSql(this.keyentity!, db);
    
    if(filter === '') {
      this.datalist!.addError('SE0007::For security, can not delete table without filter.');
      return false;
    }

    try {
      await db.execute('DELETE FROM ' + tblid + ' WHERE ' + filter);
    } catch(e: any) {
      this.datalist!.addError('SE0003::Error while query:{%1}', 'alert', [e.message]);
      return false;
    }
    return true;
  }
}
