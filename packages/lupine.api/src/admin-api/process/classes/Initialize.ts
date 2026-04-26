/**
 * Converted from PHP classes/Initialize.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class Initialize extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		if(!this.chkNull('fields')) {
			return false;
		}
		this.init('fields');
	
  }
}
