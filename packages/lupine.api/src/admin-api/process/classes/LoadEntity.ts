/**
 * Converted from PHP classes/LoadEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, EntityObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { getFilterSql } from '../process-utils';

export class LoadEntity extends ProcessBase {
  keyentity: EntityObject | null = null;
  getKeyentityInfo() { return { entity: true, type: FieldType.String }; }
  setKeyentity(keyentity: EntityObject): void {
    this.keyentity = keyentity;
  }

  entity: EntityObject | null = null;
  getEntityInfo() { return { entity: true, type: FieldType.String }; }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {
    this.chkNull('keyentity', 'EntityObject');
    this.chkNull('entity', 'EntityObject');

    const tblid = this.entity!.getTableId();
    if(!tblid || tblid === '') {
      this.entity!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }

    const db = apiCache.getDb();
    
    // Build fields
    let fieldsSql = '';
    const childidArr: string[] = [];
    const cntEnt = this.entity!.itemSize();
    for (let i = 0; i < cntEnt; i++) {
      const item = this.entity!.getItem(i) as FieldObject;
      const pid = item.getPhysicalId();
      if (pid) {
        if (fieldsSql !== '') fieldsSql += ', ';
        fieldsSql += db.escapeId(pid);
        childidArr.push(pid);
      } else {
        childidArr.push('');
      }
    }
    if (fieldsSql === '') fieldsSql = '*';

    // Build filter
    let filter = '';
    const cntKey = this.keyentity!.itemSize();
    for (let i = 0; i < cntKey; i++) {
      const item = this.keyentity!.getItem(i) as FieldObject;
      filter = getFilterSql(db, item, filter);
    }
    if (filter === '') {
      this.addError(this.keyentity, 'SE_NOWHERE::No where filter.');
      return false;
    }

    const sql = `SELECT ${fieldsSql} FROM ${tblid} WHERE ${filter}`;
    const rows = await db.select(sql);
    const row = rows && rows.length > 0 ? rows[0] : null;

    if(!row) {
      this.entity!.addError('SE_NODATA::Load data error.');
      return false;
    }

    for (let i = 0; i < childidArr.length; i++) {
      const pid = childidArr[i];
      if (pid) {
        const val = row[pid] !== undefined ? row[pid] : row[pid.toLowerCase()];
        this.entity!.setItemValue(i, String(val ?? ''));
      }
    }

    // if field is "XXX#OPTNAME", then get optname to it from field "XXX" if exist.
    const items = this.entity!.getItems();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getFieldId();
      if (!id) continue;
      const pos = id.indexOf('#');
      if(pos !== -1) {
        const name2 = id.substring(pos + 1);
        if(name2 === 'OPTNAME') {
          // get orignal item
          const id2 = id.substring(0, pos);
          const value2 = '' + this.entity!.getItemValue(id2);
          if(value2 !== '') {
            // let itemoptname = /* TODO StBase */getItemOptname(id2, value2);
            // this.entity!.setItemValue( id, itemoptname );
          }
        }
      }
    }
  }
}
