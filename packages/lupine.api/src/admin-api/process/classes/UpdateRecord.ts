/**
 * Converted from PHP classes/UpdateRecord.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class UpdateRecord extends ProcessBase {
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

    let tblidStr = this.datalist!.getTableId();
    if(tblidStr === '') {
      this.datalist!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    const realTblid = tblidStr; // TODO getRealTableId
    if(realTblid === '') {
      this.addError(this.datalist, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tblidStr]);
      return false;
    }

    const arr = this.datalist!.getRecords();
    if(arr.length !== 1) {
      this.datalist!.addError('SE0004');
      return false;
    }
    const entity = arr[0];

    const db = apiCache.getDb();
    let filter = '';
    const cnt = this.keyentity!.itemSize();
    let arrkey: Record<string, number> = {};
    for (let i = 0; i < cnt; i++) {
      const item = this.keyentity!.getItem(i) as FieldObject;
      const pid = item.getPhysicalId();
      if(item.isBlank() || pid === '') continue;

      if(filter !== '') {
        filter += ' AND ';
      }
      
      let realfilter = item.getFilter();
      if(realfilter === '') {
        realfilter = '=';
      }
      
      const val = String(item.getValue() || '');
      const fid = (db as any).escapeId(pid);
      if(realfilter === 'l') {
        const s = val.replace(/_/g, '\\_');
        filter += fid + ' LIKE ' + (db as any).escape('%' + s);
      }
      else if(realfilter === 'r') {
        const s = val.replace(/_/g, '\\_');
        filter += fid + ' LIKE ' + (db as any).escape(s + '%');
      }
      else if(realfilter === 'c') {
        const s = val.replace(/_/g, '\\_');
        filter += fid + ' LIKE ' + (db as any).escape('%' + s + '%');
      }
      else {
        filter += fid + ' ' + realfilter + ' ' + (db as any).escape(val);
      }
      arrkey[pid] = 1;
    }

    if(filter === '') {
      this.addError(this.keyentity, 'SE_NOWHERE::No where filter.');
      return false;
    }
    filter = ' WHERE ' + filter;

    let sql = '';
    const cntEnt = entity.itemSize();
    for (let i = 0; i < cntEnt; i++) {
      const item = entity.getItem(i) as FieldObject;
      const pid = item.getPhysicalId();
      if(pid !== '' && !arrkey[pid]) {
        if(sql !== '') {
          sql += ', ';
        }
        sql += (db as any).escapeId(pid) + ' = ' + (db as any).escape(String(item.getValue() || ''));
      }
    }
    
    if(sql === '') {
      this.datalist!.addError('SE0006');
      return false;
    }

    try {
      await db.execute('UPDATE ' + realTblid + ' SET ' + sql + filter);
    } catch(e: any) {
      this.datalist!.addError('SE_ERRQUERY::Error while query: {%0}.', 'alert', [e.message]);
      return false;
    }
    return true;
  }
}
