/**
 * Converted from PHP classes/GetSessionValue.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class GetSessionValue extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('fields');

		if(this.fields instanceof VectorObject) {
			cnt = this.fields.itemSize();
			for (let i = 0; i < cnt; i++) {
				
				item = this.fields.getItem(i);
				this.executeOne(item);
				let item = null;
			}
		}
		else {
			this.executeOne(this.fields);
		}

	
  }
}
