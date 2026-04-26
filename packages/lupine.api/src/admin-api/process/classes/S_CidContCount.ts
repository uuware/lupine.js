/**
 * Converted from PHP classes/S_CidContCount.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class S_CidContCount extends ProcessBase {
  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
  }

  count: FieldObject | null = null;
  getCountInfo() { return { multi: false, type: FieldType.String }; }
  setCount(count: FieldObject): void {
    this.count = count;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('count', 'FieldObject');
    this.chkNull('cid', 'FieldObject');

    let str = String(this.cid?.getValue() || '');
    if(str !== '') {
      if(str.endsWith('.')) {
        str = str.slice(0, -1);
      }
      const db = apiCache.getDb();
      const query = 'SELECT COUNT(*) as cnt FROM #__st_commdata WHERE cid LIKE ' + (db as any).escape(str + '%');
      const rows = await db.select(query);
      const ret = rows && rows.length > 0 ? rows[0].cnt : 0;
      this.count?.setValue(String(ret));
    }
  }
}
