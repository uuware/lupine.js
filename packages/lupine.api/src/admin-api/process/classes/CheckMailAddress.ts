/**
 * Converted from PHP classes/CheckMailAddress.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class CheckMailAddress extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('fields');

		let ok = true;
		if(this.fields instanceof VectorObject) {
			cnt = this.fields.itemSize();
			for (let i = 0; i < cnt; i++) {
				//importent! if no unset(...) then all used of be the same one!!!
				
				item = this.fields.getItem(i);
				if(!item.isBlank()) {
					ret = this.chk(item?.getValue());
					if(ret !== true) {
						ok = false;
						this.addError(item, ret);
					}
				}
			}
		}
		else {
			if(!this.fields.isBlank()) {
				ret = this.chk(this.fields?.getValue());
				if(ret !== true) {
					ok = false;
					this.addError(this.fields, ret);
				}
			}
		}
		return ok;
	
  }
}
