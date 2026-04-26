/**
 * Converted from PHP classes/InitializeEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class InitializeEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() { return { entity: true, type: FieldType.String }; }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override execute(): boolean | void {

		if(!this.chkNull('entity', 'EntityObject')) {
			return false;
		}

		cnt = this.entity.itemSize();
		for (let i = 0; i < cnt; i++) {
			this.entity.setItemValue(i, '');
		}
	
  }
}
