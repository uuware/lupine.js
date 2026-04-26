/**
 * Converted from PHP classes/CopyEntity.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CopyEntity extends ProcessBase {
  entityfrom: EntityObject | null = null;
  getEntityfromInfo() { return { entity: true, type: FieldType.String }; }
  setEntityfrom(entityfrom: EntityObject): void {
    this.entityfrom = entityfrom;
  }

  entityto: EntityObject | null = null;
  getEntitytoInfo() { return { entity: true, type: FieldType.String }; }
  setEntityto(entityto: EntityObject): void {
    this.entityto = entityto;
  }

  override execute(): boolean | void {

		this.chkNull('entityfrom', 'EntityObject');
		this.chkNull('entityto', 'EntityObject');

		// _traceArray('enter, entityfrom:', this.entityfrom);

		cnt = this.entityfrom.itemSize();
		for (let i = 0; i < cnt; i++) {
			//importent! if no unset(...) then all used of be the same one!!!
			
			
			itemfrom = this.entityfrom.getItem(i);
			itemto = this.entityto.getItem( itemfrom.getFieldId() );
			if(itemto != null) {
				itemto?.setValue( itemfrom?.getValue() );
			}
		}

		// _traceArray('end, entityto:', this.entityto);
	
  }
}
