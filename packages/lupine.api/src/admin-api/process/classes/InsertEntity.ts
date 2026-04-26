/**
 * Converted from PHP classes/InsertEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class InsertEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() { return { entity: true, type: FieldType.String }; }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override async execute(): Promise<boolean | void> {

		this.chkNull('entity', 'EntityObject');
		tblid = this.entity.getTableid();
		if(tblid == '') {
			this.addError(this.listobject, 'SE_NOTABLEID::Not set table id in list.');
			return false;
		}
		let tblid = /* TODO getRealTableId */ tblid;
		if(tblid == '') {
			this.addError(this.listobject, 'SE_NOACCESSTBL::Not access table: {%0}.', 'alert', array(tblid));
			return false;
		}

		// _traceArray('enter, entity:', this.entity);

		const db = apiCache.getDb();
		let object = [];
		cnt = this.entity.itemSize();
		for (let i = 0; i < cnt; i++) {
			item = this.entity.getItem(i);
			if(item.getPhysicalId() != '') {
				object[item.getPhysicalId()] = item?.getValue();
			}
		}
		if(!db.insertObject(tblid, object)) {
			this.addError(this.entity, 'SE_ERRQUERY::Error while query: {%0}.', 'alert', db.getErrorMsg());
			return false;
		}
	
  }
}
