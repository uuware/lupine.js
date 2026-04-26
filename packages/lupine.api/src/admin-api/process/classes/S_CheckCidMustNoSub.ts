/**
 * Converted from PHP classes/S_CheckCidMustNoSub.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class S_CheckCidMustNoSub extends ProcessBase {
  cid: FieldObject | null = null;
  getCidInfo() { return { multi: false, type: FieldType.String }; }
  setCid(cid: FieldObject): void {
    this.cid = cid;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('cid', 'FieldObject');
    let str = String(this.cid?.getValue() || '').trim();
    if(str === '') {
      return;
    }

    if(str.endsWith('.')) {
      str = str.substring(0, str.length - 1);
    }
    const db = apiCache.getDb();
    let query = 'SELECT COUNT(*) as count FROM #__st_cat WHERE cidparent = ' + (db as any).escape(str);
    const rows = await db.select(query);
    let ret = rows[0]?.count || 0;
    if(ret > 0) {
      this.addError(this.cid!, 'S_CIDHASSUB::Cid[{%0}] has sub category.', 'alert', [str]);
      return false;
    }
  }
}
