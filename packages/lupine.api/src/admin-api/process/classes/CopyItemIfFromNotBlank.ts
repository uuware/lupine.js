/**
 * Converted from PHP classes/CopyItemIfFromNotBlank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CopyItemIfFromNotBlank extends ProcessBase {
  itemfrom: FieldObject | null = null;
  getItemfromInfo() { return { multi: false, type: FieldType.String }; }
  setItemfrom(itemfrom: FieldObject): void {
    this.itemfrom = itemfrom;
  }

  itemto: FieldObject | VectorObject | null = null;
  getItemtoInfo() { return { multi: true, type: FieldType.String }; }
  setItemto(itemto: FieldObject | VectorObject): void {
    this.itemto = itemto;
  }

  override execute(): boolean | void {

		this.chkNull('itemfrom');
		this.chkNull('itemto');

		if(!this.itemfrom.isBlank()) {
			this._setFieldValue('itemto', this.itemfrom?.getValue());
		}
	
  }
}
