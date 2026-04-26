/**
 * Converted from PHP classes/CheckMustBlank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckMustBlank extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('fields');
		let ret = true;
		if(this.fields instanceof VectorObject) {
			cnt = this.fields.itemSize();
			for (let i = 0; i < cnt; i++) {
				//importent! if no unset(...) then all used of be the same one!!!
				
				item = this.fields.getItem(i);
				if(!item.isBlank()) {
					this.addError(item, 'S_NOTBLANK::{%N} is not empty.');
					ret = false;
				}
			}
		}
		else {
			if(!this.fields.isBlank()) {
				this.addError(this.fields, 'S_NOTBLANK::{%N} is not empty.');
				ret = false;
			}
		}
		return ret;
	
  }
}
