/**
 * Converted from PHP classes/CheckRecordNotExist.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { apiCache } from 'lupine.api';

export class CheckRecordNotExist extends ProcessBase {
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
		// _traceArray('enter, keyentity:', this.keyentity);
		// _traceArray('enter, entity:', this.entity);

		let fieldArr = [];
		let maintblid = '';
		sql = this.createSql(maintblid, this.keyentity, this.entity, fieldArr);
		const db = apiCache.getDb();
		await db.execute(sql);
		let ret = db.loadResult();
		if(ret) {
			this.addError(this.entity, 'SE_EXISTREC::Exist record.');
			return false;
		}
	
  }
}
