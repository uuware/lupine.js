/**
 * Converted from PHP classes/Set01Blank.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class Set01Blank extends ProcessBase {
  fieldsblank: FieldObject | VectorObject | null = null;
  getFieldsblankInfo() { return { multi: true, type: FieldType.String }; }
  setFieldsblank(fieldsblank: FieldObject | VectorObject): void {
    this.fieldsblank = fieldsblank;
  }

  fields0: FieldObject | VectorObject | null = null;
  getFields0Info() { return { multi: true, type: FieldType.String }; }
  setFields0(fields0: FieldObject | VectorObject): void {
    this.fields0 = fields0;
  }

  fields1: FieldObject | VectorObject | null = null;
  getFields1Info() { return { multi: true, type: FieldType.String }; }
  setFields1(fields1: FieldObject | VectorObject): void {
    this.fields1 = fields1;
  }

  override execute(): boolean | void {

		if(this.fieldsblank != null) {
			this._setFieldValue('fieldsblank', '');
		}
		if(this.fields0 != null) {
			this._setFieldValue('fields0', '0');
		}
		if(this.fields1 != null) {
			this._setFieldValue('fields1', '1');
		}
	
  }
}
