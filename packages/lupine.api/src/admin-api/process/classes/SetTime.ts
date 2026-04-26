/**
 * Converted from PHP classes/SetTime.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';
import { getDate, getTime, getTimestamp } from '../date-utils';

export class SetTime extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('fields');
		//date = date('H:i:s');
		this._setFieldValue('fields', getTime());
	
  }
}
