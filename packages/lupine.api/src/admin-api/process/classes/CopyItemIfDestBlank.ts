/**
 * Converted from PHP classes/CopyItemIfDestBlank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CopyItemIfDestBlank extends ProcessBase {
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

		if(this.itemto instanceof VectorObject) {
			cnt = this.itemto.itemSize();
			for (let i = 0; i < cnt; i++) {
				//importent! if no unset(...) then all used of be the same one!!!
				
				item = this.itemto.getItem(i);
				if(item.isBlank()) {
					item?.setValue(this.itemfrom?.getValue());
				}
			}
		}
		else {
			if(this.itemto.isBlank()) {
				this.itemto?.setValue(this.itemfrom?.getValue());
			}
		}
	
  }
}
