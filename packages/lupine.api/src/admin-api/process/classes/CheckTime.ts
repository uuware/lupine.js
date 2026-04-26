/**
 * Converted from PHP classes/CheckTime.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckTime extends ProcessBase {
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
				if(!this.check(item)) {
					ret = false;
				}
			}
		}
		else {
			if(!this.check(this.fields)) {
				ret = false;
			}
		}
		return ret;
	
  }
}
