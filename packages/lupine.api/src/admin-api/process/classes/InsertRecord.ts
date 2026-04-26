/**
 * Converted from PHP classes/InsertRecord.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class InsertRecord extends ProcessBase {
  datalist: ListObject | null = null;
  getDatalistInfo() { return { list: true, type: FieldType.String }; }
  setDatalist(datalist: ListObject): void {
    this.datalist = datalist;
  }

  override async execute(): Promise<boolean | void> {
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

    const childidArr: Record<number, string> = {};
    const db = apiCache.getDb();
    let fields = '';
    const cnt = this.datalist!.itemSize();
    for (let i = 0; i < cnt; i++) {
      const item = this.datalist!.getItem(i);
      if(item.getPhysicalId() !== '') {
        childidArr[i] = item.getPhysicalId();
        if(fields !== '') {
          fields += ', ';
        }
        fields += db.escapeId(item.getPhysicalId());
      }
    }
    if(fields === '') {
      this.datalist!.addError('SE_NOFIELD::No field.');
      return false;
    }

    const sql = 'INSERT INTO ' + tblid + ' ( ' + fields + ' ) VALUES ( ';
    const arr = this.datalist!.getRecords();
    for (const entity of arr) {
      let value2 = '';
      for(const key of Object.keys(childidArr)) {
        if(value2 !== '') {
          value2 += ', ';
        }
        const item = entity.getItem(Number(key));
        value2 += db.escape(String(item?.getValue() || ''));
      }
      try {
        await db.execute(sql + value2 + ' ) ');
      } catch (e: any) {
        this.datalist!.addError('SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
        return false;
      }
    }
    return true;
  }
}
