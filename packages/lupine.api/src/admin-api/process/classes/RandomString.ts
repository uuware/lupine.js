/**
 * Converted from PHP classes/RandomString.php
 */

import { ProcessBase } from '../process-base';
import { FieldObject, VectorObject, EntityObject, ListObject, FieldType } from '../field-objects';

export class RandomString extends ProcessBase {
  fields: FieldObject | VectorObject | null = null;
  getFieldsInfo() { return { multi: true, type: FieldType.String }; }
  setFields(fields: FieldObject | VectorObject): void {
    this.fields = fields;
  }

  override execute(): boolean | void {

		this.chkNull('fields', 'FieldObject');

		let k = "" /* TODO genRandomString */;
		this._setFieldValue('fields', k);
	
  }
}
