/**
 * Converted from PHP classes/DeleteEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';
import { getFilterSql } from '../process-utils';

export class DeleteEntity extends ProcessBase {
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
    
    let tblid = this.entity!.getTableid();
    if(tblid === '') {
      this.entity!.addError('SE_NOTABLEID::Not set table id in list.');
      return false;
    }
    
    tblid = tblid; // TODO getRealTableId(tblid)
    if(tblid === '') {
      this.entity!.addError('SE_NOACCESSTBL::Not access table: {%0}.', 'alert', [tblid]);
      return false;
    }

    const db = apiCache.getDb();
    const filter = getFilterSql(this.keyentity!, db);
    
    if(filter === '') {
      this.entity!.addError('SE0007::For security, can not delete table without filter.');
      return false;
    }

    try {
      await db.execute('DELETE FROM ' + tblid + ' WHERE ' + filter);
    } catch(e: any) {
      this.entity!.addError('SE0003::Error while query:{%1}', 'alert', [e.message]);
      return false;
    }
    return true;
  }
}
