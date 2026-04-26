/**
 * Converted from PHP classes/CleanEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CleanEntity extends ProcessBase {
  entity: EntityObject | null = null;
  getEntityInfo() { return { entity: true, type: FieldType.String }; }
  setEntity(entity: EntityObject): void {
    this.entity = entity;
  }

  override execute(): boolean | void {

		this.chkNull('entity', 'EntityObject');

		// _traceArray('enter, entity:', this.entity);

		cnt = this.entity.itemSize();
		for (let i = 0; i < cnt; i++) {
			this.entity.getItem(i).setValue( '' );
		}

		// _traceArray('end, entity:', this.entity);
	
  }
}
